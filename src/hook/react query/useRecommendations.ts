import { useQuery } from '@tanstack/react-query';
import { fetchRecommendations } from '../../services/ApiSpotify';

export const useRecommendations = () => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
    staleTime: 1000 * 60 * 5,  // 5 minutes
    retry: 1, // retry une fois en cas d'erreur
  });
};
