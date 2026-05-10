"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export function HeroSplash() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060B12" }}
      aria-label="CDRES INTEC — Soluciones Informáticas"
    >
      {/* Gradiente superior — transición desde la sección anterior */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{ height: '12vh', background: 'linear-gradient(to top, transparent, #060B12)' }}
      />

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
        {/* CDRES INTEC logo */}
        <div className="flex flex-col items-center gap-4 w-full">

          {/* Letters — each animates from depth (blur+scale+opacity) */}
          <div
            className="flex items-baseline leading-none select-none justify-center"
            style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(72px, 18vw, 220px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            {[
              { char: "C", color: "#FFFFFF", shadow: "0 0 60px rgba(255,255,255,0.35), 0 0 120px rgba(255,255,255,0.12)", delay: 0 },
              { char: "D", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.22 },
              { char: "R", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.44 },
              { char: "E", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.66 },
              { char: "S", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.88 },
            ].map(({ char, color, shadow, delay }) => (
              <motion.span
                key={char + delay}
                initial={{ opacity: 0, scale: 0.4, filter: "blur(32px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 1.1,
                  delay,
                  ease: [0.16, 1, 0.3, 1],   // expo out — fast start, silky finish
                }}
                style={{ color, textShadow: shadow, display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* INTEC sub-brand */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.25, 0.4, 0.25, 1] }}
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
        </div>

        {/* Tagline */}
        <motion.p
          className="font-mono tracking-[0.35em] text-[#5A6070] uppercase mt-8 text-center"
          style={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9 }}
        >
          Soluciones Informáticas
        </motion.p>
      </div>

    </section>
  )
}
