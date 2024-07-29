build: cmd/clipr/main.go pkg/*.go static/main.css
	go build -o build/clipr cmd/clipr/main.go
	npx tailwindcss -i ./static/main.css -o ./static/output.css
	
frontend: static/main.css
	npx tailwindcss -i ./static/main.css -o ./static/output.css
