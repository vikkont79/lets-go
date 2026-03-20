import type { Country } from '@/shared/types'

const API_BASE = 'http://localhost:3001'

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE}/countries`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error('Failed to fetch countries:', error)
    return []
  }
}
