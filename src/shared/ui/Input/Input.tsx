import { useId } from 'react'
import type { BaseInputProps, Size } from '../../types'
import styles from './Input.module.css'

interface InputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'disabled' | 'className' | 'placeholder' | 'id' | 'name'> {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
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
  size = 'base',
  type = 'text',
  ...props
}: InputProps) => {
  const id = useId()
  const name = label
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/g, '_')
    .replace(/^_|_$/g, '')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <label
      className={`${styles.inputWrapper} ${className || ''}`.trim()}
    >
      <span className={hiddenLabel ? 'visually-hidden' : styles.label}>{label}</span>
      <input
        className={`${styles.input} ${styles[size]}`}
        type={type}
        value={value}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </label>
  )
}

export { Input }

