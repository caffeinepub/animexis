import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AnimeEntry } from '../backend';

export function useAnimeList() {
  const { actor, isFetching } = useActor();

  return useQuery<AnimeEntry[]>({
    queryKey: ['anime-list'],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      
      // First, try to get the anime list
      const animeList = await actor.getAllAnime();
      
      // Only initialize if we successfully got an empty list
      if (animeList.length === 0) {
        await actor.initialize();
        // Refetch once after initialization
        const refreshedList = await actor.getAllAnime();
        return refreshedList;
      }
      
      return animeList;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second between retries
  });
}
