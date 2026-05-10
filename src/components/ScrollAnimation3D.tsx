'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FRAME_BASE = '/frames/frame_';

export function ScrollAnimation3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const raf = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // paint — cover-fit, recalcula dimensiones desde el elemento real
  const paint = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return;

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // contain: imagen completa sin recorte, centrada, fondo negro
    const ia = img.naturalWidth / img.naturalHeight;
    const ca = w / h;
    let dw: number, dh: number, dx: number, dy: number;
    if (ia > ca) {
      dw = w; dh = w / ia;
      dx = 0; dy = (h - dh) / 2;
    } else {
      dh = h; dw = h * ia;
      dx = (w - dw) / 2; dy = 0;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  const paintCurrent = () => {
    const img = images.current[currentFrame.current];
    if (img?.complete) paint(img);
  };

  // Precarga progresiva
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let done = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = `${FRAME_BASE}${String(i + 1).padStart(6, '0')}.jpg`;
      img.onload = () => {
        done++;
        if (i === 0) paintCurrent();
        setLoadedCount(done);
      };
      img.onerror = () => { done++; setLoadedCount(done); };
      imgs.push(img);
    }
    images.current = imgs;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ResizeObserver — pinta cuando el canvas recibe dimensiones reales
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => paintCurrent());
    ro.observe(canvas);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll → avanza frames + oculta hint
  useEffect(() => {
    const tick = () => {
      raf.current = 0;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);

      // Ocultar hint al primer scroll dentro de la sección
      if (scrolled > 10) setShowHint(false);

      const progress = Math.min(1, scrolled / scrollable);
      const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

      currentFrame.current = idx;
      const img = images.current[idx];
      if (img?.complete) paint(img);
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize de ventana
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (canvas) { canvas.width = 0; canvas.height = 0; }
      paintCurrent();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const loading = loadedCount < TOTAL_FRAMES;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: '500vh' }}
    >
      {/*
        sticky: usa min-h con fallback para iOS Safari
        - 100dvh: descuenta barra browser en mobile
        - fallback a 100vh para browsers sin soporte dvh
      */}
      <div
        ref={stickyRef}
        className="scroll3d-sticky sticky top-0 w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Gradiente inferior — funde hacia Services (#060B12) */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: '18vh', background: 'linear-gradient(to bottom, transparent, #060B12)' }}
        />

        {/* Scroll hint — aparece al inicio, desaparece al scrollear */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[10px] text-white/50 tracking-[0.25em] uppercase font-mono">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-scroll-bounce" />
        </motion.div>

        {/* Barra de carga */}
        {loading && (
          <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
            <div
              className="h-full bg-blue-500 transition-all duration-75"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
