import { TripCard, type Trip } from '@/entities/trip'
import { Pagination } from '../Pagination/Pagination'
import { IconButton } from '@/shared/ui'
import styles from './CatalogList.module.css'

interface CatalogListProps {
  trips: Trip[];
  totalPages: number;
  currentPage: number;
  activeRange: { from: number, to: number };
  canLoadMore: boolean;
  loadMore: () => void;
  goToPage: (page: number) => void;
}

const CatalogList = ({
  trips,
  totalPages,
  currentPage,
  activeRange,
  canLoadMore,
  loadMore,
  goToPage
}: CatalogListProps) => {
  return (
    <div className={styles.list}>
      {trips.map(trip => (
        <TripCard key={trip.id} trip={trip} className={styles.card} />
      ))}
      {canLoadMore && (
        <IconButton
          icon='plus'
          iconColor='currentColor'
          iconSize={26}
          variant='transparent'
          onClick={loadMore}
          className={styles.moreButton}
        >
          Показать ещё
        </IconButton>
      )}
      {totalPages > 1 && (
        <Pagination
          className={styles.pagination}
          activeRange={activeRange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  )
}

export { CatalogList }
