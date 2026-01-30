import { useCallback, useState } from 'react'
import { Button, IconButton } from '@/shared/ui'
import styles from './CountryDropdown.module.css'
import { fetchCountriesByLetter } from '../../api/mock-countries';
import type { Country } from '../../model/countries';

interface CountryDropdownProps {
  onCountrySelect: (country: Country) => void;
  onCloseButton: () => void;
}

const CountryDropdown = ({ onCountrySelect, onCloseButton }: CountryDropdownProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  const handleLetterClick = useCallback(async (letter: string) => {
    const countries = await fetchCountriesByLetter(letter)
    setCountries(countries)
    setIsCountryOpen(true)
  }, [])
  const handleCountrySelect = useCallback((country: Country) => {
    onCountrySelect(country)
    setIsCountryOpen(false)
  }, [onCountrySelect])

  return (
    <div className={styles.dropdown}>
      <p className={styles.title}>Выберите страну</p>
      <IconButton
        className={styles.close}
        icon='close'
        variant='transparent'
        onClick={onCloseButton}
      />
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
  )
}

export { CountryDropdown }
