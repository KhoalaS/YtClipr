package pkg

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

func check(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

func GetRates(client *http.Client) ExchangeRateResponse {

	if _, err := os.Stat("./out/latest.json"); errors.Is(err, os.ErrNotExist) {
		d1 := []byte("{}\n")
		err := os.WriteFile("./out/latest.json", d1, 0644)
		check(err)
	}

	f, err := os.ReadFile("./out/latest.json")
	check(err)

	var oldExObj ExchangeRateResponse

	err = json.Unmarshal(f, &oldExObj)
	check(err)

	timeDelta := time.Now().Unix() - oldExObj.Timestamp

	if timeDelta < 86400 {
		log.Default().Println("Exchange rates are already up to date")
		return oldExObj
	}

	var exObj ExchangeRateResponse

	API_KEY := os.Getenv("OPENEX_KEY")

	if len(API_KEY) == 0 {
		return oldExObj
	}

	url := fmt.Sprintf("https://openexchangerates.org/api/latest.json?app_id=%s", API_KEY)
	req, _ := http.NewRequest("GET", url, nil)
	res, err := client.Do(req)

	if err != nil {
		return oldExObj
	}

	if res.StatusCode == 200 {
		defer res.Body.Close()
		resBodyBytes, _ := io.ReadAll(res.Body)

		werr := os.WriteFile("./out/latest.json", resBodyBytes, 0644)
		check(werr)

		err = json.Unmarshal(resBodyBytes, &exObj)
		check(err)
	} else {
		return oldExObj
	}

	return exObj
}
