"use client"

import { useEffect, useState } from "react"
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect"

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showContent, setShowContent] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false)
      onComplete()
    }, 6000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!showContent) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
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

      {/* Vaporize Text Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <VaporizeTextCycle
          texts={["CDRES"]}
          font={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "140px",
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
          alignment="center"
          tag={Tag.H1}
        />
      </div>

      {/* Tagline below */}
      <div className="absolute bottom-16 left-0 right-0 text-center z-10 pointer-events-none">
        <p className="text-xs md:text-sm font-mono tracking-[0.3em] text-[#8892A4] uppercase">
          Soluciones Informáticas
        </p>
      </div>
    </div>
  )
}
