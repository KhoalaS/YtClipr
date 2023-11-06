package main

import (
	"com/khoa/ytc-dl/pkg"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"

	"github.com/anaskhan96/soup"
)

var client = http.Client{}
const userAgent string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36" 

func baseRequest(method string, url string) *http.Request {
	req, _ := http.NewRequest(method, url, nil)
	
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

func getLivechatUrl(id string) string {
	return fmt.Sprintf("https://www.youtube.com/live_chat_replay?continuation=%s", id)
}

func getLiveChatResponse(contId string) {

	req := baseRequest("GET", getLivechatUrl(contId))
	res, _ := client.Do(req)

	if res.StatusCode != 200 {
		log.Default().Println("Could not make request")
		return
	}


	bytes, err := ioutil.ReadAll(res.Body)
	
	if err != nil {
		log.Fatal(err)
	}
	text := string(bytes)
	doc := soup.HTMLParse(text)
	script := doc.Find("body").FindAll("script")[1].Text()
	script = script[26:len(script)-1]

	var obj pkg.RawChatResponse
	json.Unmarshal([]byte(script), &obj)

	chatItems := make([]pkg.ChatItem, len(obj.ContinuationContents.LiveChatContinuation.Actions))

	for i, val := range obj.ContinuationContents.LiveChatContinuation.Actions {
		renderer := val.ReplayChatItemAction.Actions[0].AddChatItemAction.Item.LiveChatTextMessageRenderer 
		ts, _ := strconv.Atoi(renderer.TimestampUsec)
		var badges []pkg.Badge
		memberRegex := regexp.MustCompile(`Mitglied\s\((\d+)\x{00a0}Monate*\)`)

		if renderer.AuthorBadges != nil {
			badges := []pkg.Badge{}
			for _, badge := range renderer.AuthorBadges {
				tooltip := badge.LiveChatAuthorBadgeRenderer.Tooltip
				if	tooltip == "Bestätigt" {
					badges = append(badges, pkg.Badge{Type: pkg.VERIFIED})
				}
				if tooltip == "Kanalinhaber"{
					badges = append(badges, pkg.Badge{Type: pkg.CHANNELOWNER})
				}
				member := memberRegex.FindStringSubmatch(tooltip)
				if member != nil {
					duration, _ := strconv.Atoi(member[1])
					badges = append(badges, pkg.Badge{Type: pkg.MEMEBR, Duration: duration})
				}
			}	
		}
		if len(badges) == 0{
			badges = append(badges, pkg.Badge{Type: pkg.NONE})
		}
		videoOffsetMs, _ := strconv.Atoi(val.ReplayChatItemAction.VideoOffsetTimeMsec)

		chatItems[i] = pkg.ChatItem{
			AuthorChannelId: renderer.AuthorExternalChannelId,
			AuthorName: renderer.AuthorName.SimpleText,
			Id: renderer.Id,
			TimestampUsec: ts,
			Badges: badges,
			VideoOffsetTimeMsec: videoOffsetMs,
		}
	}
	m, _ := json.Marshal(obj)

	werr := os.WriteFile("./data.json", m, 0644)
	if werr != nil {
		log.Fatal(werr)
	}

	m, _ = json.Marshal(chatItems)

	werr = os.WriteFile("./data_clean.json", m, 0644)
	if werr != nil {
		log.Fatal(werr)
	}

}


func main() {
	args := os.Args[1:]

	contId := getContinuation(args[0])
	getLiveChatResponse(contId)
	
}