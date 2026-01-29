import { useCallback, useState } from "react";
import type { SimpleCountry } from "../../types";

interface CountryDropdownProps {
  allCountries: SimpleCountry[];
  onCountrySelect: (country: SimpleCountry) => void;
}

const CountryDropdown = ({ allCountries, onCountrySelect }: CountryDropdownProps) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  const handleLetterClick = useCallback(() => {
    setIsCountryOpen(true)
  }, [])
  const handleCountrySelect = useCallback((country: SimpleCountry) => {
    onCountrySelect(country)
    setIsCountryOpen(false)
  }, [onCountrySelect])

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        background: 'white',
        border: '1px solid #ccc',
        zIndex: 1
      }}>
      <div>
        {'АБВГДЕЗИКЛМНОПРСТУФХЧШЭЮЯ'.split('').map(letter => (
          <button
            type='button'
            key={letter}
            onClick={handleLetterClick}
          >
            {letter}
          </button>
        ))}
      </div>
      {isCountryOpen && (
        <div>
          {allCountries.map(country => (
            <button
              type='button'
              key={country}
              onClick={() => handleCountrySelect(country)}
            >
              {country}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { CountryDropdown }
