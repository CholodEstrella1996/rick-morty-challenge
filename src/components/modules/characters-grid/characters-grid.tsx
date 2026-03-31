import React from 'react';
import { CharacterCard } from '@/components/molecules/character-card';
import type { Character } from '@/features/characters/types/character';
import styles from './characters-grid.module.css';

interface CharactersGridProps {
  characters: Character[];
  selectedCharacterId?: number | null;
  onSelectCharacter: (character: Character) => void;
  colorVariant: 'green' | 'blue';
  isLoading?: boolean;
}

export function CharactersGrid({
  characters,
  selectedCharacterId = null,
  onSelectCharacter,
  colorVariant,
  isLoading = false,
}: CharactersGridProps) {
  
  // Empty state or Loading state could also be encapsulated into Atoms,
  // but for now we inline them nicely.
  if (isLoading) {
    return <div className={styles.statusBox}>Cargando personajes...</div>;
  }

  if (characters.length === 0) {
    return <div className={styles.statusBox}>No se encontraron personajes.</div>;
  }

  return (
    <div className={styles.grid}>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          image={character.image}
          status={character.status}
          species={character.species}
          isSelected={selectedCharacterId === character.id}
          colorVariant={colorVariant}
          onClick={() => onSelectCharacter(character)}
        />
      ))}
    </div>
  );
}
