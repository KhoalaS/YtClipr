package pkg

import (
	"fmt"
	"strconv"
)

type RawChatResponse struct {
	ContinuationContents struct {
		LiveChatContinuation struct {
			Actions []struct {
				ReplayChatItemAction struct {
					Actions []struct{
						AddChatItemAction struct {
							Item struct {
								LiveChatTextMessageRenderer *struct {
									AuthorExternalChannelId string `json:"authorExternalChannelId"`
									AuthorName struct {
										SimpleText string `json:"simpleText"`
									} `json:"authorName"`
									Id string `json:"id"`
									Message struct {
										Runs []struct {
											Text string `json:"text,omitempty"`
											Emoji *struct {
												EmojiId string `json:"emojiId"`
												Shortcuts []string `json:"shortcuts"`
											}`json:"emoji,omitempty"`

										} `json:"runs"`
									} `json:"message"`
									TimestampUsec string `json:"timestampUsec"`
									AuthorBadges []struct{
										LiveChatAuthorBadgeRenderer struct {
											Tooltip string `json:"tooltip"`
										} `json:"liveChatAuthorBadgeRenderer"`
									} `json:"authorBadges"`
								} `json:"liveChatTextMessageRenderer,omitempty"`
								LiveChatSponsorshipsGiftPurchaseAnnouncementRenderer *struct {
									AuthorExternalChannelId string `json:"authorExternalChannelId"`
									Id string `json:"id"`
									TimestampUsec string `json:"timestampUsec"`
									Header struct {
										LiveChatSponsorshipsHeaderRenderer struct {
											AuthorName struct {
												SimpleText string `json:"simpleText"`
											} `json:"authorName"`
											PrimaryText struct {
												Runs []struct {
													Text string `json:"text"`
												} `json:"runs"`
											} `json:"primaryText"`
											AuthorBadges []struct {
												LiveChatAuthorBadgeRenderer struct {
													Tooltip       string `json:"tooltip"`
												} `json:"liveChatAuthorBadgeRenderer"`
											} `json:"authorBadges"`
										} `json:"liveChatSponsorshipsHeaderRenderer"`
									} `json:"header,omitempty"`
								} `json:"liveChatSponsorshipsGiftPurchaseAnnouncementRenderer"`
							} `json:"item"`
						} `json:"addChatItemAction"`
					} `json:"actions"`
					VideoOffsetTimeMsec string `json:"videoOffsetTimeMsec"`
				} `json:"replayChatItemAction"`
			} `json:"actions"`
			Continuations []struct {
				LiveChatReplayContinuationData struct {
					Continuation string `json:"continuation"`
					TimeUntilLastMessageMsec int `json:"timeUntilLastMessageMsec"`
				} `json:"liveChatReplayContinuationData"`
			} `json:"continuations"`
		} `json:"liveChatContinuation"`
	} `json:"continuationContents"`
}

type ChatItem struct {
	AuthorChannelId string `json:"authorChannelId"`
	AuthorName string `json:"authorName"`
	Id string `json:"id"`
	TimestampUsec int `json:"timestampUsec"`
	Badges []Badge `json:"badges"`
	VideoOffsetTimeMsec int `json:"videoOffsetTimeMsec"`
	Text []string
}

type GiftItem struct{
	AuthorChannelId string `json:"authorChannelId"`
	Amount int `json:"amount"`
	Id string `json:"id"`
	TimestampUsec int `json:"timestampUsec"`
	VideoOffsetTimeMsec int `json:"videoOffsetTimeMsec"`
	Badges []Badge `json:"badges"`
}

type Badge struct {
	Type int `json:"type"`
	Duration int `json:"duration"`
}

const (
	NONE=iota
	VERIFIED
	MODERATOR
	MEMBER
	CHANNELOWNER
)

type LiveChatReqBody struct {
	Context struct {
		Client struct {
			Hl               string `json:"hl"`
			Gl               string `json:"gl"`
			UserAgent        string `json:"userAgent"`
			ClientName       string `json:"clientName"`
			ClientVersion    string `json:"clientVersion"`
			OriginalURL      string `json:"originalUrl"`
			Platform         string `json:"platform"`
			ClientFormFactor string `json:"clientFormFactor"`
			AcceptHeader     string `json:"acceptHeader"`
			UtcOffsetMinutes int    `json:"utcOffsetMinutes"`
		} `json:"client"`
		User struct {
			LockedSafetyMode bool `json:"lockedSafetyMode"`
		} `json:"user"`
		Request struct {
			UseSsl                  bool  `json:"useSsl"`
			InternalExperimentFlags []any `json:"internalExperimentFlags"`
			ConsistencyTokenJars    []any `json:"consistencyTokenJars"`
		} `json:"request"`
	} `json:"context"`
	Continuation       string `json:"continuation"`
	CurrentPlayerState struct {
		PlayerOffsetMs string `json:"playerOffsetMs"`
	} `json:"currentPlayerState"`
}

func NewLiveChatReqBody(id string, offset int) LiveChatReqBody {
	return LiveChatReqBody{
		Context: struct{
			Client struct{
				Hl string "json:\"hl\""; 
				Gl string "json:\"gl\""; 
				UserAgent string "json:\"userAgent\""; 
				ClientName string "json:\"clientName\""; 
				ClientVersion string "json:\"clientVersion\""; 
				OriginalURL string "json:\"originalUrl\""; 
				Platform string "json:\"platform\""; 
				ClientFormFactor string "json:\"clientFormFactor\""; 
				AcceptHeader string "json:\"acceptHeader\""; 
				UtcOffsetMinutes int "json:\"utcOffsetMinutes\""
			} "json:\"client\""; 
			User struct{
				LockedSafetyMode bool "json:\"lockedSafetyMode\""
			} "json:\"user\""; 
			Request struct{
				UseSsl bool "json:\"useSsl\""; 
				InternalExperimentFlags []any "json:\"internalExperimentFlags\""; 
				ConsistencyTokenJars []any "json:\"consistencyTokenJars\""
			} "json:\"request\""}{
				Client: struct{
					Hl string "json:\"hl\""; 
					Gl string "json:\"gl\""; 
					UserAgent string "json:\"userAgent\""; 
					ClientName string "json:\"clientName\""; 
					ClientVersion string "json:\"clientVersion\""; 
					OriginalURL string "json:\"originalUrl\""; 
					Platform string "json:\"platform\""; 
					ClientFormFactor string "json:\"clientFormFactor\""; 
					AcceptHeader string "json:\"acceptHeader\""; 
					UtcOffsetMinutes int "json:\"utcOffsetMinutes\""
				}{
					Hl: "de", 
					Gl: "DE", 
					UserAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36,gzip(gfe)", 
					ClientName: "WEB", 
					ClientVersion: "2.20231101.05.00", 
					OriginalURL: fmt.Sprintf("https://www.youtube.com/live_chat_replay?continuation=%s&playerOffsetMs=0", id),
					Platform: "DESKTOP",
					ClientFormFactor: "UNKNOWN_FORM_FACTOR",
					AcceptHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
					UtcOffsetMinutes: 60,
				},
				User: struct{LockedSafetyMode bool "json:\"lockedSafetyMode\""}{LockedSafetyMode: false},
				Request: struct{UseSsl bool "json:\"useSsl\""; InternalExperimentFlags []any "json:\"internalExperimentFlags\""; ConsistencyTokenJars []any "json:\"consistencyTokenJars\""}{
					UseSsl: true,
				},
			},
		Continuation: id,
		CurrentPlayerState: struct{PlayerOffsetMs string "json:\"playerOffsetMs\""}{PlayerOffsetMs: strconv.Itoa(offset)}}
}

type User struct {
	Name string
	AmountChats int
	Membership int
}
