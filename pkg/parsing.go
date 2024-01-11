package pkg

import (
	"regexp"
	"strconv"
)

func parseBadges(rawBadges []AuthorBadges) []Badge {
	memberRegex := regexp.MustCompile(`Mitglied\s\((\d+)\x{00a0}Monate*\)`)
	memberYearRegex := regexp.MustCompile(`Mitglied\s\((\d+)\x{00a0}Jahr[e*]*\)`)

	badges := make([]Badge, len(rawBadges))

	for i, badge := range rawBadges {
		tooltip := badge.LiveChatAuthorBadgeRenderer.Tooltip
		if tooltip == "Bestätigt" {
			badges[i] = Badge{Type: VERIFIED}
		} else if tooltip == "Kanalinhaber" {
			badges[i] = Badge{Type: CHANNELOWNER}
		} else if tooltip == "Neues Mitglied" {
			duration := -1
			badges[i] = Badge{Type: MEMBER, Duration: duration}
		} else if member := memberRegex.FindStringSubmatch(tooltip); member != nil {
			duration, _ := strconv.Atoi(member[1])
			badges[i] = Badge{Type: MEMBER, Duration: duration}
		} else if member := memberYearRegex.FindStringSubmatch(tooltip); member != nil {
			duration, _ := strconv.Atoi(member[1])
			badges[i] = Badge{Type: MEMBER, Duration: duration * 12}
		}
	}
	return badges
}


func parseTextRuns(rawTextRuns []Runs) []string {
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