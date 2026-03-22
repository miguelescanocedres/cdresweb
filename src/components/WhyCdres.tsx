"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Velocidad real",
    description: "No somos la agencia que tarda 3 meses en entregar algo simple. Primeros resultados en días.",
    color: "#0066FF",
    colorRgb: "0,102,255",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Foco en apalancamiento",
    description: "No automatizamos procesos mediocres. Primero optimizamos, luego escalamos con tecnología.",
    color: "#00D4FF",
    colorRgb: "0,212,255",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Soluciones que escalan",
    description: "Todo lo que construimos soporta 10x el volumen actual sin romperse. Arquitectura pensada para crecer.",
    color: "#B3C5FF",
    colorRgb: "179,197,255",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Comunicación directa",
    description: "Sin intermediarios, sin cuentas ejecutivas. Hablás directamente con quien construye tu solución.",
    color: "#00E479",
    colorRgb: "0,228,121",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Orientado a resultados",
    description: "Medimos todo. Tasas de conversión, tiempo ahorrado, errores reducidos. Datos reales, no promesas.",
    color: "#FF8C6B",
    colorRgb: "255,140,107",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
    title: "Sin lock-in",
    description: "Las soluciones son tuyas. Código abierto, documentado, sin dependencias propietarias ocultas.",
    color: "#B3C5FF",
    colorRgb: "179,197,255",
  },
];

const stats = [
  { value: "10+", label: "Proyectos" },
  { value: "5", label: "Servicios" },
  { value: "24h", label: "Respuesta" },
];

export function WhyCdres() {
  return (
    <section id="nosotros" className="py-28 relative overflow-hidden" style={{ background: "#0A1020" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle at top right, rgba(0,102,255,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-xs font-mono tracking-[0.25em] text-[#0066FF] uppercase mb-4">
              // Por qué Cdres
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              No somos otra{" "}
              <span className="gradient-text">agencia</span>
            </h2>
            <p className="text-[#8892A4] leading-relaxed mb-5">
              La mayoría de las agencias vende horas. Nosotros vendemos el ahorro de tiempo
              y el aumento de eficiencia que nuestros sistemas generan para tu empresa.
            </p>
            <p className="text-[#8892A4] leading-relaxed mb-10">
              Trabajamos con empresas que quieren tecnología que funciona, no con las que
              buscan la opción más barata. Si buscás apalancamiento real, podemos conversar.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="text-center p-5 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(14,21,37,0.8), rgba(10,16,32,0.8))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at top, rgba(0,102,255,0.06) 0%, transparent 70%)",
                    }}
                  />
                  <div className="font-[family-name:var(--font-heading)] text-3xl font-bold gradient-text mb-1 relative z-10">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#8892A4] uppercase tracking-wider relative z-10">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — differentiator grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-5 cursor-default overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, rgba(14,21,37,0.8), rgba(10,16,32,0.8))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, rgba(${item.colorRgb},0.06) 0%, transparent 65%)`,
                  }}
                />

                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 relative z-10"
                  style={{
                    backgroundColor: `rgba(${item.colorRgb},0.1)`,
                    color: item.color,
                    border: `1px solid rgba(${item.colorRgb},0.2)`,
                  }}
                >
                  {item.icon}
                </div>
                <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-white mb-2 relative z-10">
                  {item.title}
                </h4>
                <p className="text-xs text-[#8892A4] leading-relaxed relative z-10">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
