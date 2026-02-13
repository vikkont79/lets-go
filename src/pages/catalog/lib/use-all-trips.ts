import { useState, useEffect } from 'react'
import { fetchTrips } from '../api'
import type { Trip } from '@/entities/trip'
import { useGlobalStore } from '@/app/store/root-store'

export const useAllTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useGlobalStore(state => state.currentUser)

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setIsLoading(true)
        const data = await fetchTrips()
        setTrips(data.filter(trip => trip.user.id !== currentUser?.id))
      } catch (error) {
        console.error('Failed to load trips:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTrips()
  }, [currentUser?.id])

  return { trips, isLoading }
}
