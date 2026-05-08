"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "59898331920";
const WA_MESSAGE = "Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
            className="w-80 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #0E1525, #0A1020)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,102,255,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "linear-gradient(90deg, #128C7E, #25D366)" }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm font-[family-name:var(--font-heading)]">C</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight font-[family-name:var(--font-heading)]">
                    Cdres
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
                    <span className="text-white/80 text-xs">En línea</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors duration-150 cursor-pointer p-1"
                aria-label="Cerrar chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              {/* Timestamp */}
              <p className="text-center text-xs text-[#8892A4] mb-4">Hoy</p>

              {/* Message bubble */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="flex gap-2 mb-5"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "linear-gradient(135deg, #128C7E, #25D366)" }}
                >
                  <span className="text-white font-bold text-xs font-[family-name:var(--font-heading)]">C</span>
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[220px]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="text-white text-sm leading-relaxed">
                    Hola! Estamos disponibles para ayudarte. ¿En qué podemos trabajar juntos?
                  </p>
                  <p className="text-[#8892A4] text-xs mt-1.5 text-right">
                    {new Date().toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #128C7E, #25D366)",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M11.927 0C5.344 0 0 5.344 0 11.927c0 2.103.553 4.13 1.604 5.918L0 24l6.335-1.608A11.88 11.88 0 0011.927 23.854c6.583 0 11.927-5.344 11.927-11.927S18.51 0 11.927 0zm0 21.783a9.83 9.83 0 01-5.022-1.375l-.36-.214-3.73.979.993-3.63-.235-.373a9.83 9.83 0 01-1.507-5.243c0-5.426 4.415-9.841 9.841-9.841 5.426 0 9.841 4.415 9.841 9.841 0 5.427-4.415 9.856-9.821 9.856z" />
                </svg>
                Iniciar conversación
              </a>

              <p className="text-center text-xs text-[#8892A4] mt-3">
                Respondemos en menos de 24 horas
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting tooltip */}
      <AnimatePresence>
        {showGreeting && !open && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => { setOpen(true); setShowGreeting(false); }}
          >
            <div
              className="px-4 py-2.5 rounded-2xl rounded-br-sm text-sm text-white font-medium shadow-xl whitespace-nowrap"
              style={{
                background: "linear-gradient(145deg, #0E1525, #0A1020)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              Hola, ¿en qué te podemos ayudar? 👋
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
              className="w-5 h-5 rounded-full bg-[#1C2333] flex items-center justify-center text-[#8892A4] hover:text-white transition-colors flex-shrink-0"
              aria-label="Cerrar saludo"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => { setOpen(!open); setShowGreeting(false); }}
        className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        style={{
          background: "linear-gradient(135deg, #128C7E, #25D366)",
          boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
        aria-label="Abrir chat de WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="whatsapp"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M11.927 0C5.344 0 0 5.344 0 11.927c0 2.103.553 4.13 1.604 5.918L0 24l6.335-1.608A11.88 11.88 0 0011.927 23.854c6.583 0 11.927-5.344 11.927-11.927S18.51 0 11.927 0zm0 21.783a9.83 9.83 0 01-5.022-1.375l-.36-.214-3.73.979.993-3.63-.235-.373a9.83 9.83 0 01-1.507-5.243c0-5.426 4.415-9.841 9.841-9.841 5.426 0 9.841 4.415 9.841 9.841 0 5.427-4.415 9.856-9.821 9.856z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
