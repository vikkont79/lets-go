import { Button } from '@/shared/ui'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  activeRange?: { from: number; to: number };
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  activeRange

}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isPageActive = (page: number) => {
    if (activeRange) {
      return page >= activeRange.from && page <= activeRange.to
    }
    return page === currentPage
  }

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrow}
      >
        ←
      </Button>

      <div className={styles.pages}>
        {pages.map(page => (
          <Button
            key={page}
            variant={isPageActive(page) ? 'primary' : 'secondary'}
            onClick={() => onPageChange(page)}
            className={styles.pageButton}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrow}
      >
        →
      </Button>
    </nav>
  )
}
