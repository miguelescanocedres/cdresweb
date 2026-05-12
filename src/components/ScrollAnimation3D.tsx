'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FRAME_BASE = '/frames/frame_';
const VIDEO_ASPECT = 16 / 9; // 1920×1080

export function ScrollAnimation3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const raf = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [stickyH, setStickyH] = useState('100dvh');
  const [sectionH, setSectionH] = useState('220dvh');
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  // Dibuja img en canvas — canvas tiene exactamente el aspect ratio del video,
  // así que siempre es un fill 1:1 sin barras ni recorte
  const paint = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return;

    // Solo redimensiona si cambió (evita flush de layout)
    const tw = Math.round(w * dpr);
    const th = Math.round(h * dpr);
    if (canvas.width !== tw || canvas.height !== th) {
      canvas.width = tw;
      canvas.height = th;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const portrait = w < h;
    if (portrait) {
      // Cover-fit: escala para cubrir todo el canvas, recorta lo que sobra
      const ia = img.naturalWidth / img.naturalHeight;
      const ca = w / h;
      let dw = w, dh = h, dx = 0, dy = 0;
      if (ia > ca) { dh = h; dw = h * ia; dx = (w - dw) / 2; }
      else         { dw = w; dh = w / ia; dy = (h - dh) / 2; }
      ctx.drawImage(img, dx, dy, dw, dh);
    } else {
      // Landscape/desktop: fill directo (canvas ya tiene aspect ratio del video)
      ctx.drawImage(img, 0, 0, w, h);
    }
  };

  const paintCurrent = () => {
    const img = images.current[currentFrame.current];
    if (img?.complete && img.naturalWidth) paint(img);
  };

  // Precarga — frame 0 dispara primer paint con retry hasta que el canvas tenga dimensiones
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let done = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = `${FRAME_BASE}${String(i + 1).padStart(6, '0')}.jpg`;
      img.onload = () => {
        done++;
        if (i === 0) {
          // Retry hasta que el canvas tenga dimensiones reales
          const tryPaint = () => {
            const canvas = canvasRef.current;
            if (canvas && canvas.offsetWidth > 0) {
              paint(img);
            } else {
              requestAnimationFrame(tryPaint);
            }
          };
          tryPaint();
        }
        setLoadedCount(done);
      };
      img.onerror = () => { done++; setLoadedCount(done); };
      imgs.push(img);
    }
    images.current = imgs;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ResizeObserver — repinta al cambiar tamaño del canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      // Reset dimensiones para forzar recálculo
      canvas.width = 0;
      canvas.height = 0;
      paintCurrent();
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll → avanza frames
  useEffect(() => {
    const tick = () => {
      raf.current = 0;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);
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

  // Resize de ventana + calcular alturas reales
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const portrait = vw < vh; // portrait cuando el ancho es menor que el alto

      setIsMobilePortrait(portrait);

      if (portrait) {
        // Portrait mobile: canvas llena 100vw × 100dvh con cover
        // sectionH = vh*1.45 → scrollable = vh*0.45 > 0 → animación funciona, gap mínimo
        setStickyH(`${vh}px`);
        setSectionH(`${Math.round(vh * 1.45)}px`);
      } else {
        // Landscape / desktop: contain dentro del viewport
        const canvasH = Math.min(vh, vw / VIDEO_ASPECT);
        setStickyH(`${canvasH}px`);
        setSectionH(`${Math.round(vh * 2.2)}px`);
      }

      const canvas = canvasRef.current;
      if (canvas) { canvas.width = 0; canvas.height = 0; }
      requestAnimationFrame(() => paintCurrent());
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const loading = loadedCount < TOTAL_FRAMES;

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: sectionH, background: '#060B12' }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden flex items-start justify-center"
        style={{ height: stickyH, background: 'transparent' }}
      >
        <canvas
          ref={canvasRef}
          className="block"
          style={isMobilePortrait ? {
            // Portrait: llena pantalla completa, cover recorta lados del video
            width: '100vw',
            height: '100%',
            display: 'block',
          } : {
            // Landscape/desktop: contain sin barras
            aspectRatio: `${VIDEO_ASPECT}`,
            width: `min(100vw, calc(100dvh * ${VIDEO_ASPECT}))`,
            maxWidth: '100vw',
            maxHeight: '100dvh',
            display: 'block',
          }}
        />

        {/* Gradiente inferior */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: '28vh', background: 'linear-gradient(to bottom, transparent, #060B12)' }}
        />

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
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
