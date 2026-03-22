import { useCallback, useEffect, useRef, useState } from 'react'
import { CountryDropdown } from '@/features/country-dropdown/ui/CountryDropdown/CountryDropdown'
import { IconButton } from '@/shared/ui'
import styles from './CountrySelect.module.css'
import type { Country } from '@/shared//types'

interface CountrySelectProps {
  selected: Country[];
  onAdd: (country: Country) => void;
  onRemove: (index: number) => void;
  onReplace: (index: number, country: Country) => void;
  error?: string;
}

const CountrySelect = ({ selected, onAdd, onRemove, onReplace, error }: CountrySelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOpenDropdown = useCallback((index: number) => {
    setActiveIndex(index)
    setIsOpen(true)
  }, [])
  const handleAddCountry = useCallback((country: Country) => {
    onAdd(country)
    setIsOpen(false)
  }, [onAdd])
  const handleReplaceCountry = useCallback((country: Country) => {
    if (activeIndex !== null) {
      onReplace(activeIndex, country)
      setIsOpen(false)
    }
  }, [activeIndex, onReplace])
  const handleRemoveCountry = useCallback((index: number) => {
    onRemove(index)
  }, [onRemove])
  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    const handleOutsideClick = (e: MouseEvent) => {
      if (!isOpen) return
      if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
        return
      }
      setIsOpen(false)
    };
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, dropdownRef])

  return (
    <div className={styles.selects}>
      {selected.map((country, index) => (
        <div
          key={`${country}-${index}`}
          className={styles.select}
        >
          <IconButton
            className={styles.selectButton}
            icon='arrow-down'
            iconPosition='right'
            variant='transparent'
            onClick={() => handleOpenDropdown(index)}
          >
            {country.name_ru}
          </IconButton>
          <img
            src={`https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/${country.code.toLowerCase()}.svg`}
            alt={country.name_ru}
            className={styles.flag}
            width={70}
            height={47}
            onError={(e) => {
              // fallback: скрыть или поставить заглушку
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <IconButton
            className={styles.close}
            icon='close'
            variant='transparent'
            onClick={() => handleRemoveCountry(index)}
          />
          {isOpen && activeIndex === index && (
            <>
              <IconButton
                className={styles.closeButton}
                icon='close'
                iconPosition='right'
                variant='transparent'
                onClick={handleCloseDropdown}
              >
                Выберите страну
              </IconButton>
              <CountryDropdown
                ref={dropdownRef}
                className={styles.countryDropdown}
                onCountrySelect={handleReplaceCountry}
              />
            </>
          )}
        </div>
      ))}

      {selected.length < 4 && (
        <div
          className={styles.select}
        >
          <IconButton
            className={styles.selectButton}
            icon='plus'
            iconSize={20}
            iconPosition='right'
            variant='transparent'
            onClick={() => handleOpenDropdown(-1)}
          >
            Добавить страну
          </IconButton>
          {error && (
            <span className={styles.error}>{error}</span>
          )}
          {isOpen && activeIndex === -1 && (
            <>
              <IconButton
                className={styles.closeButton}
                icon='close'
                iconPosition='right'
                variant='transparent'
                onClick={handleCloseDropdown}
              >
                Выберите страну
              </IconButton>
              <CountryDropdown
                ref={dropdownRef}
                className={styles.countryDropdown}
                onCountrySelect={handleAddCountry}
              />
            </>
          )}
        </div>
      )}
    </div >
  )
}

export { CountrySelect }
