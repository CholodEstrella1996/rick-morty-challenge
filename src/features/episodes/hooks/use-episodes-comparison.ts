import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getEpisodesByIds } from '../api/get-episodes-by-ids';
import { calculateEpisodeIntersections } from '../utils/episode-set-operations';
import type { Character } from '@/features/characters/types/character';
import type { Episode } from '../types/episode';

interface UseEpisodesComparisonResult {
  isLoading: boolean;
  isError: boolean;
  sharedEpisodes: Episode[];
  character1Exclusive: Episode[];
  character2Exclusive: Episode[];
}

export function useEpisodesComparison(
  character1: Character | null,
  character2: Character | null
): UseEpisodesComparisonResult {
  const episodes1 = character1?.episode;
  const episodes2 = character2?.episode;

  // Memoizamos este bloque pesado para no recalcular O(N) arreglos de episodios
  const { exclusive1, exclusive2, shared, allNeededIds } = useMemo(() => {
    return calculateEpisodeIntersections(
      episodes1 || [],
      episodes2 || []
    );
  }, [episodes1, episodes2]);

  const isReadyToFetch = character1 !== null && character2 !== null && allNeededIds.length > 0;

  const {
    data: allEpisodes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['episodes', allNeededIds],
    queryFn: () => getEpisodesByIds(allNeededIds),
    enabled: isReadyToFetch,
    staleTime: 1000 * 60 * 10,
  });

  return {
    isLoading: isLoading && isReadyToFetch,
    isError,
    sharedEpisodes: allEpisodes.filter((ep) => shared.includes(ep.id)),
    character1Exclusive: allEpisodes.filter((ep) => exclusive1.includes(ep.id)),
    character2Exclusive: allEpisodes.filter((ep) => exclusive2.includes(ep.id)),
  };
}
