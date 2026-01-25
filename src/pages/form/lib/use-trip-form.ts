import { useCallback, useState } from "react"
import type { FormData, TransportType, TripDateRange } from "../types"
import { addDays } from "date-fns"

const initialFormData: FormData = {
  tags: '',
  transport: [],
  companions: 1,
  duration: 2,
  dates: {
    from: new Date(),
    to: addDays(new Date(), 1)
  }
}

export const useTripForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleTagsChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, tags: value }))
  }, [])

  const handleToggleTransport = useCallback((type: TransportType) => {
    setFormData(prev => ({
      ...prev,
      transport: prev.transport.includes(type)
        ? prev.transport.filter(item => item !== type)
        : [...prev.transport, type]
    }))
  }, [])

  const handleCompanionsChange = useCallback((value: number) => {
    setFormData(prev => ({ ...prev, companions: value }))
  }, [])

  const handleDurationChange = useCallback((value: number) => {
    setFormData(prev => ({ ...prev, duration: value }))
  }, [])

  const handleDateChange = useCallback((newRange: TripDateRange) => {
    setFormData(prev => ({ ...prev, dates: newRange }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
  }, [])

  const validateForm = useCallback((): boolean => {
    return (
      formData.tags.trim().length > 0 &&
      formData.transport.length > 0
    )
  }, [formData])

  return {
    formData,
    handleTagsChange,
    handleToggleTransport,
    handleCompanionsChange,
    handleDurationChange,
    handleDateChange,
    resetForm,
    validateForm,
  }
}


