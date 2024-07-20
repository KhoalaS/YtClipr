package main

import (
	"com/khoa/ytc-dl/pkg"
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"sort"

	"github.com/go-echarts/go-echarts/v2/components"

	_ "modernc.org/sqlite"
)

var client = http.Client{}
var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("sqlite", "out/data.db")
	if err != nil {
		log.Fatal(err)
	}

	pkg.MakeDir("./out")
	pkg.MakeDir("./plots")

	searchPtr := flag.String("s", "", "Regex to search for in chat message")
	userSearch := flag.String("u", "", "Extract the messages of user with given username")
	extract := flag.Bool("x", false, "Extract the matched string")
	topn := flag.Int("t", 0, "Download the top n most active sections.")

	flag.Parse()

	args := flag.Args()

	if len(args) == 0 {
		log.Println("No youtube url argument")
		return
	}

	var r *regexp.Regexp
	search := false
	uSearch := false

	if len(*searchPtr) != 0 {
		r, _ = regexp.Compile(*searchPtr)
		search = true
	}

	if len(*userSearch) != 0 {
		uSearch = true
	}

	pUrl, err := url.Parse(args[0])
	if err != nil {
		log.Fatalf("Invalid url %s\n", args[0])
	}

	vId := pUrl.Query().Get("v")
	if len(vId) == 0 {
		log.Fatalf("Invalid url %s, no video id\n", args[0])
	}

	chat, gifts, superchats := pkg.GetLiveChatResponse(args[0], &client, db)

	userMap := make(map[string]int)
	channelIdUserMap := make(map[string]string)
	channelIdMemberMap := make(map[string]int)
	membershipMap := make(map[int]int)

	userArr := []pkg.User{}
	searchCounter := 0
	searchUsers := make(map[string]int)
	searchMessage := make(map[string]string)
	searchUser := []pkg.ChatItem{}

	for _, val := range chat {
		if uSearch {
			if val.AuthorName == *userSearch {
				searchUser = append(searchUser, val)
			}
		}
		if search {
			for _, t := range val.Text {
				if f := r.FindString(t); len(f) > 0 {
					if _, ex := searchMessage[val.AuthorChannelId]; !ex {
						if *extract {
							searchMessage[val.AuthorChannelId] = f
						} else {
							searchMessage[val.AuthorChannelId] = t
						}
					}
					searchCounter++
					searchUsers[val.AuthorChannelId]++
					break
					//log.Default().Println(val.AuthorName, val.Text, val.TimestampUsec)
				}
			}
		}
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
		userMap[val.AuthorChannelId]++
	}

	if search {
		fmt.Printf("Amount of messages containing '%s': %d\n", *searchPtr, searchCounter)
		fmt.Printf("Amount of users sending messages containing '%s': %d\n", *searchPtr, len(searchUsers))
		mapFile, _ := os.Create("./out/searchMessage.json")
		mapBytes, _ := json.Marshal(searchMessage)
		mapFile.Write(mapBytes)
		mapFile.Close()
	}

	if uSearch {
		fmt.Printf("Amount of messages from '%s': %d\n", *userSearch, len(searchUser))
		mapFile, _ := os.Create("./out/searchUserMessage.json")
		mapBytes, _ := json.Marshal(searchUser)
		mapFile.Write(mapBytes)
		mapFile.Close()

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
		page.PageTitle = "Chat Analytics"

		page.AddCharts(
			pkg.GetChatMessagesBarChart(chat, superchats),
			pkg.GetChatMembershipBarChart(membershipMap),
			pkg.GetScPieChart(superchats, &client),
			pkg.GetScBarChart(superchats, &client),
			pkg.GetMembershipPieChart(gifts),
		)

		page.Render(w)
	})

	http.HandleFunc("GET /top", func(w http.ResponseWriter, r *http.Request) {
		timeMap := make(map[int]int)

		for _, val := range chat {
			timeframe := val.VideoOffsetTimeMsec / 60000
			timeMap[timeframe] = timeMap[timeframe] + 1
		}

		timeArr := make([]pkg.ChatData, len(timeMap))
		i := 0

		for ts, val := range timeMap {
			timeArr[i] = pkg.ChatData{Timestamp: ts, Value: val}
			i++
		}
		sort.Slice(timeArr, func(i2, j int) bool {
			return timeArr[j].Value < timeArr[i2].Value
		})

		embeds := []*pkg.EmbedData{}

		topArr := timeArr[:*topn]
		for _, val := range topArr {
			m := val.Timestamp % 60
			h := (val.Timestamp - m) / 60

			mStart := m
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

			secs := val.Timestamp*60 - 20
			if secs < 0 {
				secs = 0
			}

			embedUrl := fmt.Sprintf("https://www.youtube.com/embed/%s?&amp;start=%d", vId, secs)

			embed := &pkg.EmbedData{Timestamp: fmt.Sprintf("%s:%s", hStartStr, mStartStr), URL: embedUrl}
			embeds = append(embeds, embed)
		}

		tmpl, _ := template.ParseFiles("template/top.html")
		tmpl.Execute(w, embeds)
	})

	http.HandleFunc("POST /search", func(w http.ResponseWriter, r *http.Request) {
		q := r.FormValue("q")
		reg, _ := regexp.Compile(q)

		res := []*FrontendChatItem{}

		for _, c := range chat {
			found := false
			for _, t := range c.Text {
				if f := reg.FindString(t); len(f) > 0 {
					found = true
					break
				}
			}
			if !found {
				continue
			}

			secs := c.VideoOffsetTimeMsec / 1000
			url := fmt.Sprintf("https://youtube.com/watch?v=%s&t=%ds", vId, secs)
			res = append(res, &FrontendChatItem{c, url})
		}

		tmpl, _ := template.ParseFiles("template/searchresult.html")
		tmpl.Execute(w, res)

	})
	http.HandleFunc("POST /searchuser", func(w http.ResponseWriter, r *http.Request) {
		u := r.FormValue("u")

		res := []*FrontendChatItem{}

		for _, c := range chat {
			if c.AuthorName == u {
				secs := c.VideoOffsetTimeMsec / 1000
				url := fmt.Sprintf("https://youtube.com/watch?v=%s&t=%ds", vId, secs)
				res = append(res, &FrontendChatItem{c, url})
			}
		}

		tmpl, _ := template.ParseFiles("template/searchresult.html")
		tmpl.Execute(w, res)

	})
	http.HandleFunc("GET /s", func(w http.ResponseWriter, r *http.Request) {
		tmpl, _ := template.ParseFiles("template/search.html")
		tmpl.Execute(w, nil)
	})
	http.ListenAndServe(":8081", nil)
}

type FrontendChatItem struct {
	pkg.ChatItem
	URL string
}
