(function(g) {
    var window = this;
    'use strict';
    var iWN = function(e) {
        e.publish("autonavvisibility")
    }
      , GEN = function(e, L) {
        e.fS("onAutonavCoundownStarted", L)
    }
      , gWZ = function(e) {
        var L, c, I;
        return e == null ? void 0 : (L = e.playerOverlays) == null ? void 0 : (c = L.playerOverlayRenderer) == null ? void 0 : (I = c.autoplay) == null ? void 0 : I.playerOverlayAutoplayRenderer
    }
      , r6 = function(e) {
        var L = e.S()
          , c = L.G;
        g.U.call(this, {
            U: "a",
            W: "ytp-autonav-suggestion-card",
            N: {
                href: "{{url}}",
                target: c ? L.D : "",
                "aria-label": "{{aria_label}}",
                "data-is-live": "{{is_live}}",
                "data-is-list": "{{is_list}}",
                "data-is-mix": "{{is_mix}}",
                "data-is-upcoming": "{{is_upcoming}}"
            },
            L: [{
                U: "div",
                Rq: ["ytp-autonav-endscreen-upnext-thumbnail", "ytp-autonav-thumbnail-small"],
                N: {
                    style: "{{background}}"
                },
                L: [{
                    U: "div",
                    N: {
                        "aria-label": "{{timestamp}}"
                    },
                    Rq: ["ytp-autonav-timestamp"],
                    aq: "{{duration}}"
                }, {
                    U: "div",
                    Rq: ["ytp-autonav-live-stamp"],
                    aq: "Live"
                }, {
                    U: "div",
                    Rq: ["ytp-autonav-upcoming-stamp"],
                    aq: "Demn\u00e4chst"
                }, {
                    U: "div",
                    W: "ytp-autonav-list-overlay",
                    L: [{
                        U: "div",
                        W: "ytp-autonav-mix-text",
                        aq: "Mix"
                    }, {
                        U: "div",
                        W: "ytp-autonav-mix-icon"
                    }]
                }]
            }, {
                U: "div",
                Rq: ["ytp-autonav-endscreen-upnext-title", "ytp-autonav-title-card"],
                aq: "{{title}}"
            }, {
                U: "div",
                Rq: ["ytp-autonav-endscreen-upnext-author", "ytp-autonav-author-card"],
                aq: "{{author}}"
            }, {
                U: "div",
                Rq: ["ytp-autonav-endscreen-upnext-author", "ytp-autonav-view-and-date-card"],
                aq: "{{views_and_publish_time}}"
            }]
        });
        this.V = e;
        this.suggestion = null;
        this.X = c;
        this.listen("click", this.onClick);
        this.listen("keypress", this.onKeyPress)
    }
      , hX = function(e, L) {
        L = L === void 0 ? !1 : L;
        g.U.call(this, {
            U: "div",
            W: "ytp-autonav-endscreen-countdown-overlay"
        });
        var c = this;
        this.T = L;
        this.cancelCommand = this.j = void 0;
        this.Z = 0;
        this.container = new g.U({
            U: "div",
            W: "ytp-autonav-endscreen-countdown-container"
        });
        g.l(this, this.container);
        this.container.jl(this.element);
        L = e.S();
        var I = L.G;
        this.V = e;
        this.suggestion = null;
        this.onVideoDataChange("newdata", this.V.getVideoData());
        this.C(e, "videodatachange", this.onVideoDataChange);
        this.X = new g.U({
            U: "div",
            W: "ytp-autonav-endscreen-upnext-container",
            N: {
                "aria-label": "{{aria_label}}",
                "data-is-live": "{{is_live}}",
                "data-is-list": "{{is_list}}",
                "data-is-mix": "{{is_mix}}",
                "data-is-upcoming": "{{is_upcoming}}"
            },
            L: [{
                U: "div",
                W: "ytp-autonav-endscreen-upnext-header"
            }, {
                U: "div",
                W: "ytp-autonav-endscreen-upnext-alternative-header",
                aq: "{{autoplayAlternativeHeader}}"
            }, {
                U: "a",
                W: "ytp-autonav-endscreen-link-container",
                N: {
                    href: "{{url}}",
                    target: I ? L.D : ""
                },
                L: [{
                    U: "div",
                    W: "ytp-autonav-endscreen-upnext-thumbnail",
                    N: {
                        style: "{{background}}"
                    },
                    L: [{
                        U: "div",
                        N: {
                            "aria-label": "{{timestamp}}"
                        },
                        Rq: ["ytp-autonav-timestamp"],
                        aq: "{{duration}}"
                    }, {
                        U: "div",
                        Rq: ["ytp-autonav-live-stamp"],
                        aq: "Live"
                    }, {
                        U: "div",
                        Rq: ["ytp-autonav-upcoming-stamp"],
                        aq: "Demn\u00e4chst"
                    }]
                }, {
                    U: "div",
                    W: "ytp-autonav-endscreen-video-info",
                    L: [{
                        U: "div",
                        W: "ytp-autonav-endscreen-premium-badge"
                    }, {
                        U: "div",
                        W: "ytp-autonav-endscreen-upnext-title",
                        aq: "{{title}}"
                    }, {
                        U: "div",
                        W: "ytp-autonav-endscreen-upnext-author",
                        aq: "{{author}}"
                    }, {
                        U: "div",
                        W: "ytp-autonav-view-and-date",
                        aq: "{{views_and_publish_time}}"
                    }, {
                        U: "div",
                        W: "ytp-autonav-author-and-view",
                        aq: "{{author_and_views}}"
                    }]
                }]
            }]
        });
        g.l(this, this.X);
        this.X.jl(this.container.element);
        I || this.C(this.X.q0("ytp-autonav-endscreen-link-container"), "click", this.Du);
        this.V.createClientVe(this.container.element, this, 115127);
        this.V.createClientVe(this.X.q0("ytp-autonav-endscreen-link-container"), this, 115128);
        this.overlay = new g.U({
            U: "div",
            W: "ytp-autonav-overlay"
        });
        g.l(this, this.overlay);
        this.overlay.jl(this.container.element);
        this.K = new g.U({
            U: "div",
            W: "ytp-autonav-endscreen-button-container"
        });
        g.l(this, this.K);
        this.K.jl(this.container.element);
        this.cancelButton = new g.U({
            U: "button",
            Rq: ["ytp-autonav-endscreen-upnext-button", "ytp-autonav-endscreen-upnext-cancel-button", L.Y("web_modern_buttons") ? "ytp-autonav-endscreen-upnext-button-rounded" : ""],
            N: {
                "aria-label": "Autoplay abbrechen"
            },
            aq: "Abbrechen"
        });
        g.l(this, this.cancelButton);
        this.cancelButton.jl(this.K.element);
        this.cancelButton.listen("click", this.Mg, this);
        this.V.createClientVe(this.cancelButton.element, this, 115129);
        this.playButton = new g.U({
            U: "a",
            Rq: ["ytp-autonav-endscreen-upnext-button", "ytp-autonav-endscreen-upnext-play-button", L.Y("web_modern_buttons") ? "ytp-autonav-endscreen-upnext-button-rounded" : ""],
            N: {
                href: "{{url}}",
                role: "button",
                "aria-label": "N\u00e4chstes Video starten"
            },
            aq: "Jetzt abspielen"
        });
        g.l(this, this.playButton);
        this.playButton.jl(this.K.element);
        this.playButton.listen("click", this.Du, this);
        this.V.createServerVe(this.playButton.element, this.playButton, !0);
        (L = this.V.getVideoData()) && kEw(this, L);
        this.G = new g.j9(function() {
            D3J(c)
        }
        ,500);
        g.l(this, this.G);
        this.Eb();
        this.C(e, "autonavvisibility", this.Eb);
        this.V.Y("web_autonav_color_transition") && (this.C(e, "autonavchange", this.oz),
        this.C(e, "onAutonavCoundownStarted", this.T_q))
    }
      , RE = function(e) {
        var L = e.V.CB(!0, e.V.isFullscreen());
        g.cY(e.container.element, "ytp-autonav-endscreen-small-mode", e.ge(L));
        g.cY(e.container.element, "ytp-autonav-endscreen-is-premium", !!e.suggestion && !!e.suggestion.lml);
        g.cY(e.V.getRootNode(), "ytp-autonav-endscreen-cancelled-state", !e.V.Va());
        g.cY(e.V.getRootNode(), "countdown-running", e.wp());
        g.cY(e.container.element, "ytp-player-content", e.V.Va());
        g.l3(e.overlay.element, {
            width: L.width + "px"
        });
        if (!e.wp()) {
            e.V.Va() ? wOU(e, Math.round(Jpe(e) / 1E3)) : wOU(e);
            L = !!e.suggestion && !!e.suggestion.Lw;
            var c = e.V.Va() || !L;
            g.cY(e.container.element, "ytp-autonav-endscreen-upnext-alternative-header-only", !c && L);
            g.cY(e.container.element, "ytp-autonav-endscreen-upnext-no-alternative-header", c && !L);
            e.K.i5(e.V.Va());
            g.cY(e.element, "ytp-enable-w2w-color-transitions", VW7(e))
        }
    }
      , D3J = function(e) {
        var L = Jpe(e)
          , c = Math
          , I = c.min;
        var B = e.Z ? Date.now() - e.Z : 0;
        c = I.call(c, B, L);
        wOU(e, Math.ceil((L - c) / 1E3));
        L - c <= 500 && e.wp() ? e.select(!0) : e.wp() && e.G.start()
    }
      , Jpe = function(e) {
        if (e.V.isFullscreen()) {
            var L;
            e = (L = e.V.getVideoData()) == null ? void 0 : L.q3;
            return e === -1 || e === void 0 ? 8E3 : e
        }
        return e.V.VE() >= 0 ? e.V.VE() : g.X3(e.V.S().experiments, "autoplay_time") || 1E4
    }
      , kEw = function(e, L) {
        L = L.getWatchNextResponse();
        var c, I;
        L = (c = gWZ(L)) == null ? void 0 : (I = c.nextButton) == null ? void 0 : I.buttonRenderer;
        e.j = L == null ? void 0 : L.navigationEndpoint;
        c = L == null ? void 0 : L.trackingParams;
        e.playButton && c && e.V.setTrackingParams(e.playButton.element, c)
    }
      , VW7 = function(e) {
        var L;
        return !((L = e.V.getVideoData()) == null || !L.watchToWatchTransitionRenderer)
    }
      , wOU = function(e, L) {
        L = L === void 0 ? -1 : L;
        e = e.X.q0("ytp-autonav-endscreen-upnext-header");
        g.Ml(e);
        if (L >= 0) {
            L = String(L);
            var c = "N\u00e4chstes Video in $SECONDS".match(RegExp("\\$SECONDS", "gi"))[0]
              , I = "N\u00e4chstes Video in $SECONDS".indexOf(c);
            if (I >= 0) {
                e.appendChild(g.T$("N\u00e4chstes Video in $SECONDS".slice(0, I)));
                var B = g.ql("span");
                g.XV(B, "ytp-autonav-endscreen-upnext-header-countdown-number");
                g.fU(B, L);
                e.appendChild(B);
                e.appendChild(g.T$("N\u00e4chstes Video in $SECONDS".slice(I + c.length)));
                return
            }
        }
        g.fU(e, "N\u00e4chstes Video")
    }
      , u9 = function(e, L) {
        g.U.call(this, {
            U: "div",
            Rq: ["html5-endscreen", "ytp-player-content", L || "base-endscreen"]
        });
        this.created = !1;
        this.player = e
    }
      , tX = function(e) {
        g.U.call(this, {
            U: "div",
            Rq: ["ytp-upnext", "ytp-player-content"],
            N: {
                "aria-label": "{{aria_label}}"
            },
            L: [{
                U: "div",
                W: "ytp-cued-thumbnail-overlay-image",
                N: {
                    style: "{{background}}"
                }
            }, {
                U: "span",
                W: "ytp-upnext-top",
                L: [{
                    U: "span",
                    W: "ytp-upnext-header",
                    aq: "N\u00e4chstes Video"
                }, {
                    U: "span",
                    W: "ytp-upnext-title",
                    aq: "{{title}}"
                }, {
                    U: "span",
                    W: "ytp-upnext-author",
                    aq: "{{author}}"
                }]
            }, {
                U: "a",
                W: "ytp-upnext-autoplay-icon",
                N: {
                    role: "button",
                    href: "{{url}}",
                    "aria-label": "N\u00e4chstes Video starten"
                },
                L: [{
                    U: "svg",
                    N: {
                        height: "100%",
                        version: "1.1",
                        viewBox: "0 0 72 72",
                        width: "100%"
                    },
                    L: [{
                        U: "circle",
                        W: "ytp-svg-autoplay-circle",
                        N: {
                            cx: "36",
                            cy: "36",
                            fill: "#fff",
                            "fill-opacity": "0.3",
                            r: "31.5"
                        }
                    }, {
                        U: "circle",
                        W: "ytp-svg-autoplay-ring",
                        N: {
                            cx: "-36",
                            cy: "36",
                            "fill-opacity": "0",
                            r: "33.5",
                            stroke: "#FFFFFF",
                            "stroke-dasharray": "211",
                            "stroke-dashoffset": "-211",
                            "stroke-width": "4",
                            transform: "rotate(-90)"
                        }
                    }, {
                        U: "path",
                        W: "ytp-svg-fill",
                        N: {
                            d: "M 24,48 41,36 24,24 V 48 z M 44,24 v 24 h 4 V 24 h -4 z"
                        }
                    }]
                }]
            }, {
                U: "span",
                W: "ytp-upnext-bottom",
                L: [{
                    U: "span",
                    W: "ytp-upnext-cancel"
                }, {
                    U: "span",
                    W: "ytp-upnext-paused",
                    aq: "Autoplay ist pausiert"
                }]
            }]
        });
        this.api = e;
        this.cancelButton = null;
        this.j = this.q0("ytp-svg-autoplay-ring");
        this.Z = this.notification = this.X = this.suggestion = null;
        this.G = new g.j9(this.aG,5E3,this);
        this.K = 0;
        var L = this.q0("ytp-upnext-cancel");
        this.cancelButton = new g.U({
            U: "button",
            Rq: ["ytp-upnext-cancel-button", "ytp-button"],
            N: {
                tabindex: "0",
                "aria-label": "Autoplay abbrechen"
            },
            aq: "Abbrechen"
        });
        g.l(this, this.cancelButton);
        this.cancelButton.listen("click", this.Ps, this);
        this.cancelButton.jl(L);
        this.cancelButton && this.api.createClientVe(this.cancelButton.element, this, 115129);
        g.l(this, this.G);
        this.api.createClientVe(this.element, this, 18788);
        L = this.q0("ytp-upnext-autoplay-icon");
        this.C(L, "click", this.Cc);
        this.api.createClientVe(L, this, 115130);
        this.XZ();
        this.C(e, "autonavvisibility", this.XZ);
        this.C(e, "mdxnowautoplaying", this.ZfW);
        this.C(e, "mdxautoplaycanceled", this.e$d);
        g.cY(this.element, "ytp-upnext-mobile", this.api.S().K)
    }
      , CT9 = function(e, L) {
        if (L)
            return L;
        if (e.api.isFullscreen()) {
            var c;
            e = (c = e.api.getVideoData()) == null ? void 0 : c.q3;
            return e === -1 || e === void 0 ? 8E3 : e
        }
        return e.api.VE() >= 0 ? e.api.VE() : g.X3(e.api.S().experiments, "autoplay_time") || 1E4
    }
      , ang = function(e, L) {
        L = CT9(e, L);
        var c = Math
          , I = c.min;
        var B = (0,
        g.zI)() - e.K;
        c = I.call(c, B, L);
        L = L === 0 ? 1 : Math.min(c / L, 1);
        e.j.setAttribute("stroke-dashoffset", "" + -211 * (L + 1));
        L >= 1 && e.wp() && e.api.getPresentingPlayerType() !== 3 ? e.select(!0) : e.wp() && e.X.start()
    }
      , O0 = function(e) {
        u9.call(this, e, "autonav-endscreen");
        this.overlay = this.videoData = null;
        this.table = new g.U({
            U: "div",
            W: "ytp-suggestion-panel",
            L: [{
                U: "div",
                Rq: ["ytp-autonav-endscreen-upnext-header", "ytp-autonav-endscreen-more-videos"],
                aq: "Weitere Videos"
            }]
        });
        this.J = new g.U({
            U: "div",
            W: "ytp-suggestions-container"
        });
        this.videos = [];
        this.Z = null;
        this.j = this.T = !1;
        this.K = new hX(this.player);
        g.l(this, this.K);
        this.K.jl(this.element);
        e.getVideoData().f9 ? this.X = this.K : (this.X = new tX(e),
        g.Uq(this.player, this.X.element, 4),
        g.l(this, this.X));
        this.overlay = new g.U({
            U: "div",
            W: "ytp-autonav-overlay-cancelled-state"
        });
        g.l(this, this.overlay);
        this.overlay.jl(this.element);
        this.G = new g.zn(this);
        g.l(this, this.G);
        g.l(this, this.table);
        this.table.jl(this.element);
        this.table.show();
        g.l(this, this.J);
        this.J.jl(this.table.element);
        this.hide()
    }
      , qa = function(e) {
        var L = e.Va();
        L !== e.j && (e.j = L,
        iWN(e.player),
        e.j ? (e.K !== e.X && e.K.hide(),
        e.table.hide()) : (e.K !== e.X && e.K.show(),
        e.table.show()))
    }
      , NjZ = function(e) {
        u9.call(this, e, "videowall-endscreen");
        var L = this;
        this.V = e;
        this.stills = [];
        this.Z = this.videoData = null;
        this.G = this.T = !1;
        this.J = null;
        g.Y4(this.element, "modern-videowall-endscreen");
        this.K = new g.zn(this);
        g.l(this, this.K);
        this.j = new g.j9(function() {
            g.Y4(L.element, "ytp-show-tiles")
        }
        ,0);
        g.l(this, this.j);
        this.table = new g.eH({
            U: "div",
            W: "ytp-modern-endscreen-content"
        });
        g.l(this, this.table);
        this.table.jl(this.element);
        e.getVideoData().f9 ? this.X = new hX(e,!0) : this.X = new tX(e);
        g.l(this, this.X);
        g.Uq(this.player, this.X.element, 4);
        e.createClientVe(this.element, this, 158789);
        this.hide()
    }
      , Ts = function(e) {
        return g.Eq(e.player) && e.HK() && !e.Z
    }
      , WV = function(e) {
        var L = e.Va();
        L !== e.T && (e.T = L,
        iWN(e.player))
    }
      , m39 = function(e) {
        u9.call(this, e, "subscribecard-endscreen");
        this.X = new g.U({
            U: "div",
            W: "ytp-subscribe-card",
            L: [{
                U: "img",
                W: "ytp-author-image",
                N: {
                    src: "{{profilePicture}}"
                }
            }, {
                U: "div",
                W: "ytp-subscribe-card-right",
                L: [{
                    U: "div",
                    W: "ytp-author-name",
                    aq: "{{author}}"
                }, {
                    U: "div",
                    W: "html5-subscribe-button-container"
                }]
            }]
        });
        g.l(this, this.X);
        this.X.jl(this.element);
        var L = e.getVideoData();
        this.subscribeButton = new g.uo("Abonnieren",null,"Abo beenden",null,!0,!1,L.hR,L.subscribed,"trailer-endscreen",null,e,!1);
        g.l(this, this.subscribeButton);
        this.subscribeButton.jl(this.X.q0("html5-subscribe-button-container"));
        this.C(e, "videodatachange", this.OW);
        this.OW();
        this.hide()
    }
      , Ma = function(e) {
        var L = e.S()
          , c = g.q8 || g.QG ? {
            style: "will-change: opacity"
        } : void 0
          , I = L.G
          , B = ["ytp-videowall-still"];
        L.K && B.push("ytp-videowall-show-text");
        g.U.call(this, {
            U: "a",
            Rq: B,
            N: {
                href: "{{url}}",
                target: I ? L.D : "",
                "aria-label": "{{aria_label}}",
                "data-is-live": "{{is_live}}",
                "data-is-list": "{{is_list}}",
                "data-is-mix": "{{is_mix}}"
            },
            L: [{
                U: "div",
                W: "ytp-videowall-still-image",
                N: {
                    style: "{{background}}"
                }
            }, {
                U: "span",
                W: "ytp-videowall-still-info",
                N: {
                    "aria-hidden": "true"
                },
                L: [{
                    U: "span",
                    W: "ytp-videowall-still-info-bg",
                    L: [{
                        U: "span",
                        W: "ytp-videowall-still-info-content",
                        N: c,
                        L: [{
                            U: "span",
                            W: "ytp-videowall-still-info-title",
                            aq: "{{title}}"
                        }, {
                            U: "span",
                            W: "ytp-videowall-still-info-author",
                            aq: "{{author_and_views}}"
                        }, {
                            U: "span",
                            W: "ytp-videowall-still-info-live",
                            aq: "Live"
                        }, {
                            U: "span",
                            W: "ytp-videowall-still-info-duration",
                            aq: "{{duration}}"
                        }]
                    }]
                }]
            }, {
                U: "span",
                Rq: ["ytp-videowall-still-listlabel-regular", "ytp-videowall-still-listlabel"],
                N: {
                    "aria-hidden": "true"
                },
                L: [{
                    U: "span",
                    W: "ytp-videowall-still-listlabel-icon"
                }, "Playlist", {
                    U: "span",
                    W: "ytp-videowall-still-listlabel-length",
                    L: [" (", {
                        U: "span",
                        aq: "{{playlist_length}}"
                    }, ")"]
                }]
            }, {
                U: "span",
                Rq: ["ytp-videowall-still-listlabel-mix", "ytp-videowall-still-listlabel"],
                N: {
                    "aria-hidden": "true"
                },
                L: [{
                    U: "span",
                    W: "ytp-videowall-still-listlabel-mix-icon"
                }, "Mix", {
                    U: "span",
                    W: "ytp-videowall-still-listlabel-length",
                    aq: " (50+)"
                }]
            }]
        });
        this.suggestion = null;
        this.K = I;
        this.api = e;
        this.X = new g.zn(this);
        g.l(this, this.X);
        this.listen("click", this.onClick);
        this.listen("keypress", this.onKeyPress);
        this.X.C(e, "videodatachange", this.onVideoDataChange);
        e.createServerVe(this.element, this);
        this.onVideoDataChange()
    }
      , zs = function(e) {
        u9.call(this, e, "videowall-endscreen");
        var L = this;
        this.V = e;
        this.Z = 0;
        this.stills = [];
        this.G = this.videoData = null;
        this.j = this.J = !1;
        this.D = null;
        this.K = new g.zn(this);
        g.l(this, this.K);
        this.T = new g.j9(function() {
            g.Y4(L.element, "ytp-show-tiles")
        }
        ,0);
        g.l(this, this.T);
        var c = new g.U({
            U: "button",
            Rq: ["ytp-button", "ytp-endscreen-previous"],
            N: {
                "aria-label": "Vorheriges"
            },
            L: [g.hm()]
        });
        g.l(this, c);
        c.jl(this.element);
        c.listen("click", this.Qf, this);
        this.table = new g.eH({
            U: "div",
            W: "ytp-endscreen-content"
        });
        g.l(this, this.table);
        this.table.jl(this.element);
        c = new g.U({
            U: "button",
            Rq: ["ytp-button", "ytp-endscreen-next"],
            N: {
                "aria-label": "Weiter"
            },
            L: [g.R9()]
        });
        g.l(this, c);
        c.jl(this.element);
        c.listen("click", this.AG, this);
        e.getVideoData().f9 ? this.X = new hX(e,!0) : this.X = new tX(e);
        g.l(this, this.X);
        g.Uq(this.player, this.X.element, 4);
        e.createClientVe(this.element, this, 158789);
        this.hide()
    }
      , s0 = function(e) {
        return g.Eq(e.player) && e.HK() && !e.G
    }
      , vV = function(e) {
        var L = e.Va();
        L !== e.J && (e.J = L,
        iWN(e.player))
    }
      , ypL = function(e, L) {
        g.U.call(this, {
            U: "button",
            Rq: ["ytp-watch-on-youtube-button", "ytp-button"],
            aq: "{{content}}"
        });
        this.V = e;
        this.buttonType = this.buttonType = L;
        this.EG();
        this.buttonType === 2 && g.Y4(this.element, "ytp-continue-watching-button");
        this.listen("click", this.onClick);
        this.listen("videodatachange", this.EG);
        this.i5(!0)
    }
      , f9 = function(e) {
        u9.call(this, e, "watch-again-on-youtube-endscreen");
        this.watchButton = new ypL(e,1);
        g.l(this, this.watchButton);
        this.watchButton.jl(this.element);
        g.gnU(e) && (this.X = new g.xx(e),
        g.l(this, this.X),
        this.K = new g.U({
            U: "div",
            Rq: ["ytp-watch-again-on-youtube-endscreen-more-videos-container"],
            N: {
                tabIndex: "-1"
            },
            L: [this.X]
        }),
        g.l(this, this.K),
        this.X.jl(this.K.element),
        this.K.jl(this.element));
        e.createClientVe(this.element, this, 156914);
        this.hide()
    }
      , jXL = function(e) {
        g.Vk.call(this, e);
        var L = this;
        this.endScreen = null;
        this.X = this.K = this.Z = !1;
        this.listeners = new g.zn(this);
        g.l(this, this.listeners);
        var c = e.S();
        e.isEmbedsShortsMode() ? this.endScreen = new f9(e) : ZWN(e) ? (this.Z = !0,
        pOg(this),
        this.X ? this.endScreen = new O0(e) : c.Y("delhi_modern_endscreen") ? this.endScreen = new NjZ(e) : this.endScreen = new zs(e)) : c.sK ? this.endScreen = new m39(e) : this.endScreen = new u9(e);
        g.l(this, this.endScreen);
        g.Uq(e, this.endScreen.element, 4);
        $37(this);
        this.listeners.C(e, "videodatachange", this.onVideoDataChange, this);
        this.listeners.C(e, g.jh("endscreen"), function(I) {
            L.onCueRangeEnter(I)
        });
        this.listeners.C(e, g.Hq("endscreen"), function(I) {
            L.onCueRangeExit(I)
        })
    }
      , pOg = function(e) {
        var L = e.player.getVideoData();
        if (!L || e.X === L.sC && e.K === L.f9)
            return !1;
        e.X = L.sC;
        e.K = L.f9;
        return !0
    }
      , ZWN = function(e) {
        e = e.S();
        return e.m1 && !e.sK && !e.disableOrganicUi
    }
      , $37 = function(e) {
        e.player.RU("endscreen");
        var L = e.player.getVideoData();
        L = new g.pC(Math.max((L.lengthSeconds - 10) * 1E3, 0),0x8000000000000,{
            id: "preload",
            namespace: "endscreen"
        });
        var c = new g.pC(0x8000000000000,0x8000000000000,{
            id: "load",
            priority: 8,
            namespace: "endscreen"
        });
        e.player.Lb([L, c])
    };
    g.p2.prototype.VE = g.xn(6, function() {
        return this.app.VE()
    });
    g.FH.prototype.VE = g.xn(5, function() {
        return this.getVideoData().Ix
    });
    g.NU.prototype.uj = g.xn(4, function(e) {
        this.Wv().uj(e)
    });
    g.BP.prototype.uj = g.xn(3, function(e) {
        this.Ba !== e && (this.Ba = e,
        this.N2())
    });
    g.z(r6, g.U);
    r6.prototype.select = function() {
        this.V.zF(this.suggestion.videoId, this.suggestion.sessionData, this.suggestion.playlistId, void 0, void 0, this.suggestion.Yp || void 0) && this.V.logClick(this.element)
    }
    ;
    r6.prototype.onClick = function(e) {
        g.s4(e, this.V, this.X, this.suggestion.sessionData || void 0) && this.select()
    }
    ;
    r6.prototype.onKeyPress = function(e) {
        switch (e.keyCode) {
        case 13:
        case 32:
            e.defaultPrevented || (this.select(),
            e.preventDefault())
        }
    }
    ;
    g.z(hX, g.U);
    g.M = hX.prototype;
    g.M.yw = function(e) {
        this.suggestion !== e && (this.suggestion = e,
        g.Mr(this.X, e),
        this.playButton.updateValue("url", this.suggestion.Pv()),
        RE(this))
    }
    ;
    g.M.wp = function() {
        return this.Z > 0
    }
    ;
    g.M.lG = function() {
        this.wp() || (this.Z = Date.now(),
        D3J(this),
        GEN(this.V, Jpe(this)),
        g.cY(this.V.getRootNode(), "countdown-running", this.wp()))
    }
    ;
    g.M.TA = function() {
        this.GS();
        D3J(this);
        var e = this.X.q0("ytp-autonav-endscreen-upnext-header");
        e && g.fU(e, "N\u00e4chstes Video")
    }
    ;
    g.M.GS = function() {
        this.wp() && (this.G.stop(),
        this.Z = 0)
    }
    ;
    g.M.select = function(e) {
        this.V.nextVideo(!1, e === void 0 ? !1 : e);
        this.GS()
    }
    ;
    g.M.Du = function(e) {
        g.s4(e, this.V) && (e.currentTarget === this.playButton.element ? this.V.logClick(this.playButton.element) : e.currentTarget === this.X.q0("ytp-autonav-endscreen-link-container") && (e = this.X.q0("ytp-autonav-endscreen-link-container"),
        this.V.logVisibility(e, !0),
        this.V.logClick(e)),
        this.j ? (this.V.fS("innertubeCommand", this.j),
        this.GS()) : this.select())
    }
    ;
    g.M.Mg = function() {
        this.V.logClick(this.cancelButton.element);
        g.jD(this.V, !0);
        this.cancelCommand && this.V.fS("innertubeCommand", this.cancelCommand)
    }
    ;
    g.M.onVideoDataChange = function(e, L) {
        kEw(this, L);
        e = L.getWatchNextResponse();
        var c, I;
        e = (c = gWZ(e)) == null ? void 0 : (I = c.cancelButton) == null ? void 0 : I.buttonRenderer;
        this.cancelCommand = e == null ? void 0 : e.command
    }
    ;
    g.M.T_q = function(e) {
        if (VW7(this)) {
            var L = this.V.getVideoData().watchToWatchTransitionRenderer
              , c = L == null ? void 0 : L.fromColorPaletteDark;
            L = L == null ? void 0 : L.toColorPaletteDark;
            if (c && L) {
                var I = this.element;
                I.style.setProperty("--w2w-start-background-color", g.w9(c.surgeColor));
                I.style.setProperty("--w2w-start-primary-text-color", g.w9(c.primaryTitleColor));
                I.style.setProperty("--w2w-start-secondary-text-color", g.w9(c.secondaryTitleColor));
                I.style.setProperty("--w2w-end-background-color", g.w9(L.surgeColor));
                I.style.setProperty("--w2w-end-primary-text-color", g.w9(L.primaryTitleColor));
                I.style.setProperty("--w2w-end-secondary-text-color", g.w9(L.secondaryTitleColor));
                I.style.setProperty("--w2w-animation-duration", e + "ms")
            }
            g.cY(this.element, "ytp-w2w-animate", !0)
        }
    }
    ;
    g.M.oz = function(e) {
        this.V.Y("web_autonav_color_transition") && e !== 2 && g.cY(this.element, "ytp-w2w-animate", !1)
    }
    ;
    g.M.Eb = function() {
        var e = this.V.Va();
        this.T && this.z_ !== e && this.i5(e);
        RE(this);
        this.V.logVisibility(this.container.element, e);
        this.V.logVisibility(this.cancelButton.element, e);
        this.V.logVisibility(this.X.q0("ytp-autonav-endscreen-link-container"), e);
        this.V.logVisibility(this.playButton.element, e)
    }
    ;
    g.M.ge = function(e) {
        return e.width < 400 || e.height < 459
    }
    ;
    g.z(u9, g.U);
    g.M = u9.prototype;
    g.M.create = function() {
        this.created = !0
    }
    ;
    g.M.destroy = function() {
        this.created = !1
    }
    ;
    g.M.HK = function() {
        return !1
    }
    ;
    g.M.Va = function() {
        return !1
    }
    ;
    g.M.di = function() {
        return !1
    }
    ;
    g.z(tX, g.U);
    g.M = tX.prototype;
    g.M.aG = function() {
        this.notification && (this.G.stop(),
        this.j6(this.Z),
        this.Z = null,
        this.notification.close(),
        this.notification = null)
    }
    ;
    g.M.yw = function(e) {
        this.suggestion = e;
        g.Mr(this, e, "hqdefault.jpg")
    }
    ;
    g.M.XZ = function() {
        this.i5(this.api.Va());
        this.api.logVisibility(this.element, this.api.Va());
        this.api.logVisibility(this.q0("ytp-upnext-autoplay-icon"), this.api.Va());
        this.cancelButton && this.api.logVisibility(this.cancelButton.element, this.api.Va())
    }
    ;
    g.M.k_7 = function() {
        window.focus();
        this.aG()
    }
    ;
    g.M.lG = function(e) {
        var L = this;
        this.wp() || (g.Ux("a11y-announce", "N\u00e4chstes Video " + this.suggestion.title),
        this.K = (0,
        g.zI)(),
        this.X = new g.j9(function() {
            ang(L, e)
        }
        ,25),
        ang(this, e),
        GEN(this.api, CT9(this, e)));
        g.eZ(this.element, "ytp-upnext-autoplay-paused")
    }
    ;
    g.M.hide = function() {
        g.U.prototype.hide.call(this)
    }
    ;
    g.M.wp = function() {
        return !!this.X
    }
    ;
    g.M.TA = function() {
        this.GS();
        this.K = (0,
        g.zI)();
        ang(this);
        g.Y4(this.element, "ytp-upnext-autoplay-paused")
    }
    ;
    g.M.GS = function() {
        this.wp() && (this.X.dispose(),
        this.X = null)
    }
    ;
    g.M.select = function(e) {
        e = e === void 0 ? !1 : e;
        if (this.api.S().Y("autonav_notifications") && e && window.Notification && typeof document.hasFocus === "function") {
            var L = Notification.permission;
            L === "default" ? Notification.requestPermission() : L !== "granted" || document.hasFocus() || (this.aG(),
            this.notification = new Notification("N\u00e4chstes Video",{
                body: this.suggestion.title,
                icon: this.suggestion.j9()
            }),
            this.Z = this.C(this.notification, "click", this.k_7),
            this.G.start())
        }
        this.GS();
        this.api.nextVideo(!1, e)
    }
    ;
    g.M.Cc = function(e) {
        !g.vz(this.cancelButton.element, e.target) && g.s4(e, this.api) && (this.api.Va() && this.api.logClick(this.q0("ytp-upnext-autoplay-icon")),
        this.select())
    }
    ;
    g.M.Ps = function() {
        this.api.Va() && this.cancelButton && this.api.logClick(this.cancelButton.element);
        g.jD(this.api, !0)
    }
    ;
    g.M.ZfW = function(e) {
        this.api.getPresentingPlayerType();
        this.show();
        this.lG(e)
    }
    ;
    g.M.e$d = function() {
        this.api.getPresentingPlayerType();
        this.GS();
        this.hide()
    }
    ;
    g.M.KS = function() {
        this.GS();
        this.aG();
        g.U.prototype.KS.call(this)
    }
    ;
    g.z(O0, u9);
    g.M = O0.prototype;
    g.M.create = function() {
        u9.prototype.create.call(this);
        this.G.C(this.player, "appresize", this.TT);
        this.G.C(this.player, "onVideoAreaChange", this.TT);
        this.G.C(this.player, "videodatachange", this.onVideoDataChange);
        this.G.C(this.player, "autonavchange", this.zO);
        this.G.C(this.player, "onAutonavCancelled", this.Op);
        this.onVideoDataChange()
    }
    ;
    g.M.show = function() {
        u9.prototype.show.call(this);
        (this.T || this.Z && this.Z !== this.videoData.clientPlaybackNonce) && g.jD(this.player, !1);
        g.Eq(this.player) && this.HK() && !this.Z ? (qa(this),
        this.videoData.autonavState === 2 ? this.player.getVisibilityState() === 3 ? this.X.select(!0) : this.X.lG() : this.videoData.autonavState === 3 && this.X.TA()) : (g.jD(this.player, !0),
        qa(this));
        this.TT()
    }
    ;
    g.M.hide = function() {
        u9.prototype.hide.call(this);
        this.X.TA();
        qa(this)
    }
    ;
    g.M.TT = function() {
        var e = this.player.CB(!0, this.player.isFullscreen());
        qa(this);
        RE(this.K);
        g.cY(this.element, "ytp-autonav-cancelled-small-mode", this.ge(e));
        g.cY(this.element, "ytp-autonav-cancelled-tiny-mode", this.nP(e));
        g.cY(this.element, "ytp-autonav-cancelled-mini-mode", e.width <= 400 || e.height <= 360);
        this.overlay && g.l3(this.overlay.element, {
            width: e.width + "px"
        });
        if (!this.j)
            for (e = 0; e < this.videos.length; e++)
                g.cY(this.videos[e].element, "ytp-suggestion-card-with-margin", e % 2 === 1)
    }
    ;
    g.M.onVideoDataChange = function() {
        var e = this.player.getVideoData();
        if (this.videoData !== e && e) {
            this.videoData = e;
            if ((e = this.videoData.suggestions) && e.length || this.player.Y("web_player_autonav_empty_suggestions_fix")) {
                var L = g.zN(this.videoData);
                L && (this.X.yw(L),
                this.X !== this.K && this.K.yw(L))
            }
            if (e && e.length)
                for (L = 0; L < HWZ.length; ++L) {
                    var c = HWZ[L];
                    if (e && e[c]) {
                        this.videos[L] = new r6(this.player);
                        var I = this.videos[L];
                        c = e[c];
                        I.suggestion !== c && (I.suggestion = c,
                        g.Mr(I, c));
                        g.l(this, this.videos[L]);
                        this.videos[L].jl(this.J.element)
                    }
                }
            this.TT()
        }
    }
    ;
    g.M.zO = function(e) {
        e === 1 ? (this.T = !1,
        this.Z = this.videoData.clientPlaybackNonce,
        this.X.GS(),
        this.z_ && this.TT()) : (this.T = !0,
        this.Va() && (e === 2 ? this.X.lG() : e === 3 && this.X.TA()))
    }
    ;
    g.M.Op = function(e) {
        e ? this.zO(1) : (this.Z = null,
        this.T = !1)
    }
    ;
    g.M.HK = function() {
        return this.videoData.autonavState !== 1
    }
    ;
    g.M.ge = function(e) {
        return (e.width < 910 || e.height < 459) && !this.nP(e) && !(e.width <= 400 || e.height <= 360)
    }
    ;
    g.M.nP = function(e) {
        return e.width < 800 && !(e.width <= 400 || e.height <= 360)
    }
    ;
    g.M.Va = function() {
        return this.z_ && g.Eq(this.player) && this.HK() && !this.Z
    }
    ;
    var HWZ = [1, 3, 2, 4];
    g.z(NjZ, u9);
    g.M = NjZ.prototype;
    g.M.create = function() {
        u9.prototype.create.call(this);
        var e = this.player.getVideoData();
        e && (this.videoData = e);
        this.eZ();
        this.K.C(this.player, "appresize", this.eZ);
        this.K.C(this.player, "onVideoAreaChange", this.eZ);
        this.K.C(this.player, "videodatachange", this.onVideoDataChange);
        this.K.C(this.player, "autonavchange", this.nZ);
        this.K.C(this.player, "onAutonavCancelled", this.gO);
        e = this.videoData.autonavState;
        e !== this.J && this.nZ(e);
        this.K.C(this.element, "transitionend", this.Fx)
    }
    ;
    g.M.destroy = function() {
        g.fv(this.K);
        g.cs(this.stills);
        this.stills = [];
        u9.prototype.destroy.call(this);
        g.eZ(this.element, "ytp-show-tiles");
        this.j.stop();
        this.J = this.videoData.autonavState
    }
    ;
    g.M.HK = function() {
        return this.videoData.autonavState !== 1
    }
    ;
    g.M.show = function() {
        var e = this.z_;
        u9.prototype.show.call(this);
        g.eZ(this.element, "ytp-show-tiles");
        this.player.S().K ? g.lB(this.j) : this.j.start();
        (this.G || this.Z && this.Z !== this.videoData.clientPlaybackNonce) && g.jD(this.player, !1);
        Ts(this) ? (WV(this),
        this.videoData.autonavState === 2 ? this.player.getVisibilityState() === 3 ? this.X.select(!0) : this.X.lG() : this.videoData.autonavState === 3 && this.X.TA()) : (g.jD(this.player, !0),
        WV(this));
        e !== this.z_ && this.player.logVisibility(this.element, !0)
    }
    ;
    g.M.hide = function() {
        var e = this.z_;
        u9.prototype.hide.call(this);
        this.X.TA();
        WV(this);
        e !== this.z_ && this.player.logVisibility(this.element, !1)
    }
    ;
    g.M.Fx = function(e) {
        e.target === this.element && this.eZ()
    }
    ;
    g.M.eZ = function() {
        var e, L, c, I;
        var B = ((e = this.videoData) == null ? 0 : (L = e.suggestions) == null ? 0 : L.length) ? (c = this.videoData) == null ? void 0 : c.suggestions : [(I = this.videoData) == null ? void 0 : g.zN(I)];
        if (B.length) {
            L = this.V.CB(!0, this.V.isFullscreen());
            e = Math.floor((L.width - 64 + 16) / (g.j5(L.width * .27, 250, 450) + 16));
            L = Math.min(3, Math.floor((L.height - 64) / ((L.width - 64 - (e - 1) * 16) / e * .5625 + 70)));
            g.L1(this.element, ["ytp-modern-endscreen-limit-rows-1", "ytp-modern-endscreen-limit-rows-2", "ytp-modern-endscreen-limit-rows-3"]);
            g.Y4(this.element, "ytp-modern-endscreen-limit-rows-" + L);
            g.cY(this.element, "ytp-modern-endscreen-single-item", e === 1);
            g.cY(this.element, "ytp-modern-endscreen-row-0", L === 0);
            e = this.table.element;
            e.ariaLive = "polite";
            this.X.yw(g.zN(this.videoData));
            this.X instanceof hX && RE(this.X);
            g.cY(this.element, "ytp-endscreen-takeover", Ts(this));
            WV(this);
            L = 0;
            e.ariaBusy = "true";
            c = B.length;
            for (I = 0; I < c; I++) {
                var x = I % c
                  , S = this.stills[I];
                S || (S = new g.zb(this.player),
                this.stills[I] = S,
                e.appendChild(S.element));
                g.jUv(S, B[x]);
                L++
            }
            this.stills.length = L
        }
    }
    ;
    g.M.onVideoDataChange = function() {
        var e = this.player.getVideoData(1);
        this.videoData !== e && (e != null && g.zN(e) ? (this.videoData = e,
        this.eZ()) : this.player.sW("missg", {
            vid: (e == null ? void 0 : e.videoId) || "",
            cpn: (e == null ? void 0 : e.clientPlaybackNonce) || ""
        }))
    }
    ;
    g.M.di = function() {
        return this.X.wp()
    }
    ;
    g.M.nZ = function(e) {
        e === 1 ? (this.G = !1,
        this.Z = this.videoData.clientPlaybackNonce,
        this.X.GS(),
        this.z_ && this.eZ()) : (this.G = !0,
        this.z_ && Ts(this) && (e === 2 ? this.X.lG() : e === 3 && this.X.TA()))
    }
    ;
    g.M.gO = function(e) {
        if (e) {
            for (e = 0; e < this.stills.length; e++)
                this.V.logVisibility(this.stills[e].element, !0);
            this.nZ(1)
        } else
            this.Z = null,
            this.G = !1;
        this.eZ()
    }
    ;
    g.M.Va = function() {
        return this.z_ && Ts(this)
    }
    ;
    g.z(m39, u9);
    m39.prototype.OW = function() {
        var e = this.player.getVideoData();
        this.X.update({
            profilePicture: e.profilePicture,
            author: e.author
        });
        this.subscribeButton.channelId = e.hR;
        var L = this.subscribeButton;
        e.subscribed ? L.X() : L.K()
    }
    ;
    g.z(Ma, g.U);
    Ma.prototype.select = function() {
        this.api.zF(this.suggestion.videoId, this.suggestion.sessionData, this.suggestion.playlistId, void 0, void 0, this.suggestion.Yp || void 0) && this.api.logClick(this.element)
    }
    ;
    Ma.prototype.onClick = function(e) {
        if (g.Uh(this.api.S()) && this.api.Y("web_player_log_click_before_generating_ve_conversion_params")) {
            this.api.logClick(this.element);
            var L = this.suggestion.Pv()
              , c = {};
            g.PS(this.api, c);
            L = g.WO(L, c);
            g.v8(L, this.api, e)
        } else
            g.s4(e, this.api, this.K, this.suggestion.sessionData || void 0) && this.select()
    }
    ;
    Ma.prototype.onKeyPress = function(e) {
        switch (e.keyCode) {
        case 13:
        case 32:
            e.defaultPrevented || (this.select(),
            e.preventDefault())
        }
    }
    ;
    Ma.prototype.onVideoDataChange = function() {
        var e = this.api.getVideoData()
          , L = this.api.S();
        this.K = e.xx ? !1 : L.G
    }
    ;
    g.z(zs, u9);
    g.M = zs.prototype;
    g.M.create = function() {
        u9.prototype.create.call(this);
        var e = this.player.getVideoData();
        e && (this.videoData = e);
        this.pG();
        this.K.C(this.player, "appresize", this.pG);
        this.K.C(this.player, "onVideoAreaChange", this.pG);
        this.K.C(this.player, "videodatachange", this.onVideoDataChange);
        this.K.C(this.player, "autonavchange", this.H2);
        this.K.C(this.player, "onAutonavCancelled", this.JG);
        e = this.videoData.autonavState;
        e !== this.D && this.H2(e);
        this.K.C(this.element, "transitionend", this.dO)
    }
    ;
    g.M.destroy = function() {
        g.fv(this.K);
        g.cs(this.stills);
        this.stills = [];
        u9.prototype.destroy.call(this);
        g.eZ(this.element, "ytp-show-tiles");
        this.T.stop();
        this.D = this.videoData.autonavState
    }
    ;
    g.M.HK = function() {
        return this.videoData.autonavState !== 1
    }
    ;
    g.M.show = function() {
        var e = this.z_;
        u9.prototype.show.call(this);
        g.eZ(this.element, "ytp-show-tiles");
        this.player.S().K ? g.lB(this.T) : this.T.start();
        (this.j || this.G && this.G !== this.videoData.clientPlaybackNonce) && g.jD(this.player, !1);
        s0(this) ? (vV(this),
        this.videoData.autonavState === 2 ? this.player.getVisibilityState() === 3 ? this.X.select(!0) : this.X.lG() : this.videoData.autonavState === 3 && this.X.TA()) : (g.jD(this.player, !0),
        vV(this));
        e !== this.z_ && this.player.logVisibility(this.element, !0)
    }
    ;
    g.M.hide = function() {
        var e = this.z_;
        u9.prototype.hide.call(this);
        this.X.TA();
        vV(this);
        e !== this.z_ && this.player.logVisibility(this.element, !1)
    }
    ;
    g.M.dO = function(e) {
        e.target === this.element && this.pG()
    }
    ;
    g.M.pG = function() {
        var e, L, c, I;
        var B = ((e = this.videoData) == null ? 0 : (L = e.suggestions) == null ? 0 : L.length) ? (c = this.videoData) == null ? void 0 : c.suggestions : [(I = this.videoData) == null ? void 0 : g.zN(I)];
        if (B.length) {
            g.Y4(this.element, "ytp-endscreen-paginate");
            var x = this.V.CB(!0, this.V.isFullscreen());
            if (e = g.Db(this.V))
                e = e.TV() ? 48 : 32,
                x.width -= e * 2;
            var S = x.width / x.height;
            I = 96 / 54;
            L = e = 2;
            var h = Math.max(x.width / 96, 2)
              , R = Math.max(x.height / 54, 2);
            c = B.length;
            var u = c * 4;
            for (u -= 4; u > 0 && (e < h || L < R); ) {
                var t = e / 2
                  , O = L / 2
                  , q = e <= h - 2 && u >= O * 4
                  , T = L <= R - 2 && u >= t * 4;
                if ((t + 1) / O * I / S > S / (t / (O + 1) * I) && T)
                    u -= t * 4,
                    L += 2;
                else if (q)
                    u -= O * 4,
                    e += 2;
                else if (T)
                    u -= t * 4,
                    L += 2;
                else
                    break
            }
            I = !1;
            u >= 12 && c * 4 - u <= 6 && (L >= 4 || e >= 4) && (I = !0);
            u = e * 96;
            h = L * 54;
            S = u / h < S ? x.height / h : x.width / u;
            S = Math.min(S, 2);
            u = Math.floor(Math.min(x.width, u * S));
            h = Math.floor(Math.min(x.height, h * S));
            x = this.table.element;
            x.ariaLive = "polite";
            g.e_(x, u, h);
            g.l3(x, {
                marginLeft: u / -2 + "px",
                marginTop: h / -2 + "px"
            });
            this.X.yw(g.zN(this.videoData));
            this.X instanceof hX && RE(this.X);
            g.cY(this.element, "ytp-endscreen-takeover", s0(this));
            vV(this);
            u += 4;
            h += 4;
            S = 0;
            x.ariaBusy = "true";
            for (R = 0; R < e; R++)
                for (t = 0; t < L; t++)
                    if (O = S,
                    T = 0,
                    I && R >= e - 2 && t >= L - 2 ? T = 1 : t % 2 === 0 && R % 2 === 0 && (t < 2 && R < 2 ? t === 0 && R === 0 && (T = 2) : T = 2),
                    O = g.Ha(O + this.Z, c),
                    T !== 0) {
                        q = this.stills[S];
                        q || (q = new Ma(this.player),
                        this.stills[S] = q,
                        x.appendChild(q.element));
                        var W = Math.floor(h * t / L)
                          , A = Math.floor(u * R / e)
                          , b = Math.floor(h * (t + T) / L) - W - 4
                          , J = Math.floor(u * (R + T) / e) - A - 4;
                        g.Xt(q.element, A, W);
                        g.e_(q.element, J, b);
                        g.l3(q.element, "transitionDelay", (t + R) / 20 + "s");
                        g.cY(q.element, "ytp-videowall-still-mini", T === 1);
                        g.cY(q.element, "ytp-videowall-still-large", T > 2);
                        T = Math.max(J, b);
                        g.cY(q.element, "ytp-videowall-still-round-large", T >= 256);
                        g.cY(q.element, "ytp-videowall-still-round-medium", T > 96 && T < 256);
                        g.cY(q.element, "ytp-videowall-still-round-small", T <= 96);
                        O = B[O];
                        q.suggestion !== O && (q.suggestion = O,
                        T = q.api.S(),
                        W = g.Ks(q.element, "ytp-videowall-still-large") ? "hqdefault.jpg" : "mqdefault.jpg",
                        g.Mr(q, O, W),
                        g.Uh(T) && !q.api.Y("web_player_log_click_before_generating_ve_conversion_params") && (T = O.Pv(),
                        W = {},
                        g.Fl(q.api, "addEmbedsConversionTrackingParams", [W]),
                        T = g.WO(T, W),
                        q.updateValue("url", T)),
                        (O = (O = O.sessionData) && O.itct) && q.api.setTrackingParams(q.element, O));
                        S++
                    }
            x.ariaBusy = "false";
            g.cY(this.element, "ytp-endscreen-paginate", S < c);
            for (B = this.stills.length - 1; B >= S; B--)
                e = this.stills[B],
                g.s_(e.element),
                g.L0(e);
            this.stills.length = S
        }
    }
    ;
    g.M.onVideoDataChange = function() {
        var e = this.player.getVideoData(1);
        this.videoData !== e && (e != null && g.zN(e) ? (this.Z = 0,
        this.videoData = e,
        this.pG()) : this.player.sW("missg", {
            vid: (e == null ? void 0 : e.videoId) || "",
            cpn: (e == null ? void 0 : e.clientPlaybackNonce) || ""
        }))
    }
    ;
    g.M.AG = function() {
        this.Z += this.stills.length;
        this.pG()
    }
    ;
    g.M.Qf = function() {
        this.Z -= this.stills.length;
        this.pG()
    }
    ;
    g.M.di = function() {
        return this.X.wp()
    }
    ;
    g.M.H2 = function(e) {
        e === 1 ? (this.j = !1,
        this.G = this.videoData.clientPlaybackNonce,
        this.X.GS(),
        this.z_ && this.pG()) : (this.j = !0,
        this.z_ && s0(this) && (e === 2 ? this.X.lG() : e === 3 && this.X.TA()))
    }
    ;
    g.M.JG = function(e) {
        if (e) {
            for (e = 0; e < this.stills.length; e++)
                this.V.logVisibility(this.stills[e].element, !0);
            this.H2(1)
        } else
            this.G = null,
            this.j = !1;
        this.pG()
    }
    ;
    g.M.Va = function() {
        return this.z_ && s0(this)
    }
    ;
    g.z(ypL, g.U);
    g.M = ypL.prototype;
    g.M.EG = function() {
        switch (this.buttonType) {
        case 1:
            var e = "Noch einmal auf YouTube ansehen";
            var L = 156915;
            break;
        case 2:
            e = "Weiter auf YouTube ansehen";
            L = 156942;
            break;
        default:
            e = "Weiter auf YouTube ansehen",
            L = 156942
        }
        this.update({
            content: e
        });
        this.V.hasVe(this.element) && this.V.destroyVe(this.element);
        this.V.createClientVe(this.element, this, L)
    }
    ;
    g.M.onClick = function(e) {
        this.V.Y("web_player_log_click_before_generating_ve_conversion_params") && this.V.logClick(this.element);
        g.v8(this.getVideoUrl(), this.V, e);
        this.V.Y("web_player_log_click_before_generating_ve_conversion_params") || this.V.logClick(this.element)
    }
    ;
    g.M.getVideoUrl = function() {
        var e = !0;
        switch (this.buttonType) {
        case 1:
            e = !0;
            break;
        case 2:
            e = !1
        }
        e = this.V.getVideoUrl(e, !1, !1, !0);
        var L = this.V.S();
        if (g.Uh(L)) {
            var c = {};
            g.Uh(L) && g.Fl(this.V, "addEmbedsConversionTrackingParams", [c]);
            e = g.WO(e, c)
        }
        return e
    }
    ;
    g.M.logVisibility = function() {
        this.V.logVisibility(this.element, this.z_ && this.B)
    }
    ;
    g.M.show = function() {
        g.U.prototype.show.call(this);
        this.logVisibility()
    }
    ;
    g.M.hide = function() {
        g.U.prototype.hide.call(this);
        this.logVisibility()
    }
    ;
    g.M.vy = function(e) {
        g.U.prototype.vy.call(this, e);
        this.logVisibility()
    }
    ;
    g.z(f9, u9);
    f9.prototype.hasSuggestions = function() {
        var e;
        return (e = this.X) == null ? void 0 : e.hasSuggestions()
    }
    ;
    f9.prototype.show = function() {
        if (this.player.getPlayerState() !== 3) {
            u9.prototype.show.call(this);
            var e = this.K;
            if (e) {
                var L = this.X.hasSuggestions();
                g.cY(this.element, "ytp-shorts-branded-ui", L);
                L ? e.show() : e.hide()
            }
            var c;
            (c = g.Db(this.player)) == null || c.uj(!0);
            this.player.logVisibility(this.element, !0);
            this.watchButton.vy(!0)
        }
    }
    ;
    f9.prototype.hide = function() {
        u9.prototype.hide.call(this);
        var e;
        (e = g.Db(this.player)) == null || e.uj(!1);
        this.player.logVisibility(this.element, !1);
        this.watchButton.vy(!1)
    }
    ;
    g.z(jXL, g.Vk);
    g.M = jXL.prototype;
    g.M.Ai = function() {
        var e = this.player.getVideoData()
          , L = e.mutedAutoplay && (e.limitedPlaybackDurationInSeconds > 0 || e.endSeconds > 0 || e.mutedAutoplayDurationMode !== 2);
        if (this.player.isEmbedsShortsMode() && !L)
            return !0;
        var c;
        var I = !!((e == null ? 0 : g.zN(e)) || (e == null ? 0 : (c = e.suggestions) == null ? 0 : c.length));
        I = !ZWN(this.player) || I;
        e = e.Sn;
        c = this.player.eb();
        return I && !e && !c && !L
    }
    ;
    g.M.Va = function() {
        return this.endScreen.Va()
    }
    ;
    g.M.zq = function() {
        return this.Va() ? this.endScreen.di() : !1
    }
    ;
    g.M.KS = function() {
        this.player.RU("endscreen");
        g.Vk.prototype.KS.call(this)
    }
    ;
    g.M.load = function() {
        var e = this.player.getVideoData();
        var L = e.transitionEndpointAtEndOfStream;
        if (L && L.videoId) {
            var c = this.player.qx().Xt.get("heartbeat")
              , I = g.zN(e);
            !I || L.videoId !== I.videoId || e.Fs ? (this.player.zF(L.videoId, void 0, void 0, !0, !0, L),
            c && c.DQ("HEARTBEAT_ACTION_TRIGGER_AT_STREAM_END", "HEARTBEAT_ACTION_TRANSITION_REASON_HAS_NEW_STREAM_TRANSITION_ENDPOINT"),
            e = !0) : e = !1
        } else
            e = !1;
        e || (g.Vk.prototype.load.call(this),
        this.endScreen.show())
    }
    ;
    g.M.unload = function() {
        g.Vk.prototype.unload.call(this);
        this.endScreen.hide();
        this.endScreen.destroy()
    }
    ;
    g.M.onCueRangeEnter = function(e) {
        this.Ai() && (this.endScreen.created || this.endScreen.create(),
        e.getId() === "load" && this.load())
    }
    ;
    g.M.onCueRangeExit = function(e) {
        e.getId() === "load" && this.loaded && this.unload()
    }
    ;
    g.M.onVideoDataChange = function() {
        $37(this);
        this.Z && pOg(this) && (this.endScreen && (this.endScreen.hide(),
        this.endScreen.created && this.endScreen.destroy(),
        this.endScreen.dispose()),
        this.X ? this.endScreen = new O0(this.player) : this.endScreen = new zs(this.player),
        g.l(this, this.endScreen),
        g.Uq(this.player, this.endScreen.element, 4))
    }
    ;
    g.JK("endscreen", jXL);
}
)(_yt_player);
