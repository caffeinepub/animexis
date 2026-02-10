import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ParallaxLayersProps {
  children: ReactNode;
}

export default function ParallaxLayers({ children }: ParallaxLayersProps) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 20;

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div
        className="h-full w-full transition-transform duration-300 ease-out"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
