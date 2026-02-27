import type { Trip } from '@/entities/trip'
import type { FiltersData } from '@/features/catalog-filter/types'


const API_BASE = 'http://localhost:3001'

interface FetchTripsParams {
  page?: number
  from?: number
  to?: number
  limit: number
  country?: string | null
  // ✨ НОВОЕ: фильтры из формы
  hobbies?: FiltersData['hobbies']
  music?: FiltersData['music']
  food?: FiltersData['food']
  transport?: FiltersData['transport']
}

interface FetchTripsResult {
  trips: Trip[]
  total: number
  pages: number
}

export const fetchTrips = async (params: FetchTripsParams): Promise<FetchTripsResult> => {
  try {
    const buildUrl = (page: number) => {
      let url = `${API_BASE}/trips?_page=${page}&_limit=${params.limit}`

      if (params.country) {
        url += `&countryCode=${params.country}`
      }

      if (params.hobbies?.length) {
        params.hobbies.forEach(h => url += `&hobby=${h}`)
      }

      if (params.music?.length) {
        params.music.forEach(m => url += `&music=${m}`)
      }

      if (params.food?.length) {
        params.food.forEach(f => url += `&food=${f}`)
      }

      if (params.transport?.length) {
        params.transport.forEach(t => url += `&transport=${t}`)
      }

      return url
    }

    if (params.page !== undefined) {
      const response = await fetch(buildUrl(params.page))

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data: Trip[] = await response.json()
      const totalCount = response.headers.get('X-Total-Count')
      const total = totalCount ? parseInt(totalCount) : data.length
      const pages = Math.ceil(total / params.limit)

      return {
        trips: data,
        total,
        pages
      }
    }

    if (params.from !== undefined && params.to !== undefined) {
      const fetchPromises = []
      for (let p = params.from; p <= params.to; p++) {
        fetchPromises.push(
          fetch(buildUrl(p))
        )
      }

      const responses = await Promise.all(fetchPromises)
      const totalCount = responses[0]?.headers.get('X-Total-Count')
      const total = totalCount ? parseInt(totalCount) : 0
      const pages = Math.ceil(total / params.limit)

      const tripsArrays = await Promise.all(
        responses.map(response => response.json() as Promise<Trip[]>)
      )

      const trips = tripsArrays.flat()

      return { trips, total, pages }
    }

    return { trips: [], total: 0, pages: 0 }

  } catch (error) {
    console.error('Failed to fetch trips:', error)
    return { trips: [], total: 0, pages: 0 }
  }
}
