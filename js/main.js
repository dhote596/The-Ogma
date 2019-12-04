! function(a) {
    if ("performance" in a == 0 && (a.performance = {}), "now" in a.performance == 0) {
        var b = Date.now();
        performance.timing && performance.timing.navigationStart && (b = performance.timing.navigationStart), a.performance.now = function() {
            return Date.now() - b
        }
    }
}(window);
var Animation = {};
Animation.Easing = {
        linear: function(a, b, c, d) {
            return c * (a /= d) + b
        },
        easeInQuad: function(a, b, c, d) {
            return c * (a /= d) * a + b
        },
        easeOutQuad: function(a, b, c, d) {
            return -c * (a /= d) * (a - 2) + b
        },
        easeInOutQuad: function(a, b, c, d) {
            return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
        }
    },
    function(a) {
        "use strict";
        var b = Array.prototype.slice,
            c = function(a) {
                var c = document.querySelectorAll(a),
                    d = b.call(c);
                return d.length > 1 ? d : d[0]
            };
        window._ = window._ || c
    }(),
    function(a, b, c) {
        "use strict";

        function d(a, b, c) {
            function d() {
                var b = a.performance.now(),
                    c = b - e._lastTime,
                    f = e.scrollTop - e.previousScrollTop;
                Math.abs(f) / c;
                if (e.scrollDirection = 0 > f ? "UP" : "DOWN", e._lastTime = b, e._animationQueue.length)
                    for (var g = 0; g < e._animationQueue.length; g++)
                        if (e._animationQueue[g].isAnimating()) "scroll" == e._animationQueue[g].durationType ? 0 != f && e._animationQueue[g].update(f) : e._animationQueue[g].update(c), e._animationQueue[g].render();
                        else {
                            for (var h = e._animationQueue.length, i = g; h > i;) e._animationQueue[i] = e._animationQueue[i + 1], i++;
                            e._animationQueue.length--
                        }
                if (e._triggerList.length)
                    for (var g = 0, j = e._triggerList.length; j > g; g++)
                        if ("trigger" == e._triggerList[g].type && e.scrollTop >= e._triggerList[g].top && e._triggerList[g].trigger(), "triggerBox" == e._triggerList[g].type) {
                            var k = 0;
                            e._triggerList[g].triggerPosition && "middle" == e._triggerList[g].triggerPosition ? k = e.screenDimensions.height >> 1 | 0 : e._triggerList[g].triggerPosition && "bottom" == e._triggerList[g].triggerPosition && (k = e.screenDimensions.height);
                            var l = e.scrollTop + k,
                                m = e._triggerList[g].top,
                                n = e._triggerList[g].bottom;
                            e._triggerList[g].duration > 0 ? m > l ? (e._triggerList[g].state = "BEFORE", e._triggerList[g].untrigger()) : l >= m && n > l ? (e._triggerList[g].state = "INSIDE", e._triggerList[g].trigger()) : (e._triggerList[g].state = "AFTER", e._triggerList[g].untrigger()) : m > l ? (e._triggerList[g].state = "BEFORE", e._triggerList[g].untrigger()) : l >= m && n > l + e.screenDimensions.height ? (e._triggerList[g].state = "INSIDE", e._triggerList[g].trigger()) : (e._triggerList[g].state = "AFTER", e._triggerList[g].untrigger())
                        }
                e.isScrolling = !1, e.previousScrollTop = e.scrollTop, requestAnimationFrame(d)
            }
            var e = this;
            this._lastTime, this._windowLoaded, this.screenDimensions, this.scrollTop, this.scrollBottom, this.previousScrollTop, this.isScrolling, this.scrollDirection, this._resizeTimerId, this._resizeQueue, this._animationQueue, this._triggerList, this.init = function(a) {
                this._windowLoaded = !1, this._lastTime = a.performance.now(), this._animationQueue = [], this._triggerList = [], this.isScrolling = !1, this._resizeQueue = [], this.screenDimensions = {
                    width: a.innerWidth,
                    height: a.innerHeight
                }, this.scrollTop = 0 | a.pageYOffset, this.scrollBottom = a.pageYOffset + this.screenDimensions.height | 0, this.previousScrollTop = this.scrollTop, this.calculations(), a.addEventListener("scroll", this.onScroll), a.addEventListener("resize", this.onResize), a.addEventListener("load", this.onLoad), requestAnimationFrame(d)
            }, this.onScroll = function(b) {
                e.isScrolling = !0, e.scrollTop = 0 | a.pageYOffset, e.scrollBottom = a.pageYOffset + e.screenDimensions.height | 0
            }, this.onResize = function(b) {
                clearTimeout(e._resizeTimerId), e._resizeTimerId = setTimeout(function() {
                    if (e.screenDimensions = {
                            width: a.innerWidth,
                            height: a.innerHeight
                        }, e.calculations(), e._resizeQueue.length)
                        for (var b = 0; b < e._resizeQueue.length; b++) e._resizeQueue[b]()
                }, 300)
            }, this.onLoad = function() {
                e._windowLoaded = !0, e.calculations()
            }, this.calculations = function() {
                for (var a = 0; a < e._triggerList.length; a++) e._triggerList[a].calculateTriggerPoints()
            }, this.queue = function(a) {
                this._animationQueue.push(a)
            }, this.addTrigger = function(a) {
                this._triggerList.push(a), a.calculateTriggerPoints()
            }, this.resize = function(a) {
                this._resizeQueue.push(a)
            }, this.init(a)
        }

        function e(a, b, c, d, e, f, g) {
            var g = g || {};
            this.elm = a, this._animationState = 1, this._totalTime = 0, this.from = b || {}, this.to = c || {}, this.duration = d || 600, this.durationType = f || "time", this.easing = e || "easeInOutQuad", this.paused = g.paused || !1, this.easing = Animation.Easing[e] ? Animation.Easing[e] : Animation.Easing.easeInOutQuad, this._styles = [], this.getStyles(), this.paused || l.queue(this)
        }

        function f(c, d) {
            this._animationState = 1, this._totalTime = 0, this.rect = b.querySelector(c).getBoundingClientRect(), this.start = a.pageYOffset, this.top = this.rect.top + this.start, this.change = this.top - this.start, this._totalTime = 0, this.duration = d || 600, this._val = 0, l.queue(this)
        }

        function g(a, b) {
            this.type = "trigger", this._elm = a, this._triggered = !1, this._state = "BEFORE", this.onTrigger = b, this.top = 0, l.addTrigger(this)
        }

        function h(a, b) {
            var b = b || {};
            return this.type = "triggerBox", this._elm = a, this._triggered = !1, this.top = 0, this._oldState = "BEFORE", this.state = "BEFORE", this.onEnter = b.onEnter || function() {}, this.onExit = b.onExit || function() {}, this.triggerPosition = b.triggerPosition || "top", this.duration = b.duration || 0, l.addTrigger(this), this
        }

        function i() {
            new h(o, {
                onEnter: function() {
                    if (o.classList.add("fixed"), "DOWN" == l.scrollDirection)
                        for (var a = q.length - 1; a > 0; a--) q[a].setAttribute("style", "opacity:0;")
                },
                // onExit: function() {
                //     o.classList.remove("fixed")
                // }
            }), new h(p[1], {
                triggerPosition: "middle",
                duration: 300
            }).setTween(new e(q[1], {
                opacity: 0
            }, {
                opacity: 1
            }, 300, "linear", "scroll", {
                paused: !0
            })), new h(p[2], {
                triggerPosition: "middle",
                duration: 300
            }).setTween(new e(q[2], {
                opacity: 0
            }, {
                opacity: 1
            }, 300, "linear", "scroll", {
                paused: !0
            })), new h(p[3], {
                triggerPosition: "middle",
                duration: 300
            }).setTween(new e(q[3], {
                opacity: 0
            }, {
                opacity: 1
            }, 300, "linear", "scroll", {
                paused: !0
            })), new h(p[4], {
                triggerPosition: "middle",
                duration: 300
            }).setTween(new e(q[4], {
                opacity: 0
            }, {
                opacity: 1
            }, 300, "linear", "scroll", {
                paused: !0
            }))
        }

        function j() {
            o.classList.remove("fixed");
            for (var a = q.length - 1; a > 0; a--) q[a].setAttribute("style", "opacity:1;");
            l._triggerList = []
        }

        function k() {
            l.screenDimensions.width < 960 && (l.breakPoint = "small", l.breakPoint != l.oldBreakPoint && (l.oldBreakPoint = "small", j())), l.screenDimensions.width >= 960 && (l.breakPoint = "large", l.breakPoint != l.oldBreakPoint && (l.oldBreakPoint = "large", i()))
        }
        var l = new d(a, b, c);
        a.core = l, e.prototype.getStyles = function() {
            var a = this.elm.getAttribute("style");
            if (a)
                for (var b = a.replace(/\s*/g, ""), c = b ? b.split(";") : [], d = 0; d < c.length; d++)
                    if ("" != c[d].trim()) {
                        var e = c[d].split(":");
                        this._styles[e[0]] = e[1]
                    }
        }, e.prototype.isAnimating = function() {
            return this._animationState
        }, e.prototype.update = function(a) {
            var b = this;
            this._totalTime += a, this._totalTime >= this.duration && (this._animationState = 0, this._totalTime = this.duration), this._totalTime <= 0 && (this._animationState = 0, this._totalTime = 0), Object.keys(this.from).forEach(function(a) {
                b._styles[a] = b.easing(b._totalTime, b.from[a], b.to[a] - b.from[a], b.duration)
            })
        }, e.prototype.render = function() {
            var a = this,
                b = "";
            Object.keys(a._styles).forEach(function(c) {
                var d = c,
                    e = a._styles[c];
                "x" == d && (d = "transform", e = "translate3d(" + e + "px,0,0)"), "y" == d && (d = "transform", e = "translate3d(0," + e + "px,0)"), b += d + ":" + e + ";"
            }), this.elm.setAttribute("style", b)
        }, f.prototype.isAnimating = function() {
            return this._animationState
        }, f.prototype.update = function(a) {
            this._totalTime += a, this._totalTime >= this.duration && (this._animationState = 0, this._totalTime = this.duration), this._totalTime <= 0 && (this._animationState = 0, this._totalTime = 0), this._val = Animation.Easing.easeInOutQuad(this._totalTime, this.start, this.change, this.duration)
        }, f.prototype.render = function() {
            b.body.scrollTop = this._val, b.documentElement.scrollTop = this._val
        }, g.prototype.calculateTriggerPoints = function() {
            this.top = this._elm.offsetTop
        }, g.prototype.trigger = function() {
            this._triggered || (this.onTrigger.call(), this._triggered = !0)
        }, h.prototype.calculateTriggerPoints = function() {
            this.top = this._elm.offsetTop, this.height = this.duration && this.duration > 0 ? this.duration : this._elm.getBoundingClientRect().height, this.bottom = this.top + this.height
        }, h.prototype.setTween = function(a) {
            this._tween = a
        }, h.prototype.trigger = function() {
            this._triggered || (this._triggered = !0, this._oldState = this.state, this.onEnter(), this._tween && (this._tween._animationState = 1, this._tween.getStyles(), l.queue(this._tween)))
        }, h.prototype.untrigger = function() {
            this.state != this._oldState && (this._triggered = !1, this._oldState = this.state, this.onExit(this))
        };
        for (var m = b.querySelectorAll('[rel="internal"]'), n = 0; n < m.length; n++) m[n].addEventListener("click", function(a) {
            var b = this.getAttribute("href");
            new f(b, 1e3), a.preventDefault()
        });
        var o = b.querySelector(".Slabs"),
            p = b.querySelectorAll(".Slab"),
            q = b.querySelectorAll(".Slab-secondary");
        l.breakPoint = "small", l.oldBreakPoint = "small", k(), l.resize(k)
    }(window, document, _);