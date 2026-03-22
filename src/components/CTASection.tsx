"use client";

import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section id="contacto" className="py-32 relative overflow-hidden" style={{ background: "#060B12" }}>
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-80 pointer-events-none" />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-glow-pulse"
        style={{
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(0,102,255,0.15) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Corner accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,102,255,0.3), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,102,255,0.15), transparent)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono tracking-[0.25em] text-[#00E479] uppercase mb-6"
        >
          // Empecemos
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          ¿Listo para hacer crecer{" "}
          <span className="gradient-text-animated">tu negocio?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8892A4] text-lg mb-12 leading-relaxed"
        >
          Agendá una llamada de 30 minutos. Sin costo, sin compromiso.
          Te decimos exactamente qué podríamos hacer por tu empresa.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:hola@cdres.com"
            className="gradient-blue text-white font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-all glow-blue text-sm inline-flex items-center gap-2 justify-center tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Agendar llamada gratuita
          </a>
          <a
            href="https://wa.me/59898331920?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold px-8 py-4 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all text-sm inline-flex items-center gap-2 justify-center tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M11.927 0C5.344 0 0 5.344 0 11.927c0 2.103.553 4.13 1.604 5.918L0 24l6.335-1.608A11.88 11.88 0 0011.927 23.854c6.583 0 11.927-5.344 11.927-11.927S18.51 0 11.927 0zm0 21.783a9.83 9.83 0 01-5.022-1.375l-.36-.214-3.73.979.993-3.63-.235-.373a9.83 9.83 0 01-1.507-5.243c0-5.426 4.415-9.841 9.841-9.841 5.426 0 9.841 4.415 9.841 9.841 0 5.427-4.415 9.856-9.821 9.856z" />
            </svg>
            WhatsApp
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-xs text-[#8892A4] tracking-wide"
        >
          Respondemos en menos de 24 horas · Sin spam · Sin compromiso
        </motion.p>
      </div>
    </section>
  );
}
