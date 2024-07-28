package pkg

import (
	"log"
	"os"
)

func MakeDir(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		// Directory doesn't exist, so create it
		err := os.MkdirAll(path, 0755) // 0755 is the permission mode for the new directory
		if err != nil {
			log.Println("Error creating directory:", err)
			return false
		}
		log.Println("Directory created:", path)
	}
	return true
}
