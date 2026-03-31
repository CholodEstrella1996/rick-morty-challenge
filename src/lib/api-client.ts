const BASE_URL = 'https://rickandmortyapi.com/api';

export type FetchOptions = RequestInit;

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

    }
    throw new Error(
      errorData?.error || `API request failed with status: ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}
