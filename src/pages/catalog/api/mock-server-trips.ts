import type { Trip } from '@/entities/trip'

const API_BASE = 'http://localhost:3001'

export const fetchTrips = async (): Promise<Trip[]> => {
  try {
    const response = await fetch(`${API_BASE}/trips`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch trips:', error)
    return []
  }
}
