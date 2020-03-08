(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.UpSetJS = {}));
}(this, (function (exports) { 'use strict';

  var n,
      u,
      i,
      t,
      o,
      r,
      f = {},
      e = [],
      c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

  function s(n, l) {
    for (var u in l) {
      n[u] = l[u];
    }

    return n;
  }

  function a(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
  }

  function v(n, l, u) {
    var i,
        t = arguments,
        o = {};

    for (i in l) {
      "key" !== i && "ref" !== i && (o[i] = l[i]);
    }

    if (arguments.length > 3) for (u = [u], i = 3; i < arguments.length; i++) {
      u.push(t[i]);
    }
    if (null != u && (o.children = u), "function" == typeof n && null != n.defaultProps) for (i in n.defaultProps) {
      void 0 === o[i] && (o[i] = n.defaultProps[i]);
    }
    return h(n, o, l && l.key, l && l.ref);
  }

  function h(l, u, i, t) {
    var o = {
      type: l,
      props: u,
      key: i,
      ref: t,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      constructor: void 0
    };
    return n.vnode && n.vnode(o), o;
  }

  function p() {
    return {};
  }

  function d(n) {
    return n.children;
  }

  function y(n, l) {
    this.props = n, this.context = l;
  }

  function m(n, l) {
    if (null == l) return n.__ ? m(n.__, n.__.__k.indexOf(n) + 1) : null;

    for (var u; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    }

    return "function" == typeof n.type ? m(n) : null;
  }

  function w(n) {
    var l, u;

    if (null != (n = n.__) && null != n.__c) {
      for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
        if (null != (u = n.__k[l]) && null != u.__e) {
          n.__e = n.__c.base = u.__e;
          break;
        }
      }

      return w(n);
    }
  }

  function g(l) {
    (!l.__d && (l.__d = !0) && 1 === u.push(l) || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(k);
  }

  function k() {
    var n, l, i, t, o, r, f;

    for (u.sort(function (n, l) {
      return l.__v.__b - n.__v.__b;
    }); n = u.pop();) {
      n.__d && (i = void 0, t = void 0, r = (o = (l = n).__v).__e, (f = l.__P) && (i = [], t = z(f, o, s({}, o), l.__n, void 0 !== f.ownerSVGElement, null, i, null == r ? m(o) : r), A(i, o), t != r && w(o)));
    }
  }

  function _(n, l, u, i, t, o, r, c, s) {
    var v,
        h,
        p,
        d,
        y,
        w,
        g,
        k = u && u.__k || e,
        _ = k.length;
    if (c == f && (c = null != o ? o[0] : _ ? m(u, 0) : null), v = 0, l.__k = b(l.__k, function (u) {
      if (null != u) {
        if (u.__ = l, u.__b = l.__b + 1, null === (p = k[v]) || p && u.key == p.key && u.type === p.type) k[v] = void 0;else for (h = 0; h < _; h++) {
          if ((p = k[h]) && u.key == p.key && u.type === p.type) {
            k[h] = void 0;
            break;
          }

          p = null;
        }

        if (d = z(n, u, p = p || f, i, t, o, r, c, s), (h = u.ref) && p.ref != h && (g || (g = []), p.ref && g.push(p.ref, null, u), g.push(h, u.__c || d, u)), null != d) {
          var e;
          if (null == w && (w = d), void 0 !== u.__d) e = u.__d, u.__d = void 0;else if (o == p || d != c || null == d.parentNode) {
            n: if (null == c || c.parentNode !== n) n.appendChild(d), e = null;else {
              for (y = c, h = 0; (y = y.nextSibling) && h < _; h += 2) {
                if (y == d) break n;
              }

              n.insertBefore(d, c), e = c;
            }

            "option" == l.type && (n.value = "");
          }
          c = void 0 !== e ? e : d.nextSibling, "function" == typeof l.type && (l.__d = c);
        } else c && p.__e == c && c.parentNode != n && (c = m(p));
      }

      return v++, u;
    }), l.__e = w, null != o && "function" != typeof l.type) for (v = o.length; v--;) {
      null != o[v] && a(o[v]);
    }

    for (v = _; v--;) {
      null != k[v] && j(k[v], k[v]);
    }

    if (g) for (v = 0; v < g.length; v++) {
      $(g[v], g[++v], g[++v]);
    }
  }

  function b(n, l, u) {
    if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var i = 0; i < n.length; i++) {
      b(n[i], l, u);
    } else u.push(l ? l("string" == typeof n || "number" == typeof n ? h(null, n, null, null) : null != n.__e || null != n.__c ? h(n.type, n.props, n.key, null) : n) : n);
    return u;
  }

  function x(n, l, u, i, t) {
    var o;

    for (o in u) {
      o in l || C(n, o, null, u[o], i);
    }

    for (o in l) {
      t && "function" != typeof l[o] || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], i);
    }
  }

  function P(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c.test(l) ? u + "px" : null == u ? "" : u;
  }

  function C(n, l, u, i, t) {
    var o, r, f, e, c;
    if (t ? "className" === l && (l = "class") : "class" === l && (l = "className"), "key" === l || "children" === l) ;else if ("style" === l) {
      if (o = n.style, "string" == typeof u) o.cssText = u;else {
        if ("string" == typeof i && (o.cssText = "", i = null), i) for (r in i) {
          u && r in u || P(o, r, "");
        }
        if (u) for (f in u) {
          i && u[f] === i[f] || P(o, f, u[f]);
        }
      }
    } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (i || n.addEventListener(l, N, e), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, N, e)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && "size" !== l && !t && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u && !/^ar/.test(l) ? n.removeAttribute(l) : n.setAttribute(l, u));
  }

  function N(l) {
    this.l[l.type](n.event ? n.event(l) : l);
  }

  function z(l, u, i, t, o, r, f, e, c) {
    var a,
        v,
        h,
        p,
        m,
        w,
        g,
        k,
        b,
        x,
        P = u.type;
    if (void 0 !== u.constructor) return null;
    (a = n.__b) && a(u);

    try {
      n: if ("function" == typeof P) {
        if (k = u.props, b = (a = P.contextType) && t[a.__c], x = a ? b ? b.props.value : a.__ : t, i.__c ? g = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(k, x) : (u.__c = v = new y(k, x), v.constructor = P, v.render = D), b && b.sub(v), v.props = k, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = s({}, v.__s)), s(v.__s, P.getDerivedStateFromProps(k, v.__s))), p = v.props, m = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
          if (null == P.getDerivedStateFromProps && k !== p && null != v.componentWillReceiveProps && v.componentWillReceiveProps(k, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(k, v.__s, x)) {
            for (v.props = k, v.state = v.__s, v.__d = !1, v.__v = u, u.__e = i.__e, u.__k = i.__k, v.__h.length && f.push(v), a = 0; a < u.__k.length; a++) {
              u.__k[a] && (u.__k[a].__ = u);
            }

            break n;
          }

          null != v.componentWillUpdate && v.componentWillUpdate(k, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
            v.componentDidUpdate(p, m, w);
          });
        }
        v.context = x, v.props = k, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), u.__k = null != a && a.type == d && null == a.key ? a.props.children : Array.isArray(a) ? a : [a], null != v.getChildContext && (t = s(s({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (w = v.getSnapshotBeforeUpdate(p, m)), _(l, u, i, t, o, r, f, e, c), v.base = u.__e, v.__h.length && f.push(v), g && (v.__E = v.__ = null), v.__e = !1;
      } else u.__e = T(i.__e, u, i, t, o, r, f, c);

      (a = n.diffed) && a(u);
    } catch (l) {
      n.__e(l, u, i);
    }

    return u.__e;
  }

  function A(l, u) {
    n.__c && n.__c(u, l), l.some(function (u) {
      try {
        l = u.__h, u.__h = [], l.some(function (n) {
          n.call(u);
        });
      } catch (l) {
        n.__e(l, u.__v);
      }
    });
  }

  function T(n, l, u, i, t, o, r, c) {
    var s,
        a,
        v,
        h,
        p,
        d = u.props,
        y = l.props;
    if (t = "svg" === l.type || t, null != o) for (s = 0; s < o.length; s++) {
      if (null != (a = o[s]) && ((null === l.type ? 3 === a.nodeType : a.localName === l.type) || n == a)) {
        n = a, o[s] = null;
        break;
      }
    }

    if (null == n) {
      if (null === l.type) return document.createTextNode(y);
      n = t ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type, y.is && {
        is: y.is
      }), o = null;
    }

    if (null === l.type) d !== y && n.data != y && (n.data = y);else if (l !== u) {
      if (null != o && (o = e.slice.call(n.childNodes)), v = (d = u.props || f).dangerouslySetInnerHTML, h = y.dangerouslySetInnerHTML, !c) {
        if (d === f) for (d = {}, p = 0; p < n.attributes.length; p++) {
          d[n.attributes[p].name] = n.attributes[p].value;
        }
        (h || v) && (h && v && h.__html == v.__html || (n.innerHTML = h && h.__html || ""));
      }

      x(n, y, d, t, c), l.__k = l.props.children, h || _(n, l, u, i, "foreignObject" !== l.type && t, o, r, f, c), c || ("value" in y && void 0 !== y.value && y.value !== n.value && (n.value = null == y.value ? "" : y.value), "checked" in y && void 0 !== y.checked && y.checked !== n.checked && (n.checked = y.checked));
    }
    return n;
  }

  function $(l, u, i) {
    try {
      "function" == typeof l ? l(u) : l.current = u;
    } catch (l) {
      n.__e(l, i);
    }
  }

  function j(l, u, i) {
    var t, o, r;

    if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || $(t, null, u)), i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
      if (t.componentWillUnmount) try {
        t.componentWillUnmount();
      } catch (l) {
        n.__e(l, u);
      }
      t.base = t.__P = null;
    }

    if (t = l.__k) for (r = 0; r < t.length; r++) {
      t[r] && j(t[r], u, i);
    }
    null != o && a(o);
  }

  function D(n, l, u) {
    return this.constructor(n, u);
  }

  function E(l, u, i) {
    var t, r, c;
    n.__ && n.__(l, u), r = (t = i === o) ? null : i && i.__k || u.__k, l = v(d, null, [l]), c = [], z(u, (t ? u : i || u).__k = l, r || f, f, void 0 !== u.ownerSVGElement, i && !t ? [i] : r ? null : e.slice.call(u.childNodes), c, i || f, t), A(c, l);
  }

  function H(n, l) {
    E(n, l, o);
  }

  function I(n, l) {
    return l = s(s({}, n.props), l), arguments.length > 2 && (l.children = e.slice.call(arguments, 2)), h(n.type, l, l.key || n.key, l.ref || n.ref);
  }

  function L(n) {
    var l = {},
        u = {
      __c: "__cC" + r++,
      __: n,
      Consumer: function Consumer(n, l) {
        return n.children(l);
      },
      Provider: function Provider(n) {
        var i,
            t = this;
        return this.getChildContext || (i = [], this.getChildContext = function () {
          return l[u.__c] = t, l;
        }, this.shouldComponentUpdate = function (l) {
          n.value !== l.value && i.some(function (n) {
            n.context = l.value, g(n);
          });
        }, this.sub = function (n) {
          i.push(n);
          var l = n.componentWillUnmount;

          n.componentWillUnmount = function () {
            i.splice(i.indexOf(n), 1), l && l.call(n);
          };
        }), n.children;
      }
    };
    return u.Consumer.contextType = u, u;
  }

  n = {
    __e: function __e(n, l) {
      for (var u, i; l = l.__;) {
        if ((u = l.__c) && !u.__) try {
          if (u.constructor && null != u.constructor.getDerivedStateFromError && (i = !0, u.setState(u.constructor.getDerivedStateFromError(n))), null != u.componentDidCatch && (i = !0, u.componentDidCatch(n)), i) return g(u.__E = u);
        } catch (l) {
          n = l;
        }
      }

      throw n;
    }
  }, y.prototype.setState = function (n, l) {
    var u;
    u = this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && s(u, n), null != n && this.__v && (l && this.__h.push(l), g(this));
  }, y.prototype.forceUpdate = function (n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), g(this));
  }, y.prototype.render = d, u = [], i = "function" == typeof Promise ? /*#__PURE__*/Promise.prototype.then.bind( /*#__PURE__*/Promise.resolve()) : setTimeout, o = f, r = 0;

  function powerSetNumber(arr, onSet, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$min = _ref.min,
        min = _ref$min === void 0 ? 0 : _ref$min,
        _ref$max = _ref.max,
        max = _ref$max === void 0 ? Infinity : _ref$max;

    var total = Math.pow(2, arr.length);
    var lastBit = 0;
    var lastBitAcc = 1;

    for (var i = 0; i < total; i++) {
      if (i >= lastBitAcc) {
        // just maximal goes up to this bit
        // 0 ... 0 bit
        // 1 ... 1 bit
        // 2 ... 2 bits
        // 4 ... 3 bits
        lastBit++;
        lastBitAcc = lastBitAcc << 1;
      }

      var sub = [];

      for (var j = 0; j < lastBit; j++) {
        if (i & 1 << j) {
          // jth bit set in i
          sub.push(arr[j]);
        }
      }

      if (sub.length >= min && sub.length <= max) {
        onSet(sub);
      }
    }
  }

  function powerSetBigInt(arr, onSet, _temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$min = _ref2.min,
        min = _ref2$min === void 0 ? 0 : _ref2$min,
        _ref2$max = _ref2.max,
        max = _ref2$max === void 0 ? Infinity : _ref2$max;

    var zero = BigInt(0);
    var one = BigInt(1);
    var two = BigInt(2);
    var total = two << BigInt(arr.length);
    var lastBit = 0;
    var lastBitAcc = one;
    var bits = arr.map(function (_, i) {
      return one << BigInt(i);
    });

    for (var i = zero; i < total; i += one) {
      if (i >= lastBitAcc) {
        // just maximal goes up to this bit
        // 0 ... 0 bit
        // 1 ... 1 bit
        // 2 ... 2 bits
        // 4 ... 3 bits
        lastBit++;
        lastBitAcc = lastBitAcc << one;
      }

      var sub = [];

      for (var j = 0; j < lastBit; j++) {
        if ((i & bits[j]) != zero) {
          // jth bit set in i
          sub.push(arr[j]);
        }
      }

      if (sub.length >= min && sub.length <= max) {
        onSet(sub);
      }
    }
  }

  function powerSetRecursive(arr, onSet, _temp3) {
    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        _ref3$min = _ref3.min,
        min = _ref3$min === void 0 ? 0 : _ref3$min,
        _ref3$max = _ref3.max,
        max = _ref3$max === void 0 ? Infinity : _ref3$max;

    var check = function check(len) {
      return len >= min && len <= max;
    };

    function iter(subset, start) {
      if (subset.length >= max) {
        return;
      }

      for (var i = start; i < arr.length; i++) {
        subset.push(arr[i]);

        if (check(subset.length)) {
          onSet(subset.slice());
        }

        iter(subset, i + 1);
        subset.pop();
      }
    }

    if (check(0)) {
      onSet([]);
    }

    iter([], 0);
  }

  function powerSet(arr, options) {
    if (options === void 0) {
      options = {};
    }

    var total = Math.pow(2, arr.length);

    var asForEach = function asForEach(f) {
      return {
        forEach: function forEach(cb) {
          return f(arr, cb, options);
        }
      };
    };

    if (total < Number.MAX_SAFE_INTEGER) {
      return asForEach(powerSetNumber);
    }

    if (typeof window.BigInt !== 'undefined') {
      return asForEach(powerSetBigInt);
    }

    return asForEach(powerSetRecursive);
  }

  function generateIntersections(sets, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$min = _ref.min,
        min = _ref$min === void 0 ? 0 : _ref$min,
        _ref$max = _ref.max,
        max = _ref$max === void 0 ? Infinity : _ref$max,
        _ref$empty = _ref.empty,
        empty = _ref$empty === void 0 ? false : _ref$empty;

    var setElems = new Map(sets.map(function (s) {
      return [s, new Set(s.elems)];
    }));

    function computeIntersection(intersection) {
      if (intersection.length === 0) {
        return [];
      }

      if (intersection.length === 1) {
        return intersection[0].elems;
      }

      var smallest = intersection.reduce(function (acc, d) {
        return !acc || acc.length > d.elems.length ? d.elems : acc;
      }, null);
      return smallest.filter(function (elem) {
        return intersection.every(function (s) {
          return setElems.get(s).has(elem);
        });
      });
    }

    var intersections = [];
    powerSet(sets, {
      min: min,
      max: max
    }).forEach(function (intersection) {
      var elems = computeIntersection(intersection);

      if (!empty && elems.length === 0) {
        return;
      }

      intersections.push({
        type: 'intersection',
        elems: elems,
        sets: new Set(intersection),
        name: intersection.length === 1 ? intersection[0].name : "(" + intersection.map(function (d) {
          return d.name;
        }).join(' ∩ ') + ")",
        cardinality: elems.length,
        degree: intersection.length
      });
    });
    return intersections;
  }

  function generateUnions(sets, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$min = _ref.min,
        min = _ref$min === void 0 ? 2 : _ref$min,
        _ref$max = _ref.max,
        max = _ref$max === void 0 ? Infinity : _ref$max;

    function computeUnion(union) {
      if (union.length === 0) {
        return [];
      }

      if (union.length === 1) {
        return union[0].elems;
      }

      var largest = union.reduce(function (acc, d) {
        return !acc || acc.length < d.elems.length ? d.elems : acc;
      }, null);
      var all = largest.slice();
      var contained = new Set(all);
      union.forEach(function (set) {
        if (set.elems === largest) {
          // already included
          return;
        }

        set.elems.forEach(function (elem) {
          if (!contained.has(elem)) {
            all.push(elem);
            contained.add(elem);
          }
        });
      });
      return all;
    }

    var unions = [];
    powerSet(sets, {
      min: min,
      max: max
    }).forEach(function (union) {
      var elems = computeUnion(union);
      unions.push({
        type: 'union',
        elems: elems,
        sets: new Set(union),
        name: union.length === 1 ? union[0].name : "(" + union.map(function (d) {
          return d.name;
        }).join(' ∪ ') + ")",
        cardinality: elems.length,
        degree: union.length
      });
    });
    return unions;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /**
   * helper to create a proper data structures for UpSet sets
   * @param sets set like structures
   */


  function asSets(sets) {
    return sets.map(function (set) {
      var r = _extends({}, set, {
        type: 'set',
        cardinality: set.elems.length
      });

      return r;
    });
  }

  function extractSets(elements) {
    var sets = new Map();
    elements.forEach(function (elem) {
      elem.sets.forEach(function (set) {
        if (!sets.has(set)) {
          sets.set(set, [elem]);
        } else {
          sets.get(set).push(elem);
        }
      });
    });
    return Array.from(sets).map(function (_ref) {
      var set = _ref[0],
          elems = _ref[1];
      var r = {
        type: 'set',
        elems: elems,
        name: set.toString(),
        cardinality: elems.length
      };
      return r;
    });
  }

  function len(a) {
    return a instanceof Set ? a.size : a.length;
  }

  function setOverlapFactory(a) {
    var elems = a instanceof Set ? a : new Set(a);
    var setA = elems.size;
    var same = {
      setA: setA,
      setB: setA,
      union: setA,
      intersection: setA
    };
    return function (b) {
      if (b === a) {
        return same;
      }

      var intersection = 0;
      b.forEach(function (e) {
        if (elems.has(e)) {
          intersection++;
        }
      });
      var setB = len(b);
      return {
        setA: setA,
        setB: setB,
        intersection: intersection,
        union: setA + setB - intersection
      };
    };
  }

  function setOverlap(a, b) {
    if (len(a) < len(b) || a instanceof Set) {
      return setOverlapFactory(a)(b);
    }

    var r = setOverlapFactory(b)(a); // swap back

    return _extends({}, r, {
      setA: r.setB,
      setB: r.setA
    });
  }

  var t$1,
      r$1,
      u$1,
      i$1 = [],
      o$1 = n.__r,
      f$1 = n.diffed,
      c$1 = n.__c,
      e$1 = n.unmount;

  function a$1(t) {
    n.__h && n.__h(r$1);
    var u = r$1.__H || (r$1.__H = {
      __: [],
      __h: []
    });
    return t >= u.__.length && u.__.push({}), u.__[t];
  }

  function v$1(n) {
    return m$1(x$1, n);
  }

  function m$1(n, u, i) {
    var o = a$1(t$1++);
    return o.__c || (o.__c = r$1, o.__ = [i ? i(u) : x$1(void 0, u), function (t) {
      var r = n(o.__[0], t);
      o.__[0] !== r && (o.__[0] = r, o.__c.setState({}));
    }]), o.__;
  }

  function p$1(n, u) {
    var i = a$1(t$1++);
    q(i.__H, u) && (i.__ = n, i.__H = u, r$1.__H.__h.push(i));
  }

  function l(n, u) {
    var i = a$1(t$1++);
    q(i.__H, u) && (i.__ = n, i.__H = u, r$1.__h.push(i));
  }

  function y$1(n) {
    return s$1(function () {
      return {
        current: n
      };
    }, []);
  }

  function d$1(n, t, r) {
    l(function () {
      "function" == typeof n ? n(t()) : n && (n.current = t());
    }, null == r ? r : r.concat(n));
  }

  function s$1(n, r) {
    var u = a$1(t$1++);
    return q(u.__H, r) ? (u.__H = r, u.__h = n, u.__ = n()) : u.__;
  }

  function h$1(n, t) {
    return s$1(function () {
      return n;
    }, t);
  }

  function T$1(n) {
    var u = r$1.context[n.__c];
    if (!u) return n.__;
    var i = a$1(t$1++);
    return null == i.__ && (i.__ = !0, u.sub(r$1)), u.props.value;
  }

  function w$1(t, r) {
    n.useDebugValue && n.useDebugValue(r ? r(t) : t);
  }

  function F() {
    i$1.some(function (t) {
      if (t.__P) try {
        t.__H.__h.forEach(_$1), t.__H.__h.forEach(g$1), t.__H.__h = [];
      } catch (r) {
        return n.__e(r, t.__v), !0;
      }
    }), i$1 = [];
  }

  function _$1(n) {
    n.t && n.t();
  }

  function g$1(n) {
    var t = n.__();

    "function" == typeof t && (n.t = t);
  }

  function q(n, t) {
    return !n || t.some(function (t, r) {
      return t !== n[r];
    });
  }

  function x$1(n, t) {
    return "function" == typeof t ? t(n) : t;
  }

  n.__r = function (n) {
    o$1 && o$1(n), t$1 = 0, (r$1 = n.__c).__H && (r$1.__H.__h.forEach(_$1), r$1.__H.__h.forEach(g$1), r$1.__H.__h = []);
  }, n.diffed = function (t) {
    f$1 && f$1(t);
    var r = t.__c;

    if (r) {
      var o = r.__H;
      o && o.__h.length && (1 !== i$1.push(r) && u$1 === n.requestAnimationFrame || ((u$1 = n.requestAnimationFrame) || function (n) {
        var t,
            r = function r() {
          clearTimeout(u), cancelAnimationFrame(t), setTimeout(n);
        },
            u = setTimeout(r, 100);

        "undefined" != typeof window && (t = requestAnimationFrame(r));
      })(F));
    }
  }, n.__c = function (t, r) {
    r.some(function (t) {
      try {
        t.__h.forEach(_$1), t.__h = t.__h.filter(function (n) {
          return !n.__ || g$1(n);
        });
      } catch (u) {
        r.some(function (n) {
          n.__h && (n.__h = []);
        }), r = [], n.__e(u, t.__v);
      }
    }), c$1 && c$1(t, r);
  }, n.unmount = function (t) {
    e$1 && e$1(t);
    var r = t.__c;

    if (r) {
      var u = r.__H;
      if (u) try {
        u.__.forEach(function (n) {
          return n.t && n.t();
        });
      } catch (t) {
        n.__e(t, r.__v);
      }
    }
  };

  function E$1(n, t) {
    for (var e in t) {
      n[e] = t[e];
    }

    return n;
  }

  function w$2(n, t) {
    for (var e in n) {
      if ("__source" !== e && !(e in t)) return !0;
    }

    for (var r in t) {
      if ("__source" !== r && n[r] !== t[r]) return !0;
    }

    return !1;
  }

  var C$1 = /*#__PURE__*/function (n) {
    var t, e;

    function r(t) {
      var e;
      return (e = n.call(this, t) || this).isPureReactComponent = !0, e;
    }

    return e = n, (t = r).prototype = /*#__PURE__*/Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e, r.prototype.shouldComponentUpdate = function (n, t) {
      return w$2(this.props, n) || w$2(this.state, t);
    }, r;
  }(y);

  function _$2(n, t) {
    function e(n) {
      var e = this.props.ref,
          r = e == n.ref;
      return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : w$2(this.props, n);
    }

    function r(t) {
      return this.shouldComponentUpdate = e, v(n, E$1({}, t));
    }

    return r.prototype.isReactComponent = !0, r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.t = !0, r;
  }

  var A$1 = n.vnode;

  function S(n) {
    function t(t) {
      var e = E$1({}, t);
      return delete e.ref, n(e, t.ref);
    }

    return t.prototype.isReactComponent = !0, t.t = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
  }

  n.vnode = function (n) {
    n.type && n.type.t && n.ref && (n.props.ref = n.ref, n.ref = null), A$1 && A$1(n);
  };

  var k$1 = function k(n, t) {
    return n ? b(n).reduce(function (n, e, r) {
      return n.concat(t(e, r));
    }, []) : null;
  },
      R = {
    map: k$1,
    forEach: k$1,
    count: function count(n) {
      return n ? b(n).length : 0;
    },
    only: function only(n) {
      if (1 !== (n = b(n)).length) throw new Error("Children.only() expects only one child.");
      return n[0];
    },
    toArray: b
  },
      F$1 = n.__e;

  function N$1(n) {
    return n && ((n = E$1({}, n)).__c = null, n.__k = n.__k && n.__k.map(N$1)), n;
  }

  function U(n) {
    this.__u = 0, this.u = null, this.__b = null;
  }

  function M(n) {
    var t = n.__.__c;
    return t && t.o && t.o(n);
  }

  function L$1(n) {
    var t, e, r;

    function u(u) {
      if (t || (t = n()).then(function (n) {
        e = n["default"] || n;
      }, function (n) {
        r = n;
      }), r) throw r;
      if (!e) throw t;
      return v(e, u);
    }

    return u.displayName = "Lazy", u.t = !0, u;
  }

  function O() {
    this.i = null, this.l = null;
  }

  n.__e = function (n, t, e) {
    if (n.then) for (var r, u = t; u = u.__;) {
      if ((r = u.__c) && r.__c) return r.__c(n, t.__c);
    }
    F$1(n, t, e);
  }, (U.prototype = /*#__PURE__*/new y()).__c = function (n, t) {
    var e = this;
    null == e.u && (e.u = []), e.u.push(t);

    var r = M(e.__v),
        u = !1,
        o = function o() {
      u || (u = !0, r ? r(i) : i());
    };

    t.__c = t.componentWillUnmount, t.componentWillUnmount = function () {
      o(), t.__c && t.__c();
    };

    var i = function i() {
      var n;
      if (! --e.__u) for (e.__v.__k[0] = e.state.o, e.setState({
        o: e.__b = null
      }); n = e.u.pop();) {
        n.forceUpdate();
      }
    };

    e.__u++ || e.setState({
      o: e.__b = e.__v.__k[0]
    }), n.then(o, o);
  }, U.prototype.render = function (n, t) {
    return this.__b && (this.__v.__k[0] = N$1(this.__b), this.__b = null), [v(y, null, t.o ? null : n.children), t.o && n.fallback];
  };

  var P$1 = function P(n, t, e) {
    if (++e[1] === e[0] && n.l["delete"](t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
      for (; e.length > 3;) {
        e.pop()();
      }

      if (e[1] < e[0]) break;
      n.i = e = e[2];
    }
  };

  (O.prototype = /*#__PURE__*/new y()).o = function (n) {
    var t = this,
        e = M(t.__v),
        r = t.l.get(n);
    return r[0]++, function (u) {
      var o = function o() {
        t.props.revealOrder ? (r.push(u), P$1(t, n, r)) : u();
      };

      e ? e(o) : o();
    };
  }, O.prototype.render = function (n) {
    this.i = null, this.l = new Map();
    var t = b(n.children);
    n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

    for (var e = t.length; e--;) {
      this.l.set(t[e], this.i = [1, 0, this.i]);
    }

    return n.children;
  }, O.prototype.componentDidUpdate = O.prototype.componentDidMount = function () {
    var n = this;
    n.l.forEach(function (t, e) {
      P$1(n, e, t);
    });
  };

  var W = /*#__PURE__*/function () {
    function n() {}

    var t = n.prototype;
    return t.getChildContext = function () {
      return this.props.context;
    }, t.render = function (n) {
      return n.children;
    }, n;
  }();

  function j$1(n) {
    var t = this,
        e = n.container,
        r = v(W, {
      context: t.context
    }, n.vnode);
    return t.s && t.s !== e && (t.h.parentNode && t.s.removeChild(t.h), j(t.v), t.p = !1), n.vnode ? t.p ? (e.__k = t.__k, E(r, e), t.__k = e.__k) : (t.h = document.createTextNode(""), H("", e), e.appendChild(t.h), t.p = !0, t.s = e, E(r, e, t.h), t.__k = this.h.__k) : t.p && (t.h.parentNode && t.s.removeChild(t.h), j(t.v)), t.v = r, t.componentWillUnmount = function () {
      t.h.parentNode && t.s.removeChild(t.h), j(t.v);
    }, null;
  }

  function z$1(n, t) {
    return v(j$1, {
      vnode: n,
      container: t
    });
  }

  var D$1 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  y.prototype.isReactComponent = {};
  var H$1 = "undefined" != typeof Symbol && Symbol["for"] && /*#__PURE__*/Symbol["for"]("react.element") || 60103;

  function T$2(n, t, e) {
    if (null == t.__k) for (; t.firstChild;) {
      t.removeChild(t.firstChild);
    }
    return E(n, t), "function" == typeof e && e(), n ? n.__c : null;
  }

  var Z = n.event;

  function I$1(n, t) {
    n["UNSAFE_" + t] && !n[t] && Object.defineProperty(n, t, {
      configurable: !1,
      get: function get() {
        return this["UNSAFE_" + t];
      },
      set: function set(n) {
        this["UNSAFE_" + t] = n;
      }
    });
  }

  n.event = function (n) {
    Z && (n = Z(n)), n.persist = function () {}, n.isDefaultPrevented = function () {
      return n.defaultPrevented;
    };
    var t = n.stopPropagation,
        e = !1;
    return n.stopPropagation = function () {
      e = !0, t.call(this);
    }, n.isPropagationStopped = function () {
      return e;
    }, n.nativeEvent = n;
  };

  var $$1 = {
    configurable: !0,
    get: function get() {
      return this["class"];
    }
  },
      q$1 = n.vnode;

  n.vnode = function (n) {
    n.$$typeof = H$1;
    var t = n.type,
        e = n.props;

    if (e["class"] != e.className && ($$1.enumerable = "className" in e, null != e.className && (e["class"] = e.className), Object.defineProperty(e, "className", $$1)), "function" != typeof t) {
      var r, u, o;

      for (o in e.defaultValue && (e.value || 0 === e.value || (e.value = e.defaultValue), delete e.defaultValue), Array.isArray(e.value) && e.multiple && "select" === t && (b(e.children).forEach(function (n) {
        -1 != e.value.indexOf(n.props.value) && (n.props.selected = !0);
      }), delete e.value), e) {
        if (r = D$1.test(o)) break;
      }

      if (r) for (o in u = n.props = {}, e) {
        u[D$1.test(o) ? o.replace(/([A-Z0-9])/, "-$1").toLowerCase() : o] = e[o];
      }
    }

    !function (t) {
      var e = n.type,
          r = n.props;

      if (r && "string" == typeof e) {
        var u = {};

        for (var o in r) {
          /^on(Ani|Tra|Tou)/.test(o) && (r[o.toLowerCase()] = r[o], delete r[o]), u[o.toLowerCase()] = o;
        }

        if (u.ondoubleclick && (r.ondblclick = r[u.ondoubleclick], delete r[u.ondoubleclick]), u.onbeforeinput && (r.onbeforeinput = r[u.onbeforeinput], delete r[u.onbeforeinput]), u.onchange && ("textarea" === e || "input" === e.toLowerCase() && !/^fil|che|ra/i.test(r.type))) {
          var i = u.oninput || "oninput";
          r[i] || (r[i] = r[u.onchange], delete r[u.onchange]);
        }
      }
    }(), "function" == typeof t && !t.m && t.prototype && (I$1(t.prototype, "componentWillMount"), I$1(t.prototype, "componentWillReceiveProps"), I$1(t.prototype, "componentWillUpdate"), t.m = !0), q$1 && q$1(n);
  };

  function G(n) {
    return v.bind(null, n);
  }

  function J(n) {
    return !!n && n.$$typeof === H$1;
  }

  function K(n) {
    return J(n) ? I.apply(null, arguments) : n;
  }

  function Q(n) {
    return !!n.__k && (E(null, n), !0);
  }

  function X(n) {
    return n && (n.base || 1 === n.nodeType && n) || null;
  }

  var Y = function Y(n, t) {
    return n(t);
  };

  var React = {
    useState: v$1,
    useReducer: m$1,
    useEffect: p$1,
    useLayoutEffect: l,
    useRef: y$1,
    useImperativeHandle: d$1,
    useMemo: s$1,
    useCallback: h$1,
    useContext: T$1,
    useDebugValue: w$1,
    version: "16.8.0",
    Children: R,
    render: T$2,
    hydrate: T$2,
    unmountComponentAtNode: Q,
    createPortal: z$1,
    createElement: v,
    createContext: L,
    createFactory: G,
    cloneElement: K,
    createRef: p,
    Fragment: d,
    isValidElement: J,
    findDOMNode: X,
    Component: y,
    PureComponent: C$1,
    memo: _$2,
    forwardRef: S,
    unstable_batchedUpdates: Y,
    Suspense: U,
    SuspenseList: O,
    lazy: L$1
  };

  function ascending (a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector (compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function left(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;

        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
        }

        return lo;
      },
      right: function right(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;

        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
        }

        return lo;
      }
    };
  }

  function ascendingComparator(f) {
    return function (d, x) {
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = /*#__PURE__*/bisector(ascending);
  var bisectRight = ascendingBisect.right;

  function sequence (start, stop, step) {
    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
    var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n);

    while (++i < n) {
      range[i] = start + i * step;
    }

    return range;
  }

  var e10 = /*#__PURE__*/Math.sqrt(50),
      e5 = /*#__PURE__*/Math.sqrt(10),
      e2 = /*#__PURE__*/Math.sqrt(2);
  function ticks (start, stop, count) {
    var reverse,
        i = -1,
        n,
        ticks,
        step;
    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [start];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      start = Math.ceil(start / step);
      stop = Math.floor(stop / step);
      ticks = new Array(n = Math.ceil(stop - start + 1));

      while (++i < n) {
        ticks[i] = (start + i) * step;
      }
    } else {
      start = Math.floor(start * step);
      stop = Math.ceil(stop * step);
      ticks = new Array(n = Math.ceil(start - stop + 1));

      while (++i < n) {
        ticks[i] = (start - i) / step;
      }
    }

    if (reverse) ticks.reverse();
    return ticks;
  }
  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log(step) / Math.LN10),
        error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0:
        break;

      case 1:
        this.range(domain);
        break;

      default:
        this.range(range).domain(domain);
        break;
    }

    return this;
  }

  var implicit = /*#__PURE__*/Symbol("implicit");
  function ordinal() {
    var index = new Map(),
        domain = [],
        range = [],
        unknown = implicit;

    function scale(d) {
      var key = d + "",
          i = index.get(key);

      if (!i) {
        if (unknown !== implicit) return unknown;
        index.set(key, i = domain.push(d));
      }

      return range[(i - 1) % range.length];
    }

    scale.domain = function (_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = new Map();

      for (var _iterator = _, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var value = _ref;
        var key = value + "";
        if (index.has(key)) continue;
        index.set(key, domain.push(value));
      }

      return scale;
    };

    scale.range = function (_) {
      return arguments.length ? (range = Array.from(_), scale) : range.slice();
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function () {
      return ordinal(domain, range).unknown(unknown);
    };

    initRange.apply(scale, arguments);
    return scale;
  }

  function band() {
    var scale = ordinal().unknown(undefined),
        domain = scale.domain,
        ordinalRange = scale.range,
        r0 = 0,
        r1 = 1,
        step,
        bandwidth,
        round = false,
        paddingInner = 0,
        paddingOuter = 0,
        align = 0.5;
    delete scale.unknown;

    function rescale() {
      var n = domain().length,
          reverse = r1 < r0,
          start = reverse ? r1 : r0,
          stop = reverse ? r0 : r1;
      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
      if (round) step = Math.floor(step);
      start += (stop - start - step * (n - paddingInner)) * align;
      bandwidth = step * (1 - paddingInner);
      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
      var values = sequence(n).map(function (i) {
        return start + step * i;
      });
      return ordinalRange(reverse ? values.reverse() : values);
    }

    scale.domain = function (_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.range = function (_) {
      var _ref;

      return arguments.length ? ((_ref = _, r0 = _ref[0], r1 = _ref[1], _ref), r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
    };

    scale.rangeRound = function (_) {
      var _ref2;

      return (_ref2 = _, r0 = _ref2[0], r1 = _ref2[1], _ref2), r0 = +r0, r1 = +r1, round = true, rescale();
    };

    scale.bandwidth = function () {
      return bandwidth;
    };

    scale.step = function () {
      return step;
    };

    scale.round = function (_) {
      return arguments.length ? (round = !!_, rescale()) : round;
    };

    scale.padding = function (_) {
      return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
    };

    scale.paddingInner = function (_) {
      return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
    };

    scale.paddingOuter = function (_) {
      return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
    };

    scale.align = function (_) {
      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };

    scale.copy = function () {
      return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
    };

    return initRange.apply(rescale(), arguments);
  }

  function define (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);

    for (var key in definition) {
      prototype[key] = definition[key];
    }

    return prototype;
  }

  function Color() {}
  var _darker = 0.7;

  var _brighter = 1 / _darker;
  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = /*#__PURE__*/new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = /*#__PURE__*/new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = /*#__PURE__*/new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = /*#__PURE__*/new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = /*#__PURE__*/new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = /*#__PURE__*/new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
  define(Color, color, {
    copy: function copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
    : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    : l === 8 ? new Rgb(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
    : l === 4 ? new Rgb(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
    : null // invalid hex
    ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
    : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Rgb, rgb, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function rgb() {
      return this;
    },
    displayable: function displayable() {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;

    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }

    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function formatHsl() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  function constant (x) {
    return function () {
      return x;
    };
  }

  function linear(a, d) {
    return function (t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
      return Math.pow(a + t * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function (a, b) {
      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }

  var rgb$1 = /*#__PURE__*/(function rgbGamma(y) {
    var color = /*#__PURE__*/gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;
    return rgb$1;
  })(1);

  function numberArray (a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function (t) {
      for (i = 0; i < n; ++i) {
        c[i] = a[i] * (1 - t) + b[i] * t;
      }

      return c;
    };
  }
  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) {
      x[i] = interpolate(a[i], b[i]);
    }

    for (; i < nb; ++i) {
      c[i] = b[i];
    }

    return function (t) {
      for (i = 0; i < na; ++i) {
        c[i] = x[i](t);
      }

      return c;
    };
  }

  function date (a, b) {
    var d = new Date();
    return a = +a, b = +b, function (t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber (a, b) {
    return a = +a, b = +b, function (t) {
      return a * (1 - t) + b * t;
    };
  }

  function object (a, b) {
    var i = {},
        c = {},
        k;
    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function (t) {
      for (k in i) {
        c[k] = i[k](t);
      }

      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = /*#__PURE__*/new RegExp(reA.source, "g");

  function zero(b) {
    return function () {
      return b;
    };
  }

  function one(b) {
    return function (t) {
      return b(t) + "";
    };
  }

  function string (a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0,
        // scan index for next number in b
    am,
        // current match in a
    bm,
        // current match in b
    bs,
        // string preceding current number in b, if any
    i = -1,
        // index in s
    s = [],
        // string constants and placeholders
    q = []; // number interpolators
    // Coerce inputs to strings.

    a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      if ((am = am[0]) === (bm = bm[0])) {
        // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else {
        // interpolate non-matching numbers
        s[++i] = null;
        q.push({
          i: i,
          x: interpolateNumber(am, bm)
        });
      }

      bi = reB.lastIndex;
    } // Add remains of b.


    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    } // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.


    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
      for (var i = 0, o; i < b; ++i) {
        s[(o = q[i]).i] = o.x(t);
      }

      return s.join("");
    });
  }

  function interpolate (a, b) {
    var t = typeof b,
        c;
    return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, rgb$1) : string : b instanceof color ? rgb$1 : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
  }

  function interpolateRound (a, b) {
    return a = +a, b = +b, function (t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  function constant$1 (x) {
    return function () {
      return x;
    };
  }

  function number (x) {
    return +x;
  }

  var unit = [0, 1];
  function identity(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= a = +a) ? function (x) {
      return (x - a) / b;
    } : constant$1(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function (x) {
      return Math.max(a, Math.min(b, x));
    };
  } // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


  function bimap(domain, range, interpolate) {
    var d0 = domain[0],
        d1 = domain[1],
        r0 = range[0],
        r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function (x) {
      return r0(d0(x));
    };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1; // Reverse descending domains.

    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function (x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }
  function transformer() {
    var domain = unit,
        range = unit,
        interpolate$1 = interpolate,
        transform,
        untransform,
        unknown,
        clamp = identity,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
    }

    scale.invert = function (y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function (_) {
      return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
    };

    scale.range = function (_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function (_) {
      return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
    };

    scale.clamp = function (_) {
      return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
    };

    scale.interpolate = function (_) {
      return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function (t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }
  function continuous() {
    return transformer()(identity, identity);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal (x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

    var i,
        coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
  }

  function exponent (x) {
    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup (grouping, thousands) {
    return function (value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals (numerals) {
    return function (value) {
      return value.replace(/[0-9]/g, function (i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim (s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;

        case "0":
          if (i0 === 0) i0 = i;
          i1 = i;
          break;

        default:
          if (!+s[i]) break out;
          if (i0 > 0) i0 = 0;
          break;
      }
    }

    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;
  function formatPrefixAuto (x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded (x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": function _(x, p) {
      return (x * 100).toFixed(p);
    },
    "b": function b(x) {
      return Math.round(x).toString(2);
    },
    "c": function c(x) {
      return x + "";
    },
    "d": function d(x) {
      return Math.round(x).toString(10);
    },
    "e": function e(x, p) {
      return x.toExponential(p);
    },
    "f": function f(x, p) {
      return x.toFixed(p);
    },
    "g": function g(x, p) {
      return x.toPrecision(p);
    },
    "o": function o(x) {
      return Math.round(x).toString(8);
    },
    "p": function p(x, _p) {
      return formatRounded(x * 100, _p);
    },
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": function X(x) {
      return Math.round(x).toString(16).toUpperCase();
    },
    "x": function x(_x) {
      return Math.round(_x).toString(16);
    }
  };

  function identity$1 (x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function formatLocale (locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "-" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type; // The "n" type is an alias for ",g".

      if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

      if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.

      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : ""; // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?

      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].

      precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i,
            n,
            c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value; // Perform the initial formatting.

          var valueNegative = value < 0;
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision); // Trim insignificant zeros.

          if (trim) value = formatTrim(value); // If a negative value rounds to zero during formatting, treat as positive.

          if (valueNegative && +value === 0) valueNegative = false; // Compute the prefix and suffix.

          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.

          if (maybeSuffix) {
            i = -1, n = value.length;

            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        } // If the fill character is not "0", grouping is applied before padding.


        if (comma && !zero) value = group(value, Infinity); // Compute the padding.

        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;

          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;

          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;

          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }

        return numerals(value);
      }

      format.toString = function () {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function (value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale;
  var format;
  var formatPrefix;
  defaultLocale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    minus: "-"
  });
  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  function precisionFixed (step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix (step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound (step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function tickFormat (start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);

    switch (specifier.type) {
      case "s":
        {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }

      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }

      case "f":
      case "%":
        {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
    }

    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function (count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function (count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function (count) {
      if (count == null) count = 10;
      var d = domain(),
          i0 = 0,
          i1 = d.length - 1,
          start = d[i0],
          stop = d[i1],
          step;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }

      step = tickIncrement(start, stop, count);

      if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
        step = tickIncrement(start, stop, count);
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
        step = tickIncrement(start, stop, count);
      }

      if (step > 0) {
        d[i0] = Math.floor(start / step) * step;
        d[i1] = Math.ceil(stop / step) * step;
        domain(d);
      } else if (step < 0) {
        d[i0] = Math.ceil(start * step) / step;
        d[i1] = Math.floor(stop * step) / step;
        domain(d);
      }

      return scale;
    };

    return scale;
  }
  function linear$1() {
    var scale = continuous();

    scale.copy = function () {
      return copy(scale, linear$1());
    };

    initRange.apply(scale, arguments);
    return linearish(scale);
  }

  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$1.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function isBandScale(scale) {
    return typeof scale.bandwidth === 'function';
  }

  function center(scale) {
    var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.

    if (scale.round()) {
      offset = Math.round(offset);
    }

    return function (d) {
      return scale(d) + offset;
    };
  }

  var D3HorizontalTick = /*#__PURE__*/React.memo(function D3HorizontalTick(_ref) {
    var pos = _ref.pos,
        spacing = _ref.spacing,
        tickSizeInner = _ref.tickSizeInner,
        orient = _ref.orient,
        name = _ref.name;
    var k = orient === 'top' || orient === 'left' ? -1 : 1;
    return React.createElement("g", {
      transform: "translate(0, " + (pos + 0.5) + ")"
    }, React.createElement("text", {
      x: k * spacing,
      dy: '0.32em',
      style: {
        textAnchor: orient === 'right' ? 'start' : 'end',
        fill: 'currentColor'
      }
    }, name), React.createElement("line", {
      x2: k * tickSizeInner,
      style: {
        stroke: 'currentColor'
      }
    }));
  });
  var D3VerticalTick = /*#__PURE__*/React.memo(function D3VerticalTick(_ref2) {
    var pos = _ref2.pos,
        name = _ref2.name,
        spacing = _ref2.spacing,
        orient = _ref2.orient,
        tickSizeInner = _ref2.tickSizeInner;
    var k = orient === 'top' || orient === 'left' ? -1 : 1;
    return React.createElement("g", {
      transform: "translate(" + (pos + 0.5) + ", 0)"
    }, React.createElement("text", {
      y: k * spacing,
      dy: orient === 'top' ? '0em' : '0.71em',
      style: {
        textAnchor: 'middle',
        fill: 'currentColor'
      }
    }, name), React.createElement("line", {
      y2: k * tickSizeInner,
      style: {
        stroke: 'currentColor'
      }
    }));
  });

  function D3Axis(_ref3) {
    var _extras$style;

    var scale = _ref3.d3Scale,
        orient = _ref3.orient,
        _ref3$tickSizeInner = _ref3.tickSizeInner,
        tickSizeInner = _ref3$tickSizeInner === void 0 ? 6 : _ref3$tickSizeInner,
        _ref3$tickSizeOuter = _ref3.tickSizeOuter,
        tickSizeOuter = _ref3$tickSizeOuter === void 0 ? 6 : _ref3$tickSizeOuter,
        _ref3$tickPadding = _ref3.tickPadding,
        tickPadding = _ref3$tickPadding === void 0 ? 3 : _ref3$tickPadding,
        extras = _objectWithoutPropertiesLoose(_ref3, ["d3Scale", "orient", "tickSizeInner", "tickSizeOuter", "tickPadding"]);

    var values = isBandScale(scale) ? scale.domain() : scale.ticks();
    var format = isBandScale(scale) ? String : scale.tickFormat();
    var spacing = Math.max(tickSizeInner, 0) + tickPadding;
    var range = scale.range();
    var range0 = +range[0] + 0.5;
    var range1 = +range[range.length - 1] + 0.5;
    var position = isBandScale(scale) ? center(scale) : scale;
    var k = orient === 'top' || orient === 'left' ? -1 : 1;
    var D3Tick = orient === 'left' || orient === 'right' ? D3HorizontalTick : D3VerticalTick;
    return React.createElement("g", Object.assign({}, extras, {
      style: _extends$1({
        fill: 'none',
        fontSize: 10,
        fontFamily: 'sans-serif'
      }, (_extras$style = extras.style) !== null && _extras$style !== void 0 ? _extras$style : {})
    }), values.map(function (d) {
      return React.createElement(D3Tick, {
        key: d,
        pos: position(d),
        name: format(d),
        spacing: spacing,
        tickSizeInner: tickSizeInner,
        orient: orient
      });
    }), React.createElement("path", {
      style: {
        stroke: 'currentColor'
      },
      d: orient === 'left' || orient === 'right' ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1
    }));
  }

  function defineStyle(size) {
    return {
      combinations: {
        w: (size.width - 2 * size.margin) * size.widthRatios[2],
        h: (size.height - 2 * size.margin - 20) * size.heightRatios[0]
      },
      labels: {
        w: (size.width - 2 * size.margin) * size.widthRatios[1]
      },
      sets: {
        w: (size.width - 2 * size.margin) * size.widthRatios[0],
        h: (size.height - 2 * size.margin - 20) * size.heightRatios[1]
      },
      padding: size.barPadding
    };
  }

  function generateScales(sets, combinations, styles) {
    return {
      sets: {
        x: linear$1().domain([0, sets.reduce(function (acc, d) {
          return Math.max(acc, d.cardinality);
        }, 0)]).range([styles.sets.w, 0]),
        y: band().domain(sets.map(function (d) {
          return d.name;
        })).range([0, styles.sets.h]).padding(styles.padding)
      },
      combinations: {
        x: band().domain(combinations.map(function (d) {
          return d.name;
        })).range([0, styles.combinations.w]).padding(styles.padding),
        y: linear$1().domain([0, combinations.reduce(function (acc, d) {
          return Math.max(acc, d.cardinality);
        }, 0)]).range([styles.combinations.h, 0])
      }
    };
  }

  var CombinationChart = /*#__PURE__*/React.memo(function CombinationChart(_ref) {
    var combinations = _ref.combinations,
        scales = _ref.scales,
        onClick = _ref.onClick,
        onMouseEnter = _ref.onMouseEnter,
        onMouseLeave = _ref.onMouseLeave,
        labelStyle = _ref.labelStyle,
        color = _ref.color;
    var width = scales.combinations.x.bandwidth();
    var height = scales.combinations.y.range()[0];

    var lStyle = _extends$1({
      textAnchor: 'middle',
      fontSize: 10
    }, labelStyle !== null && labelStyle !== void 0 ? labelStyle : {});

    return React.createElement("g", null, combinations.map(function (d) {
      var y = scales.combinations.y(d.cardinality);
      return React.createElement("g", {
        key: d.name,
        transform: "translate(" + scales.combinations.x(d.name) + ", 0)",
        onMouseEnter: onMouseEnter(d),
        onMouseLeave: onMouseLeave(d),
        onClick: onClick(d)
      }, React.createElement("title", null, d.name, ": ", d.cardinality), React.createElement("rect", {
        y: y,
        height: height - y,
        width: width,
        style: {
          fill: color
        }
      }), React.createElement("text", {
        y: y,
        dy: -1,
        x: width / 2,
        style: lStyle
      }, d.cardinality));
    }));
  });

  function CombinationSelectionChart(_ref) {
    var combinations = _ref.combinations,
        scales = _ref.scales,
        elemOverlap = _ref.elemOverlap,
        color = _ref.color,
        triangleSize = _ref.triangleSize,
        secondary = _ref.secondary,
        tooltip = _ref.tooltip;
    var width = scales.combinations.x.bandwidth();
    var height = scales.combinations.y.range()[0];
    var style = {
      fill: color,
      pointerEvents: tooltip ? undefined : 'none'
    };
    return React.createElement("g", null, combinations.map(function (d) {
      var o = elemOverlap(d);

      if (o === 0) {
        return null;
      }

      var y = scales.combinations.y(o);
      var x = scales.combinations.x(d.name);
      var title = tooltip && React.createElement("title", null, d.name + " \u2229 " + tooltip + ": " + o);

      if (secondary) {
        return React.createElement("polygon", {
          key: d.name,
          transform: "translate(" + x + ", " + y + ")",
          points: "0,0 -" + triangleSize + ",-" + triangleSize + " -" + triangleSize + "," + triangleSize,
          style: style
        }, title);
      }

      return React.createElement("rect", {
        key: d.name,
        x: x,
        y: y,
        height: height - y,
        width: width,
        style: style
      }, title);
    }));
  }

  var UpSetLabel = /*#__PURE__*/React.memo(function UpSetLabel(_ref) {
    var d = _ref.d,
        i = _ref.i,
        scales = _ref.scales,
        styles = _ref.styles,
        onClick = _ref.onClick,
        onMouseEnter = _ref.onMouseEnter,
        onMouseLeave = _ref.onMouseLeave,
        alternatingBackgroundColor = _ref.alternatingBackgroundColor,
        setLabelStyle = _ref.setLabelStyle;
    return React.createElement("g", {
      transform: "translate(0, " + scales.sets.y(d.name) + ")",
      onMouseEnter: onMouseEnter(d),
      onMouseLeave: onMouseLeave(d),
      onClick: onClick(d)
    }, React.createElement("rect", {
      width: styles.labels.w + styles.combinations.w,
      height: scales.sets.y.bandwidth(),
      style: {
        fill: i % 2 === 1 ? alternatingBackgroundColor : 'transparent'
      }
    }), React.createElement("text", {
      x: styles.labels.w / 2,
      y: scales.sets.y.bandwidth() / 2,
      style: _extends$1({
        textAnchor: 'middle',
        dominantBaseline: 'central'
      }, setLabelStyle !== null && setLabelStyle !== void 0 ? setLabelStyle : {})
    }, d.name));
  });
  var Labels = /*#__PURE__*/React.memo(function Labels(_ref2) {
    var sets = _ref2.sets,
        scales = _ref2.scales,
        styles = _ref2.styles,
        onClick = _ref2.onClick,
        onMouseEnter = _ref2.onMouseEnter,
        onMouseLeave = _ref2.onMouseLeave,
        alternatingBackgroundColor = _ref2.alternatingBackgroundColor,
        setLabelStyle = _ref2.setLabelStyle;
    return React.createElement("g", null, sets.map(function (d, i) {
      return React.createElement(UpSetLabel, {
        key: d.name,
        d: d,
        i: i,
        scales: scales,
        styles: styles,
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        alternatingBackgroundColor: alternatingBackgroundColor,
        setLabelStyle: setLabelStyle
      });
    }));
  });

  function LabelsSelection(_ref) {
    var scales = _ref.scales,
        styles = _ref.styles,
        selection = _ref.selection,
        selectionColor = _ref.selectionColor;

    if (!selection || selection.type !== 'set') {
      return null;
    }

    var d = selection;
    return React.createElement("rect", {
      y: scales.sets.y(d.name),
      width: styles.labels.w + styles.combinations.w,
      height: scales.sets.y.bandwidth(),
      style: {
        stroke: selectionColor,
        fill: 'none',
        pointerEvents: 'none'
      }
    });
  }

  var SetChart = /*#__PURE__*/React.memo(function SetChart(_ref) {
    var sets = _ref.sets,
        scales = _ref.scales,
        onMouseEnter = _ref.onMouseEnter,
        onMouseLeave = _ref.onMouseLeave,
        onClick = _ref.onClick,
        color = _ref.color,
        labelStyle = _ref.labelStyle;
    var width = scales.sets.x.range()[0];
    var height = scales.sets.y.bandwidth();

    var lStyle = _extends$1({
      textAnchor: 'end',
      dominantBaseline: 'central',
      fontSize: 10
    }, labelStyle !== null && labelStyle !== void 0 ? labelStyle : {});

    return React.createElement("g", null, sets.map(function (d) {
      var x = scales.sets.x(d.cardinality);
      return React.createElement("g", {
        key: d.name,
        transform: "translate(0, " + scales.sets.y(d.name) + ")",
        onMouseEnter: onMouseEnter(d),
        onMouseLeave: onMouseLeave(d),
        onClick: onClick(d)
      }, React.createElement("title", null, d.name, ": ", d.cardinality), React.createElement("rect", {
        x: x,
        width: width - x,
        height: height,
        style: {
          fill: color
        }
      }), React.createElement("text", {
        x: x,
        dx: -1,
        y: height / 2,
        style: lStyle
      }, d.cardinality));
    }));
  });

  function SetSelectionChart(_ref) {
    var sets = _ref.sets,
        scales = _ref.scales,
        elemOverlap = _ref.elemOverlap,
        color = _ref.color,
        triangleSize = _ref.triangleSize,
        secondary = _ref.secondary,
        tooltip = _ref.tooltip;
    var width = scales.sets.x.range()[0];
    var height = scales.sets.y.bandwidth();
    var style = {
      fill: color,
      pointerEvents: tooltip ? undefined : 'none'
    };
    return React.createElement("g", null, sets.map(function (d) {
      var o = elemOverlap(d);

      if (o === 0) {
        return null;
      }

      var x = scales.sets.x(o);
      var y = scales.sets.y(d.name);
      var title = tooltip && React.createElement("title", null, d.name + " \u2229 " + tooltip + ": " + o);

      if (secondary) {
        return React.createElement("polygon", {
          key: d.name,
          transform: "translate(" + x + ", " + (y + height) + ")",
          points: "0,0 -" + triangleSize + "," + triangleSize + " " + triangleSize + "," + triangleSize,
          style: style
        }, title);
      }

      return React.createElement("rect", {
        key: d.name,
        x: x,
        y: y,
        width: width - x,
        height: height,
        style: style
      }, title);
    }));
  }

  var UpSetDot = /*#__PURE__*/React.memo(function UpSetDot(_ref) {
    var cx = _ref.cx,
        r = _ref.r,
        cy = _ref.cy,
        name = _ref.name,
        color = _ref.color,
        _ref$interactive = _ref.interactive,
        interactive = _ref$interactive === void 0 ? true : _ref$interactive;
    return React.createElement("circle", {
      r: r,
      cx: cx,
      cy: cy,
      style: {
        fill: color,
        pointerEvents: interactive ? undefined : 'none'
      }
    }, React.createElement("title", null, name));
  });
  var UpSetLine = /*#__PURE__*/React.memo(function UpSetLine(_ref2) {
    var d = _ref2.d,
        sets = _ref2.sets,
        rsets = _ref2.rsets,
        cx = _ref2.cx,
        r = _ref2.r,
        cy = _ref2.cy,
        scales = _ref2.scales,
        height = _ref2.height,
        color = _ref2.color,
        notMemberColor = _ref2.notMemberColor,
        onClick = _ref2.onClick,
        onMouseEnter = _ref2.onMouseEnter,
        onMouseLeave = _ref2.onMouseLeave;
    var width = cx * 2;
    var lineStyle = {
      stroke: color,
      strokeWidth: r * 0.6,
      pointerEvents: 'none'
    };
    return React.createElement("g", {
      transform: "translate(" + scales.combinations.x(d.name) + ", 0)",
      onMouseEnter: onMouseEnter(d),
      onMouseLeave: onMouseLeave(d),
      onClick: onClick(d)
    }, React.createElement("title", null, d.name), React.createElement("rect", {
      width: width,
      height: height,
      style: {
        fill: 'transparent'
      }
    }), React.createElement("g", null, sets.map(function (s) {
      return React.createElement(UpSetDot, {
        key: s.name,
        r: r,
        cx: cx,
        cy: scales.sets.y(s.name) + cy,
        name: d.sets.has(s) ? s.name : d.name,
        color: d.sets.has(s) ? color : notMemberColor
      });
    })), d.sets.size > 1 && React.createElement("line", {
      x1: cx,
      y1: scales.sets.y(sets.find(function (p) {
        return d.sets.has(p);
      }).name) + cy,
      x2: cx,
      y2: scales.sets.y(rsets.find(function (p) {
        return d.sets.has(p);
      }).name) + cy,
      style: lineStyle
    }));
  });
  var UpSetChart = /*#__PURE__*/React.memo(function UpSetChart(_ref3) {
    var sets = _ref3.sets,
        combinations = _ref3.combinations,
        scales = _ref3.scales,
        styles = _ref3.styles,
        onClick = _ref3.onClick,
        onMouseEnter = _ref3.onMouseEnter,
        onMouseLeave = _ref3.onMouseLeave,
        color = _ref3.color,
        notMemberColor = _ref3.notMemberColor;
    var cy = scales.sets.y.bandwidth() / 2;
    var width = scales.combinations.x.bandwidth();
    var cx = width / 2;
    var r = Math.min(cx, cy) * (1 - styles.padding);
    var height = scales.sets.y.range()[1];
    var rsets = sets.slice().reverse();
    return React.createElement("g", {
      transform: "translate(" + styles.labels.w + ", 0)"
    }, combinations.map(function (d) {
      return React.createElement(UpSetLine, {
        key: d.name,
        d: d,
        sets: sets,
        rsets: rsets,
        cx: cx,
        cy: cy,
        height: height,
        scales: scales,
        r: r,
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        color: color,
        notMemberColor: notMemberColor
      });
    }));
  });

  function UpSetSelectionChart(_ref) {
    var sets = _ref.sets,
        scales = _ref.scales,
        styles = _ref.styles,
        selection = _ref.selection,
        selectionColor = _ref.selectionColor,
        notMemberColor = _ref.notMemberColor;
    var cy = scales.sets.y.bandwidth() / 2;
    var cx = scales.combinations.x.bandwidth() / 2;
    var r = Math.min(cx, cy) * (1 - styles.padding);
    var height = scales.sets.y.range()[1];
    var rsets = sets.slice().reverse();
    var width = scales.combinations.x.bandwidth();

    if (!selection || selection.type === 'set') {
      return null;
    }

    var d = selection;
    return React.createElement("g", {
      transform: "translate(" + (styles.labels.w + scales.combinations.x(d.name)) + ", 0)"
    }, React.createElement("rect", {
      width: width,
      height: height,
      style: {
        stroke: 'orange',
        pointerEvents: 'none',
        fill: 'none'
      }
    }), sets.map(function (s) {
      var has = d.sets.has(s);
      return React.createElement(UpSetDot, {
        key: s.name,
        r: r,
        cx: cx,
        cy: scales.sets.y(s.name) + cy,
        name: has ? s.name : d.name,
        color: has ? selectionColor : notMemberColor,
        interactive: false
      });
    }), d.sets.size > 1 && React.createElement("line", {
      x1: cx,
      y1: scales.sets.y(sets.find(function (p) {
        return d.sets.has(p);
      }).name) + cy,
      x2: cx,
      y2: scales.sets.y(rsets.find(function (p) {
        return d.sets.has(p);
      }).name) + cy,
      style: {
        stroke: selectionColor,
        strokeWidth: r * 0.6,
        pointerEvents: 'none'
      }
    }));
  }

  function noop() {
    return undefined;
  }

  function wrap(f) {
    if (!f) {
      return noop;
    }

    return function (set) {
      return function () {
        return f.call(this, set);
      };
    };
  }

  function isElemQuery(q) {
    return Array.isArray(q.elems);
  }

  function elemOverlapOf(query) {
    var f = setOverlapFactory(query);
    return function (s) {
      return f(s.elems).intersection;
    };
  }

  function UpSet(_ref) {
    var className = _ref.className,
        style = _ref.style,
        children = _ref.children,
        width = _ref.width,
        height = _ref.height,
        _ref$padding = _ref.padding,
        margin = _ref$padding === void 0 ? 20 : _ref$padding,
        _ref$barPadding = _ref.barPadding,
        barPadding = _ref$barPadding === void 0 ? 0.3 : _ref$barPadding,
        sets = _ref.sets,
        _ref$combinations = _ref.combinations,
        combinations = _ref$combinations === void 0 ? generateIntersections(sets) : _ref$combinations,
        _ref$selection = _ref.selection,
        selection = _ref$selection === void 0 ? null : _ref$selection,
        onClick = _ref.onClick,
        onHover = _ref.onHover,
        _ref$combinationName = _ref.combinationName,
        combinationName = _ref$combinationName === void 0 ? 'Intersection Size' : _ref$combinationName,
        _ref$setName = _ref.setName,
        setName = _ref$setName === void 0 ? 'Set Size' : _ref$setName,
        _ref$selectionColor = _ref.selectionColor,
        selectionColor = _ref$selectionColor === void 0 ? 'orange' : _ref$selectionColor,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'black' : _ref$color,
        _ref$notMemberColor = _ref.notMemberColor,
        notMemberColor = _ref$notMemberColor === void 0 ? 'lightgray' : _ref$notMemberColor,
        _ref$alternatingBackg = _ref.alternatingBackgroundColor,
        alternatingBackgroundColor = _ref$alternatingBackg === void 0 ? '#f5f5f5' : _ref$alternatingBackg,
        _ref$triangleSize = _ref.triangleSize,
        triangleSize = _ref$triangleSize === void 0 ? 5 : _ref$triangleSize,
        labelStyle = _ref.labelStyle,
        setLabelStyle = _ref.setLabelStyle,
        _ref$combinationNameS = _ref.combinationNameStyle,
        combinationNameStyle = _ref$combinationNameS === void 0 ? {} : _ref$combinationNameS,
        _ref$setNameStyle = _ref.setNameStyle,
        setNameStyle = _ref$setNameStyle === void 0 ? {} : _ref$setNameStyle,
        axisStyle = _ref.axisStyle,
        _ref$widthRatios = _ref.widthRatios,
        widthRatios = _ref$widthRatios === void 0 ? [0.25, 0.1, 0.6] : _ref$widthRatios,
        _ref$heightRatios = _ref.heightRatios,
        heightRatios = _ref$heightRatios === void 0 ? [0.6, 0.4] : _ref$heightRatios,
        _ref$queries = _ref.queries,
        queries = _ref$queries === void 0 ? [] : _ref$queries;
    var styles = React.useMemo(function () {
      return defineStyle({
        width: width,
        height: height,
        margin: margin,
        barPadding: barPadding,
        widthRatios: widthRatios,
        heightRatios: heightRatios
      });
    }, [width, height, margin, barPadding, widthRatios, heightRatios]);
    var scales = React.useMemo(function () {
      return generateScales(sets, combinations, styles);
    }, [sets, combinations, styles]);
    var qs = React.useMemo(function () {
      return queries.map(function (q) {
        return _extends$1({}, q, {
          overlap: isElemQuery(q) ? elemOverlapOf(q.elems) : q.overlap
        });
      });
    }, [queries]); // const [selection, setSelection] = useState(null as ISet<T> | null);

    var onClickImpl = wrap(onClick);
    var onMouseEnterImpl = wrap(onHover);
    var onMouseLeaveImpl = wrap(onHover ? function () {
      return onHover(null);
    } : undefined);
    var elemOverlap = selection ? elemOverlapOf(selection.elems) : function () {
      return 0;
    };
    return React.createElement("svg", {
      className: className,
      style: style,
      width: width,
      height: height
    }, React.createElement("g", {
      transform: "translate(" + margin + "," + margin + ")"
    }, React.createElement("g", {
      transform: "translate(" + (styles.sets.w + styles.labels.w) + ",0)"
    }, React.createElement(D3Axis, {
      d3Scale: scales.combinations.y,
      orient: "left",
      style: axisStyle
    }), React.createElement("line", {
      x1: 0,
      x2: styles.combinations.w,
      y1: styles.combinations.h + 1,
      y2: styles.combinations.h + 1,
      style: {
        stroke: 'black'
      }
    }), React.createElement("text", {
      style: _extends$1({
        textAnchor: 'middle'
      }, combinationNameStyle),
      transform: "translate(" + -30 + ", " + styles.combinations.h / 2 + ")rotate(-90)"
    }, combinationName), React.createElement(CombinationChart, {
      scales: scales,
      combinations: combinations,
      onClick: onClickImpl,
      onMouseEnter: onMouseEnterImpl,
      onMouseLeave: onMouseLeaveImpl,
      labelStyle: labelStyle,
      color: color
    }), React.createElement("g", null, selection && React.createElement(CombinationSelectionChart, {
      scales: scales,
      combinations: combinations,
      elemOverlap: elemOverlap,
      color: selectionColor,
      triangleSize: triangleSize,
      tooltip: onHover ? undefined : selection.name
    }), qs.map(function (q, i) {
      return React.createElement(CombinationSelectionChart, {
        key: q.name,
        scales: scales,
        combinations: combinations,
        elemOverlap: q.overlap,
        color: q.color,
        secondary: selection != null || i > 0,
        triangleSize: triangleSize,
        tooltip: onHover && !(selection != null || i > 0) ? undefined : q.name
      });
    }))), React.createElement("g", {
      transform: "translate(0," + styles.combinations.h + ")"
    }, React.createElement(D3Axis, {
      d3Scale: scales.sets.x,
      orient: "bottom",
      transform: "translate(0, " + styles.sets.h + ")",
      style: axisStyle
    }), React.createElement("text", {
      style: _extends$1({
        textAnchor: 'middle'
      }, setNameStyle),
      transform: "translate(" + styles.sets.w / 2 + ", " + (styles.sets.h + 30) + ")"
    }, setName), React.createElement(SetChart, {
      scales: scales,
      sets: sets,
      onClick: onClickImpl,
      onMouseEnter: onMouseEnterImpl,
      onMouseLeave: onMouseLeaveImpl,
      labelStyle: labelStyle,
      color: color
    }), React.createElement("g", null, selection && React.createElement(SetSelectionChart, {
      scales: scales,
      sets: sets,
      elemOverlap: elemOverlap,
      color: selectionColor,
      triangleSize: triangleSize,
      tooltip: onHover ? undefined : selection.name
    }), qs.map(function (q, i) {
      return React.createElement(SetSelectionChart, {
        key: q.name,
        scales: scales,
        sets: sets,
        elemOverlap: q.overlap,
        color: q.color,
        secondary: selection != null || i > 0,
        triangleSize: triangleSize,
        tooltip: onHover && !(selection != null || i > 0) ? undefined : q.name
      });
    }))), React.createElement("g", {
      transform: "translate(" + styles.sets.w + "," + styles.combinations.h + ")"
    }, React.createElement(Labels, {
      scales: scales,
      sets: sets,
      styles: styles,
      onClick: onClickImpl,
      onMouseEnter: onMouseEnterImpl,
      onMouseLeave: onMouseLeaveImpl,
      alternatingBackgroundColor: alternatingBackgroundColor,
      setLabelStyle: setLabelStyle
    }), React.createElement(UpSetChart, {
      scales: scales,
      sets: sets,
      styles: styles,
      combinations: combinations,
      onClick: onClickImpl,
      onMouseEnter: onMouseEnterImpl,
      onMouseLeave: onMouseLeaveImpl,
      color: color,
      notMemberColor: notMemberColor
    }), selection && React.createElement(LabelsSelection, {
      scales: scales,
      styles: styles,
      selection: selection,
      selectionColor: selectionColor
    }), selection && React.createElement(UpSetSelectionChart, {
      scales: scales,
      sets: sets,
      styles: styles,
      selection: selection,
      selectionColor: selectionColor,
      notMemberColor: notMemberColor
    }))), children);
  }

  function renderUpSet(node, props) {
    E(v(UpSet, props), node);
  } // export class UpSet<T> extends Eventemitter implements Omit<UpSetProps<T>, 'onHover'> {
  //   constructor(sets: ISets<T>, width: number, height: number) {
  //     super();
  //     this.parent = parent;
  //   }
  //   update() {
  //     this.render();
  //   }
  //   private render() {
  //     render(
  //       h(UpSetElement as any, {
  //         ...this.props,
  //         onClick: (s: ISetLike<T>) => this.emit('click', s),
  //         onHover: (s: ISetLike<T> | null) => this.emit('hover', s),
  //       }),
  //       this.parent
  //     );
  //   }
  // }
  // export default UpSet;

  exports.asSets = asSets;
  exports.extractSets = extractSets;
  exports.generateIntersections = generateIntersections;
  exports.generateUnions = generateUnions;
  exports.powerSet = powerSet;
  exports.renderUpSet = renderUpSet;
  exports.setOverlap = setOverlap;
  exports.setOverlapFactory = setOverlapFactory;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=upsetjs.umd.development.js.map
