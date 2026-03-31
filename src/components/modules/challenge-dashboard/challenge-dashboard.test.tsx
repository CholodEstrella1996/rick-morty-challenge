import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChallengeDashboard } from './challenge-dashboard';
import { useCharacters } from '@/features/characters/hooks/use-characters';
import { useEpisodesComparison } from '@/features/episodes/hooks/use-episodes-comparison';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Archivo contenedor de entorno
const queryClient = new QueryClient();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Mocks de Network Hooks
vi.mock('@/features/characters/hooks/use-characters', () => ({
  useCharacters: vi.fn(),
}));

vi.mock('@/features/episodes/hooks/use-episodes-comparison', () => ({
  useEpisodesComparison: vi.fn(),
}));

describe('UI & Interactions: ChallengeDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Data simulada que inyectará React Query al componente List
    (useCharacters as any).mockReturnValue({
      data: {
        info: { pages: 1 },
        results: [
          { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', episode: [] },
          { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', episode: [] },
        ],
      },
      isFetching: false,
      isError: false,
    });

    (useEpisodesComparison as any).mockReturnValue({
      sharedEpisodes: [],
      character1Exclusive: [],
      character2Exclusive: [],
      isLoading: false,
      isError: false,
    });
  });

  it('No muestra la sección Shared Episodes (EpisodesBoard) hasta seleccionar ambos personajes', () => {
    render(<ChallengeDashboard />, { wrapper: Wrapper });
    
    // 1. Al inicio, el placeholder debe estar presente y la grilla oculta
    expect(screen.getByText(/Selecciona ambos personajes/i)).toBeInTheDocument();

    // 2. Simulamos la selección de SÓLO Rick en el jugador 1
    const ricks = screen.getAllByText('Rick Sanchez');
    fireEvent.click(ricks[0]); // Seleccionamos a Rick en la columna 1

    expect(screen.getByText(/Selecciona ambos personajes/i)).toBeInTheDocument(); // Sigue el placeholder!

    // 3. Simulamos la selección de Morty en el jugador 2
    const mortys = screen.getAllByText('Morty Smith');
    fireEvent.click(mortys[1]); // Seleccionamos a Morty en la columna 2

    // Al tener dos seleccionados, el placeholder desaparece e ingresa el EpisodesBoard
    expect(screen.queryByText(/Selecciona ambos personajes de las listas/i)).not.toBeInTheDocument();
  });

  it('Interacción: click en CharacterCard selecciona visualmente el personaje', () => {
    render(<ChallengeDashboard />, { wrapper: Wrapper });

    const mortyTextRefs = screen.getAllByText('Morty Smith');
    const firstMortyCardTitle = mortyTextRefs[0];

    // Clickeamos el personaje
    fireEvent.click(firstMortyCardTitle);
    
    // La card altera su CSS para recibir highlights neon (clase 'selected' añadida al padre)
    const cardContainer = firstMortyCardTitle.closest('div[class*="card"]');
    expect(cardContainer?.className).toMatch(/selected/);
  });
});
