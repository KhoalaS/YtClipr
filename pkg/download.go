package pkg

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"
	"bytes"

	"github.com/anaskhan96/soup"
)

const userAgent string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"


func liveChatRequest(reqObj LiveChatReqBody, key string) *http.Request {
	bodyBytes, err := json.Marshal(reqObj)
	errLog(err, "Could not marhsal reqObj")

	req, _ := http.NewRequest("POST", "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat_replay", bytes.NewBuffer(bodyBytes))
	q := req.URL.Query()
	q.Add("key", key)
	q.Add("prettyPrint", "false")

	req.URL.RawQuery = q.Encode()

	req.Header.Add("User-Agent", userAgent)

	return req
}

func getContinuation(url string, client *http.Client) string {
	req := baseRequest("GET", url)

	res, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	if res.StatusCode != 200 {
		log.Fatal("Could not request next continuation id...")
		return ""
	}

	defer res.Body.Close()
	bytes, err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	text := string(bytes)
	r := regexp.MustCompile(`"continuation":"([^\"]+)"`)
	tr := regexp.MustCompile(`<title>(.+)<\/title>`)

	cont := r.FindAllStringSubmatch(text, 3)
	titleMatch := tr.FindStringSubmatch(text)

	go func() {
		f, _ := os.Create("./out/title.txt")
		defer f.Close()

		if len(titleMatch) != 2 {
			log.Fatal("Could not extract title")
		} else {
			f.Write([]byte(titleMatch[1]))
		}
	}()

	if len(cont) != 3 {
		log.Fatal("Could not find continuation for live-chat")
	}
	os.WriteFile("./out/getContRes.html", bytes, 0644)
	return cont[2][1]
}

func baseRequest(method string, url string) *http.Request {
	req, err := http.NewRequest(method, url, nil)
	errLog(err, "Could not create baseRequest")

	req.Header.Add("User-Agent", userAgent)
	return req
}

func getLivechatReq(id string) *http.Request {
	req := baseRequest("GET", "https://www.youtube.com/live_chat_replay")
	q := req.URL.Query()
	q.Add("continuation", id)
	q.Add("playerOffsetMs", "0")

	req.URL.RawQuery = q.Encode()
	return req
}

func getKey(client *http.Client) string {
	req := baseRequest("GET", "https://youtube.com")

	res, err := client.Do(req)
	errLog(err, "Could not make request for key")

	if res.StatusCode != 200 {
		log.Fatal(res.Status)
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)

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

func GetLiveChatResponse(url string, client *http.Client) {
	chat := []ChatItem{}
	gifts := []GiftItem{}
	superchats := []SuperchatItem{}

	key := getKey(client)
	fmt.Printf("Aquired API key: %s\n", key)
	contId := getContinuation(url, client)
	fmt.Printf("Aquired continuation ID: %s\n", contId)

	req := getLivechatReq(contId)
	res, err := client.Do(req)
	errLog(err, "Could not make initial request")

	if res.StatusCode != 200 {
		log.Default().Println("Could not make request")
		return
	}

	bodyBytes, err := io.ReadAll(res.Body)

	if err != nil {
		log.Fatal(err)
	}
	text := string(bodyBytes)
	doc := soup.HTMLParse(text)
	script := doc.Find("body").FindAll("script")[1].Text()
	script = script[26 : len(script)-1]

	var obj RawChatResponse
	json.Unmarshal([]byte(script), &obj)

	log.Default().Println("Successful initial request...")

	for true {
		for _, val := range obj.ContinuationContents.LiveChatContinuation.Actions {
			renderer := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatTextMessageRenderer
			if renderer == nil {
				giftMessage := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatSponsorshipsGiftPurchaseAnnouncementRenderer
				superchatMessage := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatPaidMessageRenderer
				superstickerMessage := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatPaidStickerRenderer
				if giftMessage != nil {
					timestampUsec, _ := strconv.Atoi(giftMessage.TimestampUsec)
					videoOffsetMs, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)
					badges := parseBadges(giftMessage.Header.LiveChatSponsorshipsHeaderRenderer.AuthorBadges)

					amountStr := giftMessage.Header.LiveChatSponsorshipsHeaderRenderer.PrimaryText.Runs[1].Text
					amount := 1

					amount, _ = strconv.Atoi(amountStr)

					giftObj := GiftItem{
						AuthorChannelId:     giftMessage.AuthorExternalChannelId,
						Id:                  giftMessage.Id,
						TimestampUsec:       timestampUsec,
						VideoOffsetTimeMsec: videoOffsetMs,
						Badges:              badges,
						Amount:              amount,
					}
					gifts = append(gifts, giftObj)
				}
				if superchatMessage != nil {
					// add supersticker support
					timestampUsec, _ := strconv.Atoi(superchatMessage.TimestampUsec)
					videoOffsetTimeMsec, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)
					sp := strings.Split(superchatMessage.PurchaseAmountText.SimpleText, " ")
					sp[0] = strings.ReplaceAll(sp[0], ".", "")
					sp[0] = strings.ReplaceAll(sp[0], ",", ".")
					badges := parseBadges(superchatMessage.AuthorBadges)
					text := parseTextRuns(superchatMessage.Message.Runs)

					superchatObj := SuperchatItem{
						Id:                  superchatMessage.Id,
						TimestampUsec:       timestampUsec,
						AuthorName:          superchatMessage.AuthorName.SimpleText,
						AuthorChannelId:     superchatMessage.AuthorExternalChannelId,
						Color:               superchatMessage.BodyBackgroundColor,
						VideoOffsetTimeMsec: videoOffsetTimeMsec,
						Amount:              sp[0],
						Currency:            sp[1],
						Badges:              badges,
						Text:                text,
					}
					superchats = append(superchats, superchatObj)
				}
				if superstickerMessage != nil {
					// add supersticker support
					timestampUsec, _ := strconv.Atoi(superstickerMessage.TimestampUsec)
					videoOffsetTimeMsec, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)
					sp := strings.Split(superstickerMessage.PurchaseAmountText.SimpleText, " ")
					sp[0] = strings.ReplaceAll(sp[0], ".", "")
					sp[0] = strings.ReplaceAll(sp[0], ",", ".")
					badges := parseBadges(superstickerMessage.AuthorBadges)

					superchatObj := SuperchatItem{
						Id:                  superstickerMessage.Id,
						TimestampUsec:       timestampUsec,
						AuthorName:          superstickerMessage.AuthorName.SimpleText,
						AuthorChannelId:     superstickerMessage.AuthorExternalChannelId,
						Color:               superstickerMessage.BackgroundColor,
						VideoOffsetTimeMsec: videoOffsetTimeMsec,
						Amount:              sp[0],
						Currency:            sp[1],
						Badges:              badges,
					}
					superchats = append(superchats, superchatObj)
				}
				continue
			}
			ts, _ := strconv.Atoi(renderer.TimestampUsec)
			badges := parseBadges(renderer.AuthorBadges)
			textRuns := parseTextRuns(renderer.Message.Runs)

			if len(badges) == 0 {
				badges = append(badges, Badge{Type: NONE})
			}

			videoOffsetMs, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)

			chat = append(chat, ChatItem{
				AuthorChannelId:     renderer.AuthorExternalChannelId,
				AuthorName:          renderer.AuthorName.SimpleText,
				Id:                  renderer.Id,
				TimestampUsec:       ts,
				Badges:              badges,
				VideoOffsetTimeMsec: videoOffsetMs,
				Text:                textRuns,
			})
		}

		contId = obj.ContinuationContents.LiveChatContinuation.Continuations[0].LiveChatReplayContinuationData.Continuation
		lastOffset := chat[len(chat)-1].VideoOffsetTimeMsec
		if len(obj.ContinuationContents.LiveChatContinuation.Continuations) == 1 {
			break
		}

		reqObj := NewLiveChatReqBody(contId, lastOffset)
		log.Default().Printf("Parsed all chat messages until offset %d\r", lastOffset)

		req := liveChatRequest(reqObj, key)

		res, err := client.Do(req)
		errLog(err, "Could not make request")

		if res.StatusCode != 200 {
			log.Fatal(res.Status)
		}

		resBodyBytes, err := io.ReadAll(res.Body)
		errLog(err, "Could not read from response body")
		res.Body.Close()

		var tempObj RawChatResponse

		err = json.Unmarshal(resBodyBytes, &tempObj)
		if err != nil {
			log.Fatal("Could not parse live chat json response")
		}
		obj = tempObj

		time.Sleep(100 * time.Millisecond)
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

func DownloadTopNClips(chat []ChatItem, n int, title string, url string) {
	timeMap := make(map[int]int)

	for _, val := range chat {
		timeframe := val.VideoOffsetTimeMsec / frameDuration
		timeMap[timeframe] = timeMap[timeframe] + 1
	}

	timeArr := make([]ChatData, len(timeMap))
	i := 0

	for ts, val := range timeMap {
		timeArr[i] = ChatData{Timestamp: ts, Value: val}
		i++
	}
	sort.Slice(timeArr, func(i2, j int) bool {
		return timeArr[j].Value < timeArr[i2].Value
	})

	os.Mkdir(title, 0775)

	ytdlp := exec.Command("yt-dlp")

	topn := timeArr[:n]
	for _, val := range topn {
		m := val.Timestamp % 60
		h := (val.Timestamp - m) / 60

		mStart := m - 1
		hStart := h

		if mStart < 0 && h > 0 {
			m = 59
			hStart--
		} else if mStart < 0 {
			m = 0
		}

		if m == 59 {
			m = 0
			h++
		}else{
			m++
		}

		mStartStr := fmt.Sprintf("%d", mStart)
		if mStart < 10 {
			mStartStr = "0" + mStartStr
		}

		hStartStr := fmt.Sprintf("%d", hStart)
		if hStart < 10 {
			hStartStr = "0" + hStartStr
		}

		mStr := fmt.Sprintf("%d", m)
		if m < 10 {
			mStr = "0" + mStr
		}

		hStr := fmt.Sprintf("%d", h)
		if h < 10 {
			hStr = "0" + hStr
		}

		dl := fmt.Sprintf("--download-sections=*%s:%s:40-%s:%s:20", hStartStr, mStartStr, hStr, mStr)
		ytdlp.Args = append(ytdlp.Args, dl)
	}
	ytdlp.Args = append(ytdlp.Args, "-o", fmt.Sprintf("%s/%%(section_start)s.%%(ext)s", title), url)

	ytdlp.Stdout = os.Stdout
	ytdlp.Stderr = os.Stderr
	ytdlp.Start()
	ytdlp.Wait()

}

func GetMemberOffers(channelHandle string, client *http.Client) {
	req := baseRequest("GET", fmt.Sprintf("https://www.youtube.com/@%s", channelHandle))
	res, _ := client.Do(req)

	if res.StatusCode != 200 {
		log.Default().Printf("Could not fetch info of channel %s\n", channelHandle)
		return
	}

	defer res.Body.Close()
	bodyBytes, err := io.ReadAll(res.Body)
	errLog(err, "Could not read request body")

	bodyText := string(bodyBytes)
	r := regexp.MustCompile(`\"ypcGetOffersEndpoint\":\{\"params\":\"([^\"]+)\"}`)
	matches := r.FindStringSubmatch(bodyText)
	fmt.Println(matches)
}