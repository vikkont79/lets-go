import type { Size } from '../../types'
import { Icon } from '../Icon/Icon'
import styles from './Toggle.module.css'

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'size'> {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
  type?: 'checkbox' | 'radio';
  onChange: (value: boolean | string) => void;
  size?: Size;
  iconSize?: number | string;
  className?: string;
}

const Toggle = ({
  label,
  hiddenLabel,
  error,
  type = 'checkbox',
  onChange,
  size = 'base',
  iconSize = 20,
  id,
  name,
  value,
  disabled,
  className = '',
  ...props
}: ToggleProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'radio') {
      onChange(e.target.value);
    } else {
      onChange(e.target.checked);
    }
  }

  return (
    <label
      className={`${styles.toggleWrapper} ${className || ''}`.trim()}
    >
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={!!error}
        className="visually-hidden"
        {...props}
      />
      <span className={`${styles.toggleControl} ${styles[size]}`}>
        {type === 'checkbox' && (
          <Icon className={styles.mark} name='check' size={iconSize} />
        )}
        {type === 'radio' && (
          <span className={styles.dot} />
        )}
      </span>
      <span className={hiddenLabel ? 'visually-hidden' : styles.labelText}>
        {label}
      </span>
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </label>
  );
};

export { Toggle }
