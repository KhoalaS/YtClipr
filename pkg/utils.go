package pkg

import "log"

func errLog(err error, msg string) {
	if err != nil {
		log.Default().Println(msg)
		log.Fatal(err)
		return
	}
}