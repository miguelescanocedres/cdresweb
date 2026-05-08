"use client"

import { motion } from "framer-motion"
import { ParticleTextEffect } from "@/components/ui/particle-text-effect"
import { useReducedMotion } from "framer-motion"

export function ParticleHero() {
  const prefersReducedMotion = useReducedMotion()

  // Fallback para usuarios que prefieren reducir movimiento
  if (prefersReducedMotion) {
    return (
      <section className="relative py-24 px-6 bg-[#060B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white mb-6">
              Tecnología en<span className="gradient-text-animated"> Movimiento</span>
            </h2>
            <p className="text-[#C2C6D8] text-lg max-w-2xl mx-auto">
              Nuestras soluciones inteligentes transforman datos en acción inmediata
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-20 px-6 bg-[#060B12] overflow-hidden">
      {/* Glow accents */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%", right: "10%",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-12 z-10 relative"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-4">
            Tecnología en<span className="gradient-text-animated"> Movimiento</span>
          </h2>
          <p className="text-[#C2C6D8] text-base md:text-lg max-w-2xl mx-auto">
            Nuestras soluciones inteligentes transforman datos en acción inmediata
          </p>
        </motion.div>

        {/* Particle Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="z-10 relative"
        >
          <ParticleTextEffect
            words={["CDRES", "AUTOMATIZACIÓN", "IA", "VELOCIDAD"]}
            particleColors={[
              { r: 0, g: 102, b: 255 },     // #0066FF
              { r: 0, g: 153, b: 255 },     // #0099FF
              { r: 0, g: 76, b: 204 },      // #004CCC
              { r: 51, g: 136, b: 255 },    // #3388FF
              { r: 25, g: 118, b: 210 },    // #1976D2
            ]}
            canvasWidth={1000}
            canvasHeight={500}
            maxParticles={1200}
            wordChangeSpeed={120}
          />
        </motion.div>

        {/* Description below canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-10 z-10 relative"
        >
          <p className="text-[#8892A4] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Cada partícula representa un proceso automático. Haz clic y arrastra para explorar cómo
            conectamos tu visión con la tecnología más avanzada.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
