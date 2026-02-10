import { useAnimeList } from '../hooks/useAnimeList';
import AnimeSection from '../components/gallery/AnimeSection';
import Footer from '../components/Footer';

export default function GalleryPage() {
  const { data: animeList, isLoading, error } = useAnimeList();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="glass-panel px-8 py-6">
          <p className="cinematic-body text-muted-foreground">Loading anime archive...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="glass-panel px-8 py-6">
          <p className="cinematic-body text-destructive">Failed to load anime data</p>
        </div>
      </div>
    );
  }

  if (!animeList || animeList.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="glass-panel px-8 py-6">
          <p className="cinematic-body text-muted-foreground">No anime entries found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {animeList.map((anime, index) => (
        <AnimeSection key={anime.id.toString()} anime={anime} index={index} />
      ))}
      <Footer />
    </div>
  );
}
