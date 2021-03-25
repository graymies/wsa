/*! lazysizes - v3.0.0 */ ! function() {
    "use strict";

    function a(a) {
        var b = getComputedStyle(a, null) || {},
            c = b.fontFamily || "",
            d = c.match(f) || "",
            e = d && c.match(g) || "";
        return e && (e = e[1]), {
            fit: d && d[1] || "",
            position: j[e] || e || "center"
        }
    }

    function b(a, b) {
        var c, d = lazySizes.cfg,
            e = a.cloneNode(!1),
            f = e.style,
            g = function() {
                var b = a.currentSrc || a.src;
                b && (f.backgroundImage = "url(" + (i.test(b) ? JSON.stringify(b) : b) + ")", c || (c = !0, lazySizes.rC(e, d.loadingClass), lazySizes.aC(e, d.loadedClass)))
            };
        a._lazysizesParentFit = b.fit, a.addEventListener("load", function() {
            lazySizes.rAF(g)
        }, !0), e.addEventListener("load", function() {
            var a = e.currentSrc || e.src;
            a && a != h && (e.src = h, e.srcset = "")
        }), lazySizes.rAF(function() {
            var c = a,
                i = a.parentNode;
            "PICTURE" == i.nodeName.toUpperCase() && (c = i, i = i.parentNode), lazySizes.rC(e, d.loadedClass), lazySizes.rC(e, d.lazyClass), lazySizes.aC(e, d.loadingClass), lazySizes.aC(e, d.objectFitClass || "lazysizes-display-clone"), e.getAttribute(d.srcsetAttr) && e.setAttribute(d.srcsetAttr, ""), e.getAttribute(d.srcAttr) && e.setAttribute(d.srcAttr, ""), e.src = h, e.srcset = "", f.backgroundRepeat = "no-repeat", f.backgroundPosition = b.position, f.backgroundSize = b.fit, c.style.display = "none", a.setAttribute("data-parent-fit", b.fit), a.setAttribute("data-parent-container", "prev"), i.insertBefore(e, c), a._lazysizesParentFit && delete a._lazysizesParentFit, a.complete && g()
        })
    }
    var c = document.createElement("a").style,
        d = "objectFit" in c,
        e = d && "objectPosition" in c,
        f = /object-fit["']*\s*:\s*["']*(contain|cover)/,
        g = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,
        h = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        i = /\(|\)|'/,
        j = {
            center: "center",
            "50% 50%": "center"
        };
    d && e || addEventListener("lazyunveilread", function(c) {
        var e = c.target,
            f = a(e);
        !f.fit || d && "center" == f.position || b(e, f)
    }, !0)
}();
/*! lazysizes - v3.0.0 */
! function(a, b, c) {
    "use strict";

    function d(b, c) {
        var d, e, f, g, h = a.getComputedStyle(b);
        e = b.parentNode, g = {
            isPicture: !(!e || !m.test(e.nodeName || ""))
        }, f = function(a, c) {
            var d = b.getAttribute("data-" + a);
            if (!d) {
                var e = h.getPropertyValue("--ls-" + a);
                e && (d = e.trim())
            }
            if (d) {
                if ("true" == d) d = !0;
                else if ("false" == d) d = !1;
                else if (l.test(d)) d = parseFloat(d);
                else if ("function" == typeof j[a]) d = j[a](b, d);
                else if (q.test(d)) try {
                    d = JSON.parse(d)
                } catch (f) {}
                g[a] = d
            } else a in j && "function" != typeof j[a] ? g[a] = j[a] : c && "function" == typeof j[a] && (g[a] = j[a](b, d))
        };
        for (d in j) f(d);
        return c.replace(p, function(a, b) {
            b in g || f(b, !0)
        }), g
    }

    function e(a, b) {
        var c = [],
            d = function(a, c) {
                return k[typeof b[c]] ? b[c] : a
            };
        return c.srcset = [], b.absUrl && (s.setAttribute("href", a), a = s.href), a = ((b.prefix || "") + a + (b.postfix || "")).replace(p, d), b.widths.forEach(function(d) {
            var e = b.widthmap[d] || d,
                f = {
                    u: a.replace(n, e).replace(o, b.ratio ? Math.round(d * b.ratio) : ""),
                    w: d
                };
            c.push(f), c.srcset.push(f.c = f.u + " " + d + "w")
        }), c
    }

    function f(a, c, d) {
        var f = 0,
            g = 0,
            h = d;
        if (a) {
            if ("container" === c.ratio) {
                for (f = h.scrollWidth, g = h.scrollHeight; !(f && g || h === b);) h = h.parentNode, f = h.scrollWidth, g = h.scrollHeight;
                f && g && (c.ratio = g / f)
            }
            a = e(a, c), a.isPicture = c.isPicture, u && "IMG" == d.nodeName.toUpperCase() ? d.removeAttribute(i.srcsetAttr) : d.setAttribute(i.srcsetAttr, a.srcset.join(", ")), Object.defineProperty(d, "_lazyrias", {
                value: a,
                writable: !0
            })
        }
    }

    function g(a, b) {
        var c = d(a, b);
        return j.modifyOptions.call(a, {
            target: a,
            details: c,
            detail: c
        }), lazySizes.fire(a, "lazyriasmodifyoptions", c), c
    }

    function h(a) {
        return a.getAttribute(a.getAttribute("data-srcattr") || j.srcAttr) || a.getAttribute(i.srcsetAttr) || a.getAttribute(i.srcAttr) || a.getAttribute("data-pfsrcset") || ""
    }
    if (b.addEventListener) {
        var i, j, k = {
                string: 1,
                number: 1
            },
            l = /^\-*\+*\d+\.*\d*$/,
            m = /^picture$/i,
            n = /\s*\{\s*width\s*\}\s*/i,
            o = /\s*\{\s*height\s*\}\s*/i,
            p = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
            q = /^\[.*\]|\{.*\}$/,
            r = /^(?:auto|\d+(px)?)$/,
            s = b.createElement("a"),
            t = b.createElement("img"),
            u = "srcset" in t && !("sizes" in t),
            v = !!a.HTMLPictureElement && !u;
        ! function() {
            var b, c = function() {},
                d = {
                    prefix: "",
                    postfix: "",
                    srcAttr: "data-src",
                    absUrl: !1,
                    modifyOptions: c,
                    widthmap: {},
                    ratio: !1
                };
            i = a.lazySizes && lazySizes.cfg || a.lazySizesConfig, i || (i = {}, a.lazySizesConfig = i), i.supportsType || (i.supportsType = function(a) {
                return !a
            }), i.rias || (i.rias = {}), j = i.rias, "widths" in j || (j.widths = [], function(a) {
                for (var b, c = 0; !b || 3e3 > b;) c += 5, c > 30 && (c += 1), b = 36 * c, a.push(b)
            }(j.widths));
            for (b in d) b in j || (j[b] = d[b])
        }(), addEventListener("lazybeforesizes", function(a) {
            var b, c, d, e, k, l, m, o, p, q, s, t, u;
            if (b = a.target, a.detail.dataAttr && !a.defaultPrevented && !j.disabled && (p = b.getAttribute(i.sizesAttr) || b.getAttribute("sizes")) && r.test(p)) {
                if (c = h(b), d = g(b, c), s = n.test(d.prefix) || n.test(d.postfix), d.isPicture && (e = b.parentNode))
                    for (k = e.getElementsByTagName("source"), l = 0, m = k.length; m > l; l++)(s || n.test(o = h(k[l]))) && (f(o, d, k[l]), t = !0);
                s || n.test(c) ? (f(c, d, b), t = !0) : t && (u = [], u.srcset = [], u.isPicture = !0, Object.defineProperty(b, "_lazyrias", {
                    value: u,
                    writable: !0
                })), t && (v ? b.removeAttribute(i.srcAttr) : "auto" != p && (q = {
                    width: parseInt(p, 10)
                }, w({
                    target: b,
                    detail: q
                })))
            }
        }, !0);
        var w = function() {
            var c = function(a, b) {
                    return a.w - b.w
                },
                d = function(a) {
                    var b, c, d = a.length,
                        e = a[d - 1],
                        f = 0;
                    for (f; d > f; f++)
                        if (e = a[f], e.d = e.w / a.w, e.d >= a.d) {
                            !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b));
                            break
                        } return e
                },
                e = function(a, b) {
                    var c;
                    return !a._lazyrias && lazySizes.pWS && (c = lazySizes.pWS(a.getAttribute(i.srcsetAttr || ""))).length && (Object.defineProperty(a, "_lazyrias", {
                        value: c,
                        writable: !0
                    }), b && a.parentNode && (c.isPicture = "PICTURE" == a.parentNode.nodeName.toUpperCase())), a._lazyrias
                },
                f = function(b) {
                    var c = a.devicePixelRatio || 1,
                        d = lazySizes.getX && lazySizes.getX(b);
                    return Math.min(d || c, 2.4, c)
                },
                g = function(b, g) {
                    var h, i, j, k, l, m;
                    if (l = b._lazyrias, l.isPicture && a.matchMedia)
                        for (i = 0, h = b.parentNode.getElementsByTagName("source"), j = h.length; j > i; i++)
                            if (e(h[i]) && !h[i].getAttribute("type") && (!(k = h[i].getAttribute("media")) || (matchMedia(k) || {}).matches)) {
                                l = h[i]._lazyrias;
                                break
                            } return (!l.w || l.w < g) && (l.w = g, l.d = f(b), m = d(l.sort(c))), m
                },
                h = function(c) {
                    var d, f = c.target;
                    return !u && (a.respimage || a.picturefill || lazySizesConfig.pf) ? void b.removeEventListener("lazybeforesizes", h) : void(("_lazyrias" in f || c.detail.dataAttr && e(f, !0)) && (d = g(f, c.detail.width), d && d.u && f._lazyrias.cur != d.u && (f._lazyrias.cur = d.u, d.cached = !0, lazySizes.rAF(function() {
                        f.setAttribute(i.srcAttr, d.u), f.setAttribute("src", d.u)
                    }))))
                };
            return v ? h = function() {} : addEventListener("lazybeforesizes", h), h
        }()
    }
}(window, document);
/*! lazysizes - v3.0.0 */
! function(a, b) {
    var c = b(a, a.document);
    a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c)
}(window, function(a, b) {
    "use strict";
    if (b.getElementsByClassName) {
        var c, d = b.documentElement,
            e = a.Date,
            f = a.HTMLPictureElement,
            g = "addEventListener",
            h = "getAttribute",
            i = a[g],
            j = a.setTimeout,
            k = a.requestAnimationFrame || j,
            l = a.requestIdleCallback,
            m = /^picture$/i,
            n = ["load", "error", "lazyincluded", "_lazyloaded"],
            o = {},
            p = Array.prototype.forEach,
            q = function(a, b) {
                return o[b] || (o[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), o[b].test(a[h]("class") || "") && o[b]
            },
            r = function(a, b) {
                q(a, b) || a.setAttribute("class", (a[h]("class") || "").trim() + " " + b)
            },
            s = function(a, b) {
                var c;
                (c = q(a, b)) && a.setAttribute("class", (a[h]("class") || "").replace(c, " "))
            },
            t = function(a, b, c) {
                var d = c ? g : "removeEventListener";
                c && t(a, b), n.forEach(function(c) {
                    a[d](c, b)
                })
            },
            u = function(a, c, d, e, f) {
                var g = b.createEvent("CustomEvent");
                return g.initCustomEvent(c, !e, !f, d || {}), a.dispatchEvent(g), g
            },
            v = function(b, d) {
                var e;
                !f && (e = a.picturefill || c.pf) ? e({
                    reevaluate: !0,
                    elements: [b]
                }) : d && d.src && (b.src = d.src)
            },
            w = function(a, b) {
                return (getComputedStyle(a, null) || {})[b]
            },
            x = function(a, b, d) {
                for (d = d || a.offsetWidth; d < c.minSize && b && !a._lazysizesWidth;) d = b.offsetWidth, b = b.parentNode;
                return d
            },
            y = function() {
                var a, c, d = [],
                    e = [],
                    f = d,
                    g = function() {
                        var b = f;
                        for (f = d.length ? e : d, a = !0, c = !1; b.length;) b.shift()();
                        a = !1
                    },
                    h = function(d, e) {
                        a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? j : k)(g)))
                    };
                return h._lsFlush = g, h
            }(),
            z = function(a, b) {
                return b ? function() {
                    y(a)
                } : function() {
                    var b = this,
                        c = arguments;
                    y(function() {
                        a.apply(b, c)
                    })
                }
            },
            A = function(a) {
                var b, c = 0,
                    d = 125,
                    f = 666,
                    g = f,
                    h = function() {
                        b = !1, c = e.now(), a()
                    },
                    i = l ? function() {
                        l(h, {
                            timeout: g
                        }), g !== f && (g = f)
                    } : z(function() {
                        j(h)
                    }, !0);
                return function(a) {
                    var f;
                    (a = a === !0) && (g = 44), b || (b = !0, f = d - (e.now() - c), 0 > f && (f = 0), a || 9 > f && l ? i() : j(i, f))
                }
            },
            B = function(a) {
                var b, c, d = 99,
                    f = function() {
                        b = null, a()
                    },
                    g = function() {
                        var a = e.now() - c;
                        d > a ? j(g, d - a) : (l || f)(f)
                    };
                return function() {
                    c = e.now(), b || (b = j(g, d))
                }
            },
            C = function() {
                var f, k, l, n, o, x, C, E, F, G, H, I, J, K, L, M = /^img$/i,
                    N = /^iframe$/i,
                    O = "onscroll" in a && !/glebot/.test(navigator.userAgent),
                    P = 0,
                    Q = 0,
                    R = 0,
                    S = -1,
                    T = function(a) {
                        R--, a && a.target && t(a.target, T), (!a || 0 > R || !a.target) && (R = 0)
                    },
                    U = function(a, c) {
                        var e, f = a,
                            g = "hidden" == w(b.body, "visibility") || "hidden" != w(a, "visibility");
                        for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != d;) g = (w(f, "opacity") || 1) > 0, g && "visible" != w(f, "overflow") && (e = f.getBoundingClientRect(), g = H > e.left && G < e.right && I > e.top - 1 && F < e.bottom + 1);
                        return g
                    },
                    V = function() {
                        var a, e, g, i, j, m, n, p, q;
                        if ((o = c.loadMode) && 8 > R && (a = f.length)) {
                            e = 0, S++, null == K && ("expand" in c || (c.expand = d.clientHeight > 500 && d.clientWidth > 500 ? 500 : 370), J = c.expand, K = J * c.expFactor), K > Q && 1 > R && S > 2 && o > 2 && !b.hidden ? (Q = K, S = 0) : Q = o > 1 && S > 1 && 6 > R ? J : P;
                            for (; a > e; e++)
                                if (f[e] && !f[e]._lazyRace)
                                    if (O)
                                        if ((p = f[e][h]("data-expand")) && (m = 1 * p) || (m = Q), q !== m && (C = innerWidth + m * L, E = innerHeight + m, n = -1 * m, q = m), g = f[e].getBoundingClientRect(), (I = g.bottom) >= n && (F = g.top) <= E && (H = g.right) >= n * L && (G = g.left) <= C && (I || H || G || F) && (l && 3 > R && !p && (3 > o || 4 > S) || U(f[e], m))) {
                                            if (ba(f[e]), j = !0, R > 9) break
                                        } else !j && l && !i && 4 > R && 4 > S && o > 2 && (k[0] || c.preloadAfterLoad) && (k[0] || !p && (I || H || G || F || "auto" != f[e][h](c.sizesAttr))) && (i = k[0] || f[e]);
                            else ba(f[e]);
                            i && !j && ba(i)
                        }
                    },
                    W = A(V),
                    X = function(a) {
                        r(a.target, c.loadedClass), s(a.target, c.loadingClass), t(a.target, Z)
                    },
                    Y = z(X),
                    Z = function(a) {
                        Y({
                            target: a.target
                        })
                    },
                    $ = function(a, b) {
                        try {
                            a.contentWindow.location.replace(b)
                        } catch (c) {
                            a.src = b
                        }
                    },
                    _ = function(a) {
                        var b, d, e = a[h](c.srcsetAttr);
                        (b = c.customMedia[a[h]("data-media") || a[h]("media")]) && a.setAttribute("media", b), e && a.setAttribute("srcset", e), b && (d = a.parentNode, d.insertBefore(a.cloneNode(), a), d.removeChild(a))
                    },
                    aa = z(function(a, b, d, e, f) {
                        var g, i, k, l, o, q;
                        (o = u(a, "lazybeforeunveil", b)).defaultPrevented || (e && (d ? r(a, c.autosizesClass) : a.setAttribute("sizes", e)), i = a[h](c.srcsetAttr), g = a[h](c.srcAttr), f && (k = a.parentNode, l = k && m.test(k.nodeName || "")), q = b.firesLoad || "src" in a && (i || g || l), o = {
                            target: a
                        }, q && (t(a, T, !0), clearTimeout(n), n = j(T, 2500), r(a, c.loadingClass), t(a, Z, !0)), l && p.call(k.getElementsByTagName("source"), _), i ? a.setAttribute("srcset", i) : g && !l && (N.test(a.nodeName) ? $(a, g) : a.src = g), (i || l) && v(a, {
                            src: g
                        })), a._lazyRace && delete a._lazyRace, s(a, c.lazyClass), y(function() {
                            (!q || a.complete && a.naturalWidth > 1) && (q ? T(o) : R--, X(o))
                        }, !0)
                    }),
                    ba = function(a) {
                        var b, d = M.test(a.nodeName),
                            e = d && (a[h](c.sizesAttr) || a[h]("sizes")),
                            f = "auto" == e;
                        (!f && l || !d || !a.src && !a.srcset || a.complete || q(a, c.errorClass)) && (b = u(a, "lazyunveilread").detail, f && D.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, R++, aa(a, b, f, e, d))
                    },
                    ca = function() {
                        if (!l) {
                            if (e.now() - x < 999) return void j(ca, 999);
                            var a = B(function() {
                                c.loadMode = 3, W()
                            });
                            l = !0, c.loadMode = 3, W(), i("scroll", function() {
                                3 == c.loadMode && (c.loadMode = 2), a()
                            }, !0)
                        }
                    };
                return {
                    _: function() {
                        x = e.now(), f = b.getElementsByClassName(c.lazyClass), k = b.getElementsByClassName(c.lazyClass + " " + c.preloadClass), L = c.hFac, i("scroll", W, !0), i("resize", W, !0), a.MutationObserver ? new MutationObserver(W).observe(d, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (d[g]("DOMNodeInserted", W, !0), d[g]("DOMAttrModified", W, !0), setInterval(W, 999)), i("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(a) {
                            b[g](a, W, !0)
                        }), /d$|^c/.test(b.readyState) ? ca() : (i("load", ca), b[g]("DOMContentLoaded", W), j(ca, 2e4)), f.length ? (V(), y._lsFlush()) : W()
                    },
                    checkElems: W,
                    unveil: ba
                }
            }(),
            D = function() {
                var a, d = z(function(a, b, c, d) {
                        var e, f, g;
                        if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), m.test(b.nodeName || ""))
                            for (e = b.getElementsByTagName("source"), f = 0, g = e.length; g > f; f++) e[f].setAttribute("sizes", d);
                        c.detail.dataAttr || v(a, c.detail)
                    }),
                    e = function(a, b, c) {
                        var e, f = a.parentNode;
                        f && (c = x(a, f, c), e = u(a, "lazybeforesizes", {
                            width: c,
                            dataAttr: !!b
                        }), e.defaultPrevented || (c = e.detail.width, c && c !== a._lazysizesWidth && d(a, f, e, c)))
                    },
                    f = function() {
                        var b, c = a.length;
                        if (c)
                            for (b = 0; c > b; b++) e(a[b])
                    },
                    g = B(f);
                return {
                    _: function() {
                        a = b.getElementsByClassName(c.autosizesClass), i("resize", g)
                    },
                    checkElems: g,
                    updateElem: e
                }
            }(),
            E = function() {
                E.i || (E.i = !0, D._(), C._())
            };
        return function() {
            var b, d = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2
            };
            c = a.lazySizesConfig || a.lazysizesConfig || {};
            for (b in d) b in c || (c[b] = d[b]);
            a.lazySizesConfig = c, j(function() {
                c.init && E()
            })
        }(), {
            cfg: c,
            autoSizer: D,
            loader: C,
            init: E,
            uP: v,
            aC: r,
            rC: s,
            hC: q,
            fire: u,
            gW: x,
            rAF: y
        }
    }
});
/*! lazysizes - v3.0.0 */
! function(a, b) {
    "use strict";
    if (a.addEventListener) {
        var c = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
            d = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
            e = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
            f = /^picture$/i,
            g = function(a) {
                return getComputedStyle(a, null) || {}
            },
            h = {
                getParent: function(b, c) {
                    var d = b,
                        e = b.parentNode;
                    return c && "prev" != c || !e || !f.test(e.nodeName || "") || (e = e.parentNode), "self" != c && (d = "prev" == c ? b.previousElementSibling : c && (e.closest || a.jQuery) ? (e.closest ? e.closest(c) : jQuery(e).closest(c)[0]) || e : e), d
                },
                getFit: function(a) {
                    var b, c, f = g(a),
                        i = f.content || f.fontFamily,
                        j = {
                            fit: a._lazysizesParentFit || a.getAttribute("data-parent-fit")
                        };
                    return !j.fit && i && (b = i.match(d)) && (j.fit = b[1]), j.fit ? (c = a._lazysizesParentContainer || a.getAttribute("data-parent-container"), !c && i && (b = i.match(e)) && (c = b[1]), j.parent = h.getParent(a, c)) : j.fit = f.objectFit, j
                },
                getImageRatio: function(b) {
                    var d, e, g, h, i = b.parentNode,
                        j = i && f.test(i.nodeName || "") ? i.querySelectorAll("source, img") : [b];
                    for (d = 0; d < j.length; d++)
                        if (b = j[d], e = b.getAttribute(lazySizesConfig.srcsetAttr) || b.getAttribute("srcset") || b.getAttribute("data-pfsrcset") || b.getAttribute("data-risrcset") || "", g = b.getAttribute("media"), g = lazySizesConfig.customMedia[b.getAttribute("data-media") || g] || g, e && (!g || (a.matchMedia && matchMedia(g) || {}).matches)) {
                            h = parseFloat(b.getAttribute("data-aspectratio")), !h && e.match(c) && (h = "w" == RegExp.$2 ? RegExp.$1 / RegExp.$3 : RegExp.$3 / RegExp.$1);
                            break
                        } return h
                },
                calculateSize: function(a, b) {
                    var c, d, e, f, g = this.getFit(a),
                        h = g.fit,
                        i = g.parent;
                    return "width" == h || ("contain" == h || "cover" == h) && (e = this.getImageRatio(a)) ? (i ? b = i.clientWidth : i = a, f = b, "width" == h ? f = b : (d = i.clientHeight, d > 40 && (c = b / d) && ("cover" == h && e > c || "contain" == h && c > e) && (f = b * (e / c))), f) : b
                }
            },
            i = function() {
                a.lazySizes && (lazySizes.parentFit || (lazySizes.parentFit = h), a.removeEventListener("lazyunveilread", i, !0))
            };
        a.addEventListener("lazyunveilread", i, !0), b.addEventListener("lazybeforesizes", function(a) {
            if (!a.defaultPrevented) {
                var b = a.target;
                a.detail.width = h.calculateSize(b, a.detail.width)
            }
        }), setTimeout(i)
    }
}(window, document);
/*! lazysizes - v3.0.0 */
! function(a, b, c) {
    "use strict";
    var d, e = a.lazySizes && lazySizes.cfg || a.lazySizesConfig,
        f = b.createElement("img"),
        g = "sizes" in f && "srcset" in f,
        h = /\s+\d+h/g,
        i = function() {
            var a = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                c = Array.prototype.forEach;
            return function(d) {
                var e = b.createElement("img"),
                    f = function(b) {
                        var c, d = b.getAttribute(lazySizesConfig.srcsetAttr);
                        d && (d.match(a) && (c = "w" == RegExp.$2 ? RegExp.$1 / RegExp.$3 : RegExp.$3 / RegExp.$1, c && b.setAttribute("data-aspectratio", c)), b.setAttribute(lazySizesConfig.srcsetAttr, d.replace(h, "")))
                    },
                    g = function(a) {
                        var b = a.target.parentNode;
                        b && "PICTURE" == b.nodeName && c.call(b.getElementsByTagName("source"), f), f(a.target)
                    },
                    i = function() {
                        e.currentSrc && b.removeEventListener("lazybeforeunveil", g)
                    };
                d[1] && (b.addEventListener("lazybeforeunveil", g), e.onload = i, e.onerror = i, e.srcset = "data:,a 1w 1h", e.complete && i())
            }
        }();
    if (e || (e = {}, a.lazySizesConfig = e), e.supportsType || (e.supportsType = function(a) {
            return !a
        }), !a.picturefill && !e.pf) {
        if (a.HTMLPictureElement && g) return b.msElementsFromPoint && i(navigator.userAgent.match(/Edge\/(\d+)/)), void(e.pf = function() {});
        e.pf = function(b) {
            var c, e;
            if (!a.picturefill)
                for (c = 0, e = b.elements.length; e > c; c++) d(b.elements[c])
        }, d = function() {
            var c = function(a, b) {
                    return a.w - b.w
                },
                f = /^\s*\d+\.*\d*px\s*$/,
                i = function(a) {
                    var b, c, d = a.length,
                        e = a[d - 1],
                        f = 0;
                    for (f; d > f; f++)
                        if (e = a[f], e.d = e.w / a.w, e.d >= a.d) {
                            !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b));
                            break
                        } return e
                },
                j = function() {
                    var a, b = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                        c = /\s/,
                        d = function(b, c, d, e) {
                            a.push({
                                c: c,
                                u: d,
                                w: 1 * e
                            })
                        };
                    return function(e) {
                        return a = [], e = e.trim(), e.replace(h, "").replace(b, d), a.length || !e || c.test(e) || a.push({
                            c: e,
                            u: e,
                            w: 99
                        }), a
                    }
                }(),
                k = function() {
                    k.init || (k.init = !0, addEventListener("resize", function() {
                        var a, c = b.getElementsByClassName("lazymatchmedia"),
                            e = function() {
                                var a, b;
                                for (a = 0, b = c.length; b > a; a++) d(c[a])
                            };
                        return function() {
                            clearTimeout(a), a = setTimeout(e, 66)
                        }
                    }()))
                },
                l = function(b, c) {
                    var d, f = b.getAttribute("srcset") || b.getAttribute(e.srcsetAttr);
                    !f && c && (f = b._lazypolyfill ? b._lazypolyfill._set : b.getAttribute(e.srcAttr) || b.getAttribute("src")), b._lazypolyfill && b._lazypolyfill._set == f || (d = j(f || ""), c && b.parentNode && (d.isPicture = "PICTURE" == b.parentNode.nodeName.toUpperCase(), d.isPicture && a.matchMedia && (lazySizes.aC(b, "lazymatchmedia"), k())), d._set = f, Object.defineProperty(b, "_lazypolyfill", {
                        value: d,
                        writable: !0
                    }))
                },
                m = function(b) {
                    var c = a.devicePixelRatio || 1,
                        d = lazySizes.getX && lazySizes.getX(b);
                    return Math.min(d || c, 2.5, c)
                },
                n = function(b) {
                    return a.matchMedia ? (n = function(a) {
                        return !a || (matchMedia(a) || {}).matches
                    })(b) : !b
                },
                o = function(a) {
                    var b, d, g, h, j, k, o;
                    if (h = a, l(h, !0), j = h._lazypolyfill, j.isPicture)
                        for (d = 0, b = a.parentNode.getElementsByTagName("source"), g = b.length; g > d; d++)
                            if (e.supportsType(b[d].getAttribute("type"), a) && n(b[d].getAttribute("media"))) {
                                h = b[d], l(h), j = h._lazypolyfill;
                                break
                            } return j.length > 1 ? (o = h.getAttribute("sizes") || "", o = f.test(o) && parseInt(o, 10) || lazySizes.gW(a, a.parentNode), j.d = m(a), !j.src || !j.w || j.w < o ? (j.w = o, k = i(j.sort(c)), j.src = k) : k = j.src) : k = j[0], k
                },
                p = function(a) {
                    if (!g || !a.parentNode || "PICTURE" == a.parentNode.nodeName.toUpperCase()) {
                        var b = o(a);
                        b && b.u && a._lazypolyfill.cur != b.u && (a._lazypolyfill.cur = b.u, b.cached = !0, a.setAttribute(e.srcAttr, b.u), a.setAttribute("src", b.u))
                    }
                };
            return p.parse = j, p
        }(), e.loadedClass && e.loadingClass && ! function() {
            var a = [];
            ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(b) {
                a.push(b + e.loadedClass), a.push(b + e.loadingClass)
            }), e.pf({
                elements: b.querySelectorAll(a.join(", "))
            })
        }()
    }
}(window, document),
function(a) {
    "use strict";
    var b, c = a.createElement("img");
    !("srcset" in c) || "sizes" in c || window.HTMLPictureElement || (b = /^picture$/i, a.addEventListener("lazybeforeunveil", function(c) {
        var d, e, f, g, h, i, j;
        !c.defaultPrevented && !lazySizesConfig.noIOSFix && (d = c.target) && (f = d.getAttribute(lazySizesConfig.srcsetAttr)) && (e = d.parentNode) && ((h = b.test(e.nodeName || "")) || (g = d.getAttribute("sizes") || d.getAttribute(lazySizesConfig.sizesAttr))) && (i = h ? e : a.createElement("picture"), d._lazyImgSrc || Object.defineProperty(d, "_lazyImgSrc", {
            value: a.createElement("source"),
            writable: !0
        }), j = d._lazyImgSrc, g && j.setAttribute("sizes", g), j.setAttribute(lazySizesConfig.srcsetAttr, f), d.setAttribute("data-pfsrcset", f), d.removeAttribute(lazySizesConfig.srcsetAttr), h || (e.insertBefore(i, d), i.appendChild(d)), i.insertBefore(j, d))
    }))
}(document);
/*! lazysizes - v3.0.0 */
! function() {
    "use strict";
    if (window.addEventListener) {
        var a = /\s+/g,
            b = /\s*\|\s+|\s+\|\s*/g,
            c = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
            d = /\(|\)|'/,
            e = {
                contain: 1,
                cover: 1
            },
            f = function(a) {
                var b = lazySizes.gW(a, a.parentNode);
                return (!a._lazysizesWidth || b > a._lazysizesWidth) && (a._lazysizesWidth = b), a._lazysizesWidth
            },
            g = function(a) {
                var b;
                return b = (getComputedStyle(a) || {
                    getPropertyValue: function() {}
                }).getPropertyValue("background-size"), !e[b] && e[a.style.backgroundSize] && (b = a.style.backgroundSize), b
            },
            h = function(d, e, f) {
                var g = document.createElement("picture"),
                    h = e.getAttribute(lazySizesConfig.sizesAttr),
                    i = e.getAttribute("data-ratio"),
                    j = e.getAttribute("data-optimumx");
                e._lazybgset && e._lazybgset.parentNode == e && e.removeChild(e._lazybgset), Object.defineProperty(f, "_lazybgset", {
                    value: e,
                    writable: !0
                }), Object.defineProperty(e, "_lazybgset", {
                    value: g,
                    writable: !0
                }), d = d.replace(a, " ").split(b), g.style.display = "none", f.className = lazySizesConfig.lazyClass, 1 != d.length || h || (h = "auto"), d.forEach(function(a) {
                    var b = document.createElement("source");
                    h && "auto" != h && b.setAttribute("sizes", h), a.match(c) && (b.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1), RegExp.$2 && b.setAttribute("media", lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2)), g.appendChild(b)
                }), h && (f.setAttribute(lazySizesConfig.sizesAttr, h), e.removeAttribute(lazySizesConfig.sizesAttr), e.removeAttribute("sizes")), j && f.setAttribute("data-optimumx", j), i && f.setAttribute("data-ratio", i), g.appendChild(f), e.appendChild(g)
            },
            i = function(a) {
                if (a.target._lazybgset) {
                    var b = a.target,
                        c = b._lazybgset,
                        e = b.currentSrc || b.src;
                    e && (c.style.backgroundImage = "url(" + (d.test(e) ? JSON.stringify(e) : e) + ")"), b._lazybgsetLoading && (lazySizes.fire(c, "_lazyloaded", {}, !1, !0), delete b._lazybgsetLoading)
                }
            };
        addEventListener("lazybeforeunveil", function(a) {
            var b, c, d;
            !a.defaultPrevented && (b = a.target.getAttribute("data-bgset")) && (d = a.target, c = document.createElement("img"), c.alt = "", c._lazybgsetLoading = !0, a.detail.firesLoad = !0, h(b, d, c), setTimeout(function() {
                lazySizes.loader.unveil(c), lazySizes.rAF(function() {
                    lazySizes.fire(c, "_lazyloaded", {}, !0, !0), c.complete && i({
                        target: c
                    })
                })
            }))
        }), document.addEventListener("load", i, !0), window.addEventListener("lazybeforesizes", function(a) {
            if (a.target._lazybgset && a.detail.dataAttr) {
                var b = a.target._lazybgset,
                    c = g(b);
                e[c] && (a.target._lazysizesParentFit = c, lazySizes.rAF(function() {
                    a.target.setAttribute("data-parent-fit", c), a.target._lazysizesParentFit && delete a.target._lazysizesParentFit
                }))
            }
        }, !0), document.documentElement.addEventListener("lazybeforesizes", function(a) {
            !a.defaultPrevented && a.target._lazybgset && (a.detail.width = f(a.target._lazybgset))
        })
    }
}();