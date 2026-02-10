import { useState } from 'react';
import type { AnimeEntry } from '../../backend';

interface AnimePosterProps {
  anime: AnimeEntry;
}

export default function AnimePoster({ anime }: AnimePosterProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterSrc = imageError || !anime.posterUrl
    ? '/assets/generated/abstract-poster-placeholder.dim_1600x2400.png'
    : anime.posterUrl;

  return (
    <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
      <img
        src={posterSrc}
        alt={`${anime.title} poster`}
        loading="lazy"
        decoding="async"
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
    </div>
  );
}
