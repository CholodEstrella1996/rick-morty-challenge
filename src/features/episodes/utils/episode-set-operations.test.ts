import { describe, it, expect } from 'vitest';
import { calculateEpisodeIntersections } from './episode-set-operations';

describe('Logic: episode-set-operations', () => {
  it('calculates shared and exclusive episodes correctly', () => {
    // Escenario idéntico al solicitado: 
    // character 1: [1,2,3,4]
    // character 2: [3,4,5]
    const episodes1 = [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3',
      'https://rickandmortyapi.com/api/episode/4',
    ];
    const episodes2 = [
      'https://rickandmortyapi.com/api/episode/3',
      'https://rickandmortyapi.com/api/episode/4',
      'https://rickandmortyapi.com/api/episode/5',
    ];

    const result = calculateEpisodeIntersections(episodes1, episodes2);

    expect(result.exclusive1).toEqual([1, 2]);
    expect(result.shared).toEqual([3, 4]);
    expect(result.exclusive2).toEqual([5]);
    expect(result.allNeededIds).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles empty episode arrays properly without breaking', () => {
    const result = calculateEpisodeIntersections([], []);
    expect(result.exclusive1).toEqual([]);
    expect(result.shared).toEqual([]);
    expect(result.exclusive2).toEqual([]);
  });
});
