package pkg

import (
	"fmt"
	"strconv"
	"strings"
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
										Runs []Runs `json:"runs"`
									} `json:"message"`
									TimestampUsec string `json:"timestampUsec"`
									AuthorBadges []AuthorBadges `json:"authorBadges"`
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
											AuthorBadges []AuthorBadges `json:"authorBadges"`
										} `json:"liveChatSponsorshipsHeaderRenderer"`
									} `json:"header,omitempty"`
								} `json:"liveChatSponsorshipsGiftPurchaseAnnouncementRenderer"` 
								LiveChatPaidMessageRenderer *LiveChatPaidMessageRenderer `json:"liveChatPaidMessageRenderer,omitempty"`
								LiveChatPaidStickerRenderer *LiveChatPaidStickerRenderer `json:"liveChatPaidStickerRenderer,omitempty"`
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

type AuthorBadges struct {
	LiveChatAuthorBadgeRenderer struct {
		Tooltip       string `json:"tooltip"`
	} `json:"liveChatAuthorBadgeRenderer"`
}

type Runs struct {
	Text string `json:"text,omitempty"`
	Emoji *struct {
		EmojiId string `json:"emojiId"`
		Shortcuts []string `json:"shortcuts"`
	}`json:"emoji,omitempty"`
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

type LiveChatPaidMessageRenderer struct {
	Id            string `json:"id"`
	TimestampUsec string `json:"timestampUsec"`
	AuthorName    struct {
		SimpleText string `json:"simpleText"`
	} `json:"authorName"`
	PurchaseAmountText struct {
		SimpleText string `json:"simpleText"`
	} `json:"purchaseAmountText"`
	Message struct {
		Runs []Runs `json:"runs"`
	} `json:"message"`
	BodyBackgroundColor     int64  `json:"bodyBackgroundColor"`
	AuthorExternalChannelId string `json:"authorExternalChannelId"`
	AuthorBadges []AuthorBadges `json:"authorBadges"`
}

type LiveChatPaidStickerRenderer struct {
	Id                  string `json:"id"`
	TimestampUsec string `json:"timestampUsec"`
	AuthorName struct {
		SimpleText string `json:"simpleText"`
	} `json:"authorName"`
	PurchaseAmountText       struct {
		SimpleText string `json:"simpleText"`
	} `json:"purchaseAmountText"`
	BackgroundColor      int64  `json:"backgroundColor"`
	AuthorExternalChannelId string `json:"authorExternalChannelId"`
	AuthorBadges []AuthorBadges `json:"authorBadges"`
	Sticker struct {
		Thumbnails []struct {
			URL    string `json:"url"`
			Width  int    `json:"width"`
			Height int    `json:"height"`
		} `json:"thumbnails"`
		Accessibility struct {
			AccessibilityData struct {
				Label string `json:"label"`
			} `json:"accessibilityData"`
		} `json:"accessibility"`
	} `json:"sticker"`
}

type SuperchatItem struct {
	Id string `json:"id"`
	TimestampUsec int `json:"timestampUsec"`
	AuthorName string `json:"authorName"`
	Amount string `json:"amount"`
	Currency string `json:"currency"`
	Text []string `json:"text"`
	Color int64 `json:"color"`
	AuthorChannelId string `json:"authorChannelId"`
	Badges []Badge `json:"badges"`	
	VideoOffsetTimeMsec int `json:"videoOffsetTimeMsec"`
}

type ExchangeRateResponse struct {
	Disclaimer string `json:"disclaimer"`
	License    string `json:"license"`
	Timestamp  int64    `json:"timestamp"`
	Base       string `json:"base"`
	Rates      map[string]float64 `json:"rates"`
}

func (exObj ExchangeRateResponse) GetDollarAmount(amount string, currency string) float64 {
	amountF, err := strconv.ParseFloat(amount, 64)
	check(err)

	switch currency {
		case "$":
			return amountF
		case "€":
			return amountF / exObj.Rates["EUR"]
		case "£":
			return amountF / exObj.Rates["GBP"]
		case "฿":	
			return amountF / exObj.Rates["THB"]
		case "¥":
			return amountF / exObj.Rates["JPY"]
		default:
			rate, ex := exObj.Rates[currency]
			if !ex {
				currencySnd := codeSymbolMap[currency]
				rateSnd, exSnd :=  exObj.Rates[currencySnd]
				if !exSnd {
					currencyThr := strings.Replace(currency, "$", "D", 1)
					rateThr, exThr :=  exObj.Rates[currencyThr]
					if !exThr {
						fmt.Println(currency, "not found")
						return 0
					}
					return amountF / rateThr
				}
				return amountF / rateSnd
			}
			return amountF / rate
		}
}

var codeSymbolMap map[string]string = map[string]string{
	"Lek": "ALL",
"؋": "AFN",
"$": "ARS",
"ƒ": "AWG",
"₼": "AZN",
"Br": "BYN",
"BZ$": "BZD",
"$b": "BOB",
"KM": "BAM",
"P": "BWP",
"лв": "BGN",
"R$": "BRL",
"៛": "KHR",
"¥": "CNY",
"₡": "CRC",
"kn": "HRK",
"₱": "CUP",
"Kč": "CZK",
"kr": "DKK",
"RD$": "DOP",
"£": "EGP",
"€": "EUR",
"¢": "GHS",
"Q": "GTQ",
"L": "HNL",
"Ft": "HUF",
"₹": "INR",
"Rp": "IDR",
"﷼": "IRR",
"₪": "ILS",
"J$": "JMD",
"₩": "KPW",
"₭": "LAK",
"ден": "MKD",
"RM": "MYR",
"₨": "MUR",
"₮": "MNT",
"د.إ": "MNT",
"MT": "MZN",
"C$": "NIO",
"₦": "NGN",
"B/.": "PAB",
"Gs": "PYG",
"S/.": "PEN",
"zł": "PLN",
"lei": "RON",
"₽": "RUB",
"Дин.": "RSD",
"S": "SOS",
"R": "ZAR",
"CHF": "CHF",
"NT$": "TWD",
"฿": "THB",
"TT$": "TTD",
"₺": "TRY",
"₴": "UAH",
"$U": "UYU",
"Bs": "VEF",
"₫": "VND",
"Z$": "ZWD",
"MX$": "MXN",
}


var CodeColorMap map[int64]string = map[int64]string{
	4280191205: "Blue",
	4278248959: "LightBlue",
	4280150454: "Green",
	4294953512: "Yellow",
	4294278144: "Orange",
	4293467747: "Pink",
	4293271831: "Red",
}
type Sc int64

const (
	BLUE = 4280191205
	LIGHTBLUE = 4278248959
	GREEN = 4280150454
	YELLOW = 4294953512
	ORANGE = 4294278144
	PINK = 4293467747
	RED = 4293271831
)

type ChatData struct {
	Timestamp int
	Value int
}

type EmbedData struct {
	URL string
	Timestamp string
	Amount int
}
	