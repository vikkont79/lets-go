import { useCatalog } from '../../lib'
import { TripCard } from '@/entities/trip/ui'
import { Button } from '@/shared/ui'
import { Pagination } from '../Pagination/Pagination'
import styles from './Catalog.module.css'

const CatalogPage = () => {
  const {
    trips,
    isLoading,
    totalPages,
    currentPage,
    activeRange,
    canLoadMore,
    loadMore,
    goToPage
  } = useCatalog()


  if (isLoading) {
    return (
      <main className="wrapper">
        <div className={styles.skeleton}>Загрузка...</div>
      </main>
    )
  }

  if (trips.length === 0) {
    return (
      <main className="wrapper">
        <div className={styles.empty}>Пока нет маршрутов</div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <h1 className='visually-hidden'>
        Страница планирования путешествия
      </h1>
      <p className={styles.title}>Направления</p>
      <section className={`${styles.catalog} wrapper`}>
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </section>
      {canLoadMore && (
        <div className={styles.loadMoreWrapper}>
          <Button onClick={loadMore} className={styles.loadMoreButton}>
            Показать ещё
          </Button>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          activeRange={activeRange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </main>
  )
}

export { CatalogPage }
