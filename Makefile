build: cmd/clipr/main.go pkg/*.go cmd/clipr/static/main.css
	go build -o build/clipr cmd/clipr/main.go
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css
	
frontend: cmd/clipr/static/main.css
	npx tailwindcss -i cmd/clipr/static/main.css -o cmd/clipr/static/output.css
