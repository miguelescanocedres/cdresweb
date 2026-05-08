"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  alpha: number
  targetAlpha: number
  color: string
  size: number
  settled: boolean
}

interface ParticleBuildTextProps {
  text: string
  // color per character index — fallback to colors array cycling
  charColors?: string[]
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  onComplete?: () => void
  className?: string
}

export function ParticleBuildText({
  text,
  charColors,
  fontSize = 160,
  fontWeight = 900,
  fontFamily = "Space Grotesk, sans-serif",
  onComplete,
  className = "",
}: ParticleBuildTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const completedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const W = container.clientWidth
    const H = container.clientHeight

    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`

    const ctx = canvas.getContext("2d")!
    ctx.scale(dpr, dpr)

    // ── Sample each character separately so we can assign colors per char ──
    const scaledFontSize = Math.min(fontSize, W / text.length * 1.1)
    const fontStr = `${fontWeight} ${scaledFontSize}px ${fontFamily}`

    // Measure full text width to center it
    const offFull = document.createElement("canvas")
    const offCtxFull = offFull.getContext("2d")!
    offCtxFull.font = fontStr
    const fullWidth = offCtxFull.measureText(text).width
    const startX = (W - fullWidth) / 2
    const centerY = H / 2

    // Per-character pixel sampling
    interface CharData { pixels: { x: number; y: number }[]; color: string; charStartX: number }
    const charDataList: CharData[] = []
    let cursorX = startX

    for (let ci = 0; ci < text.length; ci++) {
      const ch = text[ci]
      const color = charColors?.[ci] ?? "#0066FF"

      // Off-screen canvas for this char
      const offC = document.createElement("canvas")
      offC.width = W * dpr
      offC.height = H * dpr
      const offCtx = offC.getContext("2d")!
      offCtx.scale(dpr, dpr)
      offCtx.font = fontStr
      offCtx.textBaseline = "middle"
      offCtx.fillStyle = "#ffffff"
      offCtx.fillText(ch, cursorX, centerY)

      const imgData = offCtx.getImageData(0, 0, offC.width, offC.height)
      const pixels: { x: number; y: number }[] = []
      const step = 3  // sample every 3px — balance density vs perf

      for (let y = 0; y < offC.height; y += step) {
        for (let x = 0; x < offC.width; x += step) {
          const idx = (y * offC.width + x) * 4
          if (imgData.data[idx + 3] > 128) {
            pixels.push({ x: x / dpr, y: y / dpr })
          }
        }
      }

      charDataList.push({ pixels, color, charStartX: cursorX })
      cursorX += offCtxFull.measureText(ch).width
    }

    // ── Build particle list with staggered reveal per character ──
    const CHAR_DELAY = 0.22   // seconds between each char starting
    const BUILD_DURATION = 0.7 // seconds for particles to fly into place
    const SPAWN_RADIUS = 180   // particles start far from target

    interface AnimParticle extends Particle { charIndex: number; delay: number }
    const particles: AnimParticle[] = []

    for (let ci = 0; ci < charDataList.length; ci++) {
      const { pixels, color } = charDataList[ci]
      const delay = ci * CHAR_DELAY

      for (const { x: tx, y: ty } of pixels) {
        // Spawn from random position near center-top
        const angle = Math.random() * Math.PI * 2
        const dist = SPAWN_RADIUS + Math.random() * SPAWN_RADIUS
        particles.push({
          x: tx + Math.cos(angle) * dist,
          y: ty + Math.sin(angle) * dist,
          targetX: tx,
          targetY: ty,
          vx: 0,
          vy: 0,
          alpha: 0,
          targetAlpha: 1,
          color,
          size: 1.5,
          settled: false,
          charIndex: ci,
          delay,
        })
      }
    }

    // ── Animation loop ──
    let startTime: number | null = null

    const animate = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = (ts - startTime) / 1000  // seconds

      ctx.clearRect(0, 0, W, H)

      let allSettled = true

      for (const p of particles) {
        const localT = elapsed - p.delay
        if (localT < 0) {
          allSettled = false
          continue
        }

        const progress = Math.min(1, localT / BUILD_DURATION)
        const ease = 1 - Math.pow(1 - progress, 3)  // ease-out cubic

        p.x = p.x + (p.targetX - p.x) * ease * 0.18
        p.y = p.y + (p.targetY - p.y) * ease * 0.18
        p.alpha = Math.min(1, p.alpha + ease * 0.08)

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)

        const dx = Math.abs(p.x - p.targetX)
        const dy = Math.abs(p.y - p.targetY)
        if (dx > 1 || dy > 1 || p.alpha < 0.95) allSettled = false
      }

      ctx.globalAlpha = 1

      if (allSettled && !completedRef.current) {
        completedRef.current = true
        onComplete?.()
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
      className={`w-full ${className}`}
      style={{ position: "relative" }}
    >
      {/* Invisible text for sizing — keeps layout stable */}
      <div
        aria-hidden="true"
        style={{
          visibility: "hidden",
          fontFamily,
          fontWeight,
          fontSize: `clamp(72px, 18vw, 220px)`,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          userSelect: "none",
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
