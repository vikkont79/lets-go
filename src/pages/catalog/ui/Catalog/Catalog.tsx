import { useAllTrips } from '../../lib'
import { TripCard } from '@/entities/trip/ui'
import styles from './Catalog.module.css'

const CatalogPage = () => {
  const { trips, isLoading } = useAllTrips()

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
    </main>
  )
}

export { CatalogPage }
