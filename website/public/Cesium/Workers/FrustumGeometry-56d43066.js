define([
  'exports',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './Matrix2-413c4048',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './Math-2ce22ee9',
  './Plane-6add0ae1',
  './VertexFormat-fbdec922'
], function (t, e, a, n, i, r, o, s, f, u, l) {
  'use strict'
  function c(t) {
    this.planes = r.defaultValue(t, [])
  }
  const h = [new a.Cartesian3(), new a.Cartesian3(), new a.Cartesian3()]
  a.Cartesian3.clone(a.Cartesian3.UNIT_X, h[0]), a.Cartesian3.clone(a.Cartesian3.UNIT_Y, h[1]), a.Cartesian3.clone(a.Cartesian3.UNIT_Z, h[2])
  const p = new a.Cartesian3(),
    d = new a.Cartesian3(),
    m = new u.Plane(new a.Cartesian3(1, 0, 0), 0)
  function C(t) {
    ;(t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)),
      (this.left = t.left),
      (this._left = void 0),
      (this.right = t.right),
      (this._right = void 0),
      (this.top = t.top),
      (this._top = void 0),
      (this.bottom = t.bottom),
      (this._bottom = void 0),
      (this.near = r.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = r.defaultValue(t.far, 5e8)),
      (this._far = this.far),
      (this._cullingVolume = new c()),
      (this._orthographicMatrix = new n.Matrix4())
  }
  function _(t) {
    ;(t.top === t._top && t.bottom === t._bottom && t.left === t._left && t.right === t._right && t.near === t._near && t.far === t._far) ||
      ((t._left = t.left),
      (t._right = t.right),
      (t._top = t.top),
      (t._bottom = t.bottom),
      (t._near = t.near),
      (t._far = t.far),
      (t._orthographicMatrix = n.Matrix4.computeOrthographicOffCenter(t.left, t.right, t.bottom, t.top, t.near, t.far, t._orthographicMatrix)))
  }
  ;(c.fromBoundingSphere = function (t, e) {
    r.defined(e) || (e = new c())
    const i = h.length,
      o = e.planes
    o.length = 2 * i
    const s = t.center,
      f = t.radius
    let u = 0
    for (let t = 0; t < i; ++t) {
      const e = h[t]
      let i = o[u],
        l = o[u + 1]
      r.defined(i) || (i = o[u] = new n.Cartesian4()),
        r.defined(l) || (l = o[u + 1] = new n.Cartesian4()),
        a.Cartesian3.multiplyByScalar(e, -f, p),
        a.Cartesian3.add(s, p, p),
        (i.x = e.x),
        (i.y = e.y),
        (i.z = e.z),
        (i.w = -a.Cartesian3.dot(e, p)),
        a.Cartesian3.multiplyByScalar(e, f, p),
        a.Cartesian3.add(s, p, p),
        (l.x = -e.x),
        (l.y = -e.y),
        (l.z = -e.z),
        (l.w = -a.Cartesian3.dot(a.Cartesian3.negate(e, d), p)),
        (u += 2)
    }
    return e
  }),
    (c.prototype.computeVisibility = function (t) {
      const a = this.planes
      let n = !1
      for (let i = 0, r = a.length; i < r; ++i) {
        const r = t.intersectPlane(u.Plane.fromCartesian4(a[i], m))
        if (r === e.Intersect.OUTSIDE) return e.Intersect.OUTSIDE
        r === e.Intersect.INTERSECTING && (n = !0)
      }
      return n ? e.Intersect.INTERSECTING : e.Intersect.INSIDE
    }),
    (c.prototype.computeVisibilityWithPlaneMask = function (t, a) {
      if (a === c.MASK_OUTSIDE || a === c.MASK_INSIDE) return a
      let n = c.MASK_INSIDE
      const i = this.planes
      for (let r = 0, o = i.length; r < o; ++r) {
        const o = r < 31 ? 1 << r : 0
        if (r < 31 && 0 == (a & o)) continue
        const s = t.intersectPlane(u.Plane.fromCartesian4(i[r], m))
        if (s === e.Intersect.OUTSIDE) return c.MASK_OUTSIDE
        s === e.Intersect.INTERSECTING && (n |= o)
      }
      return n
    }),
    (c.MASK_OUTSIDE = 4294967295),
    (c.MASK_INSIDE = 0),
    (c.MASK_INDETERMINATE = 2147483647),
    Object.defineProperties(C.prototype, {
      projectionMatrix: {
        get: function () {
          return _(this), this._orthographicMatrix
        }
      }
    })
  const y = new a.Cartesian3(),
    g = new a.Cartesian3(),
    w = new a.Cartesian3(),
    x = new a.Cartesian3()
  function v(t) {
    ;(t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)),
      (this._offCenterFrustum = new C()),
      (this.width = t.width),
      (this._width = void 0),
      (this.aspectRatio = t.aspectRatio),
      (this._aspectRatio = void 0),
      (this.near = r.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = r.defaultValue(t.far, 5e8)),
      (this._far = this.far)
  }
  function M(t) {
    const e = t._offCenterFrustum
    if (t.width !== t._width || t.aspectRatio !== t._aspectRatio || t.near !== t._near || t.far !== t._far) {
      ;(t._aspectRatio = t.aspectRatio), (t._width = t.width), (t._near = t.near), (t._far = t.far)
      const a = 1 / t.aspectRatio
      ;(e.right = 0.5 * t.width), (e.left = -e.right), (e.top = a * e.right), (e.bottom = -e.top), (e.near = t.near), (e.far = t.far)
    }
  }
  function b(t) {
    ;(t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)),
      (this.left = t.left),
      (this._left = void 0),
      (this.right = t.right),
      (this._right = void 0),
      (this.top = t.top),
      (this._top = void 0),
      (this.bottom = t.bottom),
      (this._bottom = void 0),
      (this.near = r.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = r.defaultValue(t.far, 5e8)),
      (this._far = this.far),
      (this._cullingVolume = new c()),
      (this._perspectiveMatrix = new n.Matrix4()),
      (this._infinitePerspective = new n.Matrix4())
  }
  function V(t) {
    const e = t.top,
      a = t.bottom,
      i = t.right,
      r = t.left,
      o = t.near,
      s = t.far
    ;(e === t._top && a === t._bottom && r === t._left && i === t._right && o === t._near && s === t._far) ||
      ((t._left = r),
      (t._right = i),
      (t._top = e),
      (t._bottom = a),
      (t._near = o),
      (t._far = s),
      (t._perspectiveMatrix = n.Matrix4.computePerspectiveOffCenter(r, i, a, e, o, s, t._perspectiveMatrix)),
      (t._infinitePerspective = n.Matrix4.computeInfinitePerspectiveOffCenter(r, i, a, e, o, t._infinitePerspective)))
  }
  ;(C.prototype.computeCullingVolume = function (t, e, i) {
    const o = this._cullingVolume.planes,
      s = this.top,
      f = this.bottom,
      u = this.right,
      l = this.left,
      c = this.near,
      h = this.far,
      p = a.Cartesian3.cross(e, i, y)
    a.Cartesian3.normalize(p, p)
    const d = g
    a.Cartesian3.multiplyByScalar(e, c, d), a.Cartesian3.add(t, d, d)
    const m = w
    a.Cartesian3.multiplyByScalar(p, l, m), a.Cartesian3.add(d, m, m)
    let C = o[0]
    return (
      r.defined(C) || (C = o[0] = new n.Cartesian4()),
      (C.x = p.x),
      (C.y = p.y),
      (C.z = p.z),
      (C.w = -a.Cartesian3.dot(p, m)),
      a.Cartesian3.multiplyByScalar(p, u, m),
      a.Cartesian3.add(d, m, m),
      (C = o[1]),
      r.defined(C) || (C = o[1] = new n.Cartesian4()),
      (C.x = -p.x),
      (C.y = -p.y),
      (C.z = -p.z),
      (C.w = -a.Cartesian3.dot(a.Cartesian3.negate(p, x), m)),
      a.Cartesian3.multiplyByScalar(i, f, m),
      a.Cartesian3.add(d, m, m),
      (C = o[2]),
      r.defined(C) || (C = o[2] = new n.Cartesian4()),
      (C.x = i.x),
      (C.y = i.y),
      (C.z = i.z),
      (C.w = -a.Cartesian3.dot(i, m)),
      a.Cartesian3.multiplyByScalar(i, s, m),
      a.Cartesian3.add(d, m, m),
      (C = o[3]),
      r.defined(C) || (C = o[3] = new n.Cartesian4()),
      (C.x = -i.x),
      (C.y = -i.y),
      (C.z = -i.z),
      (C.w = -a.Cartesian3.dot(a.Cartesian3.negate(i, x), m)),
      (C = o[4]),
      r.defined(C) || (C = o[4] = new n.Cartesian4()),
      (C.x = e.x),
      (C.y = e.y),
      (C.z = e.z),
      (C.w = -a.Cartesian3.dot(e, d)),
      a.Cartesian3.multiplyByScalar(e, h, m),
      a.Cartesian3.add(t, m, m),
      (C = o[5]),
      r.defined(C) || (C = o[5] = new n.Cartesian4()),
      (C.x = -e.x),
      (C.y = -e.y),
      (C.z = -e.z),
      (C.w = -a.Cartesian3.dot(a.Cartesian3.negate(e, x), m)),
      this._cullingVolume
    )
  }),
    (C.prototype.getPixelDimensions = function (t, e, a, n, i) {
      _(this)
      const r = (n * (this.right - this.left)) / t,
        o = (n * (this.top - this.bottom)) / e
      return (i.x = r), (i.y = o), i
    }),
    (C.prototype.clone = function (t) {
      return (
        r.defined(t) || (t = new C()),
        (t.left = this.left),
        (t.right = this.right),
        (t.top = this.top),
        (t.bottom = this.bottom),
        (t.near = this.near),
        (t.far = this.far),
        (t._left = void 0),
        (t._right = void 0),
        (t._top = void 0),
        (t._bottom = void 0),
        (t._near = void 0),
        (t._far = void 0),
        t
      )
    }),
    (C.prototype.equals = function (t) {
      return (
        r.defined(t) &&
        t instanceof C &&
        this.right === t.right &&
        this.left === t.left &&
        this.top === t.top &&
        this.bottom === t.bottom &&
        this.near === t.near &&
        this.far === t.far
      )
    }),
    (C.prototype.equalsEpsilon = function (t, e, a) {
      return (
        t === this ||
        (r.defined(t) &&
          t instanceof C &&
          f.CesiumMath.equalsEpsilon(this.right, t.right, e, a) &&
          f.CesiumMath.equalsEpsilon(this.left, t.left, e, a) &&
          f.CesiumMath.equalsEpsilon(this.top, t.top, e, a) &&
          f.CesiumMath.equalsEpsilon(this.bottom, t.bottom, e, a) &&
          f.CesiumMath.equalsEpsilon(this.near, t.near, e, a) &&
          f.CesiumMath.equalsEpsilon(this.far, t.far, e, a))
      )
    }),
    (v.packedLength = 4),
    (v.pack = function (t, e, a) {
      return (a = r.defaultValue(a, 0)), (e[a++] = t.width), (e[a++] = t.aspectRatio), (e[a++] = t.near), (e[a] = t.far), e
    }),
    (v.unpack = function (t, e, a) {
      return (
        (e = r.defaultValue(e, 0)), r.defined(a) || (a = new v()), (a.width = t[e++]), (a.aspectRatio = t[e++]), (a.near = t[e++]), (a.far = t[e]), a
      )
    }),
    Object.defineProperties(v.prototype, {
      projectionMatrix: {
        get: function () {
          return M(this), this._offCenterFrustum.projectionMatrix
        }
      }
    }),
    (v.prototype.computeCullingVolume = function (t, e, a) {
      return M(this), this._offCenterFrustum.computeCullingVolume(t, e, a)
    }),
    (v.prototype.getPixelDimensions = function (t, e, a, n, i) {
      return M(this), this._offCenterFrustum.getPixelDimensions(t, e, a, n, i)
    }),
    (v.prototype.clone = function (t) {
      return (
        r.defined(t) || (t = new v()),
        (t.aspectRatio = this.aspectRatio),
        (t.width = this.width),
        (t.near = this.near),
        (t.far = this.far),
        (t._aspectRatio = void 0),
        (t._width = void 0),
        (t._near = void 0),
        (t._far = void 0),
        this._offCenterFrustum.clone(t._offCenterFrustum),
        t
      )
    }),
    (v.prototype.equals = function (t) {
      return (
        !!(r.defined(t) && t instanceof v) &&
        (M(this), M(t), this.width === t.width && this.aspectRatio === t.aspectRatio && this._offCenterFrustum.equals(t._offCenterFrustum))
      )
    }),
    (v.prototype.equalsEpsilon = function (t, e, a) {
      return (
        !!(r.defined(t) && t instanceof v) &&
        (M(this),
        M(t),
        f.CesiumMath.equalsEpsilon(this.width, t.width, e, a) &&
          f.CesiumMath.equalsEpsilon(this.aspectRatio, t.aspectRatio, e, a) &&
          this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum, e, a))
      )
    }),
    Object.defineProperties(b.prototype, {
      projectionMatrix: {
        get: function () {
          return V(this), this._perspectiveMatrix
        }
      },
      infiniteProjectionMatrix: {
        get: function () {
          return V(this), this._infinitePerspective
        }
      }
    })
  const F = new a.Cartesian3(),
    E = new a.Cartesian3(),
    O = new a.Cartesian3(),
    P = new a.Cartesian3()
  function z(t) {
    ;(t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)),
      (this._offCenterFrustum = new b()),
      (this.fov = t.fov),
      (this._fov = void 0),
      (this._fovy = void 0),
      (this._sseDenominator = void 0),
      (this.aspectRatio = t.aspectRatio),
      (this._aspectRatio = void 0),
      (this.near = r.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = r.defaultValue(t.far, 5e8)),
      (this._far = this.far),
      (this.xOffset = r.defaultValue(t.xOffset, 0)),
      (this._xOffset = this.xOffset),
      (this.yOffset = r.defaultValue(t.yOffset, 0)),
      (this._yOffset = this.yOffset)
  }
  function R(t) {
    const e = t._offCenterFrustum
    ;(t.fov === t._fov &&
      t.aspectRatio === t._aspectRatio &&
      t.near === t._near &&
      t.far === t._far &&
      t.xOffset === t._xOffset &&
      t.yOffset === t._yOffset) ||
      ((t._aspectRatio = t.aspectRatio),
      (t._fov = t.fov),
      (t._fovy = t.aspectRatio <= 1 ? t.fov : 2 * Math.atan(Math.tan(0.5 * t.fov) / t.aspectRatio)),
      (t._near = t.near),
      (t._far = t.far),
      (t._sseDenominator = 2 * Math.tan(0.5 * t._fovy)),
      (t._xOffset = t.xOffset),
      (t._yOffset = t.yOffset),
      (e.top = t.near * Math.tan(0.5 * t._fovy)),
      (e.bottom = -e.top),
      (e.right = t.aspectRatio * e.top),
      (e.left = -e.right),
      (e.near = t.near),
      (e.far = t.far),
      (e.right += t.xOffset),
      (e.left += t.xOffset),
      (e.top += t.yOffset),
      (e.bottom += t.yOffset))
  }
  ;(b.prototype.computeCullingVolume = function (t, e, i) {
    const o = this._cullingVolume.planes,
      s = this.top,
      f = this.bottom,
      u = this.right,
      l = this.left,
      c = this.near,
      h = this.far,
      p = a.Cartesian3.cross(e, i, F),
      d = E
    a.Cartesian3.multiplyByScalar(e, c, d), a.Cartesian3.add(t, d, d)
    const m = O
    a.Cartesian3.multiplyByScalar(e, h, m), a.Cartesian3.add(t, m, m)
    const C = P
    a.Cartesian3.multiplyByScalar(p, l, C),
      a.Cartesian3.add(d, C, C),
      a.Cartesian3.subtract(C, t, C),
      a.Cartesian3.normalize(C, C),
      a.Cartesian3.cross(C, i, C),
      a.Cartesian3.normalize(C, C)
    let _ = o[0]
    return (
      r.defined(_) || (_ = o[0] = new n.Cartesian4()),
      (_.x = C.x),
      (_.y = C.y),
      (_.z = C.z),
      (_.w = -a.Cartesian3.dot(C, t)),
      a.Cartesian3.multiplyByScalar(p, u, C),
      a.Cartesian3.add(d, C, C),
      a.Cartesian3.subtract(C, t, C),
      a.Cartesian3.cross(i, C, C),
      a.Cartesian3.normalize(C, C),
      (_ = o[1]),
      r.defined(_) || (_ = o[1] = new n.Cartesian4()),
      (_.x = C.x),
      (_.y = C.y),
      (_.z = C.z),
      (_.w = -a.Cartesian3.dot(C, t)),
      a.Cartesian3.multiplyByScalar(i, f, C),
      a.Cartesian3.add(d, C, C),
      a.Cartesian3.subtract(C, t, C),
      a.Cartesian3.cross(p, C, C),
      a.Cartesian3.normalize(C, C),
      (_ = o[2]),
      r.defined(_) || (_ = o[2] = new n.Cartesian4()),
      (_.x = C.x),
      (_.y = C.y),
      (_.z = C.z),
      (_.w = -a.Cartesian3.dot(C, t)),
      a.Cartesian3.multiplyByScalar(i, s, C),
      a.Cartesian3.add(d, C, C),
      a.Cartesian3.subtract(C, t, C),
      a.Cartesian3.cross(C, p, C),
      a.Cartesian3.normalize(C, C),
      (_ = o[3]),
      r.defined(_) || (_ = o[3] = new n.Cartesian4()),
      (_.x = C.x),
      (_.y = C.y),
      (_.z = C.z),
      (_.w = -a.Cartesian3.dot(C, t)),
      (_ = o[4]),
      r.defined(_) || (_ = o[4] = new n.Cartesian4()),
      (_.x = e.x),
      (_.y = e.y),
      (_.z = e.z),
      (_.w = -a.Cartesian3.dot(e, d)),
      a.Cartesian3.negate(e, C),
      (_ = o[5]),
      r.defined(_) || (_ = o[5] = new n.Cartesian4()),
      (_.x = C.x),
      (_.y = C.y),
      (_.z = C.z),
      (_.w = -a.Cartesian3.dot(C, m)),
      this._cullingVolume
    )
  }),
    (b.prototype.getPixelDimensions = function (t, e, a, n, i) {
      V(this)
      const r = 1 / this.near
      let o = this.top * r
      const s = (2 * n * a * o) / e
      o = this.right * r
      const f = (2 * n * a * o) / t
      return (i.x = f), (i.y = s), i
    }),
    (b.prototype.clone = function (t) {
      return (
        r.defined(t) || (t = new b()),
        (t.right = this.right),
        (t.left = this.left),
        (t.top = this.top),
        (t.bottom = this.bottom),
        (t.near = this.near),
        (t.far = this.far),
        (t._left = void 0),
        (t._right = void 0),
        (t._top = void 0),
        (t._bottom = void 0),
        (t._near = void 0),
        (t._far = void 0),
        t
      )
    }),
    (b.prototype.equals = function (t) {
      return (
        r.defined(t) &&
        t instanceof b &&
        this.right === t.right &&
        this.left === t.left &&
        this.top === t.top &&
        this.bottom === t.bottom &&
        this.near === t.near &&
        this.far === t.far
      )
    }),
    (b.prototype.equalsEpsilon = function (t, e, a) {
      return (
        t === this ||
        (r.defined(t) &&
          t instanceof b &&
          f.CesiumMath.equalsEpsilon(this.right, t.right, e, a) &&
          f.CesiumMath.equalsEpsilon(this.left, t.left, e, a) &&
          f.CesiumMath.equalsEpsilon(this.top, t.top, e, a) &&
          f.CesiumMath.equalsEpsilon(this.bottom, t.bottom, e, a) &&
          f.CesiumMath.equalsEpsilon(this.near, t.near, e, a) &&
          f.CesiumMath.equalsEpsilon(this.far, t.far, e, a))
      )
    }),
    (z.packedLength = 6),
    (z.pack = function (t, e, a) {
      return (
        (a = r.defaultValue(a, 0)),
        (e[a++] = t.fov),
        (e[a++] = t.aspectRatio),
        (e[a++] = t.near),
        (e[a++] = t.far),
        (e[a++] = t.xOffset),
        (e[a] = t.yOffset),
        e
      )
    }),
    (z.unpack = function (t, e, a) {
      return (
        (e = r.defaultValue(e, 0)),
        r.defined(a) || (a = new z()),
        (a.fov = t[e++]),
        (a.aspectRatio = t[e++]),
        (a.near = t[e++]),
        (a.far = t[e++]),
        (a.xOffset = t[e++]),
        (a.yOffset = t[e]),
        a
      )
    }),
    Object.defineProperties(z.prototype, {
      projectionMatrix: {
        get: function () {
          return R(this), this._offCenterFrustum.projectionMatrix
        }
      },
      infiniteProjectionMatrix: {
        get: function () {
          return R(this), this._offCenterFrustum.infiniteProjectionMatrix
        }
      },
      fovy: {
        get: function () {
          return R(this), this._fovy
        }
      },
      sseDenominator: {
        get: function () {
          return R(this), this._sseDenominator
        }
      }
    }),
    (z.prototype.computeCullingVolume = function (t, e, a) {
      return R(this), this._offCenterFrustum.computeCullingVolume(t, e, a)
    }),
    (z.prototype.getPixelDimensions = function (t, e, a, n, i) {
      return R(this), this._offCenterFrustum.getPixelDimensions(t, e, a, n, i)
    }),
    (z.prototype.clone = function (t) {
      return (
        r.defined(t) || (t = new z()),
        (t.aspectRatio = this.aspectRatio),
        (t.fov = this.fov),
        (t.near = this.near),
        (t.far = this.far),
        (t._aspectRatio = void 0),
        (t._fov = void 0),
        (t._near = void 0),
        (t._far = void 0),
        this._offCenterFrustum.clone(t._offCenterFrustum),
        t
      )
    }),
    (z.prototype.equals = function (t) {
      return (
        !!(r.defined(t) && t instanceof z) &&
        (R(this), R(t), this.fov === t.fov && this.aspectRatio === t.aspectRatio && this._offCenterFrustum.equals(t._offCenterFrustum))
      )
    }),
    (z.prototype.equalsEpsilon = function (t, e, a) {
      return (
        !!(r.defined(t) && t instanceof z) &&
        (R(this),
        R(t),
        f.CesiumMath.equalsEpsilon(this.fov, t.fov, e, a) &&
          f.CesiumMath.equalsEpsilon(this.aspectRatio, t.aspectRatio, e, a) &&
          this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum, e, a))
      )
    })
  const S = 0
  function T(t) {
    const n = t.frustum,
      i = t.orientation,
      o = t.origin,
      s = r.defaultValue(t.vertexFormat, l.VertexFormat.DEFAULT),
      f = r.defaultValue(t._drawNearPlane, !0)
    let u, c
    n instanceof z ? ((u = S), (c = z.packedLength)) : n instanceof v && ((u = 1), (c = v.packedLength)),
      (this._frustumType = u),
      (this._frustum = n.clone()),
      (this._origin = a.Cartesian3.clone(o)),
      (this._orientation = e.Quaternion.clone(i)),
      (this._drawNearPlane = f),
      (this._vertexFormat = s),
      (this._workerName = 'createFrustumGeometry'),
      (this.packedLength = 2 + c + a.Cartesian3.packedLength + e.Quaternion.packedLength + l.VertexFormat.packedLength)
  }
  T.pack = function (t, n, i) {
    i = r.defaultValue(i, 0)
    const o = t._frustumType,
      s = t._frustum
    return (
      (n[i++] = o),
      o === S ? (z.pack(s, n, i), (i += z.packedLength)) : (v.pack(s, n, i), (i += v.packedLength)),
      a.Cartesian3.pack(t._origin, n, i),
      (i += a.Cartesian3.packedLength),
      e.Quaternion.pack(t._orientation, n, i),
      (i += e.Quaternion.packedLength),
      l.VertexFormat.pack(t._vertexFormat, n, i),
      (n[(i += l.VertexFormat.packedLength)] = t._drawNearPlane ? 1 : 0),
      n
    )
  }
  const k = new z(),
    A = new v(),
    D = new e.Quaternion(),
    I = new a.Cartesian3(),
    q = new l.VertexFormat()
  function B(t, e, a, n, i, o, s, f) {
    const u = (t / 3) * 2
    for (let i = 0; i < 4; ++i)
      r.defined(e) && ((e[t] = o.x), (e[t + 1] = o.y), (e[t + 2] = o.z)),
        r.defined(a) && ((a[t] = s.x), (a[t + 1] = s.y), (a[t + 2] = s.z)),
        r.defined(n) && ((n[t] = f.x), (n[t + 1] = f.y), (n[t + 2] = f.z)),
        (t += 3)
    ;(i[u] = 0), (i[u + 1] = 0), (i[u + 2] = 1), (i[u + 3] = 0), (i[u + 4] = 1), (i[u + 5] = 1), (i[u + 6] = 0), (i[u + 7] = 1)
  }
  T.unpack = function (t, n, i) {
    n = r.defaultValue(n, 0)
    const o = t[n++]
    let s
    o === S ? ((s = z.unpack(t, n, k)), (n += z.packedLength)) : ((s = v.unpack(t, n, A)), (n += v.packedLength))
    const f = a.Cartesian3.unpack(t, n, I)
    n += a.Cartesian3.packedLength
    const u = e.Quaternion.unpack(t, n, D)
    n += e.Quaternion.packedLength
    const c = l.VertexFormat.unpack(t, n, q),
      h = 1 === t[(n += l.VertexFormat.packedLength)]
    if (!r.defined(i)) return new T({ frustum: s, origin: f, orientation: u, vertexFormat: c, _drawNearPlane: h })
    const p = o === i._frustumType ? i._frustum : void 0
    return (
      (i._frustum = s.clone(p)),
      (i._frustumType = o),
      (i._origin = a.Cartesian3.clone(f, i._origin)),
      (i._orientation = e.Quaternion.clone(u, i._orientation)),
      (i._vertexFormat = l.VertexFormat.clone(c, i._vertexFormat)),
      (i._drawNearPlane = h),
      i
    )
  }
  const L = new a.Matrix3(),
    N = new n.Matrix4(),
    G = new n.Matrix4(),
    j = new a.Cartesian3(),
    U = new a.Cartesian3(),
    Q = new a.Cartesian3(),
    K = new a.Cartesian3(),
    Y = new a.Cartesian3(),
    J = new a.Cartesian3(),
    W = new Array(3),
    X = new Array(4)
  ;(X[0] = new n.Cartesian4(-1, -1, 1, 1)),
    (X[1] = new n.Cartesian4(1, -1, 1, 1)),
    (X[2] = new n.Cartesian4(1, 1, 1, 1)),
    (X[3] = new n.Cartesian4(-1, 1, 1, 1))
  const Z = new Array(4)
  for (let t = 0; t < 4; ++t) Z[t] = new n.Cartesian4()
  ;(T._computeNearFarPlanes = function (t, e, i, o, s, f, u, l) {
    const c = a.Matrix3.fromQuaternion(e, L)
    let h = r.defaultValue(f, j),
      p = r.defaultValue(u, U),
      d = r.defaultValue(l, Q)
    ;(h = a.Matrix3.getColumn(c, 0, h)),
      (p = a.Matrix3.getColumn(c, 1, p)),
      (d = a.Matrix3.getColumn(c, 2, d)),
      a.Cartesian3.normalize(h, h),
      a.Cartesian3.normalize(p, p),
      a.Cartesian3.normalize(d, d),
      a.Cartesian3.negate(h, h)
    const m = n.Matrix4.computeView(t, d, p, h, N)
    let C, _
    const y = o.projectionMatrix
    if (i === S) {
      const t = n.Matrix4.multiply(y, m, G)
      _ = n.Matrix4.inverse(t, G)
    } else C = n.Matrix4.inverseTransformation(m, G)
    r.defined(_) ? ((W[0] = o.near), (W[1] = o.far)) : ((W[0] = 0), (W[1] = o.near), (W[2] = o.far))
    for (let e = 0; e < 2; ++e)
      for (let i = 0; i < 4; ++i) {
        let f = n.Cartesian4.clone(X[i], Z[i])
        if (r.defined(_)) {
          f = n.Matrix4.multiplyByVector(_, f, f)
          const i = 1 / f.w
          a.Cartesian3.multiplyByScalar(f, i, f), a.Cartesian3.subtract(f, t, f), a.Cartesian3.normalize(f, f)
          const r = a.Cartesian3.dot(d, f)
          a.Cartesian3.multiplyByScalar(f, W[e] / r, f), a.Cartesian3.add(f, t, f)
        } else {
          r.defined(o._offCenterFrustum) && (o = o._offCenterFrustum)
          const t = W[e],
            a = W[e + 1]
          ;(f.x = 0.5 * (f.x * (o.right - o.left) + o.left + o.right)),
            (f.y = 0.5 * (f.y * (o.top - o.bottom) + o.bottom + o.top)),
            (f.z = 0.5 * (f.z * (t - a) - t - a)),
            (f.w = 1),
            n.Matrix4.multiplyByVector(C, f, f)
        }
        ;(s[12 * e + 3 * i] = f.x), (s[12 * e + 3 * i + 1] = f.y), (s[12 * e + 3 * i + 2] = f.z)
      }
  }),
    (T.createGeometry = function (t) {
      const n = t._frustumType,
        f = t._frustum,
        u = t._origin,
        l = t._orientation,
        c = t._drawNearPlane,
        h = t._vertexFormat,
        p = c ? 6 : 5
      let d = new Float64Array(72)
      T._computeNearFarPlanes(u, l, n, f, d)
      let m = 24
      ;(d[m] = d[12]),
        (d[m + 1] = d[13]),
        (d[m + 2] = d[14]),
        (d[m + 3] = d[0]),
        (d[m + 4] = d[1]),
        (d[m + 5] = d[2]),
        (d[m + 6] = d[9]),
        (d[m + 7] = d[10]),
        (d[m + 8] = d[11]),
        (d[m + 9] = d[21]),
        (d[m + 10] = d[22]),
        (d[m + 11] = d[23]),
        (m += 12),
        (d[m] = d[15]),
        (d[m + 1] = d[16]),
        (d[m + 2] = d[17]),
        (d[m + 3] = d[3]),
        (d[m + 4] = d[4]),
        (d[m + 5] = d[5]),
        (d[m + 6] = d[0]),
        (d[m + 7] = d[1]),
        (d[m + 8] = d[2]),
        (d[m + 9] = d[12]),
        (d[m + 10] = d[13]),
        (d[m + 11] = d[14]),
        (m += 12),
        (d[m] = d[3]),
        (d[m + 1] = d[4]),
        (d[m + 2] = d[5]),
        (d[m + 3] = d[15]),
        (d[m + 4] = d[16]),
        (d[m + 5] = d[17]),
        (d[m + 6] = d[18]),
        (d[m + 7] = d[19]),
        (d[m + 8] = d[20]),
        (d[m + 9] = d[6]),
        (d[m + 10] = d[7]),
        (d[m + 11] = d[8]),
        (m += 12),
        (d[m] = d[6]),
        (d[m + 1] = d[7]),
        (d[m + 2] = d[8]),
        (d[m + 3] = d[18]),
        (d[m + 4] = d[19]),
        (d[m + 5] = d[20]),
        (d[m + 6] = d[21]),
        (d[m + 7] = d[22]),
        (d[m + 8] = d[23]),
        (d[m + 9] = d[9]),
        (d[m + 10] = d[10]),
        (d[m + 11] = d[11]),
        c || (d = d.subarray(12))
      const C = new s.GeometryAttributes({
        position: new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: d })
      })
      if (r.defined(h.normal) || r.defined(h.tangent) || r.defined(h.bitangent) || r.defined(h.st)) {
        const t = r.defined(h.normal) ? new Float32Array(12 * p) : void 0,
          e = r.defined(h.tangent) ? new Float32Array(12 * p) : void 0,
          n = r.defined(h.bitangent) ? new Float32Array(12 * p) : void 0,
          s = r.defined(h.st) ? new Float32Array(8 * p) : void 0,
          f = j,
          u = U,
          l = Q,
          d = a.Cartesian3.negate(f, K),
          _ = a.Cartesian3.negate(u, Y),
          y = a.Cartesian3.negate(l, J)
        ;(m = 0),
          c && (B(m, t, e, n, s, y, f, u), (m += 12)),
          B(m, t, e, n, s, l, d, u),
          (m += 12),
          B(m, t, e, n, s, d, y, u),
          (m += 12),
          B(m, t, e, n, s, _, y, d),
          (m += 12),
          B(m, t, e, n, s, f, l, u),
          (m += 12),
          B(m, t, e, n, s, u, l, d),
          r.defined(t) &&
            (C.normal = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: t })),
          r.defined(e) &&
            (C.tangent = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: e })),
          r.defined(n) &&
            (C.bitangent = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: n })),
          r.defined(s) && (C.st = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: s }))
      }
      const _ = new Uint16Array(6 * p)
      for (let t = 0; t < p; ++t) {
        const e = 6 * t,
          a = 4 * t
        ;(_[e] = a), (_[e + 1] = a + 1), (_[e + 2] = a + 2), (_[e + 3] = a), (_[e + 4] = a + 2), (_[e + 5] = a + 3)
      }
      return new o.Geometry({ attributes: C, indices: _, primitiveType: o.PrimitiveType.TRIANGLES, boundingSphere: e.BoundingSphere.fromVertices(d) })
    }),
    (t.FrustumGeometry = T),
    (t.OrthographicFrustum = v),
    (t.PerspectiveFrustum = z)
})