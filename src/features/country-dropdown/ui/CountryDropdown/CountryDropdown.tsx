import { forwardRef, useCallback, useEffect, useState } from 'react'
import { Button, IconButton } from '@/shared/ui'
import styles from './CountryDropdown.module.css'
import { fetchCountries } from '../../api/mock-server-countries'
import type { Country } from '@/shared/types'

interface CountryDropdownProps {
  onCountrySelect: (country: Country) => void;
  onCloseButton: () => void;
  className?: string;
}

const CountryDropdown = forwardRef<HTMLDivElement, CountryDropdownProps>(
  ({ onCountrySelect, onCloseButton, className }, ref) => {
    const [allCountries, setAllCountries] = useState<Country[]>([])
    const [countries, setCountries] = useState<Country[]>([])
    const [isCountryOpen, setIsCountryOpen] = useState(false)

    useEffect(() => {
      const cached = localStorage.getItem('countries')

      if (cached) {
        setAllCountries(JSON.parse(cached))
        return
      }

      const loadData = async () => {
        try {
          const data = await fetchCountries()
          setAllCountries(data)
          localStorage.setItem('countries', JSON.stringify(data))
        } catch (error) {
          console.error('Failed to fetch countries:', error)
        }
      }
      loadData()
    }, [])

    const handleLetterClick = useCallback((letter: string) => {
      const normalizedLetter = letter.toLowerCase()
      const countries = allCountries
        .filter(country => country.name_ru.toLowerCase().startsWith(normalizedLetter))
        .sort((a, b) => a.name_ru.localeCompare(b.name_ru, 'ru'))
      setCountries(countries)
      setIsCountryOpen(true)
    }, [allCountries])

    const handleCountrySelect = useCallback((country: Country) => {
      onCountrySelect(country)
      setIsCountryOpen(false)
    }, [onCountrySelect])

    return (
      <div ref={ref} className={`${styles.dropdown} ${className}`}>
        <IconButton
          className={styles.close}
          icon='close'
          iconPosition='right'
          variant='transparent'
          onClick={onCloseButton}
        >
          Выберите страну
        </IconButton>
        <div className={styles.content}>
          <div className={styles.alfabet}>
            {'АБВГДЕЗИКЛМНОПРСТУФХЧШЭЮЯ'.split('').map(letter => (
              <Button
                key={letter}
                className={styles.letter}
                variant='transparent'
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </Button>
            ))}
          </div>
          {isCountryOpen && (
            <div className={styles.countries}>
              {countries.map(country => (
                <Button
                  key={country.code}
                  className={styles.country}
                  variant='transparent'
                  onClick={() => handleCountrySelect(country)}
                >
                  {country.name_ru}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)

export { CountryDropdown }
