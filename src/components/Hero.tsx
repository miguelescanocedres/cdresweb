"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay },
  }),
};

const trustItems = [
  { value: "10+", label: "proyectos" },
  { value: "98%", label: "satisfacción" },
  { value: "24h", label: "respuesta" },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on right column (AnimatedBrandText)
      gsap.to(rightColumnRef.current, {
        y: -50,
        ease: "power1.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Subtle float animation on left text
      gsap.to(leftColumnRef.current, {
        y: 30,
        ease: "power1.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#060B12" }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />


      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none animate-glow-pulse"
        style={{
          top: "15%", left: "5%",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", right: "5%",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <div ref={leftColumnRef} className="flex flex-col gap-8 z-10">
          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full glass border border-[#0066FF]/20 glow-blue"
          >
            <span className="relative w-2 h-2 rounded-full bg-[#00E479] pulse-dot" />
            <span className="text-xs font-medium text-[#C2C6D8] tracking-widest uppercase">
              Tecnología · Automatización · Resultados
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.15}
            variants={fadeUp}
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] tracking-tight"
          >
            Transformamos tu negocio con{" "}
            <span className="gradient-text-animated">soluciones inteligentes</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial="hidden"
            animate="show"
            custom={0.3}
            variants={fadeUp}
            className="text-[#C2C6D8] text-lg leading-relaxed max-w-lg"
          >
            Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS
            a medida para empresas que quieren crecer sin fricción.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={0.45}
            variants={fadeUp}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#servicios"
              className="gradient-blue text-white font-semibold px-7 py-3.5 rounded-lg hover:opacity-90 hover:scale-[1.02] transition-all glow-blue text-sm tracking-wide focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B12]"
            >
              Ver servicios
            </Link>
            <Link
              href="#contacto"
              className="text-white font-semibold px-7 py-3.5 rounded-lg border border-white/10 hover:border-[#0066FF]/40 hover:bg-white/5 hover:scale-[1.02] transition-all text-sm tracking-wide focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B12]"
            >
              Agendar llamada
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={0.6}
            variants={fadeUp}
            className="flex items-center gap-10 pt-2"
          >
            {trustItems.map((item, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">
                  {item.value}
                </span>
                <span className="text-xs text-[#8892A4] uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — Animated brand letters */}
        <div ref={rightColumnRef} className="relative flex flex-col items-center justify-center gap-8 z-10">
          <AnimatedBrandText />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] text-[#8892A4] tracking-[0.25em] uppercase font-mono">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#0066FF]/60 to-transparent animate-scroll-bounce" />
      </motion.div>
    </section>
  );
}

const brandLetters = [
  { char: "C", color: "#FFFFFF", delay: 0.2 },
  { char: "D", color: "#0066FF", delay: 0.35 },
  { char: "R", color: "#0066FF", delay: 0.5 },
  { char: "E", color: "#0066FF", delay: 0.65 },
  { char: "S", color: "#0066FF", delay: 0.8 },
];

function AnimatedBrandText() {
  return (
    <div className="flex flex-col items-center gap-6 select-none">
      {/* Glow behind the text */}
      <div className="relative">
        <div
          className="absolute inset-0 pointer-events-none animate-glow-pulse"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,102,255,0.22) 0%, transparent 70%)",
            filter: "blur(32px)",
            transform: "scale(1.4)",
          }}
        />
        <div className="relative flex items-baseline gap-[0.02em]">
          {brandLetters.map(({ char, color, delay }) => (
            <motion.span
              key={char}
              initial={{ opacity: 0, scale: 0.2, filter: "blur(28px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay, ease: [0.25, 0.4, 0.25, 1] }}
              className="font-black font-[family-name:var(--font-heading)] leading-none tracking-tight"
              style={{
                fontSize: "clamp(56px, 9vw, 130px)",
                color,
                textShadow:
                  color === "#0066FF"
                    ? "0 0 48px rgba(0,102,255,0.55), 0 0 80px rgba(0,102,255,0.2)"
                    : "none",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Tagline below */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="text-xs font-mono tracking-[0.3em] text-[#8892A4] uppercase"
      >
        Soluciones Informáticas
      </motion.p>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="flex gap-4"
      >
        <div
          className="glass border border-white/10 rounded-2xl px-5 py-3 animate-float"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
        >
          <div className="text-[10px] text-[#00E479] font-mono tracking-widest mb-1">● UPTIME</div>
          <div className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">99.9%</div>
        </div>
        <div
          className="glass border border-white/10 rounded-2xl px-5 py-3 animate-float-delayed"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
        >
          <div className="text-[10px] text-[#00D4FF] font-mono tracking-widest mb-1">● FLUJOS ACTIVOS</div>
          <div className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">500+</div>
        </div>
      </motion.div>
    </div>
  );
}
