import styles from './Textarea.module.css'
import type { BaseInputProps, Size } from '../../types/types'

interface TextareaProps extends BaseInputProps,
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'disabled' | 'className' | 'placeholder' | 'rows'
  > {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
  size?: Size;
  rows?: number;
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  disabled,
  className = '',
  label,
  hiddenLabel,
  error,
  size = 'base',
  rows = 4,
  id,
  ...props
}: TextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <label className={`${styles.textareaWrapper} ${className}`.trim()}>
      <span className={hiddenLabel ? 'visually-hidden' : styles.label}>
        {label}
      </span>
      <textarea
        className={`${styles.textarea} ${styles[size]}`}
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </label>
  )
}

export { Textarea, type TextareaProps }
