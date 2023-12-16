package main

import (
	"bytes"
	"com/khoa/ytc-dl/pkg"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"

	//"time"

	"github.com/anaskhan96/soup"
	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/components"
	"github.com/go-echarts/go-echarts/v2/opts"
)

var client = http.Client{}

const userAgent string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"

func baseRequest(method string, url string) *http.Request {
	req, err := http.NewRequest(method, url, nil)
	errLog(err, "Could not create baseRequest")

	req.Header.Add("User-Agent", userAgent)
	return req
}

func errLog(err error, msg string) {
	if err != nil {
		log.Default().Println(msg)
		log.Fatal(err)
		return
	}
}

func getMemberOffers(channelHandle string){
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

func liveChatRequest(reqObj pkg.LiveChatReqBody, key string) *http.Request {
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

func getContinuation(url string) string {
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
	cont := r.FindAllStringSubmatch(text, 3)

	if len(cont) != 3 {
		log.Fatal("Could not find continuation for live-chat")
	}
	os.WriteFile("./out/getContRes.html", bytes, 0644)
	return cont[2][1]
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

func parseBadges(rawBadges []pkg.AuthorBadges) []pkg.Badge {
	memberRegex := regexp.MustCompile(`Mitglied\s\((\d+)\x{00a0}Monate*\)`)
	memberYearRegex := regexp.MustCompile(`Mitglied\s\((\d+)\x{00a0}Jahr[e*]*\)`)
	
	badges := make([]pkg.Badge, len(rawBadges))

	for i, badge := range rawBadges {
		tooltip := badge.LiveChatAuthorBadgeRenderer.Tooltip
		if tooltip == "Bestätigt" {
			badges[i] = pkg.Badge{Type: pkg.VERIFIED}
		} else if tooltip == "Kanalinhaber" {
			badges[i] = pkg.Badge{Type: pkg.CHANNELOWNER}
		} else if tooltip == "Neues Mitglied" {
			duration := -1
			badges[i] = pkg.Badge{Type: pkg.MEMBER, Duration: duration}
		} else if member := memberRegex.FindStringSubmatch(tooltip); member != nil{
			duration, _ := strconv.Atoi(member[1])
			badges[i] = pkg.Badge{Type: pkg.MEMBER, Duration: duration}
		} else if member := memberYearRegex.FindStringSubmatch(tooltip); member != nil{
			duration, _ := strconv.Atoi(member[1])
			badges[i] = pkg.Badge{Type: pkg.MEMBER, Duration: duration * 12}
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
		} else if msg.Emoji != nil {
			if len(msg.Emoji.Shortcuts) > 0 {
				textRuns[i] = msg.Emoji.Shortcuts[0]
			} else {
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

	var obj pkg.RawChatResponse
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

					giftObj := pkg.GiftItem{
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

					superchatObj := pkg.SuperchatItem{
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

					superchatObj := pkg.SuperchatItem{
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
				badges = append(badges, pkg.Badge{Type: pkg.NONE})
			}

			videoOffsetMs, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)

			chat = append(chat, pkg.ChatItem{
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

		reqObj := pkg.NewLiveChatReqBody(contId, lastOffset)
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

		var tempObj pkg.RawChatResponse

		err = json.Unmarshal(resBodyBytes, &tempObj)
		if err != nil {
			log.Fatal("Could not parse live chat json response")
		}
		obj = tempObj

		time.Sleep(100*time.Millisecond)
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

func loadChatJsonData(path string, chatObj *[]pkg.ChatItem) {
	dat, _ := os.ReadFile(path)
	err := json.Unmarshal(dat, chatObj)
	if err != nil {
		log.Fatal(err)
	}
}

func loadSuperchatJsonData(path string, chatObj *[]pkg.SuperchatItem) {
	dat, _ := os.ReadFile(path)
	err := json.Unmarshal(dat, chatObj)
	if err != nil {
		log.Fatal(err)
	}
}

func loadGiftJsonData(path string, chatObj *[]pkg.GiftItem) {
	dat, _ := os.ReadFile(path)
	err := json.Unmarshal(dat, chatObj)
	if err != nil {
		log.Fatal(err)
	}
}

func getSuperchatPieData(scMap map[int64]int) []opts.PieData {
	items := make([]opts.PieData, 7)
	items[0] = opts.PieData{Name: "Blue", Value: scMap[pkg.BLUE]}
	items[1] = opts.PieData{Name: "Light Blue", Value: scMap[pkg.LIGHTBLUE]}
	items[2] = opts.PieData{Name: "Green", Value: scMap[pkg.GREEN]}
	items[3] = opts.PieData{Name: "Yellow", Value: scMap[pkg.YELLOW]}
	items[4] = opts.PieData{Name: "Orange", Value: scMap[pkg.ORANGE]}
	items[5] = opts.PieData{Name: "Pink", Value: scMap[pkg.PINK]}
	items[6] = opts.PieData{Name: "Red", Value: scMap[pkg.RED]}

	return items
}

func dollarFormat(val float64) string {
	return fmt.Sprintf("%.2f", val)
}

func getSuperchatBarData(scMap map[int64]float64) []opts.BarData {
	items := make([]opts.BarData, 7)
	items[0] = opts.BarData{Name: "Blue", Value: dollarFormat(scMap[pkg.BLUE])}
	items[1] = opts.BarData{Name: "Light Blue", Value: dollarFormat(scMap[pkg.LIGHTBLUE])}
	items[2] = opts.BarData{Name: "Green", Value: dollarFormat(scMap[pkg.GREEN])}
	items[3] = opts.BarData{Name: "Yellow", Value: dollarFormat(scMap[pkg.YELLOW])}
	items[4] = opts.BarData{Name: "Orange", Value: dollarFormat(scMap[pkg.ORANGE])}
	items[5] = opts.BarData{Name: "Pink", Value: dollarFormat(scMap[pkg.PINK])}
	items[6] = opts.BarData{Name: "Red", Value: dollarFormat(scMap[pkg.RED])}

	return items
}

func getScPieChart(superchats []pkg.SuperchatItem) *charts.Pie {
	exchangeRates := pkg.GetRates(&client)
	scMap := map[int64]int{}
	scTotalDollar := 0.0

	for _, item := range superchats {
		scMap[item.Color] += 1
		convAmount := exchangeRates.GetDollarAmount(item.Amount, item.Currency)
		scTotalDollar += convAmount
	}

	items := getSuperchatPieData(scMap)

	pie := charts.NewPie()
	pie.SetGlobalOptions(
		charts.WithTitleOpts(opts.Title{Title: "Amount Superchats"}),
		charts.WithColorsOpts(opts.Colors{"#1e88e5", "#00e5ff", "#1de9b6", "#ffca28", "#f57c00", "#e91e63", "#e62117"}),
	)

	pie.AddSeries("Superchats", items).
		SetSeriesOptions(charts.WithLabelOpts(
			opts.Label{
				Show:      true,
				Formatter: "{b}: {c}",
			}),
		)

	return pie
}

func getScBarChart(superchats []pkg.SuperchatItem) *charts.Bar {
	exchangeRates := pkg.GetRates(&client)
	scMap := map[int64]float64{}

	for _, item := range superchats {
		scMap[item.Color] += exchangeRates.GetDollarAmount(item.Amount, item.Currency)
	}

	items := getSuperchatBarData(scMap)

	bar := charts.NewBar()
	bar.SetGlobalOptions(
		charts.WithTooltipOpts(opts.Tooltip{Show: true, Formatter: "${c}"}),
		charts.WithLegendOpts(opts.Legend{Show: true, Right: "80px"}),
		charts.WithTitleOpts(opts.Title{Title: "Dollar Amount Superchats"}),
		charts.WithColorsOpts(opts.Colors{"#1e88e5", "#00e5ff", "#1de9b6", "#ffca28", "#f57c00", "#e91e63", "#e62117"}),
	)

	labels := []string{"Blue", "LightBlue",
		"Green",
		"Yellow",
		"Orange",
		"Pink",
		"Red"}
	bar.SetXAxis([]string{"Superchat Tiers"})
	for i, item := range items {
		bar.AddSeries(labels[i], []opts.BarData{item})
	}

	return bar
}

func getChatMembershipBarChart(membershipMap map[int]int) *charts.Bar {
	memberMax := -1
	for i := range membershipMap {
		if i > memberMax {
			memberMax = i
		}
	}

	memberLabels := make([]string, memberMax+1)
	for i := 0; i < memberMax+1; i++ {
		if i == 0 {
			memberLabels[i] = "<1"
			continue
		}
		memberLabels[i] = strconv.Itoa(i) + "+"
	}

	memberShipData := make([]opts.BarData, memberMax+1)
	for i, val := range membershipMap {
		if i == -1 {
			memberShipData[0] = opts.BarData{Value: val}
			continue
		}
		memberShipData[i] = opts.BarData{Value: val}
	}
	memBar := charts.NewBar()
	memBar.SetGlobalOptions(
		charts.WithColorsOpts(opts.Colors{"#2ba640"}),
		charts.WithTitleOpts(
			opts.Title{
				Title: "Amount Chatters with Membership by Duration[Month]"}),
		charts.WithTooltipOpts(opts.Tooltip{Show: true}),
		charts.WithLegendOpts(opts.Legend{Show: true, Right: "80px"}),
	)

	memBar.SetXAxis(memberLabels).AddSeries("Duration", memberShipData)
	return memBar
}

func getChatMessagesBarChart(chat []pkg.ChatItem, superchats []pkg.SuperchatItem, membershipMap map[int]int) *charts.Bar {
	frameDuration := 60000

	labels := make([]string, chat[len(chat)-1].VideoOffsetTimeMsec/frameDuration)
	for i := range labels {
		m := i % 60
		h := (i - m) / 60
		mStr := strconv.Itoa(m)
		if m < 10 {
			mStr = "0" + mStr
		}
		label := fmt.Sprintf("%d:%s", h, mStr)
		labels[i] = label
	}

	timeMap := make(map[int]int)
	scTimeMap := make(map[int]int)

	for _, val := range chat {
		timeframe := val.VideoOffsetTimeMsec / frameDuration
		timeMap[timeframe] = timeMap[timeframe] + 1
	}

	for _, val := range superchats {
		timeframe := val.VideoOffsetTimeMsec / frameDuration
		scTimeMap[timeframe] = scTimeMap[timeframe] + 1
	}

	max := chat[len(chat)-1].VideoOffsetTimeMsec / frameDuration
	timeData := make([]opts.BarData, max+1)
	scTimeData := make([]opts.BarData, max+1)

	for key, value := range timeMap {
		timeData[key] = opts.BarData{Value: value}
	}
	
	for key, value := range scTimeMap {
		scTimeData[key] = opts.BarData{Value: value}
	}

	bar := charts.NewBar()

	bar.SetGlobalOptions(charts.WithTitleOpts(opts.Title{
		Title: "Amount of Chat Messages per Minute"}),
		charts.WithTooltipOpts(opts.Tooltip{Show: true}),
		charts.WithLegendOpts(opts.Legend{Show: true, Right: "80px"}),
	)

	bar.SetXAxis(labels).
		AddSeries("Chat Messages", timeData).
		AddSeries("Superchats", scTimeData)
	return bar
}

func getMembershipPieChart(gifts []pkg.GiftItem) *charts.Pie {
	pie := charts.NewPie()
	memberMap := make(map[int]int)
	items := make([]opts.PieData, 5)

	for _, item := range gifts {
		memberMap[item.Amount] += 1
	}

	items[0] = opts.PieData{Name: "1 Gift", Value: memberMap[1]}
	items[1] = opts.PieData{Name: "5 Gift", Value: memberMap[5]}
	items[2] = opts.PieData{Name: "10 Gift", Value: memberMap[10]}
	items[3] = opts.PieData{Name: "20 Gift", Value: memberMap[20]}
	items[4] = opts.PieData{Name: "50 Gift", Value: memberMap[50]}

	pie.SetGlobalOptions(
		charts.WithTitleOpts(opts.Title{Title: "Amount Membership Gifts"}),
		charts.WithColorsOpts(opts.Colors{"#00e5ff", "#ffca28", "#f57c00","#e91e63", "#e62117"}),
	)

	pie.AddSeries("Superchats", items).
		SetSeriesOptions(charts.WithLabelOpts(
			opts.Label{
				Show:      true,
				Formatter: "{b}: {c}",
			}),
		)
	return pie
}

func main() {

	pkg.MakeDir("./out")
	pkg.MakeDir("./plots")

	searchPtr := flag.String("s", "", "Word to search for in chat message")
	flag.Parse()

	args := flag.Args()
	if len(args) > 0 {
		getLiveChatResponse(args[0])
	}

	var r *regexp.Regexp
	search := false

	if len(*searchPtr) != 0 {
		r, _ = regexp.Compile(*searchPtr)
		search = true
	}

	chat := []pkg.ChatItem{}
	superchats := []pkg.SuperchatItem{}
	gifts := []pkg.GiftItem{}

	loadChatJsonData("./out/chat.json", &chat)
	loadSuperchatJsonData("./out/superchats.json", &superchats)
	loadGiftJsonData("./out/gifts.json", &gifts)

	userMap := make(map[string]int)
	channelIdUserMap := make(map[string]string)
	channelIdMemberMap := make(map[string]int)
	membershipMap := make(map[int]int)

	userArr := []pkg.User{}
	searchCounter := 0

	for _, val := range chat {
		if search {
			for _, t := range val.Text {
				if r.MatchString(t) {
					searchCounter++
					break
					//log.Default().Println(val.AuthorName, val.Text, val.TimestampUsec)
				}
			}
		}
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
		userMap[val.AuthorChannelId] = count + 1
	}

	if search {
		log.Default().Printf("Amount of messages containing '%s': %d", *searchPtr, searchCounter)
	}

	for id, count := range userMap {
		userArr = append(userArr, pkg.User{Name: channelIdUserMap[id], AmountChats: count, Membership: channelIdMemberMap[id]})
	}

	sort.Slice(userArr, func(i, j int) bool {
		return userArr[i].AmountChats > userArr[j].AmountChats
	})

	fmt.Printf("%d people sent messages in this stream.\n", len(channelIdUserMap))
	fmt.Printf("People sent %d chat messages in this stream.\n", len(chat))
	fmt.Printf("The User '%s' sent the most messages, a total of %d.\n", userArr[0].Name, userArr[0].AmountChats)
	fmt.Println("Top 5 Chatters")
	for i := 0; i < 5; i++ {
		fmt.Printf("User: %s | Messages:%d\n", userArr[i].Name, userArr[i].AmountChats)
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		page := components.NewPage()

		page.AddCharts(
			getChatMessagesBarChart(chat, superchats, membershipMap),
			getChatMembershipBarChart(membershipMap),
			getScPieChart(superchats),
			getScBarChart(superchats),
			getMembershipPieChart(gifts),
		)
	
		page.Render(w)
	})

	http.ListenAndServe(":8081", nil)
}
