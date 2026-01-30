import { useCallback, useState } from "react"
import type { FormData, TransportType, TripDateRange } from "../types"
import { addDays } from "date-fns"
import type { Country } from "@/features/country-dropdown/model/countries"

const initialFormData: FormData = {
  tags: '',
  transport: [],
  companions: 1,
  duration: 2,
  dates: {
    from: new Date(),
    to: addDays(new Date(), 1)
  },
  countries: [],
}

export const useTripForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(2)

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

  const handleAddCountry = useCallback((country: Country) => {
    setFormData(prev => ({
      ...prev,
      countries: [...prev.countries, country]
    }));
  }, []);

  const handleRemoveCountry = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.filter((_, i) => i !== index)
    }));
  }, []);

  const handleReplaceCountry = useCallback((index: number, newCountry: Country) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.map((country, i) =>
        i === index ? newCountry : country
      )
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
  }, [])

  const goToNextStep = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep(prev => (prev + 1) as 1 | 2 | 3);
    }
  }, [currentStep]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1) as 1 | 2 | 3);
    }
  }, [currentStep]);

  return {
    formData,
    currentStep,
    handleTagsChange,
    handleToggleTransport,
    handleCompanionsChange,
    handleDurationChange,
    handleDateChange,
    handleAddCountry,
    handleRemoveCountry,
    handleReplaceCountry,
    goToNextStep,
    goToPrevStep,
    resetForm,
  }
}


