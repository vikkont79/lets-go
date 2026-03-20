import { FilterDropdown } from '@/features/filter-dropdown'
import type { Country } from '@/shared/types'
import { useEffect, useRef, useState } from 'react'
import styles from './CountryFilter.module.css'
import { Button, IconButton } from '@/shared/ui'
import { CONTINENTS } from '@/shared/constants'
import { useMediaQuery } from '@/shared/lib'


interface CountryFilterProps {
  className: string;
  onCountrySelect: (country: Country | null) => void;
}

const CountryFilter = ({ className, onCountrySelect }: CountryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedContinent, setSelectedContinent] = useState<string | undefined>()
  const isDesktopOrTablet = useMediaQuery('(min-width: 322px)');
  const isMobile = useMediaQuery('(max-width: 321px)');

  const showContinents = isDesktopOrTablet || (isMobile && isOpen);

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
    setSelectedContinent(undefined)
  }

  const handleCloseDropdown = () => {
    setIsOpen(false)
    setSelectedContinent(undefined)
  }

  const handleContinentClick = (continent: string) => {
    setIsOpen(true)
    setSelectedContinent(continent)
  }

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country)
    handleCloseDropdown()
  }

  const handleCountryReset = () => {
    onCountrySelect(null)
    setSelectedContinent(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseDropdown()
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <section className={`${styles.countries} ${className} wrapper`}>
      <div className={styles.filters}>
        <IconButton
          icon='filter'
          variant='transparent'
          className={styles.filter}
          onClick={handleToggleDropdown}
          aria-expanded={isOpen}
          aria-controls="countries-dropdown"
        >
          Фильтрация по странам:
        </IconButton>
        {showContinents && (
          <ul className={styles.continents}>
            {CONTINENTS.map(item => (
              <li key={item}>
                <Button
                  variant='transparent'
                  className={styles.continent}
                  onClick={() => handleContinentClick(item)}
                  data-selected={selectedContinent === item}
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        )}
        {showContinents && (
          <Button
            variant='transparent'
            className={styles.showAll}
            onClick={handleCountryReset}
          >
            Показать все
          </Button>
        )}
      </div>
      {isOpen && (
        <div className={styles.countriesDropdown}>
          <FilterDropdown
            ref={dropdownRef}
            selectedContinent={selectedContinent}
            onCountrySelect={handleCountrySelect}
            id="countries-dropdown"
            role="listbox"
            aria-label="Список стран"
          />
          <IconButton
            className={styles.close}
            icon='close'
            variant='secondary'
            size='large'
            onClick={handleCloseDropdown}
          >
            Свернуть
          </IconButton>
        </div>
      )}

    </section>
  )
}

export { CountryFilter }
