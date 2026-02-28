import { useState, useEffect, useCallback } from 'react'
import { fetchTrips } from '../api'
import { useGlobalStore } from '@/app/store/root-store'
import type { Trip } from '@/entities/trip'
import type { Country } from '@/shared/types'
import type { FiltersData } from '@/features/catalog-filter/types'

const ITEMS_PER_PAGE = 4

export const useCatalog = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [filters, setFilters] = useState<FiltersData>({
    hobbies: [],
    music: [],
    food: [],
    transport: [],
    level: [1, 100]
  })
  const currentUser = useGlobalStore(state => state.currentUser)

  const [anchorPage, setAnchorPage] = useState(1)
  const [endPage, setEndPage] = useState(1)


  const isRangeMode = endPage > anchorPage

  const handleCountrySelect = (country: Country | null) => {
    setSelectedCountry(country?.code || null)
    setAnchorPage(1)
    setEndPage(1)
  }

  const handleApplyFilters = useCallback((newFilters: FiltersData) => {
    setFilters(newFilters)
    setAnchorPage(1)
    setEndPage(1)
  }, [])

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true)

      const params = {
        limit: ITEMS_PER_PAGE,
        country: selectedCountry,
        ...filters,
        ...(isRangeMode
          ? { from: anchorPage, to: endPage }
          : { page: anchorPage }
        )
      }


      const { trips: loadedTrips, pages } = await fetchTrips(params)

      setTotalPages(pages)

      const filtered = loadedTrips.filter(t => t.user.id !== currentUser?.id)
      setTrips(filtered)

      setIsLoading(false)
    }

    loadTrips()
  }, [anchorPage, endPage, isRangeMode, currentUser?.id, selectedCountry, filters])

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
    handleCountrySelect,
    handleApplyFilters,
    filters,
  }
}
