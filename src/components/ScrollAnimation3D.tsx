'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 160;
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
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const frameImagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | undefined>(undefined);

  // Precargar todas las imágenes
  useEffect(() => {
    const loadFrames = async () => {
      const images: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(6, '0');
        img.src = `${FRAME_PATH}${frameNum}.jpg`;

        const promise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // No fallar si falta un frame
        });

        promises.push(promise);
        images.push(img);
      }

      await Promise.all(promises);
      frameImagesRef.current = images;
      setIsLoading(false);
    };

    loadFrames();
  }, []);

  // Renderizar frame actual en canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frameImagesRef.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = frameImagesRef.current[currentFrame];
    if (!img || !img.complete) return;

    // Usar device pixel ratio para HD
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mantener aspect ratio de la imagen
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawWidth = height * imgAspect;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgAspect;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [currentFrame]);

  // Scroll handler con RAF throttling
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calcular progreso del scroll (0-1) mientras el elemento está visible
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const scrollStart = viewportHeight;
        const scrollEnd = -elementHeight;

        const progress = Math.max(
          0,
          Math.min(1, (scrollStart - elementTop) / (scrollStart - scrollEnd))
        );

        const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
        setCurrentFrame(frameIndex);

        rafRef.current = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center bg-black">
        {/* Canvas animado */}
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm">Cargando animación...</p>
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
            style={{ maxHeight: '100vh' }}
          />

          {/* Overlay de gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

          {/* Contenido de texto superpuesto */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="max-w-2xl text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 drop-shadow-md">{description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
