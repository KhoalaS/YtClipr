package pkg

import (
	"encoding/json"
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

	f, err := os.ReadFile("./out/latest.json")
	check(err)

	var oldExObj ExchangeRateResponse

	err = json.Unmarshal(f, &oldExObj)
	check(err)

	if time.Now().UnixMilli() - oldExObj.Timestamp < 86400000 {
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
	var exObj ExchangeRateResponse
	
	err = json.Unmarshal(resBodyBytes, &exObj)
	check(err)

	return exObj
}