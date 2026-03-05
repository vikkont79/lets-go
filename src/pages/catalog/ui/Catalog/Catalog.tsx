import { useCatalog } from '../../lib'
import { CountryFilter } from '../CountrySelect/CountryFilter'
import { CatalogList } from '../CatalogList/CatalogList'
import styles from './Catalog.module.css'
import { CatalogFilters } from '@/features/catalog-filter/ui'

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
    handleCountrySelect,
    handleApplyFilters,
    filters,
  } = useCatalog()

  return (
    <main className={styles.main}>
      <h1 className='visually-hidden'>
        Страница поиска попутчиков
      </h1>
      <p className={styles.title}>Направления</p>
      <CountryFilter
        className={styles.countries}
        onCountrySelect={handleCountrySelect}
      />
      <section className={`${styles.catalog} wrapper`}>
        <CatalogFilters
          className={styles.filters}
          initialFilters={filters}
          onApply={handleApplyFilters}
        />
        {isLoading ? (
          <div className={styles.skeleton}>Загрузка...</div>
        ) : trips.length === 0 ? (
          <div className={styles.empty}>Пока нет маршрутов</div>
        ) : (
          <CatalogList
            trips={trips}
            totalPages={totalPages}
            currentPage={currentPage}
            activeRange={activeRange}
            canLoadMore={canLoadMore}
            loadMore={loadMore}
            goToPage={goToPage}
          />
        )}
      </section>

    </main>
  )
}

export { CatalogPage }
