import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, IconButton } from '@/shared/ui'
import { fetchCountries } from '../../api/mock-server-countries'
import type { Country } from '@/shared/types'
import styles from './FilterDropdown.module.css'

interface FilterDropdownProps {
  onCountrySelect: (country: Country) => void;
  selectedContinent?: string;
  className?: string;
}

const FilterDropdown = forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ onCountrySelect, selectedContinent, className }, ref) => {
    const [allCountries, setAllCountries] = useState<Country[]>([])
    const [selectedLetterCountries, setSelectedLetterCountries] = useState<Country[]>([])
    const [isCountryOpen, setIsCountryOpen] = useState(false)

    const countriesByLetterRef = useRef<HTMLDivElement>(null)

    const filteredCountries = useMemo(() => {
      if (!allCountries.length) return []
      return selectedContinent
        ? allCountries.filter(country => country.continent === selectedContinent)
        : allCountries
    }, [selectedContinent, allCountries])

    const handleLetterClick = useCallback((letter: string) => {
      const normalizedLetter = letter.toLowerCase()
      const countriesByLetter = filteredCountries
        .filter(country => country.name_ru.toLowerCase().startsWith(normalizedLetter))
        .sort((a, b) => a.name_ru.localeCompare(b.name_ru, 'ru'))
      setSelectedLetterCountries(countriesByLetter)
      setIsCountryOpen(true)
    }, [filteredCountries])

    const handleCountrySelect = useCallback((country: Country) => {
      onCountrySelect(country)
    }, [onCountrySelect])

    const handleCountriesClose = useCallback(() => {
      setIsCountryOpen(false)
    }, [])

    useEffect(() => {
      const loadData = async () => {
        const cached = localStorage.getItem('countries')

        if (cached) {
          setAllCountries(JSON.parse(cached))
          return
        }
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

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (!isCountryOpen) return
        if (countriesByLetterRef.current &&
          !countriesByLetterRef.current.contains(e.target as Node)) {
          setIsCountryOpen(false)
        }
      }
      document.addEventListener('mousedown', handleOutsideClick)

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }, [isCountryOpen])

    return (
      <div ref={ref} className={`${styles.dropdown} ${className}`}>
        <div className={styles.content}>
          <div className={styles.alfabet}>
            {'АБВГДЕЗИКЛМНОПРСТУФХЧШЭЮЯ'.split('').map(letter => (
              <div key={letter}>
                <Button
                  className={styles.letter}
                  variant='transparent'
                  onClick={() => handleLetterClick(letter)}
                >
                  {letter}
                </Button>
                <div className={styles.countries}>
                  {filteredCountries
                    .filter(country => country.name_ru.toLocaleUpperCase().startsWith(letter))
                    .sort((a, b) => a.name_ru.localeCompare(b.name_ru, 'ru'))
                    .map(country => (
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
              </div>
            ))}
          </div>
          {isCountryOpen && selectedLetterCountries.length > 0 && (
            <div
              ref={countriesByLetterRef}
              className={styles.countriesByLetter}
            >
              <IconButton
                className={styles.close}
                icon='close'
                iconPosition='right'
                variant='transparent'
                onClick={handleCountriesClose}
              >
                Свернуть
              </IconButton>
              {selectedLetterCountries.map(country => (
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

export { FilterDropdown }
