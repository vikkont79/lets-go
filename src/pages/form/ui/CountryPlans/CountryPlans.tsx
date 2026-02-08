import type { Country } from '@/shared/types'
import styles from './CountryPlans.module.css'
import { Textarea } from '@/shared/ui';

interface CountryPlansProps {
  countries: Country[];
  errors: Record<string, string>;
  onPlanChange: (countryCode: string, plan: string) => void;
}

const CountryPlan = ({
  countries,
  errors,
  onPlanChange
}: CountryPlansProps) => {
  return (
    <div className={styles.plans}>
      {countries.map(country => (
        <div className={styles.plan} key={country.code}>
          <p className={styles.country}>{country.name_ru}</p>
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
          <Textarea
            className={styles.textarea}
            value={country.plan || ''}
            onChange={(value) => onPlanChange(country.code, value)}
            placeholder='План действий'
            label={`Информация о досуге в ${country.name_ru}`}
            hiddenLabel={true}
            error={errors[`plan-${country.code}`]}
            rows={5}
          />
        </div>
      ))}
    </div>
  )
}

export { CountryPlan }
