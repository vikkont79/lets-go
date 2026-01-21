import { IconButton } from '@/shared/ui';
import type { TransportType } from '../../types'
import { TRANSPORT_OPTIONS } from '../../constants';
import styles from './TransportSelector.module.css'

type TransportSelectorProps = {
  selected: TransportType[];
  onChange: (type: TransportType) => void;
}

const TransportSelector = ({
  selected,
  onChange,
}: TransportSelectorProps) => (
  <fieldset className={styles.field}>
    <legend className={styles.fieldTitle}>
      транспорт
    </legend>
    <ul className={styles.transportList}>
      {TRANSPORT_OPTIONS.map((item) => (
        <li key={item}>
          <IconButton
            className={styles.transportButton}
            icon={item}
            onClick={() => onChange(item)}
            iconLabel={item}
            aria-pressed={selected.includes(item)}
          />
        </li>
      ))}
    </ul>
  </fieldset>
)

export { TransportSelector }
