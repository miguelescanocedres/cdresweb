"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Automatizaciones",
    description:
      "Eliminamos tareas repetitivas de tu operación. Conectamos tus herramientas y hacemos que trabajen solas, 24/7, sin errores humanos.",
    tags: ["n8n", "Make", "Zapier", "APIs"],
    accent: "#0066FF",
    accentRgb: "0,102,255",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Bots Inteligentes",
    description:
      "Bots para WhatsApp, Telegram, web y más. Atención al cliente, ventas y soporte automatizado con IA que entiende el contexto.",
    tags: ["WhatsApp", "Telegram", "Web", "IA"],
    accent: "#00D4FF",
    accentRgb: "0,212,255",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Agentes de IA",
    description:
      "Agentes autónomos que piensan, deciden y actúan en nombre de tu negocio. Desde investigación hasta ejecución de tareas complejas.",
    tags: ["Claude", "GPT-4", "Langchain", "MCP"],
    accent: "#B3C5FF",
    accentRgb: "179,197,255",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Desarrollo Web",
    description:
      "Sitios y aplicaciones web de alto rendimiento. Diseño premium, velocidad real y conversión optimizada desde el primer pixel.",
    tags: ["Next.js", "React", "Tailwind", "Node"],
    accent: "#00E479",
    accentRgb: "0,228,121",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "SaaS a Medida",
    description:
      "Convertimos tu idea en un producto de software escalable. Desde el MVP hasta la arquitectura que soporta miles de usuarios.",
    tags: ["SaaS", "MVP", "Escalable", "Cloud"],
    accent: "#FF8C6B",
    accentRgb: "255,140,107",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

export function Services() {
  return (
    <section id="servicios" className="py-28" style={{ background: "#0A1020" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-[#0066FF] uppercase mb-4">
            // Lo que construimos
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Servicios que generan{" "}
            <span className="gradient-text">resultados</span>
          </h2>
          <p className="text-[#8892A4] max-w-lg mx-auto leading-relaxed">
            No vendemos horas. Vendemos el ahorro de tiempo y el aumento de eficiencia
            que nuestros sistemas generan para tu empresa.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Featured card — col-span-2 */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="md:col-span-2 group relative rounded-2xl p-8 cursor-pointer overflow-hidden flex flex-col md:flex-row gap-8"
            style={{
              background: "linear-gradient(145deg, rgba(14,21,37,0.95), rgba(10,16,32,0.95))",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top left, rgba(${services[0].accentRgb},0.1) 0%, transparent 55%)` }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, rgba(${services[0].accentRgb},0.7), transparent)` }}
            />
            <div className="flex-1 relative z-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `rgba(${services[0].accentRgb},0.1)`, color: services[0].accent, border: `1px solid rgba(${services[0].accentRgb},0.2)` }}
              >
                {services[0].icon}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">{services[0].title}</h3>
              <p className="text-[#8892A4] text-sm leading-relaxed mb-5">{services[0].description}</p>
              <div className="flex flex-wrap gap-2">
                {services[0].tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-md font-mono"
                    style={{ background: `rgba(${services[0].accentRgb},0.08)`, color: services[0].accent, border: `1px solid rgba(${services[0].accentRgb},0.15)` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Visual accent */}
            <div className="relative z-10 flex items-center justify-center md:w-40 flex-shrink-0">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, rgba(${services[0].accentRgb},0.15) 0%, transparent 70%)`, filter: "blur(12px)" }} />
                <div className="absolute inset-4 rounded-full border" style={{ borderColor: `rgba(${services[0].accentRgb},0.3)`, animation: "spin 12s linear infinite" }} />
                <div className="absolute inset-8 rounded-full border" style={{ borderColor: `rgba(${services[0].accentRgb},0.5)`, animation: "spin 8s linear infinite reverse" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full" style={{ background: `radial-gradient(circle, rgba(${services[0].accentRgb},0.9), rgba(${services[0].accentRgb},0.3))`, boxShadow: `0 0 20px rgba(${services[0].accentRgb},0.6)` }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — 1x1 */}
          {services.slice(1, 5).map((service, idx) => (
            <motion.div
              key={idx + 1}
              custom={idx + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-7 cursor-pointer overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(14,21,37,0.9), rgba(10,16,32,0.9))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, rgba(${service.accentRgb},0.08) 0%, transparent 60%)` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${service.accentRgb},0.6), transparent)` }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative z-10"
                style={{ backgroundColor: `rgba(${service.accentRgb},0.1)`, color: service.accent, border: `1px solid rgba(${service.accentRgb},0.2)` }}
              >
                {service.icon}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold text-white mb-2 relative z-10">{service.title}</h3>
              <p className="text-[#8892A4] text-sm leading-relaxed mb-4 relative z-10">{service.description}</p>
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ background: `rgba(${service.accentRgb},0.08)`, color: service.accent, border: `1px solid rgba(${service.accentRgb},0.15)` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* CTA card — col-span-2 */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="md:col-span-2 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(0,102,255,0.12), rgba(0,212,255,0.04))",
              border: "1px solid rgba(0,102,255,0.2)",
              boxShadow: "0 0 40px rgba(0,102,255,0.06)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(0,212,255,0.07) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <p className="text-xs font-mono text-[#00D4FF] uppercase tracking-[0.2em] mb-3">¿Tienes algo en mente?</p>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-2">Construimos soluciones personalizadas</h3>
              <p className="text-[#8892A4] text-sm leading-relaxed max-w-md">Si tu problema no encaja en una categoría estándar, mejor. Eso es exactamente lo que hacemos.</p>
            </div>
            <a
              href="#contacto"
              className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white gradient-blue px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity glow-blue"
            >
              Hablemos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
