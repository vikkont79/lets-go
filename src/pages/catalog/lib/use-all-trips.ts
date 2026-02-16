import { useState, useEffect } from 'react'
import { fetchTrips } from '../api'
import { useGlobalStore } from '@/app/store/root-store'
import type { Trip } from '@/entities/trip'

const ITEMS_PER_PAGE = 4

export const useCatalog = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const currentUser = useGlobalStore(state => state.currentUser)

  const [anchorPage, setAnchorPage] = useState(1)
  const [endPage, setEndPage] = useState(1)


  const isRangeMode = endPage > anchorPage

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true)

      const params = isRangeMode
        ? { from: anchorPage, to: endPage, limit: ITEMS_PER_PAGE }
        : { page: anchorPage, limit: ITEMS_PER_PAGE }


      const { trips: loadedTrips, pages } = await fetchTrips(params)

      setTotalPages(pages)

      const filtered = loadedTrips.filter(t => t.user.id !== currentUser?.id)
      setTrips(filtered)

      setIsLoading(false)
    }

    loadTrips()
  }, [anchorPage, endPage, isRangeMode, currentUser?.id])

  const loadMore = () => {
    setEndPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPage = (page: number) => {
    setAnchorPage(page)
    setEndPage(page)
  }

  const canLoadMore = endPage < totalPages

  return {
    trips,
    isLoading,
    totalPages,
    currentPage: anchorPage,
    activeRange: { from: anchorPage, to: endPage },
    canLoadMore,
    loadMore,
    goToPage
  }
}
