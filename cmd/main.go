package main

import (
	"bytes"
	"com/khoa/ytc-dl/pkg"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/anaskhan96/soup"
	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/opts"
)

var client = http.Client{}
const userAgent string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36" 

func baseRequest(method string, url string) *http.Request {
	req, _ := http.NewRequest(method, url, nil)
	
	req.Header.Add("User-Agent", userAgent)
	return req
}

func liveChatRequest(reqObj pkg.LiveChatReqBody, key string) *http.Request {
	bodyBytes, _ := json.Marshal(reqObj)
	req, _ := http.NewRequest("POST", "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat_replay", bytes.NewBuffer(bodyBytes))
	q := req.URL.Query()
	q.Add("key", key)
	q.Add("prettyPrint", "false")

	req.URL.RawQuery = q.Encode()
	
	req.Header.Add("User-Agent", userAgent)

	return req
}

func getContinuation(url string) string {
	req := baseRequest("GET", url)

	res, _ := client.Do(req)

	if res.StatusCode == 200 {
		defer res.Body.Close()
		bytes, err := ioutil.ReadAll(res.Body)
		if err != nil {
			log.Fatal(err)
		}

		text := string(bytes)

		r := regexp.MustCompile(`"continuation":"([^\"]+)"`)
		cont := r.FindStringSubmatch(text)
		return cont[1]
	}

	return ""
}

func getLivechatReq(id string) *http.Request {
	req := baseRequest("GET", "https://www.youtube.com/live_chat_replay")
	q := req.URL.Query()
	q.Add("continuation", id)
	q.Add("playerOffsetMs", "0")

	req.URL.RawQuery = q.Encode()
	return req
}

func getKey() string {
	req := baseRequest("GET", "https://youtube.com")

	res, _ := client.Do(req)
	if res.StatusCode != 200 {
		log.Fatal(res.Status)
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		log.Fatal("Could not read body")
	}

	bodyHtml := string(body)

	r := regexp.MustCompile(`"INNERTUBE_API_KEY":"([^"]+)"`)
	matches := r.FindStringSubmatch(bodyHtml)
	if matches != nil {
		return matches[1]
	} else {
		log.Fatal("Could not find key")
	}
	return ""
}

func parseBadges(rawBadges []pkg.AuthorBadges) []pkg.Badge {
	memberRegex := regexp.MustCompile(`Mitglied\s\((\d+)\x{00a0}Monate*\)`)

	badges := make([]pkg.Badge, len(rawBadges))

	for i, badge := range rawBadges {
		tooltip := badge.LiveChatAuthorBadgeRenderer.Tooltip
		if	tooltip == "Bestätigt" {
			badges[i] = pkg.Badge{Type: pkg.VERIFIED}
		} else if tooltip == "Kanalinhaber"{
			badges[i] = pkg.Badge{Type: pkg.CHANNELOWNER}
		} else if tooltip == "Neues Mitglied"{
			duration := -1
			badges[i] = pkg.Badge{Type: pkg.MEMBER, Duration: duration}
		} else {
			member := memberRegex.FindStringSubmatch(tooltip)
			if member != nil {
				duration, _ := strconv.Atoi(member[1])
				badges[i] = pkg.Badge{Type: pkg.MEMBER, Duration: duration}
			}
		}
	}
	return badges
}

func parseTextRuns(rawTextRuns []pkg.Runs) []string {
	textRuns := make([]string, len(rawTextRuns))

	for i, msg := range rawTextRuns {
		text := msg.Text
		if len(text) > 0 {
			textRuns[i] = text
		}else if msg.Emoji != nil {
			if len(msg.Emoji.Shortcuts) > 0 {
				textRuns[i] = msg.Emoji.Shortcuts[0]
			}else{
				textRuns[i] = msg.Emoji.EmojiId
			}
		}
	}
	return textRuns
}

func getLiveChatResponse(url string) {
	chat := []pkg.ChatItem{}
	gifts := []pkg.GiftItem{}
	superchats := []pkg.SuperchatItem{}

	key := getKey()
	fmt.Printf("Aquired API key: %s\n", key)
	contId := getContinuation(url)
	fmt.Printf("Aquired continuation ID: %s\n", contId)

	req := getLivechatReq(contId)
	res, _ := client.Do(req)

	if res.StatusCode != 200 {
		log.Default().Println("Could not make request")
		return
	}

	memberRegex := regexp.MustCompile(`Mitglied\s\((\d+)\x{00a0}Monate*\)`)

	bodyBytes, err := ioutil.ReadAll(res.Body)
	
	if err != nil {
		log.Fatal(err)
	}
	text := string(bodyBytes)
	doc := soup.HTMLParse(text)
	script := doc.Find("body").FindAll("script")[1].Text()
	script = script[26:len(script)-1]

	var obj pkg.RawChatResponse
	json.Unmarshal([]byte(script), &obj)

	log.Default().Println("Successful initial request...")

	for true {
		for _, val := range obj.ContinuationContents.LiveChatContinuation.Actions {
			renderer := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatTextMessageRenderer 
			if renderer == nil {
				giftMessage := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatSponsorshipsGiftPurchaseAnnouncementRenderer
				superchatMessage := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatPaidMessageRenderer
				if  giftMessage != nil {
					timestampUsec, _ := strconv.Atoi(giftMessage.TimestampUsec)
					videoOffsetMs, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)
					badges := parseBadges(giftMessage.Header.LiveChatSponsorshipsHeaderRenderer.AuthorBadges)

					amountStr := giftMessage.Header.LiveChatSponsorshipsHeaderRenderer.PrimaryText.Runs[1].Text
					amount := 1
					
					amount, _ = strconv.Atoi(amountStr)

					giftObj := pkg.GiftItem{
						AuthorChannelId: giftMessage.AuthorExternalChannelId,
						Id: giftMessage.Id,
						TimestampUsec: timestampUsec,
						VideoOffsetTimeMsec: videoOffsetMs,
						Badges: badges,
						Amount: amount,
					}
					gifts = append(gifts, giftObj)
				} 
				if superchatMessage != nil {
					timestampUsec, _ := strconv.Atoi(superchatMessage.TimestampUsec)
					videoOffsetTimeMsec, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)
					sp := strings.Split(superchatMessage.PurchaseAmountText.SimpleText, " ")
					badges := parseBadges(superchatMessage.AuthorBadges)
					text := parseTextRuns(superchatMessage.Message.Runs)
					
					superchatObj := pkg.SuperchatItem{
						Id: superchatMessage.Id,
						TimestampUsec: timestampUsec,
						AuthorName: superchatMessage.AuthorName.SimpleText,
						AuthorChannelId: superchatMessage.AuthorExternalChannelId,
						Color: superchatMessage.BodyBackgroundColor,
						VideoOffsetTimeMsec: videoOffsetTimeMsec,
						Amount: sp[0],
						Currency: sp[1],
						Badges: badges,
						Text: text,
					}
					superchats = append(superchats, superchatObj)
				}
				continue
			}
			ts, _ := strconv.Atoi(renderer.TimestampUsec)
			badges := make([]pkg.Badge, len(renderer.AuthorBadges))
			textRuns := make([]string, len(renderer.Message.Runs))
		
			for i, badge := range renderer.AuthorBadges {
				tooltip := badge.LiveChatAuthorBadgeRenderer.Tooltip
				if	tooltip == "Bestätigt" {
					badges[i] = pkg.Badge{Type: pkg.VERIFIED}
				} else if tooltip == "Kanalinhaber"{
					badges[i] = pkg.Badge{Type: pkg.CHANNELOWNER}
				} else if tooltip == "Neues Mitglied"{
					duration := -1
					badges[i] = pkg.Badge{Type: pkg.MEMBER, Duration: duration}
				} else {
					member := memberRegex.FindStringSubmatch(tooltip)
					if member != nil {
						duration, _ := strconv.Atoi(member[1])
						badges[i] = pkg.Badge{Type: pkg.MEMBER, Duration: duration}
					}
				}
			}
	
			for i, msg := range renderer.Message.Runs {
				text := msg.Text
				if len(text) > 0 {
					textRuns[i] = text
				}else if msg.Emoji != nil {
					if len(msg.Emoji.Shortcuts) > 0 {
						textRuns[i] = msg.Emoji.Shortcuts[0]
					}else{
						textRuns[i] = msg.Emoji.EmojiId
					}
				}
			}
	
			if len(badges) == 0{
				badges = append(badges, pkg.Badge{Type: pkg.NONE})
			}
	
			videoOffsetMs, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)
	
			chat = append(chat, pkg.ChatItem{
				AuthorChannelId: renderer.AuthorExternalChannelId,
				AuthorName: renderer.AuthorName.SimpleText,
				Id: renderer.Id,
				TimestampUsec: ts,
				Badges: badges,
				VideoOffsetTimeMsec: videoOffsetMs,
				Text: textRuns,
			})
		}

		contId = obj.ContinuationContents.LiveChatContinuation.Continuations[0].LiveChatReplayContinuationData.Continuation
		lastOffset := chat[len(chat)-1].VideoOffsetTimeMsec
		if len(obj.ContinuationContents.LiveChatContinuation.Continuations) == 1 {
			break
		}

		reqObj := pkg.NewLiveChatReqBody(contId, lastOffset)
		log.Default().Printf("Parsed all chat messages until offset %d", lastOffset)

		req := liveChatRequest(reqObj, key)

		res, _ := client.Do(req)
		if res.StatusCode != 200 {
			log.Fatal(res.Status)
		}
		resBodyBytes, _ := ioutil.ReadAll(res.Body)
		res.Body.Close()

		var tempObj pkg.RawChatResponse
		
		err := json.Unmarshal(resBodyBytes, &tempObj)
		if err != nil {
			log.Fatal("Could not parse live chat json response")
		}
		obj = tempObj

		time.Sleep(1*time.Second)
	}


	m, _ := json.Marshal(chat)

	werr := os.WriteFile("./out/chat.json", m, 0644)
	if werr != nil {
		log.Fatal(werr)
	}

	g, _ := json.Marshal(gifts)

	werr = os.WriteFile("./out/gifts.json", g, 0644)
	if werr != nil {
		log.Fatal(werr)
	}

	s, _ := json.Marshal(superchats)

	werr = os.WriteFile("./out/superchats.json", s, 0644)
	if werr != nil {
		log.Fatal(werr)
	}
}

func loadChatJsonData(path string, chatObj *[]pkg.ChatItem){
	dat, _ := os.ReadFile(path)
	err := json.Unmarshal(dat, chatObj)
	if err != nil {
		log.Fatal(err)
	}
}


func main() {
	args := os.Args[1:]

	if len(args) > 0 {
		getLiveChatResponse(args[0])
	}

	chat := []pkg.ChatItem{}
	loadChatJsonData("./out/chat.json", &chat)
	userMap := make(map[string]int)
	channelIdUserMap := make(map[string]string)
	channelIdMemberMap := make(map[string]int)
	membershipMap := make(map[int]int)


	userArr := []pkg.User{}

	for _, val := range chat {
		count := userMap[val.AuthorChannelId]
		if _, ex := channelIdUserMap[val.AuthorChannelId]; !ex {
			channelIdUserMap[val.AuthorChannelId] = val.AuthorName
			for _, badge := range val.Badges {
				if badge.Type == pkg.MEMBER {
					channelIdMemberMap[val.AuthorChannelId] = badge.Duration
					membershipMap[badge.Duration] = membershipMap[badge.Duration] + 1
					break
				}
			}

		}
		userMap[val.AuthorChannelId] = count+1
	}
	for id, count := range userMap{
		userArr = append(userArr, pkg.User{Name: channelIdUserMap[id], AmountChats: count, Membership: channelIdMemberMap[id]})
	}

	sort.Slice(userArr, func(i, j int) bool {
		return userArr[i].AmountChats > userArr[j].AmountChats
	})

	fmt.Printf("%d people sent messages in this stream.\n", len(channelIdUserMap))
	fmt.Printf("People sent %d chat messages in this stream.\n", len(chat))
	fmt.Printf("The User '%s' sent the most messages, a total of %d.\n", userArr[0].Name, userArr[0].AmountChats)
	fmt.Println("Top 5 Chatters")
	for i := 0; i < 5; i++{
		fmt.Printf("User: %s | Messages:%d\n", userArr[i].Name, userArr[i].AmountChats)
	}

	

	frameDuration := 60000

	labels := make([]int, chat[len(chat)-1].VideoOffsetTimeMsec / frameDuration)
	for i := range labels {
		labels[i] = i
	}

	timeMap := make(map[int]int)

	for _, val := range chat{
		timeframe := val.VideoOffsetTimeMsec / frameDuration
		timeMap[timeframe] = timeMap[timeframe] + 1
	}

	max := chat[len(chat)-1].VideoOffsetTimeMsec / frameDuration
	timeData := make([]opts.BarData, max+1)

	for key, value := range timeMap {
		timeData[key] = opts.BarData{Value: value}
	}

	memberMax := -1
	for i := range membershipMap {
		if i > memberMax {
			memberMax = i
		}
	}

	memberLabels := make([]string, memberMax+1)
	for i:=0; i<memberMax+1; i++{
		if i == 0 {
			memberLabels[i] = "<1"
			continue
		}
		memberLabels[i] = strconv.Itoa(i)
	}

	memberShipData := make([]opts.BarData, memberMax+1)
	for i, val := range membershipMap {
		if i == -1 {
			memberShipData[0] = opts.BarData{Value: val}
			continue
		}
		memberShipData[i] = opts.BarData{Value: val}
	}

	bar := charts.NewBar()
	bar.SetGlobalOptions(charts.WithTitleOpts(opts.Title{
		Title:    "Amount of chat messages per minute"	}))

	bar.SetXAxis(labels).AddSeries("Chat Messages", timeData)

	f, _ := os.Create("./plots/bar.html")
	bar.Render(f)

	memBar := charts.NewBar()
	memBar.SetGlobalOptions(charts.WithTitleOpts(opts.Title{
		Title:    "Amount of Memberships by Duration[Month]"	}))

	memBar.SetXAxis(memberLabels).AddSeries("Membership duration", memberShipData)

	f, _ = os.Create("./plots/membar.html")
	memBar.Render(f)
}