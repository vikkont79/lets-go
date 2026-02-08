import { useCallback, useState } from "react"
import { useNavigate } from 'react-router-dom'
import type { FormData } from '@/shared/types'
import type { User } from '@/entities/user'

export const useFormSubmit = (formData: FormData, currentUser: User) => {
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = useCallback(async () => {
    setIsSubmit(true)
    try {
      const payload = {
        ...formData,
        id: currentUser.id,
        user: currentUser
      }
      const response = await fetch('http://localhost:3001/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
