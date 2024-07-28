(() => {
  // node_modules/tslib/tslib.es6.mjs
  function __decorate(decorators, target, key, desc) {
    var c4 = arguments.length, r8 = c4 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r8 = Reflect.decorate(decorators, target, key, desc);
    else for (var i5 = decorators.length - 1; i5 >= 0; i5--) if (d3 = decorators[i5]) r8 = (c4 < 3 ? d3(r8) : c4 > 3 ? d3(target, key, r8) : d3(target, key)) || r8;
    return c4 > 3 && r8 && Object.defineProperty(target, key, r8), r8;
  }

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t = (t5) => (e10, o8) => {
    void 0 !== o8 ? o8.addInitializer(() => {
      customElements.define(t5, e10);
    }) : customElements.define(t5, e10);
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t2 = globalThis;
  var e = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t5, e10, o8) {
      if (this._$cssResult$ = true, o8 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t5, this.t = e10;
    }
    get styleSheet() {
      let t5 = this.o;
      const s5 = this.t;
      if (e && void 0 === t5) {
        const e10 = void 0 !== s5 && 1 === s5.length;
        e10 && (t5 = o.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e10 && o.set(s5, t5));
      }
      return t5;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t5) => new n("string" == typeof t5 ? t5 : t5 + "", void 0, s);
  var i = (t5, ...e10) => {
    const o8 = 1 === t5.length ? t5[0] : e10.reduce((e11, s5, o9) => e11 + ((t6) => {
      if (true === t6._$cssResult$) return t6.cssText;
      if ("number" == typeof t6) return t6;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t5[o9 + 1], t5[0]);
    return new n(o8, t5, s);
  };
  var S = (s5, o8) => {
    if (e) s5.adoptedStyleSheets = o8.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
    else for (const e10 of o8) {
      const o9 = document.createElement("style"), n6 = t2.litNonce;
      void 0 !== n6 && o9.setAttribute("nonce", n6), o9.textContent = e10.cssText, s5.appendChild(o9);
    }
  };
  var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
    let e10 = "";
    for (const s5 of t6.cssRules) e10 += s5.cssText;
    return r(e10);
  })(t5) : t5;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t5, s5) => t5;
  var u = { toAttribute(t5, s5) {
    switch (s5) {
      case Boolean:
        t5 = t5 ? l : null;
        break;
      case Object:
      case Array:
        t5 = null == t5 ? t5 : JSON.stringify(t5);
    }
    return t5;
  }, fromAttribute(t5, s5) {
    let i5 = t5;
    switch (s5) {
      case Boolean:
        i5 = null !== t5;
        break;
      case Number:
        i5 = null === t5 ? null : Number(t5);
        break;
      case Object:
      case Array:
        try {
          i5 = JSON.parse(t5);
        } catch (t6) {
          i5 = null;
        }
    }
    return i5;
  } };
  var f = (t5, s5) => !i2(t5, s5);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t5) {
      this._$Ei(), (this.l ??= []).push(t5);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t5, s5 = y) {
      if (s5.state && (s5.attribute = false), this._$Ei(), this.elementProperties.set(t5, s5), !s5.noAccessor) {
        const i5 = Symbol(), r8 = this.getPropertyDescriptor(t5, i5, s5);
        void 0 !== r8 && e2(this.prototype, t5, r8);
      }
    }
    static getPropertyDescriptor(t5, s5, i5) {
      const { get: e10, set: h3 } = r2(this.prototype, t5) ?? { get() {
        return this[s5];
      }, set(t6) {
        this[s5] = t6;
      } };
      return { get() {
        return e10?.call(this);
      }, set(s6) {
        const r8 = e10?.call(this);
        h3.call(this, s6), this.requestUpdate(t5, r8, i5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t5) {
      return this.elementProperties.get(t5) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t5 = n2(this);
      t5.finalize(), void 0 !== t5.l && (this.l = [...t5.l]), this.elementProperties = new Map(t5.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t6 = this.properties, s5 = [...h(t6), ...o2(t6)];
        for (const i5 of s5) this.createProperty(i5, t6[i5]);
      }
      const t5 = this[Symbol.metadata];
      if (null !== t5) {
        const s5 = litPropertyMetadata.get(t5);
        if (void 0 !== s5) for (const [t6, i5] of s5) this.elementProperties.set(t6, i5);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t6, s5] of this.elementProperties) {
        const i5 = this._$Eu(t6, s5);
        void 0 !== i5 && this._$Eh.set(i5, t6);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s5) {
      const i5 = [];
      if (Array.isArray(s5)) {
        const e10 = new Set(s5.flat(1 / 0).reverse());
        for (const s6 of e10) i5.unshift(c(s6));
      } else void 0 !== s5 && i5.push(c(s5));
      return i5;
    }
    static _$Eu(t5, s5) {
      const i5 = s5.attribute;
      return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t5) => t5(this));
    }
    addController(t5) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t5), void 0 !== this.renderRoot && this.isConnected && t5.hostConnected?.();
    }
    removeController(t5) {
      this._$EO?.delete(t5);
    }
    _$E_() {
      const t5 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
      for (const i5 of s5.keys()) this.hasOwnProperty(i5) && (t5.set(i5, this[i5]), delete this[i5]);
      t5.size > 0 && (this._$Ep = t5);
    }
    createRenderRoot() {
      const t5 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t5, this.constructor.elementStyles), t5;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t5) => t5.hostConnected?.());
    }
    enableUpdating(t5) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t5) => t5.hostDisconnected?.());
    }
    attributeChangedCallback(t5, s5, i5) {
      this._$AK(t5, i5);
    }
    _$EC(t5, s5) {
      const i5 = this.constructor.elementProperties.get(t5), e10 = this.constructor._$Eu(t5, i5);
      if (void 0 !== e10 && true === i5.reflect) {
        const r8 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s5, i5.type);
        this._$Em = t5, null == r8 ? this.removeAttribute(e10) : this.setAttribute(e10, r8), this._$Em = null;
      }
    }
    _$AK(t5, s5) {
      const i5 = this.constructor, e10 = i5._$Eh.get(t5);
      if (void 0 !== e10 && this._$Em !== e10) {
        const t6 = i5.getPropertyOptions(e10), r8 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
        this._$Em = e10, this[e10] = r8.fromAttribute(s5, t6.type), this._$Em = null;
      }
    }
    requestUpdate(t5, s5, i5) {
      if (void 0 !== t5) {
        if (i5 ??= this.constructor.getPropertyOptions(t5), !(i5.hasChanged ?? f)(this[t5], s5)) return;
        this.P(t5, s5, i5);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t5, s5, i5) {
      this._$AL.has(t5) || this._$AL.set(t5, s5), true === i5.reflect && this._$Em !== t5 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t5);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t6) {
        Promise.reject(t6);
      }
      const t5 = this.scheduleUpdate();
      return null != t5 && await t5, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t7, s6] of this._$Ep) this[t7] = s6;
          this._$Ep = void 0;
        }
        const t6 = this.constructor.elementProperties;
        if (t6.size > 0) for (const [s6, i5] of t6) true !== i5.wrapped || this._$AL.has(s6) || void 0 === this[s6] || this.P(s6, this[s6], i5);
      }
      let t5 = false;
      const s5 = this._$AL;
      try {
        t5 = this.shouldUpdate(s5), t5 ? (this.willUpdate(s5), this._$EO?.forEach((t6) => t6.hostUpdate?.()), this.update(s5)) : this._$EU();
      } catch (s6) {
        throw t5 = false, this._$EU(), s6;
      }
      t5 && this._$AE(s5);
    }
    willUpdate(t5) {
    }
    _$AE(t5) {
      this._$EO?.forEach((t6) => t6.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t5) {
      return true;
    }
    update(t5) {
      this._$Ej &&= this._$Ej.forEach((t6) => this._$EC(t6, this[t6])), this._$EU();
    }
    updated(t5) {
    }
    firstUpdated(t5) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/@lit/reactive-element/decorators/property.js
  var o3 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r3 = (t5 = o3, e10, r8) => {
    const { kind: n6, metadata: i5 } = r8;
    let s5 = globalThis.litPropertyMetadata.get(i5);
    if (void 0 === s5 && globalThis.litPropertyMetadata.set(i5, s5 = /* @__PURE__ */ new Map()), s5.set(r8.name, t5), "accessor" === n6) {
      const { name: o8 } = r8;
      return { set(r9) {
        const n7 = e10.get.call(this);
        e10.set.call(this, r9), this.requestUpdate(o8, n7, t5);
      }, init(e11) {
        return void 0 !== e11 && this.P(o8, void 0, t5), e11;
      } };
    }
    if ("setter" === n6) {
      const { name: o8 } = r8;
      return function(r9) {
        const n7 = this[o8];
        e10.call(this, r9), this.requestUpdate(o8, n7, t5);
      };
    }
    throw Error("Unsupported decorator location: " + n6);
  };
  function n3(t5) {
    return (e10, o8) => "object" == typeof o8 ? r3(t5, e10, o8) : ((t6, e11, o9) => {
      const r8 = e11.hasOwnProperty(o9);
      return e11.constructor.createProperty(o9, r8 ? { ...t6, wrapped: true } : t6), r8 ? Object.getOwnPropertyDescriptor(e11, o9) : void 0;
    })(t5, e10, o8);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r4(r8) {
    return n3({ ...r8, state: true, attribute: false });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var e3 = (e10, t5, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t5 && Object.defineProperty(e10, t5, c4), c4);

  // node_modules/@lit/reactive-element/decorators/query.js
  function e4(e10, r8) {
    return (n6, s5, i5) => {
      const o8 = (t5) => t5.renderRoot?.querySelector(e10) ?? null;
      if (r8) {
        const { get: e11, set: r9 } = "object" == typeof s5 ? n6 : i5 ?? (() => {
          const t5 = Symbol();
          return { get() {
            return this[t5];
          }, set(e12) {
            this[t5] = e12;
          } };
        })();
        return e3(n6, s5, { get() {
          let t5 = e11.call(this);
          return void 0 === t5 && (t5 = o8(this), (null !== t5 || this.hasUpdated) && r9.call(this, t5)), t5;
        } });
      }
      return e3(n6, s5, { get() {
        return o8(this);
      } });
    };
  }

  // node_modules/@lit/reactive-element/decorators/query-all.js
  var e5;
  function r5(r8) {
    return (n6, o8) => e3(n6, o8, { get() {
      return (this.renderRoot ?? (e5 ??= document.createDocumentFragment())).querySelectorAll(r8);
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  function o4(o8) {
    return (e10, n6) => {
      const { slot: r8, selector: s5 } = o8 ?? {}, c4 = "slot" + (r8 ? `[name=${r8}]` : ":not([name])");
      return e3(e10, n6, { get() {
        const t5 = this.renderRoot?.querySelector(c4), e11 = t5?.assignedElements(o8) ?? [];
        return void 0 === s5 ? e11 : e11.filter((t6) => t6.matches(s5));
      } });
    };
  }

  // node_modules/lit-html/lit-html.js
  var t3 = globalThis;
  var i3 = t3.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
  var e6 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o5 = "?" + h2;
  var n4 = `<${o5}>`;
  var r6 = document;
  var l2 = () => r6.createComment("");
  var c3 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
  var a2 = Array.isArray;
  var u2 = (t5) => a2(t5) || "function" == typeof t5?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t5) => (i5, ...s5) => ({ _$litType$: t5, strings: i5, values: s5 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r6.createTreeWalker(r6, 129);
  function C(t5, i5) {
    if (!Array.isArray(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i5) : i5;
  }
  var P = (t5, i5) => {
    const s5 = t5.length - 1, o8 = [];
    let r8, l4 = 2 === i5 ? "<svg>" : "", c4 = f2;
    for (let i6 = 0; i6 < s5; i6++) {
      const s6 = t5[i6];
      let a4, u4, d3 = -1, y3 = 0;
      for (; y3 < s6.length && (c4.lastIndex = y3, u4 = c4.exec(s6), null !== u4); ) y3 = c4.lastIndex, c4 === f2 ? "!--" === u4[1] ? c4 = v : void 0 !== u4[1] ? c4 = _ : void 0 !== u4[2] ? ($.test(u4[2]) && (r8 = RegExp("</" + u4[2], "g")), c4 = m) : void 0 !== u4[3] && (c4 = m) : c4 === m ? ">" === u4[0] ? (c4 = r8 ?? f2, d3 = -1) : void 0 === u4[1] ? d3 = -2 : (d3 = c4.lastIndex - u4[2].length, a4 = u4[1], c4 = void 0 === u4[3] ? m : '"' === u4[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r8 = void 0);
      const x2 = c4 === m && t5[i6 + 1].startsWith("/>") ? " " : "";
      l4 += c4 === f2 ? s6 + n4 : d3 >= 0 ? (o8.push(a4), s6.slice(0, d3) + e6 + s6.slice(d3) + h2 + x2) : s6 + h2 + (-2 === d3 ? i6 : x2);
    }
    return [C(t5, l4 + (t5[s5] || "<?>") + (2 === i5 ? "</svg>" : "")), o8];
  };
  var V = class _V {
    constructor({ strings: t5, _$litType$: s5 }, n6) {
      let r8;
      this.parts = [];
      let c4 = 0, a4 = 0;
      const u4 = t5.length - 1, d3 = this.parts, [f3, v2] = P(t5, s5);
      if (this.el = _V.createElement(f3, n6), E.currentNode = this.el.content, 2 === s5) {
        const t6 = this.el.content.firstChild;
        t6.replaceWith(...t6.childNodes);
      }
      for (; null !== (r8 = E.nextNode()) && d3.length < u4; ) {
        if (1 === r8.nodeType) {
          if (r8.hasAttributes()) for (const t6 of r8.getAttributeNames()) if (t6.endsWith(e6)) {
            const i5 = v2[a4++], s6 = r8.getAttribute(t6).split(h2), e10 = /([.?@])?(.*)/.exec(i5);
            d3.push({ type: 1, index: c4, name: e10[2], strings: s6, ctor: "." === e10[1] ? k : "?" === e10[1] ? H : "@" === e10[1] ? I : R }), r8.removeAttribute(t6);
          } else t6.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r8.removeAttribute(t6));
          if ($.test(r8.tagName)) {
            const t6 = r8.textContent.split(h2), s6 = t6.length - 1;
            if (s6 > 0) {
              r8.textContent = i3 ? i3.emptyScript : "";
              for (let i5 = 0; i5 < s6; i5++) r8.append(t6[i5], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
              r8.append(t6[s6], l2());
            }
          }
        } else if (8 === r8.nodeType) if (r8.data === o5) d3.push({ type: 2, index: c4 });
        else {
          let t6 = -1;
          for (; -1 !== (t6 = r8.data.indexOf(h2, t6 + 1)); ) d3.push({ type: 7, index: c4 }), t6 += h2.length - 1;
        }
        c4++;
      }
    }
    static createElement(t5, i5) {
      const s5 = r6.createElement("template");
      return s5.innerHTML = t5, s5;
    }
  };
  function N(t5, i5, s5 = t5, e10) {
    if (i5 === w) return i5;
    let h3 = void 0 !== e10 ? s5._$Co?.[e10] : s5._$Cl;
    const o8 = c3(i5) ? void 0 : i5._$litDirective$;
    return h3?.constructor !== o8 && (h3?._$AO?.(false), void 0 === o8 ? h3 = void 0 : (h3 = new o8(t5), h3._$AT(t5, s5, e10)), void 0 !== e10 ? (s5._$Co ??= [])[e10] = h3 : s5._$Cl = h3), void 0 !== h3 && (i5 = N(t5, h3._$AS(t5, i5.values), h3, e10)), i5;
  }
  var S2 = class {
    constructor(t5, i5) {
      this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t5) {
      const { el: { content: i5 }, parts: s5 } = this._$AD, e10 = (t5?.creationScope ?? r6).importNode(i5, true);
      E.currentNode = e10;
      let h3 = E.nextNode(), o8 = 0, n6 = 0, l4 = s5[0];
      for (; void 0 !== l4; ) {
        if (o8 === l4.index) {
          let i6;
          2 === l4.type ? i6 = new M(h3, h3.nextSibling, this, t5) : 1 === l4.type ? i6 = new l4.ctor(h3, l4.name, l4.strings, this, t5) : 6 === l4.type && (i6 = new L(h3, this, t5)), this._$AV.push(i6), l4 = s5[++n6];
        }
        o8 !== l4?.index && (h3 = E.nextNode(), o8++);
      }
      return E.currentNode = r6, e10;
    }
    p(t5) {
      let i5 = 0;
      for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t5[i5])), i5++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t5, i5, s5, e10) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t5, this._$AB = i5, this._$AM = s5, this.options = e10, this._$Cv = e10?.isConnected ?? true;
    }
    get parentNode() {
      let t5 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === t5?.nodeType && (t5 = i5.parentNode), t5;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t5, i5 = this) {
      t5 = N(this, t5, i5), c3(t5) ? t5 === T || null == t5 || "" === t5 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t5 !== this._$AH && t5 !== w && this._(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.T(t5) : u2(t5) ? this.k(t5) : this._(t5);
    }
    S(t5) {
      return this._$AA.parentNode.insertBefore(t5, this._$AB);
    }
    T(t5) {
      this._$AH !== t5 && (this._$AR(), this._$AH = this.S(t5));
    }
    _(t5) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t5 : this.T(r6.createTextNode(t5)), this._$AH = t5;
    }
    $(t5) {
      const { values: i5, _$litType$: s5 } = t5, e10 = "number" == typeof s5 ? this._$AC(t5) : (void 0 === s5.el && (s5.el = V.createElement(C(s5.h, s5.h[0]), this.options)), s5);
      if (this._$AH?._$AD === e10) this._$AH.p(i5);
      else {
        const t6 = new S2(e10, this), s6 = t6.u(this.options);
        t6.p(i5), this.T(s6), this._$AH = t6;
      }
    }
    _$AC(t5) {
      let i5 = A.get(t5.strings);
      return void 0 === i5 && A.set(t5.strings, i5 = new V(t5)), i5;
    }
    k(t5) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s5, e10 = 0;
      for (const h3 of t5) e10 === i5.length ? i5.push(s5 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s5 = i5[e10], s5._$AI(h3), e10++;
      e10 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e10), i5.length = e10);
    }
    _$AR(t5 = this._$AA.nextSibling, i5) {
      for (this._$AP?.(false, true, i5); t5 && t5 !== this._$AB; ) {
        const i6 = t5.nextSibling;
        t5.remove(), t5 = i6;
      }
    }
    setConnected(t5) {
      void 0 === this._$AM && (this._$Cv = t5, this._$AP?.(t5));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t5, i5, s5, e10, h3) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t5, this.name = i5, this._$AM = e10, this.options = h3, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = T;
    }
    _$AI(t5, i5 = this, s5, e10) {
      const h3 = this.strings;
      let o8 = false;
      if (void 0 === h3) t5 = N(this, t5, i5, 0), o8 = !c3(t5) || t5 !== this._$AH && t5 !== w, o8 && (this._$AH = t5);
      else {
        const e11 = t5;
        let n6, r8;
        for (t5 = h3[0], n6 = 0; n6 < h3.length - 1; n6++) r8 = N(this, e11[s5 + n6], i5, n6), r8 === w && (r8 = this._$AH[n6]), o8 ||= !c3(r8) || r8 !== this._$AH[n6], r8 === T ? t5 = T : t5 !== T && (t5 += (r8 ?? "") + h3[n6 + 1]), this._$AH[n6] = r8;
      }
      o8 && !e10 && this.j(t5);
    }
    j(t5) {
      t5 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t5 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t5) {
      this.element[this.name] = t5 === T ? void 0 : t5;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t5) {
      this.element.toggleAttribute(this.name, !!t5 && t5 !== T);
    }
  };
  var I = class extends R {
    constructor(t5, i5, s5, e10, h3) {
      super(t5, i5, s5, e10, h3), this.type = 5;
    }
    _$AI(t5, i5 = this) {
      if ((t5 = N(this, t5, i5, 0) ?? T) === w) return;
      const s5 = this._$AH, e10 = t5 === T && s5 !== T || t5.capture !== s5.capture || t5.once !== s5.once || t5.passive !== s5.passive, h3 = t5 !== T && (s5 === T || e10);
      e10 && this.element.removeEventListener(this.name, this, s5), h3 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
    }
    handleEvent(t5) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
    }
  };
  var L = class {
    constructor(t5, i5, s5) {
      this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t5) {
      N(this, t5);
    }
  };
  var Z = t3.litHtmlPolyfillSupport;
  Z?.(V, M), (t3.litHtmlVersions ??= []).push("3.1.4");
  var j = (t5, i5, s5) => {
    const e10 = s5?.renderBefore ?? i5;
    let h3 = e10._$litPart$;
    if (void 0 === h3) {
      const t6 = s5?.renderBefore ?? null;
      e10._$litPart$ = h3 = new M(i5.insertBefore(l2(), t6), t6, void 0, s5 ?? {});
    }
    return h3._$AI(t5), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t5 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t5.firstChild, t5;
    }
    update(t5) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = j(i5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r7 = globalThis.litElementPolyfillSupport;
  r7?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.6");

  // node_modules/lit-html/is-server.js
  var o6 = false;

  // node_modules/@material/web/list/internal/list-navigation-helpers.js
  function activateFirstItem(items, isActivatable = isItemNotDisabled) {
    const firstItem = getFirstActivatableItem(items, isActivatable);
    if (firstItem) {
      firstItem.tabIndex = 0;
      firstItem.focus();
    }
    return firstItem;
  }
  function activateLastItem(items, isActivatable = isItemNotDisabled) {
    const lastItem = getLastActivatableItem(items, isActivatable);
    if (lastItem) {
      lastItem.tabIndex = 0;
      lastItem.focus();
    }
    return lastItem;
  }
  function getActiveItem(items, isActivatable = isItemNotDisabled) {
    for (let i5 = 0; i5 < items.length; i5++) {
      const item = items[i5];
      if (item.tabIndex === 0 && isActivatable(item)) {
        return {
          item,
          index: i5
        };
      }
    }
    return null;
  }
  function getFirstActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (const item of items) {
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getLastActivatableItem(items, isActivatable = isItemNotDisabled) {
    for (let i5 = items.length - 1; i5 >= 0; i5--) {
      const item = items[i5];
      if (isActivatable(item)) {
        return item;
      }
    }
    return null;
  }
  function getNextItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
    for (let i5 = 1; i5 < items.length; i5++) {
      const nextIndex = (i5 + index) % items.length;
      if (nextIndex < index && !wrap) {
        return null;
      }
      const item = items[nextIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function getPrevItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
    for (let i5 = 1; i5 < items.length; i5++) {
      const prevIndex = (index - i5 + items.length) % items.length;
      if (prevIndex > index && !wrap) {
        return null;
      }
      const item = items[prevIndex];
      if (isActivatable(item)) {
        return item;
      }
    }
    return items[index] ? items[index] : null;
  }
  function activateNextItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
    if (activeItemRecord) {
      const next = getNextItem(items, activeItemRecord.index, isActivatable, wrap);
      if (next) {
        next.tabIndex = 0;
        next.focus();
      }
      return next;
    } else {
      return activateFirstItem(items, isActivatable);
    }
  }
  function activatePreviousItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
    if (activeItemRecord) {
      const prev = getPrevItem(items, activeItemRecord.index, isActivatable, wrap);
      if (prev) {
        prev.tabIndex = 0;
        prev.focus();
      }
      return prev;
    } else {
      return activateLastItem(items, isActivatable);
    }
  }
  function createRequestActivationEvent() {
    return new Event("request-activation", { bubbles: true, composed: true });
  }
  function isItemNotDisabled(item) {
    return !item.disabled;
  }

  // node_modules/@material/web/list/internal/list-controller.js
  var NavigableKeys = {
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowRight: "ArrowRight",
    Home: "Home",
    End: "End"
  };
  var ListController = class {
    constructor(config) {
      this.handleKeydown = (event) => {
        const key = event.key;
        if (event.defaultPrevented || !this.isNavigableKey(key)) {
          return;
        }
        const items = this.items;
        if (!items.length) {
          return;
        }
        const activeItemRecord = getActiveItem(items, this.isActivatable);
        event.preventDefault();
        const isRtl2 = this.isRtl();
        const inlinePrevious = isRtl2 ? NavigableKeys.ArrowRight : NavigableKeys.ArrowLeft;
        const inlineNext = isRtl2 ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
        let nextActiveItem = null;
        switch (key) {
          case NavigableKeys.ArrowDown:
          case inlineNext:
            nextActiveItem = activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
            break;
          case NavigableKeys.ArrowUp:
          case inlinePrevious:
            nextActiveItem = activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
            break;
          case NavigableKeys.Home:
            nextActiveItem = activateFirstItem(items, this.isActivatable);
            break;
          case NavigableKeys.End:
            nextActiveItem = activateLastItem(items, this.isActivatable);
            break;
          default:
            break;
        }
        if (nextActiveItem && activeItemRecord && activeItemRecord.item !== nextActiveItem) {
          activeItemRecord.item.tabIndex = -1;
        }
      };
      this.onDeactivateItems = () => {
        const items = this.items;
        for (const item of items) {
          this.deactivateItem(item);
        }
      };
      this.onRequestActivation = (event) => {
        this.onDeactivateItems();
        const target = event.target;
        this.activateItem(target);
        target.focus();
      };
      this.onSlotchange = () => {
        const items = this.items;
        let encounteredActivated = false;
        for (const item of items) {
          const isActivated = !item.disabled && item.tabIndex > -1;
          if (isActivated && !encounteredActivated) {
            encounteredActivated = true;
            item.tabIndex = 0;
            continue;
          }
          item.tabIndex = -1;
        }
        if (encounteredActivated) {
          return;
        }
        const firstActivatableItem = getFirstActivatableItem(items, this.isActivatable);
        if (!firstActivatableItem) {
          return;
        }
        firstActivatableItem.tabIndex = 0;
      };
      const { isItem, getPossibleItems, isRtl, deactivateItem, activateItem, isNavigableKey, isActivatable, wrapNavigation } = config;
      this.isItem = isItem;
      this.getPossibleItems = getPossibleItems;
      this.isRtl = isRtl;
      this.deactivateItem = deactivateItem;
      this.activateItem = activateItem;
      this.isNavigableKey = isNavigableKey;
      this.isActivatable = isActivatable;
      this.wrapNavigation = wrapNavigation ?? (() => true);
    }
    /**
     * The items being managed by the list. Additionally, attempts to see if the
     * object has a sub-item in the `.item` property.
     */
    get items() {
      const maybeItems = this.getPossibleItems();
      const items = [];
      for (const itemOrParent of maybeItems) {
        const isItem = this.isItem(itemOrParent);
        if (isItem) {
          items.push(itemOrParent);
          continue;
        }
        const subItem = itemOrParent.item;
        if (subItem && this.isItem(subItem)) {
          items.push(subItem);
        }
      }
      return items;
    }
    /**
     * Activates the next item in the list. If at the end of the list, the first
     * item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activateNextItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
    }
    /**
     * Activates the previous item in the list. If at the start of the list, the
     * last item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activatePreviousItem() {
      const items = this.items;
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      if (activeItemRecord) {
        activeItemRecord.item.tabIndex = -1;
      }
      return activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
    }
  };

  // node_modules/@material/web/list/internal/list.js
  var NAVIGABLE_KEY_SET = new Set(Object.values(NavigableKeys));
  var List = class extends s3 {
    /** @export */
    get items() {
      return this.listController.items;
    }
    constructor() {
      super();
      this.listController = new ListController({
        isItem: (item) => item.hasAttribute("md-list-item"),
        getPossibleItems: () => this.slotItems,
        isRtl: () => getComputedStyle(this).direction === "rtl",
        deactivateItem: (item) => {
          item.tabIndex = -1;
        },
        activateItem: (item) => {
          item.tabIndex = 0;
        },
        isNavigableKey: (key) => NAVIGABLE_KEY_SET.has(key),
        isActivatable: (item) => !item.disabled && item.type !== "text"
      });
      this.internals = // Cast needed for closure
      this.attachInternals();
      if (!o6) {
        this.internals.role = "list";
        this.addEventListener("keydown", this.listController.handleKeydown);
      }
    }
    render() {
      return x`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `;
    }
    /**
     * Activates the next item in the list. If at the end of the list, the first
     * item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activateNextItem() {
      return this.listController.activateNextItem();
    }
    /**
     * Activates the previous item in the list. If at the start of the list, the
     * last item will be activated.
     *
     * @return The activated list item or `null` if there are no items.
     */
    activatePreviousItem() {
      return this.listController.activatePreviousItem();
    }
  };
  __decorate([
    o4({ flatten: true })
  ], List.prototype, "slotItems", void 0);

  // node_modules/@material/web/list/internal/list-styles.js
  var styles = i`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`;

  // node_modules/@material/web/list/list.js
  var MdList = class MdList2 extends List {
  };
  MdList.styles = [styles];
  MdList = __decorate([
    t("md-list")
  ], MdList);

  // node_modules/@material/web/internal/controller/attachable-controller.js
  var ATTACHABLE_CONTROLLER = Symbol("attachableController");
  var FOR_ATTRIBUTE_OBSERVER;
  if (!o6) {
    FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
      for (const record of records) {
        record.target[ATTACHABLE_CONTROLLER]?.hostConnected();
      }
    });
  }
  var AttachableController = class {
    get htmlFor() {
      return this.host.getAttribute("for");
    }
    set htmlFor(htmlFor) {
      if (htmlFor === null) {
        this.host.removeAttribute("for");
      } else {
        this.host.setAttribute("for", htmlFor);
      }
    }
    get control() {
      if (this.host.hasAttribute("for")) {
        if (!this.htmlFor || !this.host.isConnected) {
          return null;
        }
        return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
      }
      return this.currentControl || this.host.parentElement;
    }
    set control(control) {
      if (control) {
        this.attach(control);
      } else {
        this.detach();
      }
    }
    /**
     * Creates a new controller for an `Attachable` element.
     *
     * @param host The `Attachable` element.
     * @param onControlChange A callback with two parameters for the previous and
     *     next control. An `Attachable` element may perform setup or teardown
     *     logic whenever the control changes.
     */
    constructor(host, onControlChange) {
      this.host = host;
      this.onControlChange = onControlChange;
      this.currentControl = null;
      host.addController(this);
      host[ATTACHABLE_CONTROLLER] = this;
      FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ["for"] });
    }
    attach(control) {
      if (control === this.currentControl) {
        return;
      }
      this.setCurrentControl(control);
      this.host.removeAttribute("for");
    }
    detach() {
      this.setCurrentControl(null);
      this.host.setAttribute("for", "");
    }
    /** @private */
    hostConnected() {
      this.setCurrentControl(this.control);
    }
    /** @private */
    hostDisconnected() {
      this.setCurrentControl(null);
    }
    setCurrentControl(control) {
      this.onControlChange(this.currentControl, control);
      this.currentControl = control;
    }
  };

  // node_modules/@material/web/focus/internal/focus-ring.js
  var EVENTS = ["focusin", "focusout", "pointerdown"];
  var FocusRing = class extends s3 {
    constructor() {
      super(...arguments);
      this.visible = false;
      this.inward = false;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    /** @private */
    handleEvent(event) {
      if (event[HANDLED_BY_FOCUS_RING]) {
        return;
      }
      switch (event.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? false;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = false;
          break;
      }
      event[HANDLED_BY_FOCUS_RING] = true;
    }
    onControlChange(prev, next) {
      if (o6)
        return;
      for (const event of EVENTS) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
    update(changed) {
      if (changed.has("visible")) {
        this.dispatchEvent(new Event("visibility-changed"));
      }
      super.update(changed);
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "visible", void 0);
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], FocusRing.prototype, "inward", void 0);
  var HANDLED_BY_FOCUS_RING = Symbol("handledByFocusRing");

  // node_modules/@material/web/focus/internal/focus-ring-styles.js
  var styles2 = i`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;

  // node_modules/@material/web/focus/md-focus-ring.js
  var MdFocusRing = class MdFocusRing2 extends FocusRing {
  };
  MdFocusRing.styles = [styles2];
  MdFocusRing = __decorate([
    t("md-focus-ring")
  ], MdFocusRing);

  // node_modules/@material/web/labs/item/internal/item.js
  var Item = class extends s3 {
    constructor() {
      super(...arguments);
      this.multiline = false;
    }
    render() {
      return x`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
    }
    handleTextSlotChange() {
      let isMultiline = false;
      let slotsWithContent = 0;
      for (const slot of this.textSlots) {
        if (slotHasContent(slot)) {
          slotsWithContent += 1;
        }
        if (slotsWithContent > 1) {
          isMultiline = true;
          break;
        }
      }
      this.multiline = isMultiline;
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Item.prototype, "multiline", void 0);
  __decorate([
    r5(".text slot")
  ], Item.prototype, "textSlots", void 0);
  function slotHasContent(slot) {
    for (const node of slot.assignedNodes({ flatten: true })) {
      const isElement = node.nodeType === Node.ELEMENT_NODE;
      const isTextWithContent = node.nodeType === Node.TEXT_NODE && node.textContent?.match(/\S/);
      if (isElement || isTextWithContent) {
        return true;
      }
    }
    return false;
  }

  // node_modules/@material/web/labs/item/internal/item-styles.js
  var styles3 = i`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;

  // node_modules/@material/web/labs/item/item.js
  var MdItem = class MdItem2 extends Item {
  };
  MdItem.styles = [styles3];
  MdItem = __decorate([
    t("md-item")
  ], MdItem);

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e7 = (t5) => (...e10) => ({ _$litDirective$: t5, values: e10 });
  var i4 = class {
    constructor(t5) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t5, e10, i5) {
      this._$Ct = t5, this._$AM = e10, this._$Ci = i5;
    }
    _$AS(t5, e10) {
      return this.update(t5, e10);
    }
    update(t5, e10) {
      return this.render(...e10);
    }
  };

  // node_modules/lit-html/directives/class-map.js
  var e8 = e7(class extends i4 {
    constructor(t5) {
      if (super(t5), t5.type !== t4.ATTRIBUTE || "class" !== t5.name || t5.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t5) {
      return " " + Object.keys(t5).filter((s5) => t5[s5]).join(" ") + " ";
    }
    update(s5, [i5]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
        for (const t5 in i5) i5[t5] && !this.nt?.has(t5) && this.st.add(t5);
        return this.render(i5);
      }
      const r8 = s5.element.classList;
      for (const t5 of this.st) t5 in i5 || (r8.remove(t5), this.st.delete(t5));
      for (const t5 in i5) {
        const s6 = !!i5[t5];
        s6 === this.st.has(t5) || this.nt?.has(t5) || (s6 ? (r8.add(t5), this.st.add(t5)) : (r8.remove(t5), this.st.delete(t5)));
      }
      return w;
    }
  });

  // node_modules/@material/web/internal/motion/animation.js
  var EASING = {
    STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
    STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
    STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
    EMPHASIZED: "cubic-bezier(.3,0,0,1)",
    EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
    EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)"
  };

  // node_modules/@material/web/ripple/internal/ripple.js
  var PRESS_GROW_MS = 450;
  var MINIMUM_PRESS_MS = 225;
  var INITIAL_ORIGIN_SCALE = 0.2;
  var PADDING = 10;
  var SOFT_EDGE_MINIMUM_SIZE = 75;
  var SOFT_EDGE_CONTAINER_RATIO = 0.35;
  var PRESS_PSEUDO = "::after";
  var ANIMATION_FILL = "forwards";
  var State;
  (function(State2) {
    State2[State2["INACTIVE"] = 0] = "INACTIVE";
    State2[State2["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
    State2[State2["HOLDING"] = 2] = "HOLDING";
    State2[State2["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
  })(State || (State = {}));
  var EVENTS2 = [
    "click",
    "contextmenu",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pointerup"
  ];
  var TOUCH_DELAY_MS = 150;
  var FORCED_COLORS = o6 ? null : window.matchMedia("(forced-colors: active)");
  var Ripple = class extends s3 {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.hovered = false;
      this.pressed = false;
      this.rippleSize = "";
      this.rippleScale = "";
      this.initialSize = 0;
      this.state = State.INACTIVE;
      this.checkBoundsAfterContextMenu = false;
      this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
      return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
      this.attachableController.htmlFor = htmlFor;
    }
    get control() {
      return this.attachableController.control;
    }
    set control(control) {
      this.attachableController.control = control;
    }
    attach(control) {
      this.attachableController.attach(control);
    }
    detach() {
      this.attachableController.detach();
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-hidden", "true");
    }
    render() {
      const classes = {
        "hovered": this.hovered,
        "pressed": this.pressed
      };
      return x`<div class="surface ${e8(classes)}"></div>`;
    }
    update(changedProps) {
      if (changedProps.has("disabled") && this.disabled) {
        this.hovered = false;
        this.pressed = false;
      }
      super.update(changedProps);
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerenter(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = true;
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerleave(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.hovered = false;
      if (this.state !== State.INACTIVE) {
        this.endPressAnimation();
      }
    }
    handlePointerup(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      if (this.state === State.HOLDING) {
        this.state = State.WAITING_FOR_CLICK;
        return;
      }
      if (this.state === State.TOUCH_DELAY) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(this.rippleStartEvent);
        return;
      }
    }
    async handlePointerdown(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.rippleStartEvent = event;
      if (!this.isTouch(event)) {
        this.state = State.WAITING_FOR_CLICK;
        this.startPressAnimation(event);
        return;
      }
      if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
        return;
      }
      this.checkBoundsAfterContextMenu = false;
      this.state = State.TOUCH_DELAY;
      await new Promise((resolve) => {
        setTimeout(resolve, TOUCH_DELAY_MS);
      });
      if (this.state !== State.TOUCH_DELAY) {
        return;
      }
      this.state = State.HOLDING;
      this.startPressAnimation(event);
    }
    handleClick() {
      if (this.disabled) {
        return;
      }
      if (this.state === State.WAITING_FOR_CLICK) {
        this.endPressAnimation();
        return;
      }
      if (this.state === State.INACTIVE) {
        this.startPressAnimation();
        this.endPressAnimation();
      }
    }
    handlePointercancel(event) {
      if (!this.shouldReactToEvent(event)) {
        return;
      }
      this.endPressAnimation();
    }
    handleContextmenu() {
      if (this.disabled) {
        return;
      }
      this.checkBoundsAfterContextMenu = true;
      this.endPressAnimation();
    }
    determineRippleSize() {
      const { height, width } = this.getBoundingClientRect();
      const maxDim = Math.max(height, width);
      const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
      const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
      const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
      const maxRadius = hypotenuse + PADDING;
      this.initialSize = initialSize;
      this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
      this.rippleSize = `${initialSize}px`;
    }
    getNormalizedPointerEventCoords(pointerEvent) {
      const { scrollX, scrollY } = window;
      const { left, top } = this.getBoundingClientRect();
      const documentX = scrollX + left;
      const documentY = scrollY + top;
      const { pageX, pageY } = pointerEvent;
      return { x: pageX - documentX, y: pageY - documentY };
    }
    getTranslationCoordinates(positionEvent) {
      const { height, width } = this.getBoundingClientRect();
      const endPoint = {
        x: (width - this.initialSize) / 2,
        y: (height - this.initialSize) / 2
      };
      let startPoint;
      if (positionEvent instanceof PointerEvent) {
        startPoint = this.getNormalizedPointerEventCoords(positionEvent);
      } else {
        startPoint = {
          x: width / 2,
          y: height / 2
        };
      }
      startPoint = {
        x: startPoint.x - this.initialSize / 2,
        y: startPoint.y - this.initialSize / 2
      };
      return { startPoint, endPoint };
    }
    startPressAnimation(positionEvent) {
      if (!this.mdRoot) {
        return;
      }
      this.pressed = true;
      this.growAnimation?.cancel();
      this.determineRippleSize();
      const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
      const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
      this.growAnimation = this.mdRoot.animate({
        top: [0, 0],
        left: [0, 0],
        height: [this.rippleSize, this.rippleSize],
        width: [this.rippleSize, this.rippleSize],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${this.rippleScale})`
        ]
      }, {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        easing: EASING.STANDARD,
        fill: ANIMATION_FILL
      });
    }
    async endPressAnimation() {
      this.rippleStartEvent = void 0;
      this.state = State.INACTIVE;
      const animation = this.growAnimation;
      let pressAnimationPlayState = Infinity;
      if (typeof animation?.currentTime === "number") {
        pressAnimationPlayState = animation.currentTime;
      } else if (animation?.currentTime) {
        pressAnimationPlayState = animation.currentTime.to("ms").value;
      }
      if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
        this.pressed = false;
        return;
      }
      await new Promise((resolve) => {
        setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
      });
      if (this.growAnimation !== animation) {
        return;
      }
      this.pressed = false;
    }
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    shouldReactToEvent(event) {
      if (this.disabled || !event.isPrimary) {
        return false;
      }
      if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== event.pointerId) {
        return false;
      }
      if (event.type === "pointerenter" || event.type === "pointerleave") {
        return !this.isTouch(event);
      }
      const isPrimaryButton = event.buttons === 1;
      return this.isTouch(event) || isPrimaryButton;
    }
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    inBounds({ x: x2, y: y3 }) {
      const { top, left, bottom, right } = this.getBoundingClientRect();
      return x2 >= left && x2 <= right && y3 >= top && y3 <= bottom;
    }
    isTouch({ pointerType }) {
      return pointerType === "touch";
    }
    /** @private */
    async handleEvent(event) {
      if (FORCED_COLORS?.matches) {
        return;
      }
      switch (event.type) {
        case "click":
          this.handleClick();
          break;
        case "contextmenu":
          this.handleContextmenu();
          break;
        case "pointercancel":
          this.handlePointercancel(event);
          break;
        case "pointerdown":
          await this.handlePointerdown(event);
          break;
        case "pointerenter":
          this.handlePointerenter(event);
          break;
        case "pointerleave":
          this.handlePointerleave(event);
          break;
        case "pointerup":
          this.handlePointerup(event);
          break;
        default:
          break;
      }
    }
    onControlChange(prev, next) {
      if (o6)
        return;
      for (const event of EVENTS2) {
        prev?.removeEventListener(event, this);
        next?.addEventListener(event, this);
      }
    }
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], Ripple.prototype, "disabled", void 0);
  __decorate([
    r4()
  ], Ripple.prototype, "hovered", void 0);
  __decorate([
    r4()
  ], Ripple.prototype, "pressed", void 0);
  __decorate([
    e4(".surface")
  ], Ripple.prototype, "mdRoot", void 0);

  // node_modules/@material/web/ripple/internal/ripple-styles.js
  var styles4 = i`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;

  // node_modules/@material/web/ripple/ripple.js
  var MdRipple = class MdRipple2 extends Ripple {
  };
  MdRipple.styles = [styles4];
  MdRipple = __decorate([
    t("md-ripple")
  ], MdRipple);

  // node_modules/lit-html/static.js
  var e9 = Symbol.for("");
  var o7 = (t5) => {
    if (t5?.r === e9) return t5?._$litStatic$;
  };
  var s4 = (t5, ...r8) => ({ _$litStatic$: r8.reduce((r9, e10, o8) => r9 + ((t6) => {
    if (void 0 !== t6._$litStatic$) return t6._$litStatic$;
    throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t6}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
  })(e10) + t5[o8 + 1], t5[0]), r: e9 });
  var a3 = /* @__PURE__ */ new Map();
  var l3 = (t5) => (r8, ...e10) => {
    const i5 = e10.length;
    let s5, l4;
    const n6 = [], u4 = [];
    let c4, $2 = 0, f3 = false;
    for (; $2 < i5; ) {
      for (c4 = r8[$2]; $2 < i5 && void 0 !== (l4 = e10[$2], s5 = o7(l4)); ) c4 += s5 + r8[++$2], f3 = true;
      $2 !== i5 && u4.push(l4), n6.push(c4), $2++;
    }
    if ($2 === i5 && n6.push(r8[i5]), f3) {
      const t6 = n6.join("$$lit$$");
      void 0 === (r8 = a3.get(t6)) && (n6.raw = n6, a3.set(t6, r8 = n6)), e10 = u4;
    }
    return t5(r8, ...e10);
  };
  var n5 = l3(x);
  var u3 = l3(b2);

  // node_modules/@material/web/internal/aria/aria.js
  var ARIA_PROPERTIES = [
    "role",
    "ariaAtomic",
    "ariaAutoComplete",
    "ariaBusy",
    "ariaChecked",
    "ariaColCount",
    "ariaColIndex",
    "ariaColSpan",
    "ariaCurrent",
    "ariaDisabled",
    "ariaExpanded",
    "ariaHasPopup",
    "ariaHidden",
    "ariaInvalid",
    "ariaKeyShortcuts",
    "ariaLabel",
    "ariaLevel",
    "ariaLive",
    "ariaModal",
    "ariaMultiLine",
    "ariaMultiSelectable",
    "ariaOrientation",
    "ariaPlaceholder",
    "ariaPosInSet",
    "ariaPressed",
    "ariaReadOnly",
    "ariaRequired",
    "ariaRoleDescription",
    "ariaRowCount",
    "ariaRowIndex",
    "ariaRowSpan",
    "ariaSelected",
    "ariaSetSize",
    "ariaSort",
    "ariaValueMax",
    "ariaValueMin",
    "ariaValueNow",
    "ariaValueText"
  ];
  var ARIA_ATTRIBUTES = ARIA_PROPERTIES.map(ariaPropertyToAttribute);
  function isAriaAttribute(attribute) {
    return ARIA_ATTRIBUTES.includes(attribute);
  }
  function ariaPropertyToAttribute(property) {
    return property.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
  }

  // node_modules/@material/web/internal/aria/delegate.js
  var privateIgnoreAttributeChangesFor = Symbol("privateIgnoreAttributeChangesFor");
  function mixinDelegatesAria(base) {
    var _a;
    if (o6) {
      return base;
    }
    class WithDelegatesAriaElement extends base {
      constructor() {
        super(...arguments);
        this[_a] = /* @__PURE__ */ new Set();
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (!isAriaAttribute(name)) {
          super.attributeChangedCallback(name, oldValue, newValue);
          return;
        }
        if (this[privateIgnoreAttributeChangesFor].has(name)) {
          return;
        }
        this[privateIgnoreAttributeChangesFor].add(name);
        this.removeAttribute(name);
        this[privateIgnoreAttributeChangesFor].delete(name);
        const dataProperty = ariaAttributeToDataProperty(name);
        if (newValue === null) {
          delete this.dataset[dataProperty];
        } else {
          this.dataset[dataProperty] = newValue;
        }
        this.requestUpdate(ariaAttributeToDataProperty(name), oldValue);
      }
      getAttribute(name) {
        if (isAriaAttribute(name)) {
          return super.getAttribute(ariaAttributeToDataAttribute(name));
        }
        return super.getAttribute(name);
      }
      removeAttribute(name) {
        super.removeAttribute(name);
        if (isAriaAttribute(name)) {
          super.removeAttribute(ariaAttributeToDataAttribute(name));
          this.requestUpdate();
        }
      }
    }
    _a = privateIgnoreAttributeChangesFor;
    setupDelegatesAriaProperties(WithDelegatesAriaElement);
    return WithDelegatesAriaElement;
  }
  function setupDelegatesAriaProperties(ctor) {
    for (const ariaProperty of ARIA_PROPERTIES) {
      const ariaAttribute = ariaPropertyToAttribute(ariaProperty);
      const dataAttribute = ariaAttributeToDataAttribute(ariaAttribute);
      const dataProperty = ariaAttributeToDataProperty(ariaAttribute);
      ctor.createProperty(ariaProperty, {
        attribute: ariaAttribute,
        noAccessor: true
      });
      ctor.createProperty(Symbol(dataAttribute), {
        attribute: dataAttribute,
        noAccessor: true
      });
      Object.defineProperty(ctor.prototype, ariaProperty, {
        configurable: true,
        enumerable: true,
        get() {
          return this.dataset[dataProperty] ?? null;
        },
        set(value) {
          const prevValue = this.dataset[dataProperty] ?? null;
          if (value === prevValue) {
            return;
          }
          if (value === null) {
            delete this.dataset[dataProperty];
          } else {
            this.dataset[dataProperty] = value;
          }
          this.requestUpdate(ariaProperty, prevValue);
        }
      });
    }
  }
  function ariaAttributeToDataAttribute(ariaAttribute) {
    return `data-${ariaAttribute}`;
  }
  function ariaAttributeToDataProperty(ariaAttribute) {
    return ariaAttribute.replace(/-\w/, (dashLetter) => dashLetter[1].toUpperCase());
  }

  // node_modules/@material/web/list/internal/listitem/list-item.js
  var listItemBaseClass = mixinDelegatesAria(s3);
  var ListItemEl = class extends listItemBaseClass {
    constructor() {
      super(...arguments);
      this.disabled = false;
      this.type = "text";
      this.isListItem = true;
      this.href = "";
      this.target = "";
    }
    get isDisabled() {
      return this.disabled && this.type !== "link";
    }
    willUpdate(changed) {
      if (this.href) {
        this.type = "link";
      }
      super.willUpdate(changed);
    }
    render() {
      return this.renderListItem(x`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
    }
    /**
     * Renders the root list item.
     *
     * @param content the child content of the list item.
     */
    renderListItem(content) {
      const isAnchor = this.type === "link";
      let tag;
      switch (this.type) {
        case "link":
          tag = s4`a`;
          break;
        case "button":
          tag = s4`button`;
          break;
        default:
        case "text":
          tag = s4`li`;
          break;
      }
      const isInteractive = this.type !== "text";
      const target = isAnchor && !!this.target ? this.target : T;
      return n5`
      <${tag}
        id="item"
        tabindex="${this.isDisabled || !isInteractive ? -1 : 0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected || T}
        aria-checked=${this.ariaChecked || T}
        aria-expanded=${this.ariaExpanded || T}
        aria-haspopup=${this.ariaHasPopup || T}
        class="list-item ${e8(this.getRenderClasses())}"
        href=${this.href || T}
        target=${target}
        @focus=${this.onFocus}
      >${content}</${tag}>
    `;
    }
    /**
     * Handles rendering of the ripple element.
     */
    renderRipple() {
      if (this.type === "text") {
        return T;
      }
      return x` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`;
    }
    /**
     * Handles rendering of the focus ring.
     */
    renderFocusRing() {
      if (this.type === "text") {
        return T;
      }
      return x` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
    }
    onFocusRingVisibilityChanged(e10) {
    }
    /**
     * Classes applied to the list item root.
     */
    getRenderClasses() {
      return { "disabled": this.isDisabled };
    }
    /**
     * Handles rendering the headline and supporting text.
     */
    renderBody() {
      return x`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
    }
    onFocus() {
      if (this.tabIndex !== -1) {
        return;
      }
      this.dispatchEvent(createRequestActivationEvent());
    }
    focus() {
      this.listItemRoot?.focus();
    }
  };
  ListItemEl.shadowRootOptions = {
    ...s3.shadowRootOptions,
    delegatesFocus: true
  };
  __decorate([
    n3({ type: Boolean, reflect: true })
  ], ListItemEl.prototype, "disabled", void 0);
  __decorate([
    n3({ reflect: true })
  ], ListItemEl.prototype, "type", void 0);
  __decorate([
    n3({ type: Boolean, attribute: "md-list-item", reflect: true })
  ], ListItemEl.prototype, "isListItem", void 0);
  __decorate([
    n3()
  ], ListItemEl.prototype, "href", void 0);
  __decorate([
    n3()
  ], ListItemEl.prototype, "target", void 0);
  __decorate([
    e4(".list-item")
  ], ListItemEl.prototype, "listItemRoot", void 0);

  // node_modules/@material/web/list/internal/listitem/list-item-styles.js
  var styles5 = i`:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}
`;

  // node_modules/@material/web/list/list-item.js
  var MdListItem = class MdListItem2 extends ListItemEl {
  };
  MdListItem.styles = [styles5];
  MdListItem = __decorate([
    t("md-list-item")
  ], MdListItem);
})();
/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/list/internal/list-navigation-helpers.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/list.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/attachable-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/md-focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/motion/animation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/aria/aria.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/aria/delegate.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/listitem/list-item.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/listitem/list-item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/list-item.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
