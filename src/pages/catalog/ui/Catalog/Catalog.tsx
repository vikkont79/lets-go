import { useCatalog } from '../../lib'
import { CountryFilter } from '../CountrySelect/CountryFilter'
import { CatalogList } from '../CatalogList/CatalogList'
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
      <CountryFilter
        className={styles.countries}
        onCountrySelect={handleCountrySelect}
      />
      <section className={`${styles.catalog} wrapper`}>
        <div className={styles.filters}></div>
        <CatalogList
          trips={trips}
          totalPages={totalPages}
          currentPage={currentPage}
          activeRange={activeRange}
          canLoadMore={canLoadMore}
          loadMore={loadMore}
          goToPage={goToPage}
        />
      </section>

    </main>
  )
}

export { CatalogPage }
