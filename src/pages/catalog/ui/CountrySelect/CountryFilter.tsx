import { FilterDropdown } from "@/features/filter-dropdown";
import type { Country } from "@/shared/types";
import { useState } from "react";
import styles from './CountryFilter.module.css'
import { Button, IconButton } from "@/shared/ui";
import { CONTINENTS } from "../../model";

interface CountryFilterProps {
  onCountrySelect: (country: Country) => void;
}

const CountryFilter = ({ onCountrySelect }: CountryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedContinent, setSelectedContinent] = useState<string | undefined>()

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleContinentClick = (continent: string) => {
    setSelectedContinent(continent)
    // Не закрываем дропдаун, чтобы можно было выбрать страну
  }

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country)
    setIsOpen(false) // Закрываем после выбора страны
  }

  return (
    <section className={`${styles.countries} wrapper`}>
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
      </div>

      {isOpen && (
        <FilterDropdown
          className={styles.countriesDropdown}
          selectedContinent={selectedContinent}
          onCountrySelect={handleCountrySelect}
        />
      )}
    </section>
  )
}

export { CountryFilter }
