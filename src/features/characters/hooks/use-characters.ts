import { useQuery } from '@tanstack/react-query';
import { getCharacters, type GetCharactersParams } from '../api/get-characters';

export function useCharacters(params: GetCharactersParams = { page: 1 }) {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => getCharacters(params),
    // Almacenamos temporalmente los datos para evitar llamadas innecesarias a la API (caché de 5 minutos)
    staleTime: 1000 * 60 * 5, 
    // Mantenemos los datos anteriores mientras buscamos los nuevos para que no parpadee la UI
    placeholderData: (previousData) => previousData,
  });
}
