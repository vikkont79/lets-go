import { useCallback, useState } from "react"
import type { FormData, TransportType } from "../types"

const initialFormData: FormData = {
  tags: '',
  transport: [],
  companions: 1,
  duration: 2,
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
    setFormData(prev => ({ ...prev, companions: value }));
  }, [])

  const handleDurationChange = useCallback((value: number) => {
    setFormData(prev => ({ ...prev, duration: value }));
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
  }, [])

  const validateForm = useCallback((): boolean => {
    return (
      formData.tags.trim().length > 0 &&
      formData.transport.length > 0
    );
  }, [formData]);

  return {
    formData,
    handleTagsChange,
    handleToggleTransport,
    handleCompanionsChange,
    handleDurationChange,
    resetForm,
    validateForm,
  }
}


