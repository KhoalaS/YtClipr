(function(g) {
    var window = this;
    'use strict';
    var hjZ = function(e, L, c) {
        g.Z(function(I) {
            e.X = g.W3(L, c);
            g.AJ(I)
        })
    }
      , qs = function(e) {
        e.isActive() || e.start()
    }
      , Rje = function(e, L) {
        return L ? e.captionsInitialState : "CAPTIONS_INITIAL_STATE_UNKNOWN"
    }
      , ueL = function(e) {
        return g.T3(e) || e.Y("web_enable_caption_language_preference_stickiness")
    }
      , trL = function(e, L) {
        var c = new g.C8;
        c.languageCode = e.languageCode;
        c.languageName = e.languageName;
        c.name = e.name;
        c.displayName = e.displayName;
        c.kind = e.kind;
        c.isDefault = !1;
        c.X = e.X;
        c.isTranslateable = e.isTranslateable;
        c.vssId = e.vssId;
        c.url = e.url;
        c.translationLanguage = L;
        e.xtags && (c.xtags = e.xtags);
        e.captionId && (c.captionId = e.captionId);
        return c
    }
      , OAM = function(e, L) {
        var c, I, B;
        return g.Z(function(x) {
            if (x.K == 1)
                return c = e + "|" + L,
                g.a(x, g.HK(), 2);
            if (x.K != 3) {
                I = x.X;
                if (!I)
                    throw g.tg("gct");
                return g.a(x, g.YY(I), 3)
            }
            B = x.X;
            return x.return(B.get("captions", c))
        })
    }
      , qr9 = function(e, L, c) {
        OAM(e, L).then(function(I) {
            I && c(I.trackData, new g.C8(I.metadata))
        })
    }
      , Mrg = function(e) {
        if (!TeL.test(e))
            throw Error("'" + e + "' is not a valid hex color");
        e.length == 4 && (e = e.replace(W3U, "#$1$1$2$2$3$3"));
        e = e.toLowerCase();
        e = parseInt(e.slice(1), 16);
        return [e >> 16, e >> 8 & 255, e & 255]
    }
      , zjJ = function() {
        var e = void 0;
        e = e === void 0 ? {} : e;
        var L = "suggest_correction"in g.HoN ? g.HoN.suggest_correction : "Edit caption";
        L = L || "";
        var c = {}, I;
        for (I in e) {
            c = {
                E8: c.E8
            };
            c.E8 = I;
            var B = function(x) {
                return function() {
                    return String(e[x.E8])
                }
            }(c);
            L = L.replace(new RegExp("\\$\\{" + c.E8 + "\\}","gi"), B);
            L = L.replace(new RegExp("\\$" + c.E8,"gi"), B)
        }
        return L
    }
      , s7M = function() {
        return g.iS("yt-player-caption-display-settings")
    }
      , TB = function() {
        this.segments = []
    }
      , vsM = function(e, L) {
        var c = g.l7(e.segments, L);
        c >= 0 || c < 0 && (-c - 1) % 2 === 1 || (c = -c - 1,
        c > 0 && L - e.segments[c - 1] === 1 && c < e.segments.length && e.segments[c] - L === 1 ? (g.b7(e.segments, c),
        g.b7(e.segments, c - 1)) : c > 0 && L - e.segments[c - 1] === 1 ? e.segments[c - 1] = L : c < e.segments.length && e.segments[c] - L === 1 ? e.segments[c] = L : (g.pZ(e.segments, c, 0, L),
        g.pZ(e.segments, c + 1, 0, L)))
    }
      , f2M = function(e, L, c, I, B, x) {
        g.p.call(this);
        this.policy = e;
        this.player = L;
        this.pS = c;
        this.J = I;
        this.B = B;
        this.D = x;
        this.G = new TB;
        this.j = -1;
        this.Z = this.K = this.X = null;
        this.h7 = 0;
        this.T = new g.j9(this.k7,1E3,this);
        this.events = new g.zn(this);
        g.l(this, this.T);
        g.l(this, this.events);
        this.events.C(L, "SEEK_COMPLETE", this.KC);
        this.KC();
        this.k7()
    }
      , AaN = function(e) {
        return e.X && e.X.j ? e.X.j + e.player.FF() < e.player.getCurrentTime() : !1
    }
      , F3L = function(e, L) {
        if (e.policy.al && e.player.vt()) {
            var c = g.c6(L, e.policy, {});
            c.set("pot", e.player.vt());
            c = c.Wd()
        } else
            c = g.c6(L, e.policy, {}).Wd();
        var I = {
            format: "RAW",
            withCredentials: !0
        };
        if (e.policy.ye) {
            I.method = "POST";
            var B = L.G;
            B && Object.keys(B).length > 0 ? I.postBody = g.Pl(B, g.x0) : I.postBody = (0,
            g.Dd)([120, 0])
        }
        e.B && (I.responseType = "arraybuffer");
        var x = ++e.h7
          , S = (0,
        g.zI)();
        e.Z = g.v3(c, I, 3, 100, -1, function(h) {
            h.errorCode === "net.timeout" && e.player.sW("capnt", {
                rn: x++
            })
        }).then(function(h) {
            if (e.policy.t0 && x % 100 === 1) {
                var R = (0,
                g.zI)();
                e.player.sW("caprsp", {
                    rn: x,
                    ms: R - S,
                    kb: (h.xhr.responseText.length / 1024).toFixed()
                })
            }
            a: {
                h = h.xhr;
                e.We();
                if (e.K) {
                    var u = !(e.B ? h.response : h.responseText) || h.status >= 400;
                    if (R = g.SPT(h)) {
                        h = g.c6(e.K, e.policy, {});
                        e.K.yB(h, R);
                        F3L(e, e.K);
                        break a
                    }
                    if (u)
                        e.player.sW("capfail", {
                            status: h.status
                        });
                    else {
                        var t;
                        g.px("fcb_r", (0,
                        g.zI)(), ((t = e.player.getVideoData()) == null ? void 0 : t.D) || "");
                        t = e.K.bd[0].ud;
                        e.J != null && e.j !== t && (R = e.K.bd[0],
                        e.B ? e.J(h.response, (R.startTime + e.player.FF()) * 1E3) : e.J(h.responseText, (R.startTime + e.player.FF()) * 1E3),
                        e.j = t)
                    }
                }
                e.K = null;
                e.Z = null
            }
        }).XR(function(h) {
            e.K = null;
            e.Z = null;
            var R;
            e.player.sW("capfail", {
                rn: x,
                status: (R = h.xhr) == null ? void 0 : R.status
            })
        });
        e.K = L;
        vsM(e.G, e.K.bd[0].ud)
    }
      , WR = function(e, L) {
        g.ax.call(this, L);
        this.X = e;
        this.V = L;
        this.Z = null;
        this.j = !1;
        this.logger = new g.tB("caps");
        this.T = g.RwM(this.V, this.X)
    }
      , iA9 = function(e, L) {
        var c = [], I;
        for (I in e.X.X)
            if (e.X.X.hasOwnProperty(I)) {
                var B = e.X.X[I];
                if (g.mK(B, L || null)) {
                    var x = B.info.id
                      , S = x
                      , h = "." + x
                      , R = ""
                      , u = "";
                    if (B = B.info.captionTrack)
                        x = B.languageCode,
                        S = B.displayName,
                        h = B.vssId,
                        R = B.kind,
                        u = B.id;
                    else {
                        B = x;
                        var t = g.Rge.get(B);
                        t == null && (t = bAL[B] || bAL[B.replace(/-/g, "_")],
                        g.Rge.set(B, t));
                        B = t;
                        S = B || S
                    }
                    c.push(new g.C8({
                        id: I,
                        languageCode: x,
                        languageName: S,
                        is_servable: !0,
                        is_default: !0,
                        is_translateable: !1,
                        vss_id: h,
                        kind: R,
                        captionId: u
                    }))
                }
            }
        return c
    }
      , GJg = function(e, L) {
        return L != null && L in e.X.X ? e.X.X[L] : null
    }
      , gsN = function(e, L, c) {
        var I = [], B;
        for (B in e.X.X)
            if (e.X.X.hasOwnProperty(B)) {
                var x = e.X.X[B];
                if (g.mK(x, c || null)) {
                    var S = x.info.captionTrack;
                    S && S.languageCode === L && I.push(x)
                }
            }
        return I.length ? I[0] : null
    }
      , Ms = function(e, L, c, I, B, x, S, h, R, u) {
        var t = u.isInline() && !0
          , O = {};
        Object.assign(O, L);
        Object.assign(O, e.params);
        Object.assign(O, c);
        var q = {};
        Object.assign(q, L.Kj);
        e.params.Kj && Object.assign(q, e.params.Kj);
        Object.assign(q, c.Kj);
        t && (O.windowOpacity = .6,
        q.backgroundOpacity = 0);
        O.Kj = q;
        var T = O.Qx === 1, W = [{
            U: "span",
            W: "captions-text",
            N: {
                style: "word-wrap: normal; display: block;"
            }
        }], A, b, J;
        (h = h.N0("caption_edit_on_hover") && ((A = u.getVideoData().getPlayerResponse()) == null ? void 0 : (b = A.captions) == null ? void 0 : (J = b.playerCaptionsTracklistRenderer) == null ? void 0 : J.openTranscriptCommand)) && W.unshift({
            U: "button",
            W: "caption-edit",
            N: {
                tabindex: "0",
                "aria-label": zjJ()
            },
            L: [{
                U: "svg",
                N: {
                    fill: "#e3e3e3",
                    height: "100%",
                    viewBox: "5 5 38 38",
                    width: "100%"
                },
                L: [{
                    U: "path",
                    N: {
                        d: "M9 39h2.2l24.25-24.25-1.1-1.1-1.1-1.1L9 36.8Zm-3 3v-6.4L35.4 6.2q.85-.85 2.12-.82 1.27.02 2.12.87L41.8 8.4q.85.85.85 2.1t-.85 2.1L12.4 42Zm33.5-31.55L37.45 8.4Zm-4.05 4.3-1.1-1.1-1.1-1.1 2.2 2.2Z"
                    }
                }]
            }]
        });
        g.U.call(this, {
            U: "div",
            W: "caption-window",
            N: {
                id: "caption-window-" + e.id,
                dir: T ? "rtl" : "ltr",
                tabindex: "0",
                lang: O.lang
            },
            L: W
        });
        var w = this;
        this.T = [];
        this.Ve = !1;
        this.K = e;
        this.Y9 = this.ye = null;
        this.RI = x;
        this.Bw = S;
        this.J = null;
        this.maxWidth = x * .96;
        this.maxHeight = S * .96;
        this.X = O;
        this.xT = c;
        this.h7 = L;
        this.G = this.q0("captions-text");
        this.RT = this.G.style.getPropertyValue("box-decoration-break") !== "" || this.G.style.getPropertyValue("-webkit-box-decoration-break") !== "";
        this.Pe = kJg(I, B, x, S);
        this.Q5 = R;
        h && (this.j = this.q0("caption-edit"),
        this.C(this.j, "click", function() {
            w.Q5()
        }));
        this.type = 0;
        this.He = this.Pe * D4w(q);
        this.DY = t;
        e = new g.dB(this.element,!0);
        g.l(this, e);
        e.subscribe("dragstart", this.Ws, this);
        e.subscribe("dragmove", this.yf, this);
        e.subscribe("dragend", this.Tt, this);
        this.d_ = this.m$ = this.x9 = this.Sl = 0;
        e = "";
        this.X.windowOpacity && (e = Mrg(this.X.windowColor),
        e = "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + this.X.windowOpacity + ")");
        L = {
            "background-color": e,
            display: this.X.isVisible === !1 ? "none" : "",
            "text-align": wtL[this.X.textAlign]
        };
        this.RT && (L["border-radius"] = e ? this.He / 8 + "px" : "");
        (this.Z = this.K.params.Qx === 2 || this.K.params.Qx === 3) && Jaw(this, this.element);
        g.l3(this.element, L);
        if (t) {
            var C;
            (C = this.element.parentElement) == null || C.style.setProperty("--caption-window-color", e)
        }
        switch (this.X.jF) {
        case 0:
        case 1:
        case 2:
            g.Y4(this.element, "ytp-caption-window-top");
            break;
        case 6:
        case 7:
        case 8:
            g.Y4(this.element, "ytp-caption-window-bottom")
        }
    }
      , Jaw = function(e, L) {
        var c = "vertical-rl";
        e.X.EM === 1 && (c = "vertical-lr");
        g.oA && (c = c === "vertical-lr" ? "tb-lr" : "tb-rl");
        g.l3(L, "-o-writing-mode", c);
        g.l3(L, "-webkit-writing-mode", c);
        g.l3(L, "writing-mode", c);
        g.l3(L, "text-orientation", "upright");
        g.Y4(L, "ytp-vertical-caption");
        e.K.params.Qx === 3 && (g.l3(L, "text-orientation", ""),
        g.l3(L, "transform", "rotate(180deg)"))
    }
      , D4w = function(e) {
        var L = 1 + .25 * (e.fontSizeIncrement || 0);
        if (e.offset === 0 || e.offset === 2)
            L *= .8;
        return L
    }
      , VrN = function(e, L) {
        var c = {}
          , I = L.background ? L.background : e.X.Kj.background;
        if (L.backgroundOpacity != null || L.background) {
            var B = L.backgroundOpacity != null ? L.backgroundOpacity : e.X.Kj.backgroundOpacity;
            I = Mrg(I);
            c.background = "rgba(" + I[0] + "," + I[1] + "," + I[2] + "," + B + ")";
            e.RT && (c["box-decoration-break"] = "clone",
            c["border-radius"] = e.He / 8 + "px")
        }
        if (L.fontSizeIncrement != null || L.offset != null)
            c["font-size"] = e.Pe * D4w(L) + "px";
        I = 1;
        B = L.color || e.X.Kj.color;
        if (L.color || L.textOpacity != null)
            B = Mrg(B),
            I = L.textOpacity == null ? e.X.Kj.textOpacity : L.textOpacity,
            B = "rgba(" + B[0] + "," + B[1] + "," + B[2] + "," + I + ")",
            c.color = B,
            c.fill = B;
        var x = L.charEdgeStyle;
        x === 0 && (x = void 0);
        if (x) {
            B = "rgba(34, 34, 34, " + I + ")";
            var S = "rgba(204, 204, 204, " + I + ")";
            L.KT && (S = B = L.KT);
            var h = e.Pe / 16 / 2
              , R = Math.max(h, 1)
              , u = Math.max(2 * h, 1)
              , t = Math.max(3 * h, 1)
              , O = Math.max(5 * h, 1);
            I = [];
            switch (x) {
            case 4:
                for (; t <= O; t += h)
                    I.push(u + "px " + u + "px " + t + "px " + B);
                break;
            case 1:
                u = window.devicePixelRatio >= 2 ? .5 : 1;
                for (x = R; x <= t; x += u)
                    I.push(x + "px " + x + "px " + B);
                break;
            case 2:
                I.push(R + "px " + R + "px " + S);
                I.push("-" + R + "px -" + R + "px " + B);
                break;
            case 3:
                for (t = 0; t < 5; t++)
                    I.push("0 0 " + u + "px " + B)
            }
            c["text-shadow"] = I.join(", ")
        }
        B = "";
        switch (L.fontFamily) {
        case 1:
            B = '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
            break;
        case 2:
            B = '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
            break;
        case 3:
            B = '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
            break;
        case 5:
            B = '"Comic Sans MS", Impact, Handlee, fantasy';
            break;
        case 6:
            B = '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
            break;
        case 7:
            B = g.m2() ? '"Carrois Gothic SC", sans-serif-smallcaps' : 'Arial, Helvetica, Verdana, "Marcellus SC", sans-serif';
            break;
        case 0:
        case 4:
            B = '"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif'
        }
        B && (c["font-family"] = B);
        B = L.offset;
        B == null && (B = e.X.Kj.offset);
        switch (B) {
        case 0:
            c["vertical-align"] = "sub";
            break;
        case 2:
            c["vertical-align"] = "super"
        }
        L.fontFamily === 7 && (c["font-variant"] = "small-caps");
        L.bold && (c["font-weight"] = "bold");
        L.italic && (c["font-style"] = "italic");
        L.underline && (c["text-decoration"] = "underline");
        L.QU && (c.visibility = "hidden");
        L.W8 === 1 && e.Z && (c["text-combine-upright"] = "all",
        c["text-orientation"] = "mixed",
        B = g.sj || g.RM,
        e.K.params.Qx === 3 ? c.transform = B ? "rotate(90deg)" : "rotate(180deg)" : B && (c.transform = "rotate(-90deg)"));
        if (L.textEmphasis === 1 || L.textEmphasis === 2 || L.textEmphasis === 3 || L.textEmphasis === 4 || L.textEmphasis === 5)
            if (g.sj)
                c["font-weight"] = "bold";
            else
                switch (c["text-emphasis-style"] = "filled circle",
                c["text-emphasis-color"] = "currentcolor",
                c["webkit-text-emphasis"] = "filled circle",
                L.textEmphasis) {
                case 4:
                case 3:
                    c["text-emphasis-position"] = "under left";
                    c["webkit-text-emphasis-position"] = "under left";
                    break;
                case 5:
                case 2:
                    c["text-emphasis-position"] = "over right",
                    c["webkit-text-emphasis-position"] = "over right"
                }
        return c
    }
      , zB = function(e) {
        e = e.split("px");
        return e.length > 0 ? (e = Number(e[0])) ? e : 0 : 0
    }
      , C6e = function(e) {
        e.J = g.ql("SPAN");
        g.l3(e.J, {
            display: "block"
        });
        g.Y4(e.J, "caption-visual-line");
        e.G.appendChild(e.J)
    }
      , a2N = function(e, L) {
        var c = g.ql("SPAN");
        g.l3(c, {
            display: "inline-block",
            "white-space": "pre-wrap"
        });
        g.l3(c, VrN(e, L));
        c.classList.add("ytp-caption-segment");
        e.J.appendChild(c);
        c.previousElementSibling && (g.l3(c.previousElementSibling, {
            "border-top-right-radius": "0",
            "border-bottom-right-radius": "0"
        }),
        g.l3(c, {
            "border-top-left-radius": "0",
            "border-bottom-left-radius": "0"
        }));
        return c
    }
      , NeN = function(e, L, c) {
        e.Ve = e.Ve || !!c;
        var I = {};
        Object.assign(I, e.X.Kj);
        Object.assign(I, c || L.X);
        Object.assign(I, e.xT.Kj);
        (c = !e.J) && C6e(e);
        for (var B = e.ye && e.Y9 && g.W2(I, e.Y9) ? e.ye : a2N(e, I), x = typeof L.text === "string", S = x ? L.text.split("\n") : [L.text], h = 0; h < S.length; h++) {
            var R = h > 0 || !L.append
              , u = S[h];
            R && !c ? (C6e(e),
            B = a2N(e, I)) : R && c && (c = !1);
            u && (B.appendChild(x ? g.T$(u) : u),
            x || u.tagName !== "RUBY" || u.childElementCount !== 4 || g.sj || !g.QD(u.children[2], "text-emphasis") || (R = e.Z ? "padding-right" : "padding-top",
            g.QD(u.children[2], "text-emphasis-position") && (R = e.Z ? "padding-left" : "padding-bottom"),
            g.RF ? g.l3(B, R, "1em") : g.l3(B, R, "0.5em")))
        }
        e.Y9 = I;
        e.ye = B;
        e.T.push(L)
    }
      , kJg = function(e, L, c, I) {
        var B = L / 360 * 16;
        L >= e && (e = 640,
        I > c * 1.3 && (e = 480),
        B = c / e * 16);
        return B
    }
      , yaM = function() {
        this.Z = this.time = this.mode = this.K = 0;
        this.G = new m4U(this);
        this.B = new m4U(this);
        this.X = [];
        this.clear()
    }
      , ptN = function(e, L, c) {
        if (e === 255 && L === 255 || !e && !L)
            return {
                NE: e,
                Ex: L,
                result: 0
            };
        e = ZAh[e];
        L = ZAh[L];
        if (e & 128) {
            var I;
            if (I = !(L & 128))
                I = L,
                I = c.Hd() && c.Ex === I;
            if (I)
                return {
                    NE: e,
                    Ex: L,
                    result: 1
                }
        } else if (L & 128 && 1 <= e && e <= 31)
            return {
                NE: e,
                Ex: L,
                result: 2
            };
        return {
            NE: e,
            Ex: L,
            result: 3
        }
    }
      , j7M = function(e, L, c, I) {
        L === 255 && c === 255 || !L && !c ? (++e.Z === 45 && e.reset(),
        e.G.K.clear(),
        e.B.K.clear()) : (e.Z = 0,
        $4g(e.G, L, c, I))
    }
      , HAZ = function(e, L) {
        e.X.sort(function(B, x) {
            var S = B.time - x.time;
            return S === 0 ? B.order - x.order : S
        });
        for (var c = g.f(e.X), I = c.next(); !I.done; I = c.next())
            I = I.value,
            e.time = I.time,
            I.type === 0 ? j7M(e, I.yz, I.W0, L) : I.type === 1 && e.K & 496 && $4g(e.B, I.yz, I.W0, L);
        e.X.length = 0
    }
      , sC = function() {
        this.type = 0
    }
      , vR = function() {
        this.state = this.Ex = this.NE = 0
    }
      , l2M = function() {
        this.timestamp = this.X = 0
    }
      , fj = function(e) {
        this.B = e;
        this.Z = [];
        this.X = this.K = this.row = 0;
        this.style = new sC;
        for (e = this.G = 0; e <= 15; e++) {
            this.Z[e] = [];
            for (var L = 0; L <= 32; L++)
                this.Z[e][L] = new l2M
        }
    }
      , AV = function(e, L) {
        if (e.style.type === 3) {
            for (var c = 0, I = 0, B = e.B.time + 0, x = "", S = "", h = B, R = 1; R <= 15; ++R) {
                for (var u = !1, t = I ? I : 1; t <= 32; ++t) {
                    var O = e.Z[R][t];
                    if (O.X !== 0) {
                        c === 0 && (c = R,
                        I = t);
                        u = String.fromCharCode(O.X);
                        var q = O.timestamp;
                        q < B && (B = q);
                        O.timestamp = h;
                        S && (x += S,
                        S = "");
                        x += u;
                        u = !0
                    }
                    if ((O.X === 0 || t === 32) && u) {
                        S = "\n";
                        break
                    } else if (I && !u)
                        break
                }
                if (c && !u)
                    break
            }
            x && L.G(c, I, B, h, x)
        } else
            for (I = c = 0,
            x = B = e.B.time + 0,
            S = 1; S <= 15; ++S)
                for (h = "",
                R = 1; R <= 32; ++R)
                    if (t = e.Z[S][R],
                    O = t.X,
                    O !== 0 && (c === 0 && (c = S,
                    I = R),
                    u = String.fromCharCode(O),
                    q = t.timestamp,
                    q <= B && (B = q),
                    h += u,
                    t.reset()),
                    R === 32 || O === 0)
                        h && L.G(c, I, B, x, h),
                        B = x,
                        h = "",
                        I = c = 0
    }
      , EsU = function(e, L) {
        switch (e) {
        case 0:
            return P6N[(L & 127) - 32];
        case 1:
            return Q7N[L & 15];
        case 2:
            return d4h[L & 31];
        case 3:
            return U47[L & 31]
        }
        return 0
    }
      , Fv = function(e) {
        return e.Z[e.row][e.K]
    }
      , bO = function(e, L, c) {
        L >= 2 && e.K > 1 && (--e.K,
        Fv(e).X = 0);
        var I = Fv(e);
        I.timestamp = e.B.time + 0;
        I.X = EsU(L, c);
        e.K < 32 && e.K++
    }
      , Xte = function(e, L, c, I) {
        for (var B = 0; B < I; B++)
            for (var x = 0; x <= 32; x++) {
                var S = e.Z[L + B][x]
                  , h = e.Z[c + B][x];
                S.X = h.X;
                S.timestamp = h.timestamp
            }
    }
      , iO = function(e, L, c) {
        for (var I = 0; I < c; I++)
            for (var B = 0; B <= 32; B++)
                e.Z[L + I][B].reset()
    }
      , K3e = function(e) {
        e.row = e.X > 0 ? e.X : 1;
        e.K = 1;
        iO(e, 0, 15)
    }
      , YrM = function(e) {
        this.Z = e;
        this.B = 0;
        this.style = new sC;
        this.j = new fj(this.Z);
        this.T = new fj(this.Z);
        this.text = new fj(this.Z);
        this.K = this.j;
        this.G = this.T;
        this.X = this.K
    }
      , nsL = function(e, L, c) {
        var I = e.K
          , B = !1;
        switch (e.style.get()) {
        case 4:
        case 1:
        case 2:
            e.style.get() === 4 && I.X > 0 || (AV(I, c),
            K3e(e.K),
            K3e(e.G),
            I.row = 15,
            I.X = L,
            B = !0)
        }
        e.style.set(3);
        e.X = I;
        e.X.style = e.style;
        e.Z.mode = 1 << I.G;
        B ? I.K = 1 : I.X !== L && (I.X > L ? (AV(I, c),
        iO(I, I.row - I.X, L)) : I.row < L && (L = I.X),
        I.X = L)
    }
      , elM = function(e) {
        e.style.set(1);
        e.X = e.G;
        e.X.X = 0;
        e.X.style = e.style;
        e.Z.mode = 1 << e.X.G
    }
      , LLN = function(e) {
        e.style.set(4);
        e.X = e.text;
        e.X.style = e.style;
        e.Z.mode = 1 << e.X.G
    }
      , m4U = function(e) {
        this.X = e;
        this.B = 0;
        this.Z = new YrM(this.X);
        this.j = new YrM(this.X);
        this.K = new vR;
        this.G = this.Z
    }
      , $4g = function(e, L, c, I) {
        e.K.update();
        L = ptN(L, c, e.K);
        switch (L.result) {
        case 0:
            return;
        case 1:
        case 2:
            return
        }
        var B = L.NE;
        c = L.Ex;
        if (32 <= B || !B)
            e.X.mode & e.X.K && (L = B,
            L & 128 && (L = 127),
            c & 128 && (c = 127),
            e = e.G.X,
            L & 96 && bO(e, 0, L),
            c & 96 && bO(e, 0, c),
            L !== 0 && c !== 0 && e.style.type === 3 && AV(e, I));
        else if (B & 16)
            a: if (!e.K.matches(B, c) && (L = e.K,
            L.NE = B,
            L.Ex = c,
            L.state = 2,
            L = B & 8 ? e.j : e.Z,
            e.G = L,
            e.X.mode = 1 << (e.B << 2) + (L.B << 1) + (L.style.type === 4 ? 1 : 0),
            (e.X.mode | 1 << (e.B << 2) + (L.B << 1) + (L.style.type !== 4 ? 1 : 0)) & e.X.K))
                if (c & 64) {
                    I = [11, 11, 1, 2, 3, 4, 12, 13, 14, 15, 5, 6, 7, 8, 9, 10][(B & 7) << 1 | c >> 5 & 1];
                    e = c & 16 ? ((c & 14) >> 1) * 4 : 0;
                    c = L.X;
                    switch (L.style.get()) {
                    case 4:
                        I = c.row;
                        break;
                    case 3:
                        if (I !== c.row) {
                            if (I < c.X && (I = c.X,
                            I === c.row))
                                break;
                            var x = 1 + c.row - c.X
                              , S = 1 + I - c.X;
                            Xte(c, S, x, c.X);
                            L = x;
                            B = c.X;
                            S < x ? (x = S + B - x,
                            x > 0 && (L += x,
                            B -= x)) : (x = x + B - S,
                            x > 0 && (B -= x));
                            iO(c, L, B)
                        }
                    }
                    c.row = I;
                    c.K = e + 1
                } else
                    switch (B & 7) {
                    case 1:
                        switch (c & 112) {
                        case 32:
                            bO(L.X, 0, 32);
                            break a;
                        case 48:
                            c === 57 ? (I = L.X,
                            Fv(I).X = 0,
                            I.K < 32 && I.K++) : bO(L.X, 1, c & 15)
                        }
                        break;
                    case 2:
                        c & 32 && bO(L.X, 2, c & 31);
                        break;
                    case 3:
                        c & 32 && bO(L.X, 3, c & 31);
                        break;
                    case 4:
                    case 5:
                        if (32 <= c && c <= 47)
                            switch (c) {
                            case 32:
                                elM(L);
                                break;
                            case 33:
                                I = L.X;
                                I.K > 1 && (--I.K,
                                Fv(I).X = 0);
                                break;
                            case 36:
                                I = L.X;
                                L = Fv(I);
                                for (e = 0; e <= 15; e++)
                                    for (c = 0; c <= 32; c++)
                                        if (I.Z[e][c] === L) {
                                            for (; c <= 32; c++)
                                                I.Z[e][c].reset();
                                            break
                                        }
                                break;
                            case 37:
                                nsL(L, 2, I);
                                break;
                            case 38:
                                nsL(L, 3, I);
                                break;
                            case 39:
                                nsL(L, 4, I);
                                break;
                            case 40:
                                bO(L.X, 0, 32);
                                break;
                            case 41:
                                L.style.set(2);
                                L.X = L.K;
                                L.X.X = 0;
                                L.X.style = L.style;
                                L.Z.mode = 1 << L.X.G;
                                break;
                            case 42:
                                I = L.text;
                                I.X = 15;
                                I.style.set(4);
                                K3e(I);
                                LLN(L);
                                break;
                            case 43:
                                LLN(L);
                                break;
                            case 44:
                                e = L.K;
                                switch (L.style.get()) {
                                case 1:
                                case 2:
                                case 3:
                                    AV(e, I)
                                }
                                iO(e, 0, 15);
                                break;
                            case 45:
                                b: {
                                    e = L.X;
                                    switch (L.style.get()) {
                                    default:
                                    case 2:
                                    case 1:
                                        break b;
                                    case 4:
                                        if (e.row < 15) {
                                            ++e.row;
                                            e.K = 1;
                                            break b
                                        }
                                        break;
                                    case 3:
                                    }
                                    e.X < 2 && (e.X = 2,
                                    e.row < e.X && (e.row = e.X));
                                    L = e.row - e.X + 1;
                                    AV(e, I);
                                    Xte(e, L, L + 1, e.X - 1);
                                    iO(e, e.row, 1)
                                }
                                break;
                            case 46:
                                iO(L.G, 0, 15);
                                break;
                            case 47:
                                AV(L.K, I),
                                L.G.updateTime(L.Z.time + 0),
                                I = L.G,
                                L.G = L.K,
                                L.K = I,
                                elM(L)
                            }
                        break;
                    case 7:
                        switch (c) {
                        case 33:
                        case 34:
                        case 35:
                            I = L.X,
                            (I.K += c & 3) > 32 && (I.K = 32)
                        }
                    }
    }
      , cYg = function() {}
      , GB = function(e, L, c, I, B, x, S) {
        x = x === void 0 ? !1 : x;
        S = S === void 0 ? null : S;
        g.pC.call(this, e, e + L, {
            priority: c,
            namespace: "captions"
        });
        this.windowId = I;
        this.text = B;
        this.append = x;
        this.X = S
    }
      , BDM = function(e, L, c, I, B, x, S) {
        var h = x[0]
          , R = S[h.getAttribute("p")];
        if (R.UK === 1) {
            var u = x[1]
              , t = x[2];
            x = x[3];
            h.getAttribute("t");
            u.getAttribute("t");
            t.getAttribute("t");
            x.getAttribute("t");
            h.getAttribute("p");
            u.getAttribute("p");
            x.getAttribute("p");
            S = S[t.getAttribute("p")];
            h = IiL(h.textContent, u.textContent, t.textContent, x.textContent, S);
            return new GB(e,L,B,c,h,I,R)
        }
        switch (R.UK) {
        case 9:
        case 10:
            R.textEmphasis = 1;
            break;
        case 11:
            R.textEmphasis = 2;
            break;
        case 12:
            R.textEmphasis = 3;
            break;
        case 13:
            R.textEmphasis = 4;
            break;
        case 14:
            R.textEmphasis = 5
        }
        return new GB(e,L,B,c,h.textContent || "",I,R)
    }
      , IiL = function(e, L, c, I, B) {
        var x = g.m2()
          , S = x ? g.ql("DIV") : g.ql("RUBY")
          , h = g.ql("SPAN");
        h.textContent = e;
        S.appendChild(h);
        e = x ? g.ql("DIV") : g.ql("RP");
        e.textContent = L;
        S.appendChild(e);
        L = x ? g.ql("DIV") : g.ql("RT");
        L.textContent = c;
        S.appendChild(L);
        c = B.UK;
        if (c === 10 || c === 11 || c === 12 || c === 13 || c === 14)
            if (g.l3(L, "text-emphasis-style", "filled circle"),
            g.l3(L, "text-emphasis-color", "currentcolor"),
            g.l3(L, "webkit-text-emphasis", "filled circle"),
            B.UK === 11 || B.UK === 13)
                g.l3(L, "webkit-text-emphasis-position", "under left"),
                g.l3(L, "text-emphasis-position", "under left");
        c = !0;
        if (B.UK === 4 || B.UK === 7 || B.UK === 12 || B.UK === 14)
            g.l3(S, "ruby-position", "over"),
            g.l3(S, "-webkit-ruby-position", "before");
        else if (B.UK === 5 || B.UK === 6 || B.UK === 11 || B.UK === 13)
            g.l3(S, "ruby-position", "under"),
            g.l3(S, "-webkit-ruby-position", "after"),
            c = !1;
        B = x ? g.ql("DIV") : g.ql("RP");
        B.textContent = I;
        S.appendChild(B);
        x && (I = c,
        g.l3(S, {
            display: "inline-block",
            position: "relative"
        }),
        x = S.firstElementChild.nextElementSibling,
        g.l3(x, "display", "none"),
        x = x.nextElementSibling,
        g.l3(x, {
            "font-size": "0.5em",
            "line-height": "1.2em",
            "text-align": "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400%"
        }),
        g.l3(S.lastElementChild, "display", "none"),
        I ? (g.l3(S, "padding-top", "0.6em"),
        g.l3(x, "top", "0")) : (g.l3(S, "padding-bottom", "0.6em"),
        g.l3(x, "bottom", "0")));
        return S
    }
      , gA = function() {
        g.p.apply(this, arguments)
    }
      , kp = function(e, L, c, I, B) {
        g.pC.call(this, e, e + L, {
            priority: c,
            namespace: "captions"
        });
        this.id = I;
        this.params = B;
        this.X = []
    }
      , xTM = function(e) {
        var L = "_" + Dm++;
        return new kp(0,0x8000000000000,0,L,e)
    }
      , wA = function(e) {
        gA.call(this);
        this.G = e;
        this.pens = {};
        this.J = {};
        this.D = {};
        this.B = "_" + Dm++;
        this.T = {};
        this.K = this.X = null;
        this.j = !0
    }
      , JV = function(e, L) {
        e = e.getAttribute(L);
        if (e != null)
            return Number(e)
    }
      , VQ = function(e, L) {
        e = e.getAttribute(L);
        if (e != null)
            return e === "1"
    }
      , Cj = function(e, L) {
        e = JV(e, L);
        return e !== void 0 ? e : null
    }
      , Ns = function(e, L) {
        e = e.getAttribute(L);
        if (e != null)
            return aw.test(e),
            e
    }
      , oO7 = function(e, L) {
        var c = {}
          , I = L.getAttribute("ws");
        Object.assign(c, I ? e.D[I] : e.G);
        e = Cj(L, "mh");
        e != null && (c.O2 = e);
        e = Cj(L, "ju");
        e != null && (c.textAlign = e);
        e = Cj(L, "pd");
        e != null && (c.Qx = e);
        e = Cj(L, "sd");
        e != null && (c.EM = e);
        e = Ns(L, "wfc");
        e != null && (c.windowColor = e);
        L = JV(L, "wfo");
        L !== void 0 && (c.windowOpacity = L / 255);
        return c
    }
      , SDN = function(e, L) {
        var c = {}
          , I = L.getAttribute("wp");
        I && Object.assign(c, e.J[I]);
        e = Cj(L, "ap");
        e != null && (c.jF = e);
        e = JV(L, "cc");
        e != null && (c.X$ = e);
        e = JV(L, "ah");
        e != null && (c.Me = e);
        e = JV(L, "rc");
        e != null && (c.VX = e);
        L = JV(L, "av");
        L != null && (c.I2 = L);
        return c
    }
      , rYM = function(e, L, c, I) {
        var B = {};
        Object.assign(B, SDN(e, L));
        Object.assign(B, oO7(e, L));
        I ? g.W2(B, e.G) ? (I = e.B,
        B = e.G) : I = "_" + Dm++ : I = L.getAttribute("id") || "_" + Dm++;
        e = JV(L, "t") + c;
        L = JV(L, "d") || 0x8000000000000;
        if (B.Qx === 2 || B.Qx === 3)
            c = B.VX,
            B.VX = B.X$,
            B.X$ = c;
        return new kp(e,L,0,I,B)
    }
      , mh = function(e) {
        gA.call(this);
        this.j = e;
        this.X = new Map;
        this.G = new Map;
        this.B = new Map;
        this.K = new Map
    }
      , yQ = function(e) {
        e = g.j5(Math.round(e), 0, 16777215).toString(16).toUpperCase();
        return "#000000".substring(0, 7 - e.length) + e
    }
      , hlw = function(e, L, c, I, B) {
        I === 0 && (I = 0x8000000000000);
        var x = {};
        L.wpWinPosId && Object.assign(x, e.G.get(L.wpWinPosId));
        L.wsWinStyleId && Object.assign(x, e.B.get(L.wsWinStyleId));
        e = L.rcRowCount;
        e !== void 0 && (x.VX = e);
        L = L.ccColCount;
        L !== void 0 && (x.X$ = L);
        if (x.Qx === 2 || x.Qx === 3)
            L = x.VX,
            x.VX = x.X$,
            x.X$ = L;
        return new kp(c,I,0,B,x)
    }
      , Zm = function(e, L, c) {
        g.ax.call(this, e);
        this.videoData = L;
        this.audioTrack = c;
        this.B = L.Ky
    }
      , pj = function(e, L, c, I, B, x, S, h, R, u) {
        Ms.call(this, e, L, c, I, B, x, S, h, R, u);
        this.type = 1
    }
      , $p = function(e, L, c) {
        this.trackData = e;
        this.j = c;
        this.version = this.B = this.Z = this.byteOffset = 0;
        this.K = [];
        this.X = new DataView(this.trackData)
    }
      , jT = function(e) {
        var L = e.byteOffset;
        e.byteOffset += 1;
        return e.X.getUint8(L)
    }
      , HR = function(e) {
        var L = e.byteOffset;
        e.byteOffset += 4;
        return e.X.getUint32(L)
    }
      , lO = function(e, L) {
        gA.call(this);
        this.K = e;
        this.G = L;
        this.track = this.G.languageName === "CC3" ? 4 : 0;
        this.X = new yaM;
        this.X.K = 1 << this.track
    }
      , uiM = function(e) {
        if (typeof e === "string")
            return !1;
        e = new $p(e,8,0);
        return Rlw(e)
    }
      , Rlw = function(e) {
        if (!(e.byteOffset < e.X.byteLength) || HR(e) !== 1380139777)
            return !1;
        e.version = jT(e);
        if (e.version > 1)
            return !1;
        jT(e);
        jT(e);
        jT(e);
        return !0
    }
      , PR = function(e, L, c, I, B, x, S, h, R, u) {
        Ms.call(this, e, L, c, I, B, x, S, h, R, u);
        var t = this;
        this.type = 2;
        this.Gm = [];
        this.pS = this.D = this.t7 = 0;
        this.k9 = NaN;
        this.sY = 0;
        this.Cf = null;
        this.Kf = new g.j9(this.sL,433,this);
        this.j && (u.createClientVe(this.j, this, 167342),
        this.C(this.j, "click", function() {
            u.logClick(t.j)
        }),
        e = new g.dB(this.element,!0),
        g.l(this, e),
        e.subscribe("hoverstart", function() {
            u.logVisibility(t.j, !0)
        }, this));
        g.Y4(this.element, "ytp-caption-window-rollup");
        g.l(this, this.Kf);
        g.l3(this.element, "overflow", "hidden")
    }
      , tNM = function(e, L) {
        if (!L)
            return "";
        e.Z && e.K.params.EM !== 1 && (L *= -1);
        return "translate" + (e.Z ? "X" : "Y") + "(" + L + "px)"
    }
      , OKZ = function(e) {
        e.Gm = Array.from(e.element.getElementsByClassName("caption-visual-line"));
        for (var L = e.K.params.VX, c = 0, I = 0, B = e.Gm.length - 1; c < L && B > -1; ) {
            var x = e.Gm[B];
            I += e.Z ? x.offsetWidth : x.offsetHeight;
            c++;
            B--
        }
        e.D = I;
        L = Math;
        c = L.max;
        isNaN(e.k9) && ((I = e.X.X$) ? (B = g.ql("SPAN"),
        g.fU(B, "\u2013".repeat(I)),
        g.l3(B, VrN(e, e.X.Kj)),
        e.G.appendChild(B),
        e.k9 = B.offsetWidth,
        e.G.removeChild(B)) : e.k9 = 0);
        I = e.G;
        e.pS = c.call(L, e.k9, e.sY, (e.Z ? I.offsetHeight : I.offsetWidth) + 1)
    }
      , qDN = function(e, L) {
        OKZ(e);
        var c = e.Gm.reduce(function(x, S) {
            return (e.Z ? S.offsetWidth : S.offsetHeight) + x
        }, 0);
        c = e.D - c;
        if (c !== e.t7) {
            var I = c > 0 && e.t7 === 0
              , B = c < e.t7;
            L || isNaN(c) || I || !B || (g.Y4(e.element, "ytp-rollup-mode"),
            e.C(e.element, "transitionend", e.sL));
            g.l3(e.G, "transform", tNM(e, c));
            e.t7 = c
        }
        OKZ(e)
    }
      , TDJ = function(e, L, c, I) {
        var B = this;
        this.V = e;
        this.Z = L;
        this.logger = c;
        this.Wy = I;
        this.p9 = [];
        this.v_ = [];
        this.X = null;
        this.kx = {
            m20: function() {
                return B.X
            },
            im: function() {
                return B.p9
            }
        };
        e = g.X3(this.V.S().experiments, "html5_override_micro_discontinuities_threshold_ms");
        this.K = e > 0 ? e : 10
    }
      , zlM = function(e, L) {
        e.X = function(c, I) {
            if (c.info.B) {
                var B = c;
                if (e.v_.length > 0) {
                    for (B = e.v_.shift(); e.v_.length > 0; )
                        B = g.W6(B, e.v_.shift());
                    B = g.W6(B, c)
                }
                if (B) {
                    c = B;
                    try {
                        var x = g.Mh(c) * 1E3
                    } catch (u) {
                        x = c.info.startTime * 1E3
                    }
                    try {
                        var S = g.Krc(c) * 1E3
                    } catch (u) {
                        S = c.info.duration * 1E3
                    }
                    if (x < 0 || S < 0)
                        x < 0 && (x = c.info.startTime * 1E3),
                        S < 0 && (S = c.info.duration * 1E3);
                    c.info.startTime = x / 1E3;
                    c.info.G = x / 1E3;
                    c.info.duration = S / 1E3;
                    c.info.J = S / 1E3;
                    x = e.YR(B);
                    S = x.ud;
                    x = {
                        formatId: x.formatId,
                        startTimeMs: x.startTimeMs,
                        durationMs: x.durationMs,
                        E9: S,
                        aO: S
                    };
                    S = WLM(e.p9, x.startTimeMs);
                    var h = (c = S >= 0 ? e.p9[S] : null) ? c.startTimeMs + c.durationMs : 0
                      , R = x.startTimeMs + x.durationMs;
                    !c || x.startTimeMs - h > e.K ? e.p9.splice(S + 1, 0, x) : (c.durationMs = Math.max(h, R) - c.startTimeMs,
                    c.aO = Math.max(c.aO, x.aO));
                    I(e.p9);
                    I = g.T6(B);
                    MNg(e.Z, I.buffer.slice(I.byteOffset, I.byteLength + I.byteOffset), L, B.info.G)
                } else
                    e.logger.X(350058965, "Empty slice")
            } else
                e.v_.push(c)
        }
        ;
        e.V.addEventListener("sabrCaptionsDataLoaded", e.X)
    }
      , WLM = function(e, L) {
        e = g.l7(e, {
            startTimeMs: L
        }, function(c, I) {
            return c.startTimeMs - I.startTimeMs
        });
        return e >= 0 ? e : -e - 2
    }
      , sJh = function(e, L) {
        g.ax.call(this, L);
        this.X = e;
        this.V = L;
        this.logger = new g.tB("caps");
        this.Z = this.j = null;
        this.T = new TDJ(this.V,this,this.logger,this.X.Wy)
    }
      , MNg = function(e, L, c, I) {
        e.logger.debug(function() {
            return "SABR captions data received for " + I
        });
        e.j ? e.Z == null ? e.logger.X(350058965, "Null loaded track meta data at captions data received") : c.Bo(L, e.Z, I * 1E3) : e.logger.X(350058965, "Null Representation at captions data received")
    }
      , vON = function(e, L) {
        var c = [], I;
        for (I in e.X.X)
            if (e.X.X.hasOwnProperty(I)) {
                var B = e.X.X[I];
                if (g.mK(B, L || null)) {
                    var x = B.info.id
                      , S = x
                      , h = "." + x
                      , R = ""
                      , u = "";
                    if (B = B.info.captionTrack)
                        x = B.languageCode,
                        S = B.displayName,
                        h = B.vssId,
                        R = B.kind,
                        u = B.id;
                    c.push(new g.C8({
                        id: I,
                        languageCode: x,
                        languageName: S,
                        is_servable: !0,
                        is_default: !0,
                        is_translateable: !1,
                        vss_id: h,
                        kind: R,
                        captionId: u
                    }))
                }
            }
        return c
    }
      , fi7 = function(e, L, c) {
        var I = [], B;
        for (B in e.X.X)
            if (e.X.X.hasOwnProperty(B)) {
                var x = e.X.X[B];
                if (g.mK(x, c || null)) {
                    var S = x.info.captionTrack;
                    S && S.languageCode === L && I.push(x)
                }
            }
        return I.length ? I[0] : null
    }
      , AY7 = function(e, L) {
        if (!g.KM$(e) || e.X != null && g.RwM(L, e.X) && e.X.X.rawcc != null)
            return !1;
        L = !!e.X && e.X.isManifestless && Object.values(e.X.X).some(function(c) {
            return g.mK(c, "386")
        });
        e = !!e.X && !e.X.isManifestless && g.uIx(e.X);
        return L || e
    }
      , FLe = function() {
        gA.call(this)
    }
      , iKe = function(e) {
        var L = bKU.length;
        if (e.byteLength < L)
            return !1;
        e = new Uint8Array(e,0,L);
        for (var c = 0; c < L; c++)
            if (bKU[c] !== e[c])
                return !1;
        return !0
    }
      , GmM = function(e, L, c, I, B, x, S, h, R) {
        switch (S.tagName) {
        case "b":
            h.bold = !0;
            break;
        case "i":
            h.italic = !0;
            break;
        case "u":
            h.underline = !0
        }
        for (var u = 0; u < S.childNodes.length; u++) {
            var t = S.childNodes[u];
            if (t.nodeType === 3)
                t = new GB(L,c,I,B.id,t.nodeValue,x || u > 0,g.qQ(h) ? void 0 : h),
                R.push(t),
                B.X.push(t);
            else {
                var O = {};
                Object.assign(O, h);
                GmM(e, L, c, I, B, !0, t, O, R)
            }
        }
    }
      , gOL = function(e) {
        var L = e.split(":");
        e = 0;
        L = g.f(L);
        for (var c = L.next(); !c.done; c = L.next())
            e = e * 60 + Number(c.value);
        return e * 1E3
    }
      , kmM = function(e, L, c, I) {
        I = Object.assign({
            O2: 0
        }, I);
        return new kp(e,L,c,"_" + Dm++,I)
    }
      , QQ = function(e, L) {
        g.p.call(this);
        this.V = e;
        this.XM = L;
        this.X = null;
        this.K = this.V.AB();
        this.logger = new g.tB("caps")
    }
      , wdJ = function(e, L, c) {
        if (typeof L === "string" || uiM(L))
            return [{
                trackData: L,
                ai: c
            }];
        if (typeof L === "string" && L.substring(0, 6) === "WEBVTT" || typeof L !== "string" && iKe(L))
            return [{
                trackData: L,
                ai: c
            }];
        var I = new DataView(L);
        if (I.byteLength <= 8 || I.getUint32(4) !== 1718909296)
            return [];
        var B = g.nfn(I);
        if (e.K && B) {
            var x = g.PiR(B)
              , S = g.Q0f(B);
            B = B.EC;
            x && B && e.K.r4(B, x, S)
        }
        e = g.qJ(I, 1835295092);
        if (!e || !e.length || !e[0].size)
            return [];
        x = [];
        for (S = 0; S < e.length; S++)
            B = e[S],
            B = new Uint8Array(L,B.dataOffset,B.size - (B.dataOffset - B.offset)),
            B = g.uG(B),
            x.push({
                trackData: B,
                ai: c + S * 1E3
            });
        DTN(I, x, c);
        return x = x.filter(function(h) {
            return !!h.trackData
        })
    }
      , DTN = function(e, L, c) {
        var I = g.xc(e, 0, 1836476516)
          , B = 9E4;
        I && (B = g.o5(I) || 9E4);
        I = 0;
        for (var x = g.qJ(e, 1836019558), S = 0; S < x.length; S++) {
            var h = x[S];
            S < L.length && (h = g.xc(e, h.dataOffset, 1953653094)) && (h = g.xc(e, h.dataOffset, 1952867444)) && (h = g.tN(h) / B * 1E3,
            S === 0 && (I = h),
            L[S].ai = h - I + c || c * S * 1E3)
        }
    }
      , JYL = function(e, L, c) {
        e.X || (e.X = new FLe);
        e = e.X.Z(L, c);
        Math.random() < .01 && g.F7(Error("Deprecated subtitles format in web player: WebVTT"));
        return e
    }
      , VNU = function(e) {
        var L = {};
        if (e = g.mS(e))
            L.lang = e,
            g.ftU.test(e) && (L.Qx = 1);
        return L
    }
      , NDN = function(e) {
        g.Vk.call(this, e);
        var L = this;
        this.V = e;
        this.ye = [];
        this.Gm = {};
        this.He = {};
        this.J = !1;
        this.G = "NONE";
        this.X = this.D = this.pS = this.Pe = this.Sl = null;
        this.Kf = {
            Aa: function() {
                L.Aa()
            },
            Bo: function(x, S, h, R) {
                L.Bo(x, S, h, R)
            }
        };
        this.K = null;
        this.XM = this.V.S();
        this.videoData = this.V.getVideoData();
        this.x9 = this.V.LS();
        this.Z = {
            Kj: {}
        };
        this.j = {
            Kj: {}
        };
        g.uf(this.videoData) ? this.G = "OFFLINE" : AY7(this.videoData, this.V) ? this.G = "SABR_LIVE" : g.uHT(this.videoData, this.V) ? this.G = "LIVE" : this.videoData.captionTracks.length ? this.G = "INNERTUBE" : this.videoData.pj && (this.G = "TTS");
        this.m$ = this.XM.controlsType === "3";
        this.d_ = new QQ(this.V,this.XM);
        this.Ve = new g.zn(this);
        this.T = new g.U({
            U: "div",
            W: "ytp-caption-window-container",
            N: {
                id: "ytp-caption-window-container"
            }
        });
        this.h7 = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 1,
            height: 1
        };
        var c = null
          , I = g.k2("yt-html5-player-modules::subtitlesModuleData");
        I && (c = new g.sm(I));
        this.storage = c;
        var B;
        this.DY = !((B = e.Nw()) == null || !B.KL());
        this.B = Ck7(this);
        this.k9 = !this.B && this.m$ && this.DY && (this.G === "LIVE" || this.G === "SABR_LIVE");
        g.l(this, this.d_);
        this.B ? this.t7 = this.Y9 = null : (this.Y9 = new g.$4(this.qs,void 0,this),
        g.l(this, this.Y9),
        this.t7 = new g.j9(this.XM7,2E3,this),
        g.l(this, this.t7));
        g.l(this, this.Ve);
        g.Uq(this.player, this.T.element, 4);
        g.l(this, this.T);
        this.B || this.Ve.C(e, "resize", this.IA);
        (this.sY = g.nl(this.XM) && !g.h7() && !this.V.isFullscreen() && !this.B && !this.k9) && this.Ve.C(e, "resize", this.a6W);
        this.Ve.C(e, "onPlaybackAudioChange", this.uMe);
        this.Ve.C(e, g.jh("captions"), function(x) {
            L.onCueRangeEnter(x)
        });
        this.Ve.C(e, g.Hq("captions"), function(x) {
            L.onCueRangeExit(x)
        });
        aie(this, s7M() || {});
        this.player.Kb("onCaptionsModuleAvailable")
    }
      , ZKU = function(e) {
        if (e.XM.z6 === 1 || e.videoData.Ls === 1 || g.jI(e.videoData, "yt:cc") === "alwayson")
            return !0;
        if (e.videoData.captionTracks.length)
            var L = e.getAudioTrack().K;
        if (e.XM.z6 === 2) {
            if (g.T3(e.XM))
                var c = mTL(e);
            else if (e.storage)
                try {
                    c = e.storage.get("module-enabled")
                } catch (B) {
                    e.storage.remove("module-enabled")
                }
            else
                c = null;
            if (c != null)
                return !!c
        }
        c = Rje(e.player.getAudioTrack(), g.T3(e.XM));
        var I = g.jI(e.videoData, "yt:cc");
        if (yYJ(e) === void 0) {
            if (c === "CAPTIONS_INITIAL_STATE_ON_RECOMMENDED")
                return I ? I === "on" : !0;
            if (c === "CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED")
                return I === "on"
        } else
            return I === "on";
        return L === "ON" || g.jI(e.videoData, "yt:cc") === "on"
    }
      , dA = function(e, L) {
        if (e.K && (L === void 0 || !L) || !e.videoData.captionTracks.length)
            return !1;
        e = e.getAudioTrack();
        return !!e.X || e.K === "FORCED_ON"
    }
      , yYJ = function(e) {
        var L = void 0
          , c = g.Vu(g.J7(), 65);
        if (g.T3(e.XM) && c != null) {
            if (mTL(e) != null)
                return !1;
            L = !c
        }
        return L
    }
      , EC = function(e, L) {
        if (!e.X)
            return null;
        if (e.D && e.D.G)
            return e.D.G;
        L = pd9(e, L);
        L = g.ua(e.X.K, L);
        var c = null;
        if (ueL(e.XM)) {
            var I = e.V.isInline() ? void 0 : g.iS("yt-player-caption-sticky-language");
            for (var B = [I, e.videoData.captionsLanguagePreference, e.XM.captionsLanguagePreference, g.jI(e.videoData, "yt:cc_default_lang")], x = !1, S = 0; S < B.length; S++) {
                var h = B[S];
                if (h) {
                    x = !0;
                    for (var R = 0; R < L.length; R++)
                        if (g.mS(L[R]) === h)
                            return L[R];
                    for (R = 0; R < L.length; R++)
                        if (g.mS(L[R]).split("-")[0] === h.split("-")[0])
                            return L[R]
                }
            }
            if (x && e.X && (B = e.X.B,
            B.length))
                for (B = g.f(B),
                x = B.next(); !x.done; x = B.next())
                    if (x = x.value,
                    x.languageCode === I) {
                        c = x;
                        break
                    }
        } else
            for (I = [e.videoData.captionsLanguagePreference, e.XM.captionsLanguagePreference, g.jI(e.videoData, "yt:cc_default_lang")],
            B = 0; B < I.length; B++)
                for (x = 0; x < L.length; x++)
                    if (g.mS(L[x]) === I[B])
                        return L[x];
        I = null;
        e.D && e.D.Z && (I = e.D.Z);
        I || (I = L.find(function(u) {
            return u.isDefault
        }) || null);
        I || (I = L[0] || UC(e));
        I && c && g.mS(I).split("-")[0] !== c.languageCode.split("-")[0] && (I = trL(I, c));
        return I
    }
      , UC = function(e) {
        return e.D && e.D.X
    }
      , Xv = function(e) {
        var L = UC(e);
        return !!L && e.K === L
    }
      , $TL = function(e, L) {
        var c = e.V.Nw().IT().textTracks;
        e = e.K.toString();
        for (var I = 0; I < c.length; I++) {
            var B = c[I];
            B.id === e && (L ? B.mode !== "showing" && (B.mode = "showing") : B.mode === "showing" && (B.mode = "disabled"))
        }
    }
      , nj = function(e, L, c) {
        e.loaded && e.unload();
        c != null && (e.J = c,
        e.J && (g.T3(e.XM) ? Kj(e, !!L) : Yp(e, !!L)));
        L !== null || dA(e, !0) || e.S9(L, !!L, e.J ? "m" : "s");
        e.K = L;
        dA(e) && (e.K = UC(e));
        var I;
        jJU(e, (I = e.K) != null ? I : void 0);
        e.load()
    }
      , liU = function(e, L) {
        if (L instanceof kp) {
            var c = e.Gm[L.id];
            c && c.K !== L && (c.dispose(),
            delete e.Gm[L.id],
            c = null);
            c || (c = HKw(e, L)) && (e.Gm[L.id] = c)
        } else
            c = L.windowId,
            e.He[c] || (e.He[c] = []),
            e.He[c].push(L)
    }
      , HKw = function(e, L) {
        var c = PkL(e);
        if (!c)
            return null;
        var I = e.K ? g.mS(e.K) : null;
        I && g.ftU.test(I) && (L.params.Qx = 1);
        var B = e.x9.getPlayerSize();
        I = B.height * e.h7.height;
        B = B.width * e.h7.width;
        e.XM.playerStyle !== "google-live" || e.Z.isDefault || Object.assign(L.params, e.Z);
        switch (L.params.O2 != null ? L.params.O2 : L.X.length > 1 ? 1 : 0) {
        case 1:
            return new pj(L,e.Z,e.j,c.width,c.height,B,I,e.XM.experiments,e.du.bind(e),e.V);
        case 2:
            return new PR(L,e.Z,e.j,c.width,c.height,B,I,e.XM.experiments,e.du.bind(e),e.V);
        default:
            return new Ms(L,e.Z,e.j,c.width,c.height,B,I,e.XM.experiments,e.du.bind(e),e.V)
        }
    }
      , aie = function(e, L, c) {
        c = c === void 0 ? !1 : c;
        var I = e7.Kj;
        e.Z = {};
        Object.assign(e.Z, e7);
        e.Z.Kj = {};
        Object.assign(e.Z.Kj, I);
        e.j = {
            Kj: {}
        };
        var B = L.backgroundOverride ? e.j : e.Z
          , x = L.background || I.background;
        aw.test(x);
        B.Kj.background = x;
        B = L.colorOverride ? e.j : e.Z;
        x = L.color || I.color;
        aw.test(x);
        B.Kj.color = x;
        B = L.windowColorOverride ? e.j : e.Z;
        x = L.windowColor || e7.windowColor;
        aw.test(x);
        B.windowColor = x;
        B = L.backgroundOpacityOverride ? e.j : e.Z;
        x = L.backgroundOpacity;
        x == null && (x = I.backgroundOpacity);
        B.Kj.backgroundOpacity = x;
        B = L.fontSizeIncrementOverride ? e.j : e.Z;
        x = L.fontSizeIncrement;
        x == null && (x = I.fontSizeIncrement);
        B.Kj.fontSizeIncrement = x;
        x = L.fontStyleOverride ? e.j : e.Z;
        B = L.fontStyle;
        B == null && (B = I.bold && I.italic ? 3 : I.bold ? 1 : I.italic ? 2 : 0);
        x = x.Kj;
        switch (B) {
        case 1:
            x.bold = !0;
            delete x.italic;
            break;
        case 2:
            delete x.bold;
            x.italic = !0;
            break;
        case 3:
            x.bold = !0;
            x.italic = !0;
            break;
        default:
            delete x.bold,
            delete x.italic
        }
        B = L.textOpacityOverride ? e.j : e.Z;
        x = L.textOpacity;
        x == null && (x = I.textOpacity);
        B.Kj.textOpacity = x;
        B = L.windowOpacityOverride ? e.j : e.Z;
        x = L.windowOpacity;
        x == null && (x = e7.windowOpacity);
        B.windowOpacity = x;
        B = L.charEdgeStyleOverride ? e.j : e.Z;
        x = L.charEdgeStyle;
        x == null && (x = I.charEdgeStyle);
        B.Kj.charEdgeStyle = x;
        B = L.fontFamilyOverride ? e.j : e.Z;
        x = L.fontFamily;
        x == null && (x = I.fontFamily);
        B.Kj.fontFamily = x;
        e.loaded && e.IA();
        c && g.bS("yt-player-caption-display-settings", L, 2592E3)
    }
      , QJ9 = function(e, L) {
        if (!e.X)
            return {};
        if (L) {
            g.qQ(L) || e.bz(L.vss_id, "m");
            if (e.B || !g.Se(L))
                return;
            if (g.qQ(L)) {
                nj(e, null, !0);
                return
            }
            for (var c, I = g.ua(e.X.K, !0), B = 0; B < I.length; B++) {
                var x = I[B];
                x.languageCode !== L.languageCode || c && (x.languageName !== L.languageName || (x.captionId || "") !== (L.captionId || "") || g.aD(x) !== L.displayName) || (c = L.translationLanguage ? trL(x, L.translationLanguage) : x)
            }
            e.Y6(L.position);
            !c || c === e.K && e.loaded || (L = g.te(),
            I = g.mS(c),
            L.length && I === L[L.length - 1] || (L.push(I),
            g.bS("yt-player-caption-language-preferences", L)),
            ueL(e.XM) && !e.V.isInline() && g.bS("yt-player-caption-sticky-language", I, 2592E3),
            nj(e, c, !0))
        } else
            return e.loaded && e.K && !Xv(e) ? g.Nu(e.K) : {};
        return ""
    }
      , UT9 = function(e, L, c) {
        L && !e.pS ? (L = xTM({
            Qx: 0,
            lang: "de"
        }),
        e.pS = [L, new GB(L.start,L.end - L.start,0,L.id,c != null ? c : "So werden die Untertitel mit der aktuellen Konfiguration aussehen.")],
        e.player.Lb(e.pS)) : !L && e.pS && (dT7(e, e.pS),
        e.pS = null)
    }
      , dT7 = function(e, L) {
        e.player.SX(L);
        L = g.f(L);
        for (var c = L.next(); !c.done; c = L.next())
            g.i7(e.ye, c.value);
        qs(e.Y9)
    }
      , jJU = function(e, L) {
        e.XM.Y("html5_modify_caption_vss_logging") && (e.videoData.YC = L)
    }
      , PkL = function(e) {
        var L = e.x9.getVideoContentRect(!0).height
          , c = e.x9.getVideoContentRect(!0).width;
        if (!L || !c)
            return null;
        L *= e.h7.height;
        c *= e.h7.width;
        return {
            width: c,
            height: L
        }
    }
      , Yp = function(e, L) {
        if (e.storage)
            try {
                e.storage.set("module-enabled", L)
            } catch (c) {}
    }
      , Kj = function(e, L) {
        e.V.isInline() || g.bS("yt-player-sticky-caption", L, 2592E3)
    }
      , mTL = function(e) {
        if (!e.V.isInline())
            return g.iS("yt-player-sticky-caption")
    }
      , Ck7 = function(e) {
        var L, c = !((L = e.V.Nw()) == null || !L.aY());
        return e.m$ && c && e.G !== "LIVE" && e.G !== "SABR_LIVE"
    }
      , pd9 = function(e, L) {
        g.cS(e.videoData) && (L = !0);
        L || (L = e.G === "TTS" ? !1 : e.G === "INNERTUBE" ? !1 : !0);
        return L || e.XM.Y("web_deprecate_always_includes_asr_setting") && g.T3(e.XM) ? !0 : !!g.Vu(g.J7(), 66)
    };
    g.ax.prototype.OL = g.xn(71, function() {
        return !1
    });
    g.ax.prototype.m4 = g.xn(70, function() {});
    g.Nr.prototype.m4 = g.xn(69, function(e, L, c) {
        var I = this;
        this.We();
        L = this.tI(e, L);
        var B = this.CS.S().Y("html5_report_captions_ctmp_qoe")
          , x = (0,
        g.zI)();
        this.Vt();
        hjZ(this, L, {
            format: "RAW",
            onSuccess: function(S) {
                I.X = null;
                if (B) {
                    var h = (S.responseText.length / 1024).toFixed()
                      , R = (0,
                    g.zI)();
                    I.videoData.sW("capresp", {
                        ms: R - x,
                        kb: h
                    })
                }
                c.Bo(S.responseText, e)
            },
            onError: B ? function(S) {
                var h;
                S = (h = S == null ? void 0 : S.status) != null ? h : 0;
                I.videoData.sW("capfail", {
                    status: S
                })
            }
            : void 0,
            withCredentials: !0
        })
    });
    g.yk.prototype.m4 = g.xn(68, function(e, L, c) {
        var I = this;
        this.We();
        L = this.tI(e, L);
        this.Vt();
        this.X = g.W3(L, {
            format: "RAW",
            onSuccess: function(B) {
                I.X = null;
                c.Bo(B.responseText, e)
            },
            withCredentials: !0
        })
    });
    g.Lm.prototype.s7 = g.xn(67, function() {
        for (var e = g.Sf(document, "track", void 0, this.X), L = 0; L < e.length; L++)
            g.s_(e[L])
    });
    g.dZ.prototype.s7 = g.xn(66, function() {
        this.mediaElement.s7()
    });
    g.Lm.prototype.KL = g.xn(65, function() {
        return !(!this.X.textTracks || !this.X.textTracks.addEventListener)
    });
    g.dZ.prototype.KL = g.xn(64, function() {
        return this.mediaElement.KL()
    });
    g.Lm.prototype.aY = g.xn(63, function() {
        return !!this.X.textTracks
    });
    g.dZ.prototype.aY = g.xn(62, function() {
        return this.mediaElement.aY()
    });
    g.Lm.prototype.V4 = g.xn(61, function(e) {
        for (var L = 0; L < e.length; L++)
            this.X.appendChild(e[L])
    });
    g.dZ.prototype.V4 = g.xn(60, function(e) {
        this.mediaElement.V4(e)
    });
    g.M0.prototype.r4 = g.xn(59, function(e, L, c) {
        this.Pw.r4(e, L, c)
    });
    g.Sa.prototype.r4 = g.xn(58, function(e, L, c) {
        this.K.set(e, {
            Ik: L,
            S7: c
        })
    });
    g.rY.prototype.r4 = g.xn(57, function(e, L, c) {
        this.h7.r4(e, L, c)
    });
    g.M0.prototype.qQ = g.xn(56, function(e) {
        return this.Pw.qQ(e)
    });
    g.rY.prototype.qQ = g.xn(55, function(e) {
        var L = 2;
        this.B.has(e) ? L = 0 : g.oSx(this, e) && (L = 1);
        return L
    });
    g.p2.prototype.xY = g.xn(43, function(e) {
        var L = this.app.MU({
            playerType: void 0
        });
        return L ? L.xY(e) : !1
    });
    g.eS.prototype.xY = g.xn(42, function(e) {
        return this.zm.BR.xY(e)
    });
    g.jk.prototype.xY = g.xn(41, function(e) {
        return this.eG().some(function(L) {
            return L.namespace === e
        })
    });
    g.n_.prototype.xY = g.xn(40, function() {
        return !1
    });
    g.p2.prototype.bz = g.xn(38, function(e, L) {
        this.app.Qe().bz(e, L)
    });
    g.eS.prototype.bz = g.xn(37, function(e, L) {
        this.zm.bz(e, L)
    });
    g.h5.prototype.bz = g.xn(36, function(e, L) {
        e = [e, L];
        g.rx(this, g.up(this.provider), "cfi", e)
    });
    g.$V.prototype.bz = g.xn(35, function(e, L) {
        this.qoe && this.qoe.bz(e, L)
    });
    g.uQ.prototype.bz = g.xn(34, function(e, L) {
        this.OY.bz(e, L)
    });
    g.n_.prototype.bz = g.xn(33, function() {});
    g.p2.prototype.S9 = g.xn(32, function(e, L, c) {
        this.app.Qe().S9(e, L, c)
    });
    g.eS.prototype.S9 = g.xn(31, function(e, L, c) {
        this.zm.S9(e, L, c)
    });
    g.h5.prototype.S9 = g.xn(30, function(e, L, c) {
        if (this.Y9 !== e || this.Q5 !== L)
            L = L === "rawcc" ? "" : L,
            c = [e, L, this.Y9, c],
            g.rx(this, g.up(this.provider), "cfs", c),
            this.Y9 = e,
            this.Q5 = L
    });
    g.$V.prototype.S9 = g.xn(29, function(e, L, c) {
        this.qoe && this.qoe.S9(e, L, c)
    });
    g.uQ.prototype.S9 = g.xn(28, function(e, L, c) {
        this.OY.S9(e, L, c)
    });
    g.n_.prototype.S9 = g.xn(27, function() {});
    g.WH.prototype.oe = g.xn(12, function() {
        return this.pS
    });
    g.FH.prototype.oe = g.xn(11, function() {
        return this.Qe().AB()
    });
    g.p2.prototype.AB = g.xn(10, function() {
        return this.app.oe()
    });
    g.eS.prototype.AB = g.xn(9, function() {
        return this.zm.AB()
    });
    g.uQ.prototype.AB = g.xn(8, function() {
        var e;
        return ((e = this.loader) == null ? void 0 : e.oe()) || null
    });
    g.n_.prototype.AB = g.xn(7, function() {
        return null
    });
    g.Qp.prototype.ZQ = g.xn(1, function(e) {
        return (e = this.Pt(e)) ? e.X : 0
    });
    g.fk.prototype.ZQ = g.xn(0, function() {
        return 0
    });
    var W3U = /#(.)(.)(.)/
      , TeL = /^#(?:[0-9a-f]{3}){1,2}$/i
      , bAL = {
        aa: "Afar",
        ab: "Abkhazian",
        ace: "Acehnese",
        ach: "Acoli",
        ada: "Adangme",
        ady: "Adyghe",
        ae: "Avestan",
        aeb: "Tunisian Arabic",
        af: "Afrikaans",
        afh: "Afrihili",
        agq: "Aghem",
        ain: "Ainu",
        ak: "Akan",
        akk: "Akkadian",
        akz: "Alabama",
        ale: "Aleut",
        aln: "Gheg Albanian",
        alt: "Southern Altai",
        am: "Amharic",
        an: "Aragonese",
        ang: "Old English",
        anp: "Angika",
        ar: "Arabic",
        ar_001: "Arabic (world)",
        arc: "Aramaic",
        arn: "Mapuche",
        aro: "Araona",
        arp: "Arapaho",
        arq: "Algerian Arabic",
        ars: "Najdi Arabic",
        arw: "Arawak",
        ary: "Moroccan Arabic",
        arz: "Egyptian Arabic",
        as: "Assamese",
        asa: "Asu",
        ase: "American Sign Language",
        ast: "Asturian",
        av: "Avaric",
        avk: "Kotava",
        awa: "Awadhi",
        ay: "Aymara",
        az: "Azerbaijani",
        az_Cyrl: "Azerbaijani (Cyrillic)",
        az_Latn: "Azerbaijani (Latin)",
        ba: "Bashkir",
        bal: "Baluchi",
        ban: "Balinese",
        bar: "Bavarian",
        bas: "Basaa",
        bax: "Bamun",
        bbc: "Batak Toba",
        bbj: "Ghomala",
        be: "Belarusian",
        bej: "Beja",
        bem: "Bemba",
        bew: "Betawi",
        bez: "Bena",
        bfd: "Bafut",
        bfq: "Badaga",
        bg: "Bulgarian",
        bgc: "Haryanvi",
        bgn: "Western Balochi",
        bho: "Bhojpuri",
        bi: "Bislama",
        bik: "Bikol",
        bin: "Bini",
        bjn: "Banjar",
        bkm: "Kom",
        bla: "Siksik\u00e1",
        blo: "Anii",
        bm: "Bambara",
        bn: "Bangla",
        bo: "Tibetan",
        bpy: "Bishnupriya",
        bqi: "Bakhtiari",
        br: "Breton",
        bra: "Braj",
        brh: "Brahui",
        brx: "Bodo",
        bs: "Bosnian",
        bs_Cyrl: "Bosnian (Cyrillic)",
        bs_Latn: "Bosnian (Latin)",
        bss: "Akoose",
        bua: "Buriat",
        bug: "Buginese",
        bum: "Bulu",
        byn: "Blin",
        byv: "Medumba",
        ca: "Catalan",
        cad: "Caddo",
        car: "Carib",
        cay: "Cayuga",
        cch: "Atsam",
        ccp: "Chakma",
        ce: "Chechen",
        ceb: "Cebuano",
        cgg: "Chiga",
        ch: "Chamorro",
        chb: "Chibcha",
        chg: "Chagatai",
        chk: "Chuukese",
        chm: "Mari",
        chn: "Chinook Jargon",
        cho: "Choctaw",
        chp: "Chipewyan",
        chr: "Cherokee",
        chy: "Cheyenne",
        ckb: "Central Kurdish",
        co: "Corsican",
        cop: "Coptic",
        cps: "Capiznon",
        cr: "Cree",
        crh: "Crimean Tatar",
        cs: "Czech",
        csb: "Kashubian",
        csw: "Swampy Cree",
        cu: "Church Slavic",
        cv: "Chuvash",
        cy: "Welsh",
        da: "Danish",
        dak: "Dakota",
        dar: "Dargwa",
        dav: "Taita",
        de: "German",
        de_AT: "German (Austria)",
        de_CH: "German (Switzerland)",
        del: "Delaware",
        den: "Slave",
        dgr: "Dogrib",
        din: "Dinka",
        dje: "Zarma",
        doi: "Dogri",
        dsb: "Lower Sorbian",
        dua: "Duala",
        dum: "Middle Dutch",
        dv: "Divehi",
        dyo: "Jola-Fonyi",
        dyu: "Dyula",
        dz: "Dzongkha",
        dzg: "Dazaga",
        ebu: "Embu",
        ee: "Ewe",
        efi: "Efik",
        egy: "Ancient Egyptian",
        eka: "Ekajuk",
        el: "Greek",
        elx: "Elamite",
        en: "English",
        en_AU: "English (Australia)",
        en_CA: "English (Canada)",
        en_GB: "English (United Kingdom)",
        en_US: "English (United States)",
        enm: "Middle English",
        eo: "Esperanto",
        es: "Spanish",
        es_419: "Spanish (Latin America)",
        es_ES: "Spanish (Spain)",
        es_MX: "Spanish (Mexico)",
        et: "Estonian",
        eu: "Basque",
        ewo: "Ewondo",
        fa: "Persian",
        fa_AF: "Persian (Afghanistan)",
        fan: "Fang",
        fat: "Fanti",
        ff: "Fula",
        ff_Adlm: "Fula (Adlam)",
        ff_Latn: "Fula (Latin)",
        fi: "Finnish",
        fil: "Filipino",
        fj: "Fijian",
        fo: "Faroese",
        fon: "Fon",
        fr: "French",
        fr_CA: "French (Canada)",
        fr_CH: "French (Switzerland)",
        frm: "Middle French",
        fro: "Old French",
        frr: "Northern Frisian",
        frs: "Eastern Frisian",
        fur: "Friulian",
        fy: "Western Frisian",
        ga: "Irish",
        gaa: "Ga",
        gay: "Gayo",
        gba: "Gbaya",
        gd: "Scottish Gaelic",
        gez: "Geez",
        gil: "Gilbertese",
        gl: "Galician",
        gmh: "Middle High German",
        gn: "Guarani",
        goh: "Old High German",
        gon: "Gondi",
        gor: "Gorontalo",
        got: "Gothic",
        grb: "Grebo",
        grc: "Ancient Greek",
        gsw: "Swiss German",
        gu: "Gujarati",
        guz: "Gusii",
        gv: "Manx",
        gwi: "Gwich\u02bcin",
        ha: "Hausa",
        hai: "Haida",
        haw: "Hawaiian",
        he: "Hebrew",
        hi: "Hindi",
        hi_Latn: "Hindi (Latin)",
        hil: "Hiligaynon",
        hit: "Hittite",
        hmn: "Hmong",
        ho: "Hiri Motu",
        hr: "Croatian",
        hsb: "Upper Sorbian",
        ht: "Haitian Creole",
        hu: "Hungarian",
        hup: "Hupa",
        hy: "Armenian",
        hz: "Herero",
        ia: "Interlingua",
        iba: "Iban",
        ibb: "Ibibio",
        id: "Indonesian",
        ie: "Interlingue",
        ig: "Igbo",
        ii: "Sichuan Yi",
        ik: "Inupiaq",
        ilo: "Iloko",
        "in": "Indonesian",
        inh: "Ingush",
        io: "Ido",
        is: "Icelandic",
        it: "Italian",
        iu: "Inuktitut",
        iw: "Hebrew",
        ja: "Japanese",
        jbo: "Lojban",
        jgo: "Ngomba",
        jmc: "Machame",
        jpr: "Judeo-Persian",
        jrb: "Judeo-Arabic",
        jv: "Javanese",
        ka: "Georgian",
        kaa: "Kara-Kalpak",
        kab: "Kabyle",
        kac: "Kachin",
        kaj: "Jju",
        kam: "Kamba",
        kaw: "Kawi",
        kbd: "Kabardian",
        kbl: "Kanembu",
        kcg: "Tyap",
        kde: "Makonde",
        kea: "Kabuverdianu",
        kfo: "Koro",
        kg: "Kongo",
        kgp: "Kaingang",
        kha: "Khasi",
        kho: "Khotanese",
        khq: "Koyra Chiini",
        ki: "Kikuyu",
        kj: "Kuanyama",
        kk: "Kazakh",
        kk_Cyrl: "Kazakh (Cyrillic)",
        kkj: "Kako",
        kl: "Kalaallisut",
        kln: "Kalenjin",
        km: "Khmer",
        kmb: "Kimbundu",
        kn: "Kannada",
        ko: "Korean",
        kok: "Konkani",
        kok_Deva: "Konkani (Devanagari)",
        kok_Latn: "Konkani (Latin)",
        kos: "Kosraean",
        kpe: "Kpelle",
        kr: "Kanuri",
        krc: "Karachay-Balkar",
        krl: "Karelian",
        kru: "Kurukh",
        ks: "Kashmiri",
        ks_Arab: "Kashmiri (Arabic)",
        ks_Deva: "Kashmiri (Devanagari)",
        ksb: "Shambala",
        ksf: "Bafia",
        ksh: "Colognian",
        ku: "Kurdish",
        kum: "Kumyk",
        kut: "Kutenai",
        kv: "Komi",
        kw: "Cornish",
        kxv: "Kuvi",
        kxv_Deva: "Kuvi (Devanagari)",
        kxv_Latn: "Kuvi (Latin)",
        kxv_Orya: "Kuvi (Odia)",
        kxv_Telu: "Kuvi (Telugu)",
        ky: "Kyrgyz",
        la: "Latin",
        lad: "Ladino",
        lag: "Langi",
        lah: "Western Panjabi",
        lam: "Lamba",
        lb: "Luxembourgish",
        lez: "Lezghian",
        lg: "Ganda",
        li: "Limburgish",
        lij: "Ligurian",
        lkt: "Lakota",
        lmo: "Lombard",
        ln: "Lingala",
        lo: "Lao",
        lol: "Mongo",
        loz: "Lozi",
        lrc: "Northern Luri",
        lt: "Lithuanian",
        lu: "Luba-Katanga",
        lua: "Luba-Lulua",
        lui: "Luiseno",
        lun: "Lunda",
        luo: "Luo",
        lus: "Mizo",
        luy: "Luyia",
        lv: "Latvian",
        mad: "Madurese",
        maf: "Mafa",
        mag: "Magahi",
        mai: "Maithili",
        mak: "Makasar",
        man: "Mandingo",
        mas: "Masai",
        mde: "Maba",
        mdf: "Moksha",
        mdr: "Mandar",
        men: "Mende",
        mer: "Meru",
        mfe: "Morisyen",
        mg: "Malagasy",
        mga: "Middle Irish",
        mgh: "Makhuwa-Meetto",
        mgo: "Meta\u02bc",
        mh: "Marshallese",
        mi: "M\u0101ori",
        mic: "Mi'kmaw",
        min: "Minangkabau",
        mk: "Macedonian",
        ml: "Malayalam",
        mn: "Mongolian",
        mnc: "Manchu",
        mni: "Manipuri",
        mni_Beng: "Manipuri (Bangla)",
        mo: "Romanian",
        moh: "Mohawk",
        mos: "Mossi",
        mr: "Marathi",
        ms: "Malay",
        mt: "Maltese",
        mua: "Mundang",
        mul: "Multiple languages",
        mus: "Muscogee",
        mwl: "Mirandese",
        mwr: "Marwari",
        my: "Burmese",
        mye: "Myene",
        myv: "Erzya",
        mzn: "Mazanderani",
        na: "Nauru",
        nap: "Neapolitan",
        naq: "Nama",
        nb: "Norwegian Bokm\u00e5l",
        nd: "North Ndebele",
        nds: "Low German",
        nds_NL: "Low German (Netherlands)",
        ne: "Nepali",
        "new": "Newari",
        ng: "Ndonga",
        nia: "Nias",
        niu: "Niuean",
        nl: "Dutch",
        nl_BE: "Dutch (Belgium)",
        nmg: "Kwasio",
        nn: "Norwegian Nynorsk",
        nnh: "Ngiemboon",
        no: "Norwegian",
        nog: "Nogai",
        non: "Old Norse",
        nqo: "N\u2019Ko",
        nr: "South Ndebele",
        nso: "Northern Sotho",
        nus: "Nuer",
        nv: "Navajo",
        nwc: "Classical Newari",
        ny: "Nyanja",
        nym: "Nyamwezi",
        nyn: "Nyankole",
        nyo: "Nyoro",
        nzi: "Nzima",
        oc: "Occitan",
        oj: "Ojibwa",
        om: "Oromo",
        or: "Odia",
        os: "Ossetic",
        osa: "Osage",
        ota: "Ottoman Turkish",
        pa: "Punjabi",
        pa_Arab: "Punjabi (Arabic)",
        pa_Guru: "Punjabi (Gurmukhi)",
        pag: "Pangasinan",
        pal: "Pahlavi",
        pam: "Pampanga",
        pap: "Papiamento",
        pau: "Palauan",
        pcm: "Nigerian Pidgin",
        peo: "Old Persian",
        phn: "Phoenician",
        pi: "Pali",
        pl: "Polish",
        pon: "Pohnpeian",
        prg: "Prussian",
        pro: "Old Proven\u00e7al",
        ps: "Pashto",
        pt: "Portuguese",
        pt_BR: "Portuguese (Brazil)",
        pt_PT: "Portuguese (Portugal)",
        qu: "Quechua",
        raj: "Rajasthani",
        rap: "Rapanui",
        rar: "Rarotongan",
        rm: "Romansh",
        rn: "Rundi",
        ro: "Romanian",
        ro_MD: "Romanian (Moldova)",
        rof: "Rombo",
        rom: "Romany",
        ru: "Russian",
        rup: "Aromanian",
        rw: "Kinyarwanda",
        rwk: "Rwa",
        sa: "Sanskrit",
        sad: "Sandawe",
        sah: "Yakut",
        sam: "Samaritan Aramaic",
        saq: "Samburu",
        sas: "Sasak",
        sat: "Santali",
        sat_Olck: "Santali (Ol Chiki)",
        sba: "Ngambay",
        sbp: "Sangu",
        sc: "Sardinian",
        scn: "Sicilian",
        sco: "Scots",
        sd: "Sindhi",
        sd_Arab: "Sindhi (Arabic)",
        sd_Deva: "Sindhi (Devanagari)",
        se: "Northern Sami",
        see: "Seneca",
        seh: "Sena",
        sel: "Selkup",
        ses: "Koyraboro Senni",
        sg: "Sango",
        sga: "Old Irish",
        sh: "Serbo-Croatian",
        shi: "Tachelhit",
        shi_Latn: "Tachelhit (Latin)",
        shi_Tfng: "Tachelhit (Tifinagh)",
        shn: "Shan",
        shu: "Chadian Arabic",
        si: "Sinhala",
        sid: "Sidamo",
        sk: "Slovak",
        sl: "Slovenian",
        sm: "Samoan",
        sma: "Southern Sami",
        smj: "Lule Sami",
        smn: "Inari Sami",
        sms: "Skolt Sami",
        sn: "Shona",
        snk: "Soninke",
        so: "Somali",
        sog: "Sogdien",
        sq: "Albanian",
        sr: "Serbian",
        sr_Cyrl: "Serbian (Cyrillic)",
        sr_Latn: "Serbian (Latin)",
        srn: "Sranan Tongo",
        srr: "Serer",
        ss: "Swati",
        ssy: "Saho",
        st: "Southern Sotho",
        su: "Sundanese",
        su_Latn: "Sundanese (Latin)",
        suk: "Sukuma",
        sus: "Susu",
        sux: "Sumerian",
        sv: "Swedish",
        sw: "Swahili",
        sw_CD: "Swahili (Congo - Kinshasa)",
        swb: "Comorian",
        syc: "Classical Syriac",
        syr: "Syriac",
        szl: "Silesian",
        ta: "Tamil",
        te: "Telugu",
        tem: "Timne",
        teo: "Teso",
        ter: "Tereno",
        tet: "Tetum",
        tg: "Tajik",
        th: "Thai",
        ti: "Tigrinya",
        tig: "Tigre",
        tiv: "Tiv",
        tk: "Turkmen",
        tkl: "Tokelau",
        tl: "Tagalog",
        tlh: "Klingon",
        tli: "Tlingit",
        tmh: "Tamashek",
        tn: "Tswana",
        to: "Tongan",
        tog: "Nyasa Tonga",
        tok: "Toki Pona",
        tpi: "Tok Pisin",
        tr: "Turkish",
        trv: "Taroko",
        ts: "Tsonga",
        tsi: "Tsimshian",
        tt: "Tatar",
        tum: "Tumbuka",
        tvl: "Tuvalu",
        tw: "Twi",
        twq: "Tasawaq",
        ty: "Tahitian",
        tyv: "Tuvinian",
        tzm: "Central Atlas Tamazight",
        udm: "Udmurt",
        ug: "Uyghur",
        uga: "Ugaritic",
        uk: "Ukrainian",
        umb: "Umbundu",
        ur: "Urdu",
        uz: "Uzbek",
        uz_Arab: "Uzbek (Arabic)",
        uz_Cyrl: "Uzbek (Cyrillic)",
        uz_Latn: "Uzbek (Latin)",
        vai: "Vai",
        vai_Latn: "Vai (Latin)",
        vai_Vaii: "Vai (Vai)",
        ve: "Venda",
        vec: "Venetian",
        vi: "Vietnamese",
        vmw: "Makhuwa",
        vo: "Volap\u00fck",
        vot: "Votic",
        vun: "Vunjo",
        wa: "Walloon",
        wae: "Walser",
        wal: "Wolaytta",
        war: "Waray",
        was: "Washo",
        wo: "Wolof",
        xal: "Kalmyk",
        xh: "Xhosa",
        xnr: "Kangri",
        xog: "Soga",
        yao: "Yao",
        yap: "Yapese",
        yav: "Yangben",
        ybb: "Yemba",
        yi: "Yiddish",
        yo: "Yoruba",
        yrl: "Nheengatu",
        yue: "Cantonese",
        yue_Hans: "Cantonese (Simplified)",
        yue_Hant: "Cantonese (Traditional)",
        za: "Zhuang",
        zap: "Zapotec",
        zbl: "Blissymbols",
        zen: "Zenaga",
        zgh: "Standard Moroccan Tamazight",
        zh: "Chinese",
        zh_Hans: "Chinese (Simplified)",
        zh_Hant: "Chinese (Traditional)",
        zh_TW: "Chinese (Taiwan)",
        zu: "Zulu",
        zun: "Zuni",
        zxx: "No linguistic content",
        zza: "Zaza"
    };
    TB.prototype.contains = function(e) {
        e = g.l7(this.segments, e);
        return e >= 0 || e < 0 && (-e - 1) % 2 === 1
    }
    ;
    TB.prototype.length = function() {
        return this.segments.length / 2
    }
    ;
    g.z(f2M, g.p);
    g.M = f2M.prototype;
    g.M.KS = function() {
        g.p.prototype.KS.call(this);
        this.Z && this.Z.cancel()
    }
    ;
    g.M.KC = function() {
        this.seekTo(this.player.getCurrentTime())
    }
    ;
    g.M.seekTo = function(e) {
        e -= this.player.FF();
        var L = this.X;
        this.X = g.zL(this.pS.yE(e).bd);
        L !== this.X && this.D && this.D()
    }
    ;
    g.M.reset = function() {
        this.G = new TB;
        this.j = -1;
        this.Z && (this.Z.cancel(),
        this.Z = null)
    }
    ;
    g.M.k7 = function() {
        this.We();
        var e;
        if (e = this.X != null)
            e = this.X,
            e = e.X.nw(e);
        if (e && !this.Z && !(this.X && this.X.startTime - this.player.getCurrentTime() > 30)) {
            e = this.X;
            e = e.X.Ar(e);
            var L = e.bd[0], c;
            if ((c = this.player.getVideoData()) == null ? 0 : c.enableServerStitchedDai)
                if (c = this.player.AB()) {
                    var I = L.X.info.id
                      , B = L.ud
                      , x = e.bd[0].G;
                    if (this.policy.ye) {
                        if (c = c.qF(x, B, I, 3))
                            e.G = c
                    } else if (I = c.Ca(x, B, I, 3))
                        if (c = c.qQ(B),
                        c === 0)
                            I && (e.X = new g.yp(I));
                        else if (c === 2) {
                            this.T.start();
                            AaN(this) && this.seekTo(this.player.getCurrentTime());
                            return
                        }
                }
            L.X.index.nX(L.ud) ? (this.G.contains(e.bd[0].ud) || F3L(this, e),
            this.X = g.zL(e.bd)) : AaN(this) && this.seekTo(this.player.getCurrentTime())
        }
        this.T.start()
    }
    ;
    g.z(WR, g.ax);
    g.M = WR.prototype;
    g.M.m4 = function(e, L, c) {
        var I = this;
        this.Vt();
        L = GJg(this, e.getId());
        L || (L = e.languageCode,
        L = this.X.isManifestless ? gsN(this, L, "386") : gsN(this, L));
        if (L) {
            var B = (L.index.ZQ(L.index.JB()) - L.index.getStartTime(L.index.JB())) * 1E3
              , x = this.V.S()
              , S = new g.Jbn(x)
              , h = function() {
                I.Z && I.Z.reset();
                I.j = !0
            };
            x.Y("html5_keep_caption_data_after_seek") && (h = null);
            this.Z = new f2M(S,this.V,L,function(R, u) {
                c.Bo(R, e, u, B)
            }
            ,this.T || g.Cn(L.info),h)
        }
    }
    ;
    g.M.OL = function() {
        var e = this.j;
        this.j = !1;
        return e
    }
    ;
    g.M.Gl = function(e) {
        var L = this.V.S().Y("html5_fallback_if_rawcc_missing");
        var c = this.X.X.rawcc != null;
        if (!this.T || !c && L)
            L = this.X.isManifestless ? iA9(this, "386") : iA9(this);
        else {
            if (!c) {
                this.logger.X(386248249, "rawcc used but unavailable");
                return
            }
            L = [new g.C8({
                id: "rawcc",
                languageCode: "rawcc",
                languageName: "CC1",
                is_servable: !0,
                is_default: !0,
                is_translateable: !1,
                vss_id: ".en"
            }), new g.C8({
                id: "rawcc",
                languageCode: "rawcc",
                languageName: "CC3",
                is_servable: !0,
                is_default: !0,
                is_translateable: !1,
                vss_id: ".en"
            })]
        }
        L = g.f(L);
        for (c = L.next(); !c.done; c = L.next())
            g.Cm(this.K, c.value);
        e.Aa()
    }
    ;
    g.M.Vt = function() {
        this.Z && (this.Z.dispose(),
        this.Z = null)
    }
    ;
    g.M.tI = function() {
        return ""
    }
    ;
    g.M.K$ = function() {
        this.Z && (this.Z.reset(),
        this.V.RU("captions"))
    }
    ;
    var aw = /^#(?:[0-9a-f]{3}){1,2}$/i;
    var wtL = ["left", "right", "center", "justify"];
    g.z(Ms, g.U);
    g.M = Ms.prototype;
    g.M.Ws = function(e, L) {
        this.m$ = e;
        this.d_ = L;
        var c = g.nU(this.element, this.element.parentElement);
        this.Sl = e - c.x;
        this.x9 = L - c.y
    }
    ;
    g.M.yf = function(e, L) {
        if (e !== this.m$ || L !== this.d_) {
            g.Ks(this.element, "ytp-dragging") || g.Y4(this.element, "ytp-dragging");
            var c = g.LH(this.element);
            e = e - this.Sl - .02 * this.RI;
            var I = L - this.x9 - .02 * this.Bw
              , B = (e + c.width / 2) / this.maxWidth * 3;
            B = Math.floor(g.j5(B, 0, 2));
            var x = (I + c.height / 2) / this.maxHeight * 3;
            x = Math.floor(g.j5(x, 0, 2));
            L = B + x * 3;
            e = (e + B / 2 * c.width) / this.maxWidth;
            e = g.j5(e, 0, 1) * 100;
            c = (I + x / 2 * c.height) / this.maxHeight;
            c = g.j5(c, 0, 1) * 100;
            this.K.params.jF = L;
            this.K.params.I2 = c;
            this.K.params.Me = e;
            this.K.params.isDefault = !1;
            this.X.jF = L;
            this.X.I2 = c;
            this.X.Me = e;
            this.X.isDefault = !1;
            this.h7.jF = L;
            this.h7.I2 = c;
            this.h7.Me = e;
            this.h7.isDefault = !1;
            this.wj()
        }
    }
    ;
    g.M.Tt = function() {
        g.eZ(this.element, "ytp-dragging")
    }
    ;
    g.M.wj = function() {
        this.WB(this.T)
    }
    ;
    g.M.WB = function(e) {
        var L = this.DY ? 0 : Math.min(this.MH(), this.maxWidth)
          , c = this.o_()
          , I = this.DY;
        if (I) {
            var B = getComputedStyle(this.G.parentNode);
            B = zB(B.borderLeftWidth) + zB(B.borderRightWidth) + zB(B.paddingLeft) + zB(B.paddingRight)
        } else
            B = 0;
        var x = B;
        B = "";
        this.K.params.Qx === 3 && (B = "rotate(180deg)");
        var S = I ? "calc(96% - " + x + "px)" : "96%";
        g.l3(this.element, {
            top: 0,
            left: 0,
            right: "",
            bottom: "",
            width: L ? L + "px" : "",
            height: c ? c + "px" : "",
            "max-width": S,
            "max-height": S,
            margin: "",
            transform: ""
        });
        this.lk(e);
        B = {
            transform: B,
            top: "",
            left: "",
            width: L ? L + "px" : "",
            height: c ? c + "px" : "",
            "max-width": "",
            "max-height": ""
        };
        var h = this.X.Me * .96 + 2;
        S = this.X.jF;
        switch (S) {
        case 0:
        case 3:
        case 6:
            (I = this.X.Kj.fontSizeIncrement) && I > 0 && this.X.Qx !== 2 && this.X.Qx !== 3 && (h = Math.max(h / (1 + I * 2), 2));
            B.left = h + "%";
            break;
        case 1:
        case 4:
        case 7:
            B.left = h + "%";
            h = this.G.offsetWidth;
            L || h ? (L = L || h + 1,
            B.width = L + "px",
            B["margin-left"] = I ? L / -2 - x / 2 + "px" : L / -2 + "px") : B.transform += " translateX(-50%)";
            break;
        case 2:
        case 5:
        case 8:
            B.right = 100 - h + "%"
        }
        I = this.X.I2 * .96 + 2;
        switch (S) {
        case 0:
        case 1:
        case 2:
            B.top = I + "%";
            break;
        case 3:
        case 4:
        case 5:
            B.top = I + "%";
            (c = c || this.element.clientHeight) ? (B.height = c + "px",
            B["margin-top"] = c / -2 + "px") : B.transform += " translateY(-50%)";
            break;
        case 6:
        case 7:
        case 8:
            B.bottom = 100 - I + "%"
        }
        g.l3(this.element, B);
        if (this.j) {
            c = this.G.offsetHeight;
            I = 1;
            for (L = 0; L < e.length; L++)
                B = e[L],
                typeof B.text === "string" && (I += B.text.split("\n").length - 1,
                B.append || L === 0 || I++);
            c /= I;
            this.j.style.height = c + "px";
            this.j.style.width = c + "px";
            this.element.style.paddingLeft = c + 5 + "px";
            this.element.style.paddingRight = c + 5 + "px";
            e = Number(this.element.style.marginLeft.replace("px", "")) - c - 5;
            c = Number(this.element.style.marginRight.replace("px", "")) - c - 5;
            this.element.style.marginLeft = e + "px";
            this.element.style.marginRight = c + "px"
        }
    }
    ;
    g.M.lk = function(e) {
        var L;
        for (L = 0; L < e.length && e[L] === this.T[L]; L++)
            ;
        if (this.Ve || this.T.length > L)
            L = 0,
            this.Ve = !1,
            this.T = [],
            this.J = this.Y9 = this.ye = null,
            g.Ml(this.G);
        for (; L < e.length; L++)
            NeN(this, e[L])
    }
    ;
    g.M.MH = function() {
        return 0
    }
    ;
    g.M.o_ = function() {
        return 0
    }
    ;
    g.M.toString = function() {
        return g.U.prototype.toString.call(this)
    }
    ;
    yaM.prototype.clear = function() {
        this.Z = this.time = this.mode = 0;
        this.X = [];
        this.reset()
    }
    ;
    yaM.prototype.reset = function() {
        this.mode = 0;
        this.G.reset(0);
        this.B.reset(1)
    }
    ;
    var ZAh = [128, 1, 2, 131, 4, 133, 134, 7, 8, 137, 138, 11, 140, 13, 14, 143, 16, 145, 146, 19, 148, 21, 22, 151, 152, 25, 26, 155, 28, 157, 158, 31, 32, 161, 162, 35, 164, 37, 38, 167, 168, 41, 42, 171, 44, 173, 174, 47, 176, 49, 50, 179, 52, 181, 182, 55, 56, 185, 186, 59, 188, 61, 62, 191, 64, 193, 194, 67, 196, 69, 70, 199, 200, 73, 74, 203, 76, 205, 206, 79, 208, 81, 82, 211, 84, 213, 214, 87, 88, 217, 218, 91, 220, 93, 94, 223, 224, 97, 98, 227, 100, 229, 230, 103, 104, 233, 234, 107, 236, 109, 110, 239, 112, 241, 242, 115, 244, 117, 118, 247, 248, 121, 122, 251, 124, 253, 254, 127, 0, 129, 130, 3, 132, 5, 6, 135, 136, 9, 10, 139, 12, 141, 142, 15, 144, 17, 18, 147, 20, 149, 150, 23, 24, 153, 154, 27, 156, 29, 30, 159, 160, 33, 34, 163, 36, 165, 166, 39, 40, 169, 170, 43, 172, 45, 46, 175, 48, 177, 178, 51, 180, 53, 54, 183, 184, 57, 58, 187, 60, 189, 190, 63, 192, 65, 66, 195, 68, 197, 198, 71, 72, 201, 202, 75, 204, 77, 78, 207, 80, 209, 210, 83, 212, 85, 86, 215, 216, 89, 90, 219, 92, 221, 222, 95, 96, 225, 226, 99, 228, 101, 102, 231, 232, 105, 106, 235, 108, 237, 238, 111, 240, 113, 114, 243, 116, 245, 246, 119, 120, 249, 250, 123, 252, 125, 126, 255];
    sC.prototype.set = function(e) {
        this.type = e
    }
    ;
    sC.prototype.get = function() {
        return this.type
    }
    ;
    vR.prototype.clear = function() {
        this.state = 0
    }
    ;
    vR.prototype.update = function() {
        this.state = this.state === 2 ? 1 : 0
    }
    ;
    vR.prototype.Hd = function() {
        return this.state !== 0
    }
    ;
    vR.prototype.matches = function(e, L) {
        return this.Hd() && e === this.NE && L === this.Ex
    }
    ;
    l2M.prototype.reset = function() {
        this.timestamp = this.X = 0
    }
    ;
    fj.prototype.updateTime = function(e) {
        for (var L = 1; L <= 15; ++L)
            for (var c = 1; c <= 32; ++c)
                this.Z[L][c].timestamp = e
    }
    ;
    fj.prototype.debugString = function() {
        for (var e = "\n", L = 1; L <= 15; ++L) {
            for (var c = 1; c <= 32; ++c) {
                var I = this.Z[L][c];
                e = I.X === 0 ? e + "_" : e + String.fromCharCode(I.X)
            }
            e += "\n"
        }
        return e
    }
    ;
    fj.prototype.reset = function(e) {
        for (var L = 0; L <= 15; L++)
            for (var c = 0; c <= 32; c++)
                this.Z[L][c].reset();
        this.G = e;
        this.X = 0;
        this.K = this.row = 1
    }
    ;
    var P6N = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 225, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 233, 93, 237, 243, 250, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 231, 247, 209, 241, 9632]
      , Q7N = [174, 176, 189, 191, 8482, 162, 163, 9834, 224, 32, 232, 226, 234, 238, 244, 251]
      , d4h = [193, 201, 211, 218, 220, 252, 8216, 161, 42, 39, 9473, 169, 8480, 183, 8220, 8221, 192, 194, 199, 200, 202, 203, 235, 206, 207, 239, 212, 217, 249, 219, 171, 187]
      , U47 = [195, 227, 205, 204, 236, 210, 242, 213, 245, 123, 125, 92, 94, 95, 124, 126, 196, 228, 214, 246, 223, 165, 164, 9475, 197, 229, 216, 248, 9487, 9491, 9495, 9499];
    YrM.prototype.reset = function(e, L) {
        this.B = L;
        this.style.set(2);
        this.K = this.j;
        this.G = this.T;
        this.X = this.K;
        var c = (e << 2) + (L << 1);
        this.j.reset(c);
        this.T.reset(c);
        this.text.reset((e << 2) + (L << 1) + 1)
    }
    ;
    m4U.prototype.reset = function(e) {
        this.B = e;
        this.K.clear();
        this.G = this.Z;
        this.Z.reset(e, 0);
        this.j.reset(e, 1)
    }
    ;
    cYg.prototype.G = function() {}
    ;
    g.z(GB, g.pC);
    GB.prototype.toString = function() {
        return g.pC.prototype.toString.call(this)
    }
    ;
    g.z(gA, g.p);
    gA.prototype.reset = function() {}
    ;
    g.z(kp, g.pC);
    kp.prototype.toString = function() {
        return g.pC.prototype.toString.call(this)
    }
    ;
    var Dm = 0;
    g.z(wA, gA);
    wA.prototype.reset = function() {
        this.T = {};
        this.K = this.X = null;
        this.j = !0
    }
    ;
    wA.prototype.Z = function(e, L) {
        e = e.firstChild;
        e.getAttribute("format");
        L = L || 0;
        Number.isFinite(L);
        e = Array.from(e.childNodes);
        e = g.f(e);
        for (var c = e.next(); !c.done; c = e.next())
            if (c = c.value,
            c.nodeType === 1)
                switch (c.tagName) {
                case "head":
                    var I = c;
                    break;
                case "body":
                    var B = c
                }
        if (I)
            for (I = Array.from(I.childNodes),
            I = g.f(I),
            e = I.next(); !e.done; e = I.next())
                if (e = e.value,
                e.nodeType === 1)
                    switch (e.tagName) {
                    case "pen":
                        c = e.getAttribute("id");
                        var x = this.pens
                          , S = {}
                          , h = e.getAttribute("p");
                        h && Object.assign(S, this.pens[h]);
                        h = VQ(e, "b");
                        h != null && (S.bold = h);
                        h = VQ(e, "i");
                        h != null && (S.italic = h);
                        h = VQ(e, "u");
                        h != null && (S.underline = h);
                        h = Cj(e, "et");
                        h != null && (S.charEdgeStyle = h);
                        h = Cj(e, "of");
                        h != null && (S.offset = h);
                        h = Ns(e, "bc");
                        h != null && (S.background = h);
                        h = Ns(e, "ec");
                        h != null && (S.KT = h);
                        h = Ns(e, "fc");
                        h != null && (S.color = h);
                        h = Cj(e, "fs");
                        h != null && h !== 0 && (S.fontFamily = h);
                        h = JV(e, "sz");
                        h !== void 0 && (S.fontSizeIncrement = h / 100 - 1);
                        h = JV(e, "bo");
                        h !== void 0 && (S.backgroundOpacity = h / 255);
                        h = JV(e, "fo");
                        h !== void 0 && (S.textOpacity = h / 255);
                        h = Cj(e, "rb");
                        h != null && h !== 10 && h !== 0 && (S.UK = h > 10 ? h - 1 : h);
                        e = Cj(e, "hg");
                        e != null && (S.W8 = e);
                        x[c] = S;
                        break;
                    case "ws":
                        c = e.getAttribute("id");
                        this.D[c] = oO7(this, e);
                        break;
                    case "wp":
                        c = e.getAttribute("id"),
                        this.J[c] = SDN(this, e)
                    }
        if (B) {
            I = [];
            B = Array.from(B.childNodes);
            B = g.f(B);
            for (e = B.next(); !e.done; e = B.next())
                if (e = e.value,
                e.nodeType === 1)
                    switch (e.tagName) {
                    case "w":
                        this.X = rYM(this, e, L, !1);
                        (e = this.T[this.X.id]) && e.end > this.X.start && (e.end = this.X.start);
                        this.T[this.X.id] = this.X;
                        I.push(this.X);
                        break;
                    case "p":
                        var R = e;
                        h = L;
                        c = [];
                        x = R.getAttribute("w") || this.B;
                        S = !!VQ(R, "a");
                        h = (JV(R, "t") || 0) + h;
                        var u = JV(R, "d") || 5E3;
                        S || (!this.j && this.K && this.K.windowId === x && this.K.end > h && (this.K.end = h),
                        this.K && this.K.text === "\n" && (this.K.text = ""));
                        var t = S ? 6 : 5
                          , O = R.getAttribute("p");
                        O = O ? this.pens[O] : null;
                        var q = Array.from(R.childNodes);
                        q.length && (this.j = R.getAttribute("d") != null);
                        for (R = 0; R < q.length; R++) {
                            var T = q[R]
                              , W = void 0;
                            R > 0 && (S = !0);
                            var A = void 0;
                            T.nodeType === 1 && (A = T);
                            if (A && A.tagName === "s") {
                                if ((T = (T = A.getAttribute("p")) ? this.pens[T] : null) && T.UK && (T.UK === 1 ? (T = q.slice(R, R + 4),
                                T.length === 4 && (W = BDM(h, u, x, S, t, T, this.pens),
                                R += 3)) : W = BDM(h, u, x, S, t, [A], this.pens)),
                                !W) {
                                    var b = A;
                                    W = h;
                                    A = u;
                                    T = x;
                                    var J = S
                                      , w = t
                                      , C = b.textContent ? b.textContent : ""
                                      , y = b.getAttribute("p");
                                    y = y ? this.pens[y] : null;
                                    b = JV(b, "t") || 0;
                                    W = new GB(W + b,A - b,w,T,C,J,y)
                                }
                            } else
                                W = new GB(h,u,t,x,T.textContent || "",S,O);
                            c.push(W);
                            this.K = W
                        }
                        if (c.length > 0)
                            for (c[0].windowId === this.B && (this.X = rYM(this, e, L, !0),
                            I.push(this.X)),
                            e = g.f(c),
                            c = e.next(); !c.done; c = e.next())
                                c = c.value,
                                c.windowId = this.X.id,
                                this.X.X.push(c),
                                I.push(c)
                    }
            L = I
        } else
            L = [];
        return L
    }
    ;
    var EOh = new Map([[9, 1], [10, 1], [11, 2], [12, 3], [13, 4], [14, 5]]);
    g.z(mh, gA);
    mh.prototype.reset = function() {
        this.K.clear()
    }
    ;
    mh.prototype.Z = function(e, L) {
        var c = JSON.parse(e);
        if (!c)
            return [];
        if (c.pens) {
            e = 0;
            for (var I = g.f(c.pens), B = I.next(); !B.done; B = I.next()) {
                B = B.value;
                var x = {}
                  , S = B.pParentId;
                S && Object.assign(x, this.X.get(S));
                B.bAttr && (x.bold = !0);
                B.iAttr && (x.italic = !0);
                B.uAttr && (x.underline = !0);
                S = B.ofOffset;
                S != null && (x.offset = S);
                B.szPenSize !== void 0 && (x.fontSizeIncrement = B.szPenSize / 100 - 1);
                S = B.etEdgeType;
                S != null && (x.charEdgeStyle = S);
                B.ecEdgeColor !== void 0 && (x.KT = yQ(B.ecEdgeColor));
                S = B.fsFontStyle;
                S != null && S !== 0 && (x.fontFamily = S);
                B.fcForeColor !== void 0 && (x.color = yQ(B.fcForeColor));
                B.foForeAlpha !== void 0 && (x.textOpacity = B.foForeAlpha / 255);
                B.bcBackColor !== void 0 && (x.background = yQ(B.bcBackColor));
                B.boBackAlpha !== void 0 && (x.backgroundOpacity = B.boBackAlpha / 255);
                (S = B.rbRuby) && S !== 10 && (x.UK = S > 10 ? S - 1 : S,
                x.textEmphasis = EOh.get(x.UK));
                B.hgHorizGroup && (x.W8 = B.hgHorizGroup);
                this.X.set(e++, x)
            }
        }
        if (c.wsWinStyles)
            for (e = 0,
            I = g.f(c.wsWinStyles),
            B = I.next(); !B.done; B = I.next())
                B = B.value,
                x = {},
                (S = B.wsParentId) ? Object.assign(x, this.B.get(S)) : Object.assign(x, this.j),
                B.mhModeHint !== void 0 && (x.O2 = B.mhModeHint),
                B.juJustifCode !== void 0 && (x.textAlign = B.juJustifCode),
                B.pdPrintDir !== void 0 && (x.Qx = B.pdPrintDir),
                B.sdScrollDir !== void 0 && (x.EM = B.sdScrollDir),
                B.wfcWinFillColor !== void 0 && (x.windowColor = yQ(B.wfcWinFillColor)),
                B.wfoWinFillAlpha !== void 0 && (x.windowOpacity = B.wfoWinFillAlpha / 255),
                this.B.set(e++, x);
        if (c.wpWinPositions)
            for (e = 0,
            I = g.f(c.wpWinPositions),
            B = I.next(); !B.done; B = I.next())
                B = B.value,
                x = {},
                (S = B.wpParentId) && Object.assign(x, this.G.get(S)),
                B.ahHorPos !== void 0 && (x.Me = B.ahHorPos),
                B.apPoint !== void 0 && (x.jF = B.apPoint),
                B.avVerPos !== void 0 && (x.I2 = B.avVerPos),
                B.ccCols !== void 0 && (x.X$ = B.ccCols),
                B.rcRows !== void 0 && (x.VX = B.rcRows),
                this.G.set(e++, x);
        if (c.events) {
            e = [];
            c = g.f(c.events);
            for (I = c.next(); !I.done; I = c.next()) {
                var h = I.value;
                B = (h.tStartMs || 0) + L;
                x = h.dDurationMs || 0;
                if (h.id)
                    S = String(h.id),
                    I = hlw(this, h, B, x, S),
                    e.push(I),
                    this.K.set(S, I);
                else {
                    h.wWinId ? S = h.wWinId.toString() : (S = "_" + Dm++,
                    I = hlw(this, h, B, x, S),
                    e.push(I),
                    this.K.set(S, I));
                    I = e;
                    var R = h;
                    x === 0 && (x = 5E3);
                    h = this.K.get(S);
                    var u = !!R.aAppend
                      , t = u ? 6 : 5
                      , O = R.segs
                      , q = null;
                    R.pPenId && (q = this.X.get(R.pPenId));
                    for (R = 0; R < O.length; R++) {
                        var T = O[R]
                          , W = T.utf8;
                        if (W) {
                            var A = T.tOffsetMs || 0
                              , b = null;
                            T.pPenId && (b = this.X.get(T.pPenId));
                            if ((h.params.O2 != null ? h.params.O2 : h.X.length > 1 ? 1 : 0) === 2 && u && W === "\n")
                                continue;
                            T = null;
                            var J = [], w;
                            if (w = b && b.UK === 1) {
                                w = O;
                                var C = R;
                                if (C + 3 >= w.length || !w[C + 1].pPenId || !w[C + 2].pPenId || !w[C + 3].pPenId)
                                    w = !1;
                                else {
                                    var y = w[C + 1].pPenId;
                                    (y = this.X.get(y)) && y.UK && y.UK === 2 ? (y = w[C + 2].pPenId,
                                    y = this.X.get(y),
                                    !y || !y.UK || y.UK < 3 ? w = !1 : (y = w[C + 3].pPenId,
                                    w = (y = this.X.get(y)) && y.UK && y.UK === 2 ? !0 : !1)) : w = !1
                                }
                            }
                            if (w)
                                A = O[R + 1].utf8,
                                T = O[R + 3].utf8,
                                w = O[R + 2].utf8,
                                C = this.X.get(O[R + 2].pPenId),
                                W = IiL(W, A, w, T, C),
                                T = new GB(B,x,t,S,W,u,b),
                                R += 3;
                            else {
                                if (W.indexOf("<") > -1) {
                                    var P = void 0;
                                    J = b;
                                    w = q;
                                    C = B;
                                    y = x;
                                    var ev = A
                                      , X = t
                                      , oH = u
                                      , rc = []
                                      , Sv = g.I_("<html>" + W + "</html>");
                                    if (!Sv.getElementsByTagName("parsererror").length && ((P = Sv.firstChild) == null ? 0 : P.childNodes.length))
                                        for (P = g.f(Sv.firstChild.childNodes),
                                        Sv = P.next(); !Sv.done; Sv = P.next()) {
                                            Sv = Sv.value;
                                            var tJ = void 0
                                              , cM = void 0
                                              , JJ = (cM = (tJ = Sv.textContent) == null ? void 0 : tJ.replace(/\n/g, "")) != null ? cM : "";
                                            if (Sv.nodeType !== 3 || JJ && JJ.match(/^ *$/) == null) {
                                                tJ = {};
                                                Object.assign(tJ, J || w);
                                                cM = void 0;
                                                switch ((cM = Sv) == null ? void 0 : cM.tagName) {
                                                case "b":
                                                    tJ.bold = !0;
                                                    break;
                                                case "i":
                                                    tJ.italic = !0;
                                                    break;
                                                case "u":
                                                    tJ.underline = !0
                                                }
                                                rc.push(new GB(C + ev,y - ev,X,h.id,JJ,oH,tJ))
                                            }
                                        }
                                    J = rc
                                }
                                J.length || (J = [new GB(B + A,x - A,t,h.id,W,u,b || q)])
                            }
                            if (J.length)
                                for (u = g.f(J),
                                b = u.next(); !b.done; b = u.next())
                                    b = b.value,
                                    I.push(b),
                                    h.X.push(b);
                            else
                                T && (I.push(T),
                                h.X.push(T))
                        }
                        u = !0
                    }
                }
            }
            L = e
        } else
            L = [];
        return L
    }
    ;
    g.z(Zm, g.ax);
    Zm.prototype.m4 = function(e, L, c) {
        qr9(this.videoData.videoId, e.vssId, c.Bo)
    }
    ;
    Zm.prototype.Gl = function(e) {
        if (this.audioTrack)
            for (var L = g.f(this.audioTrack.captionTracks), c = L.next(); !c.done; c = L.next())
                g.Cm(this.K, c.value);
        e.Aa()
    }
    ;
    g.z(pj, Ms);
    pj.prototype.lk = function(e) {
        var L = this.K.X;
        Ms.prototype.lk.call(this, e);
        for (e = e.length; e < L.length; e++) {
            var c = L[e];
            if (x && c.X === B)
                var I = x;
            else {
                I = {};
                Object.assign(I, c.X);
                Object.assign(I, XdN);
                var B = c.X;
                var x = I
            }
            NeN(this, c, I)
        }
    }
    ;
    var XdN = {
        QU: !0
    };
    g.z($p, cYg);
    $p.prototype.G = function(e, L, c, I, B) {
        if (c < I) {
            var x = "_" + Dm++;
            c = c / 1E3 - this.j;
            I = I / 1E3 - this.j;
            e = new kp(c,I - c,5,x,{
                textAlign: 0,
                jF: 0,
                Me: L * 2.5,
                I2: e * 5.33
            });
            B = new GB(c,I - c,5,x,B);
            this.K.push(e);
            this.K.push(B)
        }
    }
    ;
    g.z(lO, gA);
    lO.prototype.Z = function(e) {
        e = new $p(e,e.byteLength,this.K);
        if (Rlw(e)) {
            for (; e.byteOffset < e.X.byteLength; )
                for (e.version === 0 ? e.Z = HR(e) * (1E3 / 45) : e.version === 1 && (e.Z = HR(e) * 4294967296 + HR(e)),
                e.B = jT(e); e.B > 0; e.B--) {
                    var L = jT(e)
                      , c = jT(e)
                      , I = jT(e);
                    L & 4 && (L & 3) === this.track && (this.track === 0 || this.track === 1) && (L = this.X,
                    L.X.push({
                        time: e.Z,
                        type: this.track,
                        yz: c,
                        W0: I,
                        order: L.X.length
                    }))
                }
            HAZ(this.X, e);
            return e.K
        }
        return []
    }
    ;
    lO.prototype.reset = function() {
        this.X.clear()
    }
    ;
    g.z(PR, Ms);
    g.M = PR.prototype;
    g.M.wj = function() {
        g.lB(this.Kf)
    }
    ;
    g.M.sL = function() {
        this.element.removeEventListener("transitionend", this.sL, !1);
        g.eZ(this.element, "ytp-rollup-mode");
        this.WB(this.Cf, !0)
    }
    ;
    g.M.o_ = function() {
        return this.Z ? this.pS : this.D
    }
    ;
    g.M.MH = function() {
        return this.Z ? this.D : this.pS
    }
    ;
    g.M.WB = function(e, L) {
        this.Cf = e;
        if (this.K.params.VX) {
            for (var c = 0, I = 0; I < this.T.length && c < e.length; I++)
                this.T[I] === e[c] && c++;
            c > 0 && c < e.length && (e = this.T.concat(e.slice(c)));
            this.sY = this.pS;
            this.D = this.pS = 0;
            Ms.prototype.WB.call(this, e);
            qDN(this, L)
        }
        Ms.prototype.WB.call(this, e)
    }
    ;
    TDJ.prototype.unload = function() {
        this.X != null && (this.V.removeEventListener("sabrCaptionsDataLoaded", this.X),
        this.X = null);
        this.p9 = [];
        this.V.publish("sabrCaptionsBufferedRangesUpdated", this.p9)
    }
    ;
    TDJ.prototype.YR = function(e) {
        return {
            formatId: g.mr(e.info.X.info, this.Wy),
            ud: e.info.ud + (this.Wy ? 0 : 1),
            startTimeMs: e.info.G * 1E3,
            durationMs: e.info.J * 1E3
        }
    }
    ;
    g.z(sJh, g.ax);
    g.M = sJh.prototype;
    g.M.m4 = function(e, L, c) {
        this.Vt();
        L = e.getId();
        L = L != null && L in this.X.X ? this.X.X[L] : null;
        L || (L = e.languageCode,
        L = this.X.isManifestless ? fi7(this, L, "386") : fi7(this, L));
        L && (this.Z = e,
        this.j = L,
        zlM(this.T, c),
        this.V.publish("sabrCaptionsTrackChanged", g.mr(L.info, this.X.Wy)))
    }
    ;
    g.M.Gl = function(e) {
        var L = this.X.isManifestless ? vON(this, "386") : vON(this);
        L = g.f(L);
        for (var c = L.next(); !c.done; c = L.next())
            g.Cm(this.K, c.value);
        e.Aa()
    }
    ;
    g.M.Vt = function() {
        this.Z && (this.Z = this.j = null,
        this.T.unload(),
        this.V.publish("sabrCaptionsTrackChanged", null))
    }
    ;
    g.M.tI = function() {
        return ""
    }
    ;
    g.M.K$ = function() {
        this.V.RU("captions")
    }
    ;
    var bKU = "WEBVTT".split("").map(function(e) {
        return e.charCodeAt(0)
    });
    g.z(FLe, gA);
    FLe.prototype.Z = function(e, L) {
        e instanceof ArrayBuffer && (e = g.uG(new Uint8Array(e)));
        var c = [];
        e = e.split(KLU);
        for (var I = 1; I < e.length; I++) {
            var B = e[I]
              , x = L;
            if (B !== "" && !YDU.test(B)) {
                var S = nOe.exec(B);
                if (S && S.length >= 4) {
                    var h = gOL(S[1])
                      , R = gOL(S[2]) - h;
                    h += x;
                    var u = (S = S[3]) ? S.split(" ") : [];
                    S = {};
                    var t = null;
                    var O = "";
                    var q = null
                      , T = "";
                    u = g.f(u);
                    for (var W = u.next(); !W.done; W = u.next())
                        if (W = W.value.split(":"),
                        W.length === 2) {
                            var A = W[1];
                            switch (W[0]) {
                            case "line":
                                W = A.split(",");
                                W[0].endsWith("%") && (t = W[0],
                                S.I2 = Number.parseInt(t, 10),
                                W.length === 2 && (O = W[1].trim()));
                                break;
                            case "position":
                                W = A.split(",");
                                q = W[0];
                                S.Me = Number.parseInt(q, 10);
                                W.length === 2 && (T = W[1].trim());
                                break;
                            case "align":
                                switch (A) {
                                case "start":
                                    S.textAlign = 0;
                                    break;
                                case "middle":
                                    S.textAlign = 2;
                                    break;
                                case "end":
                                    S.textAlign = 1
                                }
                            }
                        }
                    t || O || (O = "end");
                    if (!q)
                        switch (S.textAlign) {
                        case 0:
                            S.Me = 0;
                            break;
                        case 1:
                            S.Me = 100;
                            break;
                        case 2:
                            S.Me = 50
                        }
                    if (S.textAlign != null) {
                        t = 0;
                        switch (O) {
                        case "center":
                            t += 3;
                            break;
                        case "end":
                            t += 6;
                            break;
                        default:
                            t += 0
                        }
                        switch (T) {
                        case "line-left":
                            t += 0;
                            break;
                        case "center":
                            t += 1;
                            break;
                        case "line-right":
                            t += 2;
                            break;
                        default:
                            switch (S.textAlign) {
                            case 0:
                                t += 0;
                                break;
                            case 2:
                                t += 1;
                                break;
                            case 1:
                                t += 2
                            }
                        }
                        O = t < 0 || t > 8 ? 7 : t;
                        S.jF = O
                    }
                    B = B.substring(nOe.lastIndex).replace(/[\x01-\x09\x0b-\x1f]/g, "");
                    T = S;
                    S = B;
                    B = {};
                    if (S.indexOf("<") < 0 && S.indexOf("&") < 0)
                        x = kmM(h, R, 5, T),
                        R = new GB(h,R,5,x.id,S,!1,g.qQ(B) ? void 0 : B),
                        c.push(x),
                        c.push(R),
                        x.X.push(R);
                    else
                        for (O = S.split(eMM),
                        O.length === 1 ? (S = 5,
                        T = kmM(h, R, S, T)) : (t = S = 6,
                        T = Object.assign({
                            X$: 32
                        }, T),
                        T = new kp(h,R,t,"_" + Dm++,T)),
                        c.push(T),
                        t = h,
                        q = 0; q < O.length; q++)
                            u = O[q],
                            q % 2 === 0 ? (W = g.I_("<html>" + u + "</html>"),
                            W.getElementsByTagName("parsererror").length ? (A = W.createElement("span"),
                            A.appendChild(W.createTextNode(u))) : A = W.firstChild,
                            GmM(this, t, R - (t - h), S, T, q > 0, A, B, c)) : t = gOL(u) + x
                }
                nOe.lastIndex = 0
            }
        }
        return c
    }
    ;
    var YDU = /^NOTE/
      , KLU = /(?:\r\n|\r|\n){2,}/
      , nOe = RegExp("^((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})[\\t ]+--\x3e[\\t ]+((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})(?:[\\t ]*)(.*)(?:\\r\\n|\\r|\\n)", "gm")
      , eMM = RegExp("<((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})>");
    g.z(QQ, g.p);
    QQ.prototype.clear = function() {
        this.X && this.X.dispose();
        this.X = null
    }
    ;
    QQ.prototype.reset = function() {
        this.X && this.X.reset()
    }
    ;
    QQ.prototype.KS = function() {
        g.p.prototype.KS.call(this);
        this.clear()
    }
    ;
    var e7 = {
        windowColor: "#080808",
        windowOpacity: 0,
        textAlign: 2,
        jF: 7,
        Me: 50,
        I2: 100,
        isDefault: !0,
        Kj: {
            background: "#080808",
            backgroundOpacity: .75,
            charEdgeStyle: 0,
            color: "#fff",
            fontFamily: 4,
            fontSizeIncrement: 0,
            textOpacity: 1,
            offset: 1
        }
    };
    g.z(NDN, g.Vk);
    g.M = NDN.prototype;
    g.M.KS = function() {
        if (this.B || this.k9) {
            var e = this.V.Nw();
            e && !e.We() && e.s7()
        } else
            UT9(this, !1);
        g.Vk.prototype.KS.call(this)
    }
    ;
    g.M.Cz = function() {
        return this.XM.Y("html5_honor_caption_availabilities_in_audio_track") && this.G !== "LIVE" && this.G !== "SABR_LIVE"
    }
    ;
    g.M.Ai = function() {
        if (this.m$)
            return this.B || this.k9;
        var e = this.getAudioTrack();
        if (this.Cz()) {
            if (!e.captionTracks.length)
                return !1;
            if (!this.X)
                return !0
        }
        e = Rje(e, g.T3(this.XM));
        return e === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? !0 : e === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" ? dA(this) : yYJ(this) || dA(this) ? !0 : ZKU(this)
    }
    ;
    g.M.load = function() {
        g.Vk.prototype.load.call(this);
        this.D = this.getAudioTrack();
        if (this.X)
            this.K && (this.d_.clear(),
            this.B ? $TL(this, !0) : this.player.getPresentingPlayerType() !== 3 && this.X.m4(this.K, "json3", this.Kf),
            this.B || this.k9 || Xv(this) || this.player.Kb("captionschanged", g.Nu(this.K)));
        else {
            var e;
            this.G === "OFFLINE" ? e = new Zm(this.player,this.videoData,this.getAudioTrack()) : this.G === "SABR_LIVE" ? e = new sJh(this.videoData.X,this.player) : this.G === "LIVE" ? e = new WR(this.videoData.X,this.player) : this.G === "INNERTUBE" ? e = new g.Nr(this.player,this.videoData,this.getAudioTrack()) : e = new g.yk(this.player,this.videoData.pj,this.videoData.videoId,g.eUv(this.videoData),this.videoData.hB,this.videoData.eventId);
            this.X = e;
            g.l(this, this.X);
            this.X.Gl(this.Kf)
        }
    }
    ;
    g.M.unload = function() {
        this.B && this.K ? $TL(this, !1) : (this.t7 && g.PT(this.t7),
        this.player.RU("captions"),
        this.ye = [],
        this.X && this.X.Vt(),
        this.d_.clear(),
        this.pS && this.player.Lb(this.pS),
        this.IA());
        g.Vk.prototype.unload.call(this);
        this.player.Ox();
        this.player.Kb("captionschanged", {})
    }
    ;
    g.M.create = function() {
        this.Ai() && this.load();
        var e;
        a: {
            var L, c, I;
            if (this.XM.Y("web_player_nitrate_promo_tooltip") && ((L = this.videoData.getPlayerResponse()) == null ? 0 : (c = L.captions) == null ? 0 : (I = c.playerCaptionsTracklistRenderer) == null ? 0 : I.enableTouchCaptionsNitrate)) {
                var B, x;
                if (L = (e = this.videoData.getPlayerResponse()) == null ? void 0 : (B = e.captions) == null ? void 0 : (x = B.playerCaptionsTracklistRenderer) == null ? void 0 : x.captionTracks)
                    for (e = g.f(L),
                    B = e.next(); !B.done; B = e.next())
                        if (B = B.value,
                        B.kind === "asr" && B.languageCode === "en") {
                            e = !0;
                            break a
                        }
            }
            e = !1
        }
        e && this.V.publish("showpromotooltip", this.T.element)
    }
    ;
    g.M.Aa = function() {
        var e = Rje(this.player.getAudioTrack(), g.T3(this.XM));
        var L = e === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? EC(this, this.J) : e === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" && dA(this) ? UC(this) : yYJ(this) || this.J || ZKU(this) ? EC(this, this.J) : dA(this) ? UC(this) : null;
        if (this.B || this.k9) {
            var c = g.ua(this.X.K, !0);
            e = [];
            for (var I = 0; I < c.length; I++) {
                var B = c[I]
                  , x = g.ql("TRACK");
                x.setAttribute("kind", "subtitles");
                x.setAttribute("label", g.aD(B));
                x.setAttribute("srclang", g.mS(B));
                x.setAttribute("id", B.toString());
                this.k9 || x.setAttribute("src", this.X.tI(B, "vtt"));
                B === L && x.setAttribute("default", "1");
                e.push(x)
            }
            L = this.V.Nw();
            L.V4(e);
            e = L.IT();
            this.DY && this.Ve.C(e.textTracks, "change", this.zdl)
        } else
            !this.K && L && nj(this, L),
            this.player.Kb("onCaptionsTrackListChanged"),
            this.player.oy("onApiChange")
    }
    ;
    g.M.zdl = function() {
        for (var e = this.V.Nw().IT().textTracks, L = null, c = 0; c < e.length; c++)
            if (e[c].mode === "showing")
                a: {
                    L = g.ua(this.X.K, !0);
                    for (var I = 0; I < L.length; I++)
                        if (L[I].toString() === e[c].id) {
                            L = L[I];
                            break a
                        }
                    L = null
                }
        (this.loaded ? this.K : null) !== L && nj(this, L, !0)
    }
    ;
    g.M.Pml = function() {
        !this.K && this.B || this.unload()
    }
    ;
    g.M.Bo = function(e, L, c, I) {
        if (e) {
            var B;
            jJU(this, (B = this.K) != null ? B : void 0);
            this.X.OL() && (this.ye = [],
            this.V.RU("captions"),
            qs(this.Y9),
            this.d_.reset());
            a: {
                B = this.d_;
                I = I || 0;
                c = wdJ(B, e, c || 0);
                e = [];
                try {
                    for (var x = g.f(c), S = x.next(); !S.done; S = x.next()) {
                        var h = S.value
                          , R = h.trackData
                          , u = h.ai
                          , t = B.XM.Y("safari_live_drm_captions_fix");
                        if (typeof R !== "string") {
                            c = e;
                            var O = c.concat;
                            if (t && iKe(R))
                                var q = JYL(B, R, u);
                            else {
                                var T = B
                                  , W = L
                                  , A = R
                                  , b = u
                                  , J = I;
                                if (!uiM(A))
                                    throw Error("Invalid binary caption track data");
                                T.X || (T.X = new lO(J,W));
                                q = T.X.Z(A, b)
                            }
                            var w = O.call(c, q)
                        } else {
                            if (R.substring(0, 6) === "WEBVTT")
                                var C = e.concat(JYL(B, R, u));
                            else {
                                c = e;
                                var y = c.concat;
                                b: {
                                    W = T = void 0;
                                    A = B;
                                    b = L;
                                    if (R[0] === "{")
                                        try {
                                            A.X || (A.X = new mh(VNU(b)));
                                            var P = W = A.X.Z(R, u);
                                            break b
                                        } catch (cM) {
                                            g.A9(cM);
                                            P = [];
                                            break b
                                        }
                                    var ev = g.I_(R);
                                    if (!ev || !ev.firstChild) {
                                        var X = Error("Invalid caption track data");
                                        X.params = R;
                                        throw X;
                                    }
                                    if (ev.firstChild.tagName === "timedtext") {
                                        if (Number(ev.firstChild.getAttribute("format")) === 3) {
                                            A.X || (A.X = new wA(VNU(b),A.XM));
                                            P = T = A.X.Z(ev, u);
                                            break b
                                        }
                                        var oH = Error("Unsupported subtitles format in web player (Format2)");
                                        oH.params = R;
                                        throw oH;
                                    }
                                    if (ev.firstChild.tagName === "transcript") {
                                        var rc = Error("Unsupported subtitles format in web player (Format1)");
                                        rc.params = R;
                                        throw rc;
                                    }
                                    var Sv = Error("Invalid caption track data");
                                    Sv.params = R;
                                    throw Sv;
                                }
                                C = y.call(c, P)
                            }
                            w = C
                        }
                        e = w
                    }
                    var tJ = e;
                    break a
                } catch (cM) {
                    B.logger.X(187101178, "Captions parsing failed: " + cM.message + ". ");
                    B.clear();
                    tJ = [];
                    break a
                }
                tJ = void 0
            }
            L = tJ;
            L.length > 0 && (tJ = this.K,
            this.S9(tJ, !!tJ, Xv(this) ? "g" : this.J ? "m" : "s"));
            tJ = !this.XM.Y("html5_keep_caption_data_after_seek") && (this.G === "LIVE" || this.G === "SABR_LIVE");
            this.player.Lb(L, void 0, tJ);
            !this.J || this.k9 || Xv(this) || g.R2(this.XM) || g.L8(this.XM) || g.DF(this.XM) || this.XM.Ve === "shortspage" || this.player.isInline() || (g.PT(this.t7),
            L = xTM({
                jF: 0,
                Me: 5,
                I2: 5,
                VX: 2,
                textAlign: 0,
                Qx: 0,
                lang: "de"
            }),
            this.Pe = [L],
            tJ = ["Klicke auf ", ", um die Einstellungen aufzurufen."],
            this.Sl || (x = new g.eH(g.v7()),
            g.l(this, x),
            this.Sl = x.element),
            x = L.end - L.start,
            (S = g.aD(this.K)) && this.Pe.push(new GB(L.start,x,0,L.id,S)),
            this.Pe.push(new GB(L.start,x,0,L.id,tJ[0]), new GB(L.start,x,0,L.id,this.Sl,!0), new GB(L.start,x,0,L.id,tJ[1],!0)),
            this.player.Lb(this.Pe),
            g.HT(this.t7));
            !this.J || this.k9 || Xv(this) || (g.T3(this.XM) ? Kj(this, !0) : Yp(this, !0),
            this.D && (this.D.G = this.K),
            this.player.Ox());
            this.J = !1
        }
    }
    ;
    g.M.onCueRangeEnter = function(e) {
        this.ye.push(e);
        qs(this.Y9)
    }
    ;
    g.M.onCueRangeExit = function(e) {
        g.i7(this.ye, e);
        this.X instanceof WR && this.X.T && this.player.SX([e]);
        qs(this.Y9)
    }
    ;
    g.M.getCaptionWindowContainerId = function() {
        return this.T.element.id
    }
    ;
    g.M.XM7 = function() {
        dT7(this, this.Pe);
        this.Pe = null
    }
    ;
    g.M.qs = function() {
        var e = this;
        if (!this.sY || !this.B) {
            this.Y9.stop();
            g.NcT(this.He);
            this.ye.sort(g.$H);
            var L = this.ye;
            if (this.pS) {
                var c = g.ig(L, function(x) {
                    return this.pS.indexOf(x) === -1
                }, this);
                c.length && (L = c)
            }
            L = g.f(L);
            for (c = L.next(); !c.done; c = L.next())
                liU(this, c.value);
            L = g.f(Object.entries(this.Gm));
            var I = L.next();
            for (c = {}; !I.done; c = {
                X3: void 0,
                Ow: void 0
            },
            I = L.next()) {
                var B = g.f(I.value);
                I = B.next().value;
                B = B.next().value;
                c.X3 = I;
                c.Ow = B;
                this.He[c.X3] ? (c.Ow.element.parentNode || (c.Ow instanceof PR || c.Ow instanceof pj || g.xL(this.Gm, function(x) {
                    return function(S, h) {
                        h !== x.X3 && S.K.params.jF === x.Ow.K.params.jF && S.K.params.Me === x.Ow.K.params.Me && S.K.params.I2 === x.Ow.K.params.I2 && (S.dispose(),
                        delete e.Gm[h]);
                        return h === x.X3
                    }
                }(c), this),
                this.T.element.appendChild(c.Ow.element)),
                c.Ow.WB(this.He[c.X3])) : (c.Ow.dispose(),
                delete this.Gm[c.X3])
            }
        }
    }
    ;
    g.M.am_ = function() {
        aie(this, {}, !0);
        this.player.Kb("captionssettingschanged")
    }
    ;
    g.M.f4 = function() {
        var e = e7.Kj;
        e = {
            background: e.background,
            backgroundOpacity: e.backgroundOpacity,
            charEdgeStyle: e.charEdgeStyle,
            color: e.color,
            fontFamily: e.fontFamily,
            fontSizeIncrement: e.fontSizeIncrement,
            fontStyle: e.bold && e.italic ? 3 : e.bold ? 1 : e.italic ? 2 : 0,
            textOpacity: e.textOpacity,
            windowColor: e7.windowColor,
            windowOpacity: e7.windowOpacity
        };
        var L = s7M() || {};
        L.background != null && (e.background = L.background);
        L.backgroundOverride != null && (e.backgroundOverride = L.backgroundOverride);
        L.backgroundOpacity != null && (e.backgroundOpacity = L.backgroundOpacity);
        L.backgroundOpacityOverride != null && (e.backgroundOpacityOverride = L.backgroundOpacityOverride);
        L.charEdgeStyle != null && (e.charEdgeStyle = L.charEdgeStyle);
        L.charEdgeStyleOverride != null && (e.charEdgeStyleOverride = L.charEdgeStyleOverride);
        L.color != null && (e.color = L.color);
        L.colorOverride != null && (e.colorOverride = L.colorOverride);
        L.fontFamily != null && (e.fontFamily = L.fontFamily);
        L.fontFamilyOverride != null && (e.fontFamilyOverride = L.fontFamilyOverride);
        L.fontSizeIncrement != null && (e.fontSizeIncrement = L.fontSizeIncrement);
        L.fontSizeIncrementOverride != null && (e.fontSizeIncrementOverride = L.fontSizeIncrementOverride);
        L.fontStyle != null && (e.fontStyle = L.fontStyle);
        L.fontStyleOverride != null && (e.fontStyleOverride = L.fontStyleOverride);
        L.textOpacity != null && (e.textOpacity = L.textOpacity);
        L.textOpacityOverride != null && (e.textOpacityOverride = L.textOpacityOverride);
        L.windowColor != null && (e.windowColor = L.windowColor);
        L.windowColorOverride != null && (e.windowColorOverride = L.windowColorOverride);
        L.windowOpacity != null && (e.windowOpacity = L.windowOpacity);
        L.windowOpacityOverride != null && (e.windowOpacityOverride = L.windowOpacityOverride);
        return e
    }
    ;
    g.M.Rt = function(e, L) {
        var c = {};
        Object.assign(c, s7M());
        Object.assign(c, e);
        aie(this, c, L);
        this.player.Kb("captionssettingschanged")
    }
    ;
    g.M.IA = function() {
        !this.B && this.loaded && (g.Le(this.Gm, function(e, L) {
            e.dispose();
            delete this.Gm[L]
        }, this),
        this.qs())
    }
    ;
    g.M.zY = function(e, L) {
        switch (e) {
        case "fontSize":
            if (isNaN(L))
                break;
            e = g.j5(L, -2, 4);
            this.Rt({
                fontSizeIncrement: e
            });
            return e;
        case "reload":
            L && !this.B && nj(this, this.K, !0);
            break;
        case "stickyLoading":
            L !== void 0 && this.XM.J && (g.T3(this.XM) ? Kj(this, !!L) : Yp(this, !!L));
            break;
        case "track":
            return QJ9(this, L);
        case "tracklist":
            return this.X ? g.Mt(g.ua(this.X.K, !(!L || !L.includeAsr)), function(c) {
                return g.Nu(c)
            }) : [];
        case "translationLanguages":
            return this.X ? this.X.B.map(function(c) {
                return Object.assign({}, c)
            }) : [];
        case "sampleSubtitles":
            this.B || L === void 0 || UT9(this, !!L);
            break;
        case "sampleSubtitlesCustomized":
            this.B || UT9(this, !!L, L);
            break;
        case "recommendedTranslationLanguages":
            return g.te();
        case "defaultTranslationSourceTrackIndices":
            return this.X ? this.X.J : []
        }
    }
    ;
    g.M.getOptions = function() {
        var e = "reload fontSize track tracklist translationLanguages sampleSubtitle".split(" ");
        this.XM.J && e.push("stickyLoading");
        return e
    }
    ;
    g.M.W1 = function() {
        var e = this.K;
        if (this.V.xY("captions")) {
            if (this.XM.Y("html5_modify_caption_vss_logging")) {
                var L;
                return (e = (L = this.videoData.YC) != null ? L : null) ? {
                    cc: g.zKc(e)
                } : {}
            }
            if (e)
                return L = e.vssId,
                e.translationLanguage && L && (L = "t" + L + "." + g.mS(e)),
                {
                    cc: L
                }
        }
        return {}
    }
    ;
    g.M.kre = function() {
        this.isSubtitlesOn() ? (g.T3(this.XM) ? Kj(this, !1) : Yp(this, !1),
        jJU(this),
        nj(this, null, !0)) : this.n7()
    }
    ;
    g.M.n7 = function() {
        var e = Xv(this) || !this.K ? EC(this, !0) : this.K;
        e && this.bz(e.vssId, "m");
        this.isSubtitlesOn() || nj(this, Xv(this) || !this.K ? EC(this, !0) : this.K, !0)
    }
    ;
    g.M.isSubtitlesOn = function() {
        return !!this.loaded && !!this.K && !Xv(this)
    }
    ;
    g.M.uMe = function() {
        var e = Xv(this);
        dA(this, e) ? nj(this, this.getAudioTrack().X, !1) : this.videoData.captionTracks.length && (this.loaded && this.unload(),
        this.Cz() && (this.J = !1,
        this.K = null,
        this.X && (this.X.dispose(),
        this.X = null)),
        this.Ai() && (e ? nj(this, EC(this, !1), !1) : this.load()))
    }
    ;
    g.M.Y6 = function(e) {
        e && (this.h7 = {
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            width: 1 - e.left - e.right,
            height: 1 - e.top - e.bottom
        },
        this.T.element.style.top = this.h7.top * 100 + "%",
        this.T.element.style.left = this.h7.left * 100 + "%",
        this.T.element.style.width = this.h7.width * 100 + "%",
        this.T.element.style.height = this.h7.height * 100 + "%",
        this.T.element.style.position = "absolute",
        e = PkL(this)) && (this.T.element.style.width = e.width + "px",
        this.T.element.style.height = e.height + "px")
    }
    ;
    g.M.onVideoDataChange = function(e, L) {
        e === "newdata" && (this.videoData = L,
        this.loaded && this.unload(),
        this.J = !1,
        this.K = null,
        this.X && (this.X.dispose(),
        this.X = null,
        this.player.Kb("captionschanged", {})),
        this.Ai() && this.load())
    }
    ;
    g.M.getAudioTrack = function() {
        return this.player.getAudioTrack()
    }
    ;
    g.M.a6W = function() {
        var e = this.V.Nw();
        e && !e.We() && e.s7();
        this.V.isFullscreen() ? (this.B = this.m$ = !0,
        this.loaded && this.Aa()) : (this.m$ = this.XM.controlsType === "3",
        this.B = Ck7(this));
        nj(this, this.K)
    }
    ;
    g.M.du = function() {
        var e, L, c, I = (e = this.videoData.getPlayerResponse()) == null ? void 0 : (L = e.captions) == null ? void 0 : (c = L.playerCaptionsTracklistRenderer) == null ? void 0 : c.openTranscriptCommand;
        I && this.player.fS("innertubeCommand", I)
    }
    ;
    g.M.S9 = function(e, L, c) {
        var I = /&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm
          , B = "";
        e && (B = e.vssId,
        B = B.replace(I, ""));
        var x = "";
        e && e.getId() && (x = e.getId() || "");
        e && e.getXtags() && (e = e.getXtags(),
        e = e.replace(I, ""),
        x = x.concat(";" + e));
        this.V.S9(L ? B : "", L ? x : "", c)
    }
    ;
    g.M.bz = function(e, L) {
        e = (e || "").replace(/&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm, "");
        e.length > 0 && this.V.bz(e, L)
    }
    ;
    g.M.K$ = function() {
        this.X && this.X.K$()
    }
    ;
    g.JK("captions", NDN);
}
)(_yt_player);
