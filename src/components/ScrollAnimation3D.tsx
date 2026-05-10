'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 192;
const FRAME_BASE = '/frames/frame_';

export function ScrollAnimation3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const raf = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState(0);

  // paint — siempre recalcula dimensiones desde offsetWidth/Height actuales
  const paint = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return;

    // Solo redimensiona si cambió (evita flush de layout innecesario)
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // cover-fit: imagen cubre todo el canvas sin letterbox
    const ia = img.naturalWidth / img.naturalHeight;
    const ca = w / h;
    let dw = w, dh = h, dx = 0, dy = 0;
    if (ia > ca) { dw = h * ia; dx = (w - dw) / 2; }
    else         { dh = w / ia; dy = (h - dh) / 2; }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
        // frame 0: intentar pintar — si el canvas ya tiene tamaño, dibuja; si no, ResizeObserver lo hará
        if (i === 0) paintCurrent();
        setLoadedCount(done);
      };
      img.onerror = () => { done++; setLoadedCount(done); };
      imgs.push(img);
    }
    images.current = imgs;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ResizeObserver — dispara cuando el canvas recibe dimensiones reales del browser
  // Esto garantiza el primer paint sin importar el orden carga-vs-layout
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(() => {
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
    // Trigger inmediato para calcular frame correcto si página ya scrolleó
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize de ventana — forzar recálculo y repaint
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Reset dimensiones para forzar recálculo en próximo paint
        canvas.width = 0;
        canvas.height = 0;
      }
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
      {/* sticky: ocupa 100dvh — dvh descuenta barra browser en mobile */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100dvh' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Gradiente inferior — funde hacia #060B12 (fondo de Services) */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: '18vh', background: 'linear-gradient(to bottom, transparent, #060B12)' }}
        />

        {/* Barra de carga discreta */}
        {loading && (
          <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
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
