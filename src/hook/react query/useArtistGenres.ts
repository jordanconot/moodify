import { useQuery } from '@tanstack/react-query';
import { fetchArtistGenres } from '../../services/ApiSpotify';

export const useArtistGenresBatch = (artistIds: string[]) => {
  return useQuery({
    queryKey: ['artistGenresBatch', artistIds],
    queryFn: async () => {
      const genresMap: Record<string, string[]> = {};

      await Promise.all(
        artistIds.map(async (artistId) => {
          const artistData = await fetchArtistGenres(artistId);
          genresMap[artistId] = artistData.genres;
        })
      );

      return genresMap;
    },
    enabled: artistIds.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
