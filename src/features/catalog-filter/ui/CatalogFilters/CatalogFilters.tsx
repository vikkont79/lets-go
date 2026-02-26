import { useState } from 'react'
import styles from './CatalogFilters.module.css'
import { Toggle } from '@/shared/ui'
import type { FiltersData } from '../../types'
import { FOOD_OPTIONS, HOBBY_OPTIONS, MUSIC_OPTIONS } from '@/shared/constants'

interface CatalogFiltersProps {
  className: string;
}

const CatalogFilters = ({ className }: CatalogFiltersProps) => {
  const [filters, setFilters] = useState<FiltersData>({
    hobbies: { sport: false, hookah: false, couch: false },
    music: { heavy: false, rap: false, eurodance: false },
    food: { meat: false, pp: false, vegan: false },
    transport: [],
  })

  const handleToggleChange = (
    group: keyof Pick<FiltersData, 'hobbies' | 'music' | 'food'>,
    key: string
  ) => (value: string | boolean) => {
    if (typeof value === 'boolean') {
      setFilters(prev => ({
        ...prev,
        [group]: {
          ...prev[group],
          [key]: value
        }
      }))
    }
  }

  /*const handleTransportChange = (type: TransportType) => {
    setFilters(prev => ({
      ...prev,
      transport: prev.transport.includes(type)
        ? prev.transport.filter(t => t !== type)
        : [...prev.transport, type]
    }))
  }*/

  return (
    <div className={`${styles.filters} ${className || ''}`.trim()}>
      <p className={styles.title}>
        Подберите идеального попутчика</p>
      <form>
        <fieldset className={styles.group}>
          <p className={styles.fieldTitle}>Хобби</p>
          {HOBBY_OPTIONS.map(({ key, label }) => (
            <Toggle
              className={styles.checkbox}
              key={key}
              label={label}
              checked={filters.hobbies[key]}
              onChange={handleToggleChange('hobbies', key)}
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
              checked={filters.music[key]}
              onChange={handleToggleChange('music', key)}
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
              checked={filters.food[key]}
              onChange={handleToggleChange('food', key)}
              size='small'
              labelStyle={{ textTransform: 'none' }}
            />
          ))}
        </fieldset>
      </form>
    </div>
  )
}

export { CatalogFilters }
