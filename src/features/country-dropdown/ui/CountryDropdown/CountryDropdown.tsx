import { forwardRef, useCallback, useEffect, useState } from 'react'
import { Button } from '@/shared/ui'
import { fetchCountries } from '../../api/mock-server-countries'
import type { Country } from '@/shared/types'
import styles from './CountryDropdown.module.css'

interface CountryDropdownProps {
  onCountrySelect: (country: Country) => void;
  className?: string;
}

const CountryDropdown = forwardRef<HTMLDivElement, CountryDropdownProps>(
  ({ onCountrySelect, className }, ref) => {
    const [allCountries, setAllCountries] = useState<Country[]>([])
    const [countries, setCountries] = useState<Country[]>([])
    const [isCountryOpen, setIsCountryOpen] = useState(false)

    useEffect(() => {
      const loadData = async () => {
        const cached = localStorage.getItem('countries')

        if (cached && cached !== '[]') {
          setAllCountries(JSON.parse(cached))
          return
        }

        try {
          const data = await fetchCountries()
          setAllCountries(data)
          if (data && data.length > 0) {
            localStorage.setItem('countries', JSON.stringify(data))
          }
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
