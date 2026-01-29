import { useCallback, useEffect, useState } from "react"
import { CountryDropdown } from "../CountryDropdown/CountryDropdown";

// Временный тип для прототипа
type SimpleCountry = 'a' | 'b' | 'c';

interface CountrySelectProps {
  selected: SimpleCountry[];
  onAdd: (country: SimpleCountry) => void;
  onRemove: (index: number) => void;
  onReplace: (index: number, country: SimpleCountry) => void;
}

const CountrySelect = ({ selected, onAdd, onRemove, onReplace }: CountrySelectProps) => {
  // Временное состояние для опций
  const allCountries: SimpleCountry[] = ['a', 'b', 'c']
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleOpenDropdown = useCallback((index: number) => {
    setActiveIndex(index);
    setIsOpen(true)
  }, [])
  const handleAddCountry = useCallback((country: SimpleCountry) => {
    onAdd(country)
    setIsOpen(false)
  }, [onAdd])
  const handleReplaceCountry = useCallback((country: SimpleCountry) => {
    if (activeIndex !== null) {
      onReplace(activeIndex, country);
      setIsOpen(false);
    }
  }, [activeIndex, onReplace]);
  const handleRemoveCountry = useCallback((index: number) => {
    onRemove(index)
  }, [onRemove])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div>
      {selected.map((country, index) => (
        <div key={`${country}-${index}`} style={{ position: 'relative' }}>
          <button
            type='button'
            onClick={() => handleOpenDropdown(index)}
          >
            {country}
          </button>
          <button
            type="button"
            onClick={() => handleRemoveCountry(index)}
          >
            ×
          </button>
          {isOpen && activeIndex === index && (
            <CountryDropdown
              allCountries={allCountries}
              onCountrySelect={handleReplaceCountry}
            />
          )}
        </div>
      ))}

      {selected.length < 4 && (
        <div style={{ position: 'relative' }}>
          <button
            type='button'
            onClick={() => handleOpenDropdown(-1)}
          >
            -- Добавить страну --
          </button>
          {isOpen && activeIndex === -1 && (
            <CountryDropdown
              allCountries={allCountries}
              onCountrySelect={handleAddCountry}
            />
          )}
        </div>
      )}
    </div >
  );
};

export { CountrySelect }
