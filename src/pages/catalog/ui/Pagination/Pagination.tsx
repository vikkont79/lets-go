import { Button, IconButton } from '@/shared/ui'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  activeRange?: { from: number; to: number };
  className: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  activeRange,
  className = ''

}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isPageActive = (page: number) => {
    if (activeRange) {
      return page >= activeRange.from && page <= activeRange.to
    }
    return page === currentPage
  }

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="Пагинация">
      <div className={styles.pages}>
        {pages.map(page => (
          <Button
            key={page}
            variant={isPageActive(page) ? 'primary' : 'transparent'}
            size='small'
            onClick={() => onPageChange(page)}
            className={styles.pageButton}
          >
            {page}
          </Button>
        ))}
      </div>
      <IconButton
        icon='page-left'
        iconSize={20}
        variant="transparent"
        size='small'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrow}
      />

      <IconButton
        icon='page-right'
        iconSize={20}
        variant="transparent"
        size='small'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrow}
      />
    </nav>
  )
}

export { Pagination }
