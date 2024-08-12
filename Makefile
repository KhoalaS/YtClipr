TMP_DIR = /tmp/clipr_build
BUILD_DIR = $(shell pwd)/build

build: cmd/clipr/main.go pkg/*.go cmd/clipr/static/**/*
	$(MAKE) frontend
	go build -o build/clipr cmd/clipr/main.go

build_linux: cmd/clipr/main.go pkg/*.go cmd/clipr/static/**/*
	mkdir $(TMP_DIR)
	cp .env $(TMP_DIR)
	sqlite3 $(TMP_DIR)/data.db < create.sql
	
	env GOOS=linux GOARCH=amd64 go build -o build/linux/clipr cmd/clipr/main.go
	cp build/linux/clipr $(TMP_DIR)
	cd /tmp && zip -r $(BUILD_DIR)/build_linux_amd64.zip clipr_build

	rm -r $(TMP_DIR)

build_windows: cmd/clipr/main.go pkg/*.go cmd/clipr/static/**/*
	mkdir $(TMP_DIR)
	cp .env $(TMP_DIR)
	sqlite3 $(TMP_DIR)/data.db < create.sql

	env GOOS=windows GOARCH=amd64 go build -o build/windows/clipr.exe cmd/clipr/main.go
	cp build/windows/clipr.exe $(TMP_DIR)
	cd /tmp && zip -r $(BUILD_DIR)/build_windows_amd64.zip clipr_build
	
	rm -r $(TMP_DIR)

build_mac: cmd/clipr/main.go pkg/*.go cmd/clipr/static/**/*
	mkdir $(TMP_DIR)
	cp .env $(TMP_DIR)
	sqlite3 $(TMP_DIR)/data.db < create.sql
	
	env GOOS=darwin GOARCH=amd64 go build -o build/mac/intel/clipr cmd/clipr/main.go
	cp build/mac/arm/clipr $(TMP_DIR)
	cd /tmp && zip -r $(BUILD_DIR)/build_mac_arm64.zip clipr_build
	rm $(TMP_DIR)/clipr

	env GOOS=darwin GOARCH=arm64 go build -o build/mac/arm/clipr cmd/clipr/main.go
	cp build/mac/intel/clipr $(TMP_DIR)
	cd /tmp && zip -r $(BUILD_DIR)/build_mac_amd64.zip clipr_build
	
	rm -r $(TMP_DIR)

frontend: cmd/clipr/static/main.css
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css

release:
	$(MAKE) frontend
	$(MAKE) build_linux
	$(MAKE) build_windows
	$(MAKE) build_mac

	

