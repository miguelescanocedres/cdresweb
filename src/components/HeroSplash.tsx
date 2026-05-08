"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroSplash() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const progress = Math.min(1, scrollY / windowHeight)
      const scale = 1 - progress * 0.15
      const opacity = 1 - progress * 1.4
      containerRef.current.style.transform = `scale(${scale})`
      containerRef.current.style.opacity = `${Math.max(0, opacity)}`
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060B12" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none animate-glow-pulse"
        style={{
          top: "10%", left: "10%",
          width: "700px", height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,102,255,0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", right: "5%",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Main content — scroll-responsive via ref */}
      <div
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4"
        style={{ willChange: "transform, opacity" }}
      >
        {/* CDRES INTEC logo — giant */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Main brand line: C DRES */}
          <div
            className="flex items-baseline leading-none select-none"
            style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(72px, 18vw, 220px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="text-white"
              style={{
                textShadow: "0 0 80px rgba(255,255,255,0.2)",
              }}
            >
              C
            </span>
            <span
              style={{
                color: "#0066FF",
                textShadow: "0 0 80px rgba(0,102,255,0.5), 0 0 160px rgba(0,102,255,0.2)",
              }}
            >
              DRES
            </span>
          </div>

          {/* INTEC sub-brand */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="h-px w-8 bg-[#8892A4]/40" />
            <span
              style={{
                fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(18px, 4vw, 52px)",
                letterSpacing: "0.25em",
                color: "#8892A4",
              }}
            >
              INTEC
            </span>
            <div className="h-px w-8 bg-[#8892A4]/40" />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-mono tracking-[0.35em] text-[#5A6070] uppercase mt-8 text-center"
          style={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Soluciones Informáticas
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[10px] text-[#8892A4] tracking-[0.25em] uppercase font-mono">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#0066FF]/60 to-transparent animate-scroll-bounce" />
      </motion.div>
    </section>
  )
}
