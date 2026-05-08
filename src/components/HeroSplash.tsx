"use client"

import { useEffect, useRef, useState } from "react"
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect"
import { motion } from "framer-motion"

export function HeroSplash() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const elementTop = rect.top
      const elementHeight = rect.height
      const windowHeight = window.innerHeight

      // Calculate scroll progress (0 to 1 as user scrolls through this section)
      const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Transform values based on scroll progress
  const scale = 1 - scrollProgress * 0.3 // Shrinks as you scroll down
  const opacity = 1 - scrollProgress * 0.8 // Fades as you scroll down

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#060B12" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none animate-glow-pulse"
        style={{
          top: "15%",
          left: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Main Content - Responsive scaling with scroll */}
      <motion.div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6"
        style={{
          scale,
          opacity,
        }}
      >
        {/* Vaporize Logo - Custom render with C white + DRES blue */}
        <div className="flex items-center justify-center gap-0 flex-wrap">
          {/* C in white */}
          <div className="text-white" style={{ fontSize: "clamp(100px, 20vw, 240px)", fontWeight: 900, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1 }}>
            C
          </div>

          {/* DRES in blue - Vaporize effect */}
          <div style={{ minWidth: "clamp(300px, 60vw, 900px)", height: "clamp(100px, 20vw, 240px)" }}>
            <VaporizeTextCycle
              texts={["DRES"]}
              font={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(100px, 20vw, 240px)",
                fontWeight: 900,
              }}
              color="rgb(0, 102, 255)"
              spread={4}
              density={6}
              animation={{
                vaporizeDuration: 3,
                fadeInDuration: 2,
                waitDuration: 0.8,
              }}
              direction="left-to-right"
              alignment="left"
              tag={Tag.H1}
            />
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          className="font-mono tracking-[0.3em] text-[#8892A4] uppercase mt-8 text-center"
          style={{ fontSize: "clamp(12px, 2vw, 24px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Soluciones Informáticas
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[10px] text-[#8892A4] tracking-[0.25em] uppercase font-mono">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#0066FF]/60 to-transparent animate-scroll-bounce" />
        </motion.div>
      </motion.div>
    </section>
  )
}
