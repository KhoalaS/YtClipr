build: cmd/clipr/main.go pkg/*.go cmd/clipr/static/main.css
	go build -o build/clipr cmd/clipr/main.go
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css

build_windows: cmd/clipr/main.go pkg/*.go cmd/clipr/static/main.css
	env GOOS=windows GOARCH=amd64 go build -o build/windows/clipr.exe cmd/clipr/main.go
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css

build_mac: cmd/clipr/main.go pkg/*.go cmd/clipr/static/main.css
	env GOOS=darwin GOARCH=amd64 go build -o build/mac/intel/clipr cmd/clipr/main.go
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css

	env GOOS=darwin GOARCH=arm64 go build -o build/mac/arm/clipr cmd/clipr/main.go
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css

frontend: cmd/clipr/static/main.css
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css

release:
	$(MAKE) build
	$(MAKE) build_windows
	$(MAKE) build_mac

	sqlite3 build/data.db < create.sql
	cp .env build/
	cd build && zip -j build_linux_amd64.zip .env clipr data.db
	cd build && zip -j build_windows_amd64.zip .env windows/clipr.exe data.db
	cd build && zip -j build_mac_amd64.zip .env mac/intel/clipr data.db
	cd build && zip -j build_mac_arm64.zip .env mac/arm//clipr data.db

	rm build/.env build/data.db