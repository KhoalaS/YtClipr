package pkg

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/anaskhan96/soup"
)

const userAgent string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"

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

func getContinuation(url string, client *http.Client) (string, int, int64, string, string, string, string, string, string, error) {
	req := baseRequest("GET", url)

	res, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	if res.StatusCode != 200 {
		return "", 0, 0, "", "", "", "", "", "", fmt.Errorf("could not request next continuation id: %d", res.StatusCode)
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
		return "", 0, 0, "", "", "", "", "", "", fmt.Errorf("Live-Chat not available for stream")
	}

	duration := 1
	durRegex := regexp.MustCompile(`<meta itemprop="duration" content="PT(.+?)">`)
	match := durRegex.FindStringSubmatch(text)

	if len(match) == 2 {
		minutes := 0
		seconds := 0
		offset := 0
		for idx, c := range match[1] {
			if c == 'M' {
				minutes, _ = strconv.Atoi(match[1][offset:idx])
				offset = idx + 1
			} else if c == 'S' {
				seconds, _ = strconv.Atoi(match[1][offset:idx])
			}
		}
		duration = (seconds + 60*minutes) * 1000
	}

	dateRegex := regexp.MustCompile(`"publishDate":"(.+?)"`)
	match = dateRegex.FindStringSubmatch(text)
	var ts int64 = 0

	if len(match) == 2 {
		// format 2024-07-15T03:04:34-07:00
		date := match[1]
		dateParse, _ := time.Parse(time.RFC3339, date)
		ts = dateParse.Unix()
	}

	thRegex := regexp.MustCompile(`"thumbnails":(\[.+?\])`)
	match = thRegex.FindStringSubmatch(text)
	th := ""
	if len(match) == 2 {
		var ths []Thumbnail

		json.Unmarshal([]byte(match[1]), &ths)
		for _, t := range ths {
			th = t.Url
			if t.Width > 300 {
				break
			}
		}
	}

	title := ""
	titleRegex := regexp.MustCompile(`<meta name="title" content="(.+?)"`)
	match = titleRegex.FindStringSubmatch(text)
	if len(match) == 2 {
		title = match[1]
	}

	views := ""
	viewRegex := regexp.MustCompile(`viewCount":"(.+?)"`)
	match = viewRegex.FindStringSubmatch(text)
	if len(match) == 2 {
		views = match[1]
	}

	channelId := ""
	channelRegex := regexp.MustCompile(`"channelId":"(.+?)"`)
	match = channelRegex.FindStringSubmatch(text)
	if len(match) == 2 {
		channelId = match[1]
	}

	pfpRegex := regexp.MustCompile(`videoOwnerRenderer.+?(\[.+?\])`)
	match = pfpRegex.FindStringSubmatch(text)
	pfp := ""
	if len(match) == 2 {
		var ths []Thumbnail
		json.Unmarshal([]byte(match[1]), &ths)
		for _, th := range ths {
			pfp = th.Url
			if th.Height > 80 {
				break
			}
		}
	}

	nameRegex := regexp.MustCompile(`<link itemprop="name" content="(.+?)"`)
	match = nameRegex.FindStringSubmatch(text)
	name := ""
	if len(match) == 2 {
		name = match[1]
	}

	os.WriteFile("./out/getContRes.html", bytes, 0644)
	return cont[2][1], duration, ts, th, title, views, channelId, pfp, name, nil
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
	/*
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
	*/
	return "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
}

func GetLiveChatResponse(rawUrl string, client *http.Client, db *sql.DB, offset *int, duration *int) ([]ChatItem, []GiftItem, []SuperchatItem, error) {

	pUrl, _ := url.Parse(rawUrl)
	vId := pUrl.Query().Get("v")
	if len(vId) == 0 {
		log.Fatal("Invalid url")
	}

	chat := []ChatItem{}
	gifts := []GiftItem{}
	superchats := []SuperchatItem{}

	var cData []byte
	var gData []byte
	var sData []byte

	row := db.QueryRow("SELECT data FROM chats WHERE id = ?", vId)
	if !errors.Is(row.Scan(&cData), sql.ErrNoRows) {
		gRow := db.QueryRow("SELECT data FROM gifts WHERE id = ?", vId)
		gRow.Scan(&gData)
		sRow := db.QueryRow("SELECT data FROM superchats WHERE id = ?", vId)
		sRow.Scan(&sData)

		json.Unmarshal(cData, &chat)
		json.Unmarshal(gData, &gifts)
		json.Unmarshal(sData, &superchats)

		*duration = 1
		*offset = 1
		return chat, gifts, superchats, nil
	}

	key := getKey(client)
	log.Printf("Aquired API key: %s\n", key)
	contId, d, ts, th, title, views, channelId, pfp, name, err := getContinuation(rawUrl, client)
	if err != nil {
		return nil, nil, nil, err
	}

	*duration = d

	channel := db.QueryRow("SELECT id FROM channels WHERE id = ?", channelId)
	if errors.Is(channel.Scan(&channelId), sql.ErrNoRows) {
		db.Exec("INSERT INTO channels VALUES (?,?,?)", channelId, pfp, name)
	}

	_, err = db.Exec("INSERT INTO streams VALUES (?,?,?,?,?,?,?)", vId, d, ts, th, title, views, channelId)
	if err != nil {
		log.Fatal("error inserting into db:", err)
	}
	log.Printf("Aquired continuation ID: %s\n", contId)

	req := getLivechatReq(contId)
	res, err := client.Do(req)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("could not make initial request: %w", err)
	}

	if res.StatusCode != 200 {
		log.Default().Println("Could not make request")
		return nil, nil, nil, fmt.Errorf("initial request returned: %d", res.StatusCode)
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

	for {
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
		*offset = lastOffset
		if len(obj.ContinuationContents.LiveChatContinuation.Continuations) == 1 {
			break
		}

		reqObj := NewLiveChatReqBody(contId, lastOffset)
		//log.Default().Printf("Parsed all chat messages until offset %d\r", lastOffset)

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
	_, err = db.Exec("INSERT INTO chats VALUES (?,?)", vId, m)
	if err != nil {
		log.Fatal(err)
	}

	g, _ := json.Marshal(gifts)

	_, err = db.Exec("INSERT INTO gifts VALUES (?,?)", vId, g)
	if err != nil {
		log.Fatal(err)
	}

	s, _ := json.Marshal(superchats)

	_, err = db.Exec("INSERT INTO superchats VALUES (?,?)", vId, s)
	if err != nil {
		log.Fatal(err)
	}

	*offset = *duration

	return chat, gifts, superchats, nil
}

func Download(start int, stop int, vId string) {
	outDir := fmt.Sprintf("out/%s", vId)
	os.MkdirAll(outDir, 0775)

	startH := start / 3600
	startM := (start % 3600) / 60
	startS := start % 60

	stopH := stop / 3600
	stopM := (stop % 3600) / 60
	stopS := stop % 60

	url := fmt.Sprintf("https://youtube.com/watch?v=%s", vId)

	ytdlp := exec.Command("yt-dlp")
	ytdlp.Args = append(ytdlp.Args, fmt.Sprintf("--download-sections=*%d:%d:%d-%d:%d:%d", startH, startM, startS, stopH, stopM, stopS))
	ytdlp.Args = append(ytdlp.Args, "-o", fmt.Sprintf("%s/%%(section_start)s.%%(ext)s", outDir), url)
	ytdlp.Stdout = os.Stdout
	ytdlp.Stderr = os.Stderr
	ytdlp.Start()
	ytdlp.Wait()
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
			mStart = 59
			hStart--
		} else if mStart < 0 {
			m = 0
			mStart = 0
		}

		if m == 59 {
			m = 0
			h++
		} else {
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
