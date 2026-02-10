import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function LetterByLetterTitle() {
  const [visibleCount, setVisibleCount] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const title = 'ANIMEXIS';
  const subtitle = 'An Abstract Archive of Anime Worlds';
  const ownerName = 'Created by Ashwath';

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(title.length);
      return;
    }

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= title.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, title.length]);

  return (
    <div className="text-center">
      <h1 className="cinematic-title mb-6 tracking-wider">
        {title.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all duration-500 ease-out"
            style={{
              opacity: index < visibleCount ? 1 : 0,
              transform: index < visibleCount ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {char}
          </span>
        ))}
      </h1>
      <p
        className="cinematic-subtitle text-muted-foreground transition-opacity duration-1000 ease-out"
        style={{
          opacity: visibleCount >= title.length ? 1 : 0,
        }}
      >
        {subtitle}
      </p>
      <p
        className="mt-8 text-xl font-light tracking-wide text-foreground/90 transition-opacity duration-1000 ease-out"
        style={{
          opacity: visibleCount >= title.length ? 1 : 0,
          transitionDelay: '300ms',
        }}
      >
        {ownerName}
      </p>
    </div>
  );
}
