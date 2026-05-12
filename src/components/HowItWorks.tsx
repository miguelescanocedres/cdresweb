"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Mapeamos tu proceso actual. Identificamos dónde hay fricción, pérdida de tiempo y oportunidades de automatización.",
    detail: "Llamada de 30 min · Sin costo",
    color: "#0066FF",
    colorRgb: "0,102,255",
  },
  {
    number: "02",
    title: "Arquitectura",
    description:
      "Diseñamos la solución pensando en escalabilidad. Primero optimizamos el flujo, luego aplicamos tecnología.",
    detail: "Propuesta técnica detallada",
    color: "#00D4FF",
    colorRgb: "0,212,255",
  },
  {
    number: "03",
    title: "Construcción",
    description:
      "Desarrollamos en sprints cortos con entregables reales. Velocidad de implementación sobre perfección.",
    detail: "Demos semanales · Feedback continuo",
    color: "#B3C5FF",
    colorRgb: "179,197,255",
  },
  {
    number: "04",
    title: "Lanzamiento",
    description:
      "Deploy, monitoreo y capacitación a tu equipo. Nos aseguramos de que el sistema funcione sin vos.",
    detail: "Soporte post-lanzamiento incluido",
    color: "#00E479",
    colorRgb: "0,228,121",
  },
];

export function HowItWorks() {
  return (
    <section id="proceso" className="py-28 relative overflow-hidden" style={{ background: "#060B12" }}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(0,102,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-[#00E479] uppercase mb-4">
            // Nuestro proceso
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            De la idea al sistema{" "}
            <span className="gradient-text">que funciona</span>
          </h2>
          <p className="text-[#8892A4] max-w-lg mx-auto leading-relaxed">
            Un proceso probado, sin sorpresas. Sabés exactamente en qué etapa
            está tu proyecto en todo momento.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
                delay: i * 0.15,
              }}
              className="relative group"
            >
              {/* Connector line (desktop) — más visible con glow */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-full w-6 h-px z-0"
                  style={{
                    background: `linear-gradient(90deg, rgba(${step.colorRgb},0.7), rgba(${steps[i+1].colorRgb},0.3))`,
                    boxShadow: `0 0 6px rgba(${step.colorRgb},0.4)`,
                  }}
                />
              )}

              {/* Card */}
              <div
                className="relative rounded-2xl p-6 h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, rgba(14,21,37,0.9), rgba(10,16,32,0.9))",
                  border: `1px solid rgba(${step.colorRgb},0.15)`,
                  boxShadow: `0 0 0 1px rgba(${step.colorRgb},0.04), 0 4px 20px rgba(${step.colorRgb},0.06), inset 0 1px 0 rgba(255,255,255,0.03)`,
                }}
              >
                {/* Shimmer top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(${step.colorRgb},0.5), transparent)` }}
                />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, rgba(${step.colorRgb},0.1) 0%, transparent 65%)`,
                  }}
                />

                {/* Step number */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
                    style={{
                      background: `rgba(${step.colorRgb},0.12)`,
                      color: step.color,
                      border: `1px solid rgba(${step.colorRgb},0.2)`,
                      boxShadow: `0 0 16px rgba(${step.colorRgb},0.15)`,
                    }}
                  >
                    {step.number}
                  </div>
                  <div
                    className="h-px flex-1"
                    style={{ background: `linear-gradient(90deg, rgba(${step.colorRgb},0.3), transparent)` }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>
                  <span
                    className="inline-block text-xs font-mono px-3 py-1.5 rounded-lg"
                    style={{
                      background: `rgba(${step.colorRgb},0.08)`,
                      color: step.color,
                      border: `1px solid rgba(${step.colorRgb},0.15)`,
                    }}
                  >
                    {step.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
