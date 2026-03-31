import { apiClient } from '@/lib/api-client';
import type { GetCharactersResponse } from '../types/character';

export interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

/**
 * Fetches a paginated list of characters from the Rick and Morty API.
 * @param params Filtering and pagination options.
 * @returns A promise resolving to the characters list and pagination info.
 */
export async function getCharacters(
  params?: GetCharactersParams
): Promise<GetCharactersResponse> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, String(value));
      }
    });
  }

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/character?${queryString}` : '/character';

  return apiClient<GetCharactersResponse>(endpoint, {
    // Next.js specific cache options could go here
    // cache: 'force-cache'
  });
}
