import styles from './pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const isPrevDisabled = currentPage <= 1 || isLoading;
  const isNextDisabled = currentPage >= totalPages || isLoading;

  if (totalPages <= 1 && !isLoading) return null; 

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        aria-label="Previous Page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className={styles.pageInfo}>
        <span className={styles.current}>{currentPage}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.total}>{totalPages}</span>
      </span>

      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        aria-label="Next Page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
