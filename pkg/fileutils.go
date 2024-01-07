package pkg

import (
	"fmt"
	"os"
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
