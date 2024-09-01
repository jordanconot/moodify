import { useQuery } from '@tanstack/react-query';
import { fetchTopTracks } from '../../services/ApiSpotify';

export const useTopTracks = (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term') => {
  return useQuery({
    queryKey: ['topTracks', timeRange],
    queryFn: () => fetchTopTracks(timeRange),
    enabled: !!timeRange,
    staleTime: 1000 * 60 * 5,  // 5 minutes
    retry: 1, // retry une fois en cas d'erreur
  });
};
