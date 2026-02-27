import type { TransportType } from '@/shared//types'
import styles from './TransportSelector.module.css'
import { TransportIcons } from '@/shared/ui';

type TransportSelectorProps = {
  selected: TransportType[];
  onChange: (type: TransportType) => void;
  error?: string;
}

const TransportSelector = ({
  selected,
  onChange,
  error,
}: TransportSelectorProps) => (
  <>
    <fieldset
      className={styles.field}
      data-invalid={!!error}
    >
      <legend className={styles.fieldTitle}>
        транспорт
      </legend>
      <TransportIcons
        selected={selected}
        onChange={onChange}
      />
    </fieldset>
    {error && <span className={styles.error}>{error}</span>}
  </>
)

export { TransportSelector }
