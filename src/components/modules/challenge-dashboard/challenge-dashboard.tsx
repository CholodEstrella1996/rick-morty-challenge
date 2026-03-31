'use client';

import { useState } from 'react';
import { CharacterList } from '@/components/modules/character-list';
import { EpisodesBoard } from '@/components/modules/episodes-board';
import type { Character } from '@/features/characters/types/character';
import styles from './challenge-dashboard.module.css';

export function ChallengeDashboard() {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        
        {/* Encabezado Superior */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            Rick & Morty <span className={styles.titleHighlight}>Challenge</span>
          </h1>
          <p className={styles.subtitle}>
            Selecciona dos personajes para ver sus episodios en común
          </p>
        </header>

        {/* Columnas de los Personajes */}
        <div className={styles.listsContainer}>
          <div className={styles.listColumn}>
            <CharacterList
              title="Personaje 1"
              colorVariant="green"
              selectedCharacterId={character1?.id}
              onSelectCharacter={setCharacter1}
            />
          </div>

          {/* Separador visual de Versos */}
          <div className={styles.vsDivider}>
             <div className={styles.vsText}>VS</div>
          </div>

          <div className={styles.listColumn}>
            <CharacterList
              title="Personaje 2"
              colorVariant="blue"
              selectedCharacterId={character2?.id}
              onSelectCharacter={setCharacter2}
            />
          </div>
        </div>
        
        {/* Bloque de Episodios 3 Columnas */}
        {character1 && character2 ? (
          <EpisodesBoard character1={character1} character2={character2} />
        ) : (
          <div className={styles.episodesPlaceholder}>
            Selecciona ambos personajes de las listas de arriba para cargar las Misiones.
          </div>
        )}
      </div>
    </div>
  );
}
