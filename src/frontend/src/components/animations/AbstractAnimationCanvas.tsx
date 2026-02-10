import { useEffect, useRef } from 'react';
import type { ColorPalette } from '../../backend';
import { getPresetRenderer } from './presets';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsCoarsePointer } from '../../hooks/useIsCoarsePointer';

interface AbstractAnimationCanvasProps {
  preset: string;
  palette: ColorPalette;
  isVisible: boolean;
}

export default function AbstractAnimationCanvas({
  preset,
  palette,
  isVisible,
}: AbstractAnimationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderer = getPresetRenderer(preset);
    let time = 0;

    const animate = () => {
      if (!isVisible || prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 0.01;
      renderer(ctx, canvas.width, canvas.height, time, palette, isCoarsePointer);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [preset, palette, isVisible, prefersReducedMotion, isCoarsePointer]);

  return <canvas ref={canvasRef} className="h-full w-full opacity-40" />;
}
