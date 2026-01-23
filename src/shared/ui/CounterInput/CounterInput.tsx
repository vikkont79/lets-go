import { Icon } from "../Icon/Icon";
import styles from './CounterInput.module.css'


interface CounterInputProps {
  id: string;
  label: string;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  iconSize?: number | string;
  className?: string;
}

const CounterInput = ({
  id,
  label,
  value,
  unit,
  onChange,
  min,
  max,
  step = 1,
  iconSize = 20,
  className = '',
}: CounterInputProps) => {
  const handleIncrement = () => {
    onChange(Math.min(max, value + step));
  };

  const handleDecrement = () => {
    onChange(Math.max(min, value - step));
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value))
  }

  return (
    <label className={`${styles.counterWrapper} ${className}`}>
      <span className={styles.label}>
        {label}
      </span>
      <div className={styles.counter}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={styles.button}
          aria-label='Уменьшить'
        >
          <Icon name="minus" size={iconSize} />
        </button>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleInputChange}
          className={styles.input}
          aria-label={label}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={styles.button}
          aria-label='Увеличить'
        >
          <Icon name="plus" size={iconSize} />
        </button>
      </div>
      {unit && <span className={styles.label}>{unit}</span>}
    </label>
  )
}

export { CounterInput }
