import { memo, useState } from 'react'
import { RangeSlider, Toggle, TransportIcons } from '@/shared/ui'
import type { FiltersData } from '../../types'
import { FOOD_OPTIONS, HOBBY_OPTIONS, MUSIC_OPTIONS } from '@/shared/constants'
import type { TransportType } from '@/shared/types'
import styles from './CatalogFilters.module.css'

interface CatalogFiltersProps {
  className: string;
  initialFilters: FiltersData;
  onApply: (filters: FiltersData) => void;
}

const CatalogFiltersComponent = ({
  className,
  initialFilters,
  onApply
}: CatalogFiltersProps) => {
  const [filters, setFilters] = useState<FiltersData>(initialFilters)

  const handleToggle = (
    field: 'hobbies' | 'music' | 'food',
    key: string
  ) => (value: string | boolean) => {
    if (typeof value === 'boolean') {
      setFilters(prev => ({
        ...prev,
        [field]: value
          ? [...prev[field], key]
          : prev[field].filter(item => item !== key)
      }))
    }
  }

  const handleTransportChange = (type: TransportType) => {
    setFilters(prev => ({
      ...prev,
      transport: prev.transport.includes(type)
        ? prev.transport.filter(t => t !== type)
        : [...prev.transport, type]
    }))
  }

  const handleLevelChange = (value: [number, number]) => {
    setFilters(prev => ({ ...prev, level: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onApply(filters)
  }

  return (
    <div className={`${styles.filters} ${className || ''}`.trim()}>
      <p className={styles.title}>Подберите идеального попутчика</p>

      <form onSubmit={handleSubmit}>
        <fieldset className={styles.group}>
          <p className={styles.fieldTitle}>Хобби</p>
          {HOBBY_OPTIONS.map(({ key, label }) => (
            <Toggle
              className={styles.checkbox}
              key={key}
              label={label}
              checked={filters.hobbies.includes(key)}
              onChange={handleToggle('hobbies', key)}
              size='small'
              labelStyle={{ textTransform: 'none' }}
            />
          ))}
        </fieldset>

        <fieldset className={styles.group}>
          <p className={styles.fieldTitle}>Музыка</p>
          {MUSIC_OPTIONS.map(({ key, label }) => (
            <Toggle
              className={styles.checkbox}
              key={key}
              label={label}
              checked={filters.music.includes(key)}
              onChange={handleToggle('music', key)}
              size='small'
              labelStyle={{ textTransform: 'none' }}
            />
          ))}
        </fieldset>

        <fieldset className={styles.group}>
          <p className={styles.fieldTitle}>Еда</p>
          {FOOD_OPTIONS.map(({ key, label }) => (
            <Toggle
              className={styles.checkbox}
              key={key}
              label={label}
              checked={filters.food.includes(key)}
              onChange={handleToggle('food', key)}
              size='small'
              labelStyle={{ textTransform: 'none' }}
            />
          ))}
        </fieldset>

        <fieldset className={styles.group}>
          <p className={styles.fieldTitle}>Транспорт</p>
          <TransportIcons
            selected={filters.transport}
            onChange={handleTransportChange}
          />
        </fieldset>

        <fieldset className={styles.group}>
          <p className={styles.fieldTitle}>Левел</p>
          <RangeSlider
            min={1}
            max={100}
            value={filters.level}
            onChange={handleLevelChange}
          />
        </fieldset>

        <div className={styles.actions}>
          <button type="submit" className={styles.applyButton}>
            Применить фильтры
          </button>
        </div>
      </form>
    </div>
  )
}

const CatalogFilters = memo(CatalogFiltersComponent)

export { CatalogFilters }
