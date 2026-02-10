import { useCallback, useState } from "react"
import { useNavigate } from 'react-router-dom'
import type { FormData } from '@/shared/types'
import type { User } from '@/entities/user'
import type { Trip } from "@/entities/trip/types/trip"

const API_BASE = 'http://localhost:3001'

export const useFormSubmit = (formData: FormData, currentUser: User) => {
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = useCallback(async () => {
    setIsSubmit(true)
    try {
      const trip: Trip = {
        ...formData,
        id: currentUser.id,
        user: currentUser,
        createdAt: new Date().toISOString()
      }
      const response = await fetch(`${API_BASE}/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trip)
      })
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      navigate('/')
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsSubmit(false)
    }
  }, [formData])

  return {
    handleSubmit,
    isSubmit
  }
}
