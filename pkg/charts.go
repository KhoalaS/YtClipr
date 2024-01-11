package pkg

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/opts"
)

const frameDuration = 60000

func GetMembershipPieChart(gifts []GiftItem) *charts.Pie {
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
		charts.WithColorsOpts(opts.Colors{"#1de9b6", "#f57c00", "#e91e63", "#e62117", "#8c0b0b"}),
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

func GetChatMessagesBarChart(chat []ChatItem, superchats []SuperchatItem) *charts.Bar {
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

func GetChatMembershipBarChart(membershipMap map[int]int) *charts.Bar {
	memberMax := -1
	for i := range membershipMap {
		if i > memberMax {
			memberMax = i
		}
	}
	if memberMax == -1 {
		memberMax = 0
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

func GetScBarChart(superchats []SuperchatItem, client *http.Client) *charts.Bar {
	exchangeRates := GetRates(client)
	scMap := map[int64]float64{}

	for _, item := range superchats {
		scMap[item.Color] += exchangeRates.GetDollarAmount(item.Amount, item.Currency)
	}

	items := GetSuperchatBarData(scMap)

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

func GetScPieChart(superchats []SuperchatItem, client *http.Client) *charts.Pie {
	exchangeRates := GetRates(client)
	scMap := map[int64]int{}
	scTotalDollar := 0.0

	for _, item := range superchats {
		scMap[item.Color] += 1
		convAmount := exchangeRates.GetDollarAmount(item.Amount, item.Currency)
		scTotalDollar += convAmount
	}

	items := GetSuperchatPieData(scMap)

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

func GetSuperchatBarData(scMap map[int64]float64) []opts.BarData {
	items := make([]opts.BarData, 7)
	items[0] = opts.BarData{Name: "Blue", Value: dollarFormat(scMap[BLUE])}
	items[1] = opts.BarData{Name: "Light Blue", Value: dollarFormat(scMap[LIGHTBLUE])}
	items[2] = opts.BarData{Name: "Green", Value: dollarFormat(scMap[GREEN])}
	items[3] = opts.BarData{Name: "Yellow", Value: dollarFormat(scMap[YELLOW])}
	items[4] = opts.BarData{Name: "Orange", Value: dollarFormat(scMap[ORANGE])}
	items[5] = opts.BarData{Name: "Pink", Value: dollarFormat(scMap[PINK])}
	items[6] = opts.BarData{Name: "Red", Value: dollarFormat(scMap[RED])}

	return items
}

func GetSuperchatPieData(scMap map[int64]int) []opts.PieData {
	items := make([]opts.PieData, 7)
	items[0] = opts.PieData{Name: "Blue", Value: scMap[BLUE]}
	items[1] = opts.PieData{Name: "Light Blue", Value: scMap[LIGHTBLUE]}
	items[2] = opts.PieData{Name: "Green", Value: scMap[GREEN]}
	items[3] = opts.PieData{Name: "Yellow", Value: scMap[YELLOW]}
	items[4] = opts.PieData{Name: "Orange", Value: scMap[ORANGE]}
	items[5] = opts.PieData{Name: "Pink", Value: scMap[PINK]}
	items[6] = opts.PieData{Name: "Red", Value: scMap[RED]}

	return items
}

func dollarFormat(val float64) string {
	return fmt.Sprintf("%.2f", val)
}