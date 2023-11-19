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

	API_KEY := os.Getenv("OPENEX_KEY")
	url := fmt.Sprintf("https://openexchangerates.org/api/latest.json?app_id=%s", API_KEY)
	req, _ := http.NewRequest("GET", url, nil)
	res, err := client.Do(req)

	check(err)

	if res.StatusCode != 200 {
		log.Fatal(res.Status)
	}

	defer res.Body.Close()
	resBodyBytes, _ := io.ReadAll(res.Body) 
	
	werr := os.WriteFile("./out/latest.json", resBodyBytes, 0644)
	check(werr)

	var exObj ExchangeRateResponse
	
	err = json.Unmarshal(resBodyBytes, &exObj)
	check(err)

	return exObj
}