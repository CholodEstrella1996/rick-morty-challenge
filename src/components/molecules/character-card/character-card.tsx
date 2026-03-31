import React from 'react';
import styles from './character-card.module.css';

interface CharacterCardProps {
  name: string;
  image: string;
  status: 'Alive' | 'Dead' | 'unknown' | string;
  species: string;
  isSelected?: boolean;
  colorVariant?: 'green' | 'blue';
  onClick?: () => void;
}

export function CharacterCard({
  name,
  image,
  status,
  species,
  isSelected = false,
  colorVariant = 'green',
  onClick,
}: CharacterCardProps) {
  const isAlive = status.toLowerCase() === 'alive';
  const isDead = status.toLowerCase() === 'dead';

  let statusColor = '#9e9e9e'; // unknown gray
  if (isAlive) statusColor = '#4caf50'; // green
  if (isDead) statusColor = '#f44336'; // red

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${
        isSelected ? styles[colorVariant] : ''
      }`}
      onClick={onClick}
    >
      <div className={styles.avatarContainer}>
        <img src={image} alt={name} className={styles.avatar} loading="lazy" />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={`${styles.name} ${isSelected ? styles[`text-${colorVariant}`] : ''}`}>
            {name}
          </h3>
          {isSelected && (
            <div className={`${styles.checkIcon} ${styles[`bg-${colorVariant}`]}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        <div className={styles.statusRow}>
          <span
            className={styles.statusDot}
            style={{ backgroundColor: statusColor }}
          />
          <span className={styles.statusText}>{status.toUpperCase()}</span>
        </div>

        <span className={styles.species}>{species.toUpperCase()}</span>
      </div>
    </div>
  );
}
