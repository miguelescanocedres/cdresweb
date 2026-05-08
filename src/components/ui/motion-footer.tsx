"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const STYLES = `
.motion-footer-wrapper {
  -webkit-font-smoothing: antialiased;
}

@keyframes hero-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
}

@keyframes hero-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-hero-breathe {
  animation: hero-breathe 8s ease-in-out infinite alternate;
}

.animate-hero-scroll-marquee {
  animation: hero-scroll-marquee 40s linear infinite;
}

.hero-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(0,102,255,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,102,255,0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.hero-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0,102,255,0.15) 0%,
    rgba(0,212,255,0.1) 40%,
    transparent 70%
  );
}

.hero-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  box-shadow:
    0 10px 30px -10px rgba(0,0,0,0.3),
    inset 0 1px 1px rgba(255,255,255,0.1);
  border: 1px solid rgba(0,102,255,0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border-color: rgba(0,102,255,0.4);
  box-shadow:
    0 20px 40px -10px rgba(0,102,255,0.2),
    inset 0 1px 1px rgba(255,255,255,0.15);
  color: #FFFFFF;
}

.hero-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,102,255,0.08);
  background: linear-gradient(180deg, rgba(0,102,255,0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.hero-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(0,102,255,0.15));
}
`

const MagneticButton = React.forwardRef<HTMLElement, any>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null)

    useEffect(() => {
      if (typeof window === "undefined") return
      const element = localRef.current
      if (!element) return

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect()
          const h = rect.width / 2
          const w = rect.height / 2
          const x = e.clientX - rect.left - h
          const y = e.clientY - rect.top - w

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          })
        }

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          })
        }

        element.addEventListener("mousemove", handleMouseMove as any)
        element.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any)
          element.removeEventListener("mouseleave", handleMouseLeave)
        }
      }, element)

      return () => ctx.revert()
    }, [])

    return (
      <Component
        ref={(node: HTMLElement) => {
          ;(localRef as any).current = node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) (forwardedRef as any).current = node
        }}
        className={`cursor-pointer ${className || ""}`}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MagneticButton.displayName = "MagneticButton"

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Soluciones Inteligentes</span> <span className="text-[#0066FF]/60">✦</span>
    <span>Automatización 24/7</span> <span className="text-[#00E479]/60">✦</span>
    <span>IA Escalable</span> <span className="text-[#0066FF]/60">✦</span>
    <span>Velocidad Máxima</span> <span className="text-[#00E479]/60">✦</span>
  </div>
)

export function MotionFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        [headingRef.current, ctaRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div ref={wrapperRef} className="relative h-screen w-full" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden text-[#C2C6D8] motion-footer-wrapper" style={{ background: "#060B12" }}>
          {/* Ambient Light & Grid */}
          <div className="hero-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-hero-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="hero-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div ref={giantTextRef} className="hero-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none">
            CDRES
          </div>

          {/* Top Marquee */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-[#0066FF]/20 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl" style={{ background: "rgba(6,11,18,0.6)" }}>
            <div className="flex w-max animate-hero-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-[#8892A4] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2 ref={headingRef} className="text-5xl md:text-7xl font-bold hero-text-glow tracking-tight mb-8 text-center">
              ¿Listo para transformar?
            </h2>

            <div ref={ctaRef} className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as="a" href="#contacto" className="hero-glass-pill px-10 py-4 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.5 3A1.5 1.5 0 001 4.5v11A1.5 1.5 0 002.5 17h15a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0017.5 3h-15z" />
                  </svg>
                  Agendar Llamada
                </MagneticButton>

                <MagneticButton as="a" href="#contacto" className="hero-glass-pill px-10 py-4 rounded-full text-[#C2C6D8] font-bold text-sm md:text-base border border-[#0066FF]/30 hover:border-[#0066FF]/60">
                  Explorar Servicios
                </MagneticButton>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
                <MagneticButton as="a" href="#" className="hero-glass-pill px-5 py-2 rounded-full text-[#8892A4] font-medium text-xs hover:text-[#C2C6D8]">
                  Automatización
                </MagneticButton>
                <MagneticButton as="a" href="#" className="hero-glass-pill px-5 py-2 rounded-full text-[#8892A4] font-medium text-xs hover:text-[#C2C6D8]">
                  IA & Bots
                </MagneticButton>
                <MagneticButton as="a" href="#" className="hero-glass-pill px-5 py-2 rounded-full text-[#8892A4] font-medium text-xs hover:text-[#C2C6D8]">
                  Desarrollo Web
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[#8892A4] text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © 2026 CDRES. All rights reserved.
            </div>

            <div className="hero-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-[#0066FF]/20">
              <span className="text-[#8892A4] text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted by</span>
              <span className="text-white font-black text-xs md:text-sm">CDRES</span>
            </div>

            <MagneticButton as="button" onClick={scrollToTop} className="w-12 h-12 rounded-full hero-glass-pill flex items-center justify-center text-[#8892A4] hover:text-white group order-3">
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  )
}
