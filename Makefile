build: cmd/clipr/main.go pkg/*.go index.js
	go build -o build/clipr cmd/clipr/main.go
	./node_modules/.bin/esbuild index.js --bundle --outfile=static/out.js
