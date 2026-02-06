import type { Country, FormData, TransportType, TripDateRange } from '@/shared//types'
export const stepValidators = {
  step1: {
    tags: {
      validate: (value: string): boolean => {
        const trimmed = value.trim();
        return trimmed.split(/[\s,]+/).some(tag =>
          tag.startsWith('#') && tag.length > 1
        )
      },
      message: 'Добавьте хотя бы один тег с #',
    },

    transport: {
      validate: (value: TransportType[]): boolean => value.length > 0,
      message: 'Выберите способ передвижения',
    },

    companions: {
      validate: (value: number): boolean => value >= 1 && value <= 10,
      message: 'От 1 до 10 чел.',
    },

    duration: {
      validate: (value: number): boolean => value >= 2 && value <= 31,
      message: 'От 2 до 31 дней',
    },
    dates: {
      validate: (value: TripDateRange): boolean => {
        return !!(value?.from && value?.to)
      },
      message: 'От 2 до 31 дней',
    },
  },
  step2: {
    tags: {
      validate: (value: string): boolean => {
        const trimmed = value.trim();
        return trimmed.split(/[\s,]+/).some(tag =>
          tag.startsWith('#') && tag.length > 1
        )
      },
      message: 'Добавьте хотя бы один тег с #',
    },
    transport: {
      validate: (value: TransportType[]): boolean => value.length > 0,
      message: 'Выберите способ передвижения',
    },
    countries: {
      validate: (value: Country[]): boolean => value.length > 0,
      message: 'Выберите страну',
    },
  },
  step3: {
    tags: {
      validate: (value: string): boolean => {
        const trimmed = value.trim();
        return trimmed.split(/[\s,]+/).some(tag =>
          tag.startsWith('#') && tag.length > 1
        )
      },
      message: 'Добавьте хотя бы один тег с #',
    },

    transport: {
      validate: (value: TransportType[]): boolean => value.length > 0,
      message: 'Выберите способ передвижения',
    },

    entertainment: {
      validate: (value: string): boolean => {
        const trimmed = value.trim();
        return trimmed.length >= 3 && trimmed.length <= 200;
      },
      message: 'От 3 до 200 символов'
    }
  },
} as const

export type StepKey = keyof typeof stepValidators;

export const validateStep = (
  stepKey: StepKey,
  formData: FormData
) => {
  const validators = stepValidators[stepKey]
  const errors: Record<string, string> = {}

  Object.entries(validators).forEach(([fieldName, validator]) => {
    const value = formData[fieldName as keyof FormData]

    if (!validator.validate(value as never)) {
      errors[fieldName] = validator.message
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}


