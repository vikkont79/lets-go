import { fetchCountries } from '@/features/country-dropdown/api/mock-server-countries'
import { generateMockTrips } from '@/entities/trip/lib/generate-mock-trips'

const MOCK_TRIPS_COUNT = 5

export const initMockData = async () => {
  if (import.meta.env.PROD) return

  try {
    // 1. Берём страны (кэш или сервер — внутри fetchCountries)
    const countries = await fetchCountries()

    if (countries.length === 0) {
      console.warn('⚠️ Нет стран, пропускаем генерацию моков')
      return
    }

    // 2. Генерируем трипы с реальными странами
    const trips = generateMockTrips(MOCK_TRIPS_COUNT, countries)

    // 3. Отправляем на сервер
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
