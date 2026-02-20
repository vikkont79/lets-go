import { forwardRef, useCallback, useEffect, useState } from 'react'
import { Button } from '@/shared/ui'
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
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
    const [selectedLetterCountries, setSelectedLetterCountries] = useState<Country[]>([])
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

    useEffect(() => {
      if (!allCountries.length) return
      const filtered = selectedContinent
        ? allCountries.filter(country => country.continent === selectedContinent) // <-- предполагаем поле continent
        : allCountries
      setFilteredCountries(filtered)
      setIsCountryOpen(false)
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
      setIsCountryOpen(false)
    }, [onCountrySelect])

    return (
      <div ref={ref} className={`${styles.dropdown} ${className}`}>
        <div className={styles.content}>
          <div className={styles.alfabet}>
            {'АБВГДЕЗИКЛМНОПРСТУФХЧШЭЮЯ'.split('').map(letter => (
              <div>
                <Button
                  key={letter}
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
          {isCountryOpen && (
            <div className={styles.countriesByLetter}>
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
