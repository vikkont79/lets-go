import { fetchCountries } from '@/shared/api/mock-server-countries'
import { generateMockTrips } from '@/entities/trip/lib/generate-mock-trips'

const MOCK_TRIPS_COUNT = 2

export const initMockData = async () => {
  if (import.meta.env.PROD) return

  try {
    const countries = await fetchCountries()

    if (countries.length === 0) {
      console.warn('⚠️ Нет стран, пропускаем генерацию моков')
      return
    }

    const trips = generateMockTrips(MOCK_TRIPS_COUNT, countries)

    await Promise.allSettled(
      trips.map(trip =>
        fetch('http://localhost:3001/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trip)
        })
      )
    )

    console.log(`✅ Добавлено ${MOCK_TRIPS_COUNT} тестовых маршрутов`)
  } catch (error) {
    console.warn('⚠️ Ошибка генерации моков:', error)
  }
}
