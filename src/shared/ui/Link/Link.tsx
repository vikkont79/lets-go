import { Link as RouterLink } from 'react-router-dom'
import styles from './Link.module.css'
import type { BasePressableProps } from '../../types/types'

type LinkProps = BasePressableProps & (
  | { to: string }
  | { to?: never }
)

const Link = ({
  children,
  className = '',
  to,
  ...props
}: LinkProps) => {
  return to ? (
    <RouterLink
      className={`${styles.link} ${className || ''}`.trim()}
      to={to}
      {...props}
    >
      {children}
    </RouterLink>
  ) : (
    <span
      className={`${styles.link} ${className || ''}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
}

export { Link }
