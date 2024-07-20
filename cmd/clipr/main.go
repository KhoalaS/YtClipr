package main

import (
	"com/khoa/ytc-dl/pkg"
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"sort"

	"github.com/go-echarts/go-echarts/v2/components"
)

var client = http.Client{}

func main() {

	pkg.MakeDir("./out")
	pkg.MakeDir("./plots")

	searchPtr := flag.String("s", "", "Regex to search for in chat message")
	userSearch := flag.String("u", "", "Extract the messages of user with given username")
	extract := flag.Bool("x", false, "Extract the matched string")
	topn := flag.Int("t", 0, "Download the top n most active sections.")
	local := flag.Bool("l", false, "Use local files for charts.")

	flag.Parse()

	args := flag.Args()
	if len(args) > 0 && !*local {
		pkg.GetLiveChatResponse(args[0], &client)
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

	chat := []pkg.ChatItem{}
	superchats := []pkg.SuperchatItem{}
	gifts := []pkg.GiftItem{}

	pkg.LoadChatJsonData("./out/chat.json", &chat)
	pkg.LoadSuperchatJsonData("./out/superchats.json", &superchats)
	pkg.LoadGiftJsonData("./out/gifts.json", &gifts)
	title := pkg.LoadTitle()

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

	if *topn > 0 && len(args) > 0 {
		pkg.DownloadTopNClips(chat, *topn, title, args[0])
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		page := components.NewPage()

		page.AddCharts(
			pkg.GetChatMessagesBarChart(chat, superchats),
			pkg.GetChatMembershipBarChart(membershipMap),
			pkg.GetScPieChart(superchats, &client),
			pkg.GetScBarChart(superchats, &client),
			pkg.GetMembershipPieChart(gifts),
		)

		page.Render(w)
	})

	http.ListenAndServe(":8081", nil)
}
