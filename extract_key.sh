#!/bin/bash

wget --header="User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36" -q https://youtube.com
cat index.html | grep -o -E '"INNERTUBE_API_KEY":"[^"]+"' | sed 's/:/=/g' > d.env
rm index.html
