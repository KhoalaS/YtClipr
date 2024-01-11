package pkg

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
)

func MakeDir(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		// Directory doesn't exist, so create it
		err := os.MkdirAll(path, 0755) // 0755 is the permission mode for the new directory
		if err != nil {
			fmt.Println("Error creating directory:", err)
			return false
		}
		fmt.Println("Directory created:", path)
	}
	return true
}

func LoadChatJsonData(path string, chatObj *[]ChatItem) {
	dat, _ := os.ReadFile(path)
	err := json.Unmarshal(dat, chatObj)
	if err != nil {
		log.Fatal(err)
	}
}

func LoadSuperchatJsonData(path string, chatObj *[]SuperchatItem) {
	dat, _ := os.ReadFile(path)
	err := json.Unmarshal(dat, chatObj)
	if err != nil {
		log.Fatal(err)
	}
}

func LoadGiftJsonData(path string, chatObj *[]GiftItem) {
	dat, _ := os.ReadFile(path)
	err := json.Unmarshal(dat, chatObj)
	if err != nil {
		log.Fatal(err)
	}
}

func LoadTitle() string {
	dat, err := os.ReadFile("./out/title.txt")
	if err != nil {
		return ""
	}
	return strings.Trim(string(dat), "\n")
}