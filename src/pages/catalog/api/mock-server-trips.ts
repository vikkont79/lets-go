import type { Trip } from '@/entities/trip'

const API_BASE = 'http://localhost:3001'

interface TripsResponse {
  data: Trip[]
  items: number
  pages: number
}

export const fetchTrips = async (params: {
  page?: number
  from?: number
  to?: number
  limit: number
}) => {
  try {
    if (params.page !== undefined) {
      const response = await fetch(
        `${API_BASE}/trips?_page=${params.page}&_per_page=${params.limit}`
      )
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data: TripsResponse = await response.json()

      return {
        trips: data.data || [],
        total: data.items || 0,
        pages: data.pages || 0
      }
    }

    if (params.from !== undefined && params.to !== undefined) {
      const promises = []
      for (let p = params.from; p <= params.to; p++) {
        promises.push(
          fetch(`${API_BASE}/trips?_page=${p}&_per_page=${params.limit}`)
            .then(res => res.json())
            .then((data: TripsResponse) => data)
        )
      }

      const results = await Promise.all(promises)
      const trips = results.flatMap(r => r.data || [])
      const total = results[0]?.items || 0
      const pages = Math.ceil(total / params.limit)

      return { trips, total, pages }
    }

    return { trips: [], total: 0, pages: 0 }

  } catch (error) {
    console.error('Failed to fetch trips:', error)
    return { trips: [], total: 0, pages: 0 }
  }
}
