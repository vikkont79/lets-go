import { Link as RouterLink } from 'react-router-dom'
import styles from './Button.module.css'
import type { BasePressableProps, Size, Variant } from '../../types/base'

interface BaseButtonProps extends BasePressableProps {
  variant?: Variant;
  size?: Size;
}

type ButtonProps = BaseButtonProps & (
  | {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    to?: never;
  }
  | {
    to: string;
    type?: never;
    onClick?: never;
  }
)

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'base',
  type = 'button',
  onClick,
  to,
  ...props
}: ButtonProps) => {
  return to ? (
    <RouterLink
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`.trim()}
      to={to}
      {...props}

    >
      {children}
    </RouterLink>
  ) : (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`.trim()}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Button,
  type ButtonProps,
}
