import type { BaseInputProps, Size } from '../../types'
import styles from './Input.module.css'

interface InputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'disabled' | 'className' | 'placeholder'> {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
  isInvalid?: boolean;
  size?: Size;
}

const Input = ({
  value,
  onChange,
  placeholder,
  disabled,
  className = '',
  label,
  hiddenLabel,
  error,
  isInvalid = false,
  size = 'base',
  id,
  type = 'text',
  ...props
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label
      className={`${styles.inputWrapper} ${className || ''}`.trim()}
      data-invalid={isInvalid}
    >
      <span className={hiddenLabel ? 'visually-hidden' : styles.label}>{label}</span>
      <input
        className={`${styles.input} ${styles[size]}`}
        type={type}
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={isInvalid}
        {...props}
      />
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </label>
  )
}

export { Input }

