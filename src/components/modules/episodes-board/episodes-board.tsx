import React from 'react';
import { useEpisodesComparison } from '@/features/episodes/hooks/use-episodes-comparison';
import { EpisodeCard } from '@/components/molecules/episode-card';
import type { Character } from '@/features/characters/types/character';
import styles from './episodes-board.module.css';

interface EpisodesBoardProps {
  character1: Character | null;
  character2: Character | null;
}

export function EpisodesBoard({ character1, character2 }: EpisodesBoardProps) {
  const { sharedEpisodes, character1Exclusive, character2Exclusive, isLoading } = useEpisodesComparison(character1, character2);

  if (!character1 || !character2) return null;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Decodificando transmisiones de la Federación Galáctica...</p>
      </div>
    );
  }

  return (
    <div className={styles.board}>
      {/* Columna 1 */}
      <div className={styles.column}>
        <div className={`${styles.columnHeader} ${styles.leftHeader}`}>
           <div className={`${styles.indicator} ${styles.bgGreen}`} />
           <div>
             <h3 className={styles.title}>{character1.name} - Solo Episodios</h3>
             <span className={styles.subtitle}>MISIONES INDIVIDUALES</span>
           </div>
        </div>
        <div className={styles.list}>
          {character1Exclusive.length === 0 && <p className={styles.empty}>No se encontraron episodios exclusivos.</p>}
          {character1Exclusive.map(ep => (
            <EpisodeCard key={ep.id} episodeCode={ep.episode} date={ep.air_date} name={ep.name} variant="green" />
          ))}
        </div>
      </div>

      {/* Columna 2 (Shared) */}
      <div className={styles.column}>
        <div className={`${styles.columnHeader} ${styles.centerHeader}`}>
           <h3 className={`${styles.title} ${styles.textCyan}`}>
             {character1.name} & {character2.name} - Episodios Compartidos
           </h3>
           <span className={styles.subtitle}>MISIONES SINCRONIZADAS</span>
        </div>
        <div className={styles.list}>
          {sharedEpisodes.length === 0 && <p className={styles.empty}>No hay episodios compartidos.</p>}
          {sharedEpisodes.map(ep => (
            <EpisodeCard key={ep.id} episodeCode={ep.episode} date={ep.air_date} name={ep.name} variant="shared" />
          ))}
        </div>
      </div>

      {/* Columna 3 */}
      <div className={styles.column}>
        <div className={`${styles.columnHeader} ${styles.rightHeader}`}>
           <div className={styles.textRight}>
             <h3 className={styles.title}>{character2.name} - Solo Episodios</h3>
             <span className={styles.subtitle}>MISIONES INDIVIDUALES</span>
           </div>
           <div className={`${styles.indicator} ${styles.bgBlue}`} />
        </div>
        <div className={styles.list}>
          {character2Exclusive.length === 0 && <p className={styles.empty}>No se encontraron episodios exclusivos.</p>}
          {character2Exclusive.map(ep => (
            <EpisodeCard key={ep.id} episodeCode={ep.episode} date={ep.air_date} name={ep.name} variant="blue" />
          ))}
        </div>
      </div>
    </div>
  );
}
