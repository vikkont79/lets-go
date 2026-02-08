import { useCallback, useState } from 'react'
import type { Country, FormData, TransportType, TripDateRange } from '@/shared//types'
import { addDays } from 'date-fns'

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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

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
      countries: [...prev.countries, { ...country, plan: '' }]
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
        i === index ? { ...newCountry, plan: '' } : country
      )
    }));
  }, []);

  const handlePlanChange = useCallback((countryCode: string, plan: string) => {
    setFormData(prev => ({
      ...prev,
      countries: prev.countries.map(country =>
        country.code === countryCode ? { ...country, plan } : country
      )
    }))
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
    handlePlanChange,
    goToNextStep,
    goToPrevStep,
  }
}


