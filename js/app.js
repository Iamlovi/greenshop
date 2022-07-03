/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      97: function (t) {
        t.exports = (function () {
          "use strict";
          var t = function () {
              return (t =
                Object.assign ||
                function (t) {
                  for (var e, s = 1, i = arguments.length; s < i; s++)
                    for (var n in (e = arguments[s]))
                      Object.prototype.hasOwnProperty.call(e, n) &&
                        (t[n] = e[n]);
                  return t;
                }).apply(this, arguments);
            },
            e = {
              thumbnail: !0,
              animateThumb: !0,
              currentPagerPosition: "middle",
              alignThumbnails: "middle",
              thumbWidth: 100,
              thumbHeight: "80px",
              thumbMargin: 5,
              appendThumbnailsTo: ".lg-components",
              toggleThumb: !1,
              enableThumbDrag: !0,
              enableThumbSwipe: !0,
              thumbnailSwipeThreshold: 10,
              loadYouTubeThumbnail: !0,
              youTubeThumbSize: 1,
              thumbnailPluginStrings: { toggleThumbnails: "Toggle thumbnails" },
            },
            s = "lgContainerResize",
            i = "lgUpdateSlides",
            n = "lgBeforeOpen",
            r = "lgBeforeSlide";
          return (function () {
            function a(t, e) {
              return (
                (this.thumbOuterWidth = 0),
                (this.thumbTotalWidth = 0),
                (this.translateX = 0),
                (this.thumbClickable = !1),
                (this.core = t),
                (this.$LG = e),
                this
              );
            }
            return (
              (a.prototype.init = function () {
                (this.settings = t(t({}, e), this.core.settings)),
                  (this.thumbOuterWidth = 0),
                  (this.thumbTotalWidth =
                    this.core.galleryItems.length *
                    (this.settings.thumbWidth + this.settings.thumbMargin)),
                  (this.translateX = 0),
                  this.setAnimateThumbStyles(),
                  this.core.settings.allowMediaOverlap ||
                    (this.settings.toggleThumb = !1),
                  this.settings.thumbnail &&
                    (this.build(),
                    this.settings.animateThumb
                      ? (this.settings.enableThumbDrag &&
                          this.enableThumbDrag(),
                        this.settings.enableThumbSwipe &&
                          this.enableThumbSwipe(),
                        (this.thumbClickable = !1))
                      : (this.thumbClickable = !0),
                    this.toggleThumbBar(),
                    this.thumbKeyPress());
              }),
              (a.prototype.build = function () {
                var t = this;
                this.setThumbMarkup(),
                  this.manageActiveClassOnSlideChange(),
                  this.$lgThumb
                    .first()
                    .on("click.lg touchend.lg", function (e) {
                      var s = t.$LG(e.target);
                      s.hasAttribute("data-lg-item-id") &&
                        setTimeout(function () {
                          if (t.thumbClickable && !t.core.lgBusy) {
                            var e = parseInt(s.attr("data-lg-item-id"));
                            t.core.slide(e, !1, !0, !1);
                          }
                        }, 50);
                    }),
                  this.core.LGel.on(r + ".thumb", function (e) {
                    var s = e.detail.index;
                    t.animateThumb(s);
                  }),
                  this.core.LGel.on(n + ".thumb", function () {
                    t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                  }),
                  this.core.LGel.on(i + ".thumb", function () {
                    t.rebuildThumbnails();
                  }),
                  this.core.LGel.on(s + ".thumb", function () {
                    t.core.lgOpened &&
                      setTimeout(function () {
                        (t.thumbOuterWidth = t.core.outer.get().offsetWidth),
                          t.animateThumb(t.core.index),
                          (t.thumbOuterWidth = t.core.outer.get().offsetWidth);
                      }, 50);
                  });
              }),
              (a.prototype.setThumbMarkup = function () {
                var t = "lg-thumb-outer ";
                this.settings.alignThumbnails &&
                  (t += "lg-thumb-align-" + this.settings.alignThumbnails);
                var e =
                  '<div class="' +
                  t +
                  '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
                this.core.outer.addClass("lg-has-thumb"),
                  ".lg-components" === this.settings.appendThumbnailsTo
                    ? this.core.$lgComponents.append(e)
                    : this.core.outer.append(e),
                  (this.$thumbOuter = this.core.outer
                    .find(".lg-thumb-outer")
                    .first()),
                  (this.$lgThumb = this.core.outer.find(".lg-thumb").first()),
                  this.settings.animateThumb &&
                    this.core.outer
                      .find(".lg-thumb")
                      .css(
                        "transition-duration",
                        this.core.settings.speed + "ms"
                      )
                      .css("width", this.thumbTotalWidth + "px")
                      .css("position", "relative"),
                  this.setThumbItemHtml(this.core.galleryItems);
              }),
              (a.prototype.enableThumbDrag = function () {
                var t = this,
                  e = {
                    cords: { startX: 0, endX: 0 },
                    isMoved: !1,
                    newTranslateX: 0,
                    startTime: new Date(),
                    endTime: new Date(),
                    touchMoveTime: 0,
                  },
                  s = !1;
                this.$thumbOuter.addClass("lg-grab"),
                  this.core.outer
                    .find(".lg-thumb")
                    .first()
                    .on("mousedown.lg.thumb", function (i) {
                      t.thumbTotalWidth > t.thumbOuterWidth &&
                        (i.preventDefault(),
                        (e.cords.startX = i.pageX),
                        (e.startTime = new Date()),
                        (t.thumbClickable = !1),
                        (s = !0),
                        (t.core.outer.get().scrollLeft += 1),
                        (t.core.outer.get().scrollLeft -= 1),
                        t.$thumbOuter
                          .removeClass("lg-grab")
                          .addClass("lg-grabbing"));
                    }),
                  this.$LG(window).on(
                    "mousemove.lg.thumb.global" + this.core.lgId,
                    function (i) {
                      t.core.lgOpened &&
                        s &&
                        ((e.cords.endX = i.pageX), (e = t.onThumbTouchMove(e)));
                    }
                  ),
                  this.$LG(window).on(
                    "mouseup.lg.thumb.global" + this.core.lgId,
                    function () {
                      t.core.lgOpened &&
                        (e.isMoved
                          ? (e = t.onThumbTouchEnd(e))
                          : (t.thumbClickable = !0),
                        s &&
                          ((s = !1),
                          t.$thumbOuter
                            .removeClass("lg-grabbing")
                            .addClass("lg-grab")));
                    }
                  );
              }),
              (a.prototype.enableThumbSwipe = function () {
                var t = this,
                  e = {
                    cords: { startX: 0, endX: 0 },
                    isMoved: !1,
                    newTranslateX: 0,
                    startTime: new Date(),
                    endTime: new Date(),
                    touchMoveTime: 0,
                  };
                this.$lgThumb.on("touchstart.lg", function (s) {
                  t.thumbTotalWidth > t.thumbOuterWidth &&
                    (s.preventDefault(),
                    (e.cords.startX = s.targetTouches[0].pageX),
                    (t.thumbClickable = !1),
                    (e.startTime = new Date()));
                }),
                  this.$lgThumb.on("touchmove.lg", function (s) {
                    t.thumbTotalWidth > t.thumbOuterWidth &&
                      (s.preventDefault(),
                      (e.cords.endX = s.targetTouches[0].pageX),
                      (e = t.onThumbTouchMove(e)));
                  }),
                  this.$lgThumb.on("touchend.lg", function () {
                    e.isMoved
                      ? (e = t.onThumbTouchEnd(e))
                      : (t.thumbClickable = !0);
                  });
              }),
              (a.prototype.rebuildThumbnails = function () {
                var t = this;
                this.$thumbOuter.addClass("lg-rebuilding-thumbnails"),
                  setTimeout(function () {
                    (t.thumbTotalWidth =
                      t.core.galleryItems.length *
                      (t.settings.thumbWidth + t.settings.thumbMargin)),
                      t.$lgThumb.css("width", t.thumbTotalWidth + "px"),
                      t.$lgThumb.empty(),
                      t.setThumbItemHtml(t.core.galleryItems),
                      t.animateThumb(t.core.index);
                  }, 50),
                  setTimeout(function () {
                    t.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                  }, 200);
              }),
              (a.prototype.setTranslate = function (t) {
                this.$lgThumb.css(
                  "transform",
                  "translate3d(-" + t + "px, 0px, 0px)"
                );
              }),
              (a.prototype.getPossibleTransformX = function (t) {
                return (
                  t > this.thumbTotalWidth - this.thumbOuterWidth &&
                    (t = this.thumbTotalWidth - this.thumbOuterWidth),
                  t < 0 && (t = 0),
                  t
                );
              }),
              (a.prototype.animateThumb = function (t) {
                if (
                  (this.$lgThumb.css(
                    "transition-duration",
                    this.core.settings.speed + "ms"
                  ),
                  this.settings.animateThumb)
                ) {
                  var e = 0;
                  switch (this.settings.currentPagerPosition) {
                    case "left":
                      e = 0;
                      break;
                    case "middle":
                      e =
                        this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                      break;
                    case "right":
                      e = this.thumbOuterWidth - this.settings.thumbWidth;
                  }
                  (this.translateX =
                    (this.settings.thumbWidth + this.settings.thumbMargin) * t -
                    1 -
                    e),
                    this.translateX >
                      this.thumbTotalWidth - this.thumbOuterWidth &&
                      (this.translateX =
                        this.thumbTotalWidth - this.thumbOuterWidth),
                    this.translateX < 0 && (this.translateX = 0),
                    this.setTranslate(this.translateX);
                }
              }),
              (a.prototype.onThumbTouchMove = function (t) {
                return (
                  (t.newTranslateX = this.translateX),
                  (t.isMoved = !0),
                  (t.touchMoveTime = new Date().valueOf()),
                  (t.newTranslateX -= t.cords.endX - t.cords.startX),
                  (t.newTranslateX = this.getPossibleTransformX(
                    t.newTranslateX
                  )),
                  this.setTranslate(t.newTranslateX),
                  this.$thumbOuter.addClass("lg-dragging"),
                  t
                );
              }),
              (a.prototype.onThumbTouchEnd = function (t) {
                (t.isMoved = !1),
                  (t.endTime = new Date()),
                  this.$thumbOuter.removeClass("lg-dragging");
                var e = t.endTime.valueOf() - t.startTime.valueOf(),
                  s = t.cords.endX - t.cords.startX,
                  i = Math.abs(s) / e;
                return (
                  i > 0.15 && t.endTime.valueOf() - t.touchMoveTime < 30
                    ? ((i += 1) > 2 && (i += 1),
                      (i += i * (Math.abs(s) / this.thumbOuterWidth)),
                      this.$lgThumb.css(
                        "transition-duration",
                        Math.min(i - 1, 2) + "settings"
                      ),
                      (s *= i),
                      (this.translateX = this.getPossibleTransformX(
                        this.translateX - s
                      )),
                      this.setTranslate(this.translateX))
                    : (this.translateX = t.newTranslateX),
                  Math.abs(t.cords.endX - t.cords.startX) <
                    this.settings.thumbnailSwipeThreshold &&
                    (this.thumbClickable = !0),
                  t
                );
              }),
              (a.prototype.getThumbHtml = function (t, e) {
                var s,
                  i = this.core.galleryItems[e].__slideVideoInfo || {};
                return (
                  (s =
                    i.youtube && this.settings.loadYouTubeThumbnail
                      ? "//img.youtube.com/vi/" +
                        i.youtube[1] +
                        "/" +
                        this.settings.youTubeThumbSize +
                        ".jpg"
                      : t),
                  '<div data-lg-item-id="' +
                    e +
                    '" class="lg-thumb-item ' +
                    (e === this.core.index ? " active" : "") +
                    '" \n        style="width:' +
                    this.settings.thumbWidth +
                    "px; height: " +
                    this.settings.thumbHeight +
                    ";\n            margin-right: " +
                    this.settings.thumbMargin +
                    'px;">\n            <img data-lg-item-id="' +
                    e +
                    '" src="' +
                    s +
                    '" />\n        </div>'
                );
              }),
              (a.prototype.getThumbItemHtml = function (t) {
                for (var e = "", s = 0; s < t.length; s++)
                  e += this.getThumbHtml(t[s].thumb, s);
                return e;
              }),
              (a.prototype.setThumbItemHtml = function (t) {
                var e = this.getThumbItemHtml(t);
                this.$lgThumb.html(e);
              }),
              (a.prototype.setAnimateThumbStyles = function () {
                this.settings.animateThumb &&
                  this.core.outer.addClass("lg-animate-thumb");
              }),
              (a.prototype.manageActiveClassOnSlideChange = function () {
                var t = this;
                this.core.LGel.on(r + ".thumb", function (e) {
                  var s = t.core.outer.find(".lg-thumb-item"),
                    i = e.detail.index;
                  s.removeClass("active"), s.eq(i).addClass("active");
                });
              }),
              (a.prototype.toggleThumbBar = function () {
                var t = this;
                this.settings.toggleThumb &&
                  (this.core.outer.addClass("lg-can-toggle"),
                  this.core.$toolbar.append(
                    '<button type="button" aria-label="' +
                      this.settings.thumbnailPluginStrings.toggleThumbnails +
                      '" class="lg-toggle-thumb lg-icon"></button>'
                  ),
                  this.core.outer
                    .find(".lg-toggle-thumb")
                    .first()
                    .on("click.lg", function () {
                      t.core.outer.toggleClass("lg-components-open");
                    }));
              }),
              (a.prototype.thumbKeyPress = function () {
                var t = this;
                this.$LG(window).on(
                  "keydown.lg.thumb.global" + this.core.lgId,
                  function (e) {
                    t.core.lgOpened &&
                      t.settings.toggleThumb &&
                      (38 === e.keyCode
                        ? (e.preventDefault(),
                          t.core.outer.addClass("lg-components-open"))
                        : 40 === e.keyCode &&
                          (e.preventDefault(),
                          t.core.outer.removeClass("lg-components-open")));
                  }
                );
              }),
              (a.prototype.destroy = function () {
                this.settings.thumbnail &&
                  (this.$LG(window).off(".lg.thumb.global" + this.core.lgId),
                  this.core.LGel.off(".lg.thumb"),
                  this.core.LGel.off(".thumb"),
                  this.$thumbOuter.remove(),
                  this.core.outer.removeClass("lg-has-thumb"));
              }),
              a
            );
          })();
        })();
      },
      211: function (t, e) {
        !(function (t) {
          "use strict";
          function e(t) {
            return s(t) && "function" == typeof t.from;
          }
          function s(t) {
            return "object" == typeof t && "function" == typeof t.to;
          }
          function i(t) {
            t.parentElement.removeChild(t);
          }
          function n(t) {
            return null != t;
          }
          function r(t) {
            t.preventDefault();
          }
          function a(t) {
            return t.filter(function (t) {
              return !this[t] && (this[t] = !0);
            }, {});
          }
          function o(t, e) {
            return Math.round(t / e) * e;
          }
          function l(t, e) {
            var s = t.getBoundingClientRect(),
              i = t.ownerDocument,
              n = i.documentElement,
              r = v(i);
            return (
              /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (r.x = 0),
              e ? s.top + r.y - n.clientTop : s.left + r.x - n.clientLeft
            );
          }
          function c(t) {
            return "number" == typeof t && !isNaN(t) && isFinite(t);
          }
          function d(t, e, s) {
            s > 0 &&
              (m(t, e),
              setTimeout(function () {
                f(t, e);
              }, s));
          }
          function u(t) {
            return Math.max(Math.min(t, 100), 0);
          }
          function p(t) {
            return Array.isArray(t) ? t : [t];
          }
          function h(t) {
            var e = (t = String(t)).split(".");
            return e.length > 1 ? e[1].length : 0;
          }
          function m(t, e) {
            t.classList && !/\s/.test(e)
              ? t.classList.add(e)
              : (t.className += " " + e);
          }
          function f(t, e) {
            t.classList && !/\s/.test(e)
              ? t.classList.remove(e)
              : (t.className = t.className.replace(
                  new RegExp(
                    "(^|\\b)" + e.split(" ").join("|") + "(\\b|$)",
                    "gi"
                  ),
                  " "
                ));
          }
          function g(t, e) {
            return t.classList
              ? t.classList.contains(e)
              : new RegExp("\\b" + e + "\\b").test(t.className);
          }
          function v(t) {
            var e = void 0 !== window.pageXOffset,
              s = "CSS1Compat" === (t.compatMode || "");
            return {
              x: e
                ? window.pageXOffset
                : s
                ? t.documentElement.scrollLeft
                : t.body.scrollLeft,
              y: e
                ? window.pageYOffset
                : s
                ? t.documentElement.scrollTop
                : t.body.scrollTop,
            };
          }
          function _() {
            return window.navigator.pointerEnabled
              ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
              : window.navigator.msPointerEnabled
              ? {
                  start: "MSPointerDown",
                  move: "MSPointerMove",
                  end: "MSPointerUp",
                }
              : {
                  start: "mousedown touchstart",
                  move: "mousemove touchmove",
                  end: "mouseup touchend",
                };
          }
          function b() {
            var t = !1;
            try {
              var e = Object.defineProperty({}, "passive", {
                get: function () {
                  t = !0;
                },
              });
              window.addEventListener("test", null, e);
            } catch (t) {}
            return t;
          }
          function y() {
            return (
              window.CSS && CSS.supports && CSS.supports("touch-action", "none")
            );
          }
          function w(t, e) {
            return 100 / (e - t);
          }
          function S(t, e, s) {
            return (100 * e) / (t[s + 1] - t[s]);
          }
          function C(t, e) {
            return S(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0], 0);
          }
          function x(t, e) {
            return (e * (t[1] - t[0])) / 100 + t[0];
          }
          function T(t, e) {
            for (var s = 1; t >= e[s]; ) s += 1;
            return s;
          }
          function E(t, e, s) {
            if (s >= t.slice(-1)[0]) return 100;
            var i = T(s, t),
              n = t[i - 1],
              r = t[i],
              a = e[i - 1],
              o = e[i];
            return a + C([n, r], s) / w(a, o);
          }
          function L(t, e, s) {
            if (s >= 100) return t.slice(-1)[0];
            var i = T(s, e),
              n = t[i - 1],
              r = t[i],
              a = e[i - 1];
            return x([n, r], (s - a) * w(a, e[i]));
          }
          function A(t, e, s, i) {
            if (100 === i) return i;
            var n = T(i, t),
              r = t[n - 1],
              a = t[n];
            return s
              ? i - r > (a - r) / 2
                ? a
                : r
              : e[n - 1]
              ? t[n - 1] + o(i - t[n - 1], e[n - 1])
              : i;
          }
          var O, k;
          (t.PipsMode = void 0),
            ((k = t.PipsMode || (t.PipsMode = {})).Range = "range"),
            (k.Steps = "steps"),
            (k.Positions = "positions"),
            (k.Count = "count"),
            (k.Values = "values"),
            (t.PipsType = void 0),
            ((O = t.PipsType || (t.PipsType = {}))[(O.None = -1)] = "None"),
            (O[(O.NoValue = 0)] = "NoValue"),
            (O[(O.LargeValue = 1)] = "LargeValue"),
            (O[(O.SmallValue = 2)] = "SmallValue");
          var M = (function () {
              function t(t, e, s) {
                var i;
                (this.xPct = []),
                  (this.xVal = []),
                  (this.xSteps = []),
                  (this.xNumSteps = []),
                  (this.xHighestCompleteStep = []),
                  (this.xSteps = [s || !1]),
                  (this.xNumSteps = [!1]),
                  (this.snap = e);
                var n = [];
                for (
                  Object.keys(t).forEach(function (e) {
                    n.push([p(t[e]), e]);
                  }),
                    n.sort(function (t, e) {
                      return t[0][0] - e[0][0];
                    }),
                    i = 0;
                  i < n.length;
                  i++
                )
                  this.handleEntryPoint(n[i][1], n[i][0]);
                for (
                  this.xNumSteps = this.xSteps.slice(0), i = 0;
                  i < this.xNumSteps.length;
                  i++
                )
                  this.handleStepPoint(i, this.xNumSteps[i]);
              }
              return (
                (t.prototype.getDistance = function (t) {
                  for (var e = [], s = 0; s < this.xNumSteps.length - 1; s++)
                    e[s] = S(this.xVal, t, s);
                  return e;
                }),
                (t.prototype.getAbsoluteDistance = function (t, e, s) {
                  var i,
                    n = 0;
                  if (t < this.xPct[this.xPct.length - 1])
                    for (; t > this.xPct[n + 1]; ) n++;
                  else
                    t === this.xPct[this.xPct.length - 1] &&
                      (n = this.xPct.length - 2);
                  s || t !== this.xPct[n + 1] || n++, null === e && (e = []);
                  var r = 1,
                    a = e[n],
                    o = 0,
                    l = 0,
                    c = 0,
                    d = 0;
                  for (
                    i = s
                      ? (t - this.xPct[n]) / (this.xPct[n + 1] - this.xPct[n])
                      : (this.xPct[n + 1] - t) /
                        (this.xPct[n + 1] - this.xPct[n]);
                    a > 0;

                  )
                    (o = this.xPct[n + 1 + d] - this.xPct[n + d]),
                      e[n + d] * r + 100 - 100 * i > 100
                        ? ((l = o * i), (r = (a - 100 * i) / e[n + d]), (i = 1))
                        : ((l = ((e[n + d] * o) / 100) * r), (r = 0)),
                      s
                        ? ((c -= l), this.xPct.length + d >= 1 && d--)
                        : ((c += l), this.xPct.length - d >= 1 && d++),
                      (a = e[n + d] * r);
                  return t + c;
                }),
                (t.prototype.toStepping = function (t) {
                  return (t = E(this.xVal, this.xPct, t));
                }),
                (t.prototype.fromStepping = function (t) {
                  return L(this.xVal, this.xPct, t);
                }),
                (t.prototype.getStep = function (t) {
                  return (t = A(this.xPct, this.xSteps, this.snap, t));
                }),
                (t.prototype.getDefaultStep = function (t, e, s) {
                  var i = T(t, this.xPct);
                  return (
                    (100 === t || (e && t === this.xPct[i - 1])) &&
                      (i = Math.max(i - 1, 1)),
                    (this.xVal[i] - this.xVal[i - 1]) / s
                  );
                }),
                (t.prototype.getNearbySteps = function (t) {
                  var e = T(t, this.xPct);
                  return {
                    stepBefore: {
                      startValue: this.xVal[e - 2],
                      step: this.xNumSteps[e - 2],
                      highestStep: this.xHighestCompleteStep[e - 2],
                    },
                    thisStep: {
                      startValue: this.xVal[e - 1],
                      step: this.xNumSteps[e - 1],
                      highestStep: this.xHighestCompleteStep[e - 1],
                    },
                    stepAfter: {
                      startValue: this.xVal[e],
                      step: this.xNumSteps[e],
                      highestStep: this.xHighestCompleteStep[e],
                    },
                  };
                }),
                (t.prototype.countStepDecimals = function () {
                  var t = this.xNumSteps.map(h);
                  return Math.max.apply(null, t);
                }),
                (t.prototype.hasNoSize = function () {
                  return this.xVal[0] === this.xVal[this.xVal.length - 1];
                }),
                (t.prototype.convert = function (t) {
                  return this.getStep(this.toStepping(t));
                }),
                (t.prototype.handleEntryPoint = function (t, e) {
                  var s;
                  if (
                    !c(
                      (s = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t))
                    ) ||
                    !c(e[0])
                  )
                    throw new Error("noUiSlider: 'range' value isn't numeric.");
                  this.xPct.push(s), this.xVal.push(e[0]);
                  var i = Number(e[1]);
                  s
                    ? this.xSteps.push(!isNaN(i) && i)
                    : isNaN(i) || (this.xSteps[0] = i),
                    this.xHighestCompleteStep.push(0);
                }),
                (t.prototype.handleStepPoint = function (t, e) {
                  if (e)
                    if (this.xVal[t] !== this.xVal[t + 1]) {
                      this.xSteps[t] =
                        S([this.xVal[t], this.xVal[t + 1]], e, 0) /
                        w(this.xPct[t], this.xPct[t + 1]);
                      var s =
                          (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t],
                        i = Math.ceil(Number(s.toFixed(3)) - 1),
                        n = this.xVal[t] + this.xNumSteps[t] * i;
                      this.xHighestCompleteStep[t] = n;
                    } else
                      this.xSteps[t] = this.xHighestCompleteStep[t] =
                        this.xVal[t];
                }),
                t
              );
            })(),
            P = {
              to: function (t) {
                return void 0 === t ? "" : t.toFixed(2);
              },
              from: Number,
            },
            $ = {
              target: "target",
              base: "base",
              origin: "origin",
              handle: "handle",
              handleLower: "handle-lower",
              handleUpper: "handle-upper",
              touchArea: "touch-area",
              horizontal: "horizontal",
              vertical: "vertical",
              background: "background",
              connect: "connect",
              connects: "connects",
              ltr: "ltr",
              rtl: "rtl",
              textDirectionLtr: "txt-dir-ltr",
              textDirectionRtl: "txt-dir-rtl",
              draggable: "draggable",
              drag: "state-drag",
              tap: "state-tap",
              active: "active",
              tooltip: "tooltip",
              pips: "pips",
              pipsHorizontal: "pips-horizontal",
              pipsVertical: "pips-vertical",
              marker: "marker",
              markerHorizontal: "marker-horizontal",
              markerVertical: "marker-vertical",
              markerNormal: "marker-normal",
              markerLarge: "marker-large",
              markerSub: "marker-sub",
              value: "value",
              valueHorizontal: "value-horizontal",
              valueVertical: "value-vertical",
              valueNormal: "value-normal",
              valueLarge: "value-large",
              valueSub: "value-sub",
            },
            I = { tooltips: ".__tooltips", aria: ".__aria" };
          function D(t, e) {
            if (!c(e)) throw new Error("noUiSlider: 'step' is not numeric.");
            t.singleStep = e;
          }
          function z(t, e) {
            if (!c(e))
              throw new Error(
                "noUiSlider: 'keyboardPageMultiplier' is not numeric."
              );
            t.keyboardPageMultiplier = e;
          }
          function q(t, e) {
            if (!c(e))
              throw new Error(
                "noUiSlider: 'keyboardMultiplier' is not numeric."
              );
            t.keyboardMultiplier = e;
          }
          function B(t, e) {
            if (!c(e))
              throw new Error(
                "noUiSlider: 'keyboardDefaultStep' is not numeric."
              );
            t.keyboardDefaultStep = e;
          }
          function N(t, e) {
            if ("object" != typeof e || Array.isArray(e))
              throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === e.min || void 0 === e.max)
              throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            t.spectrum = new M(e, t.snap || !1, t.singleStep);
          }
          function F(t, e) {
            if (((e = p(e)), !Array.isArray(e) || !e.length))
              throw new Error("noUiSlider: 'start' option is incorrect.");
            (t.handles = e.length), (t.start = e);
          }
          function H(t, e) {
            if ("boolean" != typeof e)
              throw new Error("noUiSlider: 'snap' option must be a boolean.");
            t.snap = e;
          }
          function G(t, e) {
            if ("boolean" != typeof e)
              throw new Error(
                "noUiSlider: 'animate' option must be a boolean."
              );
            t.animate = e;
          }
          function V(t, e) {
            if ("number" != typeof e)
              throw new Error(
                "noUiSlider: 'animationDuration' option must be a number."
              );
            t.animationDuration = e;
          }
          function R(t, e) {
            var s,
              i = [!1];
            if (
              ("lower" === e ? (e = [!0, !1]) : "upper" === e && (e = [!1, !0]),
              !0 === e || !1 === e)
            ) {
              for (s = 1; s < t.handles; s++) i.push(e);
              i.push(!1);
            } else {
              if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1)
                throw new Error(
                  "noUiSlider: 'connect' option doesn't match handle count."
                );
              i = e;
            }
            t.connect = i;
          }
          function j(t, e) {
            switch (e) {
              case "horizontal":
                t.ort = 0;
                break;
              case "vertical":
                t.ort = 1;
                break;
              default:
                throw new Error("noUiSlider: 'orientation' option is invalid.");
            }
          }
          function W(t, e) {
            if (!c(e))
              throw new Error("noUiSlider: 'margin' option must be numeric.");
            0 !== e && (t.margin = t.spectrum.getDistance(e));
          }
          function X(t, e) {
            if (!c(e))
              throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (
              ((t.limit = t.spectrum.getDistance(e)), !t.limit || t.handles < 2)
            )
              throw new Error(
                "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles."
              );
          }
          function U(t, e) {
            var s;
            if (!c(e) && !Array.isArray(e))
              throw new Error(
                "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
              );
            if (Array.isArray(e) && 2 !== e.length && !c(e[0]) && !c(e[1]))
              throw new Error(
                "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
              );
            if (0 !== e) {
              for (
                Array.isArray(e) || (e = [e, e]),
                  t.padding = [
                    t.spectrum.getDistance(e[0]),
                    t.spectrum.getDistance(e[1]),
                  ],
                  s = 0;
                s < t.spectrum.xNumSteps.length - 1;
                s++
              )
                if (t.padding[0][s] < 0 || t.padding[1][s] < 0)
                  throw new Error(
                    "noUiSlider: 'padding' option must be a positive number(s)."
                  );
              var i = e[0] + e[1],
                n = t.spectrum.xVal[0];
              if (i / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - n) > 1)
                throw new Error(
                  "noUiSlider: 'padding' option must not exceed 100% of the range."
                );
            }
          }
          function Y(t, e) {
            switch (e) {
              case "ltr":
                t.dir = 0;
                break;
              case "rtl":
                t.dir = 1;
                break;
              default:
                throw new Error(
                  "noUiSlider: 'direction' option was not recognized."
                );
            }
          }
          function Q(t, e) {
            if ("string" != typeof e)
              throw new Error(
                "noUiSlider: 'behaviour' must be a string containing options."
              );
            var s = e.indexOf("tap") >= 0,
              i = e.indexOf("drag") >= 0,
              n = e.indexOf("fixed") >= 0,
              r = e.indexOf("snap") >= 0,
              a = e.indexOf("hover") >= 0,
              o = e.indexOf("unconstrained") >= 0,
              l = e.indexOf("drag-all") >= 0,
              c = e.indexOf("smooth-steps") >= 0;
            if (n) {
              if (2 !== t.handles)
                throw new Error(
                  "noUiSlider: 'fixed' behaviour must be used with 2 handles"
                );
              W(t, t.start[1] - t.start[0]);
            }
            if (o && (t.margin || t.limit))
              throw new Error(
                "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit"
              );
            t.events = {
              tap: s || r,
              drag: i,
              dragAll: l,
              smoothSteps: c,
              fixed: n,
              snap: r,
              hover: a,
              unconstrained: o,
            };
          }
          function K(t, e) {
            if (!1 !== e)
              if (!0 === e || s(e)) {
                t.tooltips = [];
                for (var i = 0; i < t.handles; i++) t.tooltips.push(e);
              } else {
                if ((e = p(e)).length !== t.handles)
                  throw new Error(
                    "noUiSlider: must pass a formatter for all handles."
                  );
                e.forEach(function (t) {
                  if ("boolean" != typeof t && !s(t))
                    throw new Error(
                      "noUiSlider: 'tooltips' must be passed a formatter or 'false'."
                    );
                }),
                  (t.tooltips = e);
              }
          }
          function Z(t, e) {
            if (e.length !== t.handles)
              throw new Error(
                "noUiSlider: must pass a attributes for all handles."
              );
            t.handleAttributes = e;
          }
          function J(t, e) {
            if (!s(e))
              throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
            t.ariaFormat = e;
          }
          function tt(t, s) {
            if (!e(s))
              throw new Error(
                "noUiSlider: 'format' requires 'to' and 'from' methods."
              );
            t.format = s;
          }
          function et(t, e) {
            if ("boolean" != typeof e)
              throw new Error(
                "noUiSlider: 'keyboardSupport' option must be a boolean."
              );
            t.keyboardSupport = e;
          }
          function st(t, e) {
            t.documentElement = e;
          }
          function it(t, e) {
            if ("string" != typeof e && !1 !== e)
              throw new Error(
                "noUiSlider: 'cssPrefix' must be a string or `false`."
              );
            t.cssPrefix = e;
          }
          function nt(t, e) {
            if ("object" != typeof e)
              throw new Error("noUiSlider: 'cssClasses' must be an object.");
            "string" == typeof t.cssPrefix
              ? ((t.cssClasses = {}),
                Object.keys(e).forEach(function (s) {
                  t.cssClasses[s] = t.cssPrefix + e[s];
                }))
              : (t.cssClasses = e);
          }
          function rt(t) {
            var e = {
                margin: null,
                limit: null,
                padding: null,
                animate: !0,
                animationDuration: 300,
                ariaFormat: P,
                format: P,
              },
              s = {
                step: { r: !1, t: D },
                keyboardPageMultiplier: { r: !1, t: z },
                keyboardMultiplier: { r: !1, t: q },
                keyboardDefaultStep: { r: !1, t: B },
                start: { r: !0, t: F },
                connect: { r: !0, t: R },
                direction: { r: !0, t: Y },
                snap: { r: !1, t: H },
                animate: { r: !1, t: G },
                animationDuration: { r: !1, t: V },
                range: { r: !0, t: N },
                orientation: { r: !1, t: j },
                margin: { r: !1, t: W },
                limit: { r: !1, t: X },
                padding: { r: !1, t: U },
                behaviour: { r: !0, t: Q },
                ariaFormat: { r: !1, t: J },
                format: { r: !1, t: tt },
                tooltips: { r: !1, t: K },
                keyboardSupport: { r: !0, t: et },
                documentElement: { r: !1, t: st },
                cssPrefix: { r: !0, t: it },
                cssClasses: { r: !0, t: nt },
                handleAttributes: { r: !1, t: Z },
              },
              i = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                keyboardSupport: !0,
                cssPrefix: "noUi-",
                cssClasses: $,
                keyboardPageMultiplier: 5,
                keyboardMultiplier: 1,
                keyboardDefaultStep: 10,
              };
            t.format && !t.ariaFormat && (t.ariaFormat = t.format),
              Object.keys(s).forEach(function (r) {
                if (n(t[r]) || void 0 !== i[r])
                  s[r].t(e, n(t[r]) ? t[r] : i[r]);
                else if (s[r].r)
                  throw new Error("noUiSlider: '" + r + "' is required.");
              }),
              (e.pips = t.pips);
            var r = document.createElement("div"),
              a = void 0 !== r.style.msTransform,
              o = void 0 !== r.style.transform;
            e.transformRule = o
              ? "transform"
              : a
              ? "msTransform"
              : "webkitTransform";
            var l = [
              ["left", "top"],
              ["right", "bottom"],
            ];
            return (e.style = l[e.dir][e.ort]), e;
          }
          function at(e, s, o) {
            var c,
              h,
              w,
              S,
              C,
              x = _(),
              T = y() && b(),
              E = e,
              L = s.spectrum,
              A = [],
              O = [],
              k = [],
              M = 0,
              P = {},
              $ = e.ownerDocument,
              D = s.documentElement || $.documentElement,
              z = $.body,
              q = "rtl" === $.dir || 1 === s.ort ? 0 : 100;
            function B(t, e) {
              var s = $.createElement("div");
              return e && m(s, e), t.appendChild(s), s;
            }
            function N(t, e) {
              var i = B(t, s.cssClasses.origin),
                n = B(i, s.cssClasses.handle);
              if (
                (B(n, s.cssClasses.touchArea),
                n.setAttribute("data-handle", String(e)),
                s.keyboardSupport &&
                  (n.setAttribute("tabindex", "0"),
                  n.addEventListener("keydown", function (t) {
                    return ht(t, e);
                  })),
                void 0 !== s.handleAttributes)
              ) {
                var r = s.handleAttributes[e];
                Object.keys(r).forEach(function (t) {
                  n.setAttribute(t, r[t]);
                });
              }
              return (
                n.setAttribute("role", "slider"),
                n.setAttribute(
                  "aria-orientation",
                  s.ort ? "vertical" : "horizontal"
                ),
                0 === e
                  ? m(n, s.cssClasses.handleLower)
                  : e === s.handles - 1 && m(n, s.cssClasses.handleUpper),
                i
              );
            }
            function F(t, e) {
              return !!e && B(t, s.cssClasses.connect);
            }
            function H(t, e) {
              var i = B(e, s.cssClasses.connects);
              (h = []), (w = []).push(F(i, t[0]));
              for (var n = 0; n < s.handles; n++)
                h.push(N(e, n)), (k[n] = n), w.push(F(i, t[n + 1]));
            }
            function G(t) {
              return (
                m(t, s.cssClasses.target),
                0 === s.dir ? m(t, s.cssClasses.ltr) : m(t, s.cssClasses.rtl),
                0 === s.ort
                  ? m(t, s.cssClasses.horizontal)
                  : m(t, s.cssClasses.vertical),
                m(
                  t,
                  "rtl" === getComputedStyle(t).direction
                    ? s.cssClasses.textDirectionRtl
                    : s.cssClasses.textDirectionLtr
                ),
                B(t, s.cssClasses.base)
              );
            }
            function V(t, e) {
              return (
                !(!s.tooltips || !s.tooltips[e]) &&
                B(t.firstChild, s.cssClasses.tooltip)
              );
            }
            function R() {
              return E.hasAttribute("disabled");
            }
            function j(t) {
              return h[t].hasAttribute("disabled");
            }
            function W() {
              C &&
                (vt("update" + I.tooltips),
                C.forEach(function (t) {
                  t && i(t);
                }),
                (C = null));
            }
            function X() {
              W(),
                (C = h.map(V)),
                ft("update" + I.tooltips, function (t, e, i) {
                  if (C && s.tooltips && !1 !== C[e]) {
                    var n = t[e];
                    !0 !== s.tooltips[e] && (n = s.tooltips[e].to(i[e])),
                      (C[e].innerHTML = n);
                  }
                });
            }
            function U() {
              vt("update" + I.aria),
                ft("update" + I.aria, function (t, e, i, n, r) {
                  k.forEach(function (t) {
                    var e = h[t],
                      n = bt(O, t, 0, !0, !0, !0),
                      a = bt(O, t, 100, !0, !0, !0),
                      o = r[t],
                      l = String(s.ariaFormat.to(i[t]));
                    (n = L.fromStepping(n).toFixed(1)),
                      (a = L.fromStepping(a).toFixed(1)),
                      (o = L.fromStepping(o).toFixed(1)),
                      e.children[0].setAttribute("aria-valuemin", n),
                      e.children[0].setAttribute("aria-valuemax", a),
                      e.children[0].setAttribute("aria-valuenow", o),
                      e.children[0].setAttribute("aria-valuetext", l);
                  });
                });
            }
            function Y(e) {
              if (e.mode === t.PipsMode.Range || e.mode === t.PipsMode.Steps)
                return L.xVal;
              if (e.mode === t.PipsMode.Count) {
                if (e.values < 2)
                  throw new Error(
                    "noUiSlider: 'values' (>= 2) required for mode 'count'."
                  );
                for (var s = e.values - 1, i = 100 / s, n = []; s--; )
                  n[s] = s * i;
                return n.push(100), Q(n, e.stepped);
              }
              return e.mode === t.PipsMode.Positions
                ? Q(e.values, e.stepped)
                : e.mode === t.PipsMode.Values
                ? e.stepped
                  ? e.values.map(function (t) {
                      return L.fromStepping(L.getStep(L.toStepping(t)));
                    })
                  : e.values
                : [];
            }
            function Q(t, e) {
              return t.map(function (t) {
                return L.fromStepping(e ? L.getStep(t) : t);
              });
            }
            function K(e) {
              function s(t, e) {
                return Number((t + e).toFixed(7));
              }
              var i = Y(e),
                n = {},
                r = L.xVal[0],
                o = L.xVal[L.xVal.length - 1],
                l = !1,
                c = !1,
                d = 0;
              return (
                (i = a(
                  i.slice().sort(function (t, e) {
                    return t - e;
                  })
                ))[0] !== r && (i.unshift(r), (l = !0)),
                i[i.length - 1] !== o && (i.push(o), (c = !0)),
                i.forEach(function (r, a) {
                  var o,
                    u,
                    p,
                    h,
                    m,
                    f,
                    g,
                    v,
                    _,
                    b,
                    y = r,
                    w = i[a + 1],
                    S = e.mode === t.PipsMode.Steps;
                  for (
                    S && (o = L.xNumSteps[a]),
                      o || (o = w - y),
                      void 0 === w && (w = y),
                      o = Math.max(o, 1e-7),
                      u = y;
                    u <= w;
                    u = s(u, o)
                  ) {
                    for (
                      v = (m = (h = L.toStepping(u)) - d) / (e.density || 1),
                        b = m / (_ = Math.round(v)),
                        p = 1;
                      p <= _;
                      p += 1
                    )
                      n[(f = d + p * b).toFixed(5)] = [L.fromStepping(f), 0];
                    (g =
                      i.indexOf(u) > -1
                        ? t.PipsType.LargeValue
                        : S
                        ? t.PipsType.SmallValue
                        : t.PipsType.NoValue),
                      !a && l && u !== w && (g = 0),
                      (u === w && c) || (n[h.toFixed(5)] = [u, g]),
                      (d = h);
                  }
                }),
                n
              );
            }
            function Z(e, i, n) {
              var r,
                a,
                o = $.createElement("div"),
                l =
                  (((r = {})[t.PipsType.None] = ""),
                  (r[t.PipsType.NoValue] = s.cssClasses.valueNormal),
                  (r[t.PipsType.LargeValue] = s.cssClasses.valueLarge),
                  (r[t.PipsType.SmallValue] = s.cssClasses.valueSub),
                  r),
                c =
                  (((a = {})[t.PipsType.None] = ""),
                  (a[t.PipsType.NoValue] = s.cssClasses.markerNormal),
                  (a[t.PipsType.LargeValue] = s.cssClasses.markerLarge),
                  (a[t.PipsType.SmallValue] = s.cssClasses.markerSub),
                  a),
                d = [s.cssClasses.valueHorizontal, s.cssClasses.valueVertical],
                u = [
                  s.cssClasses.markerHorizontal,
                  s.cssClasses.markerVertical,
                ];
              function p(t, e) {
                var i = e === s.cssClasses.value,
                  n = i ? l : c;
                return e + " " + (i ? d : u)[s.ort] + " " + n[t];
              }
              function h(e, r, a) {
                if ((a = i ? i(r, a) : a) !== t.PipsType.None) {
                  var l = B(o, !1);
                  (l.className = p(a, s.cssClasses.marker)),
                    (l.style[s.style] = e + "%"),
                    a > t.PipsType.NoValue &&
                      (((l = B(o, !1)).className = p(a, s.cssClasses.value)),
                      l.setAttribute("data-value", String(r)),
                      (l.style[s.style] = e + "%"),
                      (l.innerHTML = String(n.to(r))));
                }
              }
              return (
                m(o, s.cssClasses.pips),
                m(
                  o,
                  0 === s.ort
                    ? s.cssClasses.pipsHorizontal
                    : s.cssClasses.pipsVertical
                ),
                Object.keys(e).forEach(function (t) {
                  h(t, e[t][0], e[t][1]);
                }),
                o
              );
            }
            function J() {
              S && (i(S), (S = null));
            }
            function tt(t) {
              J();
              var e = K(t),
                s = t.filter,
                i = t.format || {
                  to: function (t) {
                    return String(Math.round(t));
                  },
                };
              return (S = E.appendChild(Z(e, s, i)));
            }
            function et() {
              var t = c.getBoundingClientRect(),
                e = "offset" + ["Width", "Height"][s.ort];
              return 0 === s.ort ? t.width || c[e] : t.height || c[e];
            }
            function st(t, e, i, n) {
              var r = function (r) {
                  var a = it(r, n.pageOffset, n.target || e);
                  return (
                    !!a &&
                    !(R() && !n.doNotReject) &&
                    !(g(E, s.cssClasses.tap) && !n.doNotReject) &&
                    !(t === x.start && void 0 !== a.buttons && a.buttons > 1) &&
                    (!n.hover || !a.buttons) &&
                    (T || a.preventDefault(),
                    (a.calcPoint = a.points[s.ort]),
                    void i(a, n))
                  );
                },
                a = [];
              return (
                t.split(" ").forEach(function (t) {
                  e.addEventListener(t, r, !!T && { passive: !0 }),
                    a.push([t, r]);
                }),
                a
              );
            }
            function it(t, e, s) {
              var i = 0 === t.type.indexOf("touch"),
                n = 0 === t.type.indexOf("mouse"),
                r = 0 === t.type.indexOf("pointer"),
                a = 0,
                o = 0;
              if (
                (0 === t.type.indexOf("MSPointer") && (r = !0),
                "mousedown" === t.type && !t.buttons && !t.touches)
              )
                return !1;
              if (i) {
                var l = function (e) {
                  var i = e.target;
                  return (
                    i === s ||
                    s.contains(i) ||
                    (t.composed && t.composedPath().shift() === s)
                  );
                };
                if ("touchstart" === t.type) {
                  var c = Array.prototype.filter.call(t.touches, l);
                  if (c.length > 1) return !1;
                  (a = c[0].pageX), (o = c[0].pageY);
                } else {
                  var d = Array.prototype.find.call(t.changedTouches, l);
                  if (!d) return !1;
                  (a = d.pageX), (o = d.pageY);
                }
              }
              return (
                (e = e || v($)),
                (n || r) && ((a = t.clientX + e.x), (o = t.clientY + e.y)),
                (t.pageOffset = e),
                (t.points = [a, o]),
                (t.cursor = n || r),
                t
              );
            }
            function nt(t) {
              var e = (100 * (t - l(c, s.ort))) / et();
              return (e = u(e)), s.dir ? 100 - e : e;
            }
            function at(t) {
              var e = 100,
                s = !1;
              return (
                h.forEach(function (i, n) {
                  if (!j(n)) {
                    var r = O[n],
                      a = Math.abs(r - t);
                    (a < e || (a <= e && t > r) || (100 === a && 100 === e)) &&
                      ((s = n), (e = a));
                  }
                }),
                s
              );
            }
            function ot(t, e) {
              "mouseout" === t.type &&
                "HTML" === t.target.nodeName &&
                null === t.relatedTarget &&
                ct(t, e);
            }
            function lt(t, e) {
              if (
                -1 === navigator.appVersion.indexOf("MSIE 9") &&
                0 === t.buttons &&
                0 !== e.buttonsProperty
              )
                return ct(t, e);
              var i = (s.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
              wt(
                i > 0,
                (100 * i) / e.baseSize,
                e.locations,
                e.handleNumbers,
                e.connect
              );
            }
            function ct(t, e) {
              e.handle && (f(e.handle, s.cssClasses.active), (M -= 1)),
                e.listeners.forEach(function (t) {
                  D.removeEventListener(t[0], t[1]);
                }),
                0 === M &&
                  (f(E, s.cssClasses.drag),
                  xt(),
                  t.cursor &&
                    ((z.style.cursor = ""),
                    z.removeEventListener("selectstart", r))),
                s.events.smoothSteps &&
                  (e.handleNumbers.forEach(function (t) {
                    Tt(t, O[t], !0, !0, !1, !1);
                  }),
                  e.handleNumbers.forEach(function (t) {
                    _t("update", t);
                  })),
                e.handleNumbers.forEach(function (t) {
                  _t("change", t), _t("set", t), _t("end", t);
                });
            }
            function dt(t, e) {
              if (!e.handleNumbers.some(j)) {
                var i;
                1 === e.handleNumbers.length &&
                  ((i = h[e.handleNumbers[0]].children[0]),
                  (M += 1),
                  m(i, s.cssClasses.active)),
                  t.stopPropagation();
                var n = [],
                  a = st(x.move, D, lt, {
                    target: t.target,
                    handle: i,
                    connect: e.connect,
                    listeners: n,
                    startCalcPoint: t.calcPoint,
                    baseSize: et(),
                    pageOffset: t.pageOffset,
                    handleNumbers: e.handleNumbers,
                    buttonsProperty: t.buttons,
                    locations: O.slice(),
                  }),
                  o = st(x.end, D, ct, {
                    target: t.target,
                    handle: i,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers,
                  }),
                  l = st("mouseout", D, ot, {
                    target: t.target,
                    handle: i,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers,
                  });
                n.push.apply(n, a.concat(o, l)),
                  t.cursor &&
                    ((z.style.cursor = getComputedStyle(t.target).cursor),
                    h.length > 1 && m(E, s.cssClasses.drag),
                    z.addEventListener("selectstart", r, !1)),
                  e.handleNumbers.forEach(function (t) {
                    _t("start", t);
                  });
              }
            }
            function ut(t) {
              t.stopPropagation();
              var e = nt(t.calcPoint),
                i = at(e);
              !1 !== i &&
                (s.events.snap || d(E, s.cssClasses.tap, s.animationDuration),
                Tt(i, e, !0, !0),
                xt(),
                _t("slide", i, !0),
                _t("update", i, !0),
                s.events.snap
                  ? dt(t, { handleNumbers: [i] })
                  : (_t("change", i, !0), _t("set", i, !0)));
            }
            function pt(t) {
              var e = nt(t.calcPoint),
                s = L.getStep(e),
                i = L.fromStepping(s);
              Object.keys(P).forEach(function (t) {
                "hover" === t.split(".")[0] &&
                  P[t].forEach(function (t) {
                    t.call(qt, i);
                  });
              });
            }
            function ht(t, e) {
              if (R() || j(e)) return !1;
              var i = ["Left", "Right"],
                n = ["Down", "Up"],
                r = ["PageDown", "PageUp"],
                a = ["Home", "End"];
              s.dir && !s.ort
                ? i.reverse()
                : s.ort && !s.dir && (n.reverse(), r.reverse());
              var o,
                l = t.key.replace("Arrow", ""),
                c = l === r[0],
                d = l === r[1],
                u = l === n[0] || l === i[0] || c,
                p = l === n[1] || l === i[1] || d,
                h = l === a[0],
                m = l === a[1];
              if (!(u || p || h || m)) return !0;
              if ((t.preventDefault(), p || u)) {
                var f = u ? 0 : 1,
                  g = $t(e)[f];
                if (null === g) return !1;
                !1 === g &&
                  (g = L.getDefaultStep(O[e], u, s.keyboardDefaultStep)),
                  (g *=
                    d || c ? s.keyboardPageMultiplier : s.keyboardMultiplier),
                  (g = Math.max(g, 1e-7)),
                  (g *= u ? -1 : 1),
                  (o = A[e] + g);
              } else
                o = m
                  ? s.spectrum.xVal[s.spectrum.xVal.length - 1]
                  : s.spectrum.xVal[0];
              return (
                Tt(e, L.toStepping(o), !0, !0),
                _t("slide", e),
                _t("update", e),
                _t("change", e),
                _t("set", e),
                !1
              );
            }
            function mt(t) {
              t.fixed ||
                h.forEach(function (t, e) {
                  st(x.start, t.children[0], dt, { handleNumbers: [e] });
                }),
                t.tap && st(x.start, c, ut, {}),
                t.hover && st(x.move, c, pt, { hover: !0 }),
                t.drag &&
                  w.forEach(function (e, i) {
                    if (!1 !== e && 0 !== i && i !== w.length - 1) {
                      var n = h[i - 1],
                        r = h[i],
                        a = [e],
                        o = [n, r],
                        l = [i - 1, i];
                      m(e, s.cssClasses.draggable),
                        t.fixed &&
                          (a.push(n.children[0]), a.push(r.children[0])),
                        t.dragAll && ((o = h), (l = k)),
                        a.forEach(function (t) {
                          st(x.start, t, dt, {
                            handles: o,
                            handleNumbers: l,
                            connect: e,
                          });
                        });
                    }
                  });
            }
            function ft(t, e) {
              (P[t] = P[t] || []),
                P[t].push(e),
                "update" === t.split(".")[0] &&
                  h.forEach(function (t, e) {
                    _t("update", e);
                  });
            }
            function gt(t) {
              return t === I.aria || t === I.tooltips;
            }
            function vt(t) {
              var e = t && t.split(".")[0],
                s = e ? t.substring(e.length) : t;
              Object.keys(P).forEach(function (t) {
                var i = t.split(".")[0],
                  n = t.substring(i.length);
                (e && e !== i) ||
                  (s && s !== n) ||
                  (gt(n) && s !== n) ||
                  delete P[t];
              });
            }
            function _t(t, e, i) {
              Object.keys(P).forEach(function (n) {
                var r = n.split(".")[0];
                t === r &&
                  P[n].forEach(function (t) {
                    t.call(
                      qt,
                      A.map(s.format.to),
                      e,
                      A.slice(),
                      i || !1,
                      O.slice(),
                      qt
                    );
                  });
              });
            }
            function bt(t, e, i, n, r, a, o) {
              var l;
              return (
                h.length > 1 &&
                  !s.events.unconstrained &&
                  (n &&
                    e > 0 &&
                    ((l = L.getAbsoluteDistance(t[e - 1], s.margin, !1)),
                    (i = Math.max(i, l))),
                  r &&
                    e < h.length - 1 &&
                    ((l = L.getAbsoluteDistance(t[e + 1], s.margin, !0)),
                    (i = Math.min(i, l)))),
                h.length > 1 &&
                  s.limit &&
                  (n &&
                    e > 0 &&
                    ((l = L.getAbsoluteDistance(t[e - 1], s.limit, !1)),
                    (i = Math.min(i, l))),
                  r &&
                    e < h.length - 1 &&
                    ((l = L.getAbsoluteDistance(t[e + 1], s.limit, !0)),
                    (i = Math.max(i, l)))),
                s.padding &&
                  (0 === e &&
                    ((l = L.getAbsoluteDistance(0, s.padding[0], !1)),
                    (i = Math.max(i, l))),
                  e === h.length - 1 &&
                    ((l = L.getAbsoluteDistance(100, s.padding[1], !0)),
                    (i = Math.min(i, l)))),
                o || (i = L.getStep(i)),
                !((i = u(i)) === t[e] && !a) && i
              );
            }
            function yt(t, e) {
              var i = s.ort;
              return (i ? e : t) + ", " + (i ? t : e);
            }
            function wt(t, e, i, n, r) {
              var a = i.slice(),
                o = n[0],
                l = s.events.smoothSteps,
                c = [!t, t],
                d = [t, !t];
              (n = n.slice()),
                t && n.reverse(),
                n.length > 1
                  ? n.forEach(function (t, s) {
                      var i = bt(a, t, a[t] + e, c[s], d[s], !1, l);
                      !1 === i ? (e = 0) : ((e = i - a[t]), (a[t] = i));
                    })
                  : (c = d = [!0]);
              var u = !1;
              n.forEach(function (t, s) {
                u = Tt(t, i[t] + e, c[s], d[s], !1, l) || u;
              }),
                u &&
                  (n.forEach(function (t) {
                    _t("update", t), _t("slide", t);
                  }),
                  null != r && _t("drag", o));
            }
            function St(t, e) {
              return s.dir ? 100 - t - e : t;
            }
            function Ct(t, e) {
              (O[t] = e), (A[t] = L.fromStepping(e));
              var i = "translate(" + yt(St(e, 0) - q + "%", "0") + ")";
              (h[t].style[s.transformRule] = i), Et(t), Et(t + 1);
            }
            function xt() {
              k.forEach(function (t) {
                var e = O[t] > 50 ? -1 : 1,
                  s = 3 + (h.length + e * t);
                h[t].style.zIndex = String(s);
              });
            }
            function Tt(t, e, s, i, n, r) {
              return (
                n || (e = bt(O, t, e, s, i, !1, r)), !1 !== e && (Ct(t, e), !0)
              );
            }
            function Et(t) {
              if (w[t]) {
                var e = 0,
                  i = 100;
                0 !== t && (e = O[t - 1]), t !== w.length - 1 && (i = O[t]);
                var n = i - e,
                  r = "translate(" + yt(St(e, n) + "%", "0") + ")",
                  a = "scale(" + yt(n / 100, "1") + ")";
                w[t].style[s.transformRule] = r + " " + a;
              }
            }
            function Lt(t, e) {
              return null === t || !1 === t || void 0 === t
                ? O[e]
                : ("number" == typeof t && (t = String(t)),
                  !1 !== (t = s.format.from(t)) && (t = L.toStepping(t)),
                  !1 === t || isNaN(t) ? O[e] : t);
            }
            function At(t, e, i) {
              var n = p(t),
                r = void 0 === O[0];
              (e = void 0 === e || e),
                s.animate && !r && d(E, s.cssClasses.tap, s.animationDuration),
                k.forEach(function (t) {
                  Tt(t, Lt(n[t], t), !0, !1, i);
                });
              var a = 1 === k.length ? 0 : 1;
              if (r && L.hasNoSize() && ((i = !0), (O[0] = 0), k.length > 1)) {
                var o = 100 / (k.length - 1);
                k.forEach(function (t) {
                  O[t] = t * o;
                });
              }
              for (; a < k.length; ++a)
                k.forEach(function (t) {
                  Tt(t, O[t], !0, !0, i);
                });
              xt(),
                k.forEach(function (t) {
                  _t("update", t), null !== n[t] && e && _t("set", t);
                });
            }
            function Ot(t) {
              At(s.start, t);
            }
            function kt(t, e, s, i) {
              if (!((t = Number(t)) >= 0 && t < k.length))
                throw new Error("noUiSlider: invalid handle number, got: " + t);
              Tt(t, Lt(e, t), !0, !0, i), _t("update", t), s && _t("set", t);
            }
            function Mt(t) {
              if ((void 0 === t && (t = !1), t))
                return 1 === A.length ? A[0] : A.slice(0);
              var e = A.map(s.format.to);
              return 1 === e.length ? e[0] : e;
            }
            function Pt() {
              for (
                vt(I.aria),
                  vt(I.tooltips),
                  Object.keys(s.cssClasses).forEach(function (t) {
                    f(E, s.cssClasses[t]);
                  });
                E.firstChild;

              )
                E.removeChild(E.firstChild);
              delete E.noUiSlider;
            }
            function $t(t) {
              var e = O[t],
                i = L.getNearbySteps(e),
                n = A[t],
                r = i.thisStep.step,
                a = null;
              if (s.snap)
                return [
                  n - i.stepBefore.startValue || null,
                  i.stepAfter.startValue - n || null,
                ];
              !1 !== r &&
                n + r > i.stepAfter.startValue &&
                (r = i.stepAfter.startValue - n),
                (a =
                  n > i.thisStep.startValue
                    ? i.thisStep.step
                    : !1 !== i.stepBefore.step && n - i.stepBefore.highestStep),
                100 === e ? (r = null) : 0 === e && (a = null);
              var o = L.countStepDecimals();
              return (
                null !== r && !1 !== r && (r = Number(r.toFixed(o))),
                null !== a && !1 !== a && (a = Number(a.toFixed(o))),
                [a, r]
              );
            }
            function It() {
              return k.map($t);
            }
            function Dt(t, e) {
              var i = Mt(),
                r = [
                  "margin",
                  "limit",
                  "padding",
                  "range",
                  "animate",
                  "snap",
                  "step",
                  "format",
                  "pips",
                  "tooltips",
                ];
              r.forEach(function (e) {
                void 0 !== t[e] && (o[e] = t[e]);
              });
              var a = rt(o);
              r.forEach(function (e) {
                void 0 !== t[e] && (s[e] = a[e]);
              }),
                (L = a.spectrum),
                (s.margin = a.margin),
                (s.limit = a.limit),
                (s.padding = a.padding),
                s.pips ? tt(s.pips) : J(),
                s.tooltips ? X() : W(),
                (O = []),
                At(n(t.start) ? t.start : i, e);
            }
            function zt() {
              (c = G(E)),
                H(s.connect, c),
                mt(s.events),
                At(s.start),
                s.pips && tt(s.pips),
                s.tooltips && X(),
                U();
            }
            zt();
            var qt = {
              destroy: Pt,
              steps: It,
              on: ft,
              off: vt,
              get: Mt,
              set: At,
              setHandle: kt,
              reset: Ot,
              __moveHandles: function (t, e, s) {
                wt(t, e, O, s);
              },
              options: o,
              updateOptions: Dt,
              target: E,
              removePips: J,
              removeTooltips: W,
              getPositions: function () {
                return O.slice();
              },
              getTooltips: function () {
                return C;
              },
              getOrigins: function () {
                return h;
              },
              pips: tt,
            };
            return qt;
          }
          function ot(t, e) {
            if (!t || !t.nodeName)
              throw new Error(
                "noUiSlider: create requires a single element, got: " + t
              );
            if (t.noUiSlider)
              throw new Error("noUiSlider: Slider was already initialized.");
            var s = at(t, rt(e), e);
            return (t.noUiSlider = s), s;
          }
          var lt = { __spectrum: M, cssClasses: $, create: ot };
          (t.create = ot),
            (t.cssClasses = $),
            (t.default = lt),
            Object.defineProperty(t, "__esModule", { value: !0 });
        })(e);
      },
      2: function (t, e, s) {
        var i, n;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              s = (this.document || this.ownerDocument).querySelectorAll(t),
              i = this;
            do {
              for (e = s.length; 0 <= --e && s.item(e) !== i; );
            } while (e < 0 && (i = i.parentElement));
            return i;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var s = document.createEvent("CustomEvent");
              return s.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), s;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0;
              s < e.length && !window.requestAnimationFrame;
              ++s
            )
              (window.requestAnimationFrame =
                window[e[s] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[s] + "CancelAnimationFrame"] ||
                  window[e[s] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, s) {
                var i = new Date().getTime(),
                  n = Math.max(0, 16 - (i - t)),
                  r = window.setTimeout(function () {
                    e(i + n);
                  }, n);
                return (t = i + n), r;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (n =
            void 0 !== s.g
              ? s.g
              : "undefined" != typeof window
              ? window
              : this),
          (i = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                s = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var s in e) {
                        if (!e.hasOwnProperty(s)) return;
                        t[s] = e[s];
                      }
                    }),
                    t
                  );
                },
                i = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      s = String(t),
                      i = s.length,
                      n = -1,
                      r = "",
                      a = s.charCodeAt(0);
                    ++n < i;

                  ) {
                    if (0 === (e = s.charCodeAt(n)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    r +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === n && 48 <= e && e <= 57) ||
                      (1 === n && 48 <= e && e <= 57 && 45 === a)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? s.charAt(n)
                        : "\\" + s.charAt(n);
                  }
                  return "#" + r;
                },
                n = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                r = function (e) {
                  return e
                    ? ((s = e),
                      parseInt(t.getComputedStyle(s).height, 10) + e.offsetTop)
                    : 0;
                  var s;
                },
                a = function (e, s, i) {
                  0 === e && document.body.focus(),
                    i ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, s));
                },
                o = function (e, s, i, n) {
                  if (s.emitEvents && "function" == typeof t.CustomEvent) {
                    var r = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: i, toggle: n },
                    });
                    document.dispatchEvent(r);
                  }
                };
              return function (l, c) {
                var d,
                  u,
                  p,
                  h,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(h),
                        (h = null),
                        t || o("scrollCancel", d);
                    },
                    animateScroll: function (i, l, c) {
                      m.cancelScroll();
                      var u = s(d || e, c || {}),
                        f =
                          "[object Number]" ===
                          Object.prototype.toString.call(i),
                        g = f || !i.tagName ? null : i;
                      if (f || g) {
                        var v = t.pageYOffset;
                        u.header &&
                          !p &&
                          (p = document.querySelector(u.header));
                        var _,
                          b,
                          y,
                          w,
                          S,
                          C,
                          x,
                          T,
                          E = r(p),
                          L = f
                            ? i
                            : (function (e, s, i, r) {
                                var a = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (a += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (a = Math.max(a - s - i, 0)),
                                  r && (a = Math.min(a, n() - t.innerHeight)),
                                  a
                                );
                              })(
                                g,
                                E,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(i, l)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          A = L - v,
                          O = n(),
                          k = 0,
                          M =
                            ((_ = A),
                            (y = (b = u).speedAsDuration
                              ? b.speed
                              : Math.abs((_ / 1e3) * b.speed)),
                            b.durationMax && y > b.durationMax
                              ? b.durationMax
                              : b.durationMin && y < b.durationMin
                              ? b.durationMin
                              : parseInt(y, 10)),
                          P = function (e) {
                            var s, n, r;
                            w || (w = e),
                              (k += e - w),
                              (C =
                                v +
                                A *
                                  ((n = S =
                                    1 < (S = 0 === M ? 0 : k / M) ? 1 : S),
                                  "easeInQuad" === (s = u).easing &&
                                    (r = n * n),
                                  "easeOutQuad" === s.easing &&
                                    (r = n * (2 - n)),
                                  "easeInOutQuad" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 2 * n * n
                                        : (4 - 2 * n) * n - 1),
                                  "easeInCubic" === s.easing && (r = n * n * n),
                                  "easeOutCubic" === s.easing &&
                                    (r = --n * n * n + 1),
                                  "easeInOutCubic" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 4 * n * n * n
                                        : (n - 1) * (2 * n - 2) * (2 * n - 2) +
                                          1),
                                  "easeInQuart" === s.easing &&
                                    (r = n * n * n * n),
                                  "easeOutQuart" === s.easing &&
                                    (r = 1 - --n * n * n * n),
                                  "easeInOutQuart" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 8 * n * n * n * n
                                        : 1 - 8 * --n * n * n * n),
                                  "easeInQuint" === s.easing &&
                                    (r = n * n * n * n * n),
                                  "easeOutQuint" === s.easing &&
                                    (r = 1 + --n * n * n * n * n),
                                  "easeInOutQuint" === s.easing &&
                                    (r =
                                      n < 0.5
                                        ? 16 * n * n * n * n * n
                                        : 1 + 16 * --n * n * n * n * n),
                                  s.customEasing && (r = s.customEasing(n)),
                                  r || n)),
                              t.scrollTo(0, Math.floor(C)),
                              (function (e, s) {
                                var n = t.pageYOffset;
                                if (
                                  e == s ||
                                  n == s ||
                                  (v < s && t.innerHeight + n) >= O
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    a(i, s, f),
                                    o("scrollStop", u, i, l),
                                    !(h = w = null)
                                  );
                              })(C, L) ||
                                ((h = t.requestAnimationFrame(P)), (w = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (x = i),
                          (T = u),
                          f ||
                            (history.pushState &&
                              T.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(T),
                                  anchor: x.id,
                                },
                                document.title,
                                x === document.documentElement
                                  ? "#top"
                                  : "#" + x.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? a(i, Math.floor(L), !1)
                            : (o("scrollStart", u, i, l),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(P));
                      }
                    },
                  },
                  f = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (u = e.target.closest(l)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !e.target.closest(d.ignore) &&
                      u.hostname === t.location.hostname &&
                      u.pathname === t.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var s, n;
                      try {
                        s = i(decodeURIComponent(u.hash));
                      } catch (e) {
                        s = i(u.hash);
                      }
                      if ("#" === s) {
                        if (!d.topOnEmptyHash) return;
                        n = document.documentElement;
                      } else n = document.querySelector(s);
                      (n = n || "#top" !== s ? n : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var s = t.location.hash;
                            (s = s || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: s || t.pageYOffset,
                                },
                                document.title,
                                s || t.location.href
                              );
                          }
                        })(d),
                        m.animateScroll(n, u));
                    }
                  },
                  g = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(d)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          i(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    d &&
                      (document.removeEventListener("click", f, !1),
                      t.removeEventListener("popstate", g, !1),
                      m.cancelScroll(),
                      (h = p = u = d = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (d = s(e, c || {})),
                      (p = d.header ? document.querySelector(d.header) : null),
                      document.addEventListener("click", f, !1),
                      d.updateURL &&
                        d.popstate &&
                        t.addEventListener("popstate", g, !1);
                  })(),
                  m
                );
              };
            })(n);
          }.apply(e, [])),
          void 0 === i || (t.exports = i);
      },
      732: function (t) {
        t.exports = (function () {
          "use strict";
          function t() {
            return (
              (t =
                Object.assign ||
                function (t) {
                  for (var e = 1; e < arguments.length; e++) {
                    var s = arguments[e];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (t[i] = s[i]);
                  }
                  return t;
                }),
              t.apply(this, arguments)
            );
          }
          var e = "undefined" != typeof window,
            s =
              (e && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = e && "IntersectionObserver" in window,
            n = e && "classList" in document.createElement("p"),
            r = e && window.devicePixelRatio > 1,
            a = {
              elements_selector: ".lazy",
              container: s || e ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            o = function (e) {
              return t({}, a, e);
            },
            l = function (t, e) {
              var s,
                i = "LazyLoad::Initialized",
                n = new t(e);
              try {
                s = new CustomEvent(i, { detail: { instance: n } });
              } catch (t) {
                (s = document.createEvent("CustomEvent")).initCustomEvent(
                  i,
                  !1,
                  !1,
                  { instance: n }
                );
              }
              window.dispatchEvent(s);
            },
            c = "src",
            d = "srcset",
            u = "sizes",
            p = "poster",
            h = "llOriginalAttrs",
            m = "data",
            f = "loading",
            g = "loaded",
            v = "applied",
            _ = "error",
            b = "native",
            y = "data-",
            w = "ll-status",
            S = function (t, e) {
              return t.getAttribute(y + e);
            },
            C = function (t) {
              return S(t, w);
            },
            x = function (t, e) {
              return (function (t, e, s) {
                var i = "data-ll-status";
                null !== s ? t.setAttribute(i, s) : t.removeAttribute(i);
              })(t, 0, e);
            },
            T = function (t) {
              return x(t, null);
            },
            E = function (t) {
              return null === C(t);
            },
            L = function (t) {
              return C(t) === b;
            },
            A = [f, g, v, _],
            O = function (t, e, s, i) {
              t &&
                (void 0 === i ? (void 0 === s ? t(e) : t(e, s)) : t(e, s, i));
            },
            k = function (t, e) {
              n
                ? t.classList.add(e)
                : (t.className += (t.className ? " " : "") + e);
            },
            M = function (t, e) {
              n
                ? t.classList.remove(e)
                : (t.className = t.className
                    .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            P = function (t) {
              return t.llTempImage;
            },
            $ = function (t, e) {
              if (e) {
                var s = e._observer;
                s && s.unobserve(t);
              }
            },
            I = function (t, e) {
              t && (t.loadingCount += e);
            },
            D = function (t, e) {
              t && (t.toLoadCount = e);
            },
            z = function (t) {
              for (var e, s = [], i = 0; (e = t.children[i]); i += 1)
                "SOURCE" === e.tagName && s.push(e);
              return s;
            },
            q = function (t, e) {
              var s = t.parentNode;
              s && "PICTURE" === s.tagName && z(s).forEach(e);
            },
            B = function (t, e) {
              z(t).forEach(e);
            },
            N = [c],
            F = [c, p],
            H = [c, d, u],
            G = [m],
            V = function (t) {
              return !!t[h];
            },
            R = function (t) {
              return t[h];
            },
            j = function (t) {
              return delete t[h];
            },
            W = function (t, e) {
              if (!V(t)) {
                var s = {};
                e.forEach(function (e) {
                  s[e] = t.getAttribute(e);
                }),
                  (t[h] = s);
              }
            },
            X = function (t, e) {
              if (V(t)) {
                var s = R(t);
                e.forEach(function (e) {
                  !(function (t, e, s) {
                    s ? t.setAttribute(e, s) : t.removeAttribute(e);
                  })(t, e, s[e]);
                });
              }
            },
            U = function (t, e, s) {
              k(t, e.class_applied),
                x(t, v),
                s &&
                  (e.unobserve_completed && $(t, e),
                  O(e.callback_applied, t, s));
            },
            Y = function (t, e, s) {
              k(t, e.class_loading),
                x(t, f),
                s && (I(s, 1), O(e.callback_loading, t, s));
            },
            Q = function (t, e, s) {
              s && t.setAttribute(e, s);
            },
            K = function (t, e) {
              Q(t, u, S(t, e.data_sizes)),
                Q(t, d, S(t, e.data_srcset)),
                Q(t, c, S(t, e.data_src));
            },
            Z = {
              IMG: function (t, e) {
                q(t, function (t) {
                  W(t, H), K(t, e);
                }),
                  W(t, H),
                  K(t, e);
              },
              IFRAME: function (t, e) {
                W(t, N), Q(t, c, S(t, e.data_src));
              },
              VIDEO: function (t, e) {
                B(t, function (t) {
                  W(t, N), Q(t, c, S(t, e.data_src));
                }),
                  W(t, F),
                  Q(t, p, S(t, e.data_poster)),
                  Q(t, c, S(t, e.data_src)),
                  t.load();
              },
              OBJECT: function (t, e) {
                W(t, G), Q(t, m, S(t, e.data_src));
              },
            },
            J = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            tt = function (t, e) {
              !e ||
                (function (t) {
                  return t.loadingCount > 0;
                })(e) ||
                (function (t) {
                  return t.toLoadCount > 0;
                })(e) ||
                O(t.callback_finish, e);
            },
            et = function (t, e, s) {
              t.addEventListener(e, s), (t.llEvLisnrs[e] = s);
            },
            st = function (t, e, s) {
              t.removeEventListener(e, s);
            },
            it = function (t) {
              return !!t.llEvLisnrs;
            },
            nt = function (t) {
              if (it(t)) {
                var e = t.llEvLisnrs;
                for (var s in e) {
                  var i = e[s];
                  st(t, s, i);
                }
                delete t.llEvLisnrs;
              }
            },
            rt = function (t, e, s) {
              !(function (t) {
                delete t.llTempImage;
              })(t),
                I(s, -1),
                (function (t) {
                  t && (t.toLoadCount -= 1);
                })(s),
                M(t, e.class_loading),
                e.unobserve_completed && $(t, s);
            },
            at = function (t, e, s) {
              var i = P(t) || t;
              it(i) ||
                (function (t, e, s) {
                  it(t) || (t.llEvLisnrs = {});
                  var i = "VIDEO" === t.tagName ? "loadeddata" : "load";
                  et(t, i, e), et(t, "error", s);
                })(
                  i,
                  function (n) {
                    !(function (t, e, s, i) {
                      var n = L(e);
                      rt(e, s, i),
                        k(e, s.class_loaded),
                        x(e, g),
                        O(s.callback_loaded, e, i),
                        n || tt(s, i);
                    })(0, t, e, s),
                      nt(i);
                  },
                  function (n) {
                    !(function (t, e, s, i) {
                      var n = L(e);
                      rt(e, s, i),
                        k(e, s.class_error),
                        x(e, _),
                        O(s.callback_error, e, i),
                        s.restore_on_error && X(e, H),
                        n || tt(s, i);
                    })(0, t, e, s),
                      nt(i);
                  }
                );
            },
            ot = function (t, e, s) {
              !(function (t) {
                return J.indexOf(t.tagName) > -1;
              })(t)
                ? (function (t, e, s) {
                    !(function (t) {
                      t.llTempImage = document.createElement("IMG");
                    })(t),
                      at(t, e, s),
                      (function (t) {
                        V(t) ||
                          (t[h] = { backgroundImage: t.style.backgroundImage });
                      })(t),
                      (function (t, e, s) {
                        var i = S(t, e.data_bg),
                          n = S(t, e.data_bg_hidpi),
                          a = r && n ? n : i;
                        a &&
                          ((t.style.backgroundImage = 'url("'.concat(a, '")')),
                          P(t).setAttribute(c, a),
                          Y(t, e, s));
                      })(t, e, s),
                      (function (t, e, s) {
                        var i = S(t, e.data_bg_multi),
                          n = S(t, e.data_bg_multi_hidpi),
                          a = r && n ? n : i;
                        a && ((t.style.backgroundImage = a), U(t, e, s));
                      })(t, e, s),
                      (function (t, e, s) {
                        var i = S(t, e.data_bg_set);
                        if (i) {
                          var n = i.split("|"),
                            r = n.map(function (t) {
                              return "image-set(".concat(t, ")");
                            });
                          (t.style.backgroundImage = r.join()),
                            "" === t.style.backgroundImage &&
                              ((r = n.map(function (t) {
                                return "-webkit-image-set(".concat(t, ")");
                              })),
                              (t.style.backgroundImage = r.join())),
                            U(t, e, s);
                        }
                      })(t, e, s);
                  })(t, e, s)
                : (function (t, e, s) {
                    at(t, e, s),
                      (function (t, e, s) {
                        var i = Z[t.tagName];
                        i && (i(t, e), Y(t, e, s));
                      })(t, e, s);
                  })(t, e, s);
            },
            lt = function (t) {
              t.removeAttribute(c), t.removeAttribute(d), t.removeAttribute(u);
            },
            ct = function (t) {
              q(t, function (t) {
                X(t, H);
              }),
                X(t, H);
            },
            dt = {
              IMG: ct,
              IFRAME: function (t) {
                X(t, N);
              },
              VIDEO: function (t) {
                B(t, function (t) {
                  X(t, N);
                }),
                  X(t, F),
                  t.load();
              },
              OBJECT: function (t) {
                X(t, G);
              },
            },
            ut = function (t, e) {
              (function (t) {
                var e = dt[t.tagName];
                e
                  ? e(t)
                  : (function (t) {
                      if (V(t)) {
                        var e = R(t);
                        t.style.backgroundImage = e.backgroundImage;
                      }
                    })(t);
              })(t),
                (function (t, e) {
                  E(t) ||
                    L(t) ||
                    (M(t, e.class_entered),
                    M(t, e.class_exited),
                    M(t, e.class_applied),
                    M(t, e.class_loading),
                    M(t, e.class_loaded),
                    M(t, e.class_error));
                })(t, e),
                T(t),
                j(t);
            },
            pt = ["IMG", "IFRAME", "VIDEO"],
            ht = function (t) {
              return t.use_native && "loading" in HTMLImageElement.prototype;
            },
            mt = function (t, e, s) {
              t.forEach(function (t) {
                return (function (t) {
                  return t.isIntersecting || t.intersectionRatio > 0;
                })(t)
                  ? (function (t, e, s, i) {
                      var n = (function (t) {
                        return A.indexOf(C(t)) >= 0;
                      })(t);
                      x(t, "entered"),
                        k(t, s.class_entered),
                        M(t, s.class_exited),
                        (function (t, e, s) {
                          e.unobserve_entered && $(t, s);
                        })(t, s, i),
                        O(s.callback_enter, t, e, i),
                        n || ot(t, s, i);
                    })(t.target, t, e, s)
                  : (function (t, e, s, i) {
                      E(t) ||
                        (k(t, s.class_exited),
                        (function (t, e, s, i) {
                          s.cancel_on_exit &&
                            (function (t) {
                              return C(t) === f;
                            })(t) &&
                            "IMG" === t.tagName &&
                            (nt(t),
                            (function (t) {
                              q(t, function (t) {
                                lt(t);
                              }),
                                lt(t);
                            })(t),
                            ct(t),
                            M(t, s.class_loading),
                            I(i, -1),
                            T(t),
                            O(s.callback_cancel, t, e, i));
                        })(t, e, s, i),
                        O(s.callback_exit, t, e, i));
                    })(t.target, t, e, s);
              });
            },
            ft = function (t) {
              return Array.prototype.slice.call(t);
            },
            gt = function (t) {
              return t.container.querySelectorAll(t.elements_selector);
            },
            vt = function (t) {
              return (function (t) {
                return C(t) === _;
              })(t);
            },
            _t = function (t, e) {
              return (function (t) {
                return ft(t).filter(E);
              })(t || gt(e));
            },
            bt = function (t, s) {
              var n = o(t);
              (this._settings = n),
                (this.loadingCount = 0),
                (function (t, e) {
                  i &&
                    !ht(t) &&
                    (e._observer = new IntersectionObserver(
                      function (s) {
                        mt(s, t, e);
                      },
                      (function (t) {
                        return {
                          root: t.container === document ? null : t.container,
                          rootMargin: t.thresholds || t.threshold + "px",
                        };
                      })(t)
                    ));
                })(n, this),
                (function (t, s) {
                  e &&
                    ((s._onlineHandler = function () {
                      !(function (t, e) {
                        var s;
                        ((s = gt(t)), ft(s).filter(vt)).forEach(function (e) {
                          M(e, t.class_error), T(e);
                        }),
                          e.update();
                      })(t, s);
                    }),
                    window.addEventListener("online", s._onlineHandler));
                })(n, this),
                this.update(s);
            };
          return (
            (bt.prototype = {
              update: function (t) {
                var e,
                  n,
                  r = this._settings,
                  a = _t(t, r);
                D(this, a.length),
                  !s && i
                    ? ht(r)
                      ? (function (t, e, s) {
                          t.forEach(function (t) {
                            -1 !== pt.indexOf(t.tagName) &&
                              (function (t, e, s) {
                                t.setAttribute("loading", "lazy"),
                                  at(t, e, s),
                                  (function (t, e) {
                                    var s = Z[t.tagName];
                                    s && s(t, e);
                                  })(t, e),
                                  x(t, b);
                              })(t, e, s);
                          }),
                            D(s, 0);
                        })(a, r, this)
                      : ((n = a),
                        (function (t) {
                          t.disconnect();
                        })((e = this._observer)),
                        (function (t, e) {
                          e.forEach(function (e) {
                            t.observe(e);
                          });
                        })(e, n))
                    : this.loadAll(a);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  e &&
                    window.removeEventListener("online", this._onlineHandler),
                  gt(this._settings).forEach(function (t) {
                    j(t);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (t) {
                var e = this,
                  s = this._settings;
                _t(t, s).forEach(function (t) {
                  $(t, e), ot(t, s, e);
                });
              },
              restoreAll: function () {
                var t = this._settings;
                gt(t).forEach(function (e) {
                  ut(e, t);
                });
              },
            }),
            (bt.load = function (t, e) {
              var s = o(e);
              ot(t, s);
            }),
            (bt.resetStatus = function (t) {
              T(t);
            }),
            e &&
              (function (t, e) {
                if (e)
                  if (e.length) for (var s, i = 0; (s = e[i]); i += 1) l(t, s);
                  else l(t, e);
              })(bt, window.lazyLoadOptions),
            bt
          );
        })();
      },
    },
    e = {};
  function s(i) {
    var n = e[i];
    if (void 0 !== n) return n.exports;
    var r = (e[i] = { exports: {} });
    return t[i].call(r.exports, r, r.exports, s), r.exports;
  }
  (s.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      const t = {};
      let e = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
          );
        },
      };
      let i = (t, e = 500, s = 0) => {
          t.classList.contains("_slide") ||
            (t.classList.add("_slide"),
            (t.style.transitionProperty = "height, margin, padding"),
            (t.style.transitionDuration = e + "ms"),
            (t.style.height = `${t.offsetHeight}px`),
            t.offsetHeight,
            (t.style.overflow = "hidden"),
            (t.style.height = s ? `${s}px` : "0px"),
            (t.style.paddingTop = 0),
            (t.style.paddingBottom = 0),
            (t.style.marginTop = 0),
            (t.style.marginBottom = 0),
            window.setTimeout(() => {
              (t.hidden = !s),
                !s && t.style.removeProperty("height"),
                t.style.removeProperty("padding-top"),
                t.style.removeProperty("padding-bottom"),
                t.style.removeProperty("margin-top"),
                t.style.removeProperty("margin-bottom"),
                !s && t.style.removeProperty("overflow"),
                t.style.removeProperty("transition-duration"),
                t.style.removeProperty("transition-property"),
                t.classList.remove("_slide"),
                document.dispatchEvent(
                  new CustomEvent("slideUpDone", { detail: { target: t } })
                );
            }, e));
        },
        n = (t, e = 500, s = 0) => {
          if (!t.classList.contains("_slide")) {
            t.classList.add("_slide"),
              (t.hidden = !t.hidden && null),
              s && t.style.removeProperty("height");
            let i = t.offsetHeight;
            (t.style.overflow = "hidden"),
              (t.style.height = s ? `${s}px` : "0px"),
              (t.style.paddingTop = 0),
              (t.style.paddingBottom = 0),
              (t.style.marginTop = 0),
              (t.style.marginBottom = 0),
              t.offsetHeight,
              (t.style.transitionProperty = "height, margin, padding"),
              (t.style.transitionDuration = e + "ms"),
              (t.style.height = i + "px"),
              t.style.removeProperty("padding-top"),
              t.style.removeProperty("padding-bottom"),
              t.style.removeProperty("margin-top"),
              t.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                t.style.removeProperty("height"),
                  t.style.removeProperty("overflow"),
                  t.style.removeProperty("transition-duration"),
                  t.style.removeProperty("transition-property"),
                  t.classList.remove("_slide"),
                  document.dispatchEvent(
                    new CustomEvent("slideDownDone", { detail: { target: t } })
                  );
              }, e);
          }
        },
        r = (t, e = 500) => (t.hidden ? n(t, e) : i(t, e)),
        a = !0,
        o = (t = 500) => {
          document.documentElement.classList.contains("lock") ? l(t) : c(t);
        },
        l = (t = 500) => {
          let e = document.querySelector("body");
          if (a) {
            let s = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < s.length; t++) {
                s[t].style.paddingRight = "0px";
              }
              (e.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, t),
              (a = !1),
              setTimeout(function () {
                a = !0;
              }, t);
          }
        },
        c = (t = 500) => {
          let e = document.querySelector("body");
          if (a) {
            let s = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < s.length; t++) {
              s[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (e.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (a = !1),
              setTimeout(function () {
                a = !0;
              }, t);
          }
        };
      function d() {
        const t = document.querySelectorAll("[data-tabs]");
        let e = [];
        if (t.length > 0) {
          const i = (function () {
            if (location.hash) return location.hash.replace("#", "");
          })();
          i && i.startsWith("tab-") && (e = i.replace("tab-", "").split("-")),
            t.forEach((t, s) => {
              t.classList.add("_tab-init"),
                t.setAttribute("data-tabs-index", s),
                t.addEventListener("click", a),
                (function (t) {
                  let s = t.querySelectorAll("[data-tabs-titles]>*"),
                    i = t.querySelectorAll("[data-tabs-body]>*");
                  const n = t.dataset.tabsIndex,
                    r = e[0] == n;
                  if (r) {
                    const e = t.querySelector(
                      "[data-tabs-titles]>._tab-active"
                    );
                    e && e.classList.remove("_tab-active");
                  }
                  i.length &&
                    ((i = Array.from(i).filter(
                      (e) => e.closest("[data-tabs]") === t
                    )),
                    (s = Array.from(s).filter(
                      (e) => e.closest("[data-tabs]") === t
                    )),
                    i.forEach((t, i) => {
                      s[i].setAttribute("data-tabs-title", ""),
                        t.setAttribute("data-tabs-item", ""),
                        r && i == e[1] && s[i].classList.add("_tab-active"),
                        (t.hidden = !s[i].classList.contains("_tab-active"));
                    }));
                })(t);
            });
          let n = p(t, "tabs");
          n &&
            n.length &&
            n.forEach((t) => {
              t.matchMedia.addEventListener("change", function () {
                s(t.itemsArray, t.matchMedia);
              }),
                s(t.itemsArray, t.matchMedia);
            });
        }
        function s(t, e) {
          t.forEach((t) => {
            let s = (t = t.item).querySelector("[data-tabs-titles]"),
              i = t.querySelectorAll("[data-tabs-title]"),
              n = t.querySelector("[data-tabs-body]"),
              r = t.querySelectorAll("[data-tabs-item]");
            (i = Array.from(i).filter((e) => e.closest("[data-tabs]") === t)),
              (r = Array.from(r).filter((e) => e.closest("[data-tabs]") === t)),
              r.forEach((r, a) => {
                e.matches
                  ? (n.append(i[a]),
                    n.append(r),
                    t.classList.add("_tab-spoller"))
                  : (s.append(i[a]), t.classList.remove("_tab-spoller"));
              });
          });
        }
        function r(t) {
          let e = t.querySelectorAll("[data-tabs-title]"),
            s = t.querySelectorAll("[data-tabs-item]");
          const r = t.dataset.tabsIndex;
          const a = (function (t) {
            if (t.hasAttribute("data-tabs-animate"))
              return t.dataset.tabsAnimate > 0
                ? Number(t.dataset.tabsAnimate)
                : 500;
          })(t);
          if (s.length > 0) {
            const o = t.hasAttribute("data-tabs-hash");
            (s = Array.from(s).filter((e) => e.closest("[data-tabs]") === t)),
              (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === t)),
              s.forEach((t, s) => {
                var l;
                e[s].classList.contains("_tab-active")
                  ? (a ? n(t, a) : (t.hidden = !1),
                    o &&
                      !t.closest(".popup") &&
                      ((l = (l = `tab-${r}-${s}`)
                        ? `#${l}`
                        : window.location.href.split("#")[0]),
                      history.pushState("", "", l)))
                  : a
                  ? i(t, a)
                  : (t.hidden = !0);
              });
          }
        }
        function a(t) {
          const e = t.target;
          if (e.closest("[data-tabs-title]")) {
            const s = e.closest("[data-tabs-title]"),
              i = s.closest("[data-tabs]");
            if (
              !s.classList.contains("_tab-active") &&
              !i.querySelector("._slide")
            ) {
              let t = i.querySelectorAll("[data-tabs-title]._tab-active");
              t.length &&
                (t = Array.from(t).filter(
                  (t) => t.closest("[data-tabs]") === i
                )),
                t.length && t[0].classList.remove("_tab-active"),
                s.classList.add("_tab-active"),
                r(i);
            }
            t.preventDefault();
          }
        }
      }
      function u(t) {
        setTimeout(() => {
          window.FLS && console.log(t);
        }, 0);
      }
      function p(t, e) {
        const s = Array.from(t).filter(function (t, s, i) {
          if (t.dataset[e]) return t.dataset[e].split(",")[0];
        });
        if (s.length) {
          const t = [];
          s.forEach((s) => {
            const i = {},
              n = s.dataset[e].split(",");
            (i.value = n[0]),
              (i.type = n[1] ? n[1].trim() : "max"),
              (i.item = s),
              t.push(i);
          });
          let i = t.map(function (t) {
            return (
              "(" +
              t.type +
              "-width: " +
              t.value +
              "px)," +
              t.value +
              "," +
              t.type
            );
          });
          i = (function (t) {
            return t.filter(function (t, e, s) {
              return s.indexOf(t) === e;
            });
          })(i);
          const n = [];
          if (i.length)
            return (
              i.forEach((e) => {
                const s = e.split(","),
                  i = s[1],
                  r = s[2],
                  a = window.matchMedia(s[0]),
                  o = t.filter(function (t) {
                    if (t.value === i && t.type === r) return !0;
                  });
                n.push({ itemsArray: o, matchMedia: a });
              }),
              n
            );
        }
      }
      document.querySelector(".products__mobile-filter") &&
        document.addEventListener("click", function (t) {
          t.target.closest(".products__mobile-filter")
            ? (o(),
              document.documentElement.classList.toggle("filter-open"),
              document.documentElement.classList.contains("filter-open") ||
                (document.documentElement.classList.toggle("filter-closing"),
                setTimeout(() => {
                  document.documentElement.classList.remove("filter-closing");
                }, 500)))
            : !t.target.closest(".menu-aside") &&
              document.documentElement.classList.contains("filter-open") &&
              (document.documentElement.classList.remove("filter-open"),
              document.documentElement.classList.remove("lock"),
              document.documentElement.classList.add("filter-closing"),
              setTimeout(() => {
                document.documentElement.classList.remove("filter-closing");
              }, 500));
        }),
        window.addEventListener("resize", function (t) {
          t.currentTarget.innerWidth > 767.8 &&
            (document.documentElement.classList.remove("filter-open"),
            document.documentElement.classList.remove("lock"));
        });
      t.popup = new (class {
        constructor(t) {
          let e = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-popup-youtube",
            youtubePlaceAttribute: "data-popup-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          this.youTubeCode,
            (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...e,
              ...t,
              classes: { ...e.classes, ...t?.classes },
              hashSettings: { ...e.hashSettings, ...t?.hashSettings },
              on: { ...e.on, ...t?.on },
            }),
            (this.bodyLock = !1),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.popupLogging("Проснулся"), this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (t) {
              const e = t.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (e)
                return (
                  t.preventDefault(),
                  (this._dataValue = e.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? e.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  (this.youTubeCode = e.getAttribute(
                    this.options.youtubeAttribute
                  )
                    ? e.getAttribute(this.options.youtubeAttribute)
                    : null),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = e),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `Ой ой, не заполнен атрибут у ${e.classList}`
                      )
                );
              return t.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!t.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (t.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (t) {
                if (
                  this.options.closeEsc &&
                  27 == t.which &&
                  "Escape" === t.code &&
                  this.isOpen
                )
                  return t.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == t.which &&
                  this.isOpen &&
                  this._focusCatch(t);
              }.bind(this)
            ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  "#/" != window.location.hash &&
                    (window.location.hash
                      ? this._openToHash()
                      : this.close(this.targetOpen.selector));
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(t) {
          if (a)
            if (
              ((this.bodyLock = !(
                !document.documentElement.classList.contains("lock") ||
                this.isOpen
              )),
              t &&
                "string" == typeof t &&
                "" !== t.trim() &&
                ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
              this.isOpen && ((this._reopen = !0), this.close()),
              this._selectorOpen ||
                (this.targetOpen.selector = this.lastClosed.selector),
              this._reopen ||
                (this.previousActiveElement = document.activeElement),
              (this.targetOpen.element = document.querySelector(
                this.targetOpen.selector
              )),
              this.targetOpen.element)
            ) {
              if (this.youTubeCode) {
                const t = `https://www.youtube.com/embed/${this.youTubeCode}?rel=0&showinfo=0&autoplay=1`,
                  e = document.createElement("iframe");
                e.setAttribute("allowfullscreen", "");
                const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
                if (
                  (e.setAttribute("allow", `${s}; encrypted-media`),
                  e.setAttribute("src", t),
                  !this.targetOpen.element.querySelector(
                    `[${this.options.youtubePlaceAttribute}]`
                  ))
                ) {
                  this.targetOpen.element
                    .querySelector(".popup__text")
                    .setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                }
                this.targetOpen.element
                  .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                  .appendChild(e);
              }
              this.options.hashSettings.location &&
                (this._getHash(), this._setHash()),
                this.options.on.beforeOpen(this),
                document.dispatchEvent(
                  new CustomEvent("beforePopupOpen", {
                    detail: { popup: this },
                  })
                ),
                this.targetOpen.element.classList.add(
                  this.options.classes.popupActive
                ),
                document.documentElement.classList.add(
                  this.options.classes.bodyActive
                ),
                this._reopen ? (this._reopen = !1) : !this.bodyLock && c(),
                this.targetOpen.element.setAttribute("aria-hidden", "false"),
                (this.previousOpen.selector = this.targetOpen.selector),
                (this.previousOpen.element = this.targetOpen.element),
                (this._selectorOpen = !1),
                (this.isOpen = !0),
                setTimeout(() => {
                  this._focusTrap();
                }, 50),
                this.options.on.afterOpen(this),
                document.dispatchEvent(
                  new CustomEvent("afterPopupOpen", { detail: { popup: this } })
                ),
                this.popupLogging("Открыл попап");
            } else
              this.popupLogging(
                "Ой ой, такого попапа нет.Проверьте корректность ввода. "
              );
        }
        close(t) {
          t &&
            "string" == typeof t &&
            "" !== t.trim() &&
            (this.previousOpen.selector = t),
            this.isOpen &&
              a &&
              (this.options.on.beforeClose(this),
              document.dispatchEvent(
                new CustomEvent("beforePopupClose", { detail: { popup: this } })
              ),
              this.youTubeCode &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.documentElement.classList.remove(
                  this.options.classes.bodyActive
                ),
                !this.bodyLock && l(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              document.dispatchEvent(
                new CustomEvent("afterPopupClose", { detail: { popup: this } })
              ),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("Закрыл попап"));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let t = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          (document.querySelector(
            `[${this.options.attributeOpenButton} = "${t}"]`
          )
            ? document.querySelector(
                `[${this.options.attributeOpenButton} = "${t}"]`
              )
            : document.querySelector(
                `[${this.options.attributeOpenButton} = "${t.replace(
                  ".",
                  "#"
                )}"]`
              )) &&
            t &&
            this.open(t);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(t) {
          const e = this.targetOpen.element.querySelectorAll(this._focusEl),
            s = Array.prototype.slice.call(e),
            i = s.indexOf(document.activeElement);
          t.shiftKey &&
            0 === i &&
            (s[s.length - 1].focus(), t.preventDefault()),
            t.shiftKey ||
              i !== s.length - 1 ||
              (s[0].focus(), t.preventDefault());
        }
        _focusTrap() {
          const t = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : t[0].focus();
        }
        popupLogging(t) {}
      })({});
      var h = s(2);
      let m = (t, e = !1, s = 500, i = 0) => {
        const n = document.querySelector(t);
        if (n) {
          let r = "",
            a = 0;
          e &&
            ((r = "header.header"),
            (a = document.querySelector(r).offsetHeight));
          let o = {
            speedAsDuration: !0,
            speed: s,
            header: r,
            offset: i,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (l(), document.documentElement.classList.remove("menu-open")),
            void 0 !== h)
          )
            new h().animateScroll(n, "", o);
          else {
            let t = n.getBoundingClientRect().top + scrollY;
            (t = a ? t - a : t),
              (t = i ? t - i : t),
              window.scrollTo({ top: t, behavior: "smooth" });
          }
          u(`[gotoBlock]: Юхуу...едем к ${t}`);
        } else u(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
      };
      let f = {
        getErrors(t) {
          let e = 0,
            s = t.querySelectorAll("*[data-required]");
          return (
            s.length &&
              s.forEach((t) => {
                (null === t.offsetParent && "SELECT" !== t.tagName) ||
                  t.disabled ||
                  (e += this.validateInput(t));
              }),
            e
          );
        },
        validateInput(t) {
          let e = 0;
          return (
            "email" === t.dataset.required
              ? ((t.value = t.value.replace(" ", "")),
                this.emailTest(t)
                  ? (this.addError(t), e++)
                  : this.removeError(t))
              : ("checkbox" !== t.type || t.checked) && t.value.trim()
              ? this.removeError(t)
              : (this.addError(t), e++),
            e
          );
        },
        addError(t) {
          t.classList.add("_form-error"),
            t.parentElement.classList.add("_form-error");
          let e = t.parentElement.querySelector(".form__error");
          e && t.parentElement.removeChild(e),
            t.dataset.error &&
              t.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="form__error">${t.dataset.error}</div>`
              );
        },
        removeError(t) {
          t.classList.remove("_form-error"),
            t.parentElement.classList.remove("_form-error"),
            t.parentElement.querySelector(".form__error") &&
              t.parentElement.removeChild(
                t.parentElement.querySelector(".form__error")
              );
        },
        formClean(e) {
          e.reset(),
            setTimeout(() => {
              let s = e.querySelectorAll("input,textarea");
              for (let t = 0; t < s.length; t++) {
                const e = s[t];
                e.parentElement.classList.remove("_form-focus"),
                  e.classList.remove("_form-focus"),
                  f.removeError(e);
              }
              let i = e.querySelectorAll(".checkbox__input");
              if (i.length > 0)
                for (let t = 0; t < i.length; t++) {
                  i[t].checked = !1;
                }
              if (t.select) {
                let s = e.querySelectorAll(".select");
                if (s.length)
                  for (let e = 0; e < s.length; e++) {
                    const i = s[e].querySelector("select");
                    t.select.selectBuild(i);
                  }
              }
            }, 0);
        },
        emailTest: (t) =>
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(t.value),
      };
      t.select = new (class {
        constructor(t, e = null) {
          if (
            ((this.config = Object.assign({ init: !0, logging: !0 }, t)),
            (this.selectClasses = {
              classSelect: "select",
              classSelectBody: "select__body",
              classSelectTitle: "select__title",
              classSelectValue: "select__value",
              classSelectLabel: "select__label",
              classSelectInput: "select__input",
              classSelectText: "select__text",
              classSelectLink: "select__link",
              classSelectOptions: "select__options",
              classSelectOptionsScroll: "select__scroll",
              classSelectOption: "select__option",
              classSelectContent: "select__content",
              classSelectRow: "select__row",
              classSelectData: "select__asset",
              classSelectDisabled: "_select-disabled",
              classSelectTag: "_select-tag",
              classSelectOpen: "_select-open",
              classSelectActive: "_select-active",
              classSelectFocus: "_select-focus",
              classSelectMultiple: "_select-multiple",
              classSelectCheckBox: "_select-checkbox",
              classSelectOptionSelected: "_select-selected",
              classSelectPseudoLabel: "_select-pseudo-label",
            }),
            (this._this = this),
            this.config.init)
          ) {
            const t = e
              ? document.querySelectorAll(e)
              : document.querySelectorAll("select");
            t.length
              ? (this.selectsInit(t),
                this.setLogging(`Проснулся, построил селектов: (${t.length})`))
              : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
          }
        }
        getSelectClass(t) {
          return `.${t}`;
        }
        getSelectElement(t, e) {
          return {
            originalSelect: t.querySelector("select"),
            selectElement: t.querySelector(this.getSelectClass(e)),
          };
        }
        selectsInit(t) {
          t.forEach((t, e) => {
            this.selectInit(t, e + 1);
          }),
            document.addEventListener(
              "click",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            ),
            document.addEventListener(
              "keydown",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            ),
            document.addEventListener(
              "focusin",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            ),
            document.addEventListener(
              "focusout",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            );
        }
        selectInit(t, e) {
          const s = this;
          let i = document.createElement("div");
          if (
            (i.classList.add(this.selectClasses.classSelect),
            t.parentNode.insertBefore(i, t),
            i.appendChild(t),
            (t.hidden = !0),
            e && (t.dataset.id = e),
            this.getSelectPlaceholder(t) &&
              ((t.dataset.placeholder = this.getSelectPlaceholder(t).value),
              this.getSelectPlaceholder(t).label.show))
          ) {
            this.getSelectElement(
              i,
              this.selectClasses.classSelectTitle
            ).selectElement.insertAdjacentHTML(
              "afterbegin",
              `<span class="${this.selectClasses.classSelectLabel}">${
                this.getSelectPlaceholder(t).label.text
                  ? this.getSelectPlaceholder(t).label.text
                  : this.getSelectPlaceholder(t).value
              }</span>`
            );
          }
          i.insertAdjacentHTML(
            "beforeend",
            `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
          ),
            this.selectBuild(t),
            (t.dataset.speed = t.dataset.speed ? t.dataset.speed : "150"),
            t.addEventListener("change", function (t) {
              s.selectChange(t);
            });
        }
        selectBuild(t) {
          const e = t.parentElement;
          (e.dataset.id = t.dataset.id),
            t.dataset.classModif &&
              e.classList.add(`select_${t.dataset.classModif}`),
            t.multiple
              ? e.classList.add(this.selectClasses.classSelectMultiple)
              : e.classList.remove(this.selectClasses.classSelectMultiple),
            t.hasAttribute("data-checkbox") && t.multiple
              ? e.classList.add(this.selectClasses.classSelectCheckBox)
              : e.classList.remove(this.selectClasses.classSelectCheckBox),
            this.setSelectTitleValue(e, t),
            this.setOptions(e, t),
            t.hasAttribute("data-search") && this.searchActions(e),
            t.hasAttribute("data-open") && this.selectAction(e),
            this.selectDisabled(e, t);
        }
        selectsActions(t) {
          const e = t.target,
            s = t.type;
          if (
            e.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
            e.closest(this.getSelectClass(this.selectClasses.classSelectTag))
          ) {
            const i = e.closest(".select")
                ? e.closest(".select")
                : document.querySelector(
                    `.${this.selectClasses.classSelect}[data-id="${
                      e.closest(
                        this.getSelectClass(this.selectClasses.classSelectTag)
                      ).dataset.selectId
                    }"]`
                  ),
              n = this.getSelectElement(i).originalSelect;
            if ("click" === s) {
              if (!n.disabled)
                if (
                  e.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  )
                ) {
                  const t = e.closest(
                      this.getSelectClass(this.selectClasses.classSelectTag)
                    ),
                    s = document.querySelector(
                      `.${this.selectClasses.classSelect}[data-id="${t.dataset.selectId}"] .select__option[data-value="${t.dataset.value}"]`
                    );
                  this.optionAction(i, n, s);
                } else if (
                  e.closest(
                    this.getSelectClass(this.selectClasses.classSelectTitle)
                  )
                )
                  this.selectAction(i);
                else if (
                  e.closest(
                    this.getSelectClass(this.selectClasses.classSelectOption)
                  )
                ) {
                  const t = e.closest(
                    this.getSelectClass(this.selectClasses.classSelectOption)
                  );
                  this.optionAction(i, n, t);
                }
            } else
              "focusin" === s || "focusout" === s
                ? e.closest(
                    this.getSelectClass(this.selectClasses.classSelect)
                  ) &&
                  ("focusin" === s
                    ? i.classList.add(this.selectClasses.classSelectFocus)
                    : i.classList.remove(this.selectClasses.classSelectFocus))
                : "keydown" === s && "Escape" === t.code && this.selectsСlose();
          } else this.selectsСlose();
        }
        selectsСlose(t) {
          const e = (t || document).querySelectorAll(
            `${this.getSelectClass(
              this.selectClasses.classSelect
            )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
          );
          e.length &&
            e.forEach((t) => {
              this.selectСlose(t);
            });
        }
        selectСlose(t) {
          const e = this.getSelectElement(t).originalSelect,
            s = this.getSelectElement(
              t,
              this.selectClasses.classSelectOptions
            ).selectElement;
          s.classList.contains("_slide") ||
            (t.classList.remove(this.selectClasses.classSelectOpen),
            i(s, e.dataset.speed));
        }
        selectAction(t) {
          const e = this.getSelectElement(t).originalSelect,
            s = this.getSelectElement(
              t,
              this.selectClasses.classSelectOptions
            ).selectElement;
          if (e.closest("[data-one-select]")) {
            const t = e.closest("[data-one-select]");
            this.selectsСlose(t);
          }
          s.classList.contains("_slide") ||
            (t.classList.toggle(this.selectClasses.classSelectOpen),
            r(s, e.dataset.speed));
        }
        setSelectTitleValue(t, e) {
          const s = this.getSelectElement(
              t,
              this.selectClasses.classSelectBody
            ).selectElement,
            i = this.getSelectElement(
              t,
              this.selectClasses.classSelectTitle
            ).selectElement;
          i && i.remove(),
            s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(t, e));
        }
        getSelectTitleValue(t, e) {
          let s = this.getSelectedOptionsData(e, 2).html;
          e.multiple &&
            e.hasAttribute("data-tags") &&
            ((s = this.getSelectedOptionsData(e)
              .elements.map(
                (e) =>
                  `<span role="button" data-select-id="${
                    t.dataset.id
                  }" data-value="${
                    e.value
                  }" class="_select-tag">${this.getSelectElementContent(
                    e
                  )}</span>`
              )
              .join("")),
            e.dataset.tags &&
              document.querySelector(e.dataset.tags) &&
              ((document.querySelector(e.dataset.tags).innerHTML = s),
              e.hasAttribute("data-search") && (s = !1))),
            (s = s.length
              ? s
              : e.dataset.placeholder
              ? e.dataset.placeholder
              : "");
          let i = "",
            n = "";
          if (
            (e.hasAttribute("data-pseudo-label") &&
              ((i = e.dataset.pseudoLabel
                ? ` data-pseudo-label="${e.dataset.pseudoLabel}"`
                : ' data-pseudo-label="Заполните атрибут"'),
              (n = ` ${this.selectClasses.classSelectPseudoLabel}`)),
            this.getSelectedOptionsData(e).values.length
              ? t.classList.add(this.selectClasses.classSelectActive)
              : t.classList.remove(this.selectClasses.classSelectActive),
            e.hasAttribute("data-search"))
          )
            return `<div class="${this.selectClasses.classSelectTitle}"><span${i} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
          {
            const t =
              this.getSelectedOptionsData(e).elements.length &&
              this.getSelectedOptionsData(e).elements[0].dataset.class
                ? ` ${this.getSelectedOptionsData(e).elements[0].dataset.class}`
                : "";
            return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${i} class="${this.selectClasses.classSelectValue}${n}"><span class="${this.selectClasses.classSelectContent}${t}">${s}</span></span></button>`;
          }
        }
        getSelectElementContent(t) {
          const e = t.dataset.asset ? `${t.dataset.asset}` : "",
            s = e.indexOf("img") >= 0 ? `<img src="${e}" alt="">` : e;
          let i = "";
          return (
            (i += e
              ? `<span class="${this.selectClasses.classSelectRow}">`
              : ""),
            (i += e
              ? `<span class="${this.selectClasses.classSelectData}">`
              : ""),
            (i += e ? s : ""),
            (i += e ? "</span>" : ""),
            (i += e
              ? `<span class="${this.selectClasses.classSelectText}">`
              : ""),
            (i += t.textContent),
            (i += e ? "</span>" : ""),
            (i += e ? "</span>" : ""),
            i
          );
        }
        getSelectPlaceholder(t) {
          const e = Array.from(t.options).find((t) => !t.value);
          if (e)
            return {
              value: e.textContent,
              show: e.hasAttribute("data-show"),
              label: {
                show: e.hasAttribute("data-label"),
                text: e.dataset.label,
              },
            };
        }
        getSelectedOptionsData(t, e) {
          let s = [];
          return (
            t.multiple
              ? (s = Array.from(t.options)
                  .filter((t) => t.value)
                  .filter((t) => t.selected))
              : s.push(t.options[t.selectedIndex]),
            {
              elements: s.map((t) => t),
              values: s.filter((t) => t.value).map((t) => t.value),
              html: s.map((t) => this.getSelectElementContent(t)),
            }
          );
        }
        getOptions(t) {
          let e = t.hasAttribute("data-scroll") ? "data-simplebar" : "",
            s = t.dataset.scroll
              ? `style="max-height:${t.dataset.scroll}px"`
              : "",
            i = Array.from(t.options);
          if (i.length > 0) {
            let n = "";
            return (
              ((this.getSelectPlaceholder(t) &&
                !this.getSelectPlaceholder(t).show) ||
                t.multiple) &&
                (i = i.filter((t) => t.value)),
              (n += e
                ? `<div ${e} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
                : ""),
              i.forEach((e) => {
                n += this.getOption(e, t);
              }),
              (n += e ? "</div>" : ""),
              n
            );
          }
        }
        getOption(t, e) {
          const s =
              t.selected && e.multiple
                ? ` ${this.selectClasses.classSelectOptionSelected}`
                : "",
            i =
              !t.selected || e.hasAttribute("data-show-selected") || e.multiple
                ? ""
                : "hidden",
            n = t.dataset.class ? ` ${t.dataset.class}` : "",
            r = !!t.dataset.href && t.dataset.href,
            a = t.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
          let o = "";
          return (
            (o += r
              ? `<a ${a} ${i} href="${r}" data-value="${t.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
              : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${t.value}" type="button">`),
            (o += this.getSelectElementContent(t)),
            (o += r ? "</a>" : "</button>"),
            o
          );
        }
        setOptions(t, e) {
          this.getSelectElement(
            t,
            this.selectClasses.classSelectOptions
          ).selectElement.innerHTML = this.getOptions(e);
        }
        optionAction(t, e, s) {
          if (e.multiple) {
            s.classList.toggle(this.selectClasses.classSelectOptionSelected);
            this.getSelectedOptionsData(e).elements.forEach((t) => {
              t.removeAttribute("selected");
            });
            t.querySelectorAll(
              this.getSelectClass(this.selectClasses.classSelectOptionSelected)
            ).forEach((t) => {
              e.querySelector(
                `option[value="${t.dataset.value}"]`
              ).setAttribute("selected", "selected");
            });
          } else
            e.hasAttribute("data-show-selected") ||
              (t.querySelector(
                `${this.getSelectClass(
                  this.selectClasses.classSelectOption
                )}[hidden]`
              ) &&
                (t.querySelector(
                  `${this.getSelectClass(
                    this.selectClasses.classSelectOption
                  )}[hidden]`
                ).hidden = !1),
              (s.hidden = !0)),
              (e.value = s.hasAttribute("data-value")
                ? s.dataset.value
                : s.textContent),
              this.selectAction(t);
          this.setSelectTitleValue(t, e), this.setSelectChange(e);
        }
        selectChange(t) {
          const e = t.target;
          this.selectBuild(e), this.setSelectChange(e);
        }
        setSelectChange(t) {
          if (
            (t.hasAttribute("data-validate") && f.validateInput(t),
            t.hasAttribute("data-submit") && t.value)
          ) {
            let e = document.createElement("button");
            (e.type = "submit"),
              t.closest("form").append(e),
              e.click(),
              e.remove();
          }
          const e = t.parentElement;
          this.selectCallback(e, t);
        }
        selectDisabled(t, e) {
          e.disabled
            ? (t.classList.add(this.selectClasses.classSelectDisabled),
              (this.getSelectElement(
                t,
                this.selectClasses.classSelectTitle
              ).selectElement.disabled = !0))
            : (t.classList.remove(this.selectClasses.classSelectDisabled),
              (this.getSelectElement(
                t,
                this.selectClasses.classSelectTitle
              ).selectElement.disabled = !1));
        }
        searchActions(t) {
          this.getSelectElement(t).originalSelect;
          const e = this.getSelectElement(
              t,
              this.selectClasses.classSelectInput
            ).selectElement,
            s = this.getSelectElement(
              t,
              this.selectClasses.classSelectOptions
            ).selectElement,
            i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
            n = this;
          e.addEventListener("input", function () {
            i.forEach((t) => {
              t.textContent.toUpperCase().indexOf(e.value.toUpperCase()) >= 0
                ? (t.hidden = !1)
                : (t.hidden = !0);
            }),
              !0 === s.hidden && n.selectAction(t);
          });
        }
        selectCallback(t, e) {
          document.dispatchEvent(
            new CustomEvent("selectCallback", { detail: { select: e } })
          );
        }
        setLogging(t) {
          this.config.logging && u(`[select]: ${t}`);
        }
      })({});
      var g = s(211);
      function v(t) {
        return (
          null !== t &&
          "object" == typeof t &&
          "constructor" in t &&
          t.constructor === Object
        );
      }
      function _(t = {}, e = {}) {
        Object.keys(e).forEach((s) => {
          void 0 === t[s]
            ? (t[s] = e[s])
            : v(e[s]) &&
              v(t[s]) &&
              Object.keys(e[s]).length > 0 &&
              _(t[s], e[s]);
        });
      }
      !(function () {
        const t = document.querySelector("#range");
        if (t) {
          g.create(t, {
            start: ["0", "1230"],
            connect: !0,
            step: 1,
            range: { min: [39], max: [1500] },
            format: wNumb({ decimals: 0, prefix: "$" }),
          });
          var e = document.getElementById("slider-price-value");
          t.noUiSlider.on("update", function (t) {
            e.innerHTML = t.join(" - ");
          });
        }
      })();
      const b = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function y() {
        const t = "undefined" != typeof document ? document : {};
        return _(t, b), t;
      }
      const w = {
        document: b,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
          return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (t) =>
          "undefined" == typeof setTimeout ? (t(), null) : setTimeout(t, 0),
        cancelAnimationFrame(t) {
          "undefined" != typeof setTimeout && clearTimeout(t);
        },
      };
      function S() {
        const t = "undefined" != typeof window ? window : {};
        return _(t, w), t;
      }
      class C extends Array {
        constructor(t) {
          "number" == typeof t
            ? super(t)
            : (super(...(t || [])),
              (function (t) {
                const e = t.__proto__;
                Object.defineProperty(t, "__proto__", {
                  get: () => e,
                  set(t) {
                    e.__proto__ = t;
                  },
                });
              })(this));
        }
      }
      function x(t = []) {
        const e = [];
        return (
          t.forEach((t) => {
            Array.isArray(t) ? e.push(...x(t)) : e.push(t);
          }),
          e
        );
      }
      function T(t, e) {
        return Array.prototype.filter.call(t, e);
      }
      function E(t, e) {
        const s = S(),
          i = y();
        let n = [];
        if (!e && t instanceof C) return t;
        if (!t) return new C(n);
        if ("string" == typeof t) {
          const s = t.trim();
          if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let t = "div";
            0 === s.indexOf("<li") && (t = "ul"),
              0 === s.indexOf("<tr") && (t = "tbody"),
              (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (t = "tr"),
              0 === s.indexOf("<tbody") && (t = "table"),
              0 === s.indexOf("<option") && (t = "select");
            const e = i.createElement(t);
            e.innerHTML = s;
            for (let t = 0; t < e.childNodes.length; t += 1)
              n.push(e.childNodes[t]);
          } else
            n = (function (t, e) {
              if ("string" != typeof t) return [t];
              const s = [],
                i = e.querySelectorAll(t);
              for (let t = 0; t < i.length; t += 1) s.push(i[t]);
              return s;
            })(t.trim(), e || i);
        } else if (t.nodeType || t === s || t === i) n.push(t);
        else if (Array.isArray(t)) {
          if (t instanceof C) return t;
          n = t;
        }
        return new C(
          (function (t) {
            const e = [];
            for (let s = 0; s < t.length; s += 1)
              -1 === e.indexOf(t[s]) && e.push(t[s]);
            return e;
          })(n)
        );
      }
      E.fn = C.prototype;
      const L = "resize scroll".split(" ");
      function A(t) {
        return function (...e) {
          if (void 0 === e[0]) {
            for (let e = 0; e < this.length; e += 1)
              L.indexOf(t) < 0 &&
                (t in this[e] ? this[e][t]() : E(this[e]).trigger(t));
            return this;
          }
          return this.on(t, ...e);
        };
      }
      A("click"),
        A("blur"),
        A("focus"),
        A("focusin"),
        A("focusout"),
        A("keyup"),
        A("keydown"),
        A("keypress"),
        A("submit"),
        A("change"),
        A("mousedown"),
        A("mousemove"),
        A("mouseup"),
        A("mouseenter"),
        A("mouseleave"),
        A("mouseout"),
        A("mouseover"),
        A("touchstart"),
        A("touchend"),
        A("touchmove"),
        A("resize"),
        A("scroll");
      const O = {
        addClass: function (...t) {
          const e = x(t.map((t) => t.split(" ")));
          return (
            this.forEach((t) => {
              t.classList.add(...e);
            }),
            this
          );
        },
        removeClass: function (...t) {
          const e = x(t.map((t) => t.split(" ")));
          return (
            this.forEach((t) => {
              t.classList.remove(...e);
            }),
            this
          );
        },
        hasClass: function (...t) {
          const e = x(t.map((t) => t.split(" ")));
          return (
            T(this, (t) => e.filter((e) => t.classList.contains(e)).length > 0)
              .length > 0
          );
        },
        toggleClass: function (...t) {
          const e = x(t.map((t) => t.split(" ")));
          this.forEach((t) => {
            e.forEach((e) => {
              t.classList.toggle(e);
            });
          });
        },
        attr: function (t, e) {
          if (1 === arguments.length && "string" == typeof t)
            return this[0] ? this[0].getAttribute(t) : void 0;
          for (let s = 0; s < this.length; s += 1)
            if (2 === arguments.length) this[s].setAttribute(t, e);
            else
              for (const e in t)
                (this[s][e] = t[e]), this[s].setAttribute(e, t[e]);
          return this;
        },
        removeAttr: function (t) {
          for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
          return this;
        },
        transform: function (t) {
          for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
          return this;
        },
        transition: function (t) {
          for (let e = 0; e < this.length; e += 1)
            this[e].style.transitionDuration =
              "string" != typeof t ? `${t}ms` : t;
          return this;
        },
        on: function (...t) {
          let [e, s, i, n] = t;
          function r(t) {
            const e = t.target;
            if (!e) return;
            const n = t.target.dom7EventData || [];
            if ((n.indexOf(t) < 0 && n.unshift(t), E(e).is(s))) i.apply(e, n);
            else {
              const t = E(e).parents();
              for (let e = 0; e < t.length; e += 1)
                E(t[e]).is(s) && i.apply(t[e], n);
            }
          }
          function a(t) {
            const e = (t && t.target && t.target.dom7EventData) || [];
            e.indexOf(t) < 0 && e.unshift(t), i.apply(this, e);
          }
          "function" == typeof t[1] && (([e, i, n] = t), (s = void 0)),
            n || (n = !1);
          const o = e.split(" ");
          let l;
          for (let t = 0; t < this.length; t += 1) {
            const e = this[t];
            if (s)
              for (l = 0; l < o.length; l += 1) {
                const t = o[l];
                e.dom7LiveListeners || (e.dom7LiveListeners = {}),
                  e.dom7LiveListeners[t] || (e.dom7LiveListeners[t] = []),
                  e.dom7LiveListeners[t].push({
                    listener: i,
                    proxyListener: r,
                  }),
                  e.addEventListener(t, r, n);
              }
            else
              for (l = 0; l < o.length; l += 1) {
                const t = o[l];
                e.dom7Listeners || (e.dom7Listeners = {}),
                  e.dom7Listeners[t] || (e.dom7Listeners[t] = []),
                  e.dom7Listeners[t].push({ listener: i, proxyListener: a }),
                  e.addEventListener(t, a, n);
              }
          }
          return this;
        },
        off: function (...t) {
          let [e, s, i, n] = t;
          "function" == typeof t[1] && (([e, i, n] = t), (s = void 0)),
            n || (n = !1);
          const r = e.split(" ");
          for (let t = 0; t < r.length; t += 1) {
            const e = r[t];
            for (let t = 0; t < this.length; t += 1) {
              const r = this[t];
              let a;
              if (
                (!s && r.dom7Listeners
                  ? (a = r.dom7Listeners[e])
                  : s && r.dom7LiveListeners && (a = r.dom7LiveListeners[e]),
                a && a.length)
              )
                for (let t = a.length - 1; t >= 0; t -= 1) {
                  const s = a[t];
                  (i && s.listener === i) ||
                  (i &&
                    s.listener &&
                    s.listener.dom7proxy &&
                    s.listener.dom7proxy === i)
                    ? (r.removeEventListener(e, s.proxyListener, n),
                      a.splice(t, 1))
                    : i ||
                      (r.removeEventListener(e, s.proxyListener, n),
                      a.splice(t, 1));
                }
            }
          }
          return this;
        },
        trigger: function (...t) {
          const e = S(),
            s = t[0].split(" "),
            i = t[1];
          for (let n = 0; n < s.length; n += 1) {
            const r = s[n];
            for (let s = 0; s < this.length; s += 1) {
              const n = this[s];
              if (e.CustomEvent) {
                const s = new e.CustomEvent(r, {
                  detail: i,
                  bubbles: !0,
                  cancelable: !0,
                });
                (n.dom7EventData = t.filter((t, e) => e > 0)),
                  n.dispatchEvent(s),
                  (n.dom7EventData = []),
                  delete n.dom7EventData;
              }
            }
          }
          return this;
        },
        transitionEnd: function (t) {
          const e = this;
          return (
            t &&
              e.on("transitionend", function s(i) {
                i.target === this &&
                  (t.call(this, i), e.off("transitionend", s));
              }),
            this
          );
        },
        outerWidth: function (t) {
          if (this.length > 0) {
            if (t) {
              const t = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(t.getPropertyValue("margin-right")) +
                parseFloat(t.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (t) {
          if (this.length > 0) {
            if (t) {
              const t = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(t.getPropertyValue("margin-top")) +
                parseFloat(t.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          const t = S();
          return this[0] ? t.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            const t = S(),
              e = y(),
              s = this[0],
              i = s.getBoundingClientRect(),
              n = e.body,
              r = s.clientTop || n.clientTop || 0,
              a = s.clientLeft || n.clientLeft || 0,
              o = s === t ? t.scrollY : s.scrollTop,
              l = s === t ? t.scrollX : s.scrollLeft;
            return { top: i.top + o - r, left: i.left + l - a };
          }
          return null;
        },
        css: function (t, e) {
          const s = S();
          let i;
          if (1 === arguments.length) {
            if ("string" != typeof t) {
              for (i = 0; i < this.length; i += 1)
                for (const e in t) this[i].style[e] = t[e];
              return this;
            }
            if (this[0])
              return s.getComputedStyle(this[0], null).getPropertyValue(t);
          }
          if (2 === arguments.length && "string" == typeof t) {
            for (i = 0; i < this.length; i += 1) this[i].style[t] = e;
            return this;
          }
          return this;
        },
        each: function (t) {
          return t
            ? (this.forEach((e, s) => {
                t.apply(e, [e, s]);
              }),
              this)
            : this;
        },
        html: function (t) {
          if (void 0 === t) return this[0] ? this[0].innerHTML : null;
          for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
          return this;
        },
        text: function (t) {
          if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
          for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
          return this;
        },
        is: function (t) {
          const e = S(),
            s = y(),
            i = this[0];
          let n, r;
          if (!i || void 0 === t) return !1;
          if ("string" == typeof t) {
            if (i.matches) return i.matches(t);
            if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
            if (i.msMatchesSelector) return i.msMatchesSelector(t);
            for (n = E(t), r = 0; r < n.length; r += 1)
              if (n[r] === i) return !0;
            return !1;
          }
          if (t === s) return i === s;
          if (t === e) return i === e;
          if (t.nodeType || t instanceof C) {
            for (n = t.nodeType ? [t] : t, r = 0; r < n.length; r += 1)
              if (n[r] === i) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let t,
            e = this[0];
          if (e) {
            for (t = 0; null !== (e = e.previousSibling); )
              1 === e.nodeType && (t += 1);
            return t;
          }
        },
        eq: function (t) {
          if (void 0 === t) return this;
          const e = this.length;
          if (t > e - 1) return E([]);
          if (t < 0) {
            const s = e + t;
            return E(s < 0 ? [] : [this[s]]);
          }
          return E([this[t]]);
        },
        append: function (...t) {
          let e;
          const s = y();
          for (let i = 0; i < t.length; i += 1) {
            e = t[i];
            for (let t = 0; t < this.length; t += 1)
              if ("string" == typeof e) {
                const i = s.createElement("div");
                for (i.innerHTML = e; i.firstChild; )
                  this[t].appendChild(i.firstChild);
              } else if (e instanceof C)
                for (let s = 0; s < e.length; s += 1) this[t].appendChild(e[s]);
              else this[t].appendChild(e);
          }
          return this;
        },
        prepend: function (t) {
          const e = y();
          let s, i;
          for (s = 0; s < this.length; s += 1)
            if ("string" == typeof t) {
              const n = e.createElement("div");
              for (n.innerHTML = t, i = n.childNodes.length - 1; i >= 0; i -= 1)
                this[s].insertBefore(n.childNodes[i], this[s].childNodes[0]);
            } else if (t instanceof C)
              for (i = 0; i < t.length; i += 1)
                this[s].insertBefore(t[i], this[s].childNodes[0]);
            else this[s].insertBefore(t, this[s].childNodes[0]);
          return this;
        },
        next: function (t) {
          return this.length > 0
            ? t
              ? this[0].nextElementSibling &&
                E(this[0].nextElementSibling).is(t)
                ? E([this[0].nextElementSibling])
                : E([])
              : this[0].nextElementSibling
              ? E([this[0].nextElementSibling])
              : E([])
            : E([]);
        },
        nextAll: function (t) {
          const e = [];
          let s = this[0];
          if (!s) return E([]);
          for (; s.nextElementSibling; ) {
            const i = s.nextElementSibling;
            t ? E(i).is(t) && e.push(i) : e.push(i), (s = i);
          }
          return E(e);
        },
        prev: function (t) {
          if (this.length > 0) {
            const e = this[0];
            return t
              ? e.previousElementSibling && E(e.previousElementSibling).is(t)
                ? E([e.previousElementSibling])
                : E([])
              : e.previousElementSibling
              ? E([e.previousElementSibling])
              : E([]);
          }
          return E([]);
        },
        prevAll: function (t) {
          const e = [];
          let s = this[0];
          if (!s) return E([]);
          for (; s.previousElementSibling; ) {
            const i = s.previousElementSibling;
            t ? E(i).is(t) && e.push(i) : e.push(i), (s = i);
          }
          return E(e);
        },
        parent: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1)
            null !== this[s].parentNode &&
              (t
                ? E(this[s].parentNode).is(t) && e.push(this[s].parentNode)
                : e.push(this[s].parentNode));
          return E(e);
        },
        parents: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1) {
            let i = this[s].parentNode;
            for (; i; )
              t ? E(i).is(t) && e.push(i) : e.push(i), (i = i.parentNode);
          }
          return E(e);
        },
        closest: function (t) {
          let e = this;
          return void 0 === t
            ? E([])
            : (e.is(t) || (e = e.parents(t).eq(0)), e);
        },
        find: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].querySelectorAll(t);
            for (let t = 0; t < i.length; t += 1) e.push(i[t]);
          }
          return E(e);
        },
        children: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].children;
            for (let s = 0; s < i.length; s += 1)
              (t && !E(i[s]).is(t)) || e.push(i[s]);
          }
          return E(e);
        },
        filter: function (t) {
          return E(T(this, t));
        },
        remove: function () {
          for (let t = 0; t < this.length; t += 1)
            this[t].parentNode && this[t].parentNode.removeChild(this[t]);
          return this;
        },
      };
      Object.keys(O).forEach((t) => {
        Object.defineProperty(E.fn, t, { value: O[t], writable: !0 });
      });
      const k = E;
      function M(t, e) {
        return void 0 === e && (e = 0), setTimeout(t, e);
      }
      function P() {
        return Date.now();
      }
      function $(t, e) {
        void 0 === e && (e = "x");
        const s = S();
        let i, n, r;
        const a = (function (t) {
          const e = S();
          let s;
          return (
            e.getComputedStyle && (s = e.getComputedStyle(t, null)),
            !s && t.currentStyle && (s = t.currentStyle),
            s || (s = t.style),
            s
          );
        })(t);
        return (
          s.WebKitCSSMatrix
            ? ((n = a.transform || a.webkitTransform),
              n.split(",").length > 6 &&
                (n = n
                  .split(", ")
                  .map((t) => t.replace(",", "."))
                  .join(", ")),
              (r = new s.WebKitCSSMatrix("none" === n ? "" : n)))
            : ((r =
                a.MozTransform ||
                a.OTransform ||
                a.MsTransform ||
                a.msTransform ||
                a.transform ||
                a
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,")),
              (i = r.toString().split(","))),
          "x" === e &&
            (n = s.WebKitCSSMatrix
              ? r.m41
              : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
          "y" === e &&
            (n = s.WebKitCSSMatrix
              ? r.m42
              : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
          n || 0
        );
      }
      function I(t) {
        return (
          "object" == typeof t &&
          null !== t &&
          t.constructor &&
          "Object" === Object.prototype.toString.call(t).slice(8, -1)
        );
      }
      function D(t) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement
          ? t instanceof HTMLElement
          : t && (1 === t.nodeType || 11 === t.nodeType);
      }
      function z() {
        const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
          e = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
          const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
          if (null != i && !D(i)) {
            const s = Object.keys(Object(i)).filter((t) => e.indexOf(t) < 0);
            for (let e = 0, n = s.length; e < n; e += 1) {
              const n = s[e],
                r = Object.getOwnPropertyDescriptor(i, n);
              void 0 !== r &&
                r.enumerable &&
                (I(t[n]) && I(i[n])
                  ? i[n].__swiper__
                    ? (t[n] = i[n])
                    : z(t[n], i[n])
                  : !I(t[n]) && I(i[n])
                  ? ((t[n] = {}),
                    i[n].__swiper__ ? (t[n] = i[n]) : z(t[n], i[n]))
                  : (t[n] = i[n]));
            }
          }
        }
        return t;
      }
      function q(t, e, s) {
        t.style.setProperty(e, s);
      }
      function B(t) {
        let { swiper: e, targetPosition: s, side: i } = t;
        const n = S(),
          r = -e.translate;
        let a,
          o = null;
        const l = e.params.speed;
        (e.wrapperEl.style.scrollSnapType = "none"),
          n.cancelAnimationFrame(e.cssModeFrameID);
        const c = s > r ? "next" : "prev",
          d = (t, e) => ("next" === c && t >= e) || ("prev" === c && t <= e),
          u = () => {
            (a = new Date().getTime()), null === o && (o = a);
            const t = Math.max(Math.min((a - o) / l, 1), 0),
              c = 0.5 - Math.cos(t * Math.PI) / 2;
            let p = r + c * (s - r);
            if ((d(p, s) && (p = s), e.wrapperEl.scrollTo({ [i]: p }), d(p, s)))
              return (
                (e.wrapperEl.style.overflow = "hidden"),
                (e.wrapperEl.style.scrollSnapType = ""),
                setTimeout(() => {
                  (e.wrapperEl.style.overflow = ""),
                    e.wrapperEl.scrollTo({ [i]: p });
                }),
                void n.cancelAnimationFrame(e.cssModeFrameID)
              );
            e.cssModeFrameID = n.requestAnimationFrame(u);
          };
        u();
      }
      let N, F, H;
      function G() {
        return (
          N ||
            (N = (function () {
              const t = S(),
                e = y();
              return {
                smoothScroll:
                  e.documentElement &&
                  "scrollBehavior" in e.documentElement.style,
                touch: !!(
                  "ontouchstart" in t ||
                  (t.DocumentTouch && e instanceof t.DocumentTouch)
                ),
                passiveListener: (function () {
                  let e = !1;
                  try {
                    const s = Object.defineProperty({}, "passive", {
                      get() {
                        e = !0;
                      },
                    });
                    t.addEventListener("testPassiveListener", null, s);
                  } catch (t) {}
                  return e;
                })(),
                gestures: "ongesturestart" in t,
              };
            })()),
          N
        );
      }
      function V(t) {
        return (
          void 0 === t && (t = {}),
          F ||
            (F = (function (t) {
              let { userAgent: e } = void 0 === t ? {} : t;
              const s = G(),
                i = S(),
                n = i.navigator.platform,
                r = e || i.navigator.userAgent,
                a = { ios: !1, android: !1 },
                o = i.screen.width,
                l = i.screen.height,
                c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
              let d = r.match(/(iPad).*OS\s([\d_]+)/);
              const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                p = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                h = "Win32" === n;
              let m = "MacIntel" === n;
              return (
                !d &&
                  m &&
                  s.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(`${o}x${l}`) >= 0 &&
                  ((d = r.match(/(Version)\/([\d.]+)/)),
                  d || (d = [0, 1, "13_0_0"]),
                  (m = !1)),
                c && !h && ((a.os = "android"), (a.android = !0)),
                (d || p || u) && ((a.os = "ios"), (a.ios = !0)),
                a
              );
            })(t)),
          F
        );
      }
      function R() {
        return (
          H ||
            (H = (function () {
              const t = S();
              return {
                isSafari: (function () {
                  const e = t.navigator.userAgent.toLowerCase();
                  return (
                    e.indexOf("safari") >= 0 &&
                    e.indexOf("chrome") < 0 &&
                    e.indexOf("android") < 0
                  );
                })(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  t.navigator.userAgent
                ),
              };
            })()),
          H
        );
      }
      const j = {
        on(t, e, s) {
          const i = this;
          if (!i.eventsListeners || i.destroyed) return i;
          if ("function" != typeof e) return i;
          const n = s ? "unshift" : "push";
          return (
            t.split(" ").forEach((t) => {
              i.eventsListeners[t] || (i.eventsListeners[t] = []),
                i.eventsListeners[t][n](e);
            }),
            i
          );
        },
        once(t, e, s) {
          const i = this;
          if (!i.eventsListeners || i.destroyed) return i;
          if ("function" != typeof e) return i;
          function n() {
            i.off(t, n), n.__emitterProxy && delete n.__emitterProxy;
            for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++)
              r[a] = arguments[a];
            e.apply(i, r);
          }
          return (n.__emitterProxy = e), i.on(t, n, s);
        },
        onAny(t, e) {
          const s = this;
          if (!s.eventsListeners || s.destroyed) return s;
          if ("function" != typeof t) return s;
          const i = e ? "unshift" : "push";
          return (
            s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s
          );
        },
        offAny(t) {
          const e = this;
          if (!e.eventsListeners || e.destroyed) return e;
          if (!e.eventsAnyListeners) return e;
          const s = e.eventsAnyListeners.indexOf(t);
          return s >= 0 && e.eventsAnyListeners.splice(s, 1), e;
        },
        off(t, e) {
          const s = this;
          return !s.eventsListeners || s.destroyed
            ? s
            : s.eventsListeners
            ? (t.split(" ").forEach((t) => {
                void 0 === e
                  ? (s.eventsListeners[t] = [])
                  : s.eventsListeners[t] &&
                    s.eventsListeners[t].forEach((i, n) => {
                      (i === e ||
                        (i.__emitterProxy && i.__emitterProxy === e)) &&
                        s.eventsListeners[t].splice(n, 1);
                    });
              }),
              s)
            : s;
        },
        emit() {
          const t = this;
          if (!t.eventsListeners || t.destroyed) return t;
          if (!t.eventsListeners) return t;
          let e, s, i;
          for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++)
            r[a] = arguments[a];
          "string" == typeof r[0] || Array.isArray(r[0])
            ? ((e = r[0]), (s = r.slice(1, r.length)), (i = t))
            : ((e = r[0].events), (s = r[0].data), (i = r[0].context || t)),
            s.unshift(i);
          return (
            (Array.isArray(e) ? e : e.split(" ")).forEach((e) => {
              t.eventsAnyListeners &&
                t.eventsAnyListeners.length &&
                t.eventsAnyListeners.forEach((t) => {
                  t.apply(i, [e, ...s]);
                }),
                t.eventsListeners &&
                  t.eventsListeners[e] &&
                  t.eventsListeners[e].forEach((t) => {
                    t.apply(i, s);
                  });
            }),
            t
          );
        },
      };
      const W = {
        updateSize: function () {
          const t = this;
          let e, s;
          const i = t.$el;
          (e =
            void 0 !== t.params.width && null !== t.params.width
              ? t.params.width
              : i[0].clientWidth),
            (s =
              void 0 !== t.params.height && null !== t.params.height
                ? t.params.height
                : i[0].clientHeight),
            (0 === e && t.isHorizontal()) ||
              (0 === s && t.isVertical()) ||
              ((e =
                e -
                parseInt(i.css("padding-left") || 0, 10) -
                parseInt(i.css("padding-right") || 0, 10)),
              (s =
                s -
                parseInt(i.css("padding-top") || 0, 10) -
                parseInt(i.css("padding-bottom") || 0, 10)),
              Number.isNaN(e) && (e = 0),
              Number.isNaN(s) && (s = 0),
              Object.assign(t, {
                width: e,
                height: s,
                size: t.isHorizontal() ? e : s,
              }));
        },
        updateSlides: function () {
          const t = this;
          function e(e) {
            return t.isHorizontal()
              ? e
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[e];
          }
          function s(t, s) {
            return parseFloat(t.getPropertyValue(e(s)) || 0);
          }
          const i = t.params,
            { $wrapperEl: n, size: r, rtlTranslate: a, wrongRTL: o } = t,
            l = t.virtual && i.virtual.enabled,
            c = l ? t.virtual.slides.length : t.slides.length,
            d = n.children(`.${t.params.slideClass}`),
            u = l ? t.virtual.slides.length : d.length;
          let p = [];
          const h = [],
            m = [];
          let f = i.slidesOffsetBefore;
          "function" == typeof f && (f = i.slidesOffsetBefore.call(t));
          let g = i.slidesOffsetAfter;
          "function" == typeof g && (g = i.slidesOffsetAfter.call(t));
          const v = t.snapGrid.length,
            _ = t.slidesGrid.length;
          let b = i.spaceBetween,
            y = -f,
            w = 0,
            S = 0;
          if (void 0 === r) return;
          "string" == typeof b &&
            b.indexOf("%") >= 0 &&
            (b = (parseFloat(b.replace("%", "")) / 100) * r),
            (t.virtualSize = -b),
            a
              ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
              : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
            i.centeredSlides &&
              i.cssMode &&
              (q(t.wrapperEl, "--swiper-centered-offset-before", ""),
              q(t.wrapperEl, "--swiper-centered-offset-after", ""));
          const C = i.grid && i.grid.rows > 1 && t.grid;
          let x;
          C && t.grid.initSlides(u);
          const T =
            "auto" === i.slidesPerView &&
            i.breakpoints &&
            Object.keys(i.breakpoints).filter(
              (t) => void 0 !== i.breakpoints[t].slidesPerView
            ).length > 0;
          for (let n = 0; n < u; n += 1) {
            x = 0;
            const a = d.eq(n);
            if (
              (C && t.grid.updateSlide(n, a, u, e), "none" !== a.css("display"))
            ) {
              if ("auto" === i.slidesPerView) {
                T && (d[n].style[e("width")] = "");
                const r = getComputedStyle(a[0]),
                  o = a[0].style.transform,
                  l = a[0].style.webkitTransform;
                if (
                  (o && (a[0].style.transform = "none"),
                  l && (a[0].style.webkitTransform = "none"),
                  i.roundLengths)
                )
                  x = t.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                else {
                  const t = s(r, "width"),
                    e = s(r, "padding-left"),
                    i = s(r, "padding-right"),
                    n = s(r, "margin-left"),
                    o = s(r, "margin-right"),
                    l = r.getPropertyValue("box-sizing");
                  if (l && "border-box" === l) x = t + n + o;
                  else {
                    const { clientWidth: s, offsetWidth: r } = a[0];
                    x = t + e + i + n + o + (r - s);
                  }
                }
                o && (a[0].style.transform = o),
                  l && (a[0].style.webkitTransform = l),
                  i.roundLengths && (x = Math.floor(x));
              } else
                (x = (r - (i.slidesPerView - 1) * b) / i.slidesPerView),
                  i.roundLengths && (x = Math.floor(x)),
                  d[n] && (d[n].style[e("width")] = `${x}px`);
              d[n] && (d[n].swiperSlideSize = x),
                m.push(x),
                i.centeredSlides
                  ? ((y = y + x / 2 + w / 2 + b),
                    0 === w && 0 !== n && (y = y - r / 2 - b),
                    0 === n && (y = y - r / 2 - b),
                    Math.abs(y) < 0.001 && (y = 0),
                    i.roundLengths && (y = Math.floor(y)),
                    S % i.slidesPerGroup == 0 && p.push(y),
                    h.push(y))
                  : (i.roundLengths && (y = Math.floor(y)),
                    (S - Math.min(t.params.slidesPerGroupSkip, S)) %
                      t.params.slidesPerGroup ==
                      0 && p.push(y),
                    h.push(y),
                    (y = y + x + b)),
                (t.virtualSize += x + b),
                (w = x),
                (S += 1);
            }
          }
          if (
            ((t.virtualSize = Math.max(t.virtualSize, r) + g),
            a &&
              o &&
              ("slide" === i.effect || "coverflow" === i.effect) &&
              n.css({ width: `${t.virtualSize + i.spaceBetween}px` }),
            i.setWrapperSize &&
              n.css({ [e("width")]: `${t.virtualSize + i.spaceBetween}px` }),
            C && t.grid.updateWrapperSize(x, p, e),
            !i.centeredSlides)
          ) {
            const e = [];
            for (let s = 0; s < p.length; s += 1) {
              let n = p[s];
              i.roundLengths && (n = Math.floor(n)),
                p[s] <= t.virtualSize - r && e.push(n);
            }
            (p = e),
              Math.floor(t.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
                p.push(t.virtualSize - r);
          }
          if ((0 === p.length && (p = [0]), 0 !== i.spaceBetween)) {
            const s = t.isHorizontal() && a ? "marginLeft" : e("marginRight");
            d.filter((t, e) => !i.cssMode || e !== d.length - 1).css({
              [s]: `${b}px`,
            });
          }
          if (i.centeredSlides && i.centeredSlidesBounds) {
            let t = 0;
            m.forEach((e) => {
              t += e + (i.spaceBetween ? i.spaceBetween : 0);
            }),
              (t -= i.spaceBetween);
            const e = t - r;
            p = p.map((t) => (t < 0 ? -f : t > e ? e + g : t));
          }
          if (i.centerInsufficientSlides) {
            let t = 0;
            if (
              (m.forEach((e) => {
                t += e + (i.spaceBetween ? i.spaceBetween : 0);
              }),
              (t -= i.spaceBetween),
              t < r)
            ) {
              const e = (r - t) / 2;
              p.forEach((t, s) => {
                p[s] = t - e;
              }),
                h.forEach((t, s) => {
                  h[s] = t + e;
                });
            }
          }
          if (
            (Object.assign(t, {
              slides: d,
              snapGrid: p,
              slidesGrid: h,
              slidesSizesGrid: m,
            }),
            i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
          ) {
            q(t.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
              q(
                t.wrapperEl,
                "--swiper-centered-offset-after",
                t.size / 2 - m[m.length - 1] / 2 + "px"
              );
            const e = -t.snapGrid[0],
              s = -t.slidesGrid[0];
            (t.snapGrid = t.snapGrid.map((t) => t + e)),
              (t.slidesGrid = t.slidesGrid.map((t) => t + s));
          }
          if (
            (u !== c && t.emit("slidesLengthChange"),
            p.length !== v &&
              (t.params.watchOverflow && t.checkOverflow(),
              t.emit("snapGridLengthChange")),
            h.length !== _ && t.emit("slidesGridLengthChange"),
            i.watchSlidesProgress && t.updateSlidesOffset(),
            !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
          ) {
            const e = `${i.containerModifierClass}backface-hidden`,
              s = t.$el.hasClass(e);
            u <= i.maxBackfaceHiddenSlides
              ? s || t.$el.addClass(e)
              : s && t.$el.removeClass(e);
          }
        },
        updateAutoHeight: function (t) {
          const e = this,
            s = [],
            i = e.virtual && e.params.virtual.enabled;
          let n,
            r = 0;
          "number" == typeof t
            ? e.setTransition(t)
            : !0 === t && e.setTransition(e.params.speed);
          const a = (t) =>
            i
              ? e.slides.filter(
                  (e) =>
                    parseInt(e.getAttribute("data-swiper-slide-index"), 10) ===
                    t
                )[0]
              : e.slides.eq(t)[0];
          if ("auto" !== e.params.slidesPerView && e.params.slidesPerView > 1)
            if (e.params.centeredSlides)
              (e.visibleSlides || k([])).each((t) => {
                s.push(t);
              });
            else
              for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
                const t = e.activeIndex + n;
                if (t > e.slides.length && !i) break;
                s.push(a(t));
              }
          else s.push(a(e.activeIndex));
          for (n = 0; n < s.length; n += 1)
            if (void 0 !== s[n]) {
              const t = s[n].offsetHeight;
              r = t > r ? t : r;
            }
          (r || 0 === r) && e.$wrapperEl.css("height", `${r}px`);
        },
        updateSlidesOffset: function () {
          const t = this,
            e = t.slides;
          for (let s = 0; s < e.length; s += 1)
            e[s].swiperSlideOffset = t.isHorizontal()
              ? e[s].offsetLeft
              : e[s].offsetTop;
        },
        updateSlidesProgress: function (t) {
          void 0 === t && (t = (this && this.translate) || 0);
          const e = this,
            s = e.params,
            { slides: i, rtlTranslate: n, snapGrid: r } = e;
          if (0 === i.length) return;
          void 0 === i[0].swiperSlideOffset && e.updateSlidesOffset();
          let a = -t;
          n && (a = t),
            i.removeClass(s.slideVisibleClass),
            (e.visibleSlidesIndexes = []),
            (e.visibleSlides = []);
          for (let t = 0; t < i.length; t += 1) {
            const o = i[t];
            let l = o.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
            const c =
                (a + (s.centeredSlides ? e.minTranslate() : 0) - l) /
                (o.swiperSlideSize + s.spaceBetween),
              d =
                (a - r[0] + (s.centeredSlides ? e.minTranslate() : 0) - l) /
                (o.swiperSlideSize + s.spaceBetween),
              u = -(a - l),
              p = u + e.slidesSizesGrid[t];
            ((u >= 0 && u < e.size - 1) ||
              (p > 1 && p <= e.size) ||
              (u <= 0 && p >= e.size)) &&
              (e.visibleSlides.push(o),
              e.visibleSlidesIndexes.push(t),
              i.eq(t).addClass(s.slideVisibleClass)),
              (o.progress = n ? -c : c),
              (o.originalProgress = n ? -d : d);
          }
          e.visibleSlides = k(e.visibleSlides);
        },
        updateProgress: function (t) {
          const e = this;
          if (void 0 === t) {
            const s = e.rtlTranslate ? -1 : 1;
            t = (e && e.translate && e.translate * s) || 0;
          }
          const s = e.params,
            i = e.maxTranslate() - e.minTranslate();
          let { progress: n, isBeginning: r, isEnd: a } = e;
          const o = r,
            l = a;
          0 === i
            ? ((n = 0), (r = !0), (a = !0))
            : ((n = (t - e.minTranslate()) / i), (r = n <= 0), (a = n >= 1)),
            Object.assign(e, { progress: n, isBeginning: r, isEnd: a }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
              e.updateSlidesProgress(t),
            r && !o && e.emit("reachBeginning toEdge"),
            a && !l && e.emit("reachEnd toEdge"),
            ((o && !r) || (l && !a)) && e.emit("fromEdge"),
            e.emit("progress", n);
        },
        updateSlidesClasses: function () {
          const t = this,
            {
              slides: e,
              params: s,
              $wrapperEl: i,
              activeIndex: n,
              realIndex: r,
            } = t,
            a = t.virtual && s.virtual.enabled;
          let o;
          e.removeClass(
            `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
          ),
            (o = a
              ? t.$wrapperEl.find(
                  `.${s.slideClass}[data-swiper-slide-index="${n}"]`
                )
              : e.eq(n)),
            o.addClass(s.slideActiveClass),
            s.loop &&
              (o.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass)
                : i
                    .children(
                      `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass));
          let l = o
            .nextAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slideNextClass);
          s.loop &&
            0 === l.length &&
            ((l = e.eq(0)), l.addClass(s.slideNextClass));
          let c = o
            .prevAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slidePrevClass);
          s.loop &&
            0 === c.length &&
            ((c = e.eq(-1)), c.addClass(s.slidePrevClass)),
            s.loop &&
              (l.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass)
                : i
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass),
              c.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${c.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)
                : i
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${c.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)),
            t.emitSlidesClasses();
        },
        updateActiveIndex: function (t) {
          const e = this,
            s = e.rtlTranslate ? e.translate : -e.translate,
            {
              slidesGrid: i,
              snapGrid: n,
              params: r,
              activeIndex: a,
              realIndex: o,
              snapIndex: l,
            } = e;
          let c,
            d = t;
          if (void 0 === d) {
            for (let t = 0; t < i.length; t += 1)
              void 0 !== i[t + 1]
                ? s >= i[t] && s < i[t + 1] - (i[t + 1] - i[t]) / 2
                  ? (d = t)
                  : s >= i[t] && s < i[t + 1] && (d = t + 1)
                : s >= i[t] && (d = t);
            r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
          }
          if (n.indexOf(s) >= 0) c = n.indexOf(s);
          else {
            const t = Math.min(r.slidesPerGroupSkip, d);
            c = t + Math.floor((d - t) / r.slidesPerGroup);
          }
          if ((c >= n.length && (c = n.length - 1), d === a))
            return void (
              c !== l && ((e.snapIndex = c), e.emit("snapIndexChange"))
            );
          const u = parseInt(
            e.slides.eq(d).attr("data-swiper-slide-index") || d,
            10
          );
          Object.assign(e, {
            snapIndex: c,
            realIndex: u,
            previousIndex: a,
            activeIndex: d,
          }),
            e.emit("activeIndexChange"),
            e.emit("snapIndexChange"),
            o !== u && e.emit("realIndexChange"),
            (e.initialized || e.params.runCallbacksOnInit) &&
              e.emit("slideChange");
        },
        updateClickedSlide: function (t) {
          const e = this,
            s = e.params,
            i = k(t).closest(`.${s.slideClass}`)[0];
          let n,
            r = !1;
          if (i)
            for (let t = 0; t < e.slides.length; t += 1)
              if (e.slides[t] === i) {
                (r = !0), (n = t);
                break;
              }
          if (!i || !r)
            return (e.clickedSlide = void 0), void (e.clickedIndex = void 0);
          (e.clickedSlide = i),
            e.virtual && e.params.virtual.enabled
              ? (e.clickedIndex = parseInt(
                  k(i).attr("data-swiper-slide-index"),
                  10
                ))
              : (e.clickedIndex = n),
            s.slideToClickedSlide &&
              void 0 !== e.clickedIndex &&
              e.clickedIndex !== e.activeIndex &&
              e.slideToClickedSlide();
        },
      };
      const X = {
        getTranslate: function (t) {
          void 0 === t && (t = this.isHorizontal() ? "x" : "y");
          const {
            params: e,
            rtlTranslate: s,
            translate: i,
            $wrapperEl: n,
          } = this;
          if (e.virtualTranslate) return s ? -i : i;
          if (e.cssMode) return i;
          let r = $(n[0], t);
          return s && (r = -r), r || 0;
        },
        setTranslate: function (t, e) {
          const s = this,
            {
              rtlTranslate: i,
              params: n,
              $wrapperEl: r,
              wrapperEl: a,
              progress: o,
            } = s;
          let l,
            c = 0,
            d = 0;
          s.isHorizontal() ? (c = i ? -t : t) : (d = t),
            n.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
            n.cssMode
              ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  s.isHorizontal() ? -c : -d)
              : n.virtualTranslate ||
                r.transform(`translate3d(${c}px, ${d}px, 0px)`),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? c : d);
          const u = s.maxTranslate() - s.minTranslate();
          (l = 0 === u ? 0 : (t - s.minTranslate()) / u),
            l !== o && s.updateProgress(t),
            s.emit("setTranslate", s.translate, e);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (t, e, s, i, n) {
          void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === i && (i = !0);
          const r = this,
            { params: a, wrapperEl: o } = r;
          if (r.animating && a.preventInteractionOnTransition) return !1;
          const l = r.minTranslate(),
            c = r.maxTranslate();
          let d;
          if (
            ((d = i && t > l ? l : i && t < c ? c : t),
            r.updateProgress(d),
            a.cssMode)
          ) {
            const t = r.isHorizontal();
            if (0 === e) o[t ? "scrollLeft" : "scrollTop"] = -d;
            else {
              if (!r.support.smoothScroll)
                return (
                  B({
                    swiper: r,
                    targetPosition: -d,
                    side: t ? "left" : "top",
                  }),
                  !0
                );
              o.scrollTo({ [t ? "left" : "top"]: -d, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === e
              ? (r.setTransition(0),
                r.setTranslate(d),
                s &&
                  (r.emit("beforeTransitionStart", e, n),
                  r.emit("transitionEnd")))
              : (r.setTransition(e),
                r.setTranslate(d),
                s &&
                  (r.emit("beforeTransitionStart", e, n),
                  r.emit("transitionStart")),
                r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                    (r.onTranslateToWrapperTransitionEnd = function (t) {
                      r &&
                        !r.destroyed &&
                        t.target === this &&
                        (r.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        r.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        (r.onTranslateToWrapperTransitionEnd = null),
                        delete r.onTranslateToWrapperTransitionEnd,
                        s && r.emit("transitionEnd"));
                    }),
                  r.$wrapperEl[0].addEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    r.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      };
      function U(t) {
        let { swiper: e, runCallbacks: s, direction: i, step: n } = t;
        const { activeIndex: r, previousIndex: a } = e;
        let o = i;
        if (
          (o || (o = r > a ? "next" : r < a ? "prev" : "reset"),
          e.emit(`transition${n}`),
          s && r !== a)
        ) {
          if ("reset" === o) return void e.emit(`slideResetTransition${n}`);
          e.emit(`slideChangeTransition${n}`),
            "next" === o
              ? e.emit(`slideNextTransition${n}`)
              : e.emit(`slidePrevTransition${n}`);
        }
      }
      const Y = {
        slideTo: function (t, e, s, i, n) {
          if (
            (void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === s && (s = !0),
            "number" != typeof t && "string" != typeof t)
          )
            throw new Error(
              `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof t}] given.`
            );
          if ("string" == typeof t) {
            const e = parseInt(t, 10);
            if (!isFinite(e))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`
              );
            t = e;
          }
          const r = this;
          let a = t;
          a < 0 && (a = 0);
          const {
            params: o,
            snapGrid: l,
            slidesGrid: c,
            previousIndex: d,
            activeIndex: u,
            rtlTranslate: p,
            wrapperEl: h,
            enabled: m,
          } = r;
          if (
            (r.animating && o.preventInteractionOnTransition) ||
            (!m && !i && !n)
          )
            return !1;
          const f = Math.min(r.params.slidesPerGroupSkip, a);
          let g = f + Math.floor((a - f) / r.params.slidesPerGroup);
          g >= l.length && (g = l.length - 1),
            (u || o.initialSlide || 0) === (d || 0) &&
              s &&
              r.emit("beforeSlideChangeStart");
          const v = -l[g];
          if ((r.updateProgress(v), o.normalizeSlideIndex))
            for (let t = 0; t < c.length; t += 1) {
              const e = -Math.floor(100 * v),
                s = Math.floor(100 * c[t]),
                i = Math.floor(100 * c[t + 1]);
              void 0 !== c[t + 1]
                ? e >= s && e < i - (i - s) / 2
                  ? (a = t)
                  : e >= s && e < i && (a = t + 1)
                : e >= s && (a = t);
            }
          if (r.initialized && a !== u) {
            if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
              return !1;
            if (
              !r.allowSlidePrev &&
              v > r.translate &&
              v > r.maxTranslate() &&
              (u || 0) !== a
            )
              return !1;
          }
          let _;
          if (
            ((_ = a > u ? "next" : a < u ? "prev" : "reset"),
            (p && -v === r.translate) || (!p && v === r.translate))
          )
            return (
              r.updateActiveIndex(a),
              o.autoHeight && r.updateAutoHeight(),
              r.updateSlidesClasses(),
              "slide" !== o.effect && r.setTranslate(v),
              "reset" !== _ && (r.transitionStart(s, _), r.transitionEnd(s, _)),
              !1
            );
          if (o.cssMode) {
            const t = r.isHorizontal(),
              s = p ? v : -v;
            if (0 === e) {
              const e = r.virtual && r.params.virtual.enabled;
              e &&
                ((r.wrapperEl.style.scrollSnapType = "none"),
                (r._immediateVirtual = !0)),
                (h[t ? "scrollLeft" : "scrollTop"] = s),
                e &&
                  requestAnimationFrame(() => {
                    (r.wrapperEl.style.scrollSnapType = ""),
                      (r._swiperImmediateVirtual = !1);
                  });
            } else {
              if (!r.support.smoothScroll)
                return (
                  B({ swiper: r, targetPosition: s, side: t ? "left" : "top" }),
                  !0
                );
              h.scrollTo({ [t ? "left" : "top"]: s, behavior: "smooth" });
            }
            return !0;
          }
          return (
            r.setTransition(e),
            r.setTranslate(v),
            r.updateActiveIndex(a),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", e, i),
            r.transitionStart(s, _),
            0 === e
              ? r.transitionEnd(s, _)
              : r.animating ||
                ((r.animating = !0),
                r.onSlideToWrapperTransitionEnd ||
                  (r.onSlideToWrapperTransitionEnd = function (t) {
                    r &&
                      !r.destroyed &&
                      t.target === this &&
                      (r.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      (r.onSlideToWrapperTransitionEnd = null),
                      delete r.onSlideToWrapperTransitionEnd,
                      r.transitionEnd(s, _));
                  }),
                r.$wrapperEl[0].addEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                r.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  r.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (t, e, s, i) {
          if (
            (void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === s && (s = !0),
            "string" == typeof t)
          ) {
            const e = parseInt(t, 10);
            if (!isFinite(e))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`
              );
            t = e;
          }
          const n = this;
          let r = t;
          return n.params.loop && (r += n.loopedSlides), n.slideTo(r, e, s, i);
        },
        slideNext: function (t, e, s) {
          void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
          const i = this,
            { animating: n, enabled: r, params: a } = i;
          if (!r) return i;
          let o = a.slidesPerGroup;
          "auto" === a.slidesPerView &&
            1 === a.slidesPerGroup &&
            a.slidesPerGroupAuto &&
            (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
          const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
          if (a.loop) {
            if (n && a.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          return a.rewind && i.isEnd
            ? i.slideTo(0, t, e, s)
            : i.slideTo(i.activeIndex + l, t, e, s);
        },
        slidePrev: function (t, e, s) {
          void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
          const i = this,
            {
              params: n,
              animating: r,
              snapGrid: a,
              slidesGrid: o,
              rtlTranslate: l,
              enabled: c,
            } = i;
          if (!c) return i;
          if (n.loop) {
            if (r && n.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          function d(t) {
            return t < 0 ? -Math.floor(Math.abs(t)) : Math.floor(t);
          }
          const u = d(l ? i.translate : -i.translate),
            p = a.map((t) => d(t));
          let h = a[p.indexOf(u) - 1];
          if (void 0 === h && n.cssMode) {
            let t;
            a.forEach((e, s) => {
              u >= e && (t = s);
            }),
              void 0 !== t && (h = a[t > 0 ? t - 1 : t]);
          }
          let m = 0;
          if (
            (void 0 !== h &&
              ((m = o.indexOf(h)),
              m < 0 && (m = i.activeIndex - 1),
              "auto" === n.slidesPerView &&
                1 === n.slidesPerGroup &&
                n.slidesPerGroupAuto &&
                ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
                (m = Math.max(m, 0)))),
            n.rewind && i.isBeginning)
          ) {
            const n =
              i.params.virtual && i.params.virtual.enabled && i.virtual
                ? i.virtual.slides.length - 1
                : i.slides.length - 1;
            return i.slideTo(n, t, e, s);
          }
          return i.slideTo(m, t, e, s);
        },
        slideReset: function (t, e, s) {
          return (
            void 0 === t && (t = this.params.speed),
            void 0 === e && (e = !0),
            this.slideTo(this.activeIndex, t, e, s)
          );
        },
        slideToClosest: function (t, e, s, i) {
          void 0 === t && (t = this.params.speed),
            void 0 === e && (e = !0),
            void 0 === i && (i = 0.5);
          const n = this;
          let r = n.activeIndex;
          const a = Math.min(n.params.slidesPerGroupSkip, r),
            o = a + Math.floor((r - a) / n.params.slidesPerGroup),
            l = n.rtlTranslate ? n.translate : -n.translate;
          if (l >= n.snapGrid[o]) {
            const t = n.snapGrid[o];
            l - t > (n.snapGrid[o + 1] - t) * i &&
              (r += n.params.slidesPerGroup);
          } else {
            const t = n.snapGrid[o - 1];
            l - t <= (n.snapGrid[o] - t) * i && (r -= n.params.slidesPerGroup);
          }
          return (
            (r = Math.max(r, 0)),
            (r = Math.min(r, n.slidesGrid.length - 1)),
            n.slideTo(r, t, e, s)
          );
        },
        slideToClickedSlide: function () {
          const t = this,
            { params: e, $wrapperEl: s } = t,
            i =
              "auto" === e.slidesPerView
                ? t.slidesPerViewDynamic()
                : e.slidesPerView;
          let n,
            r = t.clickedIndex;
          if (e.loop) {
            if (t.animating) return;
            (n = parseInt(
              k(t.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              e.centeredSlides
                ? r < t.loopedSlides - i / 2 ||
                  r > t.slides.length - t.loopedSlides + i / 2
                  ? (t.loopFix(),
                    (r = s
                      .children(
                        `.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    M(() => {
                      t.slideTo(r);
                    }))
                  : t.slideTo(r)
                : r > t.slides.length - i
                ? (t.loopFix(),
                  (r = s
                    .children(
                      `.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  M(() => {
                    t.slideTo(r);
                  }))
                : t.slideTo(r);
          } else t.slideTo(r);
        },
      };
      const Q = {
        loopCreate: function () {
          const t = this,
            e = y(),
            { params: s, $wrapperEl: i } = t,
            n = i.children().length > 0 ? k(i.children()[0].parentNode) : i;
          n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
          let r = n.children(`.${s.slideClass}`);
          if (s.loopFillGroupWithBlank) {
            const t = s.slidesPerGroup - (r.length % s.slidesPerGroup);
            if (t !== s.slidesPerGroup) {
              for (let i = 0; i < t; i += 1) {
                const t = k(e.createElement("div")).addClass(
                  `${s.slideClass} ${s.slideBlankClass}`
                );
                n.append(t);
              }
              r = n.children(`.${s.slideClass}`);
            }
          }
          "auto" !== s.slidesPerView ||
            s.loopedSlides ||
            (s.loopedSlides = r.length),
            (t.loopedSlides = Math.ceil(
              parseFloat(s.loopedSlides || s.slidesPerView, 10)
            )),
            (t.loopedSlides += s.loopAdditionalSlides),
            t.loopedSlides > r.length && (t.loopedSlides = r.length);
          const a = [],
            o = [];
          r.each((e, s) => {
            const i = k(e);
            s < t.loopedSlides && o.push(e),
              s < r.length && s >= r.length - t.loopedSlides && a.push(e),
              i.attr("data-swiper-slide-index", s);
          });
          for (let t = 0; t < o.length; t += 1)
            n.append(k(o[t].cloneNode(!0)).addClass(s.slideDuplicateClass));
          for (let t = a.length - 1; t >= 0; t -= 1)
            n.prepend(k(a[t].cloneNode(!0)).addClass(s.slideDuplicateClass));
        },
        loopFix: function () {
          const t = this;
          t.emit("beforeLoopFix");
          const {
            activeIndex: e,
            slides: s,
            loopedSlides: i,
            allowSlidePrev: n,
            allowSlideNext: r,
            snapGrid: a,
            rtlTranslate: o,
          } = t;
          let l;
          (t.allowSlidePrev = !0), (t.allowSlideNext = !0);
          const c = -a[e] - t.getTranslate();
          if (e < i) {
            (l = s.length - 3 * i + e), (l += i);
            t.slideTo(l, 0, !1, !0) &&
              0 !== c &&
              t.setTranslate((o ? -t.translate : t.translate) - c);
          } else if (e >= s.length - i) {
            (l = -s.length + e + i), (l += i);
            t.slideTo(l, 0, !1, !0) &&
              0 !== c &&
              t.setTranslate((o ? -t.translate : t.translate) - c);
          }
          (t.allowSlidePrev = n), (t.allowSlideNext = r), t.emit("loopFix");
        },
        loopDestroy: function () {
          const { $wrapperEl: t, params: e, slides: s } = this;
          t
            .children(
              `.${e.slideClass}.${e.slideDuplicateClass},.${e.slideClass}.${e.slideBlankClass}`
            )
            .remove(),
            s.removeAttr("data-swiper-slide-index");
        },
      };
      function K(t) {
        const e = this,
          s = y(),
          i = S(),
          n = e.touchEventsData,
          { params: r, touches: a, enabled: o } = e;
        if (!o) return;
        if (e.animating && r.preventInteractionOnTransition) return;
        !e.animating && r.cssMode && r.loop && e.loopFix();
        let l = t;
        l.originalEvent && (l = l.originalEvent);
        let c = k(l.target);
        if ("wrapper" === r.touchEventsTarget && !c.closest(e.wrapperEl).length)
          return;
        if (
          ((n.isTouchEvent = "touchstart" === l.type),
          !n.isTouchEvent && "which" in l && 3 === l.which)
        )
          return;
        if (!n.isTouchEvent && "button" in l && l.button > 0) return;
        if (n.isTouched && n.isMoved) return;
        !!r.noSwipingClass &&
          "" !== r.noSwipingClass &&
          l.target &&
          l.target.shadowRoot &&
          t.path &&
          t.path[0] &&
          (c = k(t.path[0]));
        const d = r.noSwipingSelector
            ? r.noSwipingSelector
            : `.${r.noSwipingClass}`,
          u = !(!l.target || !l.target.shadowRoot);
        if (
          r.noSwiping &&
          (u
            ? (function (t, e) {
                return (
                  void 0 === e && (e = this),
                  (function e(s) {
                    if (!s || s === y() || s === S()) return null;
                    s.assignedSlot && (s = s.assignedSlot);
                    const i = s.closest(t);
                    return i || s.getRootNode
                      ? i || e(s.getRootNode().host)
                      : null;
                  })(e)
                );
              })(d, c[0])
            : c.closest(d)[0])
        )
          return void (e.allowClick = !0);
        if (r.swipeHandler && !c.closest(r.swipeHandler)[0]) return;
        (a.currentX =
          "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
          (a.currentY =
            "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
        const p = a.currentX,
          h = a.currentY,
          m = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
          f = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
        if (m && (p <= f || p >= i.innerWidth - f)) {
          if ("prevent" !== m) return;
          t.preventDefault();
        }
        if (
          (Object.assign(n, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
          (a.startX = p),
          (a.startY = h),
          (n.touchStartTime = P()),
          (e.allowClick = !0),
          e.updateSize(),
          (e.swipeDirection = void 0),
          r.threshold > 0 && (n.allowThresholdMove = !1),
          "touchstart" !== l.type)
        ) {
          let t = !0;
          c.is(n.focusableElements) &&
            ((t = !1), "SELECT" === c[0].nodeName && (n.isTouched = !1)),
            s.activeElement &&
              k(s.activeElement).is(n.focusableElements) &&
              s.activeElement !== c[0] &&
              s.activeElement.blur();
          const i = t && e.allowTouchMove && r.touchStartPreventDefault;
          (!r.touchStartForcePreventDefault && !i) ||
            c[0].isContentEditable ||
            l.preventDefault();
        }
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          e.freeMode &&
          e.animating &&
          !r.cssMode &&
          e.freeMode.onTouchStart(),
          e.emit("touchStart", l);
      }
      function Z(t) {
        const e = y(),
          s = this,
          i = s.touchEventsData,
          { params: n, touches: r, rtlTranslate: a, enabled: o } = s;
        if (!o) return;
        let l = t;
        if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
          return void (
            i.startMoving &&
            i.isScrolling &&
            s.emit("touchMoveOpposite", l)
          );
        if (i.isTouchEvent && "touchmove" !== l.type) return;
        const c =
            "touchmove" === l.type &&
            l.targetTouches &&
            (l.targetTouches[0] || l.changedTouches[0]),
          d = "touchmove" === l.type ? c.pageX : l.pageX,
          u = "touchmove" === l.type ? c.pageY : l.pageY;
        if (l.preventedByNestedSwiper)
          return (r.startX = d), void (r.startY = u);
        if (!s.allowTouchMove)
          return (
            k(l.target).is(i.focusableElements) || (s.allowClick = !1),
            void (
              i.isTouched &&
              (Object.assign(r, {
                startX: d,
                startY: u,
                currentX: d,
                currentY: u,
              }),
              (i.touchStartTime = P()))
            )
          );
        if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
          if (s.isVertical()) {
            if (
              (u < r.startY && s.translate <= s.maxTranslate()) ||
              (u > r.startY && s.translate >= s.minTranslate())
            )
              return (i.isTouched = !1), void (i.isMoved = !1);
          } else if (
            (d < r.startX && s.translate <= s.maxTranslate()) ||
            (d > r.startX && s.translate >= s.minTranslate())
          )
            return;
        if (
          i.isTouchEvent &&
          e.activeElement &&
          l.target === e.activeElement &&
          k(l.target).is(i.focusableElements)
        )
          return (i.isMoved = !0), void (s.allowClick = !1);
        if (
          (i.allowTouchCallbacks && s.emit("touchMove", l),
          l.targetTouches && l.targetTouches.length > 1)
        )
          return;
        (r.currentX = d), (r.currentY = u);
        const p = r.currentX - r.startX,
          h = r.currentY - r.startY;
        if (
          s.params.threshold &&
          Math.sqrt(p ** 2 + h ** 2) < s.params.threshold
        )
          return;
        if (void 0 === i.isScrolling) {
          let t;
          (s.isHorizontal() && r.currentY === r.startY) ||
          (s.isVertical() && r.currentX === r.startX)
            ? (i.isScrolling = !1)
            : p * p + h * h >= 25 &&
              ((t = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
              (i.isScrolling = s.isHorizontal()
                ? t > n.touchAngle
                : 90 - t > n.touchAngle));
        }
        if (
          (i.isScrolling && s.emit("touchMoveOpposite", l),
          void 0 === i.startMoving &&
            ((r.currentX === r.startX && r.currentY === r.startY) ||
              (i.startMoving = !0)),
          i.isScrolling)
        )
          return void (i.isTouched = !1);
        if (!i.startMoving) return;
        (s.allowClick = !1),
          !n.cssMode && l.cancelable && l.preventDefault(),
          n.touchMoveStopPropagation && !n.nested && l.stopPropagation(),
          i.isMoved ||
            (n.loop && !n.cssMode && s.loopFix(),
            (i.startTranslate = s.getTranslate()),
            s.setTransition(0),
            s.animating &&
              s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (i.allowMomentumBounce = !1),
            !n.grabCursor ||
              (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
              s.setGrabCursor(!0),
            s.emit("sliderFirstMove", l)),
          s.emit("sliderMove", l),
          (i.isMoved = !0);
        let m = s.isHorizontal() ? p : h;
        (r.diff = m),
          (m *= n.touchRatio),
          a && (m = -m),
          (s.swipeDirection = m > 0 ? "prev" : "next"),
          (i.currentTranslate = m + i.startTranslate);
        let f = !0,
          g = n.resistanceRatio;
        if (
          (n.touchReleaseOnEdges && (g = 0),
          m > 0 && i.currentTranslate > s.minTranslate()
            ? ((f = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + m) ** g))
            : m < 0 &&
              i.currentTranslate < s.maxTranslate() &&
              ((f = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - m) ** g)),
          f && (l.preventedByNestedSwiper = !0),
          !s.allowSlideNext &&
            "next" === s.swipeDirection &&
            i.currentTranslate < i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          !s.allowSlidePrev &&
            "prev" === s.swipeDirection &&
            i.currentTranslate > i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          s.allowSlidePrev ||
            s.allowSlideNext ||
            (i.currentTranslate = i.startTranslate),
          n.threshold > 0)
        ) {
          if (!(Math.abs(m) > n.threshold || i.allowThresholdMove))
            return void (i.currentTranslate = i.startTranslate);
          if (!i.allowThresholdMove)
            return (
              (i.allowThresholdMove = !0),
              (r.startX = r.currentX),
              (r.startY = r.currentY),
              (i.currentTranslate = i.startTranslate),
              void (r.diff = s.isHorizontal()
                ? r.currentX - r.startX
                : r.currentY - r.startY)
            );
        }
        n.followFinger &&
          !n.cssMode &&
          (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
            n.watchSlidesProgress) &&
            (s.updateActiveIndex(), s.updateSlidesClasses()),
          s.params.freeMode &&
            n.freeMode.enabled &&
            s.freeMode &&
            s.freeMode.onTouchMove(),
          s.updateProgress(i.currentTranslate),
          s.setTranslate(i.currentTranslate));
      }
      function J(t) {
        const e = this,
          s = e.touchEventsData,
          {
            params: i,
            touches: n,
            rtlTranslate: r,
            slidesGrid: a,
            enabled: o,
          } = e;
        if (!o) return;
        let l = t;
        if (
          (l.originalEvent && (l = l.originalEvent),
          s.allowTouchCallbacks && e.emit("touchEnd", l),
          (s.allowTouchCallbacks = !1),
          !s.isTouched)
        )
          return (
            s.isMoved && i.grabCursor && e.setGrabCursor(!1),
            (s.isMoved = !1),
            void (s.startMoving = !1)
          );
        i.grabCursor &&
          s.isMoved &&
          s.isTouched &&
          (!0 === e.allowSlideNext || !0 === e.allowSlidePrev) &&
          e.setGrabCursor(!1);
        const c = P(),
          d = c - s.touchStartTime;
        if (e.allowClick) {
          const t = l.path || (l.composedPath && l.composedPath());
          e.updateClickedSlide((t && t[0]) || l.target),
            e.emit("tap click", l),
            d < 300 &&
              c - s.lastClickTime < 300 &&
              e.emit("doubleTap doubleClick", l);
        }
        if (
          ((s.lastClickTime = P()),
          M(() => {
            e.destroyed || (e.allowClick = !0);
          }),
          !s.isTouched ||
            !s.isMoved ||
            !e.swipeDirection ||
            0 === n.diff ||
            s.currentTranslate === s.startTranslate)
        )
          return (
            (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
          );
        let u;
        if (
          ((s.isTouched = !1),
          (s.isMoved = !1),
          (s.startMoving = !1),
          (u = i.followFinger
            ? r
              ? e.translate
              : -e.translate
            : -s.currentTranslate),
          i.cssMode)
        )
          return;
        if (e.params.freeMode && i.freeMode.enabled)
          return void e.freeMode.onTouchEnd({ currentPos: u });
        let p = 0,
          h = e.slidesSizesGrid[0];
        for (
          let t = 0;
          t < a.length;
          t += t < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
        ) {
          const e = t < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
          void 0 !== a[t + e]
            ? u >= a[t] && u < a[t + e] && ((p = t), (h = a[t + e] - a[t]))
            : u >= a[t] && ((p = t), (h = a[a.length - 1] - a[a.length - 2]));
        }
        let m = null,
          f = null;
        i.rewind &&
          (e.isBeginning
            ? (f =
                e.params.virtual && e.params.virtual.enabled && e.virtual
                  ? e.virtual.slides.length - 1
                  : e.slides.length - 1)
            : e.isEnd && (m = 0));
        const g = (u - a[p]) / h,
          v = p < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (d > i.longSwipesMs) {
          if (!i.longSwipes) return void e.slideTo(e.activeIndex);
          "next" === e.swipeDirection &&
            (g >= i.longSwipesRatio
              ? e.slideTo(i.rewind && e.isEnd ? m : p + v)
              : e.slideTo(p)),
            "prev" === e.swipeDirection &&
              (g > 1 - i.longSwipesRatio
                ? e.slideTo(p + v)
                : null !== f && g < 0 && Math.abs(g) > i.longSwipesRatio
                ? e.slideTo(f)
                : e.slideTo(p));
        } else {
          if (!i.shortSwipes) return void e.slideTo(e.activeIndex);
          e.navigation &&
          (l.target === e.navigation.nextEl || l.target === e.navigation.prevEl)
            ? l.target === e.navigation.nextEl
              ? e.slideTo(p + v)
              : e.slideTo(p)
            : ("next" === e.swipeDirection && e.slideTo(null !== m ? m : p + v),
              "prev" === e.swipeDirection && e.slideTo(null !== f ? f : p));
        }
      }
      function tt() {
        const t = this,
          { params: e, el: s } = t;
        if (s && 0 === s.offsetWidth) return;
        e.breakpoints && t.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = t;
        (t.allowSlideNext = !0),
          (t.allowSlidePrev = !0),
          t.updateSize(),
          t.updateSlides(),
          t.updateSlidesClasses(),
          ("auto" === e.slidesPerView || e.slidesPerView > 1) &&
          t.isEnd &&
          !t.isBeginning &&
          !t.params.centeredSlides
            ? t.slideTo(t.slides.length - 1, 0, !1, !0)
            : t.slideTo(t.activeIndex, 0, !1, !0),
          t.autoplay &&
            t.autoplay.running &&
            t.autoplay.paused &&
            t.autoplay.run(),
          (t.allowSlidePrev = n),
          (t.allowSlideNext = i),
          t.params.watchOverflow && r !== t.snapGrid && t.checkOverflow();
      }
      function et(t) {
        const e = this;
        e.enabled &&
          (e.allowClick ||
            (e.params.preventClicks && t.preventDefault(),
            e.params.preventClicksPropagation &&
              e.animating &&
              (t.stopPropagation(), t.stopImmediatePropagation())));
      }
      function st() {
        const t = this,
          { wrapperEl: e, rtlTranslate: s, enabled: i } = t;
        if (!i) return;
        let n;
        (t.previousTranslate = t.translate),
          t.isHorizontal()
            ? (t.translate = -e.scrollLeft)
            : (t.translate = -e.scrollTop),
          0 === t.translate && (t.translate = 0),
          t.updateActiveIndex(),
          t.updateSlidesClasses();
        const r = t.maxTranslate() - t.minTranslate();
        (n = 0 === r ? 0 : (t.translate - t.minTranslate()) / r),
          n !== t.progress && t.updateProgress(s ? -t.translate : t.translate),
          t.emit("setTranslate", t.translate, !1);
      }
      let it = !1;
      function nt() {}
      const rt = (t, e) => {
        const s = y(),
          {
            params: i,
            touchEvents: n,
            el: r,
            wrapperEl: a,
            device: o,
            support: l,
          } = t,
          c = !!i.nested,
          d = "on" === e ? "addEventListener" : "removeEventListener",
          u = e;
        if (l.touch) {
          const e = !(
            "touchstart" !== n.start ||
            !l.passiveListener ||
            !i.passiveListeners
          ) && { passive: !0, capture: !1 };
          r[d](n.start, t.onTouchStart, e),
            r[d](
              n.move,
              t.onTouchMove,
              l.passiveListener ? { passive: !1, capture: c } : c
            ),
            r[d](n.end, t.onTouchEnd, e),
            n.cancel && r[d](n.cancel, t.onTouchEnd, e);
        } else
          r[d](n.start, t.onTouchStart, !1),
            s[d](n.move, t.onTouchMove, c),
            s[d](n.end, t.onTouchEnd, !1);
        (i.preventClicks || i.preventClicksPropagation) &&
          r[d]("click", t.onClick, !0),
          i.cssMode && a[d]("scroll", t.onScroll),
          i.updateOnWindowResize
            ? t[u](
                o.ios || o.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                tt,
                !0
              )
            : t[u]("observerUpdate", tt, !0);
      };
      const at = {
          attachEvents: function () {
            const t = this,
              e = y(),
              { params: s, support: i } = t;
            (t.onTouchStart = K.bind(t)),
              (t.onTouchMove = Z.bind(t)),
              (t.onTouchEnd = J.bind(t)),
              s.cssMode && (t.onScroll = st.bind(t)),
              (t.onClick = et.bind(t)),
              i.touch &&
                !it &&
                (e.addEventListener("touchstart", nt), (it = !0)),
              rt(t, "on");
          },
          detachEvents: function () {
            rt(this, "off");
          },
        },
        ot = (t, e) => t.grid && e.grid && e.grid.rows > 1;
      const lt = {
        setBreakpoint: function () {
          const t = this,
            {
              activeIndex: e,
              initialized: s,
              loopedSlides: i = 0,
              params: n,
              $el: r,
            } = t,
            a = n.breakpoints;
          if (!a || (a && 0 === Object.keys(a).length)) return;
          const o = t.getBreakpoint(a, t.params.breakpointsBase, t.el);
          if (!o || t.currentBreakpoint === o) return;
          const l = (o in a ? a[o] : void 0) || t.originalParams,
            c = ot(t, n),
            d = ot(t, l),
            u = n.enabled;
          c && !d
            ? (r.removeClass(
                `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
              ),
              t.emitContainerClasses())
            : !c &&
              d &&
              (r.addClass(`${n.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === n.grid.fill)) &&
                r.addClass(`${n.containerModifierClass}grid-column`),
              t.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((e) => {
              const s = n[e] && n[e].enabled,
                i = l[e] && l[e].enabled;
              s && !i && t[e].disable(), !s && i && t[e].enable();
            });
          const p = l.direction && l.direction !== n.direction,
            h = n.loop && (l.slidesPerView !== n.slidesPerView || p);
          p && s && t.changeDirection(), z(t.params, l);
          const m = t.params.enabled;
          Object.assign(t, {
            allowTouchMove: t.params.allowTouchMove,
            allowSlideNext: t.params.allowSlideNext,
            allowSlidePrev: t.params.allowSlidePrev,
          }),
            u && !m ? t.disable() : !u && m && t.enable(),
            (t.currentBreakpoint = o),
            t.emit("_beforeBreakpoint", l),
            h &&
              s &&
              (t.loopDestroy(),
              t.loopCreate(),
              t.updateSlides(),
              t.slideTo(e - i + t.loopedSlides, 0, !1)),
            t.emit("breakpoint", l);
        },
        getBreakpoint: function (t, e, s) {
          if ((void 0 === e && (e = "window"), !t || ("container" === e && !s)))
            return;
          let i = !1;
          const n = S(),
            r = "window" === e ? n.innerHeight : s.clientHeight,
            a = Object.keys(t).map((t) => {
              if ("string" == typeof t && 0 === t.indexOf("@")) {
                const e = parseFloat(t.substr(1));
                return { value: r * e, point: t };
              }
              return { value: t, point: t };
            });
          a.sort((t, e) => parseInt(t.value, 10) - parseInt(e.value, 10));
          for (let t = 0; t < a.length; t += 1) {
            const { point: r, value: o } = a[t];
            "window" === e
              ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = r)
              : o <= s.clientWidth && (i = r);
          }
          return i || "max";
        },
      };
      const ct = {
        addClasses: function () {
          const t = this,
            {
              classNames: e,
              params: s,
              rtl: i,
              $el: n,
              device: r,
              support: a,
            } = t,
            o = (function (t, e) {
              const s = [];
              return (
                t.forEach((t) => {
                  "object" == typeof t
                    ? Object.keys(t).forEach((i) => {
                        t[i] && s.push(e + i);
                      })
                    : "string" == typeof t && s.push(e + t);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "pointer-events": !a.touch },
                { "free-mode": t.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass
            );
          e.push(...o), n.addClass([...e].join(" ")), t.emitContainerClasses();
        },
        removeClasses: function () {
          const { $el: t, classNames: e } = this;
          t.removeClass(e.join(" ")), this.emitContainerClasses();
        },
      };
      const dt = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements:
          "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      function ut(t, e) {
        return function (s) {
          void 0 === s && (s = {});
          const i = Object.keys(s)[0],
            n = s[i];
          "object" == typeof n && null !== n
            ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
                !0 === t[i] &&
                (t[i] = { auto: !0 }),
              i in t && "enabled" in n
                ? (!0 === t[i] && (t[i] = { enabled: !0 }),
                  "object" != typeof t[i] ||
                    "enabled" in t[i] ||
                    (t[i].enabled = !0),
                  t[i] || (t[i] = { enabled: !1 }),
                  z(e, s))
                : z(e, s))
            : z(e, s);
        };
      }
      const pt = {
          eventsEmitter: j,
          update: W,
          translate: X,
          transition: {
            setTransition: function (t, e) {
              const s = this;
              s.params.cssMode || s.$wrapperEl.transition(t),
                s.emit("setTransition", t, e);
            },
            transitionStart: function (t, e) {
              void 0 === t && (t = !0);
              const s = this,
                { params: i } = s;
              i.cssMode ||
                (i.autoHeight && s.updateAutoHeight(),
                U({ swiper: s, runCallbacks: t, direction: e, step: "Start" }));
            },
            transitionEnd: function (t, e) {
              void 0 === t && (t = !0);
              const s = this,
                { params: i } = s;
              (s.animating = !1),
                i.cssMode ||
                  (s.setTransition(0),
                  U({ swiper: s, runCallbacks: t, direction: e, step: "End" }));
            },
          },
          slide: Y,
          loop: Q,
          grabCursor: {
            setGrabCursor: function (t) {
              const e = this;
              if (
                e.support.touch ||
                !e.params.simulateTouch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode
              )
                return;
              const s =
                "container" === e.params.touchEventsTarget ? e.el : e.wrapperEl;
              (s.style.cursor = "move"),
                (s.style.cursor = t ? "grabbing" : "grab");
            },
            unsetGrabCursor: function () {
              const t = this;
              t.support.touch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode ||
                (t[
                  "container" === t.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = "");
            },
          },
          events: at,
          breakpoints: lt,
          checkOverflow: {
            checkOverflow: function () {
              const t = this,
                { isLocked: e, params: s } = t,
                { slidesOffsetBefore: i } = s;
              if (i) {
                const e = t.slides.length - 1,
                  s = t.slidesGrid[e] + t.slidesSizesGrid[e] + 2 * i;
                t.isLocked = t.size > s;
              } else t.isLocked = 1 === t.snapGrid.length;
              !0 === s.allowSlideNext && (t.allowSlideNext = !t.isLocked),
                !0 === s.allowSlidePrev && (t.allowSlidePrev = !t.isLocked),
                e && e !== t.isLocked && (t.isEnd = !1),
                e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
            },
          },
          classes: ct,
          images: {
            loadImage: function (t, e, s, i, n, r) {
              const a = S();
              let o;
              function l() {
                r && r();
              }
              k(t).parent("picture")[0] || (t.complete && n)
                ? l()
                : e
                ? ((o = new a.Image()),
                  (o.onload = l),
                  (o.onerror = l),
                  i && (o.sizes = i),
                  s && (o.srcset = s),
                  e && (o.src = e))
                : l();
            },
            preloadImages: function () {
              const t = this;
              function e() {
                null != t &&
                  t &&
                  !t.destroyed &&
                  (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1),
                  t.imagesLoaded === t.imagesToLoad.length &&
                    (t.params.updateOnImagesReady && t.update(),
                    t.emit("imagesReady")));
              }
              t.imagesToLoad = t.$el.find("img");
              for (let s = 0; s < t.imagesToLoad.length; s += 1) {
                const i = t.imagesToLoad[s];
                t.loadImage(
                  i,
                  i.currentSrc || i.getAttribute("src"),
                  i.srcset || i.getAttribute("srcset"),
                  i.sizes || i.getAttribute("sizes"),
                  !0,
                  e
                );
              }
            },
          },
        },
        ht = {};
      class mt {
        constructor() {
          let t, e;
          for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
            i[n] = arguments[n];
          if (
            (1 === i.length &&
            i[0].constructor &&
            "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
              ? (e = i[0])
              : ([t, e] = i),
            e || (e = {}),
            (e = z({}, e)),
            t && !e.el && (e.el = t),
            e.el && k(e.el).length > 1)
          ) {
            const t = [];
            return (
              k(e.el).each((s) => {
                const i = z({}, e, { el: s });
                t.push(new mt(i));
              }),
              t
            );
          }
          const r = this;
          (r.__swiper__ = !0),
            (r.support = G()),
            (r.device = V({ userAgent: e.userAgent })),
            (r.browser = R()),
            (r.eventsListeners = {}),
            (r.eventsAnyListeners = []),
            (r.modules = [...r.__modules__]),
            e.modules &&
              Array.isArray(e.modules) &&
              r.modules.push(...e.modules);
          const a = {};
          r.modules.forEach((t) => {
            t({
              swiper: r,
              extendParams: ut(e, a),
              on: r.on.bind(r),
              once: r.once.bind(r),
              off: r.off.bind(r),
              emit: r.emit.bind(r),
            });
          });
          const o = z({}, dt, a);
          return (
            (r.params = z({}, o, ht, e)),
            (r.originalParams = z({}, r.params)),
            (r.passedParams = z({}, e)),
            r.params &&
              r.params.on &&
              Object.keys(r.params.on).forEach((t) => {
                r.on(t, r.params.on[t]);
              }),
            r.params && r.params.onAny && r.onAny(r.params.onAny),
            (r.$ = k),
            Object.assign(r, {
              enabled: r.params.enabled,
              el: t,
              classNames: [],
              slides: k(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === r.params.direction,
              isVertical: () => "vertical" === r.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: r.params.allowSlideNext,
              allowSlidePrev: r.params.allowSlidePrev,
              touchEvents: (function () {
                const t = [
                    "touchstart",
                    "touchmove",
                    "touchend",
                    "touchcancel",
                  ],
                  e = ["pointerdown", "pointermove", "pointerup"];
                return (
                  (r.touchEventsTouch = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                    cancel: t[3],
                  }),
                  (r.touchEventsDesktop = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                  }),
                  r.support.touch || !r.params.simulateTouch
                    ? r.touchEventsTouch
                    : r.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: r.params.focusableElements,
                lastClickTime: P(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: r.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            r.emit("_swiper"),
            r.params.init && r.init(),
            r
          );
        }
        enable() {
          const t = this;
          t.enabled ||
            ((t.enabled = !0),
            t.params.grabCursor && t.setGrabCursor(),
            t.emit("enable"));
        }
        disable() {
          const t = this;
          t.enabled &&
            ((t.enabled = !1),
            t.params.grabCursor && t.unsetGrabCursor(),
            t.emit("disable"));
        }
        setProgress(t, e) {
          const s = this;
          t = Math.min(Math.max(t, 0), 1);
          const i = s.minTranslate(),
            n = (s.maxTranslate() - i) * t + i;
          s.translateTo(n, void 0 === e ? 0 : e),
            s.updateActiveIndex(),
            s.updateSlidesClasses();
        }
        emitContainerClasses() {
          const t = this;
          if (!t.params._emitClasses || !t.el) return;
          const e = t.el.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper") ||
                0 === e.indexOf(t.params.containerModifierClass)
            );
          t.emit("_containerClasses", e.join(" "));
        }
        getSlideClasses(t) {
          const e = this;
          return e.destroyed
            ? ""
            : t.className
                .split(" ")
                .filter(
                  (t) =>
                    0 === t.indexOf("swiper-slide") ||
                    0 === t.indexOf(e.params.slideClass)
                )
                .join(" ");
        }
        emitSlidesClasses() {
          const t = this;
          if (!t.params._emitClasses || !t.el) return;
          const e = [];
          t.slides.each((s) => {
            const i = t.getSlideClasses(s);
            e.push({ slideEl: s, classNames: i }), t.emit("_slideClass", s, i);
          }),
            t.emit("_slideClasses", e);
        }
        slidesPerViewDynamic(t, e) {
          void 0 === t && (t = "current"), void 0 === e && (e = !1);
          const {
            params: s,
            slides: i,
            slidesGrid: n,
            slidesSizesGrid: r,
            size: a,
            activeIndex: o,
          } = this;
          let l = 1;
          if (s.centeredSlides) {
            let t,
              e = i[o].swiperSlideSize;
            for (let s = o + 1; s < i.length; s += 1)
              i[s] &&
                !t &&
                ((e += i[s].swiperSlideSize), (l += 1), e > a && (t = !0));
            for (let s = o - 1; s >= 0; s -= 1)
              i[s] &&
                !t &&
                ((e += i[s].swiperSlideSize), (l += 1), e > a && (t = !0));
          } else if ("current" === t)
            for (let t = o + 1; t < i.length; t += 1) {
              (e ? n[t] + r[t] - n[o] < a : n[t] - n[o] < a) && (l += 1);
            }
          else
            for (let t = o - 1; t >= 0; t -= 1) {
              n[o] - n[t] < a && (l += 1);
            }
          return l;
        }
        update() {
          const t = this;
          if (!t || t.destroyed) return;
          const { snapGrid: e, params: s } = t;
          function i() {
            const e = t.rtlTranslate ? -1 * t.translate : t.translate,
              s = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
            t.setTranslate(s), t.updateActiveIndex(), t.updateSlidesClasses();
          }
          let n;
          s.breakpoints && t.setBreakpoint(),
            t.updateSize(),
            t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.params.freeMode && t.params.freeMode.enabled
              ? (i(), t.params.autoHeight && t.updateAutoHeight())
              : ((n =
                  ("auto" === t.params.slidesPerView ||
                    t.params.slidesPerView > 1) &&
                  t.isEnd &&
                  !t.params.centeredSlides
                    ? t.slideTo(t.slides.length - 1, 0, !1, !0)
                    : t.slideTo(t.activeIndex, 0, !1, !0)),
                n || i()),
            s.watchOverflow && e !== t.snapGrid && t.checkOverflow(),
            t.emit("update");
        }
        changeDirection(t, e) {
          void 0 === e && (e = !0);
          const s = this,
            i = s.params.direction;
          return (
            t || (t = "horizontal" === i ? "vertical" : "horizontal"),
            t === i ||
              ("horizontal" !== t && "vertical" !== t) ||
              (s.$el
                .removeClass(`${s.params.containerModifierClass}${i}`)
                .addClass(`${s.params.containerModifierClass}${t}`),
              s.emitContainerClasses(),
              (s.params.direction = t),
              s.slides.each((e) => {
                "vertical" === t ? (e.style.width = "") : (e.style.height = "");
              }),
              s.emit("changeDirection"),
              e && s.update()),
            s
          );
        }
        mount(t) {
          const e = this;
          if (e.mounted) return !0;
          const s = k(t || e.params.el);
          if (!(t = s[0])) return !1;
          t.swiper = e;
          const i = () =>
            `.${(e.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let n = (() => {
            if (t && t.shadowRoot && t.shadowRoot.querySelector) {
              const e = k(t.shadowRoot.querySelector(i()));
              return (e.children = (t) => s.children(t)), e;
            }
            return s.children ? s.children(i()) : k(s).children(i());
          })();
          if (0 === n.length && e.params.createElements) {
            const t = y().createElement("div");
            (n = k(t)),
              (t.className = e.params.wrapperClass),
              s.append(t),
              s.children(`.${e.params.slideClass}`).each((t) => {
                n.append(t);
              });
          }
          return (
            Object.assign(e, {
              $el: s,
              el: t,
              $wrapperEl: n,
              wrapperEl: n[0],
              mounted: !0,
              rtl:
                "rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction"),
              rtlTranslate:
                "horizontal" === e.params.direction &&
                ("rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction")),
              wrongRTL: "-webkit-box" === n.css("display"),
            }),
            !0
          );
        }
        init(t) {
          const e = this;
          if (e.initialized) return e;
          return (
            !1 === e.mount(t) ||
              (e.emit("beforeInit"),
              e.params.breakpoints && e.setBreakpoint(),
              e.addClasses(),
              e.params.loop && e.loopCreate(),
              e.updateSize(),
              e.updateSlides(),
              e.params.watchOverflow && e.checkOverflow(),
              e.params.grabCursor && e.enabled && e.setGrabCursor(),
              e.params.preloadImages && e.preloadImages(),
              e.params.loop
                ? e.slideTo(
                    e.params.initialSlide + e.loopedSlides,
                    0,
                    e.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : e.slideTo(
                    e.params.initialSlide,
                    0,
                    e.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              e.attachEvents(),
              (e.initialized = !0),
              e.emit("init"),
              e.emit("afterInit")),
            e
          );
        }
        destroy(t, e) {
          void 0 === t && (t = !0), void 0 === e && (e = !0);
          const s = this,
            { params: i, $el: n, $wrapperEl: r, slides: a } = s;
          return (
            void 0 === s.params ||
              s.destroyed ||
              (s.emit("beforeDestroy"),
              (s.initialized = !1),
              s.detachEvents(),
              i.loop && s.loopDestroy(),
              e &&
                (s.removeClasses(),
                n.removeAttr("style"),
                r.removeAttr("style"),
                a &&
                  a.length &&
                  a
                    .removeClass(
                      [
                        i.slideVisibleClass,
                        i.slideActiveClass,
                        i.slideNextClass,
                        i.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              s.emit("destroy"),
              Object.keys(s.eventsListeners).forEach((t) => {
                s.off(t);
              }),
              !1 !== t &&
                ((s.$el[0].swiper = null),
                (function (t) {
                  const e = t;
                  Object.keys(e).forEach((t) => {
                    try {
                      e[t] = null;
                    } catch (t) {}
                    try {
                      delete e[t];
                    } catch (t) {}
                  });
                })(s)),
              (s.destroyed = !0)),
            null
          );
        }
        static extendDefaults(t) {
          z(ht, t);
        }
        static get extendedDefaults() {
          return ht;
        }
        static get defaults() {
          return dt;
        }
        static installModule(t) {
          mt.prototype.__modules__ || (mt.prototype.__modules__ = []);
          const e = mt.prototype.__modules__;
          "function" == typeof t && e.indexOf(t) < 0 && e.push(t);
        }
        static use(t) {
          return Array.isArray(t)
            ? (t.forEach((t) => mt.installModule(t)), mt)
            : (mt.installModule(t), mt);
        }
      }
      Object.keys(pt).forEach((t) => {
        Object.keys(pt[t]).forEach((e) => {
          mt.prototype[e] = pt[t][e];
        });
      }),
        mt.use([
          function (t) {
            let { swiper: e, on: s, emit: i } = t;
            const n = S();
            let r = null,
              a = null;
            const o = () => {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  (i("beforeResize"), i("resize"));
              },
              l = () => {
                e && !e.destroyed && e.initialized && i("orientationchange");
              };
            s("init", () => {
              e.params.resizeObserver && void 0 !== n.ResizeObserver
                ? e &&
                  !e.destroyed &&
                  e.initialized &&
                  ((r = new ResizeObserver((t) => {
                    a = n.requestAnimationFrame(() => {
                      const { width: s, height: i } = e;
                      let n = s,
                        r = i;
                      t.forEach((t) => {
                        let {
                          contentBoxSize: s,
                          contentRect: i,
                          target: a,
                        } = t;
                        (a && a !== e.el) ||
                          ((n = i ? i.width : (s[0] || s).inlineSize),
                          (r = i ? i.height : (s[0] || s).blockSize));
                      }),
                        (n === s && r === i) || o();
                    });
                  })),
                  r.observe(e.el))
                : (n.addEventListener("resize", o),
                  n.addEventListener("orientationchange", l));
            }),
              s("destroy", () => {
                a && n.cancelAnimationFrame(a),
                  r && r.unobserve && e.el && (r.unobserve(e.el), (r = null)),
                  n.removeEventListener("resize", o),
                  n.removeEventListener("orientationchange", l);
              });
          },
          function (t) {
            let { swiper: e, extendParams: s, on: i, emit: n } = t;
            const r = [],
              a = S(),
              o = function (t, e) {
                void 0 === e && (e = {});
                const s = new (a.MutationObserver || a.WebkitMutationObserver)(
                  (t) => {
                    if (1 === t.length) return void n("observerUpdate", t[0]);
                    const e = function () {
                      n("observerUpdate", t[0]);
                    };
                    a.requestAnimationFrame
                      ? a.requestAnimationFrame(e)
                      : a.setTimeout(e, 0);
                  }
                );
                s.observe(t, {
                  attributes: void 0 === e.attributes || e.attributes,
                  childList: void 0 === e.childList || e.childList,
                  characterData: void 0 === e.characterData || e.characterData,
                }),
                  r.push(s);
              };
            s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              i("init", () => {
                if (e.params.observer) {
                  if (e.params.observeParents) {
                    const t = e.$el.parents();
                    for (let e = 0; e < t.length; e += 1) o(t[e]);
                  }
                  o(e.$el[0], { childList: e.params.observeSlideChildren }),
                    o(e.$wrapperEl[0], { attributes: !1 });
                }
              }),
              i("destroy", () => {
                r.forEach((t) => {
                  t.disconnect();
                }),
                  r.splice(0, r.length);
              });
          },
        ]);
      const ft = mt;
      function gt(t, e, s, i) {
        const n = y();
        return (
          t.params.createElements &&
            Object.keys(i).forEach((r) => {
              if (!s[r] && !0 === s.auto) {
                let a = t.$el.children(`.${i[r]}`)[0];
                a ||
                  ((a = n.createElement("div")),
                  (a.className = i[r]),
                  t.$el.append(a)),
                  (s[r] = a),
                  (e[r] = a);
              }
            }),
          s
        );
      }
      function vt(t) {
        let { swiper: e, extendParams: s, on: i, emit: n } = t;
        function r(t) {
          let s;
          return (
            t &&
              ((s = k(t)),
              e.params.uniqueNavElements &&
                "string" == typeof t &&
                s.length > 1 &&
                1 === e.$el.find(t).length &&
                (s = e.$el.find(t))),
            s
          );
        }
        function a(t, s) {
          const i = e.params.navigation;
          t &&
            t.length > 0 &&
            (t[s ? "addClass" : "removeClass"](i.disabledClass),
            t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s),
            e.params.watchOverflow &&
              e.enabled &&
              t[e.isLocked ? "addClass" : "removeClass"](i.lockClass));
        }
        function o() {
          if (e.params.loop) return;
          const { $nextEl: t, $prevEl: s } = e.navigation;
          a(s, e.isBeginning && !e.params.rewind),
            a(t, e.isEnd && !e.params.rewind);
        }
        function l(t) {
          t.preventDefault(),
            (!e.isBeginning || e.params.loop || e.params.rewind) &&
              e.slidePrev();
        }
        function c(t) {
          t.preventDefault(),
            (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
        }
        function d() {
          const t = e.params.navigation;
          if (
            ((e.params.navigation = gt(
              e,
              e.originalParams.navigation,
              e.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
            )),
            !t.nextEl && !t.prevEl)
          )
            return;
          const s = r(t.nextEl),
            i = r(t.prevEl);
          s && s.length > 0 && s.on("click", c),
            i && i.length > 0 && i.on("click", l),
            Object.assign(e.navigation, {
              $nextEl: s,
              nextEl: s && s[0],
              $prevEl: i,
              prevEl: i && i[0],
            }),
            e.enabled ||
              (s && s.addClass(t.lockClass), i && i.addClass(t.lockClass));
        }
        function u() {
          const { $nextEl: t, $prevEl: s } = e.navigation;
          t &&
            t.length &&
            (t.off("click", c),
            t.removeClass(e.params.navigation.disabledClass)),
            s &&
              s.length &&
              (s.off("click", l),
              s.removeClass(e.params.navigation.disabledClass));
        }
        s({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled",
          },
        }),
          (e.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null,
          }),
          i("init", () => {
            !1 === e.params.navigation.enabled ? p() : (d(), o());
          }),
          i("toEdge fromEdge lock unlock", () => {
            o();
          }),
          i("destroy", () => {
            u();
          }),
          i("enable disable", () => {
            const { $nextEl: t, $prevEl: s } = e.navigation;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.navigation.lockClass
              ),
              s &&
                s[e.enabled ? "removeClass" : "addClass"](
                  e.params.navigation.lockClass
                );
          }),
          i("click", (t, s) => {
            const { $nextEl: i, $prevEl: r } = e.navigation,
              a = s.target;
            if (e.params.navigation.hideOnClick && !k(a).is(r) && !k(a).is(i)) {
              if (
                e.pagination &&
                e.params.pagination &&
                e.params.pagination.clickable &&
                (e.pagination.el === a || e.pagination.el.contains(a))
              )
                return;
              let t;
              i
                ? (t = i.hasClass(e.params.navigation.hiddenClass))
                : r && (t = r.hasClass(e.params.navigation.hiddenClass)),
                n(!0 === t ? "navigationShow" : "navigationHide"),
                i && i.toggleClass(e.params.navigation.hiddenClass),
                r && r.toggleClass(e.params.navigation.hiddenClass);
            }
          });
        const p = () => {
          e.$el.addClass(e.params.navigation.navigationDisabledClass), u();
        };
        Object.assign(e.navigation, {
          enable: () => {
            e.$el.removeClass(e.params.navigation.navigationDisabledClass),
              d(),
              o();
          },
          disable: p,
          update: o,
          init: d,
          destroy: u,
        });
      }
      function _t(t) {
        return (
          void 0 === t && (t = ""),
          `.${t
            .trim()
            .replace(/([\.:!\/])/g, "\\$1")
            .replace(/ /g, ".")}`
        );
      }
      function bt(t) {
        let { swiper: e, extendParams: s, on: i, emit: n } = t;
        const r = "swiper-pagination";
        let a;
        s({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (t) => t,
            formatFractionTotal: (t) => t,
            bulletClass: `${r}-bullet`,
            bulletActiveClass: `${r}-bullet-active`,
            modifierClass: `${r}-`,
            currentClass: `${r}-current`,
            totalClass: `${r}-total`,
            hiddenClass: `${r}-hidden`,
            progressbarFillClass: `${r}-progressbar-fill`,
            progressbarOppositeClass: `${r}-progressbar-opposite`,
            clickableClass: `${r}-clickable`,
            lockClass: `${r}-lock`,
            horizontalClass: `${r}-horizontal`,
            verticalClass: `${r}-vertical`,
            paginationDisabledClass: `${r}-disabled`,
          },
        }),
          (e.pagination = { el: null, $el: null, bullets: [] });
        let o = 0;
        function l() {
          return (
            !e.params.pagination.el ||
            !e.pagination.el ||
            !e.pagination.$el ||
            0 === e.pagination.$el.length
          );
        }
        function c(t, s) {
          const { bulletActiveClass: i } = e.params.pagination;
          t[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
        }
        function d() {
          const t = e.rtl,
            s = e.params.pagination;
          if (l()) return;
          const i =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            r = e.pagination.$el;
          let d;
          const u = e.params.loop
            ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
            : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((d = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                )),
                d > i - 1 - 2 * e.loopedSlides && (d -= i - 2 * e.loopedSlides),
                d > u - 1 && (d -= u),
                d < 0 && "bullets" !== e.params.paginationType && (d = u + d))
              : (d = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            "bullets" === s.type &&
              e.pagination.bullets &&
              e.pagination.bullets.length > 0)
          ) {
            const i = e.pagination.bullets;
            let n, l, u;
            if (
              (s.dynamicBullets &&
                ((a = i
                  .eq(0)
                  [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                r.css(
                  e.isHorizontal() ? "width" : "height",
                  a * (s.dynamicMainBullets + 4) + "px"
                ),
                s.dynamicMainBullets > 1 &&
                  void 0 !== e.previousIndex &&
                  ((o += d - (e.previousIndex - e.loopedSlides || 0)),
                  o > s.dynamicMainBullets - 1
                    ? (o = s.dynamicMainBullets - 1)
                    : o < 0 && (o = 0)),
                (n = Math.max(d - o, 0)),
                (l = n + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                (u = (l + n) / 2)),
              i.removeClass(
                ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                  .map((t) => `${s.bulletActiveClass}${t}`)
                  .join(" ")
              ),
              r.length > 1)
            )
              i.each((t) => {
                const e = k(t),
                  i = e.index();
                i === d && e.addClass(s.bulletActiveClass),
                  s.dynamicBullets &&
                    (i >= n &&
                      i <= l &&
                      e.addClass(`${s.bulletActiveClass}-main`),
                    i === n && c(e, "prev"),
                    i === l && c(e, "next"));
              });
            else {
              const t = i.eq(d),
                r = t.index();
              if ((t.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                const t = i.eq(n),
                  a = i.eq(l);
                for (let t = n; t <= l; t += 1)
                  i.eq(t).addClass(`${s.bulletActiveClass}-main`);
                if (e.params.loop)
                  if (r >= i.length) {
                    for (let t = s.dynamicMainBullets; t >= 0; t -= 1)
                      i.eq(i.length - t).addClass(
                        `${s.bulletActiveClass}-main`
                      );
                    i.eq(i.length - s.dynamicMainBullets - 1).addClass(
                      `${s.bulletActiveClass}-prev`
                    );
                  } else c(t, "prev"), c(a, "next");
                else c(t, "prev"), c(a, "next");
              }
            }
            if (s.dynamicBullets) {
              const n = Math.min(i.length, s.dynamicMainBullets + 4),
                r = (a * n - a) / 2 - u * a,
                o = t ? "right" : "left";
              i.css(e.isHorizontal() ? o : "top", `${r}px`);
            }
          }
          if (
            ("fraction" === s.type &&
              (r.find(_t(s.currentClass)).text(s.formatFractionCurrent(d + 1)),
              r.find(_t(s.totalClass)).text(s.formatFractionTotal(u))),
            "progressbar" === s.type)
          ) {
            let t;
            t = s.progressbarOpposite
              ? e.isHorizontal()
                ? "vertical"
                : "horizontal"
              : e.isHorizontal()
              ? "horizontal"
              : "vertical";
            const i = (d + 1) / u;
            let n = 1,
              a = 1;
            "horizontal" === t ? (n = i) : (a = i),
              r
                .find(_t(s.progressbarFillClass))
                .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${a})`)
                .transition(e.params.speed);
          }
          "custom" === s.type && s.renderCustom
            ? (r.html(s.renderCustom(e, d + 1, u)), n("paginationRender", r[0]))
            : n("paginationUpdate", r[0]),
            e.params.watchOverflow &&
              e.enabled &&
              r[e.isLocked ? "addClass" : "removeClass"](s.lockClass);
        }
        function u() {
          const t = e.params.pagination;
          if (l()) return;
          const s =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            i = e.pagination.$el;
          let r = "";
          if ("bullets" === t.type) {
            let n = e.params.loop
              ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
            e.params.freeMode &&
              e.params.freeMode.enabled &&
              !e.params.loop &&
              n > s &&
              (n = s);
            for (let s = 0; s < n; s += 1)
              t.renderBullet
                ? (r += t.renderBullet.call(e, s, t.bulletClass))
                : (r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
            i.html(r), (e.pagination.bullets = i.find(_t(t.bulletClass)));
          }
          "fraction" === t.type &&
            ((r = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
            i.html(r)),
            "progressbar" === t.type &&
              ((r = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : `<span class="${t.progressbarFillClass}"></span>`),
              i.html(r)),
            "custom" !== t.type && n("paginationRender", e.pagination.$el[0]);
        }
        function p() {
          e.params.pagination = gt(
            e,
            e.originalParams.pagination,
            e.params.pagination,
            { el: "swiper-pagination" }
          );
          const t = e.params.pagination;
          if (!t.el) return;
          let s = k(t.el);
          0 !== s.length &&
            (e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              s.length > 1 &&
              ((s = e.$el.find(t.el)),
              s.length > 1 &&
                (s = s.filter((t) => k(t).parents(".swiper")[0] === e.el))),
            "bullets" === t.type && t.clickable && s.addClass(t.clickableClass),
            s.addClass(t.modifierClass + t.type),
            s.addClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass),
            "bullets" === t.type &&
              t.dynamicBullets &&
              (s.addClass(`${t.modifierClass}${t.type}-dynamic`),
              (o = 0),
              t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            "progressbar" === t.type &&
              t.progressbarOpposite &&
              s.addClass(t.progressbarOppositeClass),
            t.clickable &&
              s.on("click", _t(t.bulletClass), function (t) {
                t.preventDefault();
                let s = k(this).index() * e.params.slidesPerGroup;
                e.params.loop && (s += e.loopedSlides), e.slideTo(s);
              }),
            Object.assign(e.pagination, { $el: s, el: s[0] }),
            e.enabled || s.addClass(t.lockClass));
        }
        function h() {
          const t = e.params.pagination;
          if (l()) return;
          const s = e.pagination.$el;
          s.removeClass(t.hiddenClass),
            s.removeClass(t.modifierClass + t.type),
            s.removeClass(
              e.isHorizontal() ? t.horizontalClass : t.verticalClass
            ),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && s.off("click", _t(t.bulletClass));
        }
        i("init", () => {
          !1 === e.params.pagination.enabled ? m() : (p(), u(), d());
        }),
          i("activeIndexChange", () => {
            (e.params.loop || void 0 === e.snapIndex) && d();
          }),
          i("snapIndexChange", () => {
            e.params.loop || d();
          }),
          i("slidesLengthChange", () => {
            e.params.loop && (u(), d());
          }),
          i("snapGridLengthChange", () => {
            e.params.loop || (u(), d());
          }),
          i("destroy", () => {
            h();
          }),
          i("enable disable", () => {
            const { $el: t } = e.pagination;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.pagination.lockClass
              );
          }),
          i("lock unlock", () => {
            d();
          }),
          i("click", (t, s) => {
            const i = s.target,
              { $el: r } = e.pagination;
            if (
              e.params.pagination.el &&
              e.params.pagination.hideOnClick &&
              r.length > 0 &&
              !k(i).hasClass(e.params.pagination.bulletClass)
            ) {
              if (
                e.navigation &&
                ((e.navigation.nextEl && i === e.navigation.nextEl) ||
                  (e.navigation.prevEl && i === e.navigation.prevEl))
              )
                return;
              const t = r.hasClass(e.params.pagination.hiddenClass);
              n(!0 === t ? "paginationShow" : "paginationHide"),
                r.toggleClass(e.params.pagination.hiddenClass);
            }
          });
        const m = () => {
          e.$el.addClass(e.params.pagination.paginationDisabledClass),
            e.pagination.$el &&
              e.pagination.$el.addClass(
                e.params.pagination.paginationDisabledClass
              ),
            h();
        };
        Object.assign(e.pagination, {
          enable: () => {
            e.$el.removeClass(e.params.pagination.paginationDisabledClass),
              e.pagination.$el &&
                e.pagination.$el.removeClass(
                  e.params.pagination.paginationDisabledClass
                ),
              p(),
              u(),
              d();
          },
          disable: m,
          render: u,
          update: d,
          init: p,
          destroy: h,
        });
      }
      function yt(t) {
        let e,
          { swiper: s, extendParams: i, on: n, emit: r } = t;
        function a() {
          const t = s.slides.eq(s.activeIndex);
          let i = s.params.autoplay.delay;
          t.attr("data-swiper-autoplay") &&
            (i = t.attr("data-swiper-autoplay") || s.params.autoplay.delay),
            clearTimeout(e),
            (e = M(() => {
              let t;
              s.params.autoplay.reverseDirection
                ? s.params.loop
                  ? (s.loopFix(),
                    (t = s.slidePrev(s.params.speed, !0, !0)),
                    r("autoplay"))
                  : s.isBeginning
                  ? s.params.autoplay.stopOnLastSlide
                    ? l()
                    : ((t = s.slideTo(
                        s.slides.length - 1,
                        s.params.speed,
                        !0,
                        !0
                      )),
                      r("autoplay"))
                  : ((t = s.slidePrev(s.params.speed, !0, !0)), r("autoplay"))
                : s.params.loop
                ? (s.loopFix(),
                  (t = s.slideNext(s.params.speed, !0, !0)),
                  r("autoplay"))
                : s.isEnd
                ? s.params.autoplay.stopOnLastSlide
                  ? l()
                  : ((t = s.slideTo(0, s.params.speed, !0, !0)), r("autoplay"))
                : ((t = s.slideNext(s.params.speed, !0, !0)), r("autoplay")),
                ((s.params.cssMode && s.autoplay.running) || !1 === t) && a();
            }, i));
        }
        function o() {
          return (
            void 0 === e &&
            !s.autoplay.running &&
            ((s.autoplay.running = !0), r("autoplayStart"), a(), !0)
          );
        }
        function l() {
          return (
            !!s.autoplay.running &&
            void 0 !== e &&
            (e && (clearTimeout(e), (e = void 0)),
            (s.autoplay.running = !1),
            r("autoplayStop"),
            !0)
          );
        }
        function c(t) {
          s.autoplay.running &&
            (s.autoplay.paused ||
              (e && clearTimeout(e),
              (s.autoplay.paused = !0),
              0 !== t && s.params.autoplay.waitForTransition
                ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                    s.$wrapperEl[0].addEventListener(t, u);
                  })
                : ((s.autoplay.paused = !1), a())));
        }
        function d() {
          const t = y();
          "hidden" === t.visibilityState && s.autoplay.running && c(),
            "visible" === t.visibilityState &&
              s.autoplay.paused &&
              (a(), (s.autoplay.paused = !1));
        }
        function u(t) {
          s &&
            !s.destroyed &&
            s.$wrapperEl &&
            t.target === s.$wrapperEl[0] &&
            (["transitionend", "webkitTransitionEnd"].forEach((t) => {
              s.$wrapperEl[0].removeEventListener(t, u);
            }),
            (s.autoplay.paused = !1),
            s.autoplay.running ? a() : l());
        }
        function p() {
          s.params.autoplay.disableOnInteraction
            ? l()
            : (r("autoplayPause"), c()),
            ["transitionend", "webkitTransitionEnd"].forEach((t) => {
              s.$wrapperEl[0].removeEventListener(t, u);
            });
        }
        function h() {
          s.params.autoplay.disableOnInteraction ||
            ((s.autoplay.paused = !1), r("autoplayResume"), a());
        }
        (s.autoplay = { running: !1, paused: !1 }),
          i({
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !0,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1,
            },
          }),
          n("init", () => {
            if (s.params.autoplay.enabled) {
              o();
              y().addEventListener("visibilitychange", d),
                s.params.autoplay.pauseOnMouseEnter &&
                  (s.$el.on("mouseenter", p), s.$el.on("mouseleave", h));
            }
          }),
          n("beforeTransitionStart", (t, e, i) => {
            s.autoplay.running &&
              (i || !s.params.autoplay.disableOnInteraction
                ? s.autoplay.pause(e)
                : l());
          }),
          n("sliderFirstMove", () => {
            s.autoplay.running &&
              (s.params.autoplay.disableOnInteraction ? l() : c());
          }),
          n("touchEnd", () => {
            s.params.cssMode &&
              s.autoplay.paused &&
              !s.params.autoplay.disableOnInteraction &&
              a();
          }),
          n("destroy", () => {
            s.$el.off("mouseenter", p),
              s.$el.off("mouseleave", h),
              s.autoplay.running && l();
            y().removeEventListener("visibilitychange", d);
          }),
          Object.assign(s.autoplay, { pause: c, run: a, start: o, stop: l });
      }
      function wt(t) {
        let { swiper: e, extendParams: s, on: i } = t;
        s({
          thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs",
          },
        });
        let n = !1,
          r = !1;
        function a() {
          const t = e.thumbs.swiper;
          if (!t || t.destroyed) return;
          const s = t.clickedIndex,
            i = t.clickedSlide;
          if (i && k(i).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
          if (null == s) return;
          let n;
          if (
            ((n = t.params.loop
              ? parseInt(k(t.clickedSlide).attr("data-swiper-slide-index"), 10)
              : s),
            e.params.loop)
          ) {
            let t = e.activeIndex;
            e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
              (e.loopFix(),
              (e._clientLeft = e.$wrapperEl[0].clientLeft),
              (t = e.activeIndex));
            const s = e.slides
                .eq(t)
                .prevAll(`[data-swiper-slide-index="${n}"]`)
                .eq(0)
                .index(),
              i = e.slides
                .eq(t)
                .nextAll(`[data-swiper-slide-index="${n}"]`)
                .eq(0)
                .index();
            n = void 0 === s ? i : void 0 === i ? s : i - t < t - s ? i : s;
          }
          e.slideTo(n);
        }
        function o() {
          const { thumbs: t } = e.params;
          if (n) return !1;
          n = !0;
          const s = e.constructor;
          if (t.swiper instanceof s)
            (e.thumbs.swiper = t.swiper),
              Object.assign(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
              Object.assign(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              });
          else if (I(t.swiper)) {
            const i = Object.assign({}, t.swiper);
            Object.assign(i, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
              (e.thumbs.swiper = new s(i)),
              (r = !0);
          }
          return (
            e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
            e.thumbs.swiper.on("tap", a),
            !0
          );
        }
        function l(t) {
          const s = e.thumbs.swiper;
          if (!s || s.destroyed) return;
          const i =
              "auto" === s.params.slidesPerView
                ? s.slidesPerViewDynamic()
                : s.params.slidesPerView,
            n = e.params.thumbs.autoScrollOffset,
            r = n && !s.params.loop;
          if (e.realIndex !== s.realIndex || r) {
            let a,
              o,
              l = s.activeIndex;
            if (s.params.loop) {
              s.slides.eq(l).hasClass(s.params.slideDuplicateClass) &&
                (s.loopFix(),
                (s._clientLeft = s.$wrapperEl[0].clientLeft),
                (l = s.activeIndex));
              const t = s.slides
                  .eq(l)
                  .prevAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                  .eq(0)
                  .index(),
                i = s.slides
                  .eq(l)
                  .nextAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                  .eq(0)
                  .index();
              (a =
                void 0 === t
                  ? i
                  : void 0 === i
                  ? t
                  : i - l == l - t
                  ? s.params.slidesPerGroup > 1
                    ? i
                    : l
                  : i - l < l - t
                  ? i
                  : t),
                (o = e.activeIndex > e.previousIndex ? "next" : "prev");
            } else
              (a = e.realIndex), (o = a > e.previousIndex ? "next" : "prev");
            r && (a += "next" === o ? n : -1 * n),
              s.visibleSlidesIndexes &&
                s.visibleSlidesIndexes.indexOf(a) < 0 &&
                (s.params.centeredSlides
                  ? (a =
                      a > l
                        ? a - Math.floor(i / 2) + 1
                        : a + Math.floor(i / 2) - 1)
                  : a > l && s.params.slidesPerGroup,
                s.slideTo(a, t ? 0 : void 0));
          }
          let a = 1;
          const o = e.params.thumbs.slideThumbActiveClass;
          if (
            (e.params.slidesPerView > 1 &&
              !e.params.centeredSlides &&
              (a = e.params.slidesPerView),
            e.params.thumbs.multipleActiveThumbs || (a = 1),
            (a = Math.floor(a)),
            s.slides.removeClass(o),
            s.params.loop || (s.params.virtual && s.params.virtual.enabled))
          )
            for (let t = 0; t < a; t += 1)
              s.$wrapperEl
                .children(`[data-swiper-slide-index="${e.realIndex + t}"]`)
                .addClass(o);
          else
            for (let t = 0; t < a; t += 1)
              s.slides.eq(e.realIndex + t).addClass(o);
        }
        (e.thumbs = { swiper: null }),
          i("beforeInit", () => {
            const { thumbs: t } = e.params;
            t && t.swiper && (o(), l(!0));
          }),
          i("slideChange update resize observerUpdate", () => {
            l();
          }),
          i("setTransition", (t, s) => {
            const i = e.thumbs.swiper;
            i && !i.destroyed && i.setTransition(s);
          }),
          i("beforeDestroy", () => {
            const t = e.thumbs.swiper;
            t && !t.destroyed && r && t.destroy();
          }),
          Object.assign(e.thumbs, { init: o, update: l });
      }
      function St(t) {
        const {
          effect: e,
          swiper: s,
          on: i,
          setTranslate: n,
          setTransition: r,
          overwriteParams: a,
          perspective: o,
          recreateShadows: l,
          getEffectParams: c,
        } = t;
        let d;
        i("beforeInit", () => {
          if (s.params.effect !== e) return;
          s.classNames.push(`${s.params.containerModifierClass}${e}`),
            o &&
              o() &&
              s.classNames.push(`${s.params.containerModifierClass}3d`);
          const t = a ? a() : {};
          Object.assign(s.params, t), Object.assign(s.originalParams, t);
        }),
          i("setTranslate", () => {
            s.params.effect === e && n();
          }),
          i("setTransition", (t, i) => {
            s.params.effect === e && r(i);
          }),
          i("transitionEnd", () => {
            if (s.params.effect === e && l) {
              if (!c || !c().slideShadows) return;
              s.slides.each((t) => {
                s.$(t)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .remove();
              }),
                l();
            }
          }),
          i("virtualUpdate", () => {
            s.params.effect === e &&
              (s.slides.length || (d = !0),
              requestAnimationFrame(() => {
                d && s.slides && s.slides.length && (n(), (d = !1));
              }));
          });
      }
      function Ct(t, e) {
        return t.transformEl
          ? e
              .find(t.transformEl)
              .css({
                "backface-visibility": "hidden",
                "-webkit-backface-visibility": "hidden",
              })
          : e;
      }
      function xt(t) {
        let { swiper: e, duration: s, transformEl: i, allSlides: n } = t;
        const { slides: r, activeIndex: a, $wrapperEl: o } = e;
        if (e.params.virtualTranslate && 0 !== s) {
          let t,
            s = !1;
          (t = n ? (i ? r.find(i) : r) : i ? r.eq(a).find(i) : r.eq(a)),
            t.transitionEnd(() => {
              if (s) return;
              if (!e || e.destroyed) return;
              (s = !0), (e.animating = !1);
              const t = ["webkitTransitionEnd", "transitionend"];
              for (let e = 0; e < t.length; e += 1) o.trigger(t[e]);
            });
        }
      }
      function Tt(t) {
        let { swiper: e, extendParams: s, on: i } = t;
        s({ fadeEffect: { crossFade: !1, transformEl: null } });
        St({
          effect: "fade",
          swiper: e,
          on: i,
          setTranslate: () => {
            const { slides: t } = e,
              s = e.params.fadeEffect;
            for (let i = 0; i < t.length; i += 1) {
              const t = e.slides.eq(i);
              let n = -t[0].swiperSlideOffset;
              e.params.virtualTranslate || (n -= e.translate);
              let r = 0;
              e.isHorizontal() || ((r = n), (n = 0));
              const a = e.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs(t[0].progress), 0)
                : 1 + Math.min(Math.max(t[0].progress, -1), 0);
              Ct(s, t)
                .css({ opacity: a })
                .transform(`translate3d(${n}px, ${r}px, 0px)`);
            }
          },
          setTransition: (t) => {
            const { transformEl: s } = e.params.fadeEffect;
            (s ? e.slides.find(s) : e.slides).transition(t),
              xt({ swiper: e, duration: t, transformEl: s, allSlides: !0 });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode,
          }),
        });
      }
      function Et(t, e, s) {
        const i = "swiper-slide-shadow" + (s ? `-${s}` : ""),
          n = t.transformEl ? e.find(t.transformEl) : e;
        let r = n.children(`.${i}`);
        return (
          r.length ||
            ((r = k(
              `<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`
            )),
            n.append(r)),
          r
        );
      }
      function Lt(t) {
        let { swiper: e, extendParams: s, on: i } = t;
        s({
          creativeEffect: {
            transformEl: null,
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1,
            },
            next: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1,
            },
          },
        });
        const n = (t) => ("string" == typeof t ? t : `${t}px`);
        St({
          effect: "creative",
          swiper: e,
          on: i,
          setTranslate: () => {
            const { slides: t, $wrapperEl: s, slidesSizesGrid: i } = e,
              r = e.params.creativeEffect,
              { progressMultiplier: a } = r,
              o = e.params.centeredSlides;
            if (o) {
              const t = i[0] / 2 - e.params.slidesOffsetBefore || 0;
              s.transform(`translateX(calc(50% - ${t}px))`);
            }
            for (let s = 0; s < t.length; s += 1) {
              const i = t.eq(s),
                l = i[0].progress,
                c = Math.min(
                  Math.max(i[0].progress, -r.limitProgress),
                  r.limitProgress
                );
              let d = c;
              o ||
                (d = Math.min(
                  Math.max(i[0].originalProgress, -r.limitProgress),
                  r.limitProgress
                ));
              const u = i[0].swiperSlideOffset,
                p = [e.params.cssMode ? -u - e.translate : -u, 0, 0],
                h = [0, 0, 0];
              let m = !1;
              e.isHorizontal() || ((p[1] = p[0]), (p[0] = 0));
              let f = {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                scale: 1,
                opacity: 1,
              };
              c < 0
                ? ((f = r.next), (m = !0))
                : c > 0 && ((f = r.prev), (m = !0)),
                p.forEach((t, e) => {
                  p[e] = `calc(${t}px + (${n(f.translate[e])} * ${Math.abs(
                    c * a
                  )}))`;
                }),
                h.forEach((t, e) => {
                  h[e] = f.rotate[e] * Math.abs(c * a);
                }),
                (i[0].style.zIndex = -Math.abs(Math.round(l)) + t.length);
              const g = p.join(", "),
                v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                _ =
                  d < 0
                    ? `scale(${1 + (1 - f.scale) * d * a})`
                    : `scale(${1 - (1 - f.scale) * d * a})`,
                b =
                  d < 0
                    ? 1 + (1 - f.opacity) * d * a
                    : 1 - (1 - f.opacity) * d * a,
                y = `translate3d(${g}) ${v} ${_}`;
              if ((m && f.shadow) || !m) {
                let t = i.children(".swiper-slide-shadow");
                if ((0 === t.length && f.shadow && (t = Et(r, i)), t.length)) {
                  const e = r.shadowPerProgress ? c * (1 / r.limitProgress) : c;
                  t[0].style.opacity = Math.min(Math.max(Math.abs(e), 0), 1);
                }
              }
              const w = Ct(r, i);
              w.transform(y).css({ opacity: b }),
                f.origin && w.css("transform-origin", f.origin);
            }
          },
          setTransition: (t) => {
            const { transformEl: s } = e.params.creativeEffect;
            (s ? e.slides.find(s) : e.slides)
              .transition(t)
              .find(".swiper-slide-shadow")
              .transition(t),
              xt({ swiper: e, duration: t, transformEl: s, allSlides: !0 });
          },
          perspective: () => e.params.creativeEffect.perspective,
          overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !e.params.cssMode,
          }),
        });
      }
      function At() {
        !(function () {
          let t = document.querySelectorAll(
            '[class*="__swiper"]:not(.swiper-wrapper)'
          );
          t &&
            t.forEach((t) => {
              t.parentElement.classList.add("swiper"),
                t.classList.add("swiper-wrapper");
              for (const e of t.children) e.classList.add("swiper-slide");
            });
        })();
        new ft(".slider-hero", {
          modules: [vt, bt, Lt],
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: !0,
          speed: 800,
          grabCursor: !0,
          effect: "creative",
          creativeEffect: {
            prev: { translate: ["-120%", 0, -800], opacity: 0.5 },
            next: { translate: ["120%", 0, 800], opacity: 0.5 },
          },
          loop: !0,
          pagination: { el: ".hero__pagination", clickable: !0 },
          on: {},
        }),
          new ft(".card-product-image", {
            modules: [vt, bt],
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 500,
            simulateTouch: !1,
            navigation: {
              nextEl: ".card-product-image__btn_next",
              prevEl: ".card-product-image__btn_prev",
            },
            pagination: { el: ".card-product-image__pagination" },
            breakpoints: { 320: { initialSlide: 0 }, 992: { initialSlide: 1 } },
            on: {},
          });
        let t = new ft(".product-thumb", {
          modules: [vt, wt],
          autoHeight: !0,
          slidesPerView: 4,
          direction: Ot(),
          spaceBetween: 15,
          breakpoints: { 320: { slidesPerView: 3 }, 540: { slidesPerView: 4 } },
          on: {
            resize: function () {
              t.changeDirection(Ot());
            },
          },
        });
        new ft(".product-slider", {
          modules: [vt, Tt, wt],
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          centeredSlides: !0,
          spaceBetween: 0,
          speed: 800,
          grabCursor: !0,
          thumbs: { swiper: t },
        }),
          new ft(".related-product-slider", {
            modules: [vt, bt, yt],
            spaceBetween: 30,
            speed: 1800,
            grabCursor: !0,
            pagination: {
              el: ".related-product-slider__pagination",
              clickable: !0,
            },
            autoplay: {
              delay: 4e3,
              disableOnInteraction: !1,
              pauseOnMouseEnter: !0,
            },
            breakpoints: {
              320: { slidesPerGroup: 1, slidesPerView: 1 },
              450: { slidesPerGroup: 2, slidesPerView: 2 },
              510: { slidesPerGroup: 3, slidesPerView: 3 },
              768: {},
              991.8: { slidesPerView: 5, slidesPerGroup: 5 },
            },
          });
      }
      function Ot() {
        window.innerWidth;
        return window.innerWidth <= 767.8 ? "horizontal" : "vertical";
      }
      window.addEventListener("load", function (t) {
        (this.document.querySelector(".page__cart") ||
          this.document.querySelector(".page__shop")) &&
          At();
      });
      new (s(732))({
        elements_selector: "[data-src],[data-srcset]",
        class_loaded: "_lazy-loaded",
        use_native: !0,
      });
      let kt = !1;
      setTimeout(() => {
        if (kt) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0);
      var Mt = function () {
        return (
          (Mt =
            Object.assign ||
            function (t) {
              for (var e, s = 1, i = arguments.length; s < i; s++)
                for (var n in (e = arguments[s]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            }),
          Mt.apply(this, arguments)
        );
      };
      var Pt = "lgAfterAppendSlide",
        $t = "lgInit",
        It = "lgHasVideo",
        Dt = "lgContainerResize",
        zt = "lgUpdateSlides",
        qt = "lgAfterAppendSubHtml",
        Bt = "lgBeforeOpen",
        Nt = "lgAfterOpen",
        Ft = "lgSlideItemLoad",
        Ht = "lgBeforeSlide",
        Gt = "lgAfterSlide",
        Vt = "lgPosterClick",
        Rt = "lgDragStart",
        jt = "lgDragMove",
        Wt = "lgDragEnd",
        Xt = "lgBeforeNextSlide",
        Ut = "lgBeforePrevSlide",
        Yt = "lgBeforeClose",
        Qt = "lgAfterClose",
        Kt = {
          mode: "lg-slide",
          easing: "ease",
          speed: 400,
          licenseKey: "0000-0000-000-0000",
          height: "100%",
          width: "100%",
          addClass: "",
          startClass: "lg-start-zoom",
          backdropDuration: 300,
          container: "",
          startAnimationDuration: 400,
          zoomFromOrigin: !0,
          hideBarsDelay: 0,
          showBarsAfter: 1e4,
          slideDelay: 0,
          supportLegacyBrowser: !0,
          allowMediaOverlap: !1,
          videoMaxSize: "1280-720",
          loadYouTubePoster: !0,
          defaultCaptionHeight: 0,
          ariaLabelledby: "",
          ariaDescribedby: "",
          resetScrollPosition: !0,
          hideScrollbar: !1,
          closable: !0,
          swipeToClose: !0,
          closeOnTap: !0,
          showCloseIcon: !0,
          showMaximizeIcon: !1,
          loop: !0,
          escKey: !0,
          keyPress: !0,
          trapFocus: !0,
          controls: !0,
          slideEndAnimation: !0,
          hideControlOnEnd: !1,
          mousewheel: !1,
          getCaptionFromTitleOrAlt: !0,
          appendSubHtmlTo: ".lg-sub-html",
          subHtmlSelectorRelative: !1,
          preload: 2,
          numberOfSlideItemsInDom: 10,
          selector: "",
          selectWithin: "",
          nextHtml: "",
          prevHtml: "",
          index: 0,
          iframeWidth: "100%",
          iframeHeight: "100%",
          iframeMaxWidth: "100%",
          iframeMaxHeight: "100%",
          download: !0,
          counter: !0,
          appendCounterTo: ".lg-toolbar",
          swipeThreshold: 50,
          enableSwipe: !0,
          enableDrag: !0,
          dynamic: !1,
          dynamicEl: [],
          extraProps: [],
          exThumbImage: "",
          isMobile: void 0,
          mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
          plugins: [],
          strings: {
            closeGallery: "Close gallery",
            toggleMaximize: "Toggle maximize",
            previousSlide: "Previous slide",
            nextSlide: "Next slide",
            download: "Download",
            playVideo: "Play video",
          },
        };
      var Zt = (function () {
        function t(t) {
          return (
            (this.cssVenderPrefixes = [
              "TransitionDuration",
              "TransitionTimingFunction",
              "Transform",
              "Transition",
            ]),
            (this.selector = this._getSelector(t)),
            (this.firstElement = this._getFirstEl()),
            this
          );
        }
        return (
          (t.generateUUID = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (t) {
                var e = (16 * Math.random()) | 0;
                return ("x" == t ? e : (3 & e) | 8).toString(16);
              }
            );
          }),
          (t.prototype._getSelector = function (t, e) {
            return (
              void 0 === e && (e = document),
              "string" != typeof t
                ? t
                : ((e = e || document),
                  "#" === t.substring(0, 1)
                    ? e.querySelector(t)
                    : e.querySelectorAll(t))
            );
          }),
          (t.prototype._each = function (t) {
            return this.selector
              ? (void 0 !== this.selector.length
                  ? [].forEach.call(this.selector, t)
                  : t(this.selector, 0),
                this)
              : this;
          }),
          (t.prototype._setCssVendorPrefix = function (t, e, s) {
            var i = e.replace(/-([a-z])/gi, function (t, e) {
              return e.toUpperCase();
            });
            -1 !== this.cssVenderPrefixes.indexOf(i)
              ? ((t.style[i.charAt(0).toLowerCase() + i.slice(1)] = s),
                (t.style["webkit" + i] = s),
                (t.style["moz" + i] = s),
                (t.style["ms" + i] = s),
                (t.style["o" + i] = s))
              : (t.style[i] = s);
          }),
          (t.prototype._getFirstEl = function () {
            return this.selector && void 0 !== this.selector.length
              ? this.selector[0]
              : this.selector;
          }),
          (t.prototype.isEventMatched = function (t, e) {
            var s = e.split(".");
            return t
              .split(".")
              .filter(function (t) {
                return t;
              })
              .every(function (t) {
                return -1 !== s.indexOf(t);
              });
          }),
          (t.prototype.attr = function (t, e) {
            return void 0 === e
              ? this.firstElement
                ? this.firstElement.getAttribute(t)
                : ""
              : (this._each(function (s) {
                  s.setAttribute(t, e);
                }),
                this);
          }),
          (t.prototype.find = function (t) {
            return Jt(this._getSelector(t, this.selector));
          }),
          (t.prototype.first = function () {
            return this.selector && void 0 !== this.selector.length
              ? Jt(this.selector[0])
              : Jt(this.selector);
          }),
          (t.prototype.eq = function (t) {
            return Jt(this.selector[t]);
          }),
          (t.prototype.parent = function () {
            return Jt(this.selector.parentElement);
          }),
          (t.prototype.get = function () {
            return this._getFirstEl();
          }),
          (t.prototype.removeAttr = function (t) {
            var e = t.split(" ");
            return (
              this._each(function (t) {
                e.forEach(function (e) {
                  return t.removeAttribute(e);
                });
              }),
              this
            );
          }),
          (t.prototype.wrap = function (t) {
            if (!this.firstElement) return this;
            var e = document.createElement("div");
            return (
              (e.className = t),
              this.firstElement.parentNode.insertBefore(e, this.firstElement),
              this.firstElement.parentNode.removeChild(this.firstElement),
              e.appendChild(this.firstElement),
              this
            );
          }),
          (t.prototype.addClass = function (t) {
            return (
              void 0 === t && (t = ""),
              this._each(function (e) {
                t.split(" ").forEach(function (t) {
                  t && e.classList.add(t);
                });
              }),
              this
            );
          }),
          (t.prototype.removeClass = function (t) {
            return (
              this._each(function (e) {
                t.split(" ").forEach(function (t) {
                  t && e.classList.remove(t);
                });
              }),
              this
            );
          }),
          (t.prototype.hasClass = function (t) {
            return (
              !!this.firstElement && this.firstElement.classList.contains(t)
            );
          }),
          (t.prototype.hasAttribute = function (t) {
            return !!this.firstElement && this.firstElement.hasAttribute(t);
          }),
          (t.prototype.toggleClass = function (t) {
            return this.firstElement
              ? (this.hasClass(t) ? this.removeClass(t) : this.addClass(t),
                this)
              : this;
          }),
          (t.prototype.css = function (t, e) {
            var s = this;
            return (
              this._each(function (i) {
                s._setCssVendorPrefix(i, t, e);
              }),
              this
            );
          }),
          (t.prototype.on = function (e, s) {
            var i = this;
            return this.selector
              ? (e.split(" ").forEach(function (e) {
                  Array.isArray(t.eventListeners[e]) ||
                    (t.eventListeners[e] = []),
                    t.eventListeners[e].push(s),
                    i.selector.addEventListener(e.split(".")[0], s);
                }),
                this)
              : this;
          }),
          (t.prototype.once = function (t, e) {
            var s = this;
            return (
              this.on(t, function () {
                s.off(t), e(t);
              }),
              this
            );
          }),
          (t.prototype.off = function (e) {
            var s = this;
            return this.selector
              ? (Object.keys(t.eventListeners).forEach(function (i) {
                  s.isEventMatched(e, i) &&
                    (t.eventListeners[i].forEach(function (t) {
                      s.selector.removeEventListener(i.split(".")[0], t);
                    }),
                    (t.eventListeners[i] = []));
                }),
                this)
              : this;
          }),
          (t.prototype.trigger = function (t, e) {
            if (!this.firstElement) return this;
            var s = new CustomEvent(t.split(".")[0], { detail: e || null });
            return this.firstElement.dispatchEvent(s), this;
          }),
          (t.prototype.load = function (t) {
            var e = this;
            return (
              fetch(t)
                .then(function (t) {
                  return t.text();
                })
                .then(function (t) {
                  e.selector.innerHTML = t;
                }),
              this
            );
          }),
          (t.prototype.html = function (t) {
            return void 0 === t
              ? this.firstElement
                ? this.firstElement.innerHTML
                : ""
              : (this._each(function (e) {
                  e.innerHTML = t;
                }),
                this);
          }),
          (t.prototype.append = function (t) {
            return (
              this._each(function (e) {
                "string" == typeof t
                  ? e.insertAdjacentHTML("beforeend", t)
                  : e.appendChild(t);
              }),
              this
            );
          }),
          (t.prototype.prepend = function (t) {
            return (
              this._each(function (e) {
                e.insertAdjacentHTML("afterbegin", t);
              }),
              this
            );
          }),
          (t.prototype.remove = function () {
            return (
              this._each(function (t) {
                t.parentNode.removeChild(t);
              }),
              this
            );
          }),
          (t.prototype.empty = function () {
            return (
              this._each(function (t) {
                t.innerHTML = "";
              }),
              this
            );
          }),
          (t.prototype.scrollTop = function (t) {
            return void 0 !== t
              ? ((document.body.scrollTop = t),
                (document.documentElement.scrollTop = t),
                this)
              : window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0;
          }),
          (t.prototype.scrollLeft = function (t) {
            return void 0 !== t
              ? ((document.body.scrollLeft = t),
                (document.documentElement.scrollLeft = t),
                this)
              : window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft ||
                  0;
          }),
          (t.prototype.offset = function () {
            if (!this.firstElement) return { left: 0, top: 0 };
            var t = this.firstElement.getBoundingClientRect(),
              e = Jt("body").style().marginLeft;
            return {
              left: t.left - parseFloat(e) + this.scrollLeft(),
              top: t.top + this.scrollTop(),
            };
          }),
          (t.prototype.style = function () {
            return this.firstElement
              ? this.firstElement.currentStyle ||
                  window.getComputedStyle(this.firstElement)
              : {};
          }),
          (t.prototype.width = function () {
            var t = this.style();
            return (
              this.firstElement.clientWidth -
              parseFloat(t.paddingLeft) -
              parseFloat(t.paddingRight)
            );
          }),
          (t.prototype.height = function () {
            var t = this.style();
            return (
              this.firstElement.clientHeight -
              parseFloat(t.paddingTop) -
              parseFloat(t.paddingBottom)
            );
          }),
          (t.eventListeners = {}),
          t
        );
      })();
      function Jt(t) {
        return (
          (function () {
            if ("function" == typeof window.CustomEvent) return !1;
            window.CustomEvent = function (t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: null };
              var s = document.createEvent("CustomEvent");
              return s.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), s;
            };
          })(),
          Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
          new Zt(t)
        );
      }
      var te = [
        "src",
        "sources",
        "subHtml",
        "subHtmlUrl",
        "html",
        "video",
        "poster",
        "slideName",
        "responsive",
        "srcset",
        "sizes",
        "iframe",
        "downloadUrl",
        "download",
        "width",
        "facebookShareUrl",
        "tweetText",
        "iframeTitle",
        "twitterShareUrl",
        "pinterestShareUrl",
        "pinterestText",
        "fbHtml",
        "disqusIdentifier",
        "disqusUrl",
      ];
      function ee(t) {
        return "href" === t
          ? "src"
          : (t = (t =
              (t = t.replace("data-", "")).charAt(0).toLowerCase() +
              t.slice(1)).replace(/-([a-z])/g, function (t) {
              return t[1].toUpperCase();
            }));
      }
      var se = function (t, e, s, i) {
          void 0 === s && (s = 0);
          var n = Jt(t).attr("data-lg-size") || i;
          if (n) {
            var r = n.split(",");
            if (r[1])
              for (var a = window.innerWidth, o = 0; o < r.length; o++) {
                var l = r[o];
                if (parseInt(l.split("-")[2], 10) > a) {
                  n = l;
                  break;
                }
                o === r.length - 1 && (n = l);
              }
            var c = n.split("-"),
              d = parseInt(c[0], 10),
              u = parseInt(c[1], 10),
              p = e.width(),
              h = e.height() - s,
              m = Math.min(p, d),
              f = Math.min(h, u),
              g = Math.min(m / d, f / u);
            return { width: d * g, height: u * g };
          }
        },
        ie = function (t, e, s, i, n) {
          if (n) {
            var r = Jt(t).find("img").first();
            if (r.get()) {
              var a = e.get().getBoundingClientRect(),
                o = a.width,
                l = e.height() - (s + i),
                c = r.width(),
                d = r.height(),
                u = r.style(),
                p =
                  (o - c) / 2 -
                  r.offset().left +
                  (parseFloat(u.paddingLeft) || 0) +
                  (parseFloat(u.borderLeft) || 0) +
                  Jt(window).scrollLeft() +
                  a.left,
                h =
                  (l - d) / 2 -
                  r.offset().top +
                  (parseFloat(u.paddingTop) || 0) +
                  (parseFloat(u.borderTop) || 0) +
                  Jt(window).scrollTop() +
                  s;
              return (
                "translate3d(" +
                (p *= -1) +
                "px, " +
                (h *= -1) +
                "px, 0) scale3d(" +
                c / n.width +
                ", " +
                d / n.height +
                ", 1)"
              );
            }
          }
        },
        ne = function (t, e, s, i, n, r) {
          return (
            '<div class="lg-video-cont lg-has-iframe" style="width:' +
            t +
            "; max-width:" +
            s +
            "; height: " +
            e +
            "; max-height:" +
            i +
            '">\n                    <iframe class="lg-object" frameborder="0" ' +
            (r ? 'title="' + r + '"' : "") +
            ' src="' +
            n +
            '"  allowfullscreen="true"></iframe>\n                </div>'
          );
        },
        re = function (t, e, s, i, n, r) {
          var a =
              "<img " +
              s +
              " " +
              (i ? 'srcset="' + i + '"' : "") +
              "  " +
              (n ? 'sizes="' + n + '"' : "") +
              ' class="lg-object lg-image" data-index="' +
              t +
              '" src="' +
              e +
              '" />',
            o = "";
          r &&
            (o = ("string" == typeof r ? JSON.parse(r) : r).map(function (t) {
              var e = "";
              return (
                Object.keys(t).forEach(function (s) {
                  e += " " + s + '="' + t[s] + '"';
                }),
                "<source " + e + "></source>"
              );
            }));
          return "" + o + a;
        },
        ae = function (t) {
          for (var e = [], s = [], i = "", n = 0; n < t.length; n++) {
            var r = t[n].split(" ");
            "" === r[0] && r.splice(0, 1), s.push(r[0]), e.push(r[1]);
          }
          for (var a = window.innerWidth, o = 0; o < e.length; o++)
            if (parseInt(e[o], 10) > a) {
              i = s[o];
              break;
            }
          return i;
        },
        oe = function (t) {
          return !!t && !!t.complete && 0 !== t.naturalWidth;
        },
        le = function (t, e, s, i, n) {
          return (
            '<div class="lg-video-cont ' +
            (n && n.youtube
              ? "lg-has-youtube"
              : n && n.vimeo
              ? "lg-has-vimeo"
              : "lg-has-html5") +
            '" style="' +
            s +
            '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
            i +
            '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
            i +
            '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
            (e || "") +
            '\n            <img class="lg-object lg-video-poster" src="' +
            t +
            '" />\n        </div>'
          );
        },
        ce = function (t) {
          var e = t.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
          );
          return [].filter.call(e, function (t) {
            var e = window.getComputedStyle(t);
            return "none" !== e.display && "hidden" !== e.visibility;
          });
        },
        de = function (t, e, s, i) {
          var n = [],
            r = (function () {
              for (var t = 0, e = 0, s = arguments.length; e < s; e++)
                t += arguments[e].length;
              var i = Array(t),
                n = 0;
              for (e = 0; e < s; e++)
                for (var r = arguments[e], a = 0, o = r.length; a < o; a++, n++)
                  i[n] = r[a];
              return i;
            })(te, e);
          return (
            [].forEach.call(t, function (t) {
              for (var e = {}, a = 0; a < t.attributes.length; a++) {
                var o = t.attributes[a];
                if (o.specified) {
                  var l = ee(o.name),
                    c = "";
                  r.indexOf(l) > -1 && (c = l), c && (e[c] = o.value);
                }
              }
              var d = Jt(t),
                u = d.find("img").first().attr("alt"),
                p = d.attr("title"),
                h = i ? d.attr(i) : d.find("img").first().attr("src");
              (e.thumb = h),
                s && !e.subHtml && (e.subHtml = p || u || ""),
                (e.alt = u || p || ""),
                n.push(e);
            }),
            n
          );
        },
        ue = function () {
          return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        pe = function (t, e, s) {
          if (!t)
            return e
              ? { html5: !0 }
              : void console.error(
                  "lightGallery :- data-src is not provided on slide item " +
                    (s + 1) +
                    ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
                );
          var i = t.match(
              /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
            ),
            n = t.match(
              /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
            ),
            r = t.match(
              /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
            );
          return i
            ? { youtube: i }
            : n
            ? { vimeo: n }
            : r
            ? { wistia: r }
            : void 0;
        },
        he = 0,
        me = (function () {
          function t(t, e) {
            if (
              ((this.lgOpened = !1),
              (this.index = 0),
              (this.plugins = []),
              (this.lGalleryOn = !1),
              (this.lgBusy = !1),
              (this.currentItemsInDom = []),
              (this.prevScrollTop = 0),
              (this.bodyPaddingRight = 0),
              (this.isDummyImageRemoved = !1),
              (this.dragOrSwipeEnabled = !1),
              (this.mediaContainerPosition = { top: 0, bottom: 0 }),
              !t)
            )
              return this;
            if (
              (he++,
              (this.lgId = he),
              (this.el = t),
              (this.LGel = Jt(t)),
              this.generateSettings(e),
              this.buildModules(),
              this.settings.dynamic &&
                void 0 !== this.settings.dynamicEl &&
                !Array.isArray(this.settings.dynamicEl))
            )
              throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return (
              (this.galleryItems = this.getItems()),
              this.normalizeSettings(),
              this.init(),
              this.validateLicense(),
              this
            );
          }
          return (
            (t.prototype.generateSettings = function (t) {
              if (
                ((this.settings = Mt(Mt({}, Kt), t)),
                this.settings.isMobile &&
                "function" == typeof this.settings.isMobile
                  ? this.settings.isMobile()
                  : ue())
              ) {
                var e = Mt(
                  Mt({}, this.settings.mobileSettings),
                  this.settings.mobileSettings
                );
                this.settings = Mt(Mt({}, this.settings), e);
              }
            }),
            (t.prototype.normalizeSettings = function () {
              this.settings.slideEndAnimation &&
                (this.settings.hideControlOnEnd = !1),
                this.settings.closable || (this.settings.swipeToClose = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                this.settings.dynamic && (this.zoomFromOrigin = !1),
                this.settings.container ||
                  (this.settings.container = document.body),
                (this.settings.preload = Math.min(
                  this.settings.preload,
                  this.galleryItems.length
                ));
            }),
            (t.prototype.init = function () {
              var t = this;
              this.addSlideVideoInfo(this.galleryItems),
                this.buildStructure(),
                this.LGel.trigger($t, { instance: this }),
                this.settings.keyPress && this.keyPress(),
                setTimeout(function () {
                  t.enableDrag(), t.enableSwipe(), t.triggerPosterClick();
                }, 50),
                this.arrow(),
                this.settings.mousewheel && this.mousewheel(),
                this.settings.dynamic || this.openGalleryOnItemClick();
            }),
            (t.prototype.openGalleryOnItemClick = function () {
              for (
                var t = this,
                  e = function (e) {
                    var i = s.items[e],
                      n = Jt(i),
                      r = Zt.generateUUID();
                    n.attr("data-lg-id", r).on(
                      "click.lgcustom-item-" + r,
                      function (s) {
                        s.preventDefault();
                        var n = t.settings.index || e;
                        t.openGallery(n, i);
                      }
                    );
                  },
                  s = this,
                  i = 0;
                i < this.items.length;
                i++
              )
                e(i);
            }),
            (t.prototype.buildModules = function () {
              var t = this;
              this.settings.plugins.forEach(function (e) {
                t.plugins.push(new e(t, Jt));
              });
            }),
            (t.prototype.validateLicense = function () {
              this.settings.licenseKey
                ? "0000-0000-000-0000" === this.settings.licenseKey &&
                  console.warn(
                    "lightGallery: " +
                      this.settings.licenseKey +
                      " license key is not valid for production use"
                  )
                : console.error("Please provide a valid license key");
            }),
            (t.prototype.getSlideItem = function (t) {
              return Jt(this.getSlideItemId(t));
            }),
            (t.prototype.getSlideItemId = function (t) {
              return "#lg-item-" + this.lgId + "-" + t;
            }),
            (t.prototype.getIdName = function (t) {
              return t + "-" + this.lgId;
            }),
            (t.prototype.getElementById = function (t) {
              return Jt("#" + this.getIdName(t));
            }),
            (t.prototype.manageSingleSlideClassName = function () {
              this.galleryItems.length < 2
                ? this.outer.addClass("lg-single-item")
                : this.outer.removeClass("lg-single-item");
            }),
            (t.prototype.buildStructure = function () {
              var t = this;
              if (!(this.$container && this.$container.get())) {
                var e = "",
                  s = "";
                this.settings.controls &&
                  (e =
                    '<button type="button" id="' +
                    this.getIdName("lg-prev") +
                    '" aria-label="' +
                    this.settings.strings.previousSlide +
                    '" class="lg-prev lg-icon"> ' +
                    this.settings.prevHtml +
                    ' </button>\n                <button type="button" id="' +
                    this.getIdName("lg-next") +
                    '" aria-label="' +
                    this.settings.strings.nextSlide +
                    '" class="lg-next lg-icon"> ' +
                    this.settings.nextHtml +
                    " </button>"),
                  ".lg-item" !== this.settings.appendSubHtmlTo &&
                    (s =
                      '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
                var i = "";
                this.settings.allowMediaOverlap && (i += "lg-media-overlap ");
                var n = this.settings.ariaLabelledby
                    ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                    : "",
                  r = this.settings.ariaDescribedby
                    ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                    : "",
                  a =
                    "lg-container " +
                    this.settings.addClass +
                    " " +
                    (document.body !== this.settings.container
                      ? "lg-inline"
                      : ""),
                  o =
                    this.settings.closable && this.settings.showCloseIcon
                      ? '<button type="button" aria-label="' +
                        this.settings.strings.closeGallery +
                        '" id="' +
                        this.getIdName("lg-close") +
                        '" class="lg-close lg-icon"></button>'
                      : "",
                  l = this.settings.showMaximizeIcon
                    ? '<button type="button" aria-label="' +
                      this.settings.strings.toggleMaximize +
                      '" id="' +
                      this.getIdName("lg-maximize") +
                      '" class="lg-maximize lg-icon"></button>'
                    : "",
                  c =
                    '\n        <div class="' +
                    a +
                    '" id="' +
                    this.getIdName("lg-container") +
                    '" tabindex="-1" aria-modal="true" ' +
                    n +
                    " " +
                    r +
                    ' role="dialog"\n        >\n            <div id="' +
                    this.getIdName("lg-backdrop") +
                    '" class="lg-backdrop"></div>\n\n            <div id="' +
                    this.getIdName("lg-outer") +
                    '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                    i +
                    ' ">\n\n              <div id="' +
                    this.getIdName("lg-content") +
                    '" class="lg-content">\n                <div id="' +
                    this.getIdName("lg-inner") +
                    '" class="lg-inner">\n                </div>\n                ' +
                    e +
                    '\n              </div>\n                <div id="' +
                    this.getIdName("lg-toolbar") +
                    '" class="lg-toolbar lg-group">\n                    ' +
                    l +
                    "\n                    " +
                    o +
                    "\n                    </div>\n                    " +
                    (".lg-outer" === this.settings.appendSubHtmlTo ? s : "") +
                    '\n                <div id="' +
                    this.getIdName("lg-components") +
                    '" class="lg-components">\n                    ' +
                    (".lg-sub-html" === this.settings.appendSubHtmlTo
                      ? s
                      : "") +
                    "\n                </div>\n            </div>\n        </div>\n        ";
                Jt(this.settings.container).append(c),
                  document.body !== this.settings.container &&
                    Jt(this.settings.container).css("position", "relative"),
                  (this.outer = this.getElementById("lg-outer")),
                  (this.$lgComponents = this.getElementById("lg-components")),
                  (this.$backdrop = this.getElementById("lg-backdrop")),
                  (this.$container = this.getElementById("lg-container")),
                  (this.$inner = this.getElementById("lg-inner")),
                  (this.$content = this.getElementById("lg-content")),
                  (this.$toolbar = this.getElementById("lg-toolbar")),
                  this.$backdrop.css(
                    "transition-duration",
                    this.settings.backdropDuration + "ms"
                  );
                var d = this.settings.mode + " ";
                this.manageSingleSlideClassName(),
                  this.settings.enableDrag && (d += "lg-grab "),
                  this.outer.addClass(d),
                  this.$inner.css(
                    "transition-timing-function",
                    this.settings.easing
                  ),
                  this.$inner.css(
                    "transition-duration",
                    this.settings.speed + "ms"
                  ),
                  this.settings.download &&
                    this.$toolbar.append(
                      '<a id="' +
                        this.getIdName("lg-download") +
                        '" target="_blank" rel="noopener" aria-label="' +
                        this.settings.strings.download +
                        '" download class="lg-download lg-icon"></a>'
                    ),
                  this.counter(),
                  Jt(window).on(
                    "resize.lg.global" +
                      this.lgId +
                      " orientationchange.lg.global" +
                      this.lgId,
                    function () {
                      t.refreshOnResize();
                    }
                  ),
                  this.hideBars(),
                  this.manageCloseGallery(),
                  this.toggleMaximize(),
                  this.initModules();
              }
            }),
            (t.prototype.refreshOnResize = function () {
              if (this.lgOpened) {
                var t = this.galleryItems[this.index].__slideVideoInfo;
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var e = this.mediaContainerPosition,
                  s = e.top,
                  i = e.bottom;
                if (
                  ((this.currentImageSize = se(
                    this.items[this.index],
                    this.outer,
                    s + i,
                    t && this.settings.videoMaxSize
                  )),
                  t && this.resizeVideoSlide(this.index, this.currentImageSize),
                  this.zoomFromOrigin && !this.isDummyImageRemoved)
                ) {
                  var n = this.getDummyImgStyles(this.currentImageSize);
                  this.outer
                    .find(".lg-current .lg-dummy-img")
                    .first()
                    .attr("style", n);
                }
                this.LGel.trigger(Dt);
              }
            }),
            (t.prototype.resizeVideoSlide = function (t, e) {
              var s = this.getVideoContStyle(e);
              this.getSlideItem(t).find(".lg-video-cont").attr("style", s);
            }),
            (t.prototype.updateSlides = function (t, e) {
              if (
                (this.index > t.length - 1 && (this.index = t.length - 1),
                1 === t.length && (this.index = 0),
                t.length)
              ) {
                var s = this.galleryItems[e].src;
                (this.galleryItems = t),
                  this.updateControls(),
                  this.$inner.empty(),
                  (this.currentItemsInDom = []);
                var i = 0;
                this.galleryItems.some(function (t, e) {
                  return t.src === s && ((i = e), !0);
                }),
                  (this.currentItemsInDom = this.organizeSlideItems(i, -1)),
                  this.loadContent(i, !0),
                  this.getSlideItem(i).addClass("lg-current"),
                  (this.index = i),
                  this.updateCurrentCounter(i),
                  this.LGel.trigger(zt);
              } else this.closeGallery();
            }),
            (t.prototype.getItems = function () {
              if (((this.items = []), this.settings.dynamic))
                return this.settings.dynamicEl || [];
              if ("this" === this.settings.selector) this.items.push(this.el);
              else if (this.settings.selector)
                if ("string" == typeof this.settings.selector)
                  if (this.settings.selectWithin) {
                    var t = Jt(this.settings.selectWithin);
                    this.items = t.find(this.settings.selector).get();
                  } else
                    this.items = this.el.querySelectorAll(
                      this.settings.selector
                    );
                else this.items = this.settings.selector;
              else this.items = this.el.children;
              return de(
                this.items,
                this.settings.extraProps,
                this.settings.getCaptionFromTitleOrAlt,
                this.settings.exThumbImage
              );
            }),
            (t.prototype.shouldHideScrollbar = function () {
              return (
                this.settings.hideScrollbar &&
                document.body === this.settings.container
              );
            }),
            (t.prototype.hideScrollbar = function () {
              if (this.shouldHideScrollbar()) {
                this.bodyPaddingRight = parseFloat(
                  Jt("body").style().paddingRight
                );
                var t = document.documentElement.getBoundingClientRect(),
                  e = window.innerWidth - t.width;
                Jt(document.body).css(
                  "padding-right",
                  e + this.bodyPaddingRight + "px"
                ),
                  Jt(document.body).addClass("lg-overlay-open");
              }
            }),
            (t.prototype.resetScrollBar = function () {
              this.shouldHideScrollbar() &&
                (Jt(document.body).css(
                  "padding-right",
                  this.bodyPaddingRight + "px"
                ),
                Jt(document.body).removeClass("lg-overlay-open"));
            }),
            (t.prototype.openGallery = function (t, e) {
              var s = this;
              if ((void 0 === t && (t = this.settings.index), !this.lgOpened)) {
                (this.lgOpened = !0),
                  this.outer.removeClass("lg-hide-items"),
                  this.hideScrollbar(),
                  this.$container.addClass("lg-show");
                var i = this.getItemsToBeInsertedToDom(t, t);
                this.currentItemsInDom = i;
                var n = "";
                i.forEach(function (t) {
                  n = n + '<div id="' + t + '" class="lg-item"></div>';
                }),
                  this.$inner.append(n),
                  this.addHtml(t);
                var r = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var a = this.mediaContainerPosition,
                  o = a.top,
                  l = a.bottom;
                this.settings.allowMediaOverlap ||
                  this.setMediaContainerPosition(o, l);
                var c = this.galleryItems[t].__slideVideoInfo;
                this.zoomFromOrigin &&
                  e &&
                  ((this.currentImageSize = se(
                    e,
                    this.outer,
                    o + l,
                    c && this.settings.videoMaxSize
                  )),
                  (r = ie(e, this.outer, o, l, this.currentImageSize))),
                  (this.zoomFromOrigin && r) ||
                    (this.outer.addClass(this.settings.startClass),
                    this.getSlideItem(t).removeClass("lg-complete"));
                var d = this.settings.zoomFromOrigin
                  ? 100
                  : this.settings.backdropDuration;
                setTimeout(function () {
                  s.outer.addClass("lg-components-open");
                }, d),
                  (this.index = t),
                  this.LGel.trigger(Bt),
                  this.getSlideItem(t).addClass("lg-current"),
                  (this.lGalleryOn = !1),
                  (this.prevScrollTop = Jt(window).scrollTop()),
                  setTimeout(function () {
                    if (s.zoomFromOrigin && r) {
                      var e = s.getSlideItem(t);
                      e.css("transform", r),
                        setTimeout(function () {
                          e
                            .addClass("lg-start-progress lg-start-end-progress")
                            .css(
                              "transition-duration",
                              s.settings.startAnimationDuration + "ms"
                            ),
                            s.outer.addClass("lg-zoom-from-image");
                        }),
                        setTimeout(function () {
                          e.css("transform", "translate3d(0, 0, 0)");
                        }, 100);
                    }
                    setTimeout(function () {
                      s.$backdrop.addClass("in"),
                        s.$container.addClass("lg-show-in");
                    }, 10),
                      setTimeout(function () {
                        s.settings.trapFocus &&
                          document.body === s.settings.container &&
                          s.trapFocus();
                      }, s.settings.backdropDuration + 50),
                      (s.zoomFromOrigin && r) ||
                        setTimeout(function () {
                          s.outer.addClass("lg-visible");
                        }, s.settings.backdropDuration),
                      s.slide(t, !1, !1, !1),
                      s.LGel.trigger(Nt);
                  }),
                  document.body === this.settings.container &&
                    Jt("html").addClass("lg-on");
              }
            }),
            (t.prototype.getMediaContainerPosition = function () {
              if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
              var t = this.$toolbar.get().clientHeight || 0,
                e = this.outer.find(".lg-components .lg-sub-html").get(),
                s =
                  this.settings.defaultCaptionHeight ||
                  (e && e.clientHeight) ||
                  0,
                i = this.outer.find(".lg-thumb-outer").get();
              return { top: t, bottom: (i ? i.clientHeight : 0) + s };
            }),
            (t.prototype.setMediaContainerPosition = function (t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                this.$content.css("top", t + "px").css("bottom", e + "px");
            }),
            (t.prototype.hideBars = function () {
              var t = this;
              setTimeout(function () {
                t.outer.removeClass("lg-hide-items"),
                  t.settings.hideBarsDelay > 0 &&
                    (t.outer.on(
                      "mousemove.lg click.lg touchstart.lg",
                      function () {
                        t.outer.removeClass("lg-hide-items"),
                          clearTimeout(t.hideBarTimeout),
                          (t.hideBarTimeout = setTimeout(function () {
                            t.outer.addClass("lg-hide-items");
                          }, t.settings.hideBarsDelay));
                      }
                    ),
                    t.outer.trigger("mousemove.lg"));
              }, this.settings.showBarsAfter);
            }),
            (t.prototype.initPictureFill = function (t) {
              if (this.settings.supportLegacyBrowser)
                try {
                  picturefill({ elements: [t.get()] });
                } catch (t) {
                  console.warn(
                    "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                  );
                }
            }),
            (t.prototype.counter = function () {
              if (this.settings.counter) {
                var t =
                  '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                  this.getIdName("lg-counter-current") +
                  '" class="lg-counter-current">' +
                  (this.index + 1) +
                  ' </span> /\n                <span id="' +
                  this.getIdName("lg-counter-all") +
                  '" class="lg-counter-all">' +
                  this.galleryItems.length +
                  " </span></div>";
                this.outer.find(this.settings.appendCounterTo).append(t);
              }
            }),
            (t.prototype.addHtml = function (t) {
              var e, s;
              if (
                (this.galleryItems[t].subHtmlUrl
                  ? (s = this.galleryItems[t].subHtmlUrl)
                  : (e = this.galleryItems[t].subHtml),
                !s)
              )
                if (e) {
                  var i = e.substring(0, 1);
                  ("." !== i && "#" !== i) ||
                    (e =
                      this.settings.subHtmlSelectorRelative &&
                      !this.settings.dynamic
                        ? Jt(this.items).eq(t).find(e).first().html()
                        : Jt(e).first().html());
                } else e = "";
              if (".lg-item" !== this.settings.appendSubHtmlTo)
                s
                  ? this.outer.find(".lg-sub-html").load(s)
                  : this.outer.find(".lg-sub-html").html(e);
              else {
                var n = Jt(this.getSlideItemId(t));
                s
                  ? n.load(s)
                  : n.append('<div class="lg-sub-html">' + e + "</div>");
              }
              null != e &&
                ("" === e
                  ? this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .addClass("lg-empty-html")
                  : this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .removeClass("lg-empty-html")),
                this.LGel.trigger(qt, { index: t });
            }),
            (t.prototype.preload = function (t) {
              for (
                var e = 1;
                e <= this.settings.preload &&
                !(e >= this.galleryItems.length - t);
                e++
              )
                this.loadContent(t + e, !1);
              for (var s = 1; s <= this.settings.preload && !(t - s < 0); s++)
                this.loadContent(t - s, !1);
            }),
            (t.prototype.getDummyImgStyles = function (t) {
              return t
                ? "width:" +
                    t.width +
                    "px;\n                margin-left: -" +
                    t.width / 2 +
                    "px;\n                margin-top: -" +
                    t.height / 2 +
                    "px;\n                height:" +
                    t.height +
                    "px"
                : "";
            }),
            (t.prototype.getVideoContStyle = function (t) {
              return t
                ? "width:" +
                    t.width +
                    "px;\n                height:" +
                    t.height +
                    "px"
                : "";
            }),
            (t.prototype.getDummyImageContent = function (t, e, s) {
              var i;
              if ((this.settings.dynamic || (i = Jt(this.items).eq(e)), i)) {
                var n = void 0;
                if (
                  !(n = this.settings.exThumbImage
                    ? i.attr(this.settings.exThumbImage)
                    : i.find("img").first().attr("src"))
                )
                  return "";
                var r =
                  "<img " +
                  s +
                  ' style="' +
                  this.getDummyImgStyles(this.currentImageSize) +
                  '" class="lg-dummy-img" src="' +
                  n +
                  '" />';
                return (
                  t.addClass("lg-first-slide"),
                  this.outer.addClass("lg-first-slide-loading"),
                  r
                );
              }
              return "";
            }),
            (t.prototype.setImgMarkup = function (t, e, s) {
              var i = this.galleryItems[s],
                n = i.alt,
                r = i.srcset,
                a = i.sizes,
                o = i.sources,
                l = n ? 'alt="' + n + '"' : "",
                c =
                  '<picture class="lg-img-wrap"> ' +
                  (this.isFirstSlideWithZoomAnimation()
                    ? this.getDummyImageContent(e, s, l)
                    : re(s, t, l, r, a, o)) +
                  "</picture>";
              e.prepend(c);
            }),
            (t.prototype.onSlideObjectLoad = function (t, e, s, i) {
              var n = t.find(".lg-object").first();
              oe(n.get()) || e
                ? s()
                : (n.on("load.lg error.lg", function () {
                    s && s();
                  }),
                  n.on("error.lg", function () {
                    i && i();
                  }));
            }),
            (t.prototype.onLgObjectLoad = function (t, e, s, i, n, r) {
              var a = this;
              this.onSlideObjectLoad(
                t,
                r,
                function () {
                  a.triggerSlideItemLoad(t, e, s, i, n);
                },
                function () {
                  t.addClass("lg-complete lg-complete_"),
                    t.html(
                      '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                    );
                }
              );
            }),
            (t.prototype.triggerSlideItemLoad = function (t, e, s, i, n) {
              var r = this,
                a = this.galleryItems[e],
                o = n && "video" === this.getSlideType(a) && !a.poster ? i : 0;
              setTimeout(function () {
                t.addClass("lg-complete lg-complete_"),
                  r.LGel.trigger(Ft, {
                    index: e,
                    delay: s || 0,
                    isFirstSlide: n,
                  });
              }, o);
            }),
            (t.prototype.isFirstSlideWithZoomAnimation = function () {
              return !(
                this.lGalleryOn ||
                !this.zoomFromOrigin ||
                !this.currentImageSize
              );
            }),
            (t.prototype.addSlideVideoInfo = function (t) {
              var e = this;
              t.forEach(function (t, s) {
                (t.__slideVideoInfo = pe(t.src, !!t.video, s)),
                  t.__slideVideoInfo &&
                    e.settings.loadYouTubePoster &&
                    !t.poster &&
                    t.__slideVideoInfo.youtube &&
                    (t.poster =
                      "//img.youtube.com/vi/" +
                      t.__slideVideoInfo.youtube[1] +
                      "/maxresdefault.jpg");
              });
            }),
            (t.prototype.loadContent = function (t, e) {
              var s = this,
                i = this.galleryItems[t],
                n = Jt(this.getSlideItemId(t)),
                r = i.poster,
                a = i.srcset,
                o = i.sizes,
                l = i.sources,
                c = i.src,
                d = i.video,
                u = d && "string" == typeof d ? JSON.parse(d) : d;
              if (i.responsive) {
                var p = i.responsive.split(",");
                c = ae(p) || c;
              }
              var h = i.__slideVideoInfo,
                m = "",
                f = !!i.iframe,
                g = !this.lGalleryOn,
                v = 0;
              if (
                (g &&
                  (v =
                    this.zoomFromOrigin && this.currentImageSize
                      ? this.settings.startAnimationDuration + 10
                      : this.settings.backdropDuration + 10),
                !n.hasClass("lg-loaded"))
              ) {
                if (h) {
                  var _ = this.mediaContainerPosition,
                    b = _.top,
                    y = _.bottom,
                    w = se(
                      this.items[t],
                      this.outer,
                      b + y,
                      h && this.settings.videoMaxSize
                    );
                  m = this.getVideoContStyle(w);
                }
                if (f) {
                  var S = ne(
                    this.settings.iframeWidth,
                    this.settings.iframeHeight,
                    this.settings.iframeMaxWidth,
                    this.settings.iframeMaxHeight,
                    c,
                    i.iframeTitle
                  );
                  n.prepend(S);
                } else if (r) {
                  var C = "";
                  g &&
                    this.zoomFromOrigin &&
                    this.currentImageSize &&
                    (C = this.getDummyImageContent(n, t, ""));
                  S = le(r, C || "", m, this.settings.strings.playVideo, h);
                  n.prepend(S);
                } else if (h) {
                  S = '<div class="lg-video-cont " style="' + m + '"></div>';
                  n.prepend(S);
                } else if ((this.setImgMarkup(c, n, t), a || l)) {
                  var x = n.find(".lg-object");
                  this.initPictureFill(x);
                }
                (r || h) &&
                  this.LGel.trigger(It, {
                    index: t,
                    src: c,
                    html5Video: u,
                    hasPoster: !!r,
                  }),
                  this.LGel.trigger(Pt, { index: t }),
                  this.lGalleryOn &&
                    ".lg-item" === this.settings.appendSubHtmlTo &&
                    this.addHtml(t);
              }
              var T = 0;
              v && !Jt(document.body).hasClass("lg-from-hash") && (T = v),
                this.isFirstSlideWithZoomAnimation() &&
                  (setTimeout(function () {
                    n.removeClass(
                      "lg-start-end-progress lg-start-progress"
                    ).removeAttr("style");
                  }, this.settings.startAnimationDuration + 100),
                  n.hasClass("lg-loaded") ||
                    setTimeout(function () {
                      if ("image" === s.getSlideType(i)) {
                        var e = i.alt,
                          d = e ? 'alt="' + e + '"' : "";
                        if (
                          (n
                            .find(".lg-img-wrap")
                            .append(re(t, c, d, a, o, i.sources)),
                          a || l)
                        ) {
                          var u = n.find(".lg-object");
                          s.initPictureFill(u);
                        }
                      }
                      ("image" === s.getSlideType(i) ||
                        ("video" === s.getSlideType(i) && r)) &&
                        (s.onLgObjectLoad(n, t, v, T, !0, !1),
                        s.onSlideObjectLoad(
                          n,
                          !(!h || !h.html5 || r),
                          function () {
                            s.loadContentOnFirstSlideLoad(t, n, T);
                          },
                          function () {
                            s.loadContentOnFirstSlideLoad(t, n, T);
                          }
                        ));
                    }, this.settings.startAnimationDuration + 100)),
                n.addClass("lg-loaded"),
                (this.isFirstSlideWithZoomAnimation() &&
                  ("video" !== this.getSlideType(i) || r)) ||
                  this.onLgObjectLoad(n, t, v, T, g, !(!h || !h.html5 || r)),
                (this.zoomFromOrigin && this.currentImageSize) ||
                  !n.hasClass("lg-complete_") ||
                  this.lGalleryOn ||
                  setTimeout(function () {
                    n.addClass("lg-complete");
                  }, this.settings.backdropDuration),
                (this.lGalleryOn = !0),
                !0 === e &&
                  (n.hasClass("lg-complete_")
                    ? this.preload(t)
                    : n
                        .find(".lg-object")
                        .first()
                        .on("load.lg error.lg", function () {
                          s.preload(t);
                        }));
            }),
            (t.prototype.loadContentOnFirstSlideLoad = function (t, e, s) {
              var i = this;
              setTimeout(function () {
                e.find(".lg-dummy-img").remove(),
                  e.removeClass("lg-first-slide"),
                  i.outer.removeClass("lg-first-slide-loading"),
                  (i.isDummyImageRemoved = !0),
                  i.preload(t);
              }, s + 300);
            }),
            (t.prototype.getItemsToBeInsertedToDom = function (t, e, s) {
              var i = this;
              void 0 === s && (s = 0);
              var n = [],
                r = Math.max(s, 3);
              r = Math.min(r, this.galleryItems.length);
              var a = "lg-item-" + this.lgId + "-" + e;
              if (this.galleryItems.length <= 3)
                return (
                  this.galleryItems.forEach(function (t, e) {
                    n.push("lg-item-" + i.lgId + "-" + e);
                  }),
                  n
                );
              if (t < (this.galleryItems.length - 1) / 2) {
                for (var o = t; o > t - r / 2 && o >= 0; o--)
                  n.push("lg-item-" + this.lgId + "-" + o);
                var l = n.length;
                for (o = 0; o < r - l; o++)
                  n.push("lg-item-" + this.lgId + "-" + (t + o + 1));
              } else {
                for (
                  o = t;
                  o <= this.galleryItems.length - 1 && o < t + r / 2;
                  o++
                )
                  n.push("lg-item-" + this.lgId + "-" + o);
                for (l = n.length, o = 0; o < r - l; o++)
                  n.push("lg-item-" + this.lgId + "-" + (t - o - 1));
              }
              return (
                this.settings.loop &&
                  (t === this.galleryItems.length - 1
                    ? n.push("lg-item-" + this.lgId + "-0")
                    : 0 === t &&
                      n.push(
                        "lg-item-" +
                          this.lgId +
                          "-" +
                          (this.galleryItems.length - 1)
                      )),
                -1 === n.indexOf(a) && n.push("lg-item-" + this.lgId + "-" + e),
                n
              );
            }),
            (t.prototype.organizeSlideItems = function (t, e) {
              var s = this,
                i = this.getItemsToBeInsertedToDom(
                  t,
                  e,
                  this.settings.numberOfSlideItemsInDom
                );
              return (
                i.forEach(function (t) {
                  -1 === s.currentItemsInDom.indexOf(t) &&
                    s.$inner.append(
                      '<div id="' + t + '" class="lg-item"></div>'
                    );
                }),
                this.currentItemsInDom.forEach(function (t) {
                  -1 === i.indexOf(t) && Jt("#" + t).remove();
                }),
                i
              );
            }),
            (t.prototype.getPreviousSlideIndex = function () {
              var t = 0;
              try {
                var e = this.outer.find(".lg-current").first().attr("id");
                t = parseInt(e.split("-")[3]) || 0;
              } catch (e) {
                t = 0;
              }
              return t;
            }),
            (t.prototype.setDownloadValue = function (t) {
              if (this.settings.download) {
                var e = this.galleryItems[t];
                if (!1 === e.downloadUrl || "false" === e.downloadUrl)
                  this.outer.addClass("lg-hide-download");
                else {
                  var s = this.getElementById("lg-download");
                  this.outer.removeClass("lg-hide-download"),
                    s.attr("href", e.downloadUrl || e.src),
                    e.download && s.attr("download", e.download);
                }
              }
            }),
            (t.prototype.makeSlideAnimation = function (t, e, s) {
              var i = this;
              this.lGalleryOn && s.addClass("lg-slide-progress"),
                setTimeout(
                  function () {
                    i.outer.addClass("lg-no-trans"),
                      i.outer
                        .find(".lg-item")
                        .removeClass("lg-prev-slide lg-next-slide"),
                      "prev" === t
                        ? (e.addClass("lg-prev-slide"),
                          s.addClass("lg-next-slide"))
                        : (e.addClass("lg-next-slide"),
                          s.addClass("lg-prev-slide")),
                      setTimeout(function () {
                        i.outer.find(".lg-item").removeClass("lg-current"),
                          e.addClass("lg-current"),
                          i.outer.removeClass("lg-no-trans");
                      }, 50);
                  },
                  this.lGalleryOn ? this.settings.slideDelay : 0
                );
            }),
            (t.prototype.slide = function (t, e, s, i) {
              var n = this,
                r = this.getPreviousSlideIndex();
              if (
                ((this.currentItemsInDom = this.organizeSlideItems(t, r)),
                !this.lGalleryOn || r !== t)
              ) {
                var a = this.galleryItems.length;
                if (!this.lgBusy) {
                  this.settings.counter && this.updateCurrentCounter(t);
                  var o = this.getSlideItem(t),
                    l = this.getSlideItem(r),
                    c = this.galleryItems[t],
                    d = c.__slideVideoInfo;
                  if (
                    (this.outer.attr(
                      "data-lg-slide-type",
                      this.getSlideType(c)
                    ),
                    this.setDownloadValue(t),
                    d)
                  ) {
                    var u = this.mediaContainerPosition,
                      p = u.top,
                      h = u.bottom,
                      m = se(
                        this.items[t],
                        this.outer,
                        p + h,
                        d && this.settings.videoMaxSize
                      );
                    this.resizeVideoSlide(t, m);
                  }
                  if (
                    (this.LGel.trigger(Ht, {
                      prevIndex: r,
                      index: t,
                      fromTouch: !!e,
                      fromThumb: !!s,
                    }),
                    (this.lgBusy = !0),
                    clearTimeout(this.hideBarTimeout),
                    this.arrowDisable(t),
                    i || (t < r ? (i = "prev") : t > r && (i = "next")),
                    e)
                  ) {
                    this.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-current lg-next-slide");
                    var f = void 0,
                      g = void 0;
                    a > 2
                      ? ((f = t - 1),
                        (g = t + 1),
                        ((0 === t && r === a - 1) ||
                          (t === a - 1 && 0 === r)) &&
                          ((g = 0), (f = a - 1)))
                      : ((f = 0), (g = 1)),
                      "prev" === i
                        ? this.getSlideItem(g).addClass("lg-next-slide")
                        : this.getSlideItem(f).addClass("lg-prev-slide"),
                      o.addClass("lg-current");
                  } else this.makeSlideAnimation(i, o, l);
                  this.lGalleryOn
                    ? setTimeout(function () {
                        n.loadContent(t, !0),
                          ".lg-item" !== n.settings.appendSubHtmlTo &&
                            n.addHtml(t);
                      }, this.settings.speed +
                        50 +
                        (e ? 0 : this.settings.slideDelay))
                    : this.loadContent(t, !0),
                    setTimeout(function () {
                      (n.lgBusy = !1),
                        l.removeClass("lg-slide-progress"),
                        n.LGel.trigger(Gt, {
                          prevIndex: r,
                          index: t,
                          fromTouch: e,
                          fromThumb: s,
                        });
                    }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                      (e ? 0 : this.settings.slideDelay));
                }
                this.index = t;
              }
            }),
            (t.prototype.updateCurrentCounter = function (t) {
              this.getElementById("lg-counter-current").html(t + 1 + "");
            }),
            (t.prototype.updateCounterTotal = function () {
              this.getElementById("lg-counter-all").html(
                this.galleryItems.length + ""
              );
            }),
            (t.prototype.getSlideType = function (t) {
              return t.__slideVideoInfo
                ? "video"
                : t.iframe
                ? "iframe"
                : "image";
            }),
            (t.prototype.touchMove = function (t, e, s) {
              var i = e.pageX - t.pageX,
                n = e.pageY - t.pageY,
                r = !1;
              if (
                (this.swipeDirection
                  ? (r = !0)
                  : Math.abs(i) > 15
                  ? ((this.swipeDirection = "horizontal"), (r = !0))
                  : Math.abs(n) > 15 &&
                    ((this.swipeDirection = "vertical"), (r = !0)),
                r)
              ) {
                var a = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                  null == s || s.preventDefault(),
                    this.outer.addClass("lg-dragging"),
                    this.setTranslate(a, i, 0);
                  var o = a.get().offsetWidth,
                    l = (15 * o) / 100 - Math.abs((10 * i) / 100);
                  this.setTranslate(
                    this.outer.find(".lg-prev-slide").first(),
                    -o + i - l,
                    0
                  ),
                    this.setTranslate(
                      this.outer.find(".lg-next-slide").first(),
                      o + i + l,
                      0
                    );
                } else if (
                  "vertical" === this.swipeDirection &&
                  this.settings.swipeToClose
                ) {
                  null == s || s.preventDefault(),
                    this.$container.addClass("lg-dragging-vertical");
                  var c = 1 - Math.abs(n) / window.innerHeight;
                  this.$backdrop.css("opacity", c);
                  var d = 1 - Math.abs(n) / (2 * window.innerWidth);
                  this.setTranslate(a, 0, n, d, d),
                    Math.abs(n) > 100 &&
                      this.outer
                        .addClass("lg-hide-items")
                        .removeClass("lg-components-open");
                }
              }
            }),
            (t.prototype.touchEnd = function (t, e, s) {
              var i,
                n = this;
              "lg-slide" !== this.settings.mode &&
                this.outer.addClass("lg-slide"),
                setTimeout(function () {
                  n.$container.removeClass("lg-dragging-vertical"),
                    n.outer
                      .removeClass("lg-dragging lg-hide-items")
                      .addClass("lg-components-open");
                  var r = !0;
                  if ("horizontal" === n.swipeDirection) {
                    i = t.pageX - e.pageX;
                    var a = Math.abs(t.pageX - e.pageX);
                    i < 0 && a > n.settings.swipeThreshold
                      ? (n.goToNextSlide(!0), (r = !1))
                      : i > 0 &&
                        a > n.settings.swipeThreshold &&
                        (n.goToPrevSlide(!0), (r = !1));
                  } else if ("vertical" === n.swipeDirection) {
                    if (
                      ((i = Math.abs(t.pageY - e.pageY)),
                      n.settings.closable && n.settings.swipeToClose && i > 100)
                    )
                      return void n.closeGallery();
                    n.$backdrop.css("opacity", 1);
                  }
                  if (
                    (n.outer.find(".lg-item").removeAttr("style"),
                    r && Math.abs(t.pageX - e.pageX) < 5)
                  ) {
                    var o = Jt(s.target);
                    n.isPosterElement(o) && n.LGel.trigger(Vt);
                  }
                  n.swipeDirection = void 0;
                }),
                setTimeout(function () {
                  n.outer.hasClass("lg-dragging") ||
                    "lg-slide" === n.settings.mode ||
                    n.outer.removeClass("lg-slide");
                }, this.settings.speed + 100);
            }),
            (t.prototype.enableSwipe = function () {
              var t = this,
                e = {},
                s = {},
                i = !1,
                n = !1;
              this.settings.enableSwipe &&
                (this.$inner.on("touchstart.lg", function (s) {
                  t.dragOrSwipeEnabled = !0;
                  var i = t.getSlideItem(t.index);
                  (!Jt(s.target).hasClass("lg-item") &&
                    !i.get().contains(s.target)) ||
                    t.outer.hasClass("lg-zoomed") ||
                    t.lgBusy ||
                    1 !== s.targetTouches.length ||
                    ((n = !0),
                    (t.touchAction = "swipe"),
                    t.manageSwipeClass(),
                    (e = {
                      pageX: s.targetTouches[0].pageX,
                      pageY: s.targetTouches[0].pageY,
                    }));
                }),
                this.$inner.on("touchmove.lg", function (r) {
                  n &&
                    "swipe" === t.touchAction &&
                    1 === r.targetTouches.length &&
                    ((s = {
                      pageX: r.targetTouches[0].pageX,
                      pageY: r.targetTouches[0].pageY,
                    }),
                    t.touchMove(e, s, r),
                    (i = !0));
                }),
                this.$inner.on("touchend.lg", function (r) {
                  if ("swipe" === t.touchAction) {
                    if (i) (i = !1), t.touchEnd(s, e, r);
                    else if (n) {
                      var a = Jt(r.target);
                      t.isPosterElement(a) && t.LGel.trigger(Vt);
                    }
                    (t.touchAction = void 0), (n = !1);
                  }
                }));
            }),
            (t.prototype.enableDrag = function () {
              var t = this,
                e = {},
                s = {},
                i = !1,
                n = !1;
              this.settings.enableDrag &&
                (this.outer.on("mousedown.lg", function (s) {
                  t.dragOrSwipeEnabled = !0;
                  var n = t.getSlideItem(t.index);
                  (Jt(s.target).hasClass("lg-item") ||
                    n.get().contains(s.target)) &&
                    (t.outer.hasClass("lg-zoomed") ||
                      t.lgBusy ||
                      (s.preventDefault(),
                      t.lgBusy ||
                        (t.manageSwipeClass(),
                        (e = { pageX: s.pageX, pageY: s.pageY }),
                        (i = !0),
                        (t.outer.get().scrollLeft += 1),
                        (t.outer.get().scrollLeft -= 1),
                        t.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                        t.LGel.trigger(Rt))));
                }),
                Jt(window).on("mousemove.lg.global" + this.lgId, function (r) {
                  i &&
                    t.lgOpened &&
                    ((n = !0),
                    (s = { pageX: r.pageX, pageY: r.pageY }),
                    t.touchMove(e, s),
                    t.LGel.trigger(jt));
                }),
                Jt(window).on("mouseup.lg.global" + this.lgId, function (r) {
                  if (t.lgOpened) {
                    var a = Jt(r.target);
                    n
                      ? ((n = !1), t.touchEnd(s, e, r), t.LGel.trigger(Wt))
                      : t.isPosterElement(a) && t.LGel.trigger(Vt),
                      i &&
                        ((i = !1),
                        t.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                  }
                }));
            }),
            (t.prototype.triggerPosterClick = function () {
              var t = this;
              this.$inner.on("click.lg", function (e) {
                !t.dragOrSwipeEnabled &&
                  t.isPosterElement(Jt(e.target)) &&
                  t.LGel.trigger(Vt);
              });
            }),
            (t.prototype.manageSwipeClass = function () {
              var t = this.index + 1,
                e = this.index - 1;
              this.settings.loop &&
                this.galleryItems.length > 2 &&
                (0 === this.index
                  ? (e = this.galleryItems.length - 1)
                  : this.index === this.galleryItems.length - 1 && (t = 0)),
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-next-slide lg-prev-slide"),
                e > -1 && this.getSlideItem(e).addClass("lg-prev-slide"),
                this.getSlideItem(t).addClass("lg-next-slide");
            }),
            (t.prototype.goToNextSlide = function (t) {
              var e = this,
                s = this.settings.loop;
              t && this.galleryItems.length < 3 && (s = !1),
                this.lgBusy ||
                  (this.index + 1 < this.galleryItems.length
                    ? (this.index++,
                      this.LGel.trigger(Xt, { index: this.index }),
                      this.slide(this.index, !!t, !1, "next"))
                    : s
                    ? ((this.index = 0),
                      this.LGel.trigger(Xt, { index: this.index }),
                      this.slide(this.index, !!t, !1, "next"))
                    : this.settings.slideEndAnimation &&
                      !t &&
                      (this.outer.addClass("lg-right-end"),
                      setTimeout(function () {
                        e.outer.removeClass("lg-right-end");
                      }, 400)));
            }),
            (t.prototype.goToPrevSlide = function (t) {
              var e = this,
                s = this.settings.loop;
              t && this.galleryItems.length < 3 && (s = !1),
                this.lgBusy ||
                  (this.index > 0
                    ? (this.index--,
                      this.LGel.trigger(Ut, {
                        index: this.index,
                        fromTouch: t,
                      }),
                      this.slide(this.index, !!t, !1, "prev"))
                    : s
                    ? ((this.index = this.galleryItems.length - 1),
                      this.LGel.trigger(Ut, {
                        index: this.index,
                        fromTouch: t,
                      }),
                      this.slide(this.index, !!t, !1, "prev"))
                    : this.settings.slideEndAnimation &&
                      !t &&
                      (this.outer.addClass("lg-left-end"),
                      setTimeout(function () {
                        e.outer.removeClass("lg-left-end");
                      }, 400)));
            }),
            (t.prototype.keyPress = function () {
              var t = this;
              Jt(window).on("keydown.lg.global" + this.lgId, function (e) {
                t.lgOpened &&
                  !0 === t.settings.escKey &&
                  27 === e.keyCode &&
                  (e.preventDefault(),
                  t.settings.allowMediaOverlap &&
                  t.outer.hasClass("lg-can-toggle") &&
                  t.outer.hasClass("lg-components-open")
                    ? t.outer.removeClass("lg-components-open")
                    : t.closeGallery()),
                  t.lgOpened &&
                    t.galleryItems.length > 1 &&
                    (37 === e.keyCode &&
                      (e.preventDefault(), t.goToPrevSlide()),
                    39 === e.keyCode &&
                      (e.preventDefault(), t.goToNextSlide()));
              });
            }),
            (t.prototype.arrow = function () {
              var t = this;
              this.getElementById("lg-prev").on("click.lg", function () {
                t.goToPrevSlide();
              }),
                this.getElementById("lg-next").on("click.lg", function () {
                  t.goToNextSlide();
                });
            }),
            (t.prototype.arrowDisable = function (t) {
              if (!this.settings.loop && this.settings.hideControlOnEnd) {
                var e = this.getElementById("lg-prev"),
                  s = this.getElementById("lg-next");
                t + 1 === this.galleryItems.length
                  ? s.attr("disabled", "disabled").addClass("disabled")
                  : s.removeAttr("disabled").removeClass("disabled"),
                  0 === t
                    ? e.attr("disabled", "disabled").addClass("disabled")
                    : e.removeAttr("disabled").removeClass("disabled");
              }
            }),
            (t.prototype.setTranslate = function (t, e, s, i, n) {
              void 0 === i && (i = 1),
                void 0 === n && (n = 1),
                t.css(
                  "transform",
                  "translate3d(" +
                    e +
                    "px, " +
                    s +
                    "px, 0px) scale3d(" +
                    i +
                    ", " +
                    n +
                    ", 1)"
                );
            }),
            (t.prototype.mousewheel = function () {
              var t = this,
                e = 0;
              this.outer.on("wheel.lg", function (s) {
                if (s.deltaY && !(t.galleryItems.length < 2)) {
                  s.preventDefault();
                  var i = new Date().getTime();
                  i - e < 1e3 ||
                    ((e = i),
                    s.deltaY > 0
                      ? t.goToNextSlide()
                      : s.deltaY < 0 && t.goToPrevSlide());
                }
              });
            }),
            (t.prototype.isSlideElement = function (t) {
              return (
                t.hasClass("lg-outer") ||
                t.hasClass("lg-item") ||
                t.hasClass("lg-img-wrap")
              );
            }),
            (t.prototype.isPosterElement = function (t) {
              var e = this.getSlideItem(this.index)
                .find(".lg-video-play-button")
                .get();
              return (
                t.hasClass("lg-video-poster") ||
                t.hasClass("lg-video-play-button") ||
                (e && e.contains(t.get()))
              );
            }),
            (t.prototype.toggleMaximize = function () {
              var t = this;
              this.getElementById("lg-maximize").on("click.lg", function () {
                t.$container.toggleClass("lg-inline"), t.refreshOnResize();
              });
            }),
            (t.prototype.invalidateItems = function () {
              for (var t = 0; t < this.items.length; t++) {
                var e = Jt(this.items[t]);
                e.off("click.lgcustom-item-" + e.attr("data-lg-id"));
              }
            }),
            (t.prototype.trapFocus = function () {
              var t = this;
              this.$container.get().focus({ preventScroll: !0 }),
                Jt(window).on("keydown.lg.global" + this.lgId, function (e) {
                  if (t.lgOpened && ("Tab" === e.key || 9 === e.keyCode)) {
                    var s = ce(t.$container.get()),
                      i = s[0],
                      n = s[s.length - 1];
                    e.shiftKey
                      ? document.activeElement === i &&
                        (n.focus(), e.preventDefault())
                      : document.activeElement === n &&
                        (i.focus(), e.preventDefault());
                  }
                });
            }),
            (t.prototype.manageCloseGallery = function () {
              var t = this;
              if (this.settings.closable) {
                var e = !1;
                this.getElementById("lg-close").on("click.lg", function () {
                  t.closeGallery();
                }),
                  this.settings.closeOnTap &&
                    (this.outer.on("mousedown.lg", function (s) {
                      var i = Jt(s.target);
                      e = !!t.isSlideElement(i);
                    }),
                    this.outer.on("mousemove.lg", function () {
                      e = !1;
                    }),
                    this.outer.on("mouseup.lg", function (s) {
                      var i = Jt(s.target);
                      t.isSlideElement(i) &&
                        e &&
                        (t.outer.hasClass("lg-dragging") || t.closeGallery());
                    }));
              }
            }),
            (t.prototype.closeGallery = function (t) {
              var e = this;
              if (!this.lgOpened || (!this.settings.closable && !t)) return 0;
              this.LGel.trigger(Yt),
                this.settings.resetScrollPosition &&
                  !this.settings.hideScrollbar &&
                  Jt(window).scrollTop(this.prevScrollTop);
              var s,
                i = this.items[this.index];
              if (this.zoomFromOrigin && i) {
                var n = this.mediaContainerPosition,
                  r = n.top,
                  a = n.bottom,
                  o = this.galleryItems[this.index],
                  l = o.__slideVideoInfo,
                  c = o.poster,
                  d = se(
                    i,
                    this.outer,
                    r + a,
                    l && c && this.settings.videoMaxSize
                  );
                s = ie(i, this.outer, r, a, d);
              }
              this.zoomFromOrigin && s
                ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                  this.getSlideItem(this.index)
                    .addClass("lg-start-end-progress")
                    .css(
                      "transition-duration",
                      this.settings.startAnimationDuration + "ms"
                    )
                    .css("transform", s))
                : (this.outer.addClass("lg-hide-items"),
                  this.outer.removeClass("lg-zoom-from-image")),
                this.destroyModules(),
                (this.lGalleryOn = !1),
                (this.isDummyImageRemoved = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                clearTimeout(this.hideBarTimeout),
                (this.hideBarTimeout = !1),
                Jt("html").removeClass("lg-on"),
                this.outer.removeClass("lg-visible lg-components-open"),
                this.$backdrop.removeClass("in").css("opacity", 0);
              var u =
                this.zoomFromOrigin && s
                  ? Math.max(
                      this.settings.startAnimationDuration,
                      this.settings.backdropDuration
                    )
                  : this.settings.backdropDuration;
              return (
                this.$container.removeClass("lg-show-in"),
                setTimeout(function () {
                  e.zoomFromOrigin &&
                    s &&
                    e.outer.removeClass("lg-zoom-from-image"),
                    e.$container.removeClass("lg-show"),
                    e.resetScrollBar(),
                    e.$backdrop
                      .removeAttr("style")
                      .css(
                        "transition-duration",
                        e.settings.backdropDuration + "ms"
                      ),
                    e.outer.removeClass("lg-closing " + e.settings.startClass),
                    e
                      .getSlideItem(e.index)
                      .removeClass("lg-start-end-progress"),
                    e.$inner.empty(),
                    e.lgOpened && e.LGel.trigger(Qt, { instance: e }),
                    e.$container.get() && e.$container.get().blur(),
                    (e.lgOpened = !1);
                }, u + 100),
                u + 100
              );
            }),
            (t.prototype.initModules = function () {
              this.plugins.forEach(function (t) {
                try {
                  t.init();
                } catch (t) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly initiated"
                  );
                }
              });
            }),
            (t.prototype.destroyModules = function (t) {
              this.plugins.forEach(function (e) {
                try {
                  t ? e.destroy() : e.closeGallery && e.closeGallery();
                } catch (t) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly destroyed"
                  );
                }
              });
            }),
            (t.prototype.refresh = function (t) {
              this.settings.dynamic || this.invalidateItems(),
                (this.galleryItems = t || this.getItems()),
                this.updateControls(),
                this.openGalleryOnItemClick(),
                this.LGel.trigger(zt);
            }),
            (t.prototype.updateControls = function () {
              this.addSlideVideoInfo(this.galleryItems),
                this.updateCounterTotal(),
                this.manageSingleSlideClassName();
            }),
            (t.prototype.destroy = function () {
              var t = this,
                e = this.closeGallery(!0);
              return (
                setTimeout(function () {
                  t.destroyModules(!0),
                    t.settings.dynamic || t.invalidateItems(),
                    Jt(window).off(".lg.global" + t.lgId),
                    t.LGel.off(".lg"),
                    t.$container.remove();
                }, e),
                e
              );
            }),
            t
          );
        })();
      const fe = function (t, e) {
        return new me(t, e);
      };
      var ge = s(97);
      function ve() {
        const t = document.querySelectorAll("[data-gallery]");
        if (t.length) {
          let e = [];
          t.forEach((t) => {
            e.push({
              gallery: t,
              galleryClass: fe(t, {
                plugins: [ge],
                licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
                speed: 500,
              }),
            });
          });
        }
      }
      function _e(t) {
        this.type = t;
      }
      ve(),
        (_e.prototype.init = function () {
          const t = this;
          (this.оbjects = []),
            (this.daClassname = "_dynamic_adapt_"),
            (this.nodes = document.querySelectorAll("[data-da]"));
          for (let t = 0; t < this.nodes.length; t++) {
            const e = this.nodes[t],
              s = e.dataset.da.trim().split(","),
              i = {};
            (i.element = e),
              (i.parent = e.parentNode),
              (i.destination = document.querySelector(s[0].trim())),
              (i.breakpoint = s[1] ? s[1].trim() : "767"),
              (i.place = s[2] ? s[2].trim() : "last"),
              (i.index = this.indexInParent(i.parent, i.element)),
              this.оbjects.push(i);
          }
          this.arraySort(this.оbjects),
            (this.mediaQueries = Array.prototype.map.call(
              this.оbjects,
              function (t) {
                return (
                  "(" +
                  this.type +
                  "-width: " +
                  t.breakpoint +
                  "px)," +
                  t.breakpoint
                );
              },
              this
            )),
            (this.mediaQueries = Array.prototype.filter.call(
              this.mediaQueries,
              function (t, e, s) {
                return Array.prototype.indexOf.call(s, t) === e;
              }
            ));
          for (let e = 0; e < this.mediaQueries.length; e++) {
            const s = this.mediaQueries[e],
              i = String.prototype.split.call(s, ","),
              n = window.matchMedia(i[0]),
              r = i[1],
              a = Array.prototype.filter.call(this.оbjects, function (t) {
                return t.breakpoint === r;
              });
            n.addListener(function () {
              t.mediaHandler(n, a);
            }),
              this.mediaHandler(n, a);
          }
        }),
        (_e.prototype.mediaHandler = function (t, e) {
          if (t.matches)
            for (let t = 0; t < e.length; t++) {
              const s = e[t];
              (s.index = this.indexInParent(s.parent, s.element)),
                this.moveTo(s.place, s.element, s.destination);
            }
          else
            for (let t = e.length - 1; t >= 0; t--) {
              const s = e[t];
              s.element.classList.contains(this.daClassname) &&
                this.moveBack(s.parent, s.element, s.index);
            }
        }),
        (_e.prototype.moveTo = function (t, e, s) {
          e.classList.add(this.daClassname),
            "last" === t || t >= s.children.length
              ? s.insertAdjacentElement("beforeend", e)
              : "first" !== t
              ? s.children[t].insertAdjacentElement("beforebegin", e)
              : s.insertAdjacentElement("afterbegin", e);
        }),
        (_e.prototype.moveBack = function (t, e, s) {
          e.classList.remove(this.daClassname),
            void 0 !== t.children[s]
              ? t.children[s].insertAdjacentElement("beforebegin", e)
              : t.insertAdjacentElement("beforeend", e);
        }),
        (_e.prototype.indexInParent = function (t, e) {
          const s = Array.prototype.slice.call(t.children);
          return Array.prototype.indexOf.call(s, e);
        }),
        (_e.prototype.arraySort = function (t) {
          "min" === this.type
            ? Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? -1
                    : "last" === t.place || "first" === e.place
                    ? 1
                    : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              })
            : Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? 1
                    : "last" === t.place || "first" === e.place
                    ? -1
                    : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              });
        });
      function be() {
        const t = document.querySelector(".actions-product__add-to-cart"),
          e = document.querySelector(".cart"),
          s = e.querySelector(".cart__quantity");
        let i = document.querySelector("#subtotal-price");
        const n = document.querySelector("#total-price");
        let r = document.querySelector("#ship-price"),
          a = 0,
          o = document.querySelector(".cart__items");
        document.querySelector(".page__order") &&
          (o = document.querySelector(".order__items"));
        const l = (t) => t.replace(/\D/g, ""),
          c = () => {
            r &&
              (document.querySelector(".item-cart")
                ? (r.textContent = "$16.00")
                : (r.textContent = "$0.00"));
          },
          d = () => {
            if ((c(), i)) {
              let t = 0;
              document.querySelectorAll(".item-cart").forEach((e) => {
                let s = Number(
                  e
                    .querySelector(".item-cart__total_desktop")
                    .textContent.replace("$", "")
                );
                return (t += s);
              }),
                (i.textContent = `$${t.toFixed(2)}`);
            }
            if (r) {
              let t = Number(i.textContent.replace("$", ""));
              n.textContent = `$${(
                t + Number(r.textContent.replace("$", ""))
              ).toFixed(2)}`;
            }
          },
          u = () => {
            let t = o.children.length;
            (s.textContent = t),
              t > 0 ? e.classList.add("active") : e.classList.remove("active");
          },
          p = (t) => {
            if (document.querySelector(".product")) {
              let t = document.querySelectorAll(".item-cart");
              t &&
                t.forEach((t) => {
                  let e = document.querySelector(".product").dataset.id;
                  t.dataset.id == e &&
                    document
                      .querySelector(".actions-product__cart ")
                      .classList.remove("_link");
                });
            }
            ((t) => {
              a -= t;
            })(parseInt(l(t.querySelector(".item-cart__price").textContent))),
              t.remove(),
              d(),
              c(),
              u(),
              h();
          },
          h = () => {
            let t = o.innerHTML;
            t.length
              ? localStorage.setItem("products-gs", t)
              : localStorage.removeItem("products-gs");
          };
        t &&
          t.addEventListener("click", (t) => {
            let e = t.currentTarget,
              s = e.closest(".product"),
              i = s.dataset.id,
              n = s.querySelector(".product-slider__img").getAttribute("src"),
              r = s.querySelector(".product-info__title").textContent,
              l = s.querySelector("[data-quantity-value]").value,
              p = s.querySelector(".product-info__price").textContent,
              m = Number(p.replace("$", "")),
              f = e.closest(".actions-product").querySelector(".quantity");
            console.log(f),
              (m *= l),
              (a += m),
              d(),
              c(),
              o.insertAdjacentHTML(
                "beforeend",
                ((t, e, s, i, n, r) =>
                  `\n\t\t<div data-id="${t}" class="cart__item item-cart">\n\t\t<div class="item-cart__image-ibg">\n\t\t\t<img src="${e}" alt="">\n\t\t</div>\n\t\t<div class="item-cart__info">\n\t\t\t<a href="shop.html#product-${t}" class="item-cart__title">${s}</a>\n\t\t\t<div class="item-cart__sku-code">SKU: 1995751877966</div>\n\t\t\t<div class="item-cart__price item-cart__price_mobile">$${Number(
                    i.replace("$", "")
                  ).toFixed(
                    2
                  )}</div>\n\t\t</div>\n\t\t<div class="item-cart__price item-cart__price_desktop">$${Number(
                    i.replace("$", "")
                  ).toFixed(
                    2
                  )}</div>\n\t\t<div data-quantity class="item-cart__quantity quantity">\n\t\t\t<button  type="button"\n\t\t\t\tclass="quantity__button quantity__button_plus"></button>\n\t\t\t<div class="quantity__input">\n\t\t\t\t<input class='quantity__value'  autocomplete="off" type="text" name="form[quantity]" value="${r}">\n\t\t\t</div>\n\t\t\t<button  type="button"\n\t\t\t\tclass="quantity__button quantity__button_minus"></button>\n\t\t</div>\n\t\t<div class="item-cart__total item-cart__total_desktop">$${n.toFixed(
                    2
                  )}</div>\n\t\t<button type="button" class="item-cart__delete _icon-delete"></button>\n\t</div>\n\t\t`)(
                  i,
                  n,
                  r,
                  p,
                  m,
                  l
                )
              ),
              u(),
              f.classList.add("_hold"),
              e.parentElement.classList.add("_link"),
              h();
          }),
          document.addEventListener("click", (t) => {
            t.target.classList.contains("item-cart__delete") &&
              p(t.target.closest(".item-cart"));
          });
        (() => {
          if (null !== localStorage.getItem("products-gs")) {
            let t = document.querySelectorAll(".cart__items");
            document.querySelector(".page__order") &&
              (t = document.querySelectorAll(".order__items")),
              t.forEach((t) => {
                t.innerHTML = localStorage.getItem("products-gs");
              }),
              u(),
              document.querySelectorAll(".cart__item").forEach((t) => {
                a += parseInt(
                  l(t.querySelector(".item-cart__price").textContent)
                );
              }),
              d(),
              c();
          }
          let t = document.querySelectorAll(".item-cart");
          t &&
            t.forEach((t) => {
              if (document.querySelector(".product")) {
                document.querySelector(".product").dataset.id == t.dataset.id &&
                  (document
                    .querySelector(".actions-product__cart")
                    .classList.add("_link"),
                  document
                    .querySelector(".actions-product__quantity")
                    .classList.add("_hold"));
              }
            });
        })();
        (() => {
          const t = document.querySelectorAll(".quantity__button_plus"),
            e = document.querySelectorAll(".quantity__button_minus");
          t.forEach((t) => {
            t.addEventListener("click", (e) => {
              if (e.target.closest(".item-cart")) {
                let s = e.target.closest(".item-cart"),
                  i = parseInt(
                    s
                      .querySelector(".item-cart__price")
                      .innerHTML.replace("$", "")
                  ),
                  n = s.querySelector(".item-cart__total_desktop"),
                  r = s.querySelector(".quantity__value"),
                  a = parseInt(s.querySelector(".quantity__value").value);
                a++, r.setAttribute("value", a);
                let o = "$" + (i *= a).toFixed(2);
                (n.innerHTML = ""),
                  n.insertAdjacentHTML("beforeend", o),
                  a >= 10 && t.classList.add("_hold"),
                  d(),
                  h();
              }
            });
          }),
            e.forEach((t) => {
              t.addEventListener("click", (t) => {
                if (t.target.closest(".item-cart")) {
                  let e = t.target.closest(".item-cart"),
                    s = parseInt(
                      e
                        .querySelector(".item-cart__price")
                        .innerHTML.replace("$", "")
                    ),
                    i = e.querySelector(".item-cart__total_desktop"),
                    n = e.querySelector(".quantity__value"),
                    r = parseInt(e.querySelector(".quantity__value").value);
                  r--, n.setAttribute("value", r);
                  let a = "$" + (s *= r).toFixed(2);
                  (i.innerHTML = ""),
                    i.insertAdjacentHTML("beforeend", a),
                    r < 1 && e.remove(),
                    r <= 10 &&
                      t.target
                        .closest(".item-cart")
                        .querySelector(".quantity__button_plus")
                        .classList.remove("_hold"),
                    d(),
                    h();
                }
              });
            });
        })();
      }
      new _e("max").init(), window.addEventListener("load", function () {});
      const ye = JSON.parse(
        '{"R":[{"id":1,"image":"img/products/image1.png","title":"Barberton Daisy","price":"$119","oldPrice":"","label":""},{"id":2,"image":"img/products/image2.png","title":"Angel Wing Begonia","price":"$169","oldPrice":"","label":""},{"id":3,"image":"img/products/image3.png","title":"African Violet","price":"$199","oldPrice":"$229","label":"13% OFF"},{"id":4,"image":"img/products/image4.png","title":"Beach Spider Lily","price":"$129","oldPrice":"","label":""},{"id":5,"image":"img/products/image5.png","title":"Blushing Bromeliad","price":"$139","oldPrice":"","label":""},{"id":6,"image":"img/products/image6.png","title":"Aluminum Plant","price":"$179","oldPrice":"","label":""},{"id":7,"image":"img/products/image7.png","title":"Bird\'s Nest Fern","price":"$99","oldPrice":"","label":""},{"id":8,"image":"img/products/image8.png","title":"Broadleaf Lady Palm","price":"$59","oldPrice":"","label":""},{"id":9,"image":"img/products/image9.png","title":"Chinese Evergreen","price":"$39","oldPrice":"","label":""}]}'
      );
      document.addEventListener("click", (t) => {
        t.target.closest(".actions-header__search")
          ? document.documentElement.classList.add("_search")
          : document.documentElement.classList.remove("_search");
      }),
        document.addEventListener("click", (t) => {
          t.target.closest(".card-product__fav") &&
            t.target.closest(".card-product__fav").classList.toggle("_active");
        });
      let we = document.querySelector(".products__filter");
      function Se() {
        const t = document.querySelector(".actions-product__fav");
        t &&
          t.addEventListener("click", function () {
            t.classList.toggle("_checked");
          });
      }
      function Ce(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function xe(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      }
      we &&
        we.addEventListener("click", (t) => {
          let e = t.target.closest(".products__filter-item"),
            s = document.querySelectorAll(".products__filter-item");
          e.classList.contains("_checked") ||
            (s.forEach((t) => {
              t.classList.remove("_checked");
            }),
            e.classList.add("_checked"));
        }),
        (function () {
          let t = document.querySelectorAll(".menu__link"),
            e = new URL(document.location.href).pathname;
          for (let s = 0; s < t.length; s++) {
            let i = t[s].getAttribute("href");
            -1 != e.indexOf(i) &&
              t[s].parentElement.classList.add("_active-link");
          }
        })(),
        window.addEventListener("load", function () {
          let t = localStorage.getItem("product-gs");
          if (document.querySelector(".shop")) {
            const e = document.querySelector(".shop__wrapper");
            localStorage.getItem("product-gs") &&
              ((e.innerHTML = ""),
              e.insertAdjacentHTML("beforeend", t),
              At(),
              ve());
          }
          be(), d(), Se();
        }),
        (window.onload = function () {
          document.querySelector(".products__list") &&
            ((function (t) {
              let e = ye.R;
              t.classList.contains("products__list") && (e = ye.R),
                e.forEach((e) => {
                  const s = e.id,
                    i = e.image,
                    n = e.title,
                    r = e.price,
                    a = e.oldPrice;
                  let o = e.label;
                  o && (o = `<div class="card-product__sale">${o}</div>`);
                  let l = `<div class="products__card card-product" data-pid="${s}">\n\n\t\t${o}\n\t\t\n\t\t<div class="card-product__top">\n\t\t\t<a href="shop.html" class="card-product__image card-product-image">\n\t\t\t\t<div class="card-product-image__swiper">\n\t\t\t\t\t<div class="card-product-image__slide"><img src="${i}" alt="">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="card-product-image__slide"><img src="${i}" alt="">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="card-product-image__slide"><img src="${i}" alt="">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="card-product-image__slide"><img src="${i}" alt="">\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div class="card-product-image__btn card-product-image__btn_next "></div>\n\t\t\t\t<div class="card-product-image__btn card-product-image__btn_prev "></div>\n\t\t\t\t<div class="card-product-image__pagination "></div>\n\t\t\t</a>\n\t\t\n\t\t\t<div class="card-product__actions">\n\t\t\t<div class="card-product__action-buttons">\n\t\t\t<button id="action" type="button" class="card-product__cart _icon-cart"></button>\n\t\t\t<button id="action" type="button"\n\t\t\t\tclass="card-product__fav _icon-heart"></button>\n\t\t\t<button id="action" type="button" class="card-product__search _icon-search"></button>\n\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="card-product__desc">\n\t\t\t<a href="shop.html" class="card-product__title">${n}</a>\n\t\t\t<div class="card-product__price">\n\t\t\t\t<span class="card-product__current-price">$${Number(
                    r.replace("$", "")
                  ).toFixed(
                    2
                  )}</span>\n\t\t\t\t<span class="card-product__old-price">${a}</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>`;
                  t.insertAdjacentHTML("beforeend", l);
                }),
                At();
            })(document.querySelector(".products__list")),
            document.addEventListener("click", function (t) {
              const e = t.target.closest(".card-product");
              e &&
                (function (t) {
                  let e = ye.R.find((e) => e.id == t);
                  if (e.id == t) {
                    let t = `\t\t\t\n\t\t<section class="shop__product-section">\n\t\t<div class="shop__product product" data-id="${
                      e.id
                    }">\n\t\t\t<div class="product__images">\n\t\t\t\t<div class="product-slider _icon-search">\n\t\t\t\t\t<div data-gallery class="product-slider__swiper">\n\t\t\t\t\t<a href="${
                      e.image
                    }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t<img class="product-slider__img" src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t</a>\n\t\t\t\t\t<a href="${
                      e.image
                    }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t<img class="product-slider__img" src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t</a>\n\t\t\t\t\t<a href="${
                      e.image
                    }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t<img class="product-slider__img" src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t</a>\n\t\t\t\t\t<a href="${
                      e.image
                    }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t<img class="product-slider__img" src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div class="product-thumb">\n\t\t\t\t\t<div class="product-thumb__swiper">\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                      e.image
                    }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="product__info product-info">\n\t\t\t\t<div class="product-info__header ">\n\t\t\t\t\t<h1 class="product-info__title">${
                      e.title
                    }</h1>\n\t\t\t\t\t<div class="product-info__price">$${Number(
                      e.price.replace("$", "")
                    ).toFixed(
                      2
                    )}</div>\n\t\t\t\t\t<div class="product-info__review">\n\t\t\t\t\t<div class="product-info__stars">\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gray _icon-star"></span>\n\t\t\t\t</div>\n\t\t\t\t<a href="#/" class="product-info__review-link">3 Customer Review</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="product-info__body">\n\t\t\t\t\t<h3 class="product-info__subtitle product-subtitle">Short Description:</h3>\n\t\t\t\t\t<div class="product-info__desc">The ceramic cylinder planters come with a wooden stand to help\n\t\t\t\t\t\televate your plants off the ground. The ceramic cylinder planters come with a wooden stand to\n\t\t\t\t\t\thelp elevate your plants off the ground. </div>\n\n\t\t\t\t\t<form action="#" class="product-info__form">\n\t\t\t\t\t\t<div class="product-info__size size-select">\n\t\t\t\t\t\t\t<h3 class="size-select__subtitle product-subtitle">Size:</h3>\n\n\t\t\t\t\t\t\t<div class="size-select__items">\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_1" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="S" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_1" class="size-select__label">S</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_2" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="M" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_2" class="size-select__label">M</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_3" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="L" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_3" class="size-select__label">L</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_4" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="XL" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_4" class="size-select__label">XL</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="product-info__actions actions-product">\n\t\t\t\t\t\t\t<div data-quantity class="actions-product__quantity quantity">\n\t\t\t\t\t\t\t\t<button data-quantity-plus type="button"\n\t\t\t\t\t\t\t\t\tclass="quantity__button quantity__button_plus"></button>\n\t\t\t\t\t\t\t\t<div class="quantity__input">\n\t\t\t\t\t\t\t\t\t<input data-quantity-value autocomplete="off" type="text" name="form[]" value="1">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button data-quantity-minus type="button"\n\t\t\t\t\t\t\t\t\tclass="quantity__button quantity__button_minus"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="actions-product__buttons">\n\t\t\t\t\t\t\t<button type="button" class="actions-product__buy btn btn_gradient">Buy NOW</button>\n\n\t\t\t\t\t\t\t<div class="actions-product__cart btn">\n\t\t\t\t\t\t\t<button type="button" class="actions-product__add-to-cart ">Add to cart</button>\n\t\t\t\t\t\t\t<a class="actions-product__link-to-cart _icon-cart" href="cart.html">Go to cart</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<button type="button" class="actions-product__fav _icon-heart"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\n\t\t\t\t\t<div class="product-info__spec spec">\n\t\t\t\t\t\t<div class="spec__item">\n\t\t\t\t\t\t\t<span class="spec__title">SKU:</span>\n\t\t\t\t\t\t\t<div class="spec__desc">1995751877966</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="spec__item">\n\t\t\t\t\t\t\t<span class="spec__title">Categories: </span>\n\t\t\t\t\t\t\t<div class="spec__desc">Potter Plants</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="spec__item">\n\t\t\t\t\t\t\t<span class="spec__title">Tags: </span>\n\t\t\t\t\t\t\t<div class="spec__desc"><a href='#/'>Home</a>, <a href='#/'>Garden</a>, <a href='#/'>Plants</a> </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="product-info__social social">\n\t\t\t\t\t\t<h3 class="social__subtitle product-subtitle">Share this products:</h3>\n\t\t\t\t\t\t<div class="social__links">\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-fb-fill"></a>\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-twitter-fill"></a>\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-linkedin-fill"></a>\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-message1"></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="shop__product-desc product-desc">\n\t\t\t<div data-tabs data-tabs-animate class="product-desc__tabs">\n\t\t\t\t<nav data-tabs-titles class="product-desc__navigation">\n\t\t\t\t\t<button type="submit" class="product-desc__title _tab-active">Product Description</button>\n\t\t\t\t\t<button type="submit" class="product-desc__title">Reviews (3)</button>\n\n\t\t\t\t</nav>\n\t\t\t\t<div data-tabs-body class="product-desc__content">\n\t\t\t\t\t<div class="product-desc__body">\n\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\tThe ceramic cylinder planters come with a wooden stand to help elevate your plants off the\n\t\t\t\t\t\t\tground. The ceramic cylinder planters come with a wooden stand to help elevate your plants\n\t\t\t\t\t\t\toff the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla\n\t\t\t\t\t\t\taugue\n\t\t\t\t\t\t\tnec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus\n\t\t\t\t\t\t\tquis\n\t\t\t\t\t\t\tjusto gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\tPellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum\n\t\t\t\t\t\t\tturpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam,\n\t\t\t\t\t\t\tpurus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non\n\t\t\t\t\t\t\tneque.\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat\n\t\t\t\t\t\t\tvestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus,\n\t\t\t\t\t\t\tconsequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula\n\t\t\t\t\t\t\teuismod eget. The ceramic cylinder planters come with a wooden stand to help elevate your\n\t\t\t\t\t\t\tplants off the ground.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<h3 class="product-desc__subtitle">Living Room:</h3>\n\t\t\t\t\t\t<p class="product-desc__text">The ceramic cylinder planters come with a wooden stand to help\n\t\t\t\t\t\t\televate your plants off the\n\t\t\t\t\t\t\tground. The ceramic cylinder planters come with a wooden stand to help elevate your plants\n\t\t\t\t\t\t\toff the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n\t\t\t\t\t\t<h3 class="product-desc__subtitle">Dining Room:</h3>\n\t\t\t\t\t\t<p class="product-desc__text">The benefits of houseplants are endless. In addition to\n\t\t\t\t\t\t\tcleaning the air of harmful\n\t\t\t\t\t\t\ttoxins, they can help to improve your mood, reduce stress and provide you with better\n\t\t\t\t\t\t\tsleep. Fill every room of your home with houseplants and their restorative qualities will\n\t\t\t\t\t\t\timprove your life.</p>\n\t\t\t\t\t\t<h3 class="product-desc__subtitle">Office:</h3>\n\t\t\t\t\t\t<p class="product-desc__text">The ceramic cylinder planters come with a wooden stand to help\n\t\t\t\t\t\t\televate your plants off the\n\t\t\t\t\t\t\tground. The ceramic cylinder planters come with a wooden stand to help elevate your plants\n\t\t\t\t\t\t\toff the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-desc__body">\n\t\t\t\t\t\t<div class="product-desc__review">\n\t\t\t\t\t\t\t<div class="product-desc__subtitle">Mark</div>\n\t\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odio exercitationem,\n\t\t\t\t\t\t\t\texcepturi similique nulla, voluptatem reprehenderit neque a minima eaque tenetur? Quos\n\t\t\t\t\t\t\t\tfugit\n\t\t\t\t\t\t\t\tvoluptate enim quo sed, minima error molestias!\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-desc__review">\n\t\t\t\t\t\t\t<div class="product-desc__subtitle">Anna</div>\n\t\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\t\tLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel non, id enim praesentium\n\t\t\t\t\t\t\t\teaque fugit obcaecati autem sint optio vitae, tenetur, ipsum suscipit\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-desc__review">\n\t\t\t\t\t\t\t<div class="product-desc__subtitle">Dean</div>\n\t\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Minima expedita voluptatum\n\t\t\t\t\t\t\t\tinventore ipsa consequuntur accusantium ut quibusdam ducimus culpa aliquid, unde ea aut\n\t\t\t\t\t\t\t\taspernatur, pariatur, accusamus explicabo veritatis. Aspernatur, nihil.\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t</section>\t\n\n\t\t<div class="shop__related-product related-product">\n\t\t<h3 class="related-product__title">Related Products</h3>\n\t\t\t\t\t<div class="related-product-slider">\n\t\t\t\t\t\t<div class="related-product-slider__swiper">\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image4.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Beach Spider Lily</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$129.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image3.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Blushing Bromeliad</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$139.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image5.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Aluminum Plant</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$179.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image6.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Bird's Nest Fern</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$99.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image7.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Chinese Evergreen</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$39.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image4.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Beach Spider Lily</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$129.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image3.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Blushing Bromeliad</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$139.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image5.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Aluminum Plant</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$179.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image6.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Bird's Nest Fern</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$99.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image7.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Chinese Evergreen</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$39.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image4.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Beach Spider Lily</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$129.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image3.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Blushing Bromeliad</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$139.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image5.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Aluminum Plant</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$179.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image6.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Bird's Nest Fern</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$99.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image7.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Chinese Evergreen</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$39.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="related-product-slider__pagination"></div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t`;
                    localStorage.setItem("product-gs", t);
                  }
                })(e.dataset.pid);
            })),
            ye.R.forEach((t) => {
              let e = t.id;
              if (location.hash.replace("#", "") == `product-${e}`) {
                let e = `\t\t\t\n\t\t\t\t<section class="shop__product-section">\n\t\t\t\t<div class="shop__product product" data-id="${
                  t.id
                }">\n\t\t\t\t\t\t\t<div class="product__images">\n\t\t\t\t\t\t\t<div class="product-slider _icon-search">\n\t\t\t\t\t\t\t<div data-gallery class="product-slider__swiper">\n\t\t\t\t\t\t\t<a href="${
                  t.image
                }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t\t\t<img class="product-slider__img" src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href="${
                  t.image
                }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t\t\t<img class="product-slider__img" src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href="${
                  t.image
                }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t\t\t<img class="product-slider__img" src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href="${
                  t.image
                }" class="product-slider__slide product-slider__image">\n\t\t\t\t\t\t\t<img class="product-slider__img" src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="product-thumb">\n\t\t\t\t\t<div class="product-thumb__swiper">\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t\t<img src="${
                  t.image
                }" alt="">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="product__info product-info">\n\t\t\t\t<div class="product-info__header ">\n\t\t\t\t\t<h1 class="product-info__title">${
                  t.title
                }</h1>\n\t\t\t\t\t<div class="product-info__price">$${Number(
                  t.price.replace("$", "")
                ).toFixed(
                  2
                )}</div>\n\t\t\t\t\t<div class="product-info__review">\n\t\t\t\t\t<div class="product-info__stars">\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gold _icon-star"></span>\n\t\t\t\t\t<span class="product-info__star product-info__star_gray _icon-star"></span>\n\t\t\t\t</div>\n\t\t\t\t<a href="#/" class="product-info__review-link">3 Customer Review</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="product-info__body">\n\t\t\t\t\t<h3 class="product-info__subtitle product-subtitle">Short Description:</h3>\n\t\t\t\t\t<div class="product-info__desc">The ceramic cylinder planters come with a wooden stand to help\n\t\t\t\t\t\televate your plants off the ground. The ceramic cylinder planters come with a wooden stand to\n\t\t\t\t\t\thelp elevate your plants off the ground. </div>\n\n\t\t\t\t\t<form action="#" class="product-info__form">\n\t\t\t\t\t\t<div class="product-info__size size-select">\n\t\t\t\t\t\t\t<h3 class="size-select__subtitle product-subtitle">Size:</h3>\n\n\t\t\t\t\t\t\t<div class="size-select__items">\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_1" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="S" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_1" class="size-select__label">S</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_2" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="M" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_2" class="size-select__label">M</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_3" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="L" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_3" class="size-select__label">L</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="size-select__item">\n\t\t\t\t\t\t\t\t\t<input id="c_4" data-error="Ошибка" class="size-select__input" type="radio"\n\t\t\t\t\t\t\t\t\t\tvalue="XL" name="form[size]">\n\t\t\t\t\t\t\t\t\t<label for="c_4" class="size-select__label">XL</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="product-info__actions actions-product">\n\t\t\t\t\t\t\t<div data-quantity class="actions-product__quantity quantity">\n\t\t\t\t\t\t\t\t<button data-quantity-plus type="button"\n\t\t\t\t\t\t\t\t\tclass="quantity__button quantity__button_plus"></button>\n\t\t\t\t\t\t\t\t<div class="quantity__input">\n\t\t\t\t\t\t\t\t\t<input data-quantity-value autocomplete="off" type="text" name="form[]" value="1">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<button data-quantity-minus type="button"\n\t\t\t\t\t\t\t\t\tclass="quantity__button quantity__button_minus"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="actions-product__buttons">\n\t\t\t\t\t\t\t<button type="button" class="actions-product__buy btn btn_gradient">Buy NOW</button>\n\n\t\t\t\t\t\t\t<div class="actions-product__cart btn">\n\t\t\t\t\t\t\t<button type="button" class="actions-product__add-to-cart ">Add to cart</button>\n\t\t\t\t\t\t\t<a class="actions-product__link-to-cart _icon-cart" href="cart.html">Go to cart</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<button type="button" class="actions-product__fav _icon-heart"></button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\n\t\t\t\t\t<div class="product-info__spec spec">\n\t\t\t\t\t\t<div class="spec__item">\n\t\t\t\t\t\t\t<span class="spec__title">SKU:</span>\n\t\t\t\t\t\t\t<div class="spec__desc">1995751877966</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="spec__item">\n\t\t\t\t\t\t\t<span class="spec__title">Categories: </span>\n\t\t\t\t\t\t\t<div class="spec__desc">Potter Plants</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="spec__item">\n\t\t\t\t\t\t\t<span class="spec__title">Tags: </span>\n\t\t\t\t\t\t\t<div class="spec__desc"><a href='#/'>Home</a>, <a href='#/'>Garden</a>, <a href='#/'>Plants</a> </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="product-info__social social">\n\t\t\t\t\t\t<h3 class="social__subtitle product-subtitle">Share this products:</h3>\n\t\t\t\t\t\t<div class="social__links">\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-fb-fill"></a>\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-twitter-fill"></a>\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-linkedin-fill"></a>\n\t\t\t\t\t\t\t<a href="#/" class="social__link _icon-message1"></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="shop__product-desc product-desc">\n\t\t\t<div data-tabs data-tabs-animate class="product-desc__tabs">\n\t\t\t\t<nav data-tabs-titles class="product-desc__navigation">\n\t\t\t\t\t<button type="submit" class="product-desc__title _tab-active">Product Description</button>\n\t\t\t\t\t<button type="submit" class="product-desc__title">Reviews (3)</button>\n\n\t\t\t\t</nav>\n\t\t\t\t<div data-tabs-body class="product-desc__content">\n\t\t\t\t\t<div class="product-desc__body">\n\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\tThe ceramic cylinder planters come with a wooden stand to help elevate your plants off the\n\t\t\t\t\t\t\tground. The ceramic cylinder planters come with a wooden stand to help elevate your plants\n\t\t\t\t\t\t\toff the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla\n\t\t\t\t\t\t\taugue\n\t\t\t\t\t\t\tnec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus\n\t\t\t\t\t\t\tquis\n\t\t\t\t\t\t\tjusto gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.\n\t\t\t\t\t\t</p>\n\n\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\tPellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum\n\t\t\t\t\t\t\tturpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam,\n\t\t\t\t\t\t\tpurus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non\n\t\t\t\t\t\t\tneque.\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat\n\t\t\t\t\t\t\tvestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus,\n\t\t\t\t\t\t\tconsequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula\n\t\t\t\t\t\t\teuismod eget. The ceramic cylinder planters come with a wooden stand to help elevate your\n\t\t\t\t\t\t\tplants off the ground.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<h3 class="product-desc__subtitle">Living Room:</h3>\n\t\t\t\t\t\t<p class="product-desc__text">The ceramic cylinder planters come with a wooden stand to help\n\t\t\t\t\t\t\televate your plants off the\n\t\t\t\t\t\t\tground. The ceramic cylinder planters come with a wooden stand to help elevate your plants\n\t\t\t\t\t\t\toff the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n\t\t\t\t\t\t<h3 class="product-desc__subtitle">Dining Room:</h3>\n\t\t\t\t\t\t<p class="product-desc__text">The benefits of houseplants are endless. In addition to\n\t\t\t\t\t\t\tcleaning the air of harmful\n\t\t\t\t\t\t\ttoxins, they can help to improve your mood, reduce stress and provide you with better\n\t\t\t\t\t\t\tsleep. Fill every room of your home with houseplants and their restorative qualities will\n\t\t\t\t\t\t\timprove your life.</p>\n\t\t\t\t\t\t<h3 class="product-desc__subtitle">Office:</h3>\n\t\t\t\t\t\t<p class="product-desc__text">The ceramic cylinder planters come with a wooden stand to help\n\t\t\t\t\t\t\televate your plants off the\n\t\t\t\t\t\t\tground. The ceramic cylinder planters come with a wooden stand to help elevate your plants\n\t\t\t\t\t\t\toff the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-desc__body">\n\t\t\t\t\t\t<div class="product-desc__review">\n\t\t\t\t\t\t\t<div class="product-desc__subtitle">Mark</div>\n\t\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Inventore odio exercitationem,\n\t\t\t\t\t\t\t\texcepturi similique nulla, voluptatem reprehenderit neque a minima eaque tenetur? Quos\n\t\t\t\t\t\t\t\tfugit\n\t\t\t\t\t\t\t\tvoluptate enim quo sed, minima error molestias!\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-desc__review">\n\t\t\t\t\t\t\t<div class="product-desc__subtitle">Anna</div>\n\t\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\t\tLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel non, id enim praesentium\n\t\t\t\t\t\t\t\teaque fugit obcaecati autem sint optio vitae, tenetur, ipsum suscipit\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="product-desc__review">\n\t\t\t\t\t\t\t<div class="product-desc__subtitle">Dean</div>\n\t\t\t\t\t\t\t<p class="product-desc__text">\n\t\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Minima expedita voluptatum\n\t\t\t\t\t\t\t\tinventore ipsa consequuntur accusantium ut quibusdam ducimus culpa aliquid, unde ea aut\n\t\t\t\t\t\t\t\taspernatur, pariatur, accusamus explicabo veritatis. Aspernatur, nihil.\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t</section>\t\n\n\t\t<div class="shop__related-product related-product">\n\t\t<h3 class="related-product__title">Related Products</h3>\n\t\t\t\t\t<div class="related-product-slider">\n\t\t\t\t\t\t<div class="related-product-slider__swiper">\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image4.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Beach Spider Lily</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$129.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image3.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Blushing Bromeliad</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$139.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image5.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Aluminum Plant</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$179.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image6.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Bird's Nest Fern</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$99.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image7.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Chinese Evergreen</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$39.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image4.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Beach Spider Lily</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$129.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image3.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Blushing Bromeliad</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$139.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image5.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Aluminum Plant</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$179.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image6.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Bird's Nest Fern</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$99.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image7.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Chinese Evergreen</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$39.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image4.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Beach Spider Lily</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$129.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image3.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Blushing Bromeliad</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$139.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image5.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Aluminum Plant</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$179.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image6.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Bird's Nest Fern</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$99.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="related-product-slider__slide slide-related">\n\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__image-ibg">\n\t\t\t\t\t\t\t\t\t<img src="img/products/image7.png" alt="">\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class="slide-related__content">\n\t\t\t\t\t\t\t\t\t<a href="#/" class="slide-related__title">Chinese Evergreen</a>\n\t\t\t\t\t\t\t\t\t<div class="slide-related__price">$39.00</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="related-product-slider__pagination"></div>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t`;
                document.querySelector(".shop__wrapper") &&
                  ((document.querySelector(".shop__wrapper").innerHTML = ""),
                  document
                    .querySelector(".shop__wrapper")
                    .insertAdjacentHTML("beforeend", e),
                  be(),
                  At()),
                  ve(),
                  d(),
                  Se();
              }
            });
        });
      var Te,
        Ee,
        Le,
        Ae,
        Oe,
        ke,
        Me,
        Pe,
        $e,
        Ie,
        De,
        ze,
        qe,
        Be,
        Ne,
        Fe,
        He,
        Ge,
        Ve,
        Re,
        je,
        We,
        Xe,
        Ue,
        Ye,
        Qe,
        Ke,
        Ze,
        Je = {
          autoSleep: 120,
          force3D: "auto",
          nullTargetWarn: 1,
          units: { lineHeight: "" },
        },
        ts = { duration: 0.5, overwrite: !1, delay: 0 },
        es = 1e8,
        ss = 1e-8,
        is = 2 * Math.PI,
        ns = is / 4,
        rs = 0,
        as = Math.sqrt,
        os = Math.cos,
        ls = Math.sin,
        cs = function (t) {
          return "string" == typeof t;
        },
        ds = function (t) {
          return "function" == typeof t;
        },
        us = function (t) {
          return "number" == typeof t;
        },
        ps = function (t) {
          return void 0 === t;
        },
        hs = function (t) {
          return "object" == typeof t;
        },
        ms = function (t) {
          return !1 !== t;
        },
        fs = function () {
          return "undefined" != typeof window;
        },
        gs = function (t) {
          return ds(t) || cs(t);
        },
        vs =
          ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
          function () {},
        _s = Array.isArray,
        bs = /(?:-?\.?\d|\.)+/gi,
        ys = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        ws = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        Ss = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        Cs = /[+-]=-?[.\d]+/,
        xs = /[^,'"\[\]\s]+/gi,
        Ts = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
        Es = {},
        Ls = {},
        As = function (t) {
          return (Ls = ti(t, Es)) && jn;
        },
        Os = function (t, e) {
          return console.warn(
            "Invalid property",
            t,
            "set to",
            e,
            "Missing plugin? gsap.registerPlugin()"
          );
        },
        ks = function (t, e) {
          return !e && console.warn(t);
        },
        Ms = function (t, e) {
          return (t && (Es[t] = e) && Ls && (Ls[t] = e)) || Es;
        },
        Ps = function () {
          return 0;
        },
        $s = {},
        Is = [],
        Ds = {},
        zs = {},
        qs = {},
        Bs = 30,
        Ns = [],
        Fs = "",
        Hs = function (t) {
          var e,
            s,
            i = t[0];
          if ((hs(i) || ds(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
            for (s = Ns.length; s-- && !Ns[s].targetTest(i); );
            e = Ns[s];
          }
          for (s = t.length; s--; )
            (t[s] && (t[s]._gsap || (t[s]._gsap = new mn(t[s], e)))) ||
              t.splice(s, 1);
          return t;
        },
        Gs = function (t) {
          return t._gsap || Hs(Pi(t))[0]._gsap;
        },
        Vs = function (t, e, s) {
          return (s = t[e]) && ds(s)
            ? t[e]()
            : (ps(s) && t.getAttribute && t.getAttribute(e)) || s;
        },
        Rs = function (t, e) {
          return (t = t.split(",")).forEach(e) || t;
        },
        js = function (t) {
          return Math.round(1e5 * t) / 1e5 || 0;
        },
        Ws = function (t) {
          return Math.round(1e7 * t) / 1e7 || 0;
        },
        Xs = function (t, e) {
          var s = e.charAt(0),
            i = parseFloat(e.substr(2));
          return (
            (t = parseFloat(t)),
            "+" === s ? t + i : "-" === s ? t - i : "*" === s ? t * i : t / i
          );
        },
        Us = function (t, e) {
          for (var s = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < s; );
          return i < s;
        },
        Ys = function () {
          var t,
            e,
            s = Is.length,
            i = Is.slice(0);
          for (Ds = {}, Is.length = 0, t = 0; t < s; t++)
            (e = i[t]) &&
              e._lazy &&
              (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        },
        Qs = function (t, e, s, i) {
          Is.length && Ys(), t.render(e, s, i), Is.length && Ys();
        },
        Ks = function (t) {
          var e = parseFloat(t);
          return (e || 0 === e) && (t + "").match(xs).length < 2
            ? e
            : cs(t)
            ? t.trim()
            : t;
        },
        Zs = function (t) {
          return t;
        },
        Js = function (t, e) {
          for (var s in e) s in t || (t[s] = e[s]);
          return t;
        },
        ti = function (t, e) {
          for (var s in e) t[s] = e[s];
          return t;
        },
        ei = function t(e, s) {
          for (var i in s)
            "__proto__" !== i &&
              "constructor" !== i &&
              "prototype" !== i &&
              (e[i] = hs(s[i]) ? t(e[i] || (e[i] = {}), s[i]) : s[i]);
          return e;
        },
        si = function (t, e) {
          var s,
            i = {};
          for (s in t) s in e || (i[s] = t[s]);
          return i;
        },
        ii = function (t) {
          var e,
            s = t.parent || Ee,
            i = t.keyframes
              ? ((e = _s(t.keyframes)),
                function (t, s) {
                  for (var i in s)
                    i in t ||
                      ("duration" === i && e) ||
                      "ease" === i ||
                      (t[i] = s[i]);
                })
              : Js;
          if (ms(t.inherit))
            for (; s; ) i(t, s.vars.defaults), (s = s.parent || s._dp);
          return t;
        },
        ni = function (t, e, s, i, n) {
          void 0 === s && (s = "_first"), void 0 === i && (i = "_last");
          var r,
            a = t[i];
          if (n) for (r = e[n]; a && a[n] > r; ) a = a._prev;
          return (
            a
              ? ((e._next = a._next), (a._next = e))
              : ((e._next = t[s]), (t[s] = e)),
            e._next ? (e._next._prev = e) : (t[i] = e),
            (e._prev = a),
            (e.parent = e._dp = t),
            e
          );
        },
        ri = function (t, e, s, i) {
          void 0 === s && (s = "_first"), void 0 === i && (i = "_last");
          var n = e._prev,
            r = e._next;
          n ? (n._next = r) : t[s] === e && (t[s] = r),
            r ? (r._prev = n) : t[i] === e && (t[i] = n),
            (e._next = e._prev = e.parent = null);
        },
        ai = function (t, e) {
          t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
            (t._act = 0);
        },
        oi = function (t, e) {
          if (t && (!e || e._end > t._dur || e._start < 0))
            for (var s = t; s; ) (s._dirty = 1), (s = s.parent);
          return t;
        },
        li = function (t) {
          for (var e = t.parent; e && e.parent; )
            (e._dirty = 1), e.totalDuration(), (e = e.parent);
          return t;
        },
        ci = function t(e) {
          return !e || (e._ts && t(e.parent));
        },
        di = function (t) {
          return t._repeat
            ? ui(t._tTime, (t = t.duration() + t._rDelay)) * t
            : 0;
        },
        ui = function (t, e) {
          var s = Math.floor((t /= e));
          return t && s === t ? s - 1 : s;
        },
        pi = function (t, e) {
          return (
            (t - e._start) * e._ts +
            (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
          );
        },
        hi = function (t) {
          return (t._end = Ws(
            t._start + (t._tDur / Math.abs(t._ts || t._rts || ss) || 0)
          ));
        },
        mi = function (t, e) {
          var s = t._dp;
          return (
            s &&
              s.smoothChildTiming &&
              t._ts &&
              ((t._start = Ws(
                s._time -
                  (t._ts > 0
                    ? e / t._ts
                    : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
              )),
              hi(t),
              s._dirty || oi(s, t)),
            t
          );
        },
        fi = function (t, e) {
          var s;
          if (
            ((e._time || (e._initted && !e._dur)) &&
              ((s = pi(t.rawTime(), e)),
              (!e._dur || Li(0, e.totalDuration(), s) - e._tTime > ss) &&
                e.render(s, !0)),
            oi(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
          ) {
            if (t._dur < t.duration())
              for (s = t; s._dp; )
                s.rawTime() >= 0 && s.totalTime(s._tTime), (s = s._dp);
            t._zTime = -1e-8;
          }
        },
        gi = function (t, e, s, i) {
          return (
            e.parent && ai(e),
            (e._start = Ws(
              (us(s) ? s : s || t !== Ee ? xi(t, s, e) : t._time) + e._delay
            )),
            (e._end = Ws(
              e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
            )),
            ni(t, e, "_first", "_last", t._sort ? "_start" : 0),
            yi(e) || (t._recent = e),
            i || fi(t, e),
            t
          );
        },
        vi = function (t, e) {
          return (
            (Es.ScrollTrigger || Os("scrollTrigger", e)) &&
            Es.ScrollTrigger.create(e, t)
          );
        },
        _i = function (t, e, s, i) {
          return (
            Sn(t, e),
            t._initted
              ? !s &&
                t._pt &&
                ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
                Me !== tn.frame
                ? (Is.push(t), (t._lazy = [e, i]), 1)
                : void 0
              : 1
          );
        },
        bi = function t(e) {
          var s = e.parent;
          return (
            s && s._ts && s._initted && !s._lock && (s.rawTime() < 0 || t(s))
          );
        },
        yi = function (t) {
          var e = t.data;
          return "isFromStart" === e || "isStart" === e;
        },
        wi = function (t, e, s, i) {
          var n = t._repeat,
            r = Ws(e) || 0,
            a = t._tTime / t._tDur;
          return (
            a && !i && (t._time *= r / t._dur),
            (t._dur = r),
            (t._tDur = n
              ? n < 0
                ? 1e10
                : Ws(r * (n + 1) + t._rDelay * n)
              : r),
            a > 0 && !i ? mi(t, (t._tTime = t._tDur * a)) : t.parent && hi(t),
            s || oi(t.parent, t),
            t
          );
        },
        Si = function (t) {
          return t instanceof gn ? oi(t) : wi(t, t._dur);
        },
        Ci = { _start: 0, endTime: Ps, totalDuration: Ps },
        xi = function t(e, s, i) {
          var n,
            r,
            a,
            o = e.labels,
            l = e._recent || Ci,
            c = e.duration() >= es ? l.endTime(!1) : e._dur;
          return cs(s) && (isNaN(s) || s in o)
            ? ((r = s.charAt(0)),
              (a = "%" === s.substr(-1)),
              (n = s.indexOf("=")),
              "<" === r || ">" === r
                ? (n >= 0 && (s = s.replace(/=/, "")),
                  ("<" === r ? l._start : l.endTime(l._repeat >= 0)) +
                    (parseFloat(s.substr(1)) || 0) *
                      (a ? (n < 0 ? l : i).totalDuration() / 100 : 1))
                : n < 0
                ? (s in o || (o[s] = c), o[s])
                : ((r = parseFloat(s.charAt(n - 1) + s.substr(n + 1))),
                  a &&
                    i &&
                    (r = (r / 100) * (_s(i) ? i[0] : i).totalDuration()),
                  n > 1 ? t(e, s.substr(0, n - 1), i) + r : c + r))
            : null == s
            ? c
            : +s;
        },
        Ti = function (t, e, s) {
          var i,
            n,
            r = us(e[1]),
            a = (r ? 2 : 1) + (t < 2 ? 0 : 1),
            o = e[a];
          if ((r && (o.duration = e[1]), (o.parent = s), t)) {
            for (i = o, n = s; n && !("immediateRender" in i); )
              (i = n.vars.defaults || {}), (n = ms(n.vars.inherit) && n.parent);
            (o.immediateRender = ms(i.immediateRender)),
              t < 2 ? (o.runBackwards = 1) : (o.startAt = e[a - 1]);
          }
          return new Ln(e[0], o, e[a + 1]);
        },
        Ei = function (t, e) {
          return t || 0 === t ? e(t) : e;
        },
        Li = function (t, e, s) {
          return s < t ? t : s > e ? e : s;
        },
        Ai = function (t, e) {
          return cs(t) && (e = Ts.exec(t)) ? e[1] : "";
        },
        Oi = [].slice,
        ki = function (t, e) {
          return (
            t &&
            hs(t) &&
            "length" in t &&
            ((!e && !t.length) || (t.length - 1 in t && hs(t[0]))) &&
            !t.nodeType &&
            t !== Le
          );
        },
        Mi = function (t, e, s) {
          return (
            void 0 === s && (s = []),
            t.forEach(function (t) {
              var i;
              return (cs(t) && !e) || ki(t, 1)
                ? (i = s).push.apply(i, Pi(t))
                : s.push(t);
            }) || s
          );
        },
        Pi = function (t, e, s) {
          return !cs(t) || s || (!Ae && en())
            ? _s(t)
              ? Mi(t, s)
              : ki(t)
              ? Oi.call(t, 0)
              : t
              ? [t]
              : []
            : Oi.call((e || Oe).querySelectorAll(t), 0);
        },
        $i = function (t) {
          return t.sort(function () {
            return 0.5 - Math.random();
          });
        },
        Ii = function (t) {
          if (ds(t)) return t;
          var e = hs(t) ? t : { each: t },
            s = cn(e.ease),
            i = e.from || 0,
            n = parseFloat(e.base) || 0,
            r = {},
            a = i > 0 && i < 1,
            o = isNaN(i) || a,
            l = e.axis,
            c = i,
            d = i;
          return (
            cs(i)
              ? (c = d = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
              : !a && o && ((c = i[0]), (d = i[1])),
            function (t, a, u) {
              var p,
                h,
                m,
                f,
                g,
                v,
                _,
                b,
                y,
                w = (u || e).length,
                S = r[w];
              if (!S) {
                if (!(y = "auto" === e.grid ? 0 : (e.grid || [1, es])[1])) {
                  for (
                    _ = -es;
                    _ < (_ = u[y++].getBoundingClientRect().left) && y < w;

                  );
                  y--;
                }
                for (
                  S = r[w] = [],
                    p = o ? Math.min(y, w) * c - 0.5 : i % y,
                    h = y === es ? 0 : o ? (w * d) / y - 0.5 : (i / y) | 0,
                    _ = 0,
                    b = es,
                    v = 0;
                  v < w;
                  v++
                )
                  (m = (v % y) - p),
                    (f = h - ((v / y) | 0)),
                    (S[v] = g =
                      l ? Math.abs("y" === l ? f : m) : as(m * m + f * f)),
                    g > _ && (_ = g),
                    g < b && (b = g);
                "random" === i && $i(S),
                  (S.max = _ - b),
                  (S.min = b),
                  (S.v = w =
                    (parseFloat(e.amount) ||
                      parseFloat(e.each) *
                        (y > w
                          ? w - 1
                          : l
                          ? "y" === l
                            ? w / y
                            : y
                          : Math.max(y, w / y)) ||
                      0) * ("edges" === i ? -1 : 1)),
                  (S.b = w < 0 ? n - w : n),
                  (S.u = Ai(e.amount || e.each) || 0),
                  (s = s && w < 0 ? on(s) : s);
              }
              return (
                (w = (S[t] - S.min) / S.max || 0),
                Ws(S.b + (s ? s(w) : w) * S.v) + S.u
              );
            }
          );
        },
        Di = function (t) {
          var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
          return function (s) {
            var i = Math.round(parseFloat(s) / t) * t * e;
            return (i - (i % 1)) / e + (us(s) ? 0 : Ai(s));
          };
        },
        zi = function (t, e) {
          var s,
            i,
            n = _s(t);
          return (
            !n &&
              hs(t) &&
              ((s = n = t.radius || es),
              t.values
                ? ((t = Pi(t.values)), (i = !us(t[0])) && (s *= s))
                : (t = Di(t.increment))),
            Ei(
              e,
              n
                ? ds(t)
                  ? function (e) {
                      return (i = t(e)), Math.abs(i - e) <= s ? i : e;
                    }
                  : function (e) {
                      for (
                        var n,
                          r,
                          a = parseFloat(i ? e.x : e),
                          o = parseFloat(i ? e.y : 0),
                          l = es,
                          c = 0,
                          d = t.length;
                        d--;

                      )
                        (n = i
                          ? (n = t[d].x - a) * n + (r = t[d].y - o) * r
                          : Math.abs(t[d] - a)) < l && ((l = n), (c = d));
                      return (
                        (c = !s || l <= s ? t[c] : e),
                        i || c === e || us(e) ? c : c + Ai(e)
                      );
                    }
                : Di(t)
            )
          );
        },
        qi = function (t, e, s, i) {
          return Ei(_s(t) ? !e : !0 === s ? !!(s = 0) : !i, function () {
            return _s(t)
              ? t[~~(Math.random() * t.length)]
              : (s = s || 1e-5) &&
                  (i = s < 1 ? Math.pow(10, (s + "").length - 2) : 1) &&
                  Math.floor(
                    Math.round(
                      (t - s / 2 + Math.random() * (e - t + 0.99 * s)) / s
                    ) *
                      s *
                      i
                  ) / i;
          });
        },
        Bi = function (t, e, s) {
          return Ei(s, function (s) {
            return t[~~e(s)];
          });
        },
        Ni = function (t) {
          for (var e, s, i, n, r = 0, a = ""; ~(e = t.indexOf("random(", r)); )
            (i = t.indexOf(")", e)),
              (n = "[" === t.charAt(e + 7)),
              (s = t.substr(e + 7, i - e - 7).match(n ? xs : bs)),
              (a +=
                t.substr(r, e - r) +
                qi(n ? s : +s[0], n ? 0 : +s[1], +s[2] || 1e-5)),
              (r = i + 1);
          return a + t.substr(r, t.length - r);
        },
        Fi = function (t, e, s, i, n) {
          var r = e - t,
            a = i - s;
          return Ei(n, function (e) {
            return s + (((e - t) / r) * a || 0);
          });
        },
        Hi = function (t, e, s) {
          var i,
            n,
            r,
            a = t.labels,
            o = es;
          for (i in a)
            (n = a[i] - e) < 0 == !!s &&
              n &&
              o > (n = Math.abs(n)) &&
              ((r = i), (o = n));
          return r;
        },
        Gi = function (t, e, s) {
          var i,
            n,
            r = t.vars,
            a = r[e];
          if (a)
            return (
              (i = r[e + "Params"]),
              (n = r.callbackScope || t),
              s && Is.length && Ys(),
              i ? a.apply(n, i) : a.call(n)
            );
        },
        Vi = function (t) {
          return (
            ai(t),
            t.scrollTrigger && t.scrollTrigger.kill(!1),
            t.progress() < 1 && Gi(t, "onInterrupt"),
            t
          );
        },
        Ri = function (t) {
          var e = (t = (!t.name && t.default) || t).name,
            s = ds(t),
            i =
              e && !s && t.init
                ? function () {
                    this._props = [];
                  }
                : t,
            n = {
              init: Ps,
              render: zn,
              add: yn,
              kill: Bn,
              modifier: qn,
              rawVars: 0,
            },
            r = {
              targetTest: 0,
              get: 0,
              getSetter: Pn,
              aliases: {},
              register: 0,
            };
          if ((en(), t !== i)) {
            if (zs[e]) return;
            Js(i, Js(si(t, n), r)),
              ti(i.prototype, ti(n, si(t, r))),
              (zs[(i.prop = e)] = i),
              t.targetTest && (Ns.push(i), ($s[e] = 1)),
              (e =
                ("css" === e
                  ? "CSS"
                  : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
          }
          Ms(e, i), t.register && t.register(jn, i, Hn);
        },
        ji = 255,
        Wi = {
          aqua: [0, ji, ji],
          lime: [0, ji, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, ji],
          navy: [0, 0, 128],
          white: [ji, ji, ji],
          olive: [128, 128, 0],
          yellow: [ji, ji, 0],
          orange: [ji, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [ji, 0, 0],
          pink: [ji, 192, 203],
          cyan: [0, ji, ji],
          transparent: [ji, ji, ji, 0],
        },
        Xi = function (t, e, s) {
          return (
            ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
              ? e + (s - e) * t * 6
              : t < 0.5
              ? s
              : 3 * t < 2
              ? e + (s - e) * (2 / 3 - t) * 6
              : e) *
              ji +
              0.5) |
            0
          );
        },
        Ui = function (t, e, s) {
          var i,
            n,
            r,
            a,
            o,
            l,
            c,
            d,
            u,
            p,
            h = t ? (us(t) ? [t >> 16, (t >> 8) & ji, t & ji] : 0) : Wi.black;
          if (!h) {
            if (
              ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Wi[t])
            )
              h = Wi[t];
            else if ("#" === t.charAt(0)) {
              if (
                (t.length < 6 &&
                  ((i = t.charAt(1)),
                  (n = t.charAt(2)),
                  (r = t.charAt(3)),
                  (t =
                    "#" +
                    i +
                    i +
                    n +
                    n +
                    r +
                    r +
                    (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
                9 === t.length)
              )
                return [
                  (h = parseInt(t.substr(1, 6), 16)) >> 16,
                  (h >> 8) & ji,
                  h & ji,
                  parseInt(t.substr(7), 16) / 255,
                ];
              h = [
                (t = parseInt(t.substr(1), 16)) >> 16,
                (t >> 8) & ji,
                t & ji,
              ];
            } else if ("hsl" === t.substr(0, 3))
              if (((h = p = t.match(bs)), e)) {
                if (~t.indexOf("="))
                  return (h = t.match(ys)), s && h.length < 4 && (h[3] = 1), h;
              } else
                (a = (+h[0] % 360) / 360),
                  (o = +h[1] / 100),
                  (i =
                    2 * (l = +h[2] / 100) -
                    (n = l <= 0.5 ? l * (o + 1) : l + o - l * o)),
                  h.length > 3 && (h[3] *= 1),
                  (h[0] = Xi(a + 1 / 3, i, n)),
                  (h[1] = Xi(a, i, n)),
                  (h[2] = Xi(a - 1 / 3, i, n));
            else h = t.match(bs) || Wi.transparent;
            h = h.map(Number);
          }
          return (
            e &&
              !p &&
              ((i = h[0] / ji),
              (n = h[1] / ji),
              (r = h[2] / ji),
              (l = ((c = Math.max(i, n, r)) + (d = Math.min(i, n, r))) / 2),
              c === d
                ? (a = o = 0)
                : ((u = c - d),
                  (o = l > 0.5 ? u / (2 - c - d) : u / (c + d)),
                  (a =
                    c === i
                      ? (n - r) / u + (n < r ? 6 : 0)
                      : c === n
                      ? (r - i) / u + 2
                      : (i - n) / u + 4),
                  (a *= 60)),
              (h[0] = ~~(a + 0.5)),
              (h[1] = ~~(100 * o + 0.5)),
              (h[2] = ~~(100 * l + 0.5))),
            s && h.length < 4 && (h[3] = 1),
            h
          );
        },
        Yi = function (t) {
          var e = [],
            s = [],
            i = -1;
          return (
            t.split(Ki).forEach(function (t) {
              var n = t.match(ws) || [];
              e.push.apply(e, n), s.push((i += n.length + 1));
            }),
            (e.c = s),
            e
          );
        },
        Qi = function (t, e, s) {
          var i,
            n,
            r,
            a,
            o = "",
            l = (t + o).match(Ki),
            c = e ? "hsla(" : "rgba(",
            d = 0;
          if (!l) return t;
          if (
            ((l = l.map(function (t) {
              return (
                (t = Ui(t, e, 1)) &&
                c +
                  (e
                    ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                    : t.join(",")) +
                  ")"
              );
            })),
            s && ((r = Yi(t)), (i = s.c).join(o) !== r.c.join(o)))
          )
            for (a = (n = t.replace(Ki, "1").split(ws)).length - 1; d < a; d++)
              o +=
                n[d] +
                (~i.indexOf(d)
                  ? l.shift() || c + "0,0,0,0)"
                  : (r.length ? r : l.length ? l : s).shift());
          if (!n)
            for (a = (n = t.split(Ki)).length - 1; d < a; d++) o += n[d] + l[d];
          return o + n[a];
        },
        Ki = (function () {
          var t,
            e =
              "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
          for (t in Wi) e += "|" + t + "\\b";
          return new RegExp(e + ")", "gi");
        })(),
        Zi = /hsl[a]?\(/,
        Ji = function (t) {
          var e,
            s = t.join(" ");
          if (((Ki.lastIndex = 0), Ki.test(s)))
            return (
              (e = Zi.test(s)),
              (t[1] = Qi(t[1], e)),
              (t[0] = Qi(t[0], e, Yi(t[1]))),
              !0
            );
        },
        tn =
          ((Fe = Date.now),
          (He = 500),
          (Ge = 33),
          (Ve = Fe()),
          (Re = Ve),
          (We = je = 1e3 / 240),
          (Ue = function t(e) {
            var s,
              i,
              n,
              r,
              a = Fe() - Re,
              o = !0 === e;
            if (
              (a > He && (Ve += a - Ge),
              ((s = (n = (Re += a) - Ve) - We) > 0 || o) &&
                ((r = ++qe.frame),
                (Be = n - 1e3 * qe.time),
                (qe.time = n /= 1e3),
                (We += s + (s >= je ? 4 : je - s)),
                (i = 1)),
              o || (Ie = De(t)),
              i)
            )
              for (Ne = 0; Ne < Xe.length; Ne++) Xe[Ne](n, Be, r, e);
          }),
          (qe = {
            time: 0,
            frame: 0,
            tick: function () {
              Ue(!0);
            },
            deltaRatio: function (t) {
              return Be / (1e3 / (t || 60));
            },
            wake: function () {
              ke &&
                (!Ae &&
                  fs() &&
                  ((Le = Ae = window),
                  (Oe = Le.document || {}),
                  (Es.gsap = jn),
                  (Le.gsapVersions || (Le.gsapVersions = [])).push(jn.version),
                  As(Ls || Le.GreenSockGlobals || (!Le.gsap && Le) || {}),
                  (ze = Le.requestAnimationFrame)),
                Ie && qe.sleep(),
                (De =
                  ze ||
                  function (t) {
                    return setTimeout(t, (We - 1e3 * qe.time + 1) | 0);
                  }),
                ($e = 1),
                Ue(2));
            },
            sleep: function () {
              (ze ? Le.cancelAnimationFrame : clearTimeout)(Ie),
                ($e = 0),
                (De = Ps);
            },
            lagSmoothing: function (t, e) {
              (He = t || 1e8), (Ge = Math.min(e, He, 0));
            },
            fps: function (t) {
              (je = 1e3 / (t || 240)), (We = 1e3 * qe.time + je);
            },
            add: function (t, e, s) {
              var i = e
                ? function (e, s, n, r) {
                    t(e, s, n, r), qe.remove(i);
                  }
                : t;
              return qe.remove(t), Xe[s ? "unshift" : "push"](i), en(), i;
            },
            remove: function (t, e) {
              ~(e = Xe.indexOf(t)) && Xe.splice(e, 1) && Ne >= e && Ne--;
            },
            _listeners: (Xe = []),
          }),
          qe),
        en = function () {
          return !$e && tn.wake();
        },
        sn = {},
        nn = /^[\d.\-M][\d.\-,\s]/,
        rn = /["']/g,
        an = function (t) {
          for (
            var e,
              s,
              i,
              n = {},
              r = t.substr(1, t.length - 3).split(":"),
              a = r[0],
              o = 1,
              l = r.length;
            o < l;
            o++
          )
            (s = r[o]),
              (e = o !== l - 1 ? s.lastIndexOf(",") : s.length),
              (i = s.substr(0, e)),
              (n[a] = isNaN(i) ? i.replace(rn, "").trim() : +i),
              (a = s.substr(e + 1).trim());
          return n;
        },
        on = function (t) {
          return function (e) {
            return 1 - t(1 - e);
          };
        },
        ln = function t(e, s) {
          for (var i, n = e._first; n; )
            n instanceof gn
              ? t(n, s)
              : !n.vars.yoyoEase ||
                (n._yoyo && n._repeat) ||
                n._yoyo === s ||
                (n.timeline
                  ? t(n.timeline, s)
                  : ((i = n._ease),
                    (n._ease = n._yEase),
                    (n._yEase = i),
                    (n._yoyo = s))),
              (n = n._next);
        },
        cn = function (t, e) {
          return (
            (t &&
              (ds(t)
                ? t
                : sn[t] ||
                  (function (t) {
                    var e = (t + "").split("("),
                      s = sn[e[0]];
                    return s && e.length > 1 && s.config
                      ? s.config.apply(
                          null,
                          ~t.indexOf("{")
                            ? [an(e[1])]
                            : (function (t) {
                                var e = t.indexOf("(") + 1,
                                  s = t.indexOf(")"),
                                  i = t.indexOf("(", e);
                                return t.substring(
                                  e,
                                  ~i && i < s ? t.indexOf(")", s + 1) : s
                                );
                              })(t)
                                .split(",")
                                .map(Ks)
                        )
                      : sn._CE && nn.test(t)
                      ? sn._CE("", t)
                      : s;
                  })(t))) ||
            e
          );
        },
        dn = function (t, e, s, i) {
          void 0 === s &&
            (s = function (t) {
              return 1 - e(1 - t);
            }),
            void 0 === i &&
              (i = function (t) {
                return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
              });
          var n,
            r = { easeIn: e, easeOut: s, easeInOut: i };
          return (
            Rs(t, function (t) {
              for (var e in ((sn[t] = Es[t] = r),
              (sn[(n = t.toLowerCase())] = s),
              r))
                sn[
                  n +
                    ("easeIn" === e
                      ? ".in"
                      : "easeOut" === e
                      ? ".out"
                      : ".inOut")
                ] = sn[t + "." + e] = r[e];
            }),
            r
          );
        },
        un = function (t) {
          return function (e) {
            return e < 0.5
              ? (1 - t(1 - 2 * e)) / 2
              : 0.5 + t(2 * (e - 0.5)) / 2;
          };
        },
        pn = function t(e, s, i) {
          var n = s >= 1 ? s : 1,
            r = (i || (e ? 0.3 : 0.45)) / (s < 1 ? s : 1),
            a = (r / is) * (Math.asin(1 / n) || 0),
            o = function (t) {
              return 1 === t
                ? 1
                : n * Math.pow(2, -10 * t) * ls((t - a) * r) + 1;
            },
            l =
              "out" === e
                ? o
                : "in" === e
                ? function (t) {
                    return 1 - o(1 - t);
                  }
                : un(o);
          return (
            (r = is / r),
            (l.config = function (s, i) {
              return t(e, s, i);
            }),
            l
          );
        },
        hn = function t(e, s) {
          void 0 === s && (s = 1.70158);
          var i = function (t) {
              return t ? --t * t * ((s + 1) * t + s) + 1 : 0;
            },
            n =
              "out" === e
                ? i
                : "in" === e
                ? function (t) {
                    return 1 - i(1 - t);
                  }
                : un(i);
          return (
            (n.config = function (s) {
              return t(e, s);
            }),
            n
          );
        };
      Rs("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
        var s = e < 5 ? e + 1 : e;
        dn(
          t + ",Power" + (s - 1),
          e
            ? function (t) {
                return Math.pow(t, s);
              }
            : function (t) {
                return t;
              },
          function (t) {
            return 1 - Math.pow(1 - t, s);
          },
          function (t) {
            return t < 0.5
              ? Math.pow(2 * t, s) / 2
              : 1 - Math.pow(2 * (1 - t), s) / 2;
          }
        );
      }),
        (sn.Linear.easeNone = sn.none = sn.Linear.easeIn),
        dn("Elastic", pn("in"), pn("out"), pn()),
        (Ye = 7.5625),
        (Ke = 1 / (Qe = 2.75)),
        dn(
          "Bounce",
          function (t) {
            return 1 - Ze(1 - t);
          },
          (Ze = function (t) {
            return t < Ke
              ? Ye * t * t
              : t < 0.7272727272727273
              ? Ye * Math.pow(t - 1.5 / Qe, 2) + 0.75
              : t < 0.9090909090909092
              ? Ye * (t -= 2.25 / Qe) * t + 0.9375
              : Ye * Math.pow(t - 2.625 / Qe, 2) + 0.984375;
          })
        ),
        dn("Expo", function (t) {
          return t ? Math.pow(2, 10 * (t - 1)) : 0;
        }),
        dn("Circ", function (t) {
          return -(as(1 - t * t) - 1);
        }),
        dn("Sine", function (t) {
          return 1 === t ? 1 : 1 - os(t * ns);
        }),
        dn("Back", hn("in"), hn("out"), hn()),
        (sn.SteppedEase =
          sn.steps =
          Es.SteppedEase =
            {
              config: function (t, e) {
                void 0 === t && (t = 1);
                var s = 1 / t,
                  i = t + (e ? 0 : 1),
                  n = e ? 1 : 0;
                return function (t) {
                  return (((i * Li(0, 0.99999999, t)) | 0) + n) * s;
                };
              },
            }),
        (ts.ease = sn["quad.out"]),
        Rs(
          "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
          function (t) {
            return (Fs += t + "," + t + "Params,");
          }
        );
      var mn = function (t, e) {
          (this.id = rs++),
            (t._gsap = this),
            (this.target = t),
            (this.harness = e),
            (this.get = e ? e.get : Vs),
            (this.set = e ? e.getSetter : Pn);
        },
        fn = (function () {
          function t(t) {
            (this.vars = t),
              (this._delay = +t.delay || 0),
              (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
                ((this._rDelay = t.repeatDelay || 0),
                (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
              (this._ts = 1),
              wi(this, +t.duration, 1, 1),
              (this.data = t.data),
              $e || tn.wake();
          }
          var e = t.prototype;
          return (
            (e.delay = function (t) {
              return t || 0 === t
                ? (this.parent &&
                    this.parent.smoothChildTiming &&
                    this.startTime(this._start + t - this._delay),
                  (this._delay = t),
                  this)
                : this._delay;
            }),
            (e.duration = function (t) {
              return arguments.length
                ? this.totalDuration(
                    this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
                  )
                : this.totalDuration() && this._dur;
            }),
            (e.totalDuration = function (t) {
              return arguments.length
                ? ((this._dirty = 0),
                  wi(
                    this,
                    this._repeat < 0
                      ? t
                      : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                  ))
                : this._tDur;
            }),
            (e.totalTime = function (t, e) {
              if ((en(), !arguments.length)) return this._tTime;
              var s = this._dp;
              if (s && s.smoothChildTiming && this._ts) {
                for (
                  mi(this, t), !s._dp || s.parent || fi(s, this);
                  s && s.parent;

                )
                  s.parent._time !==
                    s._start +
                      (s._ts >= 0
                        ? s._tTime / s._ts
                        : (s.totalDuration() - s._tTime) / -s._ts) &&
                    s.totalTime(s._tTime, !0),
                    (s = s.parent);
                !this.parent &&
                  this._dp.autoRemoveChildren &&
                  ((this._ts > 0 && t < this._tDur) ||
                    (this._ts < 0 && t > 0) ||
                    (!this._tDur && !t)) &&
                  gi(this._dp, this, this._start - this._delay);
              }
              return (
                (this._tTime !== t ||
                  (!this._dur && !e) ||
                  (this._initted && Math.abs(this._zTime) === ss) ||
                  (!t && !this._initted && (this.add || this._ptLookup))) &&
                  (this._ts || (this._pTime = t), Qs(this, t, e)),
                this
              );
            }),
            (e.time = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    Math.min(this.totalDuration(), t + di(this)) %
                      (this._dur + this._rDelay) || (t ? this._dur : 0),
                    e
                  )
                : this._time;
            }),
            (e.totalProgress = function (t, e) {
              return arguments.length
                ? this.totalTime(this.totalDuration() * t, e)
                : this.totalDuration()
                ? Math.min(1, this._tTime / this._tDur)
                : this.ratio;
            }),
            (e.progress = function (t, e) {
              return arguments.length
                ? this.totalTime(
                    this.duration() *
                      (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                      di(this),
                    e
                  )
                : this.duration()
                ? Math.min(1, this._time / this._dur)
                : this.ratio;
            }),
            (e.iteration = function (t, e) {
              var s = this.duration() + this._rDelay;
              return arguments.length
                ? this.totalTime(this._time + (t - 1) * s, e)
                : this._repeat
                ? ui(this._tTime, s) + 1
                : 1;
            }),
            (e.timeScale = function (t) {
              if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
              if (this._rts === t) return this;
              var e =
                this.parent && this._ts
                  ? pi(this.parent._time, this)
                  : this._tTime;
              return (
                (this._rts = +t || 0),
                (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
                this.totalTime(Li(-this._delay, this._tDur, e), !0),
                hi(this),
                li(this)
              );
            }),
            (e.paused = function (t) {
              return arguments.length
                ? (this._ps !== t &&
                    ((this._ps = t),
                    t
                      ? ((this._pTime =
                          this._tTime ||
                          Math.max(-this._delay, this.rawTime())),
                        (this._ts = this._act = 0))
                      : (en(),
                        (this._ts = this._rts),
                        this.totalTime(
                          this.parent && !this.parent.smoothChildTiming
                            ? this.rawTime()
                            : this._tTime || this._pTime,
                          1 === this.progress() &&
                            Math.abs(this._zTime) !== ss &&
                            (this._tTime -= ss)
                        ))),
                  this)
                : this._ps;
            }),
            (e.startTime = function (t) {
              if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return (
                  e &&
                    (e._sort || !this.parent) &&
                    gi(e, this, t - this._delay),
                  this
                );
              }
              return this._start;
            }),
            (e.endTime = function (t) {
              return (
                this._start +
                (ms(t) ? this.totalDuration() : this.duration()) /
                  Math.abs(this._ts || 1)
              );
            }),
            (e.rawTime = function (t) {
              var e = this.parent || this._dp;
              return e
                ? t &&
                  (!this._ts ||
                    (this._repeat && this._time && this.totalProgress() < 1))
                  ? this._tTime % (this._dur + this._rDelay)
                  : this._ts
                  ? pi(e.rawTime(t), this)
                  : this._tTime
                : this._tTime;
            }),
            (e.globalTime = function (t) {
              for (var e = this, s = arguments.length ? t : e.rawTime(); e; )
                (s = e._start + s / (e._ts || 1)), (e = e._dp);
              return s;
            }),
            (e.repeat = function (t) {
              return arguments.length
                ? ((this._repeat = t === 1 / 0 ? -2 : t), Si(this))
                : -2 === this._repeat
                ? 1 / 0
                : this._repeat;
            }),
            (e.repeatDelay = function (t) {
              if (arguments.length) {
                var e = this._time;
                return (this._rDelay = t), Si(this), e ? this.time(e) : this;
              }
              return this._rDelay;
            }),
            (e.yoyo = function (t) {
              return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
            }),
            (e.seek = function (t, e) {
              return this.totalTime(xi(this, t), ms(e));
            }),
            (e.restart = function (t, e) {
              return this.play().totalTime(t ? -this._delay : 0, ms(e));
            }),
            (e.play = function (t, e) {
              return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
            }),
            (e.reverse = function (t, e) {
              return (
                null != t && this.seek(t || this.totalDuration(), e),
                this.reversed(!0).paused(!1)
              );
            }),
            (e.pause = function (t, e) {
              return null != t && this.seek(t, e), this.paused(!0);
            }),
            (e.resume = function () {
              return this.paused(!1);
            }),
            (e.reversed = function (t) {
              return arguments.length
                ? (!!t !== this.reversed() &&
                    this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                  this)
                : this._rts < 0;
            }),
            (e.invalidate = function () {
              return (
                (this._initted = this._act = 0), (this._zTime = -1e-8), this
              );
            }),
            (e.isActive = function () {
              var t,
                e = this.parent || this._dp,
                s = this._start;
              return !(
                e &&
                !(
                  this._ts &&
                  this._initted &&
                  e.isActive() &&
                  (t = e.rawTime(!0)) >= s &&
                  t < this.endTime(!0) - ss
                )
              );
            }),
            (e.eventCallback = function (t, e, s) {
              var i = this.vars;
              return arguments.length > 1
                ? (e
                    ? ((i[t] = e),
                      s && (i[t + "Params"] = s),
                      "onUpdate" === t && (this._onUpdate = e))
                    : delete i[t],
                  this)
                : i[t];
            }),
            (e.then = function (t) {
              var e = this;
              return new Promise(function (s) {
                var i = ds(t) ? t : Zs,
                  n = function () {
                    var t = e.then;
                    (e.then = null),
                      ds(i) &&
                        (i = i(e)) &&
                        (i.then || i === e) &&
                        (e.then = t),
                      s(i),
                      (e.then = t);
                  };
                (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
                (!e._tTime && e._ts < 0)
                  ? n()
                  : (e._prom = n);
              });
            }),
            (e.kill = function () {
              Vi(this);
            }),
            t
          );
        })();
      Js(fn.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -1e-8,
        _prom: 0,
        _ps: !1,
        _rts: 1,
      });
      var gn = (function (t) {
        function e(e, s) {
          var i;
          return (
            void 0 === e && (e = {}),
            ((i = t.call(this, e) || this).labels = {}),
            (i.smoothChildTiming = !!e.smoothChildTiming),
            (i.autoRemoveChildren = !!e.autoRemoveChildren),
            (i._sort = ms(e.sortChildren)),
            Ee && gi(e.parent || Ee, Ce(i), s),
            e.reversed && i.reverse(),
            e.paused && i.paused(!0),
            e.scrollTrigger && vi(Ce(i), e.scrollTrigger),
            i
          );
        }
        xe(e, t);
        var s = e.prototype;
        return (
          (s.to = function (t, e, s) {
            return Ti(0, arguments, this), this;
          }),
          (s.from = function (t, e, s) {
            return Ti(1, arguments, this), this;
          }),
          (s.fromTo = function (t, e, s, i) {
            return Ti(2, arguments, this), this;
          }),
          (s.set = function (t, e, s) {
            return (
              (e.duration = 0),
              (e.parent = this),
              ii(e).repeatDelay || (e.repeat = 0),
              (e.immediateRender = !!e.immediateRender),
              new Ln(t, e, xi(this, s), 1),
              this
            );
          }),
          (s.call = function (t, e, s) {
            return gi(this, Ln.delayedCall(0, t, e), s);
          }),
          (s.staggerTo = function (t, e, s, i, n, r, a) {
            return (
              (s.duration = e),
              (s.stagger = s.stagger || i),
              (s.onComplete = r),
              (s.onCompleteParams = a),
              (s.parent = this),
              new Ln(t, s, xi(this, n)),
              this
            );
          }),
          (s.staggerFrom = function (t, e, s, i, n, r, a) {
            return (
              (s.runBackwards = 1),
              (ii(s).immediateRender = ms(s.immediateRender)),
              this.staggerTo(t, e, s, i, n, r, a)
            );
          }),
          (s.staggerFromTo = function (t, e, s, i, n, r, a, o) {
            return (
              (i.startAt = s),
              (ii(i).immediateRender = ms(i.immediateRender)),
              this.staggerTo(t, e, i, n, r, a, o)
            );
          }),
          (s.render = function (t, e, s) {
            var i,
              n,
              r,
              a,
              o,
              l,
              c,
              d,
              u,
              p,
              h,
              m,
              f = this._time,
              g = this._dirty ? this.totalDuration() : this._tDur,
              v = this._dur,
              _ = t <= 0 ? 0 : Ws(t),
              b = this._zTime < 0 != t < 0 && (this._initted || !v);
            if (
              (this !== Ee && _ > g && t >= 0 && (_ = g),
              _ !== this._tTime || s || b)
            ) {
              if (
                (f !== this._time &&
                  v &&
                  ((_ += this._time - f), (t += this._time - f)),
                (i = _),
                (u = this._start),
                (l = !(d = this._ts)),
                b && (v || (f = this._zTime), (t || !e) && (this._zTime = t)),
                this._repeat)
              ) {
                if (
                  ((h = this._yoyo),
                  (o = v + this._rDelay),
                  this._repeat < -1 && t < 0)
                )
                  return this.totalTime(100 * o + t, e, s);
                if (
                  ((i = Ws(_ % o)),
                  _ === g
                    ? ((a = this._repeat), (i = v))
                    : ((a = ~~(_ / o)) && a === _ / o && ((i = v), a--),
                      i > v && (i = v)),
                  (p = ui(this._tTime, o)),
                  !f && this._tTime && p !== a && (p = a),
                  h && 1 & a && ((i = v - i), (m = 1)),
                  a !== p && !this._lock)
                ) {
                  var y = h && 1 & p,
                    w = y === (h && 1 & a);
                  if (
                    (a < p && (y = !y),
                    (f = y ? 0 : v),
                    (this._lock = 1),
                    (this.render(f || (m ? 0 : Ws(a * o)), e, !v)._lock = 0),
                    (this._tTime = _),
                    !e && this.parent && Gi(this, "onRepeat"),
                    this.vars.repeatRefresh &&
                      !m &&
                      (this.invalidate()._lock = 1),
                    (f && f !== this._time) ||
                      l !== !this._ts ||
                      (this.vars.onRepeat && !this.parent && !this._act))
                  )
                    return this;
                  if (
                    ((v = this._dur),
                    (g = this._tDur),
                    w &&
                      ((this._lock = 2),
                      (f = y ? v : -1e-4),
                      this.render(f, !0),
                      this.vars.repeatRefresh && !m && this.invalidate()),
                    (this._lock = 0),
                    !this._ts && !l)
                  )
                    return this;
                  ln(this, m);
                }
              }
              if (
                (this._hasPause &&
                  !this._forcing &&
                  this._lock < 2 &&
                  ((c = (function (t, e, s) {
                    var i;
                    if (s > e)
                      for (i = t._first; i && i._start <= s; ) {
                        if ("isPause" === i.data && i._start > e) return i;
                        i = i._next;
                      }
                    else
                      for (i = t._last; i && i._start >= s; ) {
                        if ("isPause" === i.data && i._start < e) return i;
                        i = i._prev;
                      }
                  })(this, Ws(f), Ws(i))),
                  c && (_ -= i - (i = c._start))),
                (this._tTime = _),
                (this._time = i),
                (this._act = !d),
                this._initted ||
                  ((this._onUpdate = this.vars.onUpdate),
                  (this._initted = 1),
                  (this._zTime = t),
                  (f = 0)),
                !f && i && !e && (Gi(this, "onStart"), this._tTime !== _))
              )
                return this;
              if (i >= f && t >= 0)
                for (n = this._first; n; ) {
                  if (
                    ((r = n._next),
                    (n._act || i >= n._start) && n._ts && c !== n)
                  ) {
                    if (n.parent !== this) return this.render(t, e, s);
                    if (
                      (n.render(
                        n._ts > 0
                          ? (i - n._start) * n._ts
                          : (n._dirty ? n.totalDuration() : n._tDur) +
                              (i - n._start) * n._ts,
                        e,
                        s
                      ),
                      i !== this._time || (!this._ts && !l))
                    ) {
                      (c = 0), r && (_ += this._zTime = -1e-8);
                      break;
                    }
                  }
                  n = r;
                }
              else {
                n = this._last;
                for (var S = t < 0 ? t : i; n; ) {
                  if (
                    ((r = n._prev), (n._act || S <= n._end) && n._ts && c !== n)
                  ) {
                    if (n.parent !== this) return this.render(t, e, s);
                    if (
                      (n.render(
                        n._ts > 0
                          ? (S - n._start) * n._ts
                          : (n._dirty ? n.totalDuration() : n._tDur) +
                              (S - n._start) * n._ts,
                        e,
                        s
                      ),
                      i !== this._time || (!this._ts && !l))
                    ) {
                      (c = 0), r && (_ += this._zTime = S ? -1e-8 : ss);
                      break;
                    }
                  }
                  n = r;
                }
              }
              if (
                c &&
                !e &&
                (this.pause(),
                (c.render(i >= f ? 0 : -1e-8)._zTime = i >= f ? 1 : -1),
                this._ts)
              )
                return (this._start = u), hi(this), this.render(t, e, s);
              this._onUpdate && !e && Gi(this, "onUpdate", !0),
                ((_ === g && this._tTime >= this.totalDuration()) ||
                  (!_ && f)) &&
                  ((u !== this._start && Math.abs(d) === Math.abs(this._ts)) ||
                    this._lock ||
                    ((t || !v) &&
                      ((_ === g && this._ts > 0) || (!_ && this._ts < 0)) &&
                      ai(this, 1),
                    e ||
                      (t < 0 && !f) ||
                      (!_ && !f && g) ||
                      (Gi(
                        this,
                        _ === g && t >= 0 ? "onComplete" : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(_ < g && this.timeScale() > 0) &&
                        this._prom())));
            }
            return this;
          }),
          (s.add = function (t, e) {
            var s = this;
            if ((us(e) || (e = xi(this, e, t)), !(t instanceof fn))) {
              if (_s(t))
                return (
                  t.forEach(function (t) {
                    return s.add(t, e);
                  }),
                  this
                );
              if (cs(t)) return this.addLabel(t, e);
              if (!ds(t)) return this;
              t = Ln.delayedCall(0, t);
            }
            return this !== t ? gi(this, t, e) : this;
          }),
          (s.getChildren = function (t, e, s, i) {
            void 0 === t && (t = !0),
              void 0 === e && (e = !0),
              void 0 === s && (s = !0),
              void 0 === i && (i = -es);
            for (var n = [], r = this._first; r; )
              r._start >= i &&
                (r instanceof Ln
                  ? e && n.push(r)
                  : (s && n.push(r),
                    t && n.push.apply(n, r.getChildren(!0, e, s)))),
                (r = r._next);
            return n;
          }),
          (s.getById = function (t) {
            for (var e = this.getChildren(1, 1, 1), s = e.length; s--; )
              if (e[s].vars.id === t) return e[s];
          }),
          (s.remove = function (t) {
            return cs(t)
              ? this.removeLabel(t)
              : ds(t)
              ? this.killTweensOf(t)
              : (ri(this, t),
                t === this._recent && (this._recent = this._last),
                oi(this));
          }),
          (s.totalTime = function (e, s) {
            return arguments.length
              ? ((this._forcing = 1),
                !this._dp &&
                  this._ts &&
                  (this._start = Ws(
                    tn.time -
                      (this._ts > 0
                        ? e / this._ts
                        : (this.totalDuration() - e) / -this._ts)
                  )),
                t.prototype.totalTime.call(this, e, s),
                (this._forcing = 0),
                this)
              : this._tTime;
          }),
          (s.addLabel = function (t, e) {
            return (this.labels[t] = xi(this, e)), this;
          }),
          (s.removeLabel = function (t) {
            return delete this.labels[t], this;
          }),
          (s.addPause = function (t, e, s) {
            var i = Ln.delayedCall(0, e || Ps, s);
            return (
              (i.data = "isPause"),
              (this._hasPause = 1),
              gi(this, i, xi(this, t))
            );
          }),
          (s.removePause = function (t) {
            var e = this._first;
            for (t = xi(this, t); e; )
              e._start === t && "isPause" === e.data && ai(e), (e = e._next);
          }),
          (s.killTweensOf = function (t, e, s) {
            for (var i = this.getTweensOf(t, s), n = i.length; n--; )
              vn !== i[n] && i[n].kill(t, e);
            return this;
          }),
          (s.getTweensOf = function (t, e) {
            for (var s, i = [], n = Pi(t), r = this._first, a = us(e); r; )
              r instanceof Ln
                ? Us(r._targets, n) &&
                  (a
                    ? (!vn || (r._initted && r._ts)) &&
                      r.globalTime(0) <= e &&
                      r.globalTime(r.totalDuration()) > e
                    : !e || r.isActive()) &&
                  i.push(r)
                : (s = r.getTweensOf(n, e)).length && i.push.apply(i, s),
                (r = r._next);
            return i;
          }),
          (s.tweenTo = function (t, e) {
            e = e || {};
            var s,
              i = this,
              n = xi(i, t),
              r = e,
              a = r.startAt,
              o = r.onStart,
              l = r.onStartParams,
              c = r.immediateRender,
              d = Ln.to(
                i,
                Js(
                  {
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: n,
                    overwrite: "auto",
                    duration:
                      e.duration ||
                      Math.abs(
                        (n - (a && "time" in a ? a.time : i._time)) /
                          i.timeScale()
                      ) ||
                      ss,
                    onStart: function () {
                      if ((i.pause(), !s)) {
                        var t =
                          e.duration ||
                          Math.abs(
                            (n - (a && "time" in a ? a.time : i._time)) /
                              i.timeScale()
                          );
                        d._dur !== t && wi(d, t, 0, 1).render(d._time, !0, !0),
                          (s = 1);
                      }
                      o && o.apply(d, l || []);
                    },
                  },
                  e
                )
              );
            return c ? d.render(0) : d;
          }),
          (s.tweenFromTo = function (t, e, s) {
            return this.tweenTo(e, Js({ startAt: { time: xi(this, t) } }, s));
          }),
          (s.recent = function () {
            return this._recent;
          }),
          (s.nextLabel = function (t) {
            return void 0 === t && (t = this._time), Hi(this, xi(this, t));
          }),
          (s.previousLabel = function (t) {
            return void 0 === t && (t = this._time), Hi(this, xi(this, t), 1);
          }),
          (s.currentLabel = function (t) {
            return arguments.length
              ? this.seek(t, !0)
              : this.previousLabel(this._time + ss);
          }),
          (s.shiftChildren = function (t, e, s) {
            void 0 === s && (s = 0);
            for (var i, n = this._first, r = this.labels; n; )
              n._start >= s && ((n._start += t), (n._end += t)), (n = n._next);
            if (e) for (i in r) r[i] >= s && (r[i] += t);
            return oi(this);
          }),
          (s.invalidate = function () {
            var e = this._first;
            for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
            return t.prototype.invalidate.call(this);
          }),
          (s.clear = function (t) {
            void 0 === t && (t = !0);
            for (var e, s = this._first; s; )
              (e = s._next), this.remove(s), (s = e);
            return (
              this._dp && (this._time = this._tTime = this._pTime = 0),
              t && (this.labels = {}),
              oi(this)
            );
          }),
          (s.totalDuration = function (t) {
            var e,
              s,
              i,
              n = 0,
              r = this,
              a = r._last,
              o = es;
            if (arguments.length)
              return r.timeScale(
                (r._repeat < 0 ? r.duration() : r.totalDuration()) /
                  (r.reversed() ? -t : t)
              );
            if (r._dirty) {
              for (i = r.parent; a; )
                (e = a._prev),
                  a._dirty && a.totalDuration(),
                  (s = a._start) > o && r._sort && a._ts && !r._lock
                    ? ((r._lock = 1), (gi(r, a, s - a._delay, 1)._lock = 0))
                    : (o = s),
                  s < 0 &&
                    a._ts &&
                    ((n -= s),
                    ((!i && !r._dp) || (i && i.smoothChildTiming)) &&
                      ((r._start += s / r._ts),
                      (r._time -= s),
                      (r._tTime -= s)),
                    r.shiftChildren(-s, !1, -Infinity),
                    (o = 0)),
                  a._end > n && a._ts && (n = a._end),
                  (a = e);
              wi(r, r === Ee && r._time > n ? r._time : n, 1, 1),
                (r._dirty = 0);
            }
            return r._tDur;
          }),
          (e.updateRoot = function (t) {
            if (
              (Ee._ts && (Qs(Ee, pi(t, Ee)), (Me = tn.frame)), tn.frame >= Bs)
            ) {
              Bs += Je.autoSleep || 120;
              var e = Ee._first;
              if ((!e || !e._ts) && Je.autoSleep && tn._listeners.length < 2) {
                for (; e && !e._ts; ) e = e._next;
                e || tn.sleep();
              }
            }
          }),
          e
        );
      })(fn);
      Js(gn.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
      var vn,
        _n,
        bn = function (t, e, s, i, n, r, a) {
          var o,
            l,
            c,
            d,
            u,
            p,
            h,
            m,
            f = new Hn(this._pt, t, e, 0, 1, Dn, null, n),
            g = 0,
            v = 0;
          for (
            f.b = s,
              f.e = i,
              s += "",
              (h = ~(i += "").indexOf("random(")) && (i = Ni(i)),
              r && (r((m = [s, i]), t, e), (s = m[0]), (i = m[1])),
              l = s.match(Ss) || [];
            (o = Ss.exec(i));

          )
            (d = o[0]),
              (u = i.substring(g, o.index)),
              c ? (c = (c + 1) % 5) : "rgba(" === u.substr(-5) && (c = 1),
              d !== l[v++] &&
                ((p = parseFloat(l[v - 1]) || 0),
                (f._pt = {
                  _next: f._pt,
                  p: u || 1 === v ? u : ",",
                  s: p,
                  c: "=" === d.charAt(1) ? Xs(p, d) - p : parseFloat(d) - p,
                  m: c && c < 4 ? Math.round : 0,
                }),
                (g = Ss.lastIndex));
          return (
            (f.c = g < i.length ? i.substring(g, i.length) : ""),
            (f.fp = a),
            (Cs.test(i) || h) && (f.e = 0),
            (this._pt = f),
            f
          );
        },
        yn = function (t, e, s, i, n, r, a, o, l) {
          ds(i) && (i = i(n || 0, t, r));
          var c,
            d = t[e],
            u =
              "get" !== s
                ? s
                : ds(d)
                ? l
                  ? t[
                      e.indexOf("set") || !ds(t["get" + e.substr(3)])
                        ? e
                        : "get" + e.substr(3)
                    ](l)
                  : t[e]()
                : d,
            p = ds(d) ? (l ? kn : On) : An;
          if (
            (cs(i) &&
              (~i.indexOf("random(") && (i = Ni(i)),
              "=" === i.charAt(1) &&
                ((c = Xs(u, i) + (Ai(u) || 0)) || 0 === c) &&
                (i = c)),
            u !== i || _n)
          )
            return isNaN(u * i) || "" === i
              ? (!d && !(e in t) && Os(e, i),
                bn.call(this, t, e, u, i, p, o || Je.stringFilter, l))
              : ((c = new Hn(
                  this._pt,
                  t,
                  e,
                  +u || 0,
                  i - (u || 0),
                  "boolean" == typeof d ? In : $n,
                  0,
                  p
                )),
                l && (c.fp = l),
                a && c.modifier(a, this, t),
                (this._pt = c));
        },
        wn = function (t, e, s, i, n, r) {
          var a, o, l, c;
          if (
            zs[t] &&
            !1 !==
              (a = new zs[t]()).init(
                n,
                a.rawVars
                  ? e[t]
                  : (function (t, e, s, i, n) {
                      if (
                        (ds(t) && (t = xn(t, n, e, s, i)),
                        !hs(t) || (t.style && t.nodeType) || _s(t) || vs(t))
                      )
                        return cs(t) ? xn(t, n, e, s, i) : t;
                      var r,
                        a = {};
                      for (r in t) a[r] = xn(t[r], n, e, s, i);
                      return a;
                    })(e[t], i, n, r, s),
                s,
                i,
                r
              ) &&
            ((s._pt = o =
              new Hn(s._pt, n, t, 0, 1, a.render, a, 0, a.priority)),
            s !== Pe)
          )
            for (
              l = s._ptLookup[s._targets.indexOf(n)], c = a._props.length;
              c--;

            )
              l[a._props[c]] = o;
          return a;
        },
        Sn = function t(e, s) {
          var i,
            n,
            r,
            a,
            o,
            l,
            c,
            d,
            u,
            p,
            h,
            m,
            f,
            g = e.vars,
            v = g.ease,
            _ = g.startAt,
            b = g.immediateRender,
            y = g.lazy,
            w = g.onUpdate,
            S = g.onUpdateParams,
            C = g.callbackScope,
            x = g.runBackwards,
            T = g.yoyoEase,
            E = g.keyframes,
            L = g.autoRevert,
            A = e._dur,
            O = e._startAt,
            k = e._targets,
            M = e.parent,
            P = M && "nested" === M.data ? M.parent._targets : k,
            $ = "auto" === e._overwrite && !Te,
            I = e.timeline;
          if (
            (I && (!E || !v) && (v = "none"),
            (e._ease = cn(v, ts.ease)),
            (e._yEase = T ? on(cn(!0 === T ? v : T, ts.ease)) : 0),
            T &&
              e._yoyo &&
              !e._repeat &&
              ((T = e._yEase), (e._yEase = e._ease), (e._ease = T)),
            (e._from = !I && !!g.runBackwards),
            !I || (E && !g.stagger))
          ) {
            if (
              ((m = (d = k[0] ? Gs(k[0]).harness : 0) && g[d.prop]),
              (i = si(g, $s)),
              O && (ai(O.render(-1, !0)), (O._lazy = 0)),
              _)
            )
              if (
                (ai(
                  (e._startAt = Ln.set(
                    k,
                    Js(
                      {
                        data: "isStart",
                        overwrite: !1,
                        parent: M,
                        immediateRender: !0,
                        lazy: ms(y),
                        startAt: null,
                        delay: 0,
                        onUpdate: w,
                        onUpdateParams: S,
                        callbackScope: C,
                        stagger: 0,
                      },
                      _
                    )
                  ))
                ),
                s < 0 && !b && !L && e._startAt.render(-1, !0),
                b)
              ) {
                if ((s > 0 && !L && (e._startAt = 0), A && s <= 0))
                  return void (s && (e._zTime = s));
              } else !1 === L && (e._startAt = 0);
            else if (x && A)
              if (O) !L && (e._startAt = 0);
              else if (
                (s && (b = !1),
                (r = Js(
                  {
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: b && ms(y),
                    immediateRender: b,
                    stagger: 0,
                    parent: M,
                  },
                  i
                )),
                m && (r[d.prop] = m),
                ai((e._startAt = Ln.set(k, r))),
                s < 0 && e._startAt.render(-1, !0),
                (e._zTime = s),
                b)
              ) {
                if (!s) return;
              } else t(e._startAt, ss);
            for (
              e._pt = e._ptCache = 0, y = (A && ms(y)) || (y && !A), n = 0;
              n < k.length;
              n++
            ) {
              if (
                ((c = (o = k[n])._gsap || Hs(k)[n]._gsap),
                (e._ptLookup[n] = p = {}),
                Ds[c.id] && Is.length && Ys(),
                (h = P === k ? n : P.indexOf(o)),
                d &&
                  !1 !== (u = new d()).init(o, m || i, e, h, P) &&
                  ((e._pt = a =
                    new Hn(e._pt, o, u.name, 0, 1, u.render, u, 0, u.priority)),
                  u._props.forEach(function (t) {
                    p[t] = a;
                  }),
                  u.priority && (l = 1)),
                !d || m)
              )
                for (r in i)
                  zs[r] && (u = wn(r, i, e, h, o, P))
                    ? u.priority && (l = 1)
                    : (p[r] = a =
                        yn.call(e, o, r, "get", i[r], h, P, 0, g.stringFilter));
              e._op && e._op[n] && e.kill(o, e._op[n]),
                $ &&
                  e._pt &&
                  ((vn = e),
                  Ee.killTweensOf(o, p, e.globalTime(s)),
                  (f = !e.parent),
                  (vn = 0)),
                e._pt && y && (Ds[c.id] = 1);
            }
            l && Fn(e), e._onInit && e._onInit(e);
          }
          (e._onUpdate = w),
            (e._initted = (!e._op || e._pt) && !f),
            E && s <= 0 && I.render(es, !0, !0);
        },
        Cn = function (t, e, s, i) {
          var n,
            r,
            a = e.ease || i || "power1.inOut";
          if (_s(e))
            (r = s[t] || (s[t] = [])),
              e.forEach(function (t, s) {
                return r.push({ t: (s / (e.length - 1)) * 100, v: t, e: a });
              });
          else
            for (n in e)
              (r = s[n] || (s[n] = [])),
                "ease" === n || r.push({ t: parseFloat(t), v: e[n], e: a });
        },
        xn = function (t, e, s, i, n) {
          return ds(t)
            ? t.call(e, s, i, n)
            : cs(t) && ~t.indexOf("random(")
            ? Ni(t)
            : t;
        },
        Tn = Fs + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
        En = {};
      Rs(Tn + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
        return (En[t] = 1);
      });
      var Ln = (function (t) {
        function e(e, s, i, n) {
          var r;
          "number" == typeof s && ((i.duration = s), (s = i), (i = null));
          var a,
            o,
            l,
            c,
            d,
            u,
            p,
            h,
            m = (r = t.call(this, n ? s : ii(s)) || this).vars,
            f = m.duration,
            g = m.delay,
            v = m.immediateRender,
            _ = m.stagger,
            b = m.overwrite,
            y = m.keyframes,
            w = m.defaults,
            S = m.scrollTrigger,
            C = m.yoyoEase,
            x = s.parent || Ee,
            T = (_s(e) || vs(e) ? us(e[0]) : "length" in s) ? [e] : Pi(e);
          if (
            ((r._targets = T.length
              ? Hs(T)
              : ks(
                  "GSAP target " + e + " not found. https://greensock.com",
                  !Je.nullTargetWarn
                ) || []),
            (r._ptLookup = []),
            (r._overwrite = b),
            y || _ || gs(f) || gs(g))
          ) {
            if (
              ((s = r.vars),
              (a = r.timeline =
                new gn({ data: "nested", defaults: w || {} })).kill(),
              (a.parent = a._dp = Ce(r)),
              (a._start = 0),
              _ || gs(f) || gs(g))
            ) {
              if (((c = T.length), (p = _ && Ii(_)), hs(_)))
                for (d in _) ~Tn.indexOf(d) && (h || (h = {}), (h[d] = _[d]));
              for (o = 0; o < c; o++)
                ((l = si(s, En)).stagger = 0),
                  C && (l.yoyoEase = C),
                  h && ti(l, h),
                  (u = T[o]),
                  (l.duration = +xn(f, Ce(r), o, u, T)),
                  (l.delay = (+xn(g, Ce(r), o, u, T) || 0) - r._delay),
                  !_ &&
                    1 === c &&
                    l.delay &&
                    ((r._delay = g = l.delay), (r._start += g), (l.delay = 0)),
                  a.to(u, l, p ? p(o, u, T) : 0),
                  (a._ease = sn.none);
              a.duration() ? (f = g = 0) : (r.timeline = 0);
            } else if (y) {
              ii(Js(a.vars.defaults, { ease: "none" })),
                (a._ease = cn(y.ease || s.ease || "none"));
              var E,
                L,
                A,
                O = 0;
              if (_s(y))
                y.forEach(function (t) {
                  return a.to(T, t, ">");
                });
              else {
                for (d in ((l = {}), y))
                  "ease" === d ||
                    "easeEach" === d ||
                    Cn(d, y[d], l, y.easeEach);
                for (d in l)
                  for (
                    E = l[d].sort(function (t, e) {
                      return t.t - e.t;
                    }),
                      O = 0,
                      o = 0;
                    o < E.length;
                    o++
                  )
                    ((A = {
                      ease: (L = E[o]).e,
                      duration: ((L.t - (o ? E[o - 1].t : 0)) / 100) * f,
                    })[d] = L.v),
                      a.to(T, A, O),
                      (O += A.duration);
                a.duration() < f && a.to({}, { duration: f - a.duration() });
              }
            }
            f || r.duration((f = a.duration()));
          } else r.timeline = 0;
          return (
            !0 !== b || Te || ((vn = Ce(r)), Ee.killTweensOf(T), (vn = 0)),
            gi(x, Ce(r), i),
            s.reversed && r.reverse(),
            s.paused && r.paused(!0),
            (v ||
              (!f &&
                !y &&
                r._start === Ws(x._time) &&
                ms(v) &&
                ci(Ce(r)) &&
                "nested" !== x.data)) &&
              ((r._tTime = -1e-8), r.render(Math.max(0, -g))),
            S && vi(Ce(r), S),
            r
          );
        }
        xe(e, t);
        var s = e.prototype;
        return (
          (s.render = function (t, e, s) {
            var i,
              n,
              r,
              a,
              o,
              l,
              c,
              d,
              u,
              p = this._time,
              h = this._tDur,
              m = this._dur,
              f = t > h - ss && t >= 0 ? h : t < ss ? 0 : t;
            if (m) {
              if (
                f !== this._tTime ||
                !t ||
                s ||
                (!this._initted && this._tTime) ||
                (this._startAt && this._zTime < 0 != t < 0)
              ) {
                if (((i = f), (d = this.timeline), this._repeat)) {
                  if (((a = m + this._rDelay), this._repeat < -1 && t < 0))
                    return this.totalTime(100 * a + t, e, s);
                  if (
                    ((i = Ws(f % a)),
                    f === h
                      ? ((r = this._repeat), (i = m))
                      : ((r = ~~(f / a)) && r === f / a && ((i = m), r--),
                        i > m && (i = m)),
                    (l = this._yoyo && 1 & r) &&
                      ((u = this._yEase), (i = m - i)),
                    (o = ui(this._tTime, a)),
                    i === p && !s && this._initted)
                  )
                    return (this._tTime = f), this;
                  r !== o &&
                    (d && this._yEase && ln(d, l),
                    !this.vars.repeatRefresh ||
                      l ||
                      this._lock ||
                      ((this._lock = s = 1),
                      (this.render(Ws(a * r), !0).invalidate()._lock = 0)));
                }
                if (!this._initted) {
                  if (_i(this, t < 0 ? t : i, s, e))
                    return (this._tTime = 0), this;
                  if (p !== this._time) return this;
                  if (m !== this._dur) return this.render(t, e, s);
                }
                if (
                  ((this._tTime = f),
                  (this._time = i),
                  !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                  (this.ratio = c = (u || this._ease)(i / m)),
                  this._from && (this.ratio = c = 1 - c),
                  i && !p && !e && (Gi(this, "onStart"), this._tTime !== f))
                )
                  return this;
                for (n = this._pt; n; ) n.r(c, n.d), (n = n._next);
                (d &&
                  d.render(
                    t < 0
                      ? t
                      : !i && l
                      ? -1e-8
                      : d._dur * d._ease(i / this._dur),
                    e,
                    s
                  )) ||
                  (this._startAt && (this._zTime = t)),
                  this._onUpdate &&
                    !e &&
                    (t < 0 && this._startAt && this._startAt.render(t, !0, s),
                    Gi(this, "onUpdate")),
                  this._repeat &&
                    r !== o &&
                    this.vars.onRepeat &&
                    !e &&
                    this.parent &&
                    Gi(this, "onRepeat"),
                  (f !== this._tDur && f) ||
                    this._tTime !== f ||
                    (t < 0 &&
                      this._startAt &&
                      !this._onUpdate &&
                      this._startAt.render(t, !0, !0),
                    (t || !m) &&
                      ((f === this._tDur && this._ts > 0) ||
                        (!f && this._ts < 0)) &&
                      ai(this, 1),
                    e ||
                      (t < 0 && !p) ||
                      (!f && !p) ||
                      (Gi(
                        this,
                        f === h ? "onComplete" : "onReverseComplete",
                        !0
                      ),
                      this._prom &&
                        !(f < h && this.timeScale() > 0) &&
                        this._prom()));
              }
            } else
              !(function (t, e, s, i) {
                var n,
                  r,
                  a,
                  o = t.ratio,
                  l =
                    e < 0 ||
                    (!e &&
                      ((!t._start && bi(t) && (t._initted || !yi(t))) ||
                        ((t._ts < 0 || t._dp._ts < 0) && !yi(t))))
                      ? 0
                      : 1,
                  c = t._rDelay,
                  d = 0;
                if (
                  (c &&
                    t._repeat &&
                    ((d = Li(0, t._tDur, e)),
                    (r = ui(d, c)),
                    t._yoyo && 1 & r && (l = 1 - l),
                    r !== ui(t._tTime, c) &&
                      ((o = 1 - l),
                      t.vars.repeatRefresh && t._initted && t.invalidate())),
                  l !== o || i || t._zTime === ss || (!e && t._zTime))
                ) {
                  if (!t._initted && _i(t, e, i, s)) return;
                  for (
                    a = t._zTime,
                      t._zTime = e || (s ? ss : 0),
                      s || (s = e && !a),
                      t.ratio = l,
                      t._from && (l = 1 - l),
                      t._time = 0,
                      t._tTime = d,
                      n = t._pt;
                    n;

                  )
                    n.r(l, n.d), (n = n._next);
                  t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                    t._onUpdate && !s && Gi(t, "onUpdate"),
                    d && t._repeat && !s && t.parent && Gi(t, "onRepeat"),
                    (e >= t._tDur || e < 0) &&
                      t.ratio === l &&
                      (l && ai(t, 1),
                      s ||
                        (Gi(t, l ? "onComplete" : "onReverseComplete", !0),
                        t._prom && t._prom()));
                } else t._zTime || (t._zTime = e);
              })(this, t, e, s);
            return this;
          }),
          (s.targets = function () {
            return this._targets;
          }),
          (s.invalidate = function () {
            return (
              (this._pt =
                this._op =
                this._startAt =
                this._onUpdate =
                this._lazy =
                this.ratio =
                  0),
              (this._ptLookup = []),
              this.timeline && this.timeline.invalidate(),
              t.prototype.invalidate.call(this)
            );
          }),
          (s.resetTo = function (t, e, s, i) {
            $e || tn.wake(), this._ts || this.play();
            var n = Math.min(
              this._dur,
              (this._dp._time - this._start) * this._ts
            );
            return (
              this._initted || Sn(this, n),
              (function (t, e, s, i, n, r, a) {
                var o,
                  l,
                  c,
                  d = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
                if (!d)
                  for (
                    d = t._ptCache[e] = [],
                      l = t._ptLookup,
                      c = t._targets.length;
                    c--;

                  ) {
                    if ((o = l[c][e]) && o.d && o.d._pt)
                      for (o = o.d._pt; o && o.p !== e; ) o = o._next;
                    if (!o)
                      return (
                        (_n = 1), (t.vars[e] = "+=0"), Sn(t, a), (_n = 0), 1
                      );
                    d.push(o);
                  }
                for (c = d.length; c--; )
                  ((o = d[c]).s =
                    (!i && 0 !== i) || n ? o.s + (i || 0) + r * o.c : i),
                    (o.c = s - o.s),
                    o.e && (o.e = js(s) + Ai(o.e)),
                    o.b && (o.b = o.s + Ai(o.b));
              })(this, t, e, s, i, this._ease(n / this._dur), n)
                ? this.resetTo(t, e, s, i)
                : (mi(this, 0),
                  this.parent ||
                    ni(
                      this._dp,
                      this,
                      "_first",
                      "_last",
                      this._dp._sort ? "_start" : 0
                    ),
                  this.render(0))
            );
          }),
          (s.kill = function (t, e) {
            if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
              return (this._lazy = this._pt = 0), this.parent ? Vi(this) : this;
            if (this.timeline) {
              var s = this.timeline.totalDuration();
              return (
                this.timeline.killTweensOf(t, e, vn && !0 !== vn.vars.overwrite)
                  ._first || Vi(this),
                this.parent &&
                  s !== this.timeline.totalDuration() &&
                  wi(this, (this._dur * this.timeline._tDur) / s, 0, 1),
                this
              );
            }
            var i,
              n,
              r,
              a,
              o,
              l,
              c,
              d = this._targets,
              u = t ? Pi(t) : d,
              p = this._ptLookup,
              h = this._pt;
            if (
              (!e || "all" === e) &&
              (function (t, e) {
                for (
                  var s = t.length, i = s === e.length;
                  i && s-- && t[s] === e[s];

                );
                return s < 0;
              })(d, u)
            )
              return "all" === e && (this._pt = 0), Vi(this);
            for (
              i = this._op = this._op || [],
                "all" !== e &&
                  (cs(e) &&
                    ((o = {}),
                    Rs(e, function (t) {
                      return (o[t] = 1);
                    }),
                    (e = o)),
                  (e = (function (t, e) {
                    var s,
                      i,
                      n,
                      r,
                      a = t[0] ? Gs(t[0]).harness : 0,
                      o = a && a.aliases;
                    if (!o) return e;
                    for (i in ((s = ti({}, e)), o))
                      if ((i in s))
                        for (n = (r = o[i].split(",")).length; n--; )
                          s[r[n]] = s[i];
                    return s;
                  })(d, e))),
                c = d.length;
              c--;

            )
              if (~u.indexOf(d[c]))
                for (o in ((n = p[c]),
                "all" === e
                  ? ((i[c] = e), (a = n), (r = {}))
                  : ((r = i[c] = i[c] || {}), (a = e)),
                a))
                  (l = n && n[o]) &&
                    (("kill" in l.d && !0 !== l.d.kill(o)) ||
                      ri(this, l, "_pt"),
                    delete n[o]),
                    "all" !== r && (r[o] = 1);
            return this._initted && !this._pt && h && Vi(this), this;
          }),
          (e.to = function (t, s) {
            return new e(t, s, arguments[2]);
          }),
          (e.from = function (t, e) {
            return Ti(1, arguments);
          }),
          (e.delayedCall = function (t, s, i, n) {
            return new e(s, 0, {
              immediateRender: !1,
              lazy: !1,
              overwrite: !1,
              delay: t,
              onComplete: s,
              onReverseComplete: s,
              onCompleteParams: i,
              onReverseCompleteParams: i,
              callbackScope: n,
            });
          }),
          (e.fromTo = function (t, e, s) {
            return Ti(2, arguments);
          }),
          (e.set = function (t, s) {
            return (
              (s.duration = 0), s.repeatDelay || (s.repeat = 0), new e(t, s)
            );
          }),
          (e.killTweensOf = function (t, e, s) {
            return Ee.killTweensOf(t, e, s);
          }),
          e
        );
      })(fn);
      Js(Ln.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0,
      }),
        Rs("staggerTo,staggerFrom,staggerFromTo", function (t) {
          Ln[t] = function () {
            var e = new gn(),
              s = Oi.call(arguments, 0);
            return (
              s.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, s)
            );
          };
        });
      var An = function (t, e, s) {
          return (t[e] = s);
        },
        On = function (t, e, s) {
          return t[e](s);
        },
        kn = function (t, e, s, i) {
          return t[e](i.fp, s);
        },
        Mn = function (t, e, s) {
          return t.setAttribute(e, s);
        },
        Pn = function (t, e) {
          return ds(t[e]) ? On : ps(t[e]) && t.setAttribute ? Mn : An;
        },
        $n = function (t, e) {
          return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
        },
        In = function (t, e) {
          return e.set(e.t, e.p, !!(e.s + e.c * t), e);
        },
        Dn = function (t, e) {
          var s = e._pt,
            i = "";
          if (!t && e.b) i = e.b;
          else if (1 === t && e.e) i = e.e;
          else {
            for (; s; )
              (i =
                s.p +
                (s.m
                  ? s.m(s.s + s.c * t)
                  : Math.round(1e4 * (s.s + s.c * t)) / 1e4) +
                i),
                (s = s._next);
            i += e.c;
          }
          e.set(e.t, e.p, i, e);
        },
        zn = function (t, e) {
          for (var s = e._pt; s; ) s.r(t, s.d), (s = s._next);
        },
        qn = function (t, e, s, i) {
          for (var n, r = this._pt; r; )
            (n = r._next), r.p === i && r.modifier(t, e, s), (r = n);
        },
        Bn = function (t) {
          for (var e, s, i = this._pt; i; )
            (s = i._next),
              (i.p === t && !i.op) || i.op === t
                ? ri(this, i, "_pt")
                : i.dep || (e = 1),
              (i = s);
          return !e;
        },
        Nn = function (t, e, s, i) {
          i.mSet(t, e, i.m.call(i.tween, s, i.mt), i);
        },
        Fn = function (t) {
          for (var e, s, i, n, r = t._pt; r; ) {
            for (e = r._next, s = i; s && s.pr > r.pr; ) s = s._next;
            (r._prev = s ? s._prev : n) ? (r._prev._next = r) : (i = r),
              (r._next = s) ? (s._prev = r) : (n = r),
              (r = e);
          }
          t._pt = i;
        },
        Hn = (function () {
          function t(t, e, s, i, n, r, a, o, l) {
            (this.t = e),
              (this.s = i),
              (this.c = n),
              (this.p = s),
              (this.r = r || $n),
              (this.d = a || this),
              (this.set = o || An),
              (this.pr = l || 0),
              (this._next = t),
              t && (t._prev = this);
          }
          return (
            (t.prototype.modifier = function (t, e, s) {
              (this.mSet = this.mSet || this.set),
                (this.set = Nn),
                (this.m = t),
                (this.mt = s),
                (this.tween = e);
            }),
            t
          );
        })();
      Rs(
        Fs +
          "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
        function (t) {
          return ($s[t] = 1);
        }
      ),
        (Es.TweenMax = Es.TweenLite = Ln),
        (Es.TimelineLite = Es.TimelineMax = gn),
        (Ee = new gn({
          sortChildren: !1,
          defaults: ts,
          autoRemoveChildren: !0,
          id: "root",
          smoothChildTiming: !0,
        })),
        (Je.stringFilter = Ji);
      var Gn = {
        registerPlugin: function () {
          for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++)
            e[s] = arguments[s];
          e.forEach(function (t) {
            return Ri(t);
          });
        },
        timeline: function (t) {
          return new gn(t);
        },
        getTweensOf: function (t, e) {
          return Ee.getTweensOf(t, e);
        },
        getProperty: function (t, e, s, i) {
          cs(t) && (t = Pi(t)[0]);
          var n = Gs(t || {}).get,
            r = s ? Zs : Ks;
          return (
            "native" === s && (s = ""),
            t
              ? e
                ? r(((zs[e] && zs[e].get) || n)(t, e, s, i))
                : function (e, s, i) {
                    return r(((zs[e] && zs[e].get) || n)(t, e, s, i));
                  }
              : t
          );
        },
        quickSetter: function (t, e, s) {
          if ((t = Pi(t)).length > 1) {
            var i = t.map(function (t) {
                return jn.quickSetter(t, e, s);
              }),
              n = i.length;
            return function (t) {
              for (var e = n; e--; ) i[e](t);
            };
          }
          t = t[0] || {};
          var r = zs[e],
            a = Gs(t),
            o = (a.harness && (a.harness.aliases || {})[e]) || e,
            l = r
              ? function (e) {
                  var i = new r();
                  (Pe._pt = 0),
                    i.init(t, s ? e + s : e, Pe, 0, [t]),
                    i.render(1, i),
                    Pe._pt && zn(1, Pe);
                }
              : a.set(t, o);
          return r
            ? l
            : function (e) {
                return l(t, o, s ? e + s : e, a, 1);
              };
        },
        quickTo: function (t, e, s) {
          var i,
            n = jn.to(
              t,
              ti((((i = {})[e] = "+=0.1"), (i.paused = !0), i), s || {})
            ),
            r = function (t, s, i) {
              return n.resetTo(e, t, s, i);
            };
          return (r.tween = n), r;
        },
        isTweening: function (t) {
          return Ee.getTweensOf(t, !0).length > 0;
        },
        defaults: function (t) {
          return t && t.ease && (t.ease = cn(t.ease, ts.ease)), ei(ts, t || {});
        },
        config: function (t) {
          return ei(Je, t || {});
        },
        registerEffect: function (t) {
          var e = t.name,
            s = t.effect,
            i = t.plugins,
            n = t.defaults,
            r = t.extendTimeline;
          (i || "").split(",").forEach(function (t) {
            return (
              t &&
              !zs[t] &&
              !Es[t] &&
              ks(e + " effect requires " + t + " plugin.")
            );
          }),
            (qs[e] = function (t, e, i) {
              return s(Pi(t), Js(e || {}, n), i);
            }),
            r &&
              (gn.prototype[e] = function (t, s, i) {
                return this.add(qs[e](t, hs(s) ? s : (i = s) && {}, this), i);
              });
        },
        registerEase: function (t, e) {
          sn[t] = cn(e);
        },
        parseEase: function (t, e) {
          return arguments.length ? cn(t, e) : sn;
        },
        getById: function (t) {
          return Ee.getById(t);
        },
        exportRoot: function (t, e) {
          void 0 === t && (t = {});
          var s,
            i,
            n = new gn(t);
          for (
            n.smoothChildTiming = ms(t.smoothChildTiming),
              Ee.remove(n),
              n._dp = 0,
              n._time = n._tTime = Ee._time,
              s = Ee._first;
            s;

          )
            (i = s._next),
              (!e &&
                !s._dur &&
                s instanceof Ln &&
                s.vars.onComplete === s._targets[0]) ||
                gi(n, s, s._start - s._delay),
              (s = i);
          return gi(Ee, n, 0), n;
        },
        utils: {
          wrap: function t(e, s, i) {
            var n = s - e;
            return _s(e)
              ? Bi(e, t(0, e.length), s)
              : Ei(i, function (t) {
                  return ((n + ((t - e) % n)) % n) + e;
                });
          },
          wrapYoyo: function t(e, s, i) {
            var n = s - e,
              r = 2 * n;
            return _s(e)
              ? Bi(e, t(0, e.length - 1), s)
              : Ei(i, function (t) {
                  return (
                    e + ((t = (r + ((t - e) % r)) % r || 0) > n ? r - t : t)
                  );
                });
          },
          distribute: Ii,
          random: qi,
          snap: zi,
          normalize: function (t, e, s) {
            return Fi(t, e, 0, 1, s);
          },
          getUnit: Ai,
          clamp: function (t, e, s) {
            return Ei(s, function (s) {
              return Li(t, e, s);
            });
          },
          splitColor: Ui,
          toArray: Pi,
          selector: function (t) {
            return (
              (t = Pi(t)[0] || ks("Invalid scope") || {}),
              function (e) {
                var s = t.current || t.nativeElement || t;
                return Pi(
                  e,
                  s.querySelectorAll
                    ? s
                    : s === t
                    ? ks("Invalid scope") || Oe.createElement("div")
                    : t
                );
              }
            );
          },
          mapRange: Fi,
          pipe: function () {
            for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++)
              e[s] = arguments[s];
            return function (t) {
              return e.reduce(function (t, e) {
                return e(t);
              }, t);
            };
          },
          unitize: function (t, e) {
            return function (s) {
              return t(parseFloat(s)) + (e || Ai(s));
            };
          },
          interpolate: function t(e, s, i, n) {
            var r = isNaN(e + s)
              ? 0
              : function (t) {
                  return (1 - t) * e + t * s;
                };
            if (!r) {
              var a,
                o,
                l,
                c,
                d,
                u = cs(e),
                p = {};
              if ((!0 === i && (n = 1) && (i = null), u))
                (e = { p: e }), (s = { p: s });
              else if (_s(e) && !_s(s)) {
                for (l = [], c = e.length, d = c - 2, o = 1; o < c; o++)
                  l.push(t(e[o - 1], e[o]));
                c--,
                  (r = function (t) {
                    t *= c;
                    var e = Math.min(d, ~~t);
                    return l[e](t - e);
                  }),
                  (i = s);
              } else n || (e = ti(_s(e) ? [] : {}, e));
              if (!l) {
                for (a in s) yn.call(p, e, a, "get", s[a]);
                r = function (t) {
                  return zn(t, p) || (u ? e.p : e);
                };
              }
            }
            return Ei(i, r);
          },
          shuffle: $i,
        },
        install: As,
        effects: qs,
        ticker: tn,
        updateRoot: gn.updateRoot,
        plugins: zs,
        globalTimeline: Ee,
        core: {
          PropTween: Hn,
          globals: Ms,
          Tween: Ln,
          Timeline: gn,
          Animation: fn,
          getCache: Gs,
          _removeLinkedListItem: ri,
          suppressOverwrites: function (t) {
            return (Te = t);
          },
        },
      };
      Rs("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
        return (Gn[t] = Ln[t]);
      }),
        tn.add(gn.updateRoot),
        (Pe = Gn.to({}, { duration: 0 }));
      var Vn = function (t, e) {
          for (var s = t._pt; s && s.p !== e && s.op !== e && s.fp !== e; )
            s = s._next;
          return s;
        },
        Rn = function (t, e) {
          return {
            name: t,
            rawVars: 1,
            init: function (t, s, i) {
              i._onInit = function (t) {
                var i, n;
                if (
                  (cs(s) &&
                    ((i = {}),
                    Rs(s, function (t) {
                      return (i[t] = 1);
                    }),
                    (s = i)),
                  e)
                ) {
                  for (n in ((i = {}), s)) i[n] = e(s[n]);
                  s = i;
                }
                !(function (t, e) {
                  var s,
                    i,
                    n,
                    r = t._targets;
                  for (s in e)
                    for (i = r.length; i--; )
                      (n = t._ptLookup[i][s]) &&
                        (n = n.d) &&
                        (n._pt && (n = Vn(n, s)),
                        n && n.modifier && n.modifier(e[s], t, r[i], s));
                })(t, s);
              };
            },
          };
        },
        jn =
          Gn.registerPlugin(
            {
              name: "attr",
              init: function (t, e, s, i, n) {
                var r, a;
                for (r in e)
                  (a = this.add(
                    t,
                    "setAttribute",
                    (t.getAttribute(r) || 0) + "",
                    e[r],
                    i,
                    n,
                    0,
                    0,
                    r
                  )) && (a.op = r),
                    this._props.push(r);
              },
            },
            {
              name: "endArray",
              init: function (t, e) {
                for (var s = e.length; s--; ) this.add(t, s, t[s] || 0, e[s]);
              },
            },
            Rn("roundProps", Di),
            Rn("modifiers"),
            Rn("snap", zi)
          ) || Gn;
      (Ln.version = gn.version = jn.version = "3.10.4"), (ke = 1), fs() && en();
      sn.Power0,
        sn.Power1,
        sn.Power2,
        sn.Power3,
        sn.Power4,
        sn.Linear,
        sn.Quad,
        sn.Cubic,
        sn.Quart,
        sn.Quint,
        sn.Strong,
        sn.Elastic,
        sn.Back,
        sn.SteppedEase,
        sn.Bounce,
        sn.Sine,
        sn.Expo,
        sn.Circ;
      var Wn,
        Xn,
        Un,
        Yn,
        Qn,
        Kn,
        Zn,
        Jn = {},
        tr = 180 / Math.PI,
        er = Math.PI / 180,
        sr = Math.atan2,
        ir = /([A-Z])/g,
        nr = /(left|right|width|margin|padding|x)/i,
        rr = /[\s,\(]\S/,
        ar = {
          autoAlpha: "opacity,visibility",
          scale: "scaleX,scaleY",
          alpha: "opacity",
        },
        or = function (t, e) {
          return e.set(
            e.t,
            e.p,
            Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        lr = function (t, e) {
          return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
            e
          );
        },
        cr = function (t, e) {
          return e.set(
            e.t,
            e.p,
            t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
            e
          );
        },
        dr = function (t, e) {
          var s = e.s + e.c * t;
          e.set(e.t, e.p, ~~(s + (s < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        ur = function (t, e) {
          return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        pr = function (t, e) {
          return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        hr = function (t, e, s) {
          return (t.style[e] = s);
        },
        mr = function (t, e, s) {
          return t.style.setProperty(e, s);
        },
        fr = function (t, e, s) {
          return (t._gsap[e] = s);
        },
        gr = function (t, e, s) {
          return (t._gsap.scaleX = t._gsap.scaleY = s);
        },
        vr = function (t, e, s, i, n) {
          var r = t._gsap;
          (r.scaleX = r.scaleY = s), r.renderTransform(n, r);
        },
        _r = function (t, e, s, i, n) {
          var r = t._gsap;
          (r[e] = s), r.renderTransform(n, r);
        },
        br = "transform",
        yr = br + "Origin",
        wr = function (t, e) {
          var s = Xn.createElementNS
            ? Xn.createElementNS(
                (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                t
              )
            : Xn.createElement(t);
          return s.style ? s : Xn.createElement(t);
        },
        Sr = function t(e, s, i) {
          var n = getComputedStyle(e);
          return (
            n[s] ||
            n.getPropertyValue(s.replace(ir, "-$1").toLowerCase()) ||
            n.getPropertyValue(s) ||
            (!i && t(e, xr(s) || s, 1)) ||
            ""
          );
        },
        Cr = "O,Moz,ms,Ms,Webkit".split(","),
        xr = function (t, e, s) {
          var i = (e || Qn).style,
            n = 5;
          if (t in i && !s) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            n-- && !(Cr[n] + t in i);

          );
          return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? Cr[n] : "") + t;
        },
        Tr = function () {
          "undefined" != typeof window &&
            window.document &&
            ((Wn = window),
            (Xn = Wn.document),
            (Un = Xn.documentElement),
            (Qn = wr("div") || { style: {} }),
            wr("div"),
            (br = xr(br)),
            (yr = br + "Origin"),
            (Qn.style.cssText =
              "border-width:0;line-height:0;position:absolute;padding:0"),
            (Zn = !!xr("perspective")),
            (Yn = 1));
        },
        Er = function t(e) {
          var s,
            i = wr(
              "svg",
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute("xmlns")) ||
                "http://www.w3.org/2000/svg"
            ),
            n = this.parentNode,
            r = this.nextSibling,
            a = this.style.cssText;
          if (
            (Un.appendChild(i),
            i.appendChild(this),
            (this.style.display = "block"),
            e)
          )
            try {
              (s = this.getBBox()),
                (this._gsapBBox = this.getBBox),
                (this.getBBox = t);
            } catch (t) {}
          else this._gsapBBox && (s = this._gsapBBox());
          return (
            n && (r ? n.insertBefore(this, r) : n.appendChild(this)),
            Un.removeChild(i),
            (this.style.cssText = a),
            s
          );
        },
        Lr = function (t, e) {
          for (var s = e.length; s--; )
            if (t.hasAttribute(e[s])) return t.getAttribute(e[s]);
        },
        Ar = function (t) {
          var e;
          try {
            e = t.getBBox();
          } catch (s) {
            e = Er.call(t, !0);
          }
          return (
            (e && (e.width || e.height)) ||
              t.getBBox === Er ||
              (e = Er.call(t, !0)),
            !e || e.width || e.x || e.y
              ? e
              : {
                  x: +Lr(t, ["x", "cx", "x1"]) || 0,
                  y: +Lr(t, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        Or = function (t) {
          return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !Ar(t));
        },
        kr = function (t, e) {
          if (e) {
            var s = t.style;
            e in Jn && e !== yr && (e = br),
              s.removeProperty
                ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                    (e = "-" + e),
                  s.removeProperty(e.replace(ir, "-$1").toLowerCase()))
                : s.removeAttribute(e);
          }
        },
        Mr = function (t, e, s, i, n, r) {
          var a = new Hn(t._pt, e, s, 0, 1, r ? pr : ur);
          return (t._pt = a), (a.b = i), (a.e = n), t._props.push(s), a;
        },
        Pr = { deg: 1, rad: 1, turn: 1 },
        $r = function t(e, s, i, n) {
          var r,
            a,
            o,
            l,
            c = parseFloat(i) || 0,
            d = (i + "").trim().substr((c + "").length) || "px",
            u = Qn.style,
            p = nr.test(s),
            h = "svg" === e.tagName.toLowerCase(),
            m = (h ? "client" : "offset") + (p ? "Width" : "Height"),
            f = 100,
            g = "px" === n,
            v = "%" === n;
          return n === d || !c || Pr[n] || Pr[d]
            ? c
            : ("px" !== d && !g && (c = t(e, s, i, "px")),
              (l = e.getCTM && Or(e)),
              (!v && "%" !== d) || (!Jn[s] && !~s.indexOf("adius"))
                ? ((u[p ? "width" : "height"] = f + (g ? d : n)),
                  (a =
                    ~s.indexOf("adius") || ("em" === n && e.appendChild && !h)
                      ? e
                      : e.parentNode),
                  l && (a = (e.ownerSVGElement || {}).parentNode),
                  (a && a !== Xn && a.appendChild) || (a = Xn.body),
                  (o = a._gsap) && v && o.width && p && o.time === tn.time
                    ? js((c / o.width) * f)
                    : ((v || "%" === d) && (u.position = Sr(e, "position")),
                      a === e && (u.position = "static"),
                      a.appendChild(Qn),
                      (r = Qn[m]),
                      a.removeChild(Qn),
                      (u.position = "absolute"),
                      p &&
                        v &&
                        (((o = Gs(a)).time = tn.time), (o.width = a[m])),
                      js(g ? (r * c) / f : r && c ? (f / r) * c : 0)))
                : ((r = l ? e.getBBox()[p ? "width" : "height"] : e[m]),
                  js(v ? (c / r) * f : (c / 100) * r)));
        },
        Ir = function (t, e, s, i) {
          var n;
          return (
            Yn || Tr(),
            e in ar &&
              "transform" !== e &&
              ~(e = ar[e]).indexOf(",") &&
              (e = e.split(",")[0]),
            Jn[e] && "transform" !== e
              ? ((n = Wr(t, i)),
                (n =
                  "transformOrigin" !== e
                    ? n[e]
                    : n.svg
                    ? n.origin
                    : Xr(Sr(t, yr)) + " " + n.zOrigin + "px"))
              : (!(n = t.style[e]) ||
                  "auto" === n ||
                  i ||
                  ~(n + "").indexOf("calc(")) &&
                (n =
                  (Nr[e] && Nr[e](t, e, s)) ||
                  Sr(t, e) ||
                  Vs(t, e) ||
                  ("opacity" === e ? 1 : 0)),
            s && !~(n + "").trim().indexOf(" ") ? $r(t, e, n, s) + s : n
          );
        },
        Dr = function (t, e, s, i) {
          if (!s || "none" === s) {
            var n = xr(e, t, 1),
              r = n && Sr(t, n, 1);
            r && r !== s
              ? ((e = n), (s = r))
              : "borderColor" === e && (s = Sr(t, "borderTopColor"));
          }
          var a,
            o,
            l,
            c,
            d,
            u,
            p,
            h,
            m,
            f,
            g,
            v = new Hn(this._pt, t.style, e, 0, 1, Dn),
            _ = 0,
            b = 0;
          if (
            ((v.b = s),
            (v.e = i),
            (s += ""),
            "auto" === (i += "") &&
              ((t.style[e] = i), (i = Sr(t, e) || i), (t.style[e] = s)),
            Ji((a = [s, i])),
            (i = a[1]),
            (l = (s = a[0]).match(ws) || []),
            (i.match(ws) || []).length)
          ) {
            for (; (o = ws.exec(i)); )
              (p = o[0]),
                (m = i.substring(_, o.index)),
                d
                  ? (d = (d + 1) % 5)
                  : ("rgba(" !== m.substr(-5) && "hsla(" !== m.substr(-5)) ||
                    (d = 1),
                p !== (u = l[b++] || "") &&
                  ((c = parseFloat(u) || 0),
                  (g = u.substr((c + "").length)),
                  "=" === p.charAt(1) && (p = Xs(c, p) + g),
                  (h = parseFloat(p)),
                  (f = p.substr((h + "").length)),
                  (_ = ws.lastIndex - f.length),
                  f ||
                    ((f = f || Je.units[e] || g),
                    _ === i.length && ((i += f), (v.e += f))),
                  g !== f && (c = $r(t, e, u, f) || 0),
                  (v._pt = {
                    _next: v._pt,
                    p: m || 1 === b ? m : ",",
                    s: c,
                    c: h - c,
                    m: (d && d < 4) || "zIndex" === e ? Math.round : 0,
                  }));
            v.c = _ < i.length ? i.substring(_, i.length) : "";
          } else v.r = "display" === e && "none" === i ? pr : ur;
          return Cs.test(i) && (v.e = 0), (this._pt = v), v;
        },
        zr = {
          top: "0%",
          bottom: "100%",
          left: "0%",
          right: "100%",
          center: "50%",
        },
        qr = function (t) {
          var e = t.split(" "),
            s = e[0],
            i = e[1] || "50%";
          return (
            ("top" !== s && "bottom" !== s && "left" !== i && "right" !== i) ||
              ((t = s), (s = i), (i = t)),
            (e[0] = zr[s] || s),
            (e[1] = zr[i] || i),
            e.join(" ")
          );
        },
        Br = function (t, e) {
          if (e.tween && e.tween._time === e.tween._dur) {
            var s,
              i,
              n,
              r = e.t,
              a = r.style,
              o = e.u,
              l = r._gsap;
            if ("all" === o || !0 === o) (a.cssText = ""), (i = 1);
            else
              for (n = (o = o.split(",")).length; --n > -1; )
                (s = o[n]),
                  Jn[s] && ((i = 1), (s = "transformOrigin" === s ? yr : br)),
                  kr(r, s);
            i &&
              (kr(r, br),
              l &&
                (l.svg && r.removeAttribute("transform"),
                Wr(r, 1),
                (l.uncache = 1)));
          }
        },
        Nr = {
          clearProps: function (t, e, s, i, n) {
            if ("isFromStart" !== n.data) {
              var r = (t._pt = new Hn(t._pt, e, s, 0, 0, Br));
              return (
                (r.u = i), (r.pr = -10), (r.tween = n), t._props.push(s), 1
              );
            }
          },
        },
        Fr = [1, 0, 0, 1, 0, 0],
        Hr = {},
        Gr = function (t) {
          return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        },
        Vr = function (t) {
          var e = Sr(t, br);
          return Gr(e) ? Fr : e.substr(7).match(ys).map(js);
        },
        Rr = function (t, e) {
          var s,
            i,
            n,
            r,
            a = t._gsap || Gs(t),
            o = t.style,
            l = Vr(t);
          return a.svg && t.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (l = [
                (n = t.transform.baseVal.consolidate().matrix).a,
                n.b,
                n.c,
                n.d,
                n.e,
                n.f,
              ]).join(",")
              ? Fr
              : l
            : (l !== Fr ||
                t.offsetParent ||
                t === Un ||
                a.svg ||
                ((n = o.display),
                (o.display = "block"),
                ((s = t.parentNode) && t.offsetParent) ||
                  ((r = 1), (i = t.nextSibling), Un.appendChild(t)),
                (l = Vr(t)),
                n ? (o.display = n) : kr(t, "display"),
                r &&
                  (i
                    ? s.insertBefore(t, i)
                    : s
                    ? s.appendChild(t)
                    : Un.removeChild(t))),
              e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
        },
        jr = function (t, e, s, i, n, r) {
          var a,
            o,
            l,
            c = t._gsap,
            d = n || Rr(t, !0),
            u = c.xOrigin || 0,
            p = c.yOrigin || 0,
            h = c.xOffset || 0,
            m = c.yOffset || 0,
            f = d[0],
            g = d[1],
            v = d[2],
            _ = d[3],
            b = d[4],
            y = d[5],
            w = e.split(" "),
            S = parseFloat(w[0]) || 0,
            C = parseFloat(w[1]) || 0;
          s
            ? d !== Fr &&
              (o = f * _ - g * v) &&
              ((l = S * (-g / o) + C * (f / o) - (f * y - g * b) / o),
              (S = S * (_ / o) + C * (-v / o) + (v * y - _ * b) / o),
              (C = l))
            : ((S =
                (a = Ar(t)).x + (~w[0].indexOf("%") ? (S / 100) * a.width : S)),
              (C =
                a.y +
                (~(w[1] || w[0]).indexOf("%") ? (C / 100) * a.height : C))),
            i || (!1 !== i && c.smooth)
              ? ((b = S - u),
                (y = C - p),
                (c.xOffset = h + (b * f + y * v) - b),
                (c.yOffset = m + (b * g + y * _) - y))
              : (c.xOffset = c.yOffset = 0),
            (c.xOrigin = S),
            (c.yOrigin = C),
            (c.smooth = !!i),
            (c.origin = e),
            (c.originIsAbsolute = !!s),
            (t.style[yr] = "0px 0px"),
            r &&
              (Mr(r, c, "xOrigin", u, S),
              Mr(r, c, "yOrigin", p, C),
              Mr(r, c, "xOffset", h, c.xOffset),
              Mr(r, c, "yOffset", m, c.yOffset)),
            t.setAttribute("data-svg-origin", S + " " + C);
        },
        Wr = function (t, e) {
          var s = t._gsap || new mn(t);
          if ("x" in s && !e && !s.uncache) return s;
          var i,
            n,
            r,
            a,
            o,
            l,
            c,
            d,
            u,
            p,
            h,
            m,
            f,
            g,
            v,
            _,
            b,
            y,
            w,
            S,
            C,
            x,
            T,
            E,
            L,
            A,
            O,
            k,
            M,
            P,
            $,
            I,
            D = t.style,
            z = s.scaleX < 0,
            q = "px",
            B = "deg",
            N = Sr(t, yr) || "0";
          return (
            (i = n = r = l = c = d = u = p = h = 0),
            (a = o = 1),
            (s.svg = !(!t.getCTM || !Or(t))),
            (g = Rr(t, s.svg)),
            s.svg &&
              ((E =
                (!s.uncache || "0px 0px" === N) &&
                !e &&
                t.getAttribute("data-svg-origin")),
              jr(t, E || N, !!E || s.originIsAbsolute, !1 !== s.smooth, g)),
            (m = s.xOrigin || 0),
            (f = s.yOrigin || 0),
            g !== Fr &&
              ((y = g[0]),
              (w = g[1]),
              (S = g[2]),
              (C = g[3]),
              (i = x = g[4]),
              (n = T = g[5]),
              6 === g.length
                ? ((a = Math.sqrt(y * y + w * w)),
                  (o = Math.sqrt(C * C + S * S)),
                  (l = y || w ? sr(w, y) * tr : 0),
                  (u = S || C ? sr(S, C) * tr + l : 0) &&
                    (o *= Math.abs(Math.cos(u * er))),
                  s.svg &&
                    ((i -= m - (m * y + f * S)), (n -= f - (m * w + f * C))))
                : ((I = g[6]),
                  (P = g[7]),
                  (O = g[8]),
                  (k = g[9]),
                  (M = g[10]),
                  ($ = g[11]),
                  (i = g[12]),
                  (n = g[13]),
                  (r = g[14]),
                  (c = (v = sr(I, M)) * tr),
                  v &&
                    ((E = x * (_ = Math.cos(-v)) + O * (b = Math.sin(-v))),
                    (L = T * _ + k * b),
                    (A = I * _ + M * b),
                    (O = x * -b + O * _),
                    (k = T * -b + k * _),
                    (M = I * -b + M * _),
                    ($ = P * -b + $ * _),
                    (x = E),
                    (T = L),
                    (I = A)),
                  (d = (v = sr(-S, M)) * tr),
                  v &&
                    ((_ = Math.cos(-v)),
                    ($ = C * (b = Math.sin(-v)) + $ * _),
                    (y = E = y * _ - O * b),
                    (w = L = w * _ - k * b),
                    (S = A = S * _ - M * b)),
                  (l = (v = sr(w, y)) * tr),
                  v &&
                    ((E = y * (_ = Math.cos(v)) + w * (b = Math.sin(v))),
                    (L = x * _ + T * b),
                    (w = w * _ - y * b),
                    (T = T * _ - x * b),
                    (y = E),
                    (x = L)),
                  c &&
                    Math.abs(c) + Math.abs(l) > 359.9 &&
                    ((c = l = 0), (d = 180 - d)),
                  (a = js(Math.sqrt(y * y + w * w + S * S))),
                  (o = js(Math.sqrt(T * T + I * I))),
                  (v = sr(x, T)),
                  (u = Math.abs(v) > 2e-4 ? v * tr : 0),
                  (h = $ ? 1 / ($ < 0 ? -$ : $) : 0)),
              s.svg &&
                ((E = t.getAttribute("transform")),
                (s.forceCSS =
                  t.setAttribute("transform", "") || !Gr(Sr(t, br))),
                E && t.setAttribute("transform", E))),
            Math.abs(u) > 90 &&
              Math.abs(u) < 270 &&
              (z
                ? ((a *= -1),
                  (u += l <= 0 ? 180 : -180),
                  (l += l <= 0 ? 180 : -180))
                : ((o *= -1), (u += u <= 0 ? 180 : -180))),
            (e = e || s.uncache),
            (s.x =
              i -
              ((s.xPercent =
                i &&
                ((!e && s.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
                ? (t.offsetWidth * s.xPercent) / 100
                : 0) +
              q),
            (s.y =
              n -
              ((s.yPercent =
                n &&
                ((!e && s.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-n)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * s.yPercent) / 100
                : 0) +
              q),
            (s.z = r + q),
            (s.scaleX = js(a)),
            (s.scaleY = js(o)),
            (s.rotation = js(l) + B),
            (s.rotationX = js(c) + B),
            (s.rotationY = js(d) + B),
            (s.skewX = u + B),
            (s.skewY = p + B),
            (s.transformPerspective = h + q),
            (s.zOrigin = parseFloat(N.split(" ")[2]) || 0) && (D[yr] = Xr(N)),
            (s.xOffset = s.yOffset = 0),
            (s.force3D = Je.force3D),
            (s.renderTransform = s.svg ? ta : Zn ? Jr : Yr),
            (s.uncache = 0),
            s
          );
        },
        Xr = function (t) {
          return (t = t.split(" "))[0] + " " + t[1];
        },
        Ur = function (t, e, s) {
          var i = Ai(e);
          return js(parseFloat(e) + parseFloat($r(t, "x", s + "px", i))) + i;
        },
        Yr = function (t, e) {
          (e.z = "0px"),
            (e.rotationY = e.rotationX = "0deg"),
            (e.force3D = 0),
            Jr(t, e);
        },
        Qr = "0deg",
        Kr = "0px",
        Zr = ") ",
        Jr = function (t, e) {
          var s = e || this,
            i = s.xPercent,
            n = s.yPercent,
            r = s.x,
            a = s.y,
            o = s.z,
            l = s.rotation,
            c = s.rotationY,
            d = s.rotationX,
            u = s.skewX,
            p = s.skewY,
            h = s.scaleX,
            m = s.scaleY,
            f = s.transformPerspective,
            g = s.force3D,
            v = s.target,
            _ = s.zOrigin,
            b = "",
            y = ("auto" === g && t && 1 !== t) || !0 === g;
          if (_ && (d !== Qr || c !== Qr)) {
            var w,
              S = parseFloat(c) * er,
              C = Math.sin(S),
              x = Math.cos(S);
            (S = parseFloat(d) * er),
              (w = Math.cos(S)),
              (r = Ur(v, r, C * w * -_)),
              (a = Ur(v, a, -Math.sin(S) * -_)),
              (o = Ur(v, o, x * w * -_ + _));
          }
          f !== Kr && (b += "perspective(" + f + Zr),
            (i || n) && (b += "translate(" + i + "%, " + n + "%) "),
            (y || r !== Kr || a !== Kr || o !== Kr) &&
              (b +=
                o !== Kr || y
                  ? "translate3d(" + r + ", " + a + ", " + o + ") "
                  : "translate(" + r + ", " + a + Zr),
            l !== Qr && (b += "rotate(" + l + Zr),
            c !== Qr && (b += "rotateY(" + c + Zr),
            d !== Qr && (b += "rotateX(" + d + Zr),
            (u === Qr && p === Qr) || (b += "skew(" + u + ", " + p + Zr),
            (1 === h && 1 === m) || (b += "scale(" + h + ", " + m + Zr),
            (v.style[br] = b || "translate(0, 0)");
        },
        ta = function (t, e) {
          var s,
            i,
            n,
            r,
            a,
            o = e || this,
            l = o.xPercent,
            c = o.yPercent,
            d = o.x,
            u = o.y,
            p = o.rotation,
            h = o.skewX,
            m = o.skewY,
            f = o.scaleX,
            g = o.scaleY,
            v = o.target,
            _ = o.xOrigin,
            b = o.yOrigin,
            y = o.xOffset,
            w = o.yOffset,
            S = o.forceCSS,
            C = parseFloat(d),
            x = parseFloat(u);
          (p = parseFloat(p)),
            (h = parseFloat(h)),
            (m = parseFloat(m)) && ((h += m = parseFloat(m)), (p += m)),
            p || h
              ? ((p *= er),
                (h *= er),
                (s = Math.cos(p) * f),
                (i = Math.sin(p) * f),
                (n = Math.sin(p - h) * -g),
                (r = Math.cos(p - h) * g),
                h &&
                  ((m *= er),
                  (a = Math.tan(h - m)),
                  (n *= a = Math.sqrt(1 + a * a)),
                  (r *= a),
                  m &&
                    ((a = Math.tan(m)),
                    (s *= a = Math.sqrt(1 + a * a)),
                    (i *= a))),
                (s = js(s)),
                (i = js(i)),
                (n = js(n)),
                (r = js(r)))
              : ((s = f), (r = g), (i = n = 0)),
            ((C && !~(d + "").indexOf("px")) ||
              (x && !~(u + "").indexOf("px"))) &&
              ((C = $r(v, "x", d, "px")), (x = $r(v, "y", u, "px"))),
            (_ || b || y || w) &&
              ((C = js(C + _ - (_ * s + b * n) + y)),
              (x = js(x + b - (_ * i + b * r) + w))),
            (l || c) &&
              ((a = v.getBBox()),
              (C = js(C + (l / 100) * a.width)),
              (x = js(x + (c / 100) * a.height))),
            (a =
              "matrix(" +
              s +
              "," +
              i +
              "," +
              n +
              "," +
              r +
              "," +
              C +
              "," +
              x +
              ")"),
            v.setAttribute("transform", a),
            S && (v.style[br] = a);
        },
        ea = function (t, e, s, i, n) {
          var r,
            a,
            o = 360,
            l = cs(n),
            c = parseFloat(n) * (l && ~n.indexOf("rad") ? tr : 1) - i,
            d = i + c + "deg";
          return (
            l &&
              ("short" === (r = n.split("_")[1]) &&
                (c %= o) !== c % 180 &&
                (c += c < 0 ? o : -360),
              "cw" === r && c < 0
                ? (c = ((c + 36e9) % o) - ~~(c / o) * o)
                : "ccw" === r &&
                  c > 0 &&
                  (c = ((c - 36e9) % o) - ~~(c / o) * o)),
            (t._pt = a = new Hn(t._pt, e, s, i, c, lr)),
            (a.e = d),
            (a.u = "deg"),
            t._props.push(s),
            a
          );
        },
        sa = function (t, e) {
          for (var s in e) t[s] = e[s];
          return t;
        },
        ia = function (t, e, s) {
          var i,
            n,
            r,
            a,
            o,
            l,
            c,
            d = sa({}, s._gsap),
            u = s.style;
          for (n in (d.svg
            ? ((r = s.getAttribute("transform")),
              s.setAttribute("transform", ""),
              (u[br] = e),
              (i = Wr(s, 1)),
              kr(s, br),
              s.setAttribute("transform", r))
            : ((r = getComputedStyle(s)[br]),
              (u[br] = e),
              (i = Wr(s, 1)),
              (u[br] = r)),
          Jn))
            (r = d[n]) !== (a = i[n]) &&
              "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 &&
              ((o = Ai(r) !== (c = Ai(a)) ? $r(s, n, r, c) : parseFloat(r)),
              (l = parseFloat(a)),
              (t._pt = new Hn(t._pt, i, n, o, l - o, or)),
              (t._pt.u = c || 0),
              t._props.push(n));
          sa(i, d);
        };
      Rs("padding,margin,Width,Radius", function (t, e) {
        var s = "Top",
          i = "Right",
          n = "Bottom",
          r = "Left",
          a = (e < 3 ? [s, i, n, r] : [s + r, s + i, n + i, n + r]).map(
            function (s) {
              return e < 2 ? t + s : "border" + s + t;
            }
          );
        Nr[e > 1 ? "border" + t : t] = function (t, e, s, i, n) {
          var r, o;
          if (arguments.length < 4)
            return (
              (r = a.map(function (e) {
                return Ir(t, e, s);
              })),
              5 === (o = r.join(" ")).split(r[0]).length ? r[0] : o
            );
          (r = (i + "").split(" ")),
            (o = {}),
            a.forEach(function (t, e) {
              return (o[t] = r[e] = r[e] || r[((e - 1) / 2) | 0]);
            }),
            t.init(e, o, n);
        };
      });
      var na,
        ra,
        aa,
        oa = {
          name: "css",
          register: Tr,
          targetTest: function (t) {
            return t.style && t.nodeType;
          },
          init: function (t, e, s, i, n) {
            var r,
              a,
              o,
              l,
              c,
              d,
              u,
              p,
              h,
              m,
              f,
              g,
              v,
              _,
              b,
              y = this._props,
              w = t.style,
              S = s.vars.startAt;
            for (u in (Yn || Tr(), e))
              if (
                "autoRound" !== u &&
                ((a = e[u]), !zs[u] || !wn(u, e, s, i, t, n))
              )
                if (
                  ((c = typeof a),
                  (d = Nr[u]),
                  "function" === c && (c = typeof (a = a.call(s, i, t, n))),
                  "string" === c && ~a.indexOf("random(") && (a = Ni(a)),
                  d)
                )
                  d(this, t, u, a, s) && (b = 1);
                else if ("--" === u.substr(0, 2))
                  (r = (getComputedStyle(t).getPropertyValue(u) + "").trim()),
                    (a += ""),
                    (Ki.lastIndex = 0),
                    Ki.test(r) || ((p = Ai(r)), (h = Ai(a))),
                    h ? p !== h && (r = $r(t, u, r, h) + h) : p && (a += p),
                    this.add(w, "setProperty", r, a, i, n, 0, 0, u),
                    y.push(u);
                else if ("undefined" !== c) {
                  if (
                    (S && u in S
                      ? ((r =
                          "function" == typeof S[u]
                            ? S[u].call(s, i, t, n)
                            : S[u]),
                        cs(r) && ~r.indexOf("random(") && (r = Ni(r)),
                        Ai(r + "") || (r += Je.units[u] || Ai(Ir(t, u)) || ""),
                        "=" === (r + "").charAt(1) && (r = Ir(t, u)))
                      : (r = Ir(t, u)),
                    (l = parseFloat(r)),
                    (m =
                      "string" === c &&
                      "=" === a.charAt(1) &&
                      a.substr(0, 2)) && (a = a.substr(2)),
                    (o = parseFloat(a)),
                    u in ar &&
                      ("autoAlpha" === u &&
                        (1 === l &&
                          "hidden" === Ir(t, "visibility") &&
                          o &&
                          (l = 0),
                        Mr(
                          this,
                          w,
                          "visibility",
                          l ? "inherit" : "hidden",
                          o ? "inherit" : "hidden",
                          !o
                        )),
                      "scale" !== u &&
                        "transform" !== u &&
                        ~(u = ar[u]).indexOf(",") &&
                        (u = u.split(",")[0])),
                    (f = u in Jn))
                  )
                    if (
                      (g ||
                        (((v = t._gsap).renderTransform && !e.parseTransform) ||
                          Wr(t, e.parseTransform),
                        (_ = !1 !== e.smoothOrigin && v.smooth),
                        ((g = this._pt =
                          new Hn(
                            this._pt,
                            w,
                            br,
                            0,
                            1,
                            v.renderTransform,
                            v,
                            0,
                            -1
                          )).dep = 1)),
                      "scale" === u)
                    )
                      (this._pt = new Hn(
                        this._pt,
                        v,
                        "scaleY",
                        v.scaleY,
                        (m ? Xs(v.scaleY, m + o) : o) - v.scaleY || 0
                      )),
                        y.push("scaleY", u),
                        (u += "X");
                    else {
                      if ("transformOrigin" === u) {
                        (a = qr(a)),
                          v.svg
                            ? jr(t, a, 0, _, 0, this)
                            : ((h = parseFloat(a.split(" ")[2]) || 0) !==
                                v.zOrigin &&
                                Mr(this, v, "zOrigin", v.zOrigin, h),
                              Mr(this, w, u, Xr(r), Xr(a)));
                        continue;
                      }
                      if ("svgOrigin" === u) {
                        jr(t, a, 1, _, 0, this);
                        continue;
                      }
                      if (u in Hr) {
                        ea(this, v, u, l, m ? Xs(l, m + a) : a);
                        continue;
                      }
                      if ("smoothOrigin" === u) {
                        Mr(this, v, "smooth", v.smooth, a);
                        continue;
                      }
                      if ("force3D" === u) {
                        v[u] = a;
                        continue;
                      }
                      if ("transform" === u) {
                        ia(this, a, t);
                        continue;
                      }
                    }
                  else u in w || (u = xr(u) || u);
                  if (
                    f ||
                    ((o || 0 === o) && (l || 0 === l) && !rr.test(a) && u in w)
                  )
                    o || (o = 0),
                      (p = (r + "").substr((l + "").length)) !==
                        (h = Ai(a) || (u in Je.units ? Je.units[u] : p)) &&
                        (l = $r(t, u, r, h)),
                      (this._pt = new Hn(
                        this._pt,
                        f ? v : w,
                        u,
                        l,
                        (m ? Xs(l, m + o) : o) - l,
                        f ||
                        ("px" !== h && "zIndex" !== u) ||
                        !1 === e.autoRound
                          ? or
                          : dr
                      )),
                      (this._pt.u = h || 0),
                      p !== h &&
                        "%" !== h &&
                        ((this._pt.b = r), (this._pt.r = cr));
                  else if (u in w) Dr.call(this, t, u, r, m ? m + a : a);
                  else {
                    if (!(u in t)) {
                      Os(u, a);
                      continue;
                    }
                    this.add(t, u, r || t[u], m ? m + a : a, i, n);
                  }
                  y.push(u);
                }
            b && Fn(this);
          },
          get: Ir,
          aliases: ar,
          getSetter: function (t, e, s) {
            var i = ar[e];
            return (
              i && i.indexOf(",") < 0 && (e = i),
              e in Jn && e !== yr && (t._gsap.x || Ir(t, "x"))
                ? s && Kn === s
                  ? "scale" === e
                    ? gr
                    : fr
                  : (Kn = s || {}) && ("scale" === e ? vr : _r)
                : t.style && !ps(t.style[e])
                ? hr
                : ~e.indexOf("-")
                ? mr
                : Pn(t, e)
            );
          },
          core: { _removeProperty: kr, _getMatrix: Rr },
        };
      (jn.utils.checkPrefix = xr),
        (aa = Rs(
          (na = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
            "," +
            (ra = "rotation,rotationX,rotationY,skewX,skewY") +
            ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
          function (t) {
            Jn[t] = 1;
          }
        )),
        Rs(ra, function (t) {
          (Je.units[t] = "deg"), (Hr[t] = 1);
        }),
        (ar[aa[13]] = na + "," + ra),
        Rs(
          "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
          function (t) {
            var e = t.split(":");
            ar[e[1]] = aa[e[0]];
          }
        ),
        Rs(
          "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
          function (t) {
            Je.units[t] = "px";
          }
        ),
        jn.registerPlugin(oa);
      var la = jn.registerPlugin(oa) || jn;
      la.core.Tween;
      window.addEventListener("load", function () {
        sessionStorage.getItem("anim") ||
          this.setTimeout(function () {
            la
              .timeline({})
              .from(".hero", { duration: 0.5, opacity: 0 })
              .from(".hero__title", { duration: 0.5, opacity: 0, y: 30 })
              .from(
                ".hero__subtitle",
                { duration: 0.5, opacity: 0, y: 30 },
                "-=0.5"
              )
              .from(
                ".hero__images",
                { duration: 0.5, opacity: 0, y: 30 },
                "-=0.5"
              )
              .from(
                ".hero__text",
                { duration: 0.5, opacity: 0, y: 30 },
                "-=0.2"
              )
              .from(".hero__btn", { duration: 0.5, opacity: 0 })
              .from(".hero__pagination", { duration: 0.7, opacity: 0 }, "-=0.7")
              .from(".header_anim", {
                duration: 0.5,
                ease: "power4.out",
                y: -100,
              })
              .from(".catalog__container", {
                duration: 1,
                ease: "power4.out",
                opacity: 0,
              }),
              sessionStorage.setItem("anim", "true");
          }, 500),
          la.from(".wrapper", {
            opacity: 0,
            ease: "power4.out",
            duration: 1.2,
            delay: 0.5,
          });
      }),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        e.any()
          ? document.documentElement.classList.add("touch")
          : document.documentElement.classList.add("no-touch"),
        window.addEventListener("load", function () {
          setTimeout(function () {
            document.documentElement.classList.add("loaded");
          }, 500);
        }),
        document.querySelector(".icon-menu") &&
          document.addEventListener("click", function (t) {
            a &&
              t.target.closest(".icon-menu") &&
              (o(),
              document.documentElement.classList.toggle("menu-open"),
              document.documentElement.classList.add("lock"));
          }),
        (function () {
          const t = document.querySelectorAll("[data-spollers]");
          if (t.length > 0) {
            const e = Array.from(t).filter(function (t, e, s) {
              return !t.dataset.spollers.split(",")[0];
            });
            e.length && n(e);
            let s = p(t, "spollers");
            function n(t, e = !1) {
              t.forEach((t) => {
                (t = e ? t.item : t),
                  e.matches || !e
                    ? (t.classList.add("_spoller-init"),
                      a(t),
                      t.addEventListener("click", o))
                    : (t.classList.remove("_spoller-init"),
                      a(t, !1),
                      t.removeEventListener("click", o));
              });
            }
            function a(t, e = !0) {
              let s = t.querySelectorAll("[data-spoller]");
              s.length &&
                ((s = Array.from(s).filter(
                  (e) => e.closest("[data-spollers]") === t
                )),
                s.forEach((t) => {
                  e
                    ? (t.removeAttribute("tabindex"),
                      t.classList.contains("_spoller-active") ||
                        (t.nextElementSibling.hidden = !0))
                    : (t.setAttribute("tabindex", "-1"),
                      (t.nextElementSibling.hidden = !1));
                }));
            }
            function o(t) {
              const e = t.target;
              if (e.closest("[data-spoller]")) {
                const s = e.closest("[data-spoller]"),
                  i = s.closest("[data-spollers]"),
                  n = i.hasAttribute("data-one-spoller"),
                  a = i.dataset.spollersSpeed
                    ? parseInt(i.dataset.spollersSpeed)
                    : 500;
                i.querySelectorAll("._slide").length ||
                  (n && !s.classList.contains("_spoller-active") && l(i),
                  s.classList.toggle("_spoller-active"),
                  r(s.nextElementSibling, a)),
                  t.preventDefault();
              }
            }
            function l(t) {
              const e = t.querySelector("[data-spoller]._spoller-active"),
                s = t.dataset.spollersSpeed
                  ? parseInt(t.dataset.spollersSpeed)
                  : 500;
              e &&
                !t.querySelectorAll("._slide").length &&
                (e.classList.remove("_spoller-active"),
                i(e.nextElementSibling, s));
            }
            s &&
              s.length &&
              s.forEach((t) => {
                t.matchMedia.addEventListener("change", function () {
                  n(t.itemsArray, t.matchMedia);
                }),
                  n(t.itemsArray, t.matchMedia);
              });
            const c = document.querySelectorAll("[data-spoller-close]");
            c.length &&
              document.addEventListener("click", function (t) {
                t.target.closest("[data-spollers]") ||
                  c.forEach((t) => {
                    const e = t.closest("[data-spollers]");
                    if (e.classList.contains("_spoller-init")) {
                      const s = e.dataset.spollersSpeed
                        ? parseInt(e.dataset.spollersSpeed)
                        : 500;
                      t.classList.remove("_spoller-active"),
                        i(t.nextElementSibling, s);
                    }
                  });
              });
          }
        })(),
        d(),
        (function (t = { viewPass: !1, autoHeight: !1 }) {
          const e = document.querySelectorAll(
            "input[placeholder],textarea[placeholder]"
          );
          if (
            (e.length &&
              e.forEach((t) => {
                t.hasAttribute("data-placeholder-nohide") ||
                  (t.dataset.placeholder = t.placeholder);
              }),
            document.body.addEventListener("focusin", function (t) {
              const e = t.target;
              ("INPUT" !== e.tagName && "TEXTAREA" !== e.tagName) ||
                (e.dataset.placeholder && (e.placeholder = ""),
                e.hasAttribute("data-no-focus-classes") ||
                  (e.classList.add("_form-focus"),
                  e.parentElement.classList.add("_form-focus")),
                f.removeError(e));
            }),
            document.body.addEventListener("focusout", function (t) {
              const e = t.target;
              ("INPUT" !== e.tagName && "TEXTAREA" !== e.tagName) ||
                (e.dataset.placeholder &&
                  (e.placeholder = e.dataset.placeholder),
                e.hasAttribute("data-no-focus-classes") ||
                  (e.classList.remove("_form-focus"),
                  e.parentElement.classList.remove("_form-focus")),
                e.hasAttribute("data-validate") && f.validateInput(e));
            }),
            t.viewPass &&
              document.addEventListener("click", function (t) {
                let e = t.target;
                if (e.closest('[class*="__viewpass"]')) {
                  let t = e.classList.contains("_viewpass-active")
                    ? "password"
                    : "text";
                  e.parentElement
                    .querySelector("input")
                    .setAttribute("type", t),
                    e.classList.toggle("_viewpass-active"),
                    e.parentElement.classList.toggle("_viewpass-active");
                }
              }),
            t.autoHeight)
          ) {
            const s = document.querySelectorAll("textarea[data-autoheight]");
            if (s.length) {
              function i(t, e) {
                t.style.height = `${e}px`;
              }
              s.forEach((t) => {
                const e = t.hasAttribute("data-autoheight-min")
                    ? Number(t.dataset.autoheightMin)
                    : Number(t.offsetHeight),
                  s = t.hasAttribute("data-autoheight-max")
                    ? Number(t.dataset.autoheightMax)
                    : 1 / 0;
                i(t, Math.min(e, s)),
                  t.addEventListener("input", () => {
                    t.scrollHeight > e &&
                      ((t.style.height = "auto"),
                      i(t, Math.min(Math.max(t.scrollHeight, e), s)));
                  });
              });
            }
          }
        })({ viewPass: !0, autoHeight: !1 }),
        (function () {
          const e = document.forms;
          if (e.length)
            for (const t of e)
              t.addEventListener("submit", function (t) {
                s(t.target, t);
              }),
                t.addEventListener("reset", function (t) {
                  const e = t.target;
                  f.formClean(e);
                });
          async function s(t, e) {
            if (
              0 === (t.hasAttribute("data-no-validate") ? 0 : f.getErrors(t))
            ) {
              if (t.hasAttribute("data-ajax")) {
                e.preventDefault();
                const s = t.getAttribute("action")
                    ? t.getAttribute("action").trim()
                    : "#",
                  n = t.getAttribute("method")
                    ? t.getAttribute("method").trim()
                    : "GET",
                  r = new FormData(t);
                t.classList.add("_sending");
                const a = await fetch(s, { method: n, body: r });
                if (a.ok) {
                  let e = await a.json();
                  t.classList.remove("_sending"), i(t, e);
                } else alert("Ошибка"), t.classList.remove("_sending");
              } else t.hasAttribute("data-dev") && (e.preventDefault(), i(t));
            } else {
              e.preventDefault();
              const s = t.querySelector("._form-error");
              s && t.hasAttribute("data-goto-error") && m(s, !0, 1e3);
            }
          }
          function i(e, s = "") {
            document.dispatchEvent(
              new CustomEvent("formSent", { detail: { form: e } })
            ),
              setTimeout(() => {
                if (t.popup) {
                  const s = e.dataset.popupMessage;
                  s && t.popup.open(s);
                }
              }, 0),
              f.formClean(e),
              u(`[Формы]: ${"Форма отправлена!"}`);
          }
        })(),
        document.addEventListener("click", function (t) {
          let e = t.target;
          if (
            e.closest("[data-quantity-plus]") ||
            e.closest("[data-quantity-minus]")
          ) {
            const t = e
              .closest("[data-quantity]")
              .querySelector("[data-quantity-value]");
            let s = parseInt(t.value);
            e.hasAttribute("data-quantity-plus")
              ? (s++,
                +t.dataset.quantityMax &&
                  +t.dataset.quantityMax < s &&
                  (s = t.dataset.quantityMax),
                s >= 10 && e.classList.add("_hold"))
              : (--s,
                +t.dataset.quantityMin
                  ? +t.dataset.quantityMin > s && (s = t.dataset.quantityMin)
                  : s < 1
                  ? (s = 1)
                  : s <= 10 &&
                    e.parentElement
                      .querySelector("[data-quantity-plus]")
                      .classList.remove("_hold")),
              (e
                .closest("[data-quantity]")
                .querySelector("[data-quantity-value]").value = s);
          }
        }),
        (function () {
          kt = !0;
          const t = document.querySelector("header.header"),
            e = t.hasAttribute("data-scroll-show"),
            s = t.dataset.scrollShow ? t.dataset.scrollShow : 500,
            i = t.dataset.scroll ? t.dataset.scroll : 1;
          let n,
            r = 0;
          document.addEventListener("windowScroll", function (a) {
            const o = window.scrollY;
            clearTimeout(n),
              o >= i
                ? (!t.classList.contains("_header-scroll") &&
                    t.classList.add("_header-scroll"),
                  e &&
                    (o > r
                      ? t.classList.contains("_header-show") &&
                        t.classList.remove("_header-show")
                      : !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show"),
                    (n = setTimeout(() => {
                      !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show");
                    }, s))))
                : (t.classList.contains("_header-scroll") &&
                    t.classList.remove("_header-scroll"),
                  e &&
                    t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")),
              (r = o <= 0 ? 0 : o);
          });
        })();
    })();
})();
