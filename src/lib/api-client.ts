/**
 * Global API Client to handle base configuration and common fetch utilities.
 */
const BASE_URL = 'https://rickandmortyapi.com/api';

export interface FetchOptions extends RequestInit {
  // Future custom options can be added here
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      // Ignored if response isn't JSON
    }
    throw new Error(
      errorData?.error || `API request failed with status: ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}
