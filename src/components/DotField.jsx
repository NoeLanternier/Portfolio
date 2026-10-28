import { useEffect, useRef } from 'react'

// A floor of dots seen in perspective, drawn on a canvas.
// - always: a slow swell runs through it
// - pointer: the dots under the cursor rise, turn purple and get a soft halo
// - click / tap: a ring-shaped wave spreads from that point
// Pointer events are read on `targetRef` (the hero), so the canvas never blocks clicks.
// Visitors who prefer reduced motion get a still frame.

const INK = [23, 22, 28]
const PURPLE = [98, 64, 184]
const NEAR = 1
const FAR = 4.2

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => Math.max(0, Math.min(1, v))

export default function DotField({ targetRef, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const target = targetRef?.current ?? canvas
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let f = 0 // focal length (px)
    let horizon = 0 // screen y of the horizon
    let spacing = 0 // world distance between two dots
    let raf = 0
    let running = false
    let visible = true
    const start = performance.now()

    // Pointer on the floor, in world coordinates (smoothed).
    const pointer = { x: 0, z: 2.4, tx: 0, tz: 2.4, power: 0, target: 0 }
    const ripples = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      f = H * 1.25
      horizon = H - f / NEAR
      spacing = (W < 640 ? 22 : 27) / f
      if (!running) draw(still ? 0 : (performance.now() - start) / 1000)
    }

    // Screen point → point on the floor (y = 0).
    const toFloor = (sx, sy) => {
      const minY = horizon + f / FAR
      const z = sy > minY ? Math.max(NEAR, f / (sy - horizon)) : FAR * 0.9
      return { x: ((sx - W / 2) * z) / f, z }
    }

    const height = (x, z, t) => {
      // slow ambient swell
      let y = 0.022 * Math.sin(1.7 * x + t * 0.8) + 0.018 * Math.sin(2.3 * z - t * 1.05)
      // bump under the pointer
      let lift = 0
      if (pointer.power > 0.001) {
        const dx = x - pointer.x
        const dz = z - pointer.z
        lift += 0.13 * pointer.power * Math.exp(-(dx * dx + dz * dz) / 0.09)
      }
      // ripples: a crest travelling outwards
      for (const r of ripples) {
        const age = t - r.t0
        const d = Math.hypot(x - r.x, z - r.z)
        const k = d - age * 1.5
        lift += 0.11 * Math.exp(-age * 0.85) * Math.exp(-(k * k) / 0.02)
      }
      return [y + lift, lift]
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)

      // halo under the pointer
      if (pointer.power > 0.01) {
        const s = f / pointer.z
        const cx = W / 2 + pointer.x * s
        const cy = horizon + s
        const rx = 0.55 * s
        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(1, 0.32)
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
        g.addColorStop(0, `rgba(98, 64, 184, ${0.16 * pointer.power})`)
        g.addColorStop(1, 'rgba(98, 64, 184, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(0, 0, rx, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // dots, far rows first
      const rows = Math.ceil((FAR - NEAR) / spacing)
      for (let j = rows; j >= 0; j--) {
        const z = NEAR + j * spacing
        const s = f / z
        const depth = (z - NEAR) / (FAR - NEAR) // 0 near → 1 far
        const baseAlpha = 0.5 * Math.pow(1 - depth, 1.3)
        if (baseAlpha < 0.01) continue
        const half = ((W / 2 + 20) * z) / f
        const i0 = Math.ceil(-half / spacing)
        const i1 = Math.floor(half / spacing)
        for (let i = i0; i <= i1; i++) {
          const x = i * spacing
          const [y, lift] = height(x, z, t)
          const sx = W / 2 + x * s
          const sy = horizon + (1 - y) * s
          if (sy < -4 || sy > H + 4) continue
          const glow = clamp01(lift / 0.09)
          const r = (1.55 * NEAR) / z + glow * 1.3
          const c = glow > 0.02 ? INK.map((v, n) => Math.round(lerp(v, PURPLE[n], glow))) : INK
          ctx.globalAlpha = Math.min(1, baseAlpha + glow * 0.55)
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`
          ctx.beginPath()
          ctx.arc(sx, sy, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const frame = (now) => {
      const t = (now - start) / 1000
      pointer.x = lerp(pointer.x, pointer.tx, 0.12)
      pointer.z = lerp(pointer.z, pointer.tz, 0.12)
      pointer.power = lerp(pointer.power, pointer.target, 0.08)
      while (ripples.length && t - ripples[0].t0 > 3.5) ripples.shift()
      draw(t)
      raf = requestAnimationFrame(frame)
    }

    const play = () => {
      if (running || still || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const local = (e) => {
      const rect = canvas.getBoundingClientRect()
      return [e.clientX - rect.left, e.clientY - rect.top]
    }
    const onMove = (e) => {
      const p = toFloor(...local(e))
      pointer.tx = p.x
      pointer.tz = p.z
      if (pointer.target === 0) {
        pointer.x = p.x
        pointer.z = p.z
      }
      pointer.target = 1
    }
    const onLeave = () => {
      pointer.target = 0
    }
    const onDown = (e) => {
      if (e.target.closest?.('a, button, input, textarea')) return
      const p = toFloor(...local(e))
      ripples.push({ x: p.x, z: p.z, t0: (performance.now() - start) / 1000 })
      if (ripples.length > 6) ripples.shift()
      if (e.pointerType !== 'mouse') pointer.target = 0
    }
    const onVisibility = () => (document.hidden ? pause() : play())

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else pause()
    })
    io.observe(canvas)

    if (!still) {
      target.addEventListener('pointermove', onMove)
      target.addEventListener('pointerleave', onLeave)
      target.addEventListener('pointerdown', onDown)
      document.addEventListener('visibilitychange', onVisibility)
      play()
    }

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
      target.removeEventListener('pointermove', onMove)
      target.removeEventListener('pointerleave', onLeave)
      target.removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [targetRef])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />
}
