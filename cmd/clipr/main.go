package main

import (
	"com/khoa/ytc-dl/pkg"
	"database/sql"
	"flag"
	"fmt"
	"html/template"
	"log"
	"net"
	"net/http"
	"net/url"
	"regexp"
	"sort"
	"strconv"
	"time"

	"github.com/go-echarts/go-echarts/v2/components"

	_ "modernc.org/sqlite"
)

var client = http.Client{}
var db *sql.DB

func main() {
	pkg.MakeDir("./out")
	pkg.MakeDir("./plots")

	topn := flag.Int("t", 100, "display top t active sections.")
	dbpath := flag.String("db", "./out/data.db", "path to database")

	flag.Parse()

	var err error
	db, err = sql.Open("sqlite", *dbpath)
	if err != nil {
		log.Fatal(err)
	}

	var chat []pkg.ChatItem
	var gifts []pkg.GiftItem
	var superchats []pkg.SuperchatItem
	duration := 0
	offset := 0

	var userMap map[string]int
	var channelIdUserMap map[string]string
	var channelIdMemberMap map[string]int
	var membershipMap map[int]int

	var userArr []pkg.User
	var vId string

	urlRegex := regexp.MustCompile(`https:\/\/www\.youtube\.com\/watch\?v=.+`)

	l, err := net.Listen("tcp", ":8082")
	if err != nil {
		log.Fatal(err)
	}

	wsServer := &http.Server{
		Handler: pkg.EchoServer{
			LogF:     log.Printf,
			Duration: &duration,
			Offset:   &offset,
		},
		ReadTimeout:  time.Second * 10,
		WriteTimeout: time.Second * 10,
	}

	go wsServer.Serve(l)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /users", func(w http.ResponseWriter, r *http.Request) {
		tmpl, _ := template.ParseFiles("template/users.html")
		n := 100
		if len(userArr) < 100 {
			n = len(userArr)
		}

		loyalty := loyaltyScore(userMap, channelIdMemberMap)
		tmpl.Execute(w, struct {
			Data    []pkg.User
			Loyalty float64
		}{
			userArr[:n],
			loyalty,
		})
	})
	mux.HandleFunc("/analyze", func(w http.ResponseWriter, r *http.Request) {
		rawUrl := r.FormValue("url")
		if !urlRegex.MatchString(rawUrl) {
			w.WriteHeader(424)
			w.Write([]byte("not a youtube url"))
			return
		}

		userMap = make(map[string]int)
		channelIdUserMap = make(map[string]string)
		channelIdMemberMap = make(map[string]int)
		membershipMap = make(map[int]int)
		userArr = []pkg.User{}

		pUrl, err := url.Parse(rawUrl)
		if err != nil {
			w.WriteHeader(424)
			w.Write([]byte("parse error"))
			return
		}

		vId = pUrl.Query().Get("v")
		chat, gifts, superchats = pkg.GetLiveChatResponse(fmt.Sprintf("https://www.youtube.com/watch?v=%s", vId), &client, db, &offset, &duration)
		for _, val := range chat {
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

		for id, count := range userMap {
			userArr = append(userArr, pkg.User{Name: channelIdUserMap[id], AmountChats: count, Membership: channelIdMemberMap[id]})
		}

		sort.Slice(userArr, func(i, j int) bool {
			return userArr[i].AmountChats > userArr[j].AmountChats
		})
	})

	mux.HandleFunc("/stats", func(w http.ResponseWriter, r *http.Request) {
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
	mux.HandleFunc("/{$}", func(w http.ResponseWriter, r *http.Request) {
		tmpl, _ := template.ParseFiles("template/index.html")
		tmpl.Execute(w, nil)
	})
	mux.HandleFunc("GET /top", func(w http.ResponseWriter, r *http.Request) {
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

		if *topn > len(timeArr) {
			*topn = len(timeArr)
		}
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

			embed := &pkg.EmbedData{Timestamp: fmt.Sprintf("%s:%s", hStartStr, mStartStr), URL: embedUrl, Amount: val.Value}
			embeds = append(embeds, embed)
		}

		tmpl, _ := template.ParseFiles("template/top.html")
		tmpl.Execute(w, embeds)
	})
	mux.HandleFunc("POST /search", func(w http.ResponseWriter, r *http.Request) {
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
	mux.HandleFunc("POST /searchuser", func(w http.ResponseWriter, r *http.Request) {
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
	mux.HandleFunc("GET /s", func(w http.ResponseWriter, r *http.Request) {
		tmpl, _ := template.ParseFiles("template/search.html")
		tmpl.Execute(w, nil)
	})

	mux.HandleFunc("GET /download", func(w http.ResponseWriter, r *http.Request) {
		// start offset in seconds
		start, _ := strconv.Atoi(r.URL.Query().Get("start"))
		stop, _ := strconv.Atoi(r.URL.Query().Get("stop"))

		pkg.Download(start, stop, vId)
	})

	mux.Handle("/static/", http.FileServer(http.Dir("./")))
	err = http.ListenAndServe(":8081", mux)
	if err != nil {
		log.Fatal(err)
	}
}

type FrontendChatItem struct {
	pkg.ChatItem
	URL string
}

func loyaltyScore(userMap map[string]int, memberMap map[string]int) float64 {
	rating := 0.0
	max := 0
	maxMem := 0
	for _, dur := range memberMap {
		if dur > maxMem {
			maxMem = dur
		}
	}

	for id, count := range userMap {
		mem := float64(memberMap[id])
		if mem == -1 {
			mem = 1
		} else if mem == 0 {
			mem = 0.5
		}

		rank := float64(count) * mem / float64(maxMem)
		rating += rank
		max += count
	}

	return rating / float64(max)
}
