package pkg

type RawChatResponse struct {
	ContinuationContents struct {
		LiveChatContinuation struct {
			Actions []struct {
				ReplayChatItemAction struct {
					Actions []struct{
						AddChatItemAction struct {
							Item struct {
								LiveChatTextMessageRenderer struct {
									AuthorExternalChannelId string `json:"authorExternalChannelId"`
									AuthorName struct {
										SimpleText string `json:"simpleText"`
									} `json:"authorName"`
									Id string `json:"id"`
									Message struct {
										Runs []struct {
											Text string `json:"text"`
										} `json:"runs"`
									} `json:"message"`
									TimestampUsec string `json:"timestampUsec"`
									AuthorBadges []struct{
										LiveChatAuthorBadgeRenderer struct {
											Tooltip string `json:"tooltip"`
										} `json:"liveChatAuthorBadgeRenderer"`
									} `json:"authorBadges"`
								} `json:"liveChatTextMessageRenderer"`
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
}

type Badge struct {
	Type int `json:"type"`
	Duration int `json:"duration"`
}

const (
	NONE=iota
	VERIFIED
	MODERATOR
	MEMEBR
	CHANNELOWNER
)