'use client';

import { useState } from 'react';
import { useCharacters } from '@/features/characters/hooks/use-characters';
import { CharactersGrid } from '@/components/modules/characters-grid';
import { Pagination } from '@/components/molecules/pagination';
import type { Character } from '@/features/characters/types/character';
import styles from './character-list.module.css';

interface CharacterListProps {
  title: string;
  colorVariant: 'green' | 'blue';
  selectedCharacterId?: number | null;
  onSelectCharacter: (character: Character) => void;
}

export function CharacterList({
  title,
  colorVariant,
  selectedCharacterId,
  onSelectCharacter,
}: CharacterListProps) {
  const [page, setPage] = useState(1);
  
  // Hook que cree para traer caching y fetching automáticos
  const { data, isFetching, isError } = useCharacters({ page });

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${styles[`text-${colorVariant}`]}`}>
        {title}
      </h2>

      {isError && (
        <div className={styles.error}>Ocurrió un error cargando el listado.</div>
      )}

      <div className={styles.content}>
        <CharactersGrid
          characters={data?.results || []}
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={onSelectCharacter}
          colorVariant={colorVariant}
          isLoading={isFetching && !data} // Solo muestra estado visual de carga si no hay data cacheadan previa
        />
      </div>

      <div className={styles.footer}>
        <Pagination
          currentPage={page}
          totalPages={data?.info?.pages || 1}
          onPageChange={setPage}
          isLoading={isFetching}
        />
      </div>
    </div>
  );
}
