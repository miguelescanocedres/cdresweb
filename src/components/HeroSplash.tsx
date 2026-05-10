"use client"

import { motion } from "framer-motion"

const LETTERS = [
  { char: "C", color: "#FFFFFF", shadow: "0 0 60px rgba(255,255,255,0.35), 0 0 120px rgba(255,255,255,0.12)", delay: 0 },
  { char: "D", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.18 },
  { char: "R", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.36 },
  { char: "E", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.54 },
  { char: "S", color: "#0066FF", shadow: "0 0 60px rgba(0,102,255,0.7), 0 0 120px rgba(0,102,255,0.3)", delay: 0.72 },
]

export function HeroSplash() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060B12" }}
      aria-label="CDRES INTEC — Soluciones Informáticas"
    >
      {/* Gradiente superior — transición desde sección anterior */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{ height: '14vh', background: 'linear-gradient(to bottom, #060B12, transparent)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none animate-glow-pulse"
        style={{
          top: "10%", left: "10%",
          width: "clamp(300px, 50vw, 700px)",
          height: "clamp(300px, 50vw, 700px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,102,255,0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", right: "5%",
          width: "clamp(200px, 35vw, 500px)",
          height: "clamp(200px, 35vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4">

        {/* Letras CDRES — disparan al entrar en viewport */}
        <div
          className="flex items-baseline leading-none select-none justify-center flex-wrap"
          style={{
            fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px, 16vw, 220px)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          {LETTERS.map(({ char, color, shadow, delay }) => (
            <motion.span
              key={char + delay}
              initial={{ opacity: 0, scale: 0.4, filter: "blur(32px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.1,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ color, textShadow: shadow, display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* INTEC */}
        <motion.div
          className="flex items-center gap-3 mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="h-px w-6 sm:w-8 bg-[#8892A4]/40" />
          <span
            style={{
              fontFamily: "var(--font-heading), Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(14px, 3.5vw, 52px)",
              letterSpacing: "0.25em",
              color: "#8892A4",
            }}
          >
            INTEC
          </span>
          <div className="h-px w-6 sm:w-8 bg-[#8892A4]/40" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-mono tracking-[0.25em] sm:tracking-[0.35em] text-[#5A6070] uppercase mt-6 sm:mt-8 text-center"
          style={{ fontSize: "clamp(9px, 1.2vw, 16px)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 1.3, duration: 0.9 }}
        >
          Soluciones Informáticas
        </motion.p>
      </div>
    </section>
  )
}
