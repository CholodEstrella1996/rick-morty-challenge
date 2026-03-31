import React from 'react';
import styles from './episode-card.module.css';

interface EpisodeCardProps {
  episodeCode: string;
  date: string;
  name: string;
  variant: 'green' | 'blue' | 'shared';
}

export const EpisodeCard = React.memo(function EpisodeCard({ episodeCode, date, name, variant }: EpisodeCardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.header}>
        <span className={`${styles.code} ${styles[`text-${variant}`]}`}>
          {episodeCode}
        </span>

        <div className={styles.headerRight}>
          {variant === 'shared' ? (
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.dotBlue}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
          ) : (
            <span className={styles.date}>{date}</span>
          )}
        </div>
      </div>

      <h4 className={styles.name}>{name}</h4>

      {variant === 'shared' && (
        <div className={styles.sharedFooter}>
           <span className={styles.date}>{date}</span>
        </div>
      )}
    </div>
  );
});
