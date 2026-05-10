'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FRAME_PATH = '/frames/frame_';

interface ScrollAnimation3DProps {
  title?: string;
  description?: string;
}

export function ScrollAnimation3D({
  title = 'CDRES en Acción',
  description = 'Automatización inteligente transformando procesos manuales en sistemas escalables',
}: ScrollAnimation3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameImagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const canvasSizedRef = useRef(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  // Precargar frames progresivamente — arrancar con frame 0 visible apenas cargue
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const onLoad = (i: number) => {
      loaded++;
      // Mostrar primer frame apenas esté listo
      if (i === 0) drawFrame(images[0]);
      // Marcar como ready cuando llegamos al 100%
      if (loaded === TOTAL_FRAMES) setReady(true);
      setLoadedCount(loaded);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(6, '0');
      img.src = `${FRAME_PATH}${frameNum}.jpg`;
      img.onload = () => onLoad(i);
      img.onerror = () => onLoad(i);
      images[i] = img;
    }

    frameImagesRef.current = images;
  }, []);

  // Inicializar dimensiones del canvas una sola vez (evitar resize en cada frame)
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || canvasSizedRef.current) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    canvasSizedRef.current = true;
  };

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    initCanvas();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.offsetWidth;
    const displayH = canvas.offsetHeight;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Cover: escalar para cubrir todo el canvas manteniendo aspect ratio
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayW / displayH;

    let drawW = displayW;
    let drawH = displayH;
    let ox = 0;
    let oy = 0;

    if (imgAspect > canvasAspect) {
      drawW = displayH * imgAspect;
      ox = (displayW - drawW) / 2;
    } else {
      drawH = displayW / imgAspect;
      oy = (displayH - drawH) / 2;
    }

    ctx.drawImage(img, ox, oy, drawW, drawH);
  };

  // Scroll handler — mapea scroll a frame index con RAF throttling
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== undefined && rafRef.current !== 0) return;

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) { rafRef.current = 0; return; }

        const rect = container.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const totalScroll = rect.height - viewportH;

        // Progreso basado en cuánto se ha scrolleado dentro del sticky container
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, scrolled / totalScroll);

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          const img = frameImagesRef.current[frameIndex];
          if (img?.complete) drawFrame(img);
        }

        rafRef.current = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Manejar resize de ventana
  useEffect(() => {
    const handleResize = () => {
      canvasSizedRef.current = false;
      const img = frameImagesRef.current[currentFrameRef.current];
      if (img?.complete) drawFrame(img);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const isLoading = loadedCount < TOTAL_FRAMES;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Canvas principal */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Barra de progreso de carga */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div
              className="h-0.5 bg-blue-500 transition-all duration-100"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        )}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

        {/* Texto superpuesto */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {ready && (
            <div className="max-w-2xl text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 drop-shadow-md">{description}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
