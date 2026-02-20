import { useState, useEffect } from 'react'
import { fetchTrips } from '../api'
import { useGlobalStore } from '@/app/store/root-store'
import type { Trip } from '@/entities/trip'
import type { Country } from '@/shared/types'

const ITEMS_PER_PAGE = 4

export const useCatalog = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const currentUser = useGlobalStore(state => state.currentUser)

  const [anchorPage, setAnchorPage] = useState(1)
  const [endPage, setEndPage] = useState(1)


  const isRangeMode = endPage > anchorPage

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country.code)
    setAnchorPage(1)
    setEndPage(1)
  }

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true)

      const params = isRangeMode
        ? { from: anchorPage, to: endPage, limit: ITEMS_PER_PAGE, country: selectedCountry }
        : { page: anchorPage, limit: ITEMS_PER_PAGE, country: selectedCountry }


      const { trips: loadedTrips, pages } = await fetchTrips(params)

      setTotalPages(pages)

      const filtered = loadedTrips.filter(t => t.user.id !== currentUser?.id)
      setTrips(filtered)

      setIsLoading(false)
    }

    loadTrips()
  }, [anchorPage, endPage, isRangeMode, currentUser?.id, selectedCountry])

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
    goToPage,
    selectedCountry,
    handleCountrySelect
  }
}
