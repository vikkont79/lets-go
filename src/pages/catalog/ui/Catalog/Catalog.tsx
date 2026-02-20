import { useCatalog } from '../../lib'
import { TripCard } from '@/entities/trip/ui'
import { IconButton } from '@/shared/ui'
import { Pagination } from '../Pagination/Pagination'
import { CountryFilter } from '../CountrySelect/CountryFilter'
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
    goToPage,
    handleCountrySelect
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
      <CountryFilter onCountrySelect={handleCountrySelect} />
      <section className={`${styles.catalog} wrapper`}>
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} />
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
      </section>
    </main>
  )
}

export { CatalogPage }
