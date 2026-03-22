"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/5 py-3"
          : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-baseline">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay: 0.1 }}
              className="text-xl font-bold text-white tracking-tight font-[family-name:var(--font-heading)]"
            >
              C
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay: 0.22 }}
              className="text-xl font-bold tracking-tight font-[family-name:var(--font-heading)] text-[#0066FF]"
            >
              dres
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "backOut", delay: 0.45 }}
              className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-[#00E479] glow-emerald"
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#C2C6D8] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="#contacto"
            className="gradient-blue text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity glow-blue"
          >
            Agendar llamada
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#C2C6D8] hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 mt-3 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#C2C6D8] hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            className="gradient-blue text-white text-sm font-medium px-5 py-2.5 rounded-md text-center"
            onClick={() => setMenuOpen(false)}
          >
            Agendar llamada
          </Link>
        </div>
      )}
    </nav>
  );
}
