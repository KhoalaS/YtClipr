# YtClipr

Youtube live chat analysis and clipping tool.

## Demo 

<video width="600" controls>
  <source src="demo/demo_clipr.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Development

### Requirements

- Go Version 1.22
- GNU Make 4.3

### Building

```bash
git clone https://github.com/KhoalaS/YtClipr.git
cd YtClipr
go mod download
make build_$OS
```

Where `$OS` is either `windows`,`linux` or `mac`. Build output is located in `./build/$OS/`. Bundled realse zip files are located in the build folder under `./build/build_$OS_$ARCH.zip`, where `$ARCH` is the target architecture. The makefile includes build targets for `amd64`, and additionaly `arm64` for Mac.


### Running

Example Linux:
```bash
unzip build_linux_amd64.zip
cd clipr_build
./clipr
```

Then navigate to http://localhost:8081. Port aswell as TLS support can be set in the `clipr_build/.env` file.

## Features

- Identify chat spikes and play the relevant sections

- Mark start/end of sections and clip it with yt-dlp

- search for content of chat messages and play the relevant section




