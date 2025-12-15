/*! For license information please see app.js.LICENSE.txt */
(() => {
  const t = {
    736(t) {
      t.exports = (function () {
        const t = new Map(); const e = { set(e, i, n) { t.has(e) || t.set(e, new Map()); const s = t.get(e); s.has(i) || s.size === 0 ? s.set(i, n) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`); }, get: (e, i) => t.has(e) && t.get(e).get(i) || null, remove(e, i) { if (!t.has(e)) return; const n = t.get(e); n.delete(i), n.size === 0 && t.delete(e); } }; const i = 'transitionend'; const n = (t) => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), t); const s = (t) => (t == null ? `${t}` : Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()); const o = (t) => { t.dispatchEvent(new Event(i)); }; const r = (t) => !(!t || typeof t !== 'object') && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType); const a = (t) => (r(t) ? t.jquery ? t[0] : t : typeof t === 'string' && t.length > 0 ? document.querySelector(n(t)) : null); const l = (t) => { if (!r(t) || t.getClientRects().length === 0) return !1; const e = getComputedStyle(t).getPropertyValue('visibility') === 'visible'; const i = t.closest('details:not([open])'); if (!i) return e; if (i !== t) { const e = t.closest('summary'); if (e && e.parentNode !== i) return !1; if (e === null) return !1; } return e; }; const c = (t) => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains('disabled') || (void 0 !== t.disabled ? t.disabled : t.hasAttribute('disabled') && t.getAttribute('disabled') !== 'false'); const h = (t) => { if (!document.documentElement.attachShadow) return null; if (typeof t.getRootNode === 'function') { const e = t.getRootNode(); return e instanceof ShadowRoot ? e : null; } return t instanceof ShadowRoot ? t : t.parentNode ? h(t.parentNode) : null; }; const d = () => {}; const u = (t) => { t.offsetHeight; }; const f = () => (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery') ? window.jQuery : null); const p = []; const m = () => document.documentElement.dir === 'rtl'; const g = (t) => { let e; e = () => { const e = f(); if (e) { const i = t.NAME; const n = e.fn[i]; e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = () => (e.fn[i] = n, t.jQueryInterface); } }, document.readyState === 'loading' ? (p.length || document.addEventListener('DOMContentLoaded', () => { for (const t of p)t(); }), p.push(e)) : e(); }; const _ = (t, e = [], i = t) => (typeof t === 'function' ? t.call(...e) : i); const b = (t, e, n = !0) => { if (!n) return void _(t); const s = ((t) => { if (!t) return 0; let { transitionDuration: e, transitionDelay: i } = window.getComputedStyle(t); const n = Number.parseFloat(e); const s = Number.parseFloat(i); return n || s ? (e = e.split(',')[0], i = i.split(',')[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0; })(e) + 5; let r = !1; const a = ({ target: n }) => { n === e && (r = !0, e.removeEventListener(i, a), _(t)); }; e.addEventListener(i, a), setTimeout(() => { r || o(e); }, s); }; const v = (t, e, i, n) => { const s = t.length; let o = t.indexOf(e); return o === -1 ? !i && n ? t[s - 1] : t[0] : (o += i ? 1 : -1, n && (o = (o + s) % s), t[Math.max(0, Math.min(o, s - 1))]); }; const y = /[^.]*(?=\..*)\.|.*/; const w = /\..*/; const A = /::\d+$/; const
          E = {}; let T = 1; const C = { mouseenter: 'mouseover', mouseleave: 'mouseout' }; const O = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']); function x(t, e) { return e && `${e}::${T++}` || t.uidEvent || T++; } function k(t) { const e = x(t); return t.uidEvent = e, E[e] = E[e] || {}, E[e]; } function L(t, e, i = null) { return Object.values(t).find((t) => t.callable === e && t.delegationSelector === i); } function S(t, e, i) { const n = typeof e === 'string'; const s = n ? i : e || i; let o = N(t); return O.has(o) || (o = t), [n, s, o]; } function D(t, e, i, n, s) { if (typeof e !== 'string' || !t) return; let [o, r, a] = S(e, i, n); if (e in C) { const t = (t) => function (e) { if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e); }; r = t(r); } const l = k(t); const c = l[a] || (l[a] = {}); const h = L(c, r, o ? i : null); if (h) return void (h.oneOff = h.oneOff && s); const d = x(r, e.replace(y, '')); const u = o ? (function (t, e, i) { return function n(s) { const o = t.querySelectorAll(e); for (let { target: r } = s; r && r !== this; r = r.parentNode) for (const a of o) if (a === r) return j(s, { delegateTarget: r }), n.oneOff && P.off(t, s.type, e, i), i.apply(r, [s]); }; }(t, i, r)) : (function (t, e) { return function i(n) { return j(n, { delegateTarget: t }), i.oneOff && P.off(t, n.type, e), e.apply(t, [n]); }; }(t, r)); u.delegationSelector = o ? i : null, u.callable = r, u.oneOff = s, u.uidEvent = d, c[d] = u, t.addEventListener(a, u, o); } function $(t, e, i, n, s) { const o = L(e[i], n, s); o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent]); } function I(t, e, i, n) { const s = e[i] || {}; for (const [o, r] of Object.entries(s))o.includes(n) && $(t, e, i, r.callable, r.delegationSelector); } function N(t) { return t = t.replace(w, ''), C[t] || t; } const P = {
          on(t, e, i, n) { D(t, e, i, n, !1); }, one(t, e, i, n) { D(t, e, i, n, !0); }, off(t, e, i, n) { if (typeof e !== 'string' || !t) return; const [s, o, r] = S(e, i, n); const a = r !== e; const l = k(t); const c = l[r] || {}; const h = e.startsWith('.'); if (void 0 === o) { if (h) for (const i of Object.keys(l))I(t, l, i, e.slice(1)); for (const [i, n] of Object.entries(c)) { const s = i.replace(A, ''); a && !e.includes(s) || $(t, l, r, n.callable, n.delegationSelector); } } else { if (!Object.keys(c).length) return; $(t, l, r, o, s ? i : null); } }, trigger(t, e, i) { if (typeof e !== 'string' || !t) return null; const n = f(); let s = null; let o = !0; let r = !0; let a = !1; e !== N(e) && n && (s = n.Event(e, i), n(t).trigger(s), o = !s.isPropagationStopped(), r = !s.isImmediatePropagationStopped(), a = s.isDefaultPrevented()); const l = j(new Event(e, { bubbles: o, cancelable: !0 }), i); return a && l.preventDefault(), r && t.dispatchEvent(l), l.defaultPrevented && s && s.preventDefault(), l; },
        }; function j(t, e = {}) { for (const [i, n] of Object.entries(e)) try { t[i] = n; } catch (e) { Object.defineProperty(t, i, { configurable: !0, get: () => n }); } return t; } function M(t) { if (t === 'true') return !0; if (t === 'false') return !1; if (t === Number(t).toString()) return Number(t); if (t === '' || t === 'null') return null; if (typeof t !== 'string') return t; try { return JSON.parse(decodeURIComponent(t)); } catch (e) { return t; } } function F(t) { return t.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`); } const H = {
          setDataAttribute(t, e, i) { t.setAttribute(`data-bs-${F(e)}`, i); }, removeDataAttribute(t, e) { t.removeAttribute(`data-bs-${F(e)}`); }, getDataAttributes(t) { if (!t) return {}; const e = {}; const i = Object.keys(t.dataset).filter((t) => t.startsWith('bs') && !t.startsWith('bsConfig')); for (const n of i) { let i = n.replace(/^bs/, ''); i = i.charAt(0).toLowerCase() + i.slice(1), e[i] = M(t.dataset[n]); } return e; }, getDataAttribute: (t, e) => M(t.getAttribute(`data-bs-${F(e)}`)),
        }; class W {
          static get Default() { return {}; }

          static get DefaultType() { return {}; }

          static get NAME() { throw new Error('You have to implement the static method "NAME", for each component!'); }

          _getConfig(t) { return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t; }

          _configAfterMerge(t) { return t; }

          _mergeConfigObj(t, e) {
            const i = r(e) ? H.getDataAttribute(e, 'config') : {}; return {
              ...this.constructor.Default, ...typeof i === 'object' ? i : {}, ...r(e) ? H.getDataAttributes(e) : {}, ...typeof t === 'object' ? t : {},
            };
          }

          _typeCheckConfig(t, e = this.constructor.DefaultType) { for (const [i, n] of Object.entries(e)) { const e = t[i]; const o = r(e) ? 'element' : s(e); if (!new RegExp(n).test(o)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${o}" but expected type "${n}".`); } }
        } class B extends W {
          constructor(t, i) { super(), (t = a(t)) && (this._element = t, this._config = this._getConfig(i), e.set(this._element, this.constructor.DATA_KEY, this)); }

          dispose() { e.remove(this._element, this.constructor.DATA_KEY), P.off(this._element, this.constructor.EVENT_KEY); for (const t of Object.getOwnPropertyNames(this)) this[t] = null; }

          _queueCallback(t, e, i = !0) { b(t, e, i); }

          _getConfig(t) { return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t; }

          static getInstance(t) { return e.get(a(t), this.DATA_KEY); }

          static getOrCreateInstance(t, e = {}) { return this.getInstance(t) || new this(t, typeof e === 'object' ? e : null); }

          static get VERSION() { return '5.3.8'; }

          static get DATA_KEY() { return `bs.${this.NAME}`; }

          static get EVENT_KEY() { return `.${this.DATA_KEY}`; }

          static eventName(t) { return `${t}${this.EVENT_KEY}`; }
        } const z = (t) => { let e = t.getAttribute('data-bs-target'); if (!e || e === '#') { let i = t.getAttribute('href'); if (!i || !i.includes('#') && !i.startsWith('.')) return null; i.includes('#') && !i.startsWith('#') && (i = `#${i.split('#')[1]}`), e = i && i !== '#' ? i.trim() : null; } return e ? e.split(',').map((t) => n(t)).join(',') : null; }; const R = {
          find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)), findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t), children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)), parents(t, e) { const i = []; let n = t.parentNode.closest(e); for (;n;)i.push(n), n = n.parentNode.closest(e); return i; }, prev(t, e) { let i = t.previousElementSibling; for (;i;) { if (i.matches(e)) return [i]; i = i.previousElementSibling; } return []; }, next(t, e) { let i = t.nextElementSibling; for (;i;) { if (i.matches(e)) return [i]; i = i.nextElementSibling; } return []; }, focusableChildren(t) { const e = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map((t) => `${t}:not([tabindex^="-"])`).join(','); return this.find(e, t).filter((t) => !c(t) && l(t)); }, getSelectorFromElement(t) { const e = z(t); return e && R.findOne(e) ? e : null; }, getElementFromSelector(t) { const e = z(t); return e ? R.findOne(e) : null; }, getMultipleElementsFromSelector(t) { const e = z(t); return e ? R.find(e) : []; },
        }; const q = (t, e = 'hide') => { const i = `click.dismiss${t.EVENT_KEY}`; const n = t.NAME; P.on(document, i, `[data-bs-dismiss="${n}"]`, function (i) { if (['A', 'AREA'].includes(this.tagName) && i.preventDefault(), c(this)) return; const s = R.getElementFromSelector(this) || this.closest(`.${n}`); t.getOrCreateInstance(s)[e](); }); }; const V = '.bs.alert'; const K = `close${V}`; const Q = `closed${V}`; class X extends B {
          static get NAME() { return 'alert'; }

          close() { if (P.trigger(this._element, K).defaultPrevented) return; this._element.classList.remove('show'); const t = this._element.classList.contains('fade'); this._queueCallback(() => this._destroyElement(), this._element, t); }

          _destroyElement() { this._element.remove(), P.trigger(this._element, Q), this.dispose(); }

          static jQueryInterface(t) { return this.each(function () { const e = X.getOrCreateInstance(this); if (typeof t === 'string') { if (void 0 === e[t] || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`); e[t](this); } }); }
        }q(X, 'close'), g(X); const Y = '[data-bs-toggle="button"]'; class U extends B {
          static get NAME() { return 'button'; }

          toggle() { this._element.setAttribute('aria-pressed', this._element.classList.toggle('active')); }

          static jQueryInterface(t) { return this.each(function () { const e = U.getOrCreateInstance(this); t === 'toggle' && e[t](); }); }
        }P.on(document, 'click.bs.button.data-api', Y, (t) => { t.preventDefault(); const e = t.target.closest(Y); U.getOrCreateInstance(e).toggle(); }), g(U); const G = '.bs.swipe'; const J = `touchstart${G}`; const Z = `touchmove${G}`; const tt = `touchend${G}`; const et = `pointerdown${G}`; const it = `pointerup${G}`; const nt = { endCallback: null, leftCallback: null, rightCallback: null }; const st = { endCallback: '(function|null)', leftCallback: '(function|null)', rightCallback: '(function|null)' }; class ot extends W {
          constructor(t, e) { super(), this._element = t, t && ot.isSupported() && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents()); }

          static get Default() { return nt; }

          static get DefaultType() { return st; }

          static get NAME() { return 'swipe'; }

          dispose() { P.off(this._element, G); }

          _start(t) { this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX; }

          _end(t) { this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), _(this._config.endCallback); }

          _move(t) { this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX; }

          _handleSwipe() { const t = Math.abs(this._deltaX); if (t <= 40) return; const e = t / this._deltaX; this._deltaX = 0, e && _(e > 0 ? this._config.rightCallback : this._config.leftCallback); }

          _initEvents() { this._supportPointerEvents ? (P.on(this._element, et, (t) => this._start(t)), P.on(this._element, it, (t) => this._end(t)), this._element.classList.add('pointer-event')) : (P.on(this._element, J, (t) => this._start(t)), P.on(this._element, Z, (t) => this._move(t)), P.on(this._element, tt, (t) => this._end(t))); }

          _eventIsPointerPenTouch(t) { return this._supportPointerEvents && (t.pointerType === 'pen' || t.pointerType === 'touch'); }

          static isSupported() { return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0; }
        } const rt = '.bs.carousel'; const at = '.data-api'; const lt = 'ArrowLeft'; const ct = 'ArrowRight'; const ht = 'next'; const dt = 'prev'; const ut = 'left'; const ft = 'right'; const pt = `slide${rt}`; const mt = `slid${rt}`; const gt = `keydown${rt}`; const _t = `mouseenter${rt}`; const bt = `mouseleave${rt}`; const vt = `dragstart${rt}`; const yt = `load${rt}${at}`; const wt = `click${rt}${at}`; const At = 'carousel'; const Et = 'active'; const Tt = '.active'; const Ct = '.carousel-item'; const Ot = Tt + Ct; const xt = { [lt]: ft, [ct]: ut }; const kt = {
          interval: 5e3, keyboard: !0, pause: 'hover', ride: !1, touch: !0, wrap: !0,
        }; const Lt = {
          interval: '(number|boolean)', keyboard: 'boolean', pause: '(string|boolean)', ride: '(boolean|string)', touch: 'boolean', wrap: 'boolean',
        }; class St extends B {
          constructor(t, e) { super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = R.findOne('.carousel-indicators', this._element), this._addEventListeners(), this._config.ride === At && this.cycle(); }

          static get Default() { return kt; }

          static get DefaultType() { return Lt; }

          static get NAME() { return 'carousel'; }

          next() { this._slide(ht); }

          nextWhenVisible() { !document.hidden && l(this._element) && this.next(); }

          prev() { this._slide(dt); }

          pause() { this._isSliding && o(this._element), this._clearInterval(); }

          cycle() { this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval); }

          _maybeEnableCycle() { this._config.ride && (this._isSliding ? P.one(this._element, mt, () => this.cycle()) : this.cycle()); }

          to(t) { const e = this._getItems(); if (t > e.length - 1 || t < 0) return; if (this._isSliding) return void P.one(this._element, mt, () => this.to(t)); const i = this._getItemIndex(this._getActive()); if (i === t) return; const n = t > i ? ht : dt; this._slide(n, e[t]); }

          dispose() { this._swipeHelper && this._swipeHelper.dispose(), super.dispose(); }

          _configAfterMerge(t) { return t.defaultInterval = t.interval, t; }

          _addEventListeners() { this._config.keyboard && P.on(this._element, gt, (t) => this._keydown(t)), this._config.pause === 'hover' && (P.on(this._element, _t, () => this.pause()), P.on(this._element, bt, () => this._maybeEnableCycle())), this._config.touch && ot.isSupported() && this._addTouchEventListeners(); }

          _addTouchEventListeners() { for (const t of R.find('.carousel-item img', this._element))P.on(t, vt, (t) => t.preventDefault()); const t = { leftCallback: () => this._slide(this._directionToOrder(ut)), rightCallback: () => this._slide(this._directionToOrder(ft)), endCallback: () => { this._config.pause === 'hover' && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval)); } }; this._swipeHelper = new ot(this._element, t); }

          _keydown(t) { if (/input|textarea/i.test(t.target.tagName)) return; const e = xt[t.key]; e && (t.preventDefault(), this._slide(this._directionToOrder(e))); }

          _getItemIndex(t) { return this._getItems().indexOf(t); }

          _setActiveIndicatorElement(t) { if (!this._indicatorsElement) return; const e = R.findOne(Tt, this._indicatorsElement); e.classList.remove(Et), e.removeAttribute('aria-current'); const i = R.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement); i && (i.classList.add(Et), i.setAttribute('aria-current', 'true')); }

          _updateInterval() { const t = this._activeElement || this._getActive(); if (!t) return; const e = Number.parseInt(t.getAttribute('data-bs-interval'), 10); this._config.interval = e || this._config.defaultInterval; }

          _slide(t, e = null) {
            if (this._isSliding) return; const i = this._getActive(); const n = t === ht; const s = e || v(this._getItems(), i, n, this._config.wrap); if (s === i) return; const o = this._getItemIndex(s); const r = (e) => P.trigger(this._element, e, {
              relatedTarget: s, direction: this._orderToDirection(t), from: this._getItemIndex(i), to: o,
            }); if (r(pt).defaultPrevented) return; if (!i || !s) return; const a = Boolean(this._interval); this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = s; const l = n ? 'carousel-item-start' : 'carousel-item-end'; const c = n ? 'carousel-item-next' : 'carousel-item-prev'; s.classList.add(c), u(s), i.classList.add(l), s.classList.add(l), this._queueCallback(() => { s.classList.remove(l, c), s.classList.add(Et), i.classList.remove(Et, c, l), this._isSliding = !1, r(mt); }, i, this._isAnimated()), a && this.cycle();
          }

          _isAnimated() { return this._element.classList.contains('slide'); }

          _getActive() { return R.findOne(Ot, this._element); }

          _getItems() { return R.find(Ct, this._element); }

          _clearInterval() { this._interval && (clearInterval(this._interval), this._interval = null); }

          _directionToOrder(t) { return m() ? t === ut ? dt : ht : t === ut ? ht : dt; }

          _orderToDirection(t) { return m() ? t === dt ? ut : ft : t === dt ? ft : ut; }

          static jQueryInterface(t) { return this.each(function () { const e = St.getOrCreateInstance(this, t); if (typeof t !== 'number') { if (typeof t === 'string') { if (void 0 === e[t] || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`); e[t](); } } else e.to(t); }); }
        }P.on(document, wt, '[data-bs-slide], [data-bs-slide-to]', function (t) { const e = R.getElementFromSelector(this); if (!e || !e.classList.contains(At)) return; t.preventDefault(); const i = St.getOrCreateInstance(e); const n = this.getAttribute('data-bs-slide-to'); return n ? (i.to(n), void i._maybeEnableCycle()) : H.getDataAttribute(this, 'slide') === 'next' ? (i.next(), void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle()); }), P.on(window, yt, () => { const t = R.find('[data-bs-ride="carousel"]'); for (const e of t)St.getOrCreateInstance(e); }), g(St); const Dt = '.bs.collapse'; const $t = `show${Dt}`; const It = `shown${Dt}`; const Nt = `hide${Dt}`; const Pt = `hidden${Dt}`; const jt = `click${Dt}.data-api`; const Mt = 'show'; const Ft = 'collapse'; const Ht = 'collapsing'; const Wt = `:scope .${Ft} .${Ft}`; const Bt = '[data-bs-toggle="collapse"]'; const zt = { parent: null, toggle: !0 }; const Rt = { parent: '(null|element)', toggle: 'boolean' }; class qt extends B {
          constructor(t, e) { super(t, e), this._isTransitioning = !1, this._triggerArray = []; const i = R.find(Bt); for (const t of i) { const e = R.getSelectorFromElement(t); const i = R.find(e).filter((t) => t === this._element); e !== null && i.length && this._triggerArray.push(t); } this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle(); }

          static get Default() { return zt; }

          static get DefaultType() { return Rt; }

          static get NAME() { return 'collapse'; }

          toggle() { this._isShown() ? this.hide() : this.show(); }

          show() { if (this._isTransitioning || this._isShown()) return; let t = []; if (this._config.parent && (t = this._getFirstLevelChildren('.collapse.show, .collapse.collapsing').filter((t) => t !== this._element).map((t) => qt.getOrCreateInstance(t, { toggle: !1 }))), t.length && t[0]._isTransitioning) return; if (P.trigger(this._element, $t).defaultPrevented) return; for (const e of t)e.hide(); const e = this._getDimension(); this._element.classList.remove(Ft), this._element.classList.add(Ht), this._element.style[e] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0; const i = `scroll${e[0].toUpperCase() + e.slice(1)}`; this._queueCallback(() => { this._isTransitioning = !1, this._element.classList.remove(Ht), this._element.classList.add(Ft, Mt), this._element.style[e] = '', P.trigger(this._element, It); }, this._element, !0), this._element.style[e] = `${this._element[i]}px`; }

          hide() { if (this._isTransitioning || !this._isShown()) return; if (P.trigger(this._element, Nt).defaultPrevented) return; const t = this._getDimension(); this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, u(this._element), this._element.classList.add(Ht), this._element.classList.remove(Ft, Mt); for (const t of this._triggerArray) { const e = R.getElementFromSelector(t); e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1); } this._isTransitioning = !0, this._element.style[t] = '', this._queueCallback(() => { this._isTransitioning = !1, this._element.classList.remove(Ht), this._element.classList.add(Ft), P.trigger(this._element, Pt); }, this._element, !0); }

          _isShown(t = this._element) { return t.classList.contains(Mt); }

          _configAfterMerge(t) { return t.toggle = Boolean(t.toggle), t.parent = a(t.parent), t; }

          _getDimension() { return this._element.classList.contains('collapse-horizontal') ? 'width' : 'height'; }

          _initializeChildren() { if (!this._config.parent) return; const t = this._getFirstLevelChildren(Bt); for (const e of t) { const t = R.getElementFromSelector(e); t && this._addAriaAndCollapsedClass([e], this._isShown(t)); } }

          _getFirstLevelChildren(t) { const e = R.find(Wt, this._config.parent); return R.find(t, this._config.parent).filter((t) => !e.includes(t)); }

          _addAriaAndCollapsedClass(t, e) { if (t.length) for (const i of t)i.classList.toggle('collapsed', !e), i.setAttribute('aria-expanded', e); }

          static jQueryInterface(t) { const e = {}; return typeof t === 'string' && /show|hide/.test(t) && (e.toggle = !1), this.each(function () { const i = qt.getOrCreateInstance(this, e); if (typeof t === 'string') { if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`); i[t](); } }); }
        }P.on(document, jt, Bt, function (t) { (t.target.tagName === 'A' || t.delegateTarget && t.delegateTarget.tagName === 'A') && t.preventDefault(); for (const t of R.getMultipleElementsFromSelector(this))qt.getOrCreateInstance(t, { toggle: !1 }).toggle(); }), g(qt); const Vt = 'top'; const Kt = 'bottom'; const Qt = 'right'; const Xt = 'left'; const Yt = 'auto'; const Ut = [Vt, Kt, Qt, Xt]; const Gt = 'start'; const Jt = 'end'; const Zt = 'clippingParents'; const te = 'viewport'; const ee = 'popper'; const ie = 'reference'; const ne = Ut.reduce((t, e) => t.concat([`${e}-${Gt}`, `${e}-${Jt}`]), []); const se = [].concat(Ut, [Yt]).reduce((t, e) => t.concat([e, `${e}-${Gt}`, `${e}-${Jt}`]), []); const oe = 'beforeRead'; const re = 'read'; const ae = 'afterRead'; const le = 'beforeMain'; const ce = 'main'; const he = 'afterMain'; const de = 'beforeWrite'; const ue = 'write'; const fe = 'afterWrite'; const pe = [oe, re, ae, le, ce, he, de, ue, fe]; function me(t) { return t ? (t.nodeName || '').toLowerCase() : null; } function ge(t) { if (t == null) return window; if (t.toString() !== '[object Window]') { const e = t.ownerDocument; return e && e.defaultView || window; } return t; } function _e(t) { return t instanceof ge(t).Element || t instanceof Element; } function be(t) { return t instanceof ge(t).HTMLElement || t instanceof HTMLElement; } function ve(t) { return typeof ShadowRoot !== 'undefined' && (t instanceof ge(t).ShadowRoot || t instanceof ShadowRoot); } const ye = {
          name: 'applyStyles',
          enabled: !0,
          phase: 'write',
          fn(t) { const e = t.state; Object.keys(e.elements).forEach((t) => { const i = e.styles[t] || {}; const n = e.attributes[t] || {}; const s = e.elements[t]; be(s) && me(s) && (Object.assign(s.style, i), Object.keys(n).forEach((t) => { const e = n[t]; !1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? '' : e); })); }); },
          effect(t) {
            const e = t.state; const i = {
              popper: {
                position: e.options.strategy, left: '0', top: '0', margin: '0',
              },
              arrow: { position: 'absolute' },
              reference: {},
            }; return Object.assign(e.elements.popper.style, i.popper), e.styles = i, e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow), function () { Object.keys(e.elements).forEach((t) => { const n = e.elements[t]; const s = e.attributes[t] || {}; const o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce((t, e) => (t[e] = '', t), {}); be(n) && me(n) && (Object.assign(n.style, o), Object.keys(s).forEach((t) => { n.removeAttribute(t); })); }); };
          },
          requires: ['computeStyles'],
        }; function we(t) { return t.split('-')[0]; } const Ae = Math.max; const Ee = Math.min; const Te = Math.round; function Ce() { const t = navigator.userAgentData; return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map((t) => `${t.brand}/${t.version}`).join(' ') : navigator.userAgent; } function Oe() { return !/^((?!chrome|android).)*safari/i.test(Ce()); } function xe(t, e, i) {
          void 0 === e && (e = !1), void 0 === i && (i = !1); const n = t.getBoundingClientRect(); let s = 1; let o = 1; e && be(t) && (s = t.offsetWidth > 0 && Te(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && Te(n.height) / t.offsetHeight || 1); const r = (_e(t) ? ge(t) : window).visualViewport; const a = !Oe() && i; const l = (n.left + (a && r ? r.offsetLeft : 0)) / s; const c = (n.top + (a && r ? r.offsetTop : 0)) / o; const h = n.width / s; const d = n.height / o; return {
            width: h, height: d, top: c, right: l + h, bottom: c + d, left: l, x: l, y: c,
          };
        } function ke(t) {
          const e = xe(t); let i = t.offsetWidth; let n = t.offsetHeight; return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
            x: t.offsetLeft, y: t.offsetTop, width: i, height: n,
          };
        } function Le(t, e) { const i = e.getRootNode && e.getRootNode(); if (t.contains(e)) return !0; if (i && ve(i)) { let n = e; do { if (n && t.isSameNode(n)) return !0; n = n.parentNode || n.host; } while (n); } return !1; } function Se(t) { return ge(t).getComputedStyle(t); } function De(t) { return ['table', 'td', 'th'].indexOf(me(t)) >= 0; } function $e(t) { return ((_e(t) ? t.ownerDocument : t.document) || window.document).documentElement; } function Ie(t) { return me(t) === 'html' ? t : t.assignedSlot || t.parentNode || (ve(t) ? t.host : null) || $e(t); } function Ne(t) { return be(t) && Se(t).position !== 'fixed' ? t.offsetParent : null; } function Pe(t) { for (var e = ge(t), i = Ne(t); i && De(i) && Se(i).position === 'static';)i = Ne(i); return i && (me(i) === 'html' || me(i) === 'body' && Se(i).position === 'static') ? e : i || (function (t) { const e = /firefox/i.test(Ce()); if (/Trident/i.test(Ce()) && be(t) && Se(t).position === 'fixed') return null; let i = Ie(t); for (ve(i) && (i = i.host); be(i) && ['html', 'body'].indexOf(me(i)) < 0;) { const n = Se(i); if (n.transform !== 'none' || n.perspective !== 'none' || n.contain === 'paint' || ['transform', 'perspective'].indexOf(n.willChange) !== -1 || e && n.willChange === 'filter' || e && n.filter && n.filter !== 'none') return i; i = i.parentNode; } return null; }(t)) || e; } function je(t) { return ['top', 'bottom'].indexOf(t) >= 0 ? 'x' : 'y'; } function Me(t, e, i) { return Ae(t, Ee(e, i)); } function Fe(t) {
          return {
            top: 0, right: 0, bottom: 0, left: 0, ...t,
          };
        } function He(t, e) { return e.reduce((e, i) => (e[i] = t, e), {}); } const We = {
          name: 'arrow', enabled: !0, phase: 'main', fn(t) { let e; const i = t.state; const n = t.name; const s = t.options; const o = i.elements.arrow; const r = i.modifiersData.popperOffsets; const a = we(i.placement); const l = je(a); const c = [Xt, Qt].indexOf(a) >= 0 ? 'height' : 'width'; if (o && r) { const h = (function (t, e) { return Fe(typeof (t = typeof t === 'function' ? t({ ...e.rects, placement: e.placement }) : t) !== 'number' ? t : He(t, Ut)); }(s.padding, i)); const d = ke(o); const u = l === 'y' ? Vt : Xt; const f = l === 'y' ? Kt : Qt; const p = i.rects.reference[c] + i.rects.reference[l] - r[l] - i.rects.popper[c]; const m = r[l] - i.rects.reference[l]; const g = Pe(o); const _ = g ? l === 'y' ? g.clientHeight || 0 : g.clientWidth || 0 : 0; const b = p / 2 - m / 2; const v = h[u]; const y = _ - d[c] - h[f]; const w = _ / 2 - d[c] / 2 + b; const A = Me(v, w, y); const E = l; i.modifiersData[n] = ((e = {})[E] = A, e.centerOffset = A - w, e); } }, effect(t) { const e = t.state; const i = t.options.element; let n = void 0 === i ? '[data-popper-arrow]' : i; n != null && (typeof n !== 'string' || (n = e.elements.popper.querySelector(n))) && Le(e.elements.popper, n) && (e.elements.arrow = n); }, requires: ['popperOffsets'], requiresIfExists: ['preventOverflow'],
        }; function Be(t) { return t.split('-')[1]; } const ze = {
          top: 'auto', right: 'auto', bottom: 'auto', left: 'auto',
        }; function Re(t) { let e; const i = t.popper; const n = t.popperRect; const s = t.placement; const o = t.variation; const r = t.offsets; const a = t.position; const l = t.gpuAcceleration; const c = t.adaptive; const h = t.roundOffsets; const d = t.isFixed; const u = r.x; let f = void 0 === u ? 0 : u; const p = r.y; let m = void 0 === p ? 0 : p; const g = typeof h === 'function' ? h({ x: f, y: m }) : { x: f, y: m }; f = g.x, m = g.y; const _ = r.hasOwnProperty('x'); const b = r.hasOwnProperty('y'); let v = Xt; let y = Vt; const w = window; if (c) { let A = Pe(i); let E = 'clientHeight'; let T = 'clientWidth'; A === ge(i) && Se(A = $e(i)).position !== 'static' && a === 'absolute' && (E = 'scrollHeight', T = 'scrollWidth'), (s === Vt || (s === Xt || s === Qt) && o === Jt) && (y = Kt, m -= (d && A === w && w.visualViewport ? w.visualViewport.height : A[E]) - n.height, m *= l ? 1 : -1), s !== Xt && (s !== Vt && s !== Kt || o !== Jt) || (v = Qt, f -= (d && A === w && w.visualViewport ? w.visualViewport.width : A[T]) - n.width, f *= l ? 1 : -1); } let C; const O = { position: a, ...c && ze }; const x = !0 === h ? (function (t, e) { const i = t.x; const n = t.y; const s = e.devicePixelRatio || 1; return { x: Te(i * s) / s || 0, y: Te(n * s) / s || 0 }; }({ x: f, y: m }, ge(i))) : { x: f, y: m }; return f = x.x, m = x.y, l ? ({ ...O, ...((C = {})[y] = b ? '0' : '', C[v] = _ ? '0' : '', C.transform = (w.devicePixelRatio || 1) <= 1 ? `translate(${f}px, ${m}px)` : `translate3d(${f}px, ${m}px, 0)`, C) }) : ({ ...O, ...((e = {})[y] = b ? `${m}px` : '', e[v] = _ ? `${f}px` : '', e.transform = '', e) }); } const qe = {
          name: 'computeStyles',
          enabled: !0,
          phase: 'beforeWrite',
          fn(t) {
            const e = t.state; const i = t.options; const n = i.gpuAcceleration; const s = void 0 === n || n; const o = i.adaptive; const r = void 0 === o || o; const a = i.roundOffsets; const l = void 0 === a || a; const c = {
              placement: we(e.placement), variation: Be(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: s, isFixed: e.options.strategy === 'fixed',
            }; e.modifiersData.popperOffsets != null && (e.styles.popper = {
              ...e.styles.popper,
              ...Re({
                ...c, offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: r, roundOffsets: l,
              }),
            }), e.modifiersData.arrow != null && (e.styles.arrow = {
              ...e.styles.arrow,
              ...Re({
                ...c, offsets: e.modifiersData.arrow, position: 'absolute', adaptive: !1, roundOffsets: l,
              }),
            }), e.attributes.popper = { ...e.attributes.popper, 'data-popper-placement': e.placement };
          },
          data: {},
        }; const Ve = { passive: !0 }; const Ke = {
          name: 'eventListeners', enabled: !0, phase: 'write', fn() {}, effect(t) { const e = t.state; const i = t.instance; const n = t.options; const s = n.scroll; const o = void 0 === s || s; const r = n.resize; const a = void 0 === r || r; const l = ge(e.elements.popper); const c = [].concat(e.scrollParents.reference, e.scrollParents.popper); return o && c.forEach((t) => { t.addEventListener('scroll', i.update, Ve); }), a && l.addEventListener('resize', i.update, Ve), function () { o && c.forEach((t) => { t.removeEventListener('scroll', i.update, Ve); }), a && l.removeEventListener('resize', i.update, Ve); }; }, data: {},
        }; const Qe = {
          left: 'right', right: 'left', bottom: 'top', top: 'bottom',
        }; function Xe(t) { return t.replace(/left|right|bottom|top/g, (t) => Qe[t]); } const Ye = { start: 'end', end: 'start' }; function Ue(t) { return t.replace(/start|end/g, (t) => Ye[t]); } function Ge(t) { const e = ge(t); return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset }; } function Je(t) { return xe($e(t)).left + Ge(t).scrollLeft; } function Ze(t) { const e = Se(t); const i = e.overflow; const n = e.overflowX; const s = e.overflowY; return /auto|scroll|overlay|hidden/.test(i + s + n); } function ti(t) { return ['html', 'body', '#document'].indexOf(me(t)) >= 0 ? t.ownerDocument.body : be(t) && Ze(t) ? t : ti(Ie(t)); } function ei(t, e) { let i; void 0 === e && (e = []); const n = ti(t); const s = n === ((i = t.ownerDocument) == null ? void 0 : i.body); const o = ge(n); const r = s ? [o].concat(o.visualViewport || [], Ze(n) ? n : []) : n; const a = e.concat(r); return s ? a : a.concat(ei(Ie(r))); } function ii(t) {
          return {
            ...t, left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height,
          };
        } function ni(t, e, i) {
          return e === te ? ii(function (t, e) {
            const i = ge(t); const n = $e(t); const s = i.visualViewport; let o = n.clientWidth; let r = n.clientHeight; let a = 0; let l = 0; if (s) { o = s.width, r = s.height; const c = Oe(); (c || !c && e === 'fixed') && (a = s.offsetLeft, l = s.offsetTop); } return {
              width: o, height: r, x: a + Je(t), y: l,
            };
          }(t, i)) : _e(e) ? (function (t, e) { const i = xe(t, !1, e === 'fixed'); return i.top += t.clientTop, i.left += t.clientLeft, i.bottom = i.top + t.clientHeight, i.right = i.left + t.clientWidth, i.width = t.clientWidth, i.height = t.clientHeight, i.x = i.left, i.y = i.top, i; }(e, i)) : ii(function (t) {
            let e; const i = $e(t); const n = Ge(t); const s = (e = t.ownerDocument) == null ? void 0 : e.body; const o = Ae(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0); const r = Ae(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0); let a = -n.scrollLeft + Je(t); const l = -n.scrollTop; return Se(s || i).direction === 'rtl' && (a += Ae(i.clientWidth, s ? s.clientWidth : 0) - o), {
              width: o, height: r, x: a, y: l,
            };
          }($e(t)));
        } function si(t) { let e; const i = t.reference; const n = t.element; const s = t.placement; const o = s ? we(s) : null; const r = s ? Be(s) : null; const a = i.x + i.width / 2 - n.width / 2; const l = i.y + i.height / 2 - n.height / 2; switch (o) { case Vt: e = { x: a, y: i.y - n.height }; break; case Kt: e = { x: a, y: i.y + i.height }; break; case Qt: e = { x: i.x + i.width, y: l }; break; case Xt: e = { x: i.x - n.width, y: l }; break; default: e = { x: i.x, y: i.y }; } const c = o ? je(o) : null; if (c != null) { const h = c === 'y' ? 'height' : 'width'; switch (r) { case Gt: e[c] = e[c] - (i[h] / 2 - n[h] / 2); break; case Jt: e[c] = e[c] + (i[h] / 2 - n[h] / 2); } } return e; } function oi(t, e) {
          void 0 === e && (e = {}); const i = e; const n = i.placement; const s = void 0 === n ? t.placement : n; const o = i.strategy; const r = void 0 === o ? t.strategy : o; const a = i.boundary; const l = void 0 === a ? Zt : a; const c = i.rootBoundary; const h = void 0 === c ? te : c; const d = i.elementContext; const u = void 0 === d ? ee : d; const f = i.altBoundary; const p = void 0 !== f && f; const m = i.padding; const g = void 0 === m ? 0 : m; const _ = Fe(typeof g !== 'number' ? g : He(g, Ut)); const b = u === ee ? ie : ee; const v = t.rects.popper; const y = t.elements[p ? b : u]; const w = (function (t, e, i, n) { const s = e === 'clippingParents' ? (function (t) { const e = ei(Ie(t)); const i = ['absolute', 'fixed'].indexOf(Se(t).position) >= 0 && be(t) ? Pe(t) : t; return _e(i) ? e.filter((t) => _e(t) && Le(t, i) && me(t) !== 'body') : []; }(t)) : [].concat(e); const o = [].concat(s, [i]); const r = o[0]; const a = o.reduce((e, i) => { const s = ni(t, i, n); return e.top = Ae(s.top, e.top), e.right = Ee(s.right, e.right), e.bottom = Ee(s.bottom, e.bottom), e.left = Ae(s.left, e.left), e; }, ni(t, r, n)); return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a; }(_e(y) ? y : y.contextElement || $e(t.elements.popper), l, h, r)); const A = xe(t.elements.reference); const E = si({ reference: A, element: v, placement: s }); const T = ii({ ...v, ...E }); const C = u === ee ? T : A; const O = {
            top: w.top - C.top + _.top, bottom: C.bottom - w.bottom + _.bottom, left: w.left - C.left + _.left, right: C.right - w.right + _.right,
          }; const x = t.modifiersData.offset; if (u === ee && x) { const k = x[s]; Object.keys(O).forEach((t) => { const e = [Qt, Kt].indexOf(t) >= 0 ? 1 : -1; const i = [Vt, Kt].indexOf(t) >= 0 ? 'y' : 'x'; O[t] += k[i] * e; }); } return O;
        } const ri = {
          name: 'flip',
          enabled: !0,
          phase: 'main',
          fn(t) {
            const e = t.state; const i = t.options; const n = t.name; if (!e.modifiersData[n]._skip) {
              for (var s = i.mainAxis, o = void 0 === s || s, r = i.altAxis, a = void 0 === r || r, l = i.fallbackPlacements, c = i.padding, h = i.boundary, d = i.rootBoundary, u = i.altBoundary, f = i.flipVariations, p = void 0 === f || f, m = i.allowedAutoPlacements, g = e.options.placement, _ = we(g), b = l || (_ !== g && p ? (function (t) { if (we(t) === Yt) return []; const e = Xe(t); return [Ue(t), e, Ue(e)]; }(g)) : [Xe(g)]), v = [g].concat(b).reduce((t, i) => t.concat(we(i) === Yt ? (function (t, e) {
                  void 0 === e && (e = {}); const i = e; const n = i.placement; const s = i.boundary; const o = i.rootBoundary; const r = i.padding; const a = i.flipVariations; const l = i.allowedAutoPlacements; const c = void 0 === l ? se : l; const h = Be(n); const d = h ? a ? ne : ne.filter((t) => Be(t) === h) : Ut; let u = d.filter((t) => c.indexOf(t) >= 0); u.length === 0 && (u = d); const f = u.reduce((e, i) => (e[i] = oi(t, {
                    placement: i, boundary: s, rootBoundary: o, padding: r,
                  })[we(i)], e), {}); return Object.keys(f).sort((t, e) => f[t] - f[e]);
                }(e, {
                  placement: i, boundary: h, rootBoundary: d, padding: c, flipVariations: p, allowedAutoPlacements: m,
                })) : i), []), y = e.rects.reference, w = e.rects.popper, A = new Map(), E = !0, T = v[0], C = 0; C < v.length; C++) {
                const O = v[C]; const x = we(O); const k = Be(O) === Gt; const L = [Vt, Kt].indexOf(x) >= 0; const S = L ? 'width' : 'height'; const D = oi(e, {
                  placement: O, boundary: h, rootBoundary: d, altBoundary: u, padding: c,
                }); let $ = L ? k ? Qt : Xt : k ? Kt : Vt; y[S] > w[S] && ($ = Xe($)); const I = Xe($); const N = []; if (o && N.push(D[x] <= 0), a && N.push(D[$] <= 0, D[I] <= 0), N.every((t) => t)) { T = O, E = !1; break; }A.set(O, N);
              } if (E) for (let P = function (t) { const e = v.find((e) => { const i = A.get(e); if (i) return i.slice(0, t).every((t) => t); }); if (e) return T = e, 'break'; }, j = p ? 3 : 1; j > 0 && P(j) !== 'break'; j--);e.placement !== T && (e.modifiersData[n]._skip = !0, e.placement = T, e.reset = !0);
            }
          },
          requiresIfExists: ['offset'],
          data: { _skip: !1 },
        }; function ai(t, e, i) {
          return void 0 === i && (i = { x: 0, y: 0 }), {
            top: t.top - e.height - i.y, right: t.right - e.width + i.x, bottom: t.bottom - e.height + i.y, left: t.left - e.width - i.x,
          };
        } function li(t) { return [Vt, Qt, Kt, Xt].some((e) => t[e] >= 0); } const ci = {
          name: 'hide',
          enabled: !0,
          phase: 'main',
          requiresIfExists: ['preventOverflow'],
          fn(t) {
            const e = t.state; const i = t.name; const n = e.rects.reference; const s = e.rects.popper; const o = e.modifiersData.preventOverflow; const r = oi(e, { elementContext: 'reference' }); const a = oi(e, { altBoundary: !0 }); const l = ai(r, n); const c = ai(a, s, o); const h = li(l); const d = li(c); e.modifiersData[i] = {
              referenceClippingOffsets: l, popperEscapeOffsets: c, isReferenceHidden: h, hasPopperEscaped: d,
            }, e.attributes.popper = { ...e.attributes.popper, 'data-popper-reference-hidden': h, 'data-popper-escaped': d };
          },
        }; const hi = {
          name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn(t) { const e = t.state; const i = t.options; const n = t.name; const s = i.offset; const o = void 0 === s ? [0, 0] : s; const r = se.reduce((t, i) => (t[i] = (function (t, e, i) { const n = we(t); const s = [Xt, Vt].indexOf(n) >= 0 ? -1 : 1; const o = typeof i === 'function' ? i({ ...e, placement: t }) : i; let r = o[0]; let a = o[1]; return r = r || 0, a = (a || 0) * s, [Xt, Qt].indexOf(n) >= 0 ? { x: a, y: r } : { x: r, y: a }; }(i, e.rects, o)), t), {}); const a = r[e.placement]; const l = a.x; const c = a.y; e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = r; },
        }; const di = {
          name: 'popperOffsets', enabled: !0, phase: 'read', fn(t) { const e = t.state; const i = t.name; e.modifiersData[i] = si({ reference: e.rects.reference, element: e.rects.popper, placement: e.placement }); }, data: {},
        }; const ui = {
          name: 'preventOverflow',
          enabled: !0,
          phase: 'main',
          fn(t) {
            const e = t.state; const i = t.options; const n = t.name; const s = i.mainAxis; const o = void 0 === s || s; const r = i.altAxis; const a = void 0 !== r && r; const l = i.boundary; const c = i.rootBoundary; const h = i.altBoundary; const d = i.padding; const u = i.tether; const f = void 0 === u || u; const p = i.tetherOffset; const m = void 0 === p ? 0 : p; const g = oi(e, {
              boundary: l, rootBoundary: c, padding: d, altBoundary: h,
            }); const _ = we(e.placement); const b = Be(e.placement); const v = !b; const y = je(_); const w = y === 'x' ? 'y' : 'x'; const A = e.modifiersData.popperOffsets; const E = e.rects.reference; const T = e.rects.popper; const C = typeof m === 'function' ? m({ ...e.rects, placement: e.placement }) : m; const O = typeof C === 'number' ? { mainAxis: C, altAxis: C } : ({ mainAxis: 0, altAxis: 0, ...C }); const x = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null; const k = { x: 0, y: 0 }; if (A) {
              if (o) {
                let L; const S = y === 'y' ? Vt : Xt; const D = y === 'y' ? Kt : Qt; const $ = y === 'y' ? 'height' : 'width'; const I = A[y]; const N = I + g[S]; const P = I - g[D]; const j = f ? -T[$] / 2 : 0; const M = b === Gt ? E[$] : T[$]; const F = b === Gt ? -T[$] : -E[$]; const H = e.elements.arrow; const W = f && H ? ke(H) : { width: 0, height: 0 }; const B = e.modifiersData['arrow#persistent'] ? e.modifiersData['arrow#persistent'].padding : {
                  top: 0, right: 0, bottom: 0, left: 0,
                }; const z = B[S]; const R = B[D]; const q = Me(0, E[$], W[$]); const V = v ? E[$] / 2 - j - q - z - O.mainAxis : M - q - z - O.mainAxis; const K = v ? -E[$] / 2 + j + q + R + O.mainAxis : F + q + R + O.mainAxis; const Q = e.elements.arrow && Pe(e.elements.arrow); const X = Q ? y === 'y' ? Q.clientTop || 0 : Q.clientLeft || 0 : 0; const Y = (L = x == null ? void 0 : x[y]) != null ? L : 0; const U = I + K - Y; const G = Me(f ? Ee(N, I + V - Y - X) : N, I, f ? Ae(P, U) : P); A[y] = G, k[y] = G - I;
              } if (a) { let J; const Z = y === 'x' ? Vt : Xt; const tt = y === 'x' ? Kt : Qt; const et = A[w]; const it = w === 'y' ? 'height' : 'width'; const nt = et + g[Z]; const st = et - g[tt]; const ot = [Vt, Xt].indexOf(_) !== -1; const rt = (J = x == null ? void 0 : x[w]) != null ? J : 0; const at = ot ? nt : et - E[it] - T[it] - rt + O.altAxis; const lt = ot ? et + E[it] + T[it] - rt - O.altAxis : st; const ct = f && ot ? (function (t, e, i) { const n = Me(t, e, i); return n > i ? i : n; }(at, et, lt)) : Me(f ? at : nt, et, f ? lt : st); A[w] = ct, k[w] = ct - et; }e.modifiersData[n] = k;
            }
          },
          requiresIfExists: ['offset'],
        }; function fi(t, e, i) {
          void 0 === i && (i = !1); let n; let s; const o = be(e); const r = be(e) && (function (t) { const e = t.getBoundingClientRect(); const i = Te(e.width) / t.offsetWidth || 1; const n = Te(e.height) / t.offsetHeight || 1; return i !== 1 || n !== 1; }(e)); const a = $e(e); const l = xe(t, r, i); let c = { scrollLeft: 0, scrollTop: 0 }; let h = { x: 0, y: 0 }; return (o || !o && !i) && ((me(e) !== 'body' || Ze(a)) && (c = (n = e) !== ge(n) && be(n) ? { scrollLeft: (s = n).scrollLeft, scrollTop: s.scrollTop } : Ge(n)), be(e) ? ((h = xe(e, !0)).x += e.clientLeft, h.y += e.clientTop) : a && (h.x = Je(a))), {
            x: l.left + c.scrollLeft - h.x, y: l.top + c.scrollTop - h.y, width: l.width, height: l.height,
          };
        } function pi(t) {
          const e = new Map(); const i = new Set(); const
            n = []; function s(t) { i.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((t) => { if (!i.has(t)) { const n = e.get(t); n && s(n); } }), n.push(t); } return t.forEach((t) => { e.set(t.name, t); }), t.forEach((t) => { i.has(t.name) || s(t); }), n;
        } const mi = { placement: 'bottom', modifiers: [], strategy: 'absolute' }; function gi() { for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)e[i] = arguments[i]; return !e.some((t) => !(t && typeof t.getBoundingClientRect === 'function')); } function _i(t) {
          void 0 === t && (t = {}); const e = t; const i = e.defaultModifiers; const n = void 0 === i ? [] : i; const s = e.defaultOptions; const o = void 0 === s ? mi : s; return function (t, e, i) {
            void 0 === i && (i = o); let s; let r; let a = {
              placement: 'bottom', orderedModifiers: [], options: { ...mi, ...o }, modifiersData: {}, elements: { reference: t, popper: e }, attributes: {}, styles: {},
            }; let l = []; let c = !1; var h = {
              state: a,
              setOptions(i) {
                const s = typeof i === 'function' ? i(a.options) : i; d(), a.options = { ...o, ...a.options, ...s }, a.scrollParents = { reference: _e(t) ? ei(t) : t.contextElement ? ei(t.contextElement) : [], popper: ei(e) }; let r; let c; const u = (function (t) { const e = pi(t); return pe.reduce((t, i) => t.concat(e.filter((t) => t.phase === i)), []); }((r = [].concat(n, a.options.modifiers), c = r.reduce((t, e) => {
                  const i = t[e.name]; return t[e.name] = i ? ({
                    ...i, ...e, options: { ...i.options, ...e.options }, data: { ...i.data, ...e.data },
                  }) : e, t;
                }, {}), Object.keys(c).map((t) => c[t])))); return a.orderedModifiers = u.filter((t) => t.enabled), a.orderedModifiers.forEach((t) => {
                  const e = t.name; const i = t.options; const n = void 0 === i ? {} : i; const s = t.effect; if (typeof s === 'function') {
                    const o = s({
                      state: a, name: e, instance: h, options: n,
                    }); l.push(o || (() => {}));
                  }
                }), h.update();
              },
              forceUpdate() {
                if (!c) {
                  const t = a.elements; const e = t.reference; const i = t.popper; if (gi(e, i)) {
                    a.rects = { reference: fi(e, Pe(i), a.options.strategy === 'fixed'), popper: ke(i) }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((t) => a.modifiersData[t.name] = { ...t.data }); for (let n = 0; n < a.orderedModifiers.length; n++) {
                      if (!0 !== a.reset) {
                        const s = a.orderedModifiers[n]; const o = s.fn; const r = s.options; const l = void 0 === r ? {} : r; const d = s.name; typeof o === 'function' && (a = o({
                          state: a, options: l, name: d, instance: h,
                        }) || a);
                      } else a.reset = !1, n = -1;
                    }
                  }
                }
              },
              update: (s = function () { return new Promise((t) => { h.forceUpdate(), t(a); }); }, function () { return r || (r = new Promise((t) => { Promise.resolve().then(() => { r = void 0, t(s()); }); })), r; }),
              destroy() { d(), c = !0; },
            }; if (!gi(t, e)) return h; function d() { l.forEach((t) => t()), l = []; } return h.setOptions(i).then((t) => { !c && i.onFirstUpdate && i.onFirstUpdate(t); }), h;
          };
        } const bi = _i(); const vi = _i({ defaultModifiers: [Ke, di, qe, ye] }); const yi = _i({ defaultModifiers: [Ke, di, qe, ye, hi, ri, ui, We, ci] }); const wi = Object.freeze(Object.defineProperty({
          __proto__: null, afterMain: he, afterRead: ae, afterWrite: fe, applyStyles: ye, arrow: We, auto: Yt, basePlacements: Ut, beforeMain: le, beforeRead: oe, beforeWrite: de, bottom: Kt, clippingParents: Zt, computeStyles: qe, createPopper: yi, createPopperBase: bi, createPopperLite: vi, detectOverflow: oi, end: Jt, eventListeners: Ke, flip: ri, hide: ci, left: Xt, main: ce, modifierPhases: pe, offset: hi, placements: se, popper: ee, popperGenerator: _i, popperOffsets: di, preventOverflow: ui, read: re, reference: ie, right: Qt, start: Gt, top: Vt, variationPlacements: ne, viewport: te, write: ue,
        }, Symbol.toStringTag, { value: 'Module' })); const Ai = 'dropdown'; const Ei = '.bs.dropdown'; const Ti = '.data-api'; const Ci = 'ArrowUp'; const Oi = 'ArrowDown'; const xi = `hide${Ei}`; const ki = `hidden${Ei}`; const Li = `show${Ei}`; const Si = `shown${Ei}`; const Di = `click${Ei}${Ti}`; const $i = `keydown${Ei}${Ti}`; const Ii = `keyup${Ei}${Ti}`; const Ni = 'show'; const Pi = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)'; const ji = `${Pi}.${Ni}`; const Mi = '.dropdown-menu'; const Fi = m() ? 'top-end' : 'top-start'; const Hi = m() ? 'top-start' : 'top-end'; const Wi = m() ? 'bottom-end' : 'bottom-start'; const Bi = m() ? 'bottom-start' : 'bottom-end'; const zi = m() ? 'left-start' : 'right-start'; const Ri = m() ? 'right-start' : 'left-start'; const qi = {
          autoClose: !0, boundary: 'clippingParents', display: 'dynamic', offset: [0, 2], popperConfig: null, reference: 'toggle',
        }; const Vi = {
          autoClose: '(boolean|string)', boundary: '(string|element)', display: 'string', offset: '(array|string|function)', popperConfig: '(null|object|function)', reference: '(string|element|object)',
        }; class Ki extends B {
          constructor(t, e) { super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = R.next(this._element, Mi)[0] || R.prev(this._element, Mi)[0] || R.findOne(Mi, this._parent), this._inNavbar = this._detectNavbar(); }

          static get Default() { return qi; }

          static get DefaultType() { return Vi; }

          static get NAME() { return Ai; }

          toggle() { return this._isShown() ? this.hide() : this.show(); }

          show() { if (c(this._element) || this._isShown()) return; const t = { relatedTarget: this._element }; if (!P.trigger(this._element, Li, t).defaultPrevented) { if (this._createPopper(), 'ontouchstart' in document.documentElement && !this._parent.closest('.navbar-nav')) for (const t of [].concat(...document.body.children))P.on(t, 'mouseover', d); this._element.focus(), this._element.setAttribute('aria-expanded', !0), this._menu.classList.add(Ni), this._element.classList.add(Ni), P.trigger(this._element, Si, t); } }

          hide() { if (c(this._element) || !this._isShown()) return; const t = { relatedTarget: this._element }; this._completeHide(t); }

          dispose() { this._popper && this._popper.destroy(), super.dispose(); }

          update() { this._inNavbar = this._detectNavbar(), this._popper && this._popper.update(); }

          _completeHide(t) { if (!P.trigger(this._element, xi, t).defaultPrevented) { if ('ontouchstart' in document.documentElement) for (const t of [].concat(...document.body.children))P.off(t, 'mouseover', d); this._popper && this._popper.destroy(), this._menu.classList.remove(Ni), this._element.classList.remove(Ni), this._element.setAttribute('aria-expanded', 'false'), H.removeDataAttribute(this._menu, 'popper'), P.trigger(this._element, ki, t); } }

          _getConfig(t) { if (typeof (t = super._getConfig(t)).reference === 'object' && !r(t.reference) && typeof t.reference.getBoundingClientRect !== 'function') throw new TypeError(`${Ai.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`); return t; }

          _createPopper() { if (void 0 === wi) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)"); let t = this._element; this._config.reference === 'parent' ? t = this._parent : r(this._config.reference) ? t = a(this._config.reference) : typeof this._config.reference === 'object' && (t = this._config.reference); const e = this._getPopperConfig(); this._popper = yi(t, this._menu, e); }

          _isShown() { return this._menu.classList.contains(Ni); }

          _getPlacement() { const t = this._parent; if (t.classList.contains('dropend')) return zi; if (t.classList.contains('dropstart')) return Ri; if (t.classList.contains('dropup-center')) return 'top'; if (t.classList.contains('dropdown-center')) return 'bottom'; const e = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end'; return t.classList.contains('dropup') ? e ? Hi : Fi : e ? Bi : Wi; }

          _detectNavbar() { return this._element.closest('.navbar') !== null; }

          _getOffset() { const { offset: t } = this._config; return typeof t === 'string' ? t.split(',').map((t) => Number.parseInt(t, 10)) : typeof t === 'function' ? (e) => t(e, this._element) : t; }

          _getPopperConfig() { const t = { placement: this._getPlacement(), modifiers: [{ name: 'preventOverflow', options: { boundary: this._config.boundary } }, { name: 'offset', options: { offset: this._getOffset() } }] }; return (this._inNavbar || this._config.display === 'static') && (H.setDataAttribute(this._menu, 'popper', 'static'), t.modifiers = [{ name: 'applyStyles', enabled: !1 }]), { ...t, ..._(this._config.popperConfig, [void 0, t]) }; }

          _selectMenuItem({ key: t, target: e }) { const i = R.find('.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)', this._menu).filter((t) => l(t)); i.length && v(i, e, t === Oi, !i.includes(e)).focus(); }

          static jQueryInterface(t) { return this.each(function () { const e = Ki.getOrCreateInstance(this, t); if (typeof t === 'string') { if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`); e[t](); } }); }

          static clearMenus(t) { if (t.button === 2 || t.type === 'keyup' && t.key !== 'Tab') return; const e = R.find(ji); for (const i of e) { const e = Ki.getInstance(i); if (!e || !1 === e._config.autoClose) continue; const n = t.composedPath(); const s = n.includes(e._menu); if (n.includes(e._element) || e._config.autoClose === 'inside' && !s || e._config.autoClose === 'outside' && s) continue; if (e._menu.contains(t.target) && (t.type === 'keyup' && t.key === 'Tab' || /input|select|option|textarea|form/i.test(t.target.tagName))) continue; const o = { relatedTarget: e._element }; t.type === 'click' && (o.clickEvent = t), e._completeHide(o); } }

          static dataApiKeydownHandler(t) { const e = /input|textarea/i.test(t.target.tagName); const i = t.key === 'Escape'; const n = [Ci, Oi].includes(t.key); if (!n && !i) return; if (e && !i) return; t.preventDefault(); const s = this.matches(Pi) ? this : R.prev(this, Pi)[0] || R.next(this, Pi)[0] || R.findOne(Pi, t.delegateTarget.parentNode); const o = Ki.getOrCreateInstance(s); if (n) return t.stopPropagation(), o.show(), void o._selectMenuItem(t); o._isShown() && (t.stopPropagation(), o.hide(), s.focus()); }
        }P.on(document, $i, Pi, Ki.dataApiKeydownHandler), P.on(document, $i, Mi, Ki.dataApiKeydownHandler), P.on(document, Di, Ki.clearMenus), P.on(document, Ii, Ki.clearMenus), P.on(document, Di, Pi, function (t) { t.preventDefault(), Ki.getOrCreateInstance(this).toggle(); }), g(Ki); const Qi = 'backdrop'; const Xi = 'show'; const Yi = `mousedown.bs.${Qi}`; const Ui = {
          className: 'modal-backdrop', clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: 'body',
        }; const Gi = {
          className: 'string', clickCallback: '(function|null)', isAnimated: 'boolean', isVisible: 'boolean', rootElement: '(element|string)',
        }; class Ji extends W {
          constructor(t) { super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null; }

          static get Default() { return Ui; }

          static get DefaultType() { return Gi; }

          static get NAME() { return Qi; }

          show(t) { if (!this._config.isVisible) return void _(t); this._append(); const e = this._getElement(); this._config.isAnimated && u(e), e.classList.add(Xi), this._emulateAnimation(() => { _(t); }); }

          hide(t) { this._config.isVisible ? (this._getElement().classList.remove(Xi), this._emulateAnimation(() => { this.dispose(), _(t); })) : _(t); }

          dispose() { this._isAppended && (P.off(this._element, Yi), this._element.remove(), this._isAppended = !1); }

          _getElement() { if (!this._element) { const t = document.createElement('div'); t.className = this._config.className, this._config.isAnimated && t.classList.add('fade'), this._element = t; } return this._element; }

          _configAfterMerge(t) { return t.rootElement = a(t.rootElement), t; }

          _append() { if (this._isAppended) return; const t = this._getElement(); this._config.rootElement.append(t), P.on(t, Yi, () => { _(this._config.clickCallback); }), this._isAppended = !0; }

          _emulateAnimation(t) { b(t, this._getElement(), this._config.isAnimated); }
        } const Zi = '.bs.focustrap'; const tn = `focusin${Zi}`; const en = `keydown.tab${Zi}`; const nn = 'backward'; const sn = { autofocus: !0, trapElement: null }; const on = { autofocus: 'boolean', trapElement: 'element' }; class rn extends W {
          constructor(t) { super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null; }

          static get Default() { return sn; }

          static get DefaultType() { return on; }

          static get NAME() { return 'focustrap'; }

          activate() { this._isActive || (this._config.autofocus && this._config.trapElement.focus(), P.off(document, Zi), P.on(document, tn, (t) => this._handleFocusin(t)), P.on(document, en, (t) => this._handleKeydown(t)), this._isActive = !0); }

          deactivate() { this._isActive && (this._isActive = !1, P.off(document, Zi)); }

          _handleFocusin(t) { const { trapElement: e } = this._config; if (t.target === document || t.target === e || e.contains(t.target)) return; const i = R.focusableChildren(e); i.length === 0 ? e.focus() : this._lastTabNavDirection === nn ? i[i.length - 1].focus() : i[0].focus(); }

          _handleKeydown(t) { t.key === 'Tab' && (this._lastTabNavDirection = t.shiftKey ? nn : 'forward'); }
        } const an = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'; const ln = '.sticky-top'; const cn = 'padding-right'; const hn = 'margin-right'; class dn {
          constructor() { this._element = document.body; }

          getWidth() { const t = document.documentElement.clientWidth; return Math.abs(window.innerWidth - t); }

          hide() { const t = this.getWidth(); this._disableOverFlow(), this._setElementAttributes(this._element, cn, (e) => e + t), this._setElementAttributes(an, cn, (e) => e + t), this._setElementAttributes(ln, hn, (e) => e - t); }

          reset() { this._resetElementAttributes(this._element, 'overflow'), this._resetElementAttributes(this._element, cn), this._resetElementAttributes(an, cn), this._resetElementAttributes(ln, hn); }

          isOverflowing() { return this.getWidth() > 0; }

          _disableOverFlow() { this._saveInitialAttribute(this._element, 'overflow'), this._element.style.overflow = 'hidden'; }

          _setElementAttributes(t, e, i) { const n = this.getWidth(); this._applyManipulationCallback(t, (t) => { if (t !== this._element && window.innerWidth > t.clientWidth + n) return; this._saveInitialAttribute(t, e); const s = window.getComputedStyle(t).getPropertyValue(e); t.style.setProperty(e, `${i(Number.parseFloat(s))}px`); }); }

          _saveInitialAttribute(t, e) { const i = t.style.getPropertyValue(e); i && H.setDataAttribute(t, e, i); }

          _resetElementAttributes(t, e) { this._applyManipulationCallback(t, (t) => { const i = H.getDataAttribute(t, e); i !== null ? (H.removeDataAttribute(t, e), t.style.setProperty(e, i)) : t.style.removeProperty(e); }); }

          _applyManipulationCallback(t, e) { if (r(t))e(t); else for (const i of R.find(t, this._element))e(i); }
        } const un = '.bs.modal'; const fn = `hide${un}`; const pn = `hidePrevented${un}`; const mn = `hidden${un}`; const gn = `show${un}`; const _n = `shown${un}`; const bn = `resize${un}`; const vn = `click.dismiss${un}`; const yn = `mousedown.dismiss${un}`; const wn = `keydown.dismiss${un}`; const An = `click${un}.data-api`; const En = 'modal-open'; const Tn = 'show'; const Cn = 'modal-static'; const On = { backdrop: !0, focus: !0, keyboard: !0 }; const xn = { backdrop: '(boolean|string)', focus: 'boolean', keyboard: 'boolean' }; class kn extends B {
          constructor(t, e) { super(t, e), this._dialog = R.findOne('.modal-dialog', this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new dn(), this._addEventListeners(); }

          static get Default() { return On; }

          static get DefaultType() { return xn; }

          static get NAME() { return 'modal'; }

          toggle(t) { return this._isShown ? this.hide() : this.show(t); }

          show(t) { this._isShown || this._isTransitioning || P.trigger(this._element, gn, { relatedTarget: t }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(En), this._adjustDialog(), this._backdrop.show(() => this._showElement(t))); }

          hide() { this._isShown && !this._isTransitioning && (P.trigger(this._element, fn).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Tn), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))); }

          dispose() { P.off(window, un), P.off(this._dialog, un), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose(); }

          handleUpdate() { this._adjustDialog(); }

          _initializeBackDrop() { return new Ji({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() }); }

          _initializeFocusTrap() { return new rn({ trapElement: this._element }); }

          _showElement(t) { document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = 'block', this._element.removeAttribute('aria-hidden'), this._element.setAttribute('aria-modal', !0), this._element.setAttribute('role', 'dialog'), this._element.scrollTop = 0; const e = R.findOne('.modal-body', this._dialog); e && (e.scrollTop = 0), u(this._element), this._element.classList.add(Tn), this._queueCallback(() => { this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, P.trigger(this._element, _n, { relatedTarget: t }); }, this._dialog, this._isAnimated()); }

          _addEventListeners() { P.on(this._element, wn, (t) => { t.key === 'Escape' && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition()); }), P.on(window, bn, () => { this._isShown && !this._isTransitioning && this._adjustDialog(); }), P.on(this._element, yn, (t) => { P.one(this._element, vn, (e) => { this._element === t.target && this._element === e.target && (this._config.backdrop !== 'static' ? this._config.backdrop && this.hide() : this._triggerBackdropTransition()); }); }); }

          _hideModal() { this._element.style.display = 'none', this._element.setAttribute('aria-hidden', !0), this._element.removeAttribute('aria-modal'), this._element.removeAttribute('role'), this._isTransitioning = !1, this._backdrop.hide(() => { document.body.classList.remove(En), this._resetAdjustments(), this._scrollBar.reset(), P.trigger(this._element, mn); }); }

          _isAnimated() { return this._element.classList.contains('fade'); }

          _triggerBackdropTransition() { if (P.trigger(this._element, pn).defaultPrevented) return; const t = this._element.scrollHeight > document.documentElement.clientHeight; const e = this._element.style.overflowY; e === 'hidden' || this._element.classList.contains(Cn) || (t || (this._element.style.overflowY = 'hidden'), this._element.classList.add(Cn), this._queueCallback(() => { this._element.classList.remove(Cn), this._queueCallback(() => { this._element.style.overflowY = e; }, this._dialog); }, this._dialog), this._element.focus()); }

          _adjustDialog() { const t = this._element.scrollHeight > document.documentElement.clientHeight; const e = this._scrollBar.getWidth(); const i = e > 0; if (i && !t) { const t = m() ? 'paddingLeft' : 'paddingRight'; this._element.style[t] = `${e}px`; } if (!i && t) { const t = m() ? 'paddingRight' : 'paddingLeft'; this._element.style[t] = `${e}px`; } }

          _resetAdjustments() { this._element.style.paddingLeft = '', this._element.style.paddingRight = ''; }

          static jQueryInterface(t, e) { return this.each(function () { const i = kn.getOrCreateInstance(this, t); if (typeof t === 'string') { if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`); i[t](e); } }); }
        }P.on(document, An, '[data-bs-toggle="modal"]', function (t) { const e = R.getElementFromSelector(this); ['A', 'AREA'].includes(this.tagName) && t.preventDefault(), P.one(e, gn, (t) => { t.defaultPrevented || P.one(e, mn, () => { l(this) && this.focus(); }); }); const i = R.findOne('.modal.show'); i && kn.getInstance(i).hide(), kn.getOrCreateInstance(e).toggle(this); }), q(kn), g(kn); const Ln = '.bs.offcanvas'; const Sn = '.data-api'; const Dn = `load${Ln}${Sn}`; const $n = 'show'; const In = 'showing'; const Nn = 'hiding'; const Pn = '.offcanvas.show'; const jn = `show${Ln}`; const Mn = `shown${Ln}`; const Fn = `hide${Ln}`; const Hn = `hidePrevented${Ln}`; const Wn = `hidden${Ln}`; const Bn = `resize${Ln}`; const zn = `click${Ln}${Sn}`; const Rn = `keydown.dismiss${Ln}`; const qn = { backdrop: !0, keyboard: !0, scroll: !1 }; const Vn = { backdrop: '(boolean|string)', keyboard: 'boolean', scroll: 'boolean' }; class Kn extends B {
          constructor(t, e) { super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners(); }

          static get Default() { return qn; }

          static get DefaultType() { return Vn; }

          static get NAME() { return 'offcanvas'; }

          toggle(t) { return this._isShown ? this.hide() : this.show(t); }

          show(t) { this._isShown || P.trigger(this._element, jn, { relatedTarget: t }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new dn()).hide(), this._element.setAttribute('aria-modal', !0), this._element.setAttribute('role', 'dialog'), this._element.classList.add(In), this._queueCallback(() => { this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add($n), this._element.classList.remove(In), P.trigger(this._element, Mn, { relatedTarget: t }); }, this._element, !0)); }

          hide() { this._isShown && (P.trigger(this._element, Fn).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Nn), this._backdrop.hide(), this._queueCallback(() => { this._element.classList.remove($n, Nn), this._element.removeAttribute('aria-modal'), this._element.removeAttribute('role'), this._config.scroll || (new dn()).reset(), P.trigger(this._element, Wn); }, this._element, !0))); }

          dispose() { this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose(); }

          _initializeBackDrop() {
            const t = Boolean(this._config.backdrop); return new Ji({
              className: 'offcanvas-backdrop', isVisible: t, isAnimated: !0, rootElement: this._element.parentNode, clickCallback: t ? () => { this._config.backdrop !== 'static' ? this.hide() : P.trigger(this._element, Hn); } : null,
            });
          }

          _initializeFocusTrap() { return new rn({ trapElement: this._element }); }

          _addEventListeners() { P.on(this._element, Rn, (t) => { t.key === 'Escape' && (this._config.keyboard ? this.hide() : P.trigger(this._element, Hn)); }); }

          static jQueryInterface(t) { return this.each(function () { const e = Kn.getOrCreateInstance(this, t); if (typeof t === 'string') { if (void 0 === e[t] || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`); e[t](this); } }); }
        }P.on(document, zn, '[data-bs-toggle="offcanvas"]', function (t) { const e = R.getElementFromSelector(this); if (['A', 'AREA'].includes(this.tagName) && t.preventDefault(), c(this)) return; P.one(e, Wn, () => { l(this) && this.focus(); }); const i = R.findOne(Pn); i && i !== e && Kn.getInstance(i).hide(), Kn.getOrCreateInstance(e).toggle(this); }), P.on(window, Dn, () => { for (const t of R.find(Pn))Kn.getOrCreateInstance(t).show(); }), P.on(window, Bn, () => { for (const t of R.find('[aria-modal][class*=show][class*=offcanvas-]'))getComputedStyle(t).position !== 'fixed' && Kn.getOrCreateInstance(t).hide(); }), q(Kn), g(Kn); const Qn = {
          '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i], a: ['target', 'href', 'title', 'rel'], area: [], b: [], br: [], col: [], code: [], dd: [], div: [], dl: [], dt: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ['src', 'srcset', 'alt', 'title', 'width', 'height'], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [],
        }; const Xn = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']); const Yn = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i; const Un = (t, e) => { const i = t.nodeName.toLowerCase(); return e.includes(i) ? !Xn.has(i) || Boolean(Yn.test(t.nodeValue)) : e.filter((t) => t instanceof RegExp).some((t) => t.test(i)); }; const Gn = {
          allowList: Qn, content: {}, extraClass: '', html: !1, sanitize: !0, sanitizeFn: null, template: '<div></div>',
        }; const Jn = {
          allowList: 'object', content: 'object', extraClass: '(string|function)', html: 'boolean', sanitize: 'boolean', sanitizeFn: '(null|function)', template: 'string',
        }; const Zn = { entry: '(string|element|function|null)', selector: '(string|element)' }; class ts extends W {
          constructor(t) { super(), this._config = this._getConfig(t); }

          static get Default() { return Gn; }

          static get DefaultType() { return Jn; }

          static get NAME() { return 'TemplateFactory'; }

          getContent() { return Object.values(this._config.content).map((t) => this._resolvePossibleFunction(t)).filter(Boolean); }

          hasContent() { return this.getContent().length > 0; }

          changeContent(t) { return this._checkContent(t), this._config.content = { ...this._config.content, ...t }, this; }

          toHtml() { const t = document.createElement('div'); t.innerHTML = this._maybeSanitize(this._config.template); for (const [e, i] of Object.entries(this._config.content)) this._setContent(t, i, e); const e = t.children[0]; const i = this._resolvePossibleFunction(this._config.extraClass); return i && e.classList.add(...i.split(' ')), e; }

          _typeCheckConfig(t) { super._typeCheckConfig(t), this._checkContent(t.content); }

          _checkContent(t) { for (const [e, i] of Object.entries(t)) super._typeCheckConfig({ selector: e, entry: i }, Zn); }

          _setContent(t, e, i) { const n = R.findOne(i, t); n && ((e = this._resolvePossibleFunction(e)) ? r(e) ? this._putElementInTemplate(a(e), n) : this._config.html ? n.innerHTML = this._maybeSanitize(e) : n.textContent = e : n.remove()); }

          _maybeSanitize(t) { return this._config.sanitize ? (function (t, e, i) { if (!t.length) return t; if (i && typeof i === 'function') return i(t); const n = (new window.DOMParser()).parseFromString(t, 'text/html'); const s = [].concat(...n.body.querySelectorAll('*')); for (const t of s) { const i = t.nodeName.toLowerCase(); if (!Object.keys(e).includes(i)) { t.remove(); continue; } const n = [].concat(...t.attributes); const s = [].concat(e['*'] || [], e[i] || []); for (const e of n)Un(e, s) || t.removeAttribute(e.nodeName); } return n.body.innerHTML; }(t, this._config.allowList, this._config.sanitizeFn)) : t; }

          _resolvePossibleFunction(t) { return _(t, [void 0, this]); }

          _putElementInTemplate(t, e) { if (this._config.html) return e.innerHTML = '', void e.append(t); e.textContent = t.textContent; }
        } const es = new Set(['sanitize', 'allowList', 'sanitizeFn']); const is = 'fade'; const ns = 'show'; const ss = '.tooltip-inner'; const os = '.modal'; const rs = 'hide.bs.modal'; const as = 'hover'; const ls = 'focus'; const cs = 'click'; const hs = {
          AUTO: 'auto', TOP: 'top', RIGHT: m() ? 'left' : 'right', BOTTOM: 'bottom', LEFT: m() ? 'right' : 'left',
        }; const ds = {
          allowList: Qn, animation: !0, boundary: 'clippingParents', container: !1, customClass: '', delay: 0, fallbackPlacements: ['top', 'right', 'bottom', 'left'], html: !1, offset: [0, 6], placement: 'top', popperConfig: null, sanitize: !0, sanitizeFn: null, selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: '', trigger: 'hover focus',
        }; const us = {
          allowList: 'object', animation: 'boolean', boundary: '(string|element)', container: '(string|element|boolean)', customClass: '(string|function)', delay: '(number|object)', fallbackPlacements: 'array', html: 'boolean', offset: '(array|string|function)', placement: '(string|function)', popperConfig: '(null|object|function)', sanitize: 'boolean', sanitizeFn: '(null|function)', selector: '(string|boolean)', template: 'string', title: '(string|element|function)', trigger: 'string',
        }; class fs extends B {
          constructor(t, e) { if (void 0 === wi) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)"); super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle(); }

          static get Default() { return ds; }

          static get DefaultType() { return us; }

          static get NAME() { return 'tooltip'; }

          enable() { this._isEnabled = !0; }

          disable() { this._isEnabled = !1; }

          toggleEnabled() { this._isEnabled = !this._isEnabled; }

          toggle() { this._isEnabled && (this._isShown() ? this._leave() : this._enter()); }

          dispose() { clearTimeout(this._timeout), P.off(this._element.closest(os), rs, this._hideModalHandler), this._element.getAttribute('data-bs-original-title') && this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title')), this._disposePopper(), super.dispose(); }

          show() { if (this._element.style.display === 'none') throw new Error('Please use show on visible elements'); if (!this._isWithContent() || !this._isEnabled) return; const t = P.trigger(this._element, this.constructor.eventName('show')); const e = (h(this._element) || this._element.ownerDocument.documentElement).contains(this._element); if (t.defaultPrevented || !e) return; this._disposePopper(); const i = this._getTipElement(); this._element.setAttribute('aria-describedby', i.getAttribute('id')); const { container: n } = this._config; if (this._element.ownerDocument.documentElement.contains(this.tip) || (n.append(i), P.trigger(this._element, this.constructor.eventName('inserted'))), this._popper = this._createPopper(i), i.classList.add(ns), 'ontouchstart' in document.documentElement) for (const t of [].concat(...document.body.children))P.on(t, 'mouseover', d); this._queueCallback(() => { P.trigger(this._element, this.constructor.eventName('shown')), !1 === this._isHovered && this._leave(), this._isHovered = !1; }, this.tip, this._isAnimated()); }

          hide() { if (this._isShown() && !P.trigger(this._element, this.constructor.eventName('hide')).defaultPrevented) { if (this._getTipElement().classList.remove(ns), 'ontouchstart' in document.documentElement) for (const t of [].concat(...document.body.children))P.off(t, 'mouseover', d); this._activeTrigger[cs] = !1, this._activeTrigger[ls] = !1, this._activeTrigger[as] = !1, this._isHovered = null, this._queueCallback(() => { this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute('aria-describedby'), P.trigger(this._element, this.constructor.eventName('hidden'))); }, this.tip, this._isAnimated()); } }

          update() { this._popper && this._popper.update(); }

          _isWithContent() { return Boolean(this._getTitle()); }

          _getTipElement() { return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip; }

          _createTipElement(t) { const e = this._getTemplateFactory(t).toHtml(); if (!e) return null; e.classList.remove(is, ns), e.classList.add(`bs-${this.constructor.NAME}-auto`); const i = ((t) => { do { t += Math.floor(1e6 * Math.random()); } while (document.getElementById(t)); return t; })(this.constructor.NAME).toString(); return e.setAttribute('id', i), this._isAnimated() && e.classList.add(is), e; }

          setContent(t) { this._newContent = t, this._isShown() && (this._disposePopper(), this.show()); }

          _getTemplateFactory(t) { return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new ts({ ...this._config, content: t, extraClass: this._resolvePossibleFunction(this._config.customClass) }), this._templateFactory; }

          _getContentForTemplate() { return { [ss]: this._getTitle() }; }

          _getTitle() { return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title'); }

          _initializeOnDelegatedTarget(t) { return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig()); }

          _isAnimated() { return this._config.animation || this.tip && this.tip.classList.contains(is); }

          _isShown() { return this.tip && this.tip.classList.contains(ns); }

          _createPopper(t) { const e = _(this._config.placement, [this, t, this._element]); const i = hs[e.toUpperCase()]; return yi(this._element, t, this._getPopperConfig(i)); }

          _getOffset() { const { offset: t } = this._config; return typeof t === 'string' ? t.split(',').map((t) => Number.parseInt(t, 10)) : typeof t === 'function' ? (e) => t(e, this._element) : t; }

          _resolvePossibleFunction(t) { return _(t, [this._element, this._element]); }

          _getPopperConfig(t) {
            const e = {
              placement: t,
              modifiers: [{ name: 'flip', options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: 'offset', options: { offset: this._getOffset() } }, { name: 'preventOverflow', options: { boundary: this._config.boundary } }, { name: 'arrow', options: { element: `.${this.constructor.NAME}-arrow` } }, {
                name: 'preSetPlacement', enabled: !0, phase: 'beforeMain', fn: (t) => { this._getTipElement().setAttribute('data-popper-placement', t.state.placement); },
              }],
            }; return { ...e, ..._(this._config.popperConfig, [void 0, e]) };
          }

          _setListeners() { const t = this._config.trigger.split(' '); for (const e of t) if (e === 'click')P.on(this._element, this.constructor.eventName('click'), this._config.selector, (t) => { const e = this._initializeOnDelegatedTarget(t); e._activeTrigger[cs] = !(e._isShown() && e._activeTrigger[cs]), e.toggle(); }); else if (e !== 'manual') { const t = e === as ? this.constructor.eventName('mouseenter') : this.constructor.eventName('focusin'); const i = e === as ? this.constructor.eventName('mouseleave') : this.constructor.eventName('focusout'); P.on(this._element, t, this._config.selector, (t) => { const e = this._initializeOnDelegatedTarget(t); e._activeTrigger[t.type === 'focusin' ? ls : as] = !0, e._enter(); }), P.on(this._element, i, this._config.selector, (t) => { const e = this._initializeOnDelegatedTarget(t); e._activeTrigger[t.type === 'focusout' ? ls : as] = e._element.contains(t.relatedTarget), e._leave(); }); } this._hideModalHandler = () => { this._element && this.hide(); }, P.on(this._element.closest(os), rs, this._hideModalHandler); }

          _fixTitle() { const t = this._element.getAttribute('title'); t && (this._element.getAttribute('aria-label') || this._element.textContent.trim() || this._element.setAttribute('aria-label', t), this._element.setAttribute('data-bs-original-title', t), this._element.removeAttribute('title')); }

          _enter() { this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(() => { this._isHovered && this.show(); }, this._config.delay.show)); }

          _leave() { this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => { this._isHovered || this.hide(); }, this._config.delay.hide)); }

          _setTimeout(t, e) { clearTimeout(this._timeout), this._timeout = setTimeout(t, e); }

          _isWithActiveTrigger() { return Object.values(this._activeTrigger).includes(!0); }

          _getConfig(t) { const e = H.getDataAttributes(this._element); for (const t of Object.keys(e))es.has(t) && delete e[t]; return t = { ...e, ...typeof t === 'object' && t ? t : {} }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t; }

          _configAfterMerge(t) { return t.container = !1 === t.container ? document.body : a(t.container), typeof t.delay === 'number' && (t.delay = { show: t.delay, hide: t.delay }), typeof t.title === 'number' && (t.title = t.title.toString()), typeof t.content === 'number' && (t.content = t.content.toString()), t; }

          _getDelegateConfig() { const t = {}; for (const [e, i] of Object.entries(this._config)) this.constructor.Default[e] !== i && (t[e] = i); return t.selector = !1, t.trigger = 'manual', t; }

          _disposePopper() { this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null); }

          static jQueryInterface(t) { return this.each(function () { const e = fs.getOrCreateInstance(this, t); if (typeof t === 'string') { if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`); e[t](); } }); }
        }g(fs); const ps = '.popover-header'; const ms = '.popover-body'; const gs = {
          ...fs.Default, content: '', offset: [0, 8], placement: 'right', template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: 'click',
        }; const _s = { ...fs.DefaultType, content: '(null|string|element|function)' }; class bs extends fs {
          static get Default() { return gs; }

          static get DefaultType() { return _s; }

          static get NAME() { return 'popover'; }

          _isWithContent() { return this._getTitle() || this._getContent(); }

          _getContentForTemplate() { return { [ps]: this._getTitle(), [ms]: this._getContent() }; }

          _getContent() { return this._resolvePossibleFunction(this._config.content); }

          static jQueryInterface(t) { return this.each(function () { const e = bs.getOrCreateInstance(this, t); if (typeof t === 'string') { if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`); e[t](); } }); }
        }g(bs); const vs = '.bs.scrollspy'; const ys = `activate${vs}`; const ws = `click${vs}`; const As = `load${vs}.data-api`; const Es = 'active'; const Ts = '[href]'; const Cs = '.nav-link'; const Os = `${Cs}, .nav-item > ${Cs}, .list-group-item`; const xs = {
          offset: null, rootMargin: '0px 0px -25%', smoothScroll: !1, target: null, threshold: [0.1, 0.5, 1],
        }; const ks = {
          offset: '(number|null)', rootMargin: 'string', smoothScroll: 'boolean', target: 'element', threshold: 'array',
        }; class Ls extends B {
          constructor(t, e) { super(t, e), this._targetLinks = new Map(), this._observableSections = new Map(), this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh(); }

          static get Default() { return xs; }

          static get DefaultType() { return ks; }

          static get NAME() { return 'scrollspy'; }

          refresh() { this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver(); for (const t of this._observableSections.values()) this._observer.observe(t); }

          dispose() { this._observer.disconnect(), super.dispose(); }

          _configAfterMerge(t) { return t.target = a(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold === 'string' && (t.threshold = t.threshold.split(',').map((t) => Number.parseFloat(t))), t; }

          _maybeEnableSmoothScroll() { this._config.smoothScroll && (P.off(this._config.target, ws), P.on(this._config.target, ws, Ts, (t) => { const e = this._observableSections.get(t.target.hash); if (e) { t.preventDefault(); const i = this._rootElement || window; const n = e.offsetTop - this._element.offsetTop; if (i.scrollTo) return void i.scrollTo({ top: n, behavior: 'smooth' }); i.scrollTop = n; } })); }

          _getNewObserver() { const t = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin }; return new IntersectionObserver((t) => this._observerCallback(t), t); }

          _observerCallback(t) { const e = (t) => this._targetLinks.get(`#${t.target.id}`); const i = (t) => { this._previousScrollData.visibleEntryTop = t.target.offsetTop, this._process(e(t)); }; const n = (this._rootElement || document.documentElement).scrollTop; const s = n >= this._previousScrollData.parentScrollTop; this._previousScrollData.parentScrollTop = n; for (const o of t) { if (!o.isIntersecting) { this._activeTarget = null, this._clearActiveClass(e(o)); continue; } const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop; if (s && t) { if (i(o), !n) return; } else s || t || i(o); } }

          _initializeTargetsAndObservables() { this._targetLinks = new Map(), this._observableSections = new Map(); const t = R.find(Ts, this._config.target); for (const e of t) { if (!e.hash || c(e)) continue; const t = R.findOne(decodeURI(e.hash), this._element); l(t) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, t)); } }

          _process(t) { this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(Es), this._activateParents(t), P.trigger(this._element, ys, { relatedTarget: t })); }

          _activateParents(t) { if (t.classList.contains('dropdown-item'))R.findOne('.dropdown-toggle', t.closest('.dropdown')).classList.add(Es); else for (const e of R.parents(t, '.nav, .list-group')) for (const t of R.prev(e, Os))t.classList.add(Es); }

          _clearActiveClass(t) { t.classList.remove(Es); const e = R.find(`${Ts}.${Es}`, t); for (const t of e)t.classList.remove(Es); }

          static jQueryInterface(t) { return this.each(function () { const e = Ls.getOrCreateInstance(this, t); if (typeof t === 'string') { if (void 0 === e[t] || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`); e[t](); } }); }
        }P.on(window, As, () => { for (const t of R.find('[data-bs-spy="scroll"]'))Ls.getOrCreateInstance(t); }), g(Ls); const Ss = '.bs.tab'; const Ds = `hide${Ss}`; const $s = `hidden${Ss}`; const Is = `show${Ss}`; const Ns = `shown${Ss}`; const Ps = `click${Ss}`; const js = `keydown${Ss}`; const Ms = `load${Ss}`; const Fs = 'ArrowLeft'; const Hs = 'ArrowRight'; const Ws = 'ArrowUp'; const Bs = 'ArrowDown'; const zs = 'Home'; const Rs = 'End'; const qs = 'active'; const Vs = 'fade'; const Ks = 'show'; const Qs = '.dropdown-toggle'; const Xs = `:not(${Qs})`; const Ys = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; const Us = `.nav-link${Xs}, .list-group-item${Xs}, [role="tab"]${Xs}, ${Ys}`; const Gs = `.${qs}[data-bs-toggle="tab"], .${qs}[data-bs-toggle="pill"], .${qs}[data-bs-toggle="list"]`; class Js extends B {
          constructor(t) { super(t), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), P.on(this._element, js, (t) => this._keydown(t))); }

          static get NAME() { return 'tab'; }

          show() { const t = this._element; if (this._elemIsActive(t)) return; const e = this._getActiveElem(); const i = e ? P.trigger(e, Ds, { relatedTarget: t }) : null; P.trigger(t, Is, { relatedTarget: e }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(e, t), this._activate(t, e)); }

          _activate(t, e) { t && (t.classList.add(qs), this._activate(R.getElementFromSelector(t)), this._queueCallback(() => { t.getAttribute('role') === 'tab' ? (t.removeAttribute('tabindex'), t.setAttribute('aria-selected', !0), this._toggleDropDown(t, !0), P.trigger(t, Ns, { relatedTarget: e })) : t.classList.add(Ks); }, t, t.classList.contains(Vs))); }

          _deactivate(t, e) { t && (t.classList.remove(qs), t.blur(), this._deactivate(R.getElementFromSelector(t)), this._queueCallback(() => { t.getAttribute('role') === 'tab' ? (t.setAttribute('aria-selected', !1), t.setAttribute('tabindex', '-1'), this._toggleDropDown(t, !1), P.trigger(t, $s, { relatedTarget: e })) : t.classList.remove(Ks); }, t, t.classList.contains(Vs))); }

          _keydown(t) { if (![Fs, Hs, Ws, Bs, zs, Rs].includes(t.key)) return; t.stopPropagation(), t.preventDefault(); const e = this._getChildren().filter((t) => !c(t)); let i; if ([zs, Rs].includes(t.key))i = e[t.key === zs ? 0 : e.length - 1]; else { const n = [Hs, Bs].includes(t.key); i = v(e, t.target, n, !0); }i && (i.focus({ preventScroll: !0 }), Js.getOrCreateInstance(i).show()); }

          _getChildren() { return R.find(Us, this._parent); }

          _getActiveElem() { return this._getChildren().find((t) => this._elemIsActive(t)) || null; }

          _setInitialAttributes(t, e) { this._setAttributeIfNotExists(t, 'role', 'tablist'); for (const t of e) this._setInitialAttributesOnChild(t); }

          _setInitialAttributesOnChild(t) { t = this._getInnerElement(t); const e = this._elemIsActive(t); const i = this._getOuterElement(t); t.setAttribute('aria-selected', e), i !== t && this._setAttributeIfNotExists(i, 'role', 'presentation'), e || t.setAttribute('tabindex', '-1'), this._setAttributeIfNotExists(t, 'role', 'tab'), this._setInitialAttributesOnTargetPanel(t); }

          _setInitialAttributesOnTargetPanel(t) { const e = R.getElementFromSelector(t); e && (this._setAttributeIfNotExists(e, 'role', 'tabpanel'), t.id && this._setAttributeIfNotExists(e, 'aria-labelledby', `${t.id}`)); }

          _toggleDropDown(t, e) { const i = this._getOuterElement(t); if (!i.classList.contains('dropdown')) return; const n = (t, n) => { const s = R.findOne(t, i); s && s.classList.toggle(n, e); }; n(Qs, qs), n('.dropdown-menu', Ks), i.setAttribute('aria-expanded', e); }

          _setAttributeIfNotExists(t, e, i) { t.hasAttribute(e) || t.setAttribute(e, i); }

          _elemIsActive(t) { return t.classList.contains(qs); }

          _getInnerElement(t) { return t.matches(Us) ? t : R.findOne(Us, t); }

          _getOuterElement(t) { return t.closest('.nav-item, .list-group-item') || t; }

          static jQueryInterface(t) { return this.each(function () { const e = Js.getOrCreateInstance(this); if (typeof t === 'string') { if (void 0 === e[t] || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`); e[t](); } }); }
        }P.on(document, Ps, Ys, function (t) { ['A', 'AREA'].includes(this.tagName) && t.preventDefault(), c(this) || Js.getOrCreateInstance(this).show(); }), P.on(window, Ms, () => { for (const t of R.find(Gs))Js.getOrCreateInstance(t); }), g(Js); const Zs = '.bs.toast'; const to = `mouseover${Zs}`; const eo = `mouseout${Zs}`; const io = `focusin${Zs}`; const no = `focusout${Zs}`; const so = `hide${Zs}`; const oo = `hidden${Zs}`; const ro = `show${Zs}`; const ao = `shown${Zs}`; const lo = 'hide'; const co = 'show'; const ho = 'showing'; const uo = { animation: 'boolean', autohide: 'boolean', delay: 'number' }; const fo = { animation: !0, autohide: !0, delay: 5e3 }; class po extends B {
          constructor(t, e) { super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners(); }

          static get Default() { return fo; }

          static get DefaultType() { return uo; }

          static get NAME() { return 'toast'; }

          show() { P.trigger(this._element, ro).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add('fade'), this._element.classList.remove(lo), u(this._element), this._element.classList.add(co, ho), this._queueCallback(() => { this._element.classList.remove(ho), P.trigger(this._element, ao), this._maybeScheduleHide(); }, this._element, this._config.animation)); }

          hide() { this.isShown() && (P.trigger(this._element, so).defaultPrevented || (this._element.classList.add(ho), this._queueCallback(() => { this._element.classList.add(lo), this._element.classList.remove(ho, co), P.trigger(this._element, oo); }, this._element, this._config.animation))); }

          dispose() { this._clearTimeout(), this.isShown() && this._element.classList.remove(co), super.dispose(); }

          isShown() { return this._element.classList.contains(co); }

          _maybeScheduleHide() { this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => { this.hide(); }, this._config.delay))); }

          _onInteraction(t, e) { switch (t.type) { case 'mouseover': case 'mouseout': this._hasMouseInteraction = e; break; case 'focusin': case 'focusout': this._hasKeyboardInteraction = e; } if (e) return void this._clearTimeout(); const i = t.relatedTarget; this._element === i || this._element.contains(i) || this._maybeScheduleHide(); }

          _setListeners() { P.on(this._element, to, (t) => this._onInteraction(t, !0)), P.on(this._element, eo, (t) => this._onInteraction(t, !1)), P.on(this._element, io, (t) => this._onInteraction(t, !0)), P.on(this._element, no, (t) => this._onInteraction(t, !1)); }

          _clearTimeout() { clearTimeout(this._timeout), this._timeout = null; }

          static jQueryInterface(t) { return this.each(function () { const e = po.getOrCreateInstance(this, t); if (typeof t === 'string') { if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`); e[t](this); } }); }
        } return q(po), g(po), {
          Alert: X, Button: U, Carousel: St, Collapse: qt, Dropdown: Ki, Modal: kn, Offcanvas: Kn, Popover: bs, ScrollSpy: Ls, Tab: Js, Toast: po, Tooltip: fs,
        };
      }());
    },
  }; const e = {}; function i(n) { const s = e[n]; if (void 0 !== s) return s.exports; const o = e[n] = { exports: {} }; return t[n].call(o.exports, o, o.exports, i), o.exports; }(() => {
    i(736), console.log('Index.js loaded');
  })();
})();
