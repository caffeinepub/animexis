import { useEffect, useRef, useState } from 'react';
import type { AnimeEntry } from '../../backend';
import AbstractAnimationCanvas from '../animations/AbstractAnimationCanvas';
import GlassPanel from './GlassPanel';
import AnimePoster from './AnimePoster';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface AnimeSectionProps {
  anime: AnimeEntry;
  index: number;
}

export default function AnimeSection({ anime, index }: AnimeSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bgGradient = `linear-gradient(135deg, ${anime.colorPalette.background}15 0%, ${anime.colorPalette.primary}10 50%, ${anime.colorPalette.secondary}08 100%)`;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{
        background: bgGradient,
      }}
    >
      {/* Background animation canvas */}
      <div className="absolute inset-0 z-0">
        <AbstractAnimationCanvas
          preset={anime.animationPreset}
          palette={anime.colorPalette}
          isVisible={isVisible}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 py-12 transition-all duration-1000 ease-out lg:grid-cols-2 lg:gap-12 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Poster */}
        <div className="flex items-center justify-center">
          <AnimePoster anime={anime} />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center">
          <GlassPanel>
            <h2
              className="cinematic-section-title mb-4 glow-on-hover"
              style={{ color: anime.colorPalette.primary }}
            >
              {anime.title}
            </h2>
            <p className="cinematic-body mb-4 leading-relaxed text-foreground/90">
              {anime.summary}
            </p>
            <div className="flex items-center gap-3">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: `${anime.colorPalette.accent}20`,
                  color: anime.colorPalette.accent,
                  border: `1px solid ${anime.colorPalette.accent}40`,
                }}
              >
                {anime.genre}
              </span>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
