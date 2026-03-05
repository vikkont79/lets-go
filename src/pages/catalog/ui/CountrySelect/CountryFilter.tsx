import { FilterDropdown } from "@/features/filter-dropdown";
import type { Country } from "@/shared/types";
import { useState } from "react";
import styles from './CountryFilter.module.css'
import { Button, IconButton } from "@/shared/ui";
import { CONTINENTS } from "../../model";

interface CountryFilterProps {
  className: string;
  onCountrySelect: (country: Country | null) => void;
}

const CountryFilter = ({ className, onCountrySelect }: CountryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedContinent, setSelectedContinent] = useState<string | undefined>()

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseDropdown = () => {
    setIsOpen(false)
  }

  const handleContinentClick = (continent: string) => {
    setIsOpen(true)
    setSelectedContinent(continent)
    // Не закрываем дропдаун, чтобы можно было выбрать страну
  }

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country)
    setIsOpen(false) // Закрываем после выбора страны
  }

  const handleCountryReset = () => {
    onCountrySelect(null)
    setSelectedContinent(undefined)
  }

  return (
    <section className={`${styles.countries} ${className} wrapper`}>
      <div className={styles.filters}>
        <IconButton
          icon='filter'
          variant='transparent'
          className={styles.filter}
          onClick={handleToggleDropdown}
        >
          Фильтрация по странам:
        </IconButton>
        <ul className={styles.continents}>
          {CONTINENTS.map(item => (
            <li key={item}>
              <Button
                variant='transparent'
                className={styles.continent}
                onClick={() => handleContinentClick(item)}
              >
                {item}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          variant='transparent'
          className={styles.showAll}
          onClick={handleCountryReset}
        >
          Показать все
        </Button>
      </div>
      {isOpen && (
        <>
          <FilterDropdown
            className={styles.countriesDropdown}
            selectedContinent={selectedContinent}
            onCountrySelect={handleCountrySelect}
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
        </>
      )}

    </section>
  )
}

export { CountryFilter }
