import { useQuery } from '@tanstack/react-query';
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

/**
 * Hook maestro que encapsula toda la complejidad matemática y de red.
 * Recibe los dos personajes seleccionados (si los hay), procesa sus URLs,
 * obtiene de la API los capítulos en un solo Request para no saturar al servidor,
 * y devuelve los Array limpios de episodios ya tipados y parseados.
 */
export function useEpisodesComparison(
  character1: Character | null,
  character2: Character | null
): UseEpisodesComparisonResult {
  // Calculamos las operaciones de conjuntos en base a las URLs
  const { exclusive1, exclusive2, shared, allNeededIds } = calculateEpisodeIntersections(
    character1?.episode || [],
    character2?.episode || []
  );

  // Sólo queremos disparar el fetch si:
  // 1. Ambos personajes están seleccionados
  // 2. Y hay al menos un ID de episodio para buscar.
  const isReadyToFetch = character1 !== null && character2 !== null && allNeededIds.length > 0;

  // Hacemos EL ÚNICO LLAMADO MASIVO A LA API.
  // En vez de hacer 3 fetch distintos, la API de Rick and Morty soporta traer un arreglo grande de ids [1,2,55...] de golpe.
  const {
    data: allEpisodes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['episodes', allNeededIds],
    queryFn: () => getEpisodesByIds(allNeededIds),
    enabled: isReadyToFetch,
    staleTime: 1000 * 60 * 10, // 10 minutos de caché estricta para cruces enormes
  });

  // El Request general ya volvió, ahora simplemente repartimos los episodios reales 
  // devuelta en sus respectivos conjuntos en tiempo y complejidad computacional O(N).
  return {
    isLoading: isLoading && isReadyToFetch,
    isError,
    sharedEpisodes: allEpisodes.filter((ep) => shared.includes(ep.id)),
    character1Exclusive: allEpisodes.filter((ep) => exclusive1.includes(ep.id)),
    character2Exclusive: allEpisodes.filter((ep) => exclusive2.includes(ep.id)),
  };
}
