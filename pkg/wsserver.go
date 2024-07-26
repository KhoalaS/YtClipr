package pkg

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"golang.org/x/time/rate"

	"nhooyr.io/websocket"
)

// EchoServer is the WebSocket echo server implementation.
// It ensures the client speaks the echo subprotocol and
// only allows one message every 100ms with a 10 message burst.
type EchoServer struct {
	// LogF controls where logs are sent.
	LogF     func(f string, v ...interface{})
	Duration *int
	Offset   *int
}

func (s EchoServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{
		Subprotocols:   []string{"progress"},
		OriginPatterns: []string{"localhost:8081"},
	})
	if err != nil {
		s.LogF("%v", err)
		return
	}
	defer c.CloseNow()

	if c.Subprotocol() != "progress" {
		c.Close(websocket.StatusPolicyViolation, "client must speak the progress subprotocol")
		return
	}

	l := rate.NewLimiter(rate.Every(time.Millisecond*100), 10)
	for {
		err = progress(r.Context(), c, l, s.Duration, s.Offset)
		if websocket.CloseStatus(err) == websocket.StatusNormalClosure {
			return
		}
		if err != nil {
			s.LogF("failed to echo with %v: %v", r.RemoteAddr, err)
			return
		}
	}
}

func progress(ctx context.Context, c *websocket.Conn, l *rate.Limiter, duration *int, offset *int) error {
	ctx, cancel := context.WithTimeout(ctx, time.Second*10)
	defer cancel()

	err := l.Wait(ctx)
	if err != nil {
		return err
	}

	typ, r, err := c.Reader(ctx)
	if err != nil {
		return err
	}

	incBytes, _ := io.ReadAll(r)
	var inc Incoming
	err = json.Unmarshal(incBytes, &inc)
	if err != nil {
		return err
	}

	if inc.Message != "ping" {
		return fmt.Errorf("invalid message %s", inc.Message)
	}

	w, err := c.Writer(ctx, typ)
	if err != nil {
		return err
	}

	durVal := *duration
	offsetVal := *offset

	if durVal == 0 {
		message := Message{P: "0.0"}
		messageBytes, _ := json.Marshal(message)
		w.Write(messageBytes)
		return w.Close()
	}

	p := float64(offsetVal) / float64(durVal)
	if p >= 1 {
		*duration = 1
		*offset = 0
		p = 1.0
	}

	message := Message{P: fmt.Sprintf("%.2f", p)}
	messageBytes, _ := json.Marshal(message)

	w.Write(messageBytes)

	err = w.Close()

	return err
}

type Message struct {
	P string `json:"p"`
}

type Incoming struct {
	Message string `json:"msg"`
}

func echo(ctx context.Context, c *websocket.Conn, l *rate.Limiter, d *int, o *int) error {
	ctx, cancel := context.WithTimeout(ctx, time.Second*10)
	defer cancel()

	err := l.Wait(ctx)
	if err != nil {
		return err
	}

	typ, r, err := c.Reader(ctx)
	if err != nil {
		return err
	}

	log.Default().Println(typ)

	w, err := c.Writer(ctx, typ)
	if err != nil {
		return err
	}

	_, err = io.Copy(w, r)
	if err != nil {
		return fmt.Errorf("failed to io.Copy: %w", err)
	}

	err = w.Close()
	return err
}
