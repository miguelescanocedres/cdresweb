"use client"

import { useEffect, useRef } from "react"

interface Particle {
  // current position
  x: number
  y: number
  // target (final) position
  tx: number
  ty: number
  // velocity (spring physics)
  vx: number
  vy: number
  // depth simulation: 0 = far (small, faint) → 1 = front (full size, full opacity)
  z: number
  tz: number
  vz: number
  // color
  r: number
  g: number
  b: number
  // per-particle delay in seconds
  delay: number
  active: boolean
}

interface ParticleBuildTextProps {
  text: string
  charColors?: string[]
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  className?: string
}

// Spring constants — higher stiffness + damping = snappier but smooth
const STIFFNESS = 140
const DAMPING = 18
const Z_STIFFNESS = 120
const Z_DAMPING = 16

// Delay between characters (seconds)
const CHAR_DELAY = 0.28

// How far back particles spawn (0 = 2D only, >0 = 3D depth)
const SPAWN_SPREAD = 320

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

    // Use 2x DPR for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    const W = container.clientWidth
    const H = container.clientHeight

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`

    const ctx = canvas.getContext("2d", { alpha: true })!
    ctx.scale(dpr, dpr)

    // ─── Parse hex color to rgb ───
    const hexToRgb = (hex: string): [number, number, number] => {
      const h = hex.replace("#", "")
      if (h.length === 3) {
        return [
          parseInt(h[0] + h[0], 16),
          parseInt(h[1] + h[1], 16),
          parseInt(h[2] + h[2], 16),
        ]
      }
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
    }

    // ─── Sample pixels per character ───
    // Use a high-res offscreen canvas for accurate sampling
    const SAMPLE_DPR = Math.min(dpr * 1.5, 4) // even higher for sampling
    const offW = W * SAMPLE_DPR
    const offH = H * SAMPLE_DPR

    const off = document.createElement("canvas")
    off.width = offW
    off.height = offH
    const offCtx = off.getContext("2d")!
    offCtx.scale(SAMPLE_DPR, SAMPLE_DPR)

    // Measure full text to center
    const scaledFontSize = Math.min(fontSize, (W * 0.9) / text.length * 1.25)
    offCtx.font = `${fontWeight} ${scaledFontSize}px ${fontFamily}`
    offCtx.textBaseline = "middle"
    const totalWidth = offCtx.measureText(text).width
    let cursorX = (W - totalWidth) / 2
    const centerY = H / 2

    // Collect pixels per character
    interface CharPixels { pts: [number, number][]; color: [number, number, number] }
    const charList: CharPixels[] = []

    for (let ci = 0; ci < text.length; ci++) {
      const ch = text[ci]
      const color = hexToRgb(charColors?.[ci] ?? "#0066FF")

      // Clear & draw just this character
      offCtx.clearRect(0, 0, W, H)
      offCtx.fillStyle = "#fff"
      offCtx.font = `${fontWeight} ${scaledFontSize}px ${fontFamily}`
      offCtx.textBaseline = "middle"
      offCtx.fillText(ch, cursorX, centerY)

      const imgData = offCtx.getImageData(0, 0, offW, offH)
      const data = imgData.data
      const pts: [number, number][] = []

      // Step of 2 (screen pixels) = dense but performant
      const step = Math.round(SAMPLE_DPR * 1.5)

      for (let py = 0; py < offH; py += step) {
        for (let px = 0; px < offW; px += step) {
          const i = (py * offW + px) * 4
          if (data[i + 3] > 140) {
            pts.push([px / SAMPLE_DPR, py / SAMPLE_DPR])
          }
        }
      }

      charList.push({ pts, color })
      cursorX += offCtx.measureText(ch).width
    }

    // ─── Build particle list ───
    const particles: Particle[] = []

    for (let ci = 0; ci < charList.length; ci++) {
      const { pts, color } = charList[ci]
      const delay = ci * CHAR_DELAY

      for (const [tx, ty] of pts) {
        // Spawn from a point far in "depth" (z=0 means far away/small/transparent)
        // x/y start near target but jittered
        const angle = Math.random() * Math.PI * 2
        const dist = 30 + Math.random() * SPAWN_SPREAD * 0.5
        particles.push({
          x: tx + Math.cos(angle) * dist,
          y: ty + Math.sin(angle) * dist,
          tx,
          ty,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          z: 0,   // starts at depth 0 (back/small)
          tz: 1,  // target depth 1 (front/full)
          vz: 0,
          r: color[0],
          g: color[1],
          b: color[2],
          delay,
          active: false,
        })
      }
    }

    // ─── Animation loop ───
    let startTime: number | null = null
    let lastTime: number | null = null

    const animate = (ts: number) => {
      if (!startTime) startTime = ts
      if (!lastTime) lastTime = ts
      const elapsed = (ts - startTime) / 1000
      const dt = Math.min((ts - lastTime) / 1000, 0.033) // cap at 33ms
      lastTime = ts

      ctx.clearRect(0, 0, W, H)

      let allDone = true

      for (const p of particles) {
        if (elapsed < p.delay) {
          allDone = false
          continue
        }

        if (!p.active) p.active = true

        // Spring physics for x/y
        const ax = (p.tx - p.x) * STIFFNESS - p.vx * DAMPING
        const ay = (p.ty - p.y) * STIFFNESS - p.vy * DAMPING
        p.vx += ax * dt
        p.vy += ay * dt
        p.x += p.vx * dt
        p.y += p.vy * dt

        // Spring physics for z (depth)
        const az = (p.tz - p.z) * Z_STIFFNESS - p.vz * Z_DAMPING
        p.vz += az * dt
        p.z += p.vz * dt
        p.z = Math.max(0, Math.min(1.05, p.z))

        // z → visual: 0=far(tiny, transparent) 1=near(full size, full alpha)
        const easeZ = p.z * p.z * (3 - 2 * p.z) // smoothstep
        const alpha = Math.min(1, easeZ * 1.2)
        const size = Math.max(0.5, easeZ * 2.0) // 0.5–2px

        ctx.globalAlpha = alpha
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size)

        // Check settled
        const settled =
          Math.abs(p.tx - p.x) < 0.4 &&
          Math.abs(p.ty - p.y) < 0.4 &&
          Math.abs(p.tz - p.z) < 0.01
        if (!settled) allDone = false
      }

      ctx.globalAlpha = 1

      // Once all settled, do a final crisp redraw using fillText for pixel-perfect result
      if (allDone) {
        ctx.clearRect(0, 0, W, H)
        const displayFontSize = Math.min(fontSize, (W * 0.9) / text.length * 1.25)
        ctx.font = `${fontWeight} ${displayFontSize}px ${fontFamily}`
        ctx.textBaseline = "middle"
        const tw = ctx.measureText(text).width
        let cx = (W - tw) / 2

        for (let ci = 0; ci < text.length; ci++) {
          const ch = text[ci]
          const [r, g, b] = hexToRgb(charColors?.[ci] ?? "#0066FF")
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillText(ch, cx, H / 2)
          cx += ctx.measureText(ch).width
        }
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
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      {/* Ghost text keeps layout height stable */}
      <div
        aria-hidden="true"
        style={{
          visibility: "hidden",
          fontFamily,
          fontWeight,
          fontSize: `clamp(72px, 18vw, 220px)`,
          lineHeight: 1,
          letterSpacing: "-0.02em",
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
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}
