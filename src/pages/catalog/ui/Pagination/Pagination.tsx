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
  const getVisiblePages = () => {
    const delta = 3
    const range: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i)
      }
    }

    const result: (number | string)[] = []
    let prev = 0

    for (const page of range) {
      if (typeof page === 'number') {
        if (page - prev > 1) {
          result.push('...')
        }
        result.push(page)
        prev = page
      }
    }

    return result
  }

  const isPageActive = (page: number) => {
    if (activeRange) {
      return page >= activeRange.from && page <= activeRange.to
    }
    return page === currentPage
  }

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label='Пагинация'>
      <div className={styles.pages}>
        {getVisiblePages().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className={styles.dots}>...</span>
          ) : (
            <Button
              key={page}
              variant={isPageActive(page as number) ? 'primary' : 'transparent'}
              size='small'
              onClick={() => onPageChange(page as number)}
              className={styles.pageButton}
            >
              {page}
            </Button>
          ))}
      </div>
      <IconButton
        icon='page-left'
        iconSize={20}
        variant='transparent'
        size='small'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.arrow}
      />

      <IconButton
        icon='page-right'
        iconSize={20}
        variant='transparent'
        size='small'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.arrow}
      />
    </nav>
  )
}

export { Pagination }
