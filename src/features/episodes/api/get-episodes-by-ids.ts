import { apiClient } from '@/lib/api-client';
import type { Episode } from '../types/episode';

/**
 * Obtiene múltiples episodios pasando un array de IDs.
 * Nota: La API de Rick and Morty devuelve un Array si pides más de 1 id,
 * pero devuelve un Objeto literal si solo pides 1 id (ej: /episode/8).
 * Esta función normaliza la respuesta para que SIEMPRE sea un Array.
 */
export async function getEpisodesByIds(ids: number[]): Promise<Episode[]> {
  // Si no hay ids para buscar, devolvemos un array vacío rápidamente
  if (!ids || ids.length === 0) return [];
  
  const idsString = ids.join(',');
  const endpoint = `/episode/${idsString}`;
  
  const data = await apiClient<Episode | Episode[]>(endpoint);
  
  return Array.isArray(data) ? data : [data];
}
