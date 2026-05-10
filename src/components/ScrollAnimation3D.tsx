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

  // Redimensionar canvas al tamaño real del elemento (DPR-aware)
  const sizeCanvas = (canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return false;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    return true;
  };

  // Dibujar frame con cover-fit
  const paint = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img?.complete || !img.naturalWidth) return;
    if (!sizeCanvas(canvas)) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const dw = canvas.offsetWidth;
    const dh = canvas.offsetHeight;
    const ia = img.naturalWidth / img.naturalHeight;
    const ca = dw / dh;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let w = dw, h = dh, x = 0, y = 0;
    if (ia > ca) { w = dh * ia; x = (dw - w) / 2; }
    else { h = dw / ia; y = (dh - h) / 2; }

    ctx.drawImage(img, x, y, w, h);
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
        if (i === 0) paint(img);
        setLoadedCount(done);
      };
      img.onerror = () => { done++; setLoadedCount(done); };
      imgs.push(img);
    }
    images.current = imgs;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll → frame con RAF throttle
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

      if (idx !== currentFrame.current) {
        currentFrame.current = idx;
        const img = images.current[idx];
        if (img?.complete) paint(img);
      }
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Primer paint diferido: esperar a que el layout esté completo
    // (requestAnimationFrame garantiza que offsetWidth ya tiene valor real)
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const img = images.current[0];
      if (img?.complete) paint(img);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize: recalcular canvas y repintar frame actual
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Forzar recálculo de dimensiones
        canvas.width = 0;
        canvas.height = 0;
      }
      const img = images.current[currentFrame.current];
      if (img?.complete) paint(img);
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
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100dvh' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Gradiente inferior — fluye hacia Services */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: '18vh', background: 'linear-gradient(to bottom, transparent, #060B12)' }}
        />

        {/* Barra de carga */}
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
