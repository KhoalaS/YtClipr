build: cmd/clipr/main.go pkg/*.go cmd/clipr/static/main.css
	go build -o build/clipr cmd/clipr/main.go
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css
	
frontend: cmd/clipr/static/main.css
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css

release:
	$(MAKE) build
	sqlite3 build/data.db < create.sql
	cp .env build/
	cd build && zip build.zip .env clipr data.db && rm .env data.db
	