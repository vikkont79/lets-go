import { CounterInput } from '@/shared/ui';
import styles from './Counters.module.css';

interface CountersProps {
  companions: number;
  duration: number;
  onCompanionsChange: (value: number) => void;
  onDurationChange: (value: number) => void;
  errors: {
    companions?: string;
    duration?: string;
  };
}

const Counters = ({
  companions,
  duration,
  onCompanionsChange,
  onDurationChange,
  errors,
}: CountersProps) => {
  return (
    <div className={styles.counterInputs}>
      <CounterInput
        className={styles.counterInput}
        id='companions-input'
        label='Ищу попутчиков:'
        value={companions}
        unit='чел.'
        onChange={onCompanionsChange}
        min={1}
        max={10}
        error={errors.companions}
      />
      <CounterInput
        className={styles.counterInput}
        id='duration'
        label='Длительность:'
        value={duration}
        unit='дн.'
        onChange={onDurationChange}
        min={2}
        max={31}
        error={errors.duration}
      />
    </div>
  )
}

export { Counters }
