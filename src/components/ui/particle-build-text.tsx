"use client"

import { useEffect, useRef } from "react"

interface Particle {
  // screen position (lerped)
  x: number
  y: number
  // final resting position
  tx: number
  ty: number
  // spring velocity
  vx: number
  vy: number
  // depth: 0 = deep background, 1 = fully in front
  z: number
  vz: number
  // color channels
  r: number
  g: number
  b: number
  // stagger delay in seconds
  delay: number
  // small random float offset for organic drift before settling
  driftX: number
  driftY: number
  driftPhase: number
  driftSpeed: number
}

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "")
  const full = h.length === 3
    ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    : h
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)]
}

interface ParticleBuildTextProps {
  text: string
  charColors?: string[]
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  className?: string
}

export function ParticleBuildText({
  text,
  charColors,
  fontSize = 160,
  fontWeight = 900,
  fontFamily = "Space Grotesk, sans-serif",
  className = "",
}: ParticleBuildTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    const W = container.clientWidth
    const H = container.clientHeight

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`

    const ctx = canvas.getContext("2d", { alpha: true })!
    ctx.scale(dpr, dpr)

    // ── Measure text layout ──
    const scaledFont = Math.min(fontSize, (W * 0.88) / text.length * 1.3)
    const tempCtx = document.createElement("canvas").getContext("2d")!
    tempCtx.font = `${fontWeight} ${scaledFont}px ${fontFamily}`
    const totalW = tempCtx.measureText(text).width
    let cursorX = (W - totalW) / 2
    const centerY = H / 2

    // ── Sample pixels per character at high resolution ──
    const SAMPLE_DPR = Math.min(dpr * 2, 5)
    const offW = Math.ceil(W * SAMPLE_DPR)
    const offH = Math.ceil(H * SAMPLE_DPR)
    const off = document.createElement("canvas")
    off.width = offW
    off.height = offH
    const offCtx = off.getContext("2d")!
    offCtx.scale(SAMPLE_DPR, SAMPLE_DPR)

    interface CharData { pts: [number, number][]; color: [number, number, number]; startX: number }
    const charDataList: CharData[] = []

    for (let ci = 0; ci < text.length; ci++) {
      const ch = text[ci]
      const color = hexToRgb(charColors?.[ci] ?? "#0066FF")

      offCtx.clearRect(0, 0, W, H)
      offCtx.font = `${fontWeight} ${scaledFont}px ${fontFamily}`
      offCtx.textBaseline = "middle"
      offCtx.fillStyle = "#fff"
      offCtx.fillText(ch, cursorX, centerY)

      const imgData = offCtx.getImageData(0, 0, offW, offH)
      const data = imgData.data
      const pts: [number, number][] = []

      // Fine step = dense particles = high quality
      const step = Math.round(SAMPLE_DPR * 1.2)
      for (let py = 0; py < offH; py += step) {
        for (let px = 0; px < offW; px += step) {
          const i = (py * offW + px) * 4
          if (data[i + 3] > 120) {
            pts.push([px / SAMPLE_DPR, py / SAMPLE_DPR])
          }
        }
      }

      charDataList.push({ pts, color, startX: cursorX })
      cursorX += tempCtx.measureText(ch).width
    }

    // ── Build particles: spawn from the exact target position but z=0 ──
    // The "depth from behind" effect: z goes 0→1, controlling scale + blur + alpha
    // Particles also float with a gentle sinusoidal drift while z < 1
    const CHAR_DELAY = 0.26
    const particles: Particle[] = []

    for (let ci = 0; ci < charDataList.length; ci++) {
      const { pts, color } = charDataList[ci]
      const baseDelay = ci * CHAR_DELAY

      for (const [tx, ty] of pts) {
        particles.push({
          x: tx + (Math.random() - 0.5) * 8,
          y: ty + (Math.random() - 0.5) * 8,
          tx,
          ty,
          vx: 0,
          vy: 0,
          z: 0,
          vz: 0,
          r: color[0],
          g: color[1],
          b: color[2],
          delay: baseDelay + Math.random() * 0.08,
          driftX: (Math.random() - 0.5) * 12,
          driftY: (Math.random() - 0.5) * 8,
          driftPhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.8 + Math.random() * 1.2,
        })
      }
    }

    // ── Spring constants — soft & floaty ──
    const STIFFNESS = 80
    const DAMPING = 14
    const Z_RISE = 0.55   // z moves at this rate per second (0→1 over ~1.8s)

    let startTime: number | null = null
    let lastTime: number | null = null
    let doneDrawn = false

    const animate = (ts: number) => {
      if (!startTime) startTime = ts
      if (!lastTime) lastTime = ts
      const elapsed = (ts - startTime) / 1000
      const dt = Math.min((ts - lastTime) / 1000, 0.032)
      lastTime = ts

      ctx.clearRect(0, 0, W, H)

      let allSettled = true

      for (const p of particles) {
        if (elapsed < p.delay) {
          allSettled = false
          continue
        }

        // Advance depth from 0 → 1
        if (p.z < 1) {
          p.z = Math.min(1, p.z + Z_RISE * dt)
          allSettled = false
        }

        const ez = p.z * p.z * (3 - 2 * p.z) // smoothstep 0→1

        // While not fully surfaced, particle drifts organically
        const driftDecay = 1 - ez
        const driftOscX = Math.sin(elapsed * p.driftSpeed + p.driftPhase) * p.driftX * driftDecay
        const driftOscY = Math.cos(elapsed * p.driftSpeed * 0.7 + p.driftPhase) * p.driftY * driftDecay

        const goalX = p.tx + driftOscX
        const goalY = p.ty + driftOscY

        // Spring toward goal
        const ax = (goalX - p.x) * STIFFNESS - p.vx * DAMPING
        const ay = (goalY - p.y) * STIFFNESS - p.vy * DAMPING
        p.vx += ax * dt
        p.vy += ay * dt
        p.x += p.vx * dt
        p.y += p.vy * dt

        // Check settled
        const posOk = Math.abs(p.x - p.tx) < 0.5 && Math.abs(p.y - p.ty) < 0.5
        if (!posOk || p.z < 1) allSettled = false

        // Visual: scale & alpha driven by depth
        const alpha = Math.min(1, ez * 1.3)
        const size = 0.5 + ez * 2.2          // 0.5px (far) → 2.7px (close)
        const glow = (1 - ez) * 6            // stronger glow when far

        if (alpha < 0.01) continue

        // Draw glow halo (only while emerging from depth)
        if (glow > 0.5) {
          ctx.globalAlpha = alpha * 0.25
          ctx.shadowColor = `rgb(${p.r},${p.g},${p.b})`
          ctx.shadowBlur = glow * 4
          ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`
          const gs = size * 2
          ctx.fillRect(p.x - gs / 2, p.y - gs / 2, gs, gs)
          ctx.shadowBlur = 0
        }

        // Draw crisp particle
        ctx.globalAlpha = alpha
        ctx.shadowColor = `rgb(${p.r},${p.g},${p.b})`
        ctx.shadowBlur = ez > 0.7 ? 3 : 0   // subtle glow on settled particles
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size)
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      // All settled → do final crisp fillText pass
      if (allSettled && !doneDrawn) {
        doneDrawn = true
        ctx.clearRect(0, 0, W, H)

        const displayFont = Math.min(fontSize, (W * 0.88) / text.length * 1.3)
        ctx.font = `${fontWeight} ${displayFont}px ${fontFamily}`
        ctx.textBaseline = "middle"
        const tw = ctx.measureText(text).width
        let cx = (W - tw) / 2

        for (let ci = 0; ci < text.length; ci++) {
          const ch = text[ci]
          const [r, g, b] = hexToRgb(charColors?.[ci] ?? "#0066FF")

          // Subtle glow on final text
          ctx.shadowColor = `rgb(${r},${g},${b})`
          ctx.shadowBlur = r > 200 ? 18 : 28  // white: subtle, blue: stronger
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillText(ch, cx, H / 2)
          cx += ctx.measureText(ch).width
        }
        ctx.shadowBlur = 0
        return
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, charColors, fontSize, fontWeight, fontFamily])

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Ghost text stabilizes height */}
      <div
        aria-hidden="true"
        style={{
          visibility: "hidden",
          fontFamily,
          fontWeight,
          fontSize: "clamp(72px, 18vw, 220px)",
          lineHeight: 1,
          whiteSpace: "nowrap",
          userSelect: "none",
          textAlign: "center",
          width: "100%",
          padding: "0.1em 0",
        }}
      >
        {text}
      </div>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  )
}
