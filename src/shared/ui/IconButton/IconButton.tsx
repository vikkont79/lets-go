import { Button, type ButtonProps, Icon, type IconProps } from '../../ui'
import styles from './IconButton.module.css'

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: string;
  iconSize?: IconProps['size'];
  iconColor?: IconProps['color'];
  iconLabel?: IconProps['label'];
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}
const IconButton = ({
  icon,
  iconSize,
  iconColor,
  iconLabel,
  iconPosition = 'left',
  children,
  className = '',
  ...buttonProps
}: IconButtonProps) => {
  return (
    <Button
      className={`${styles.iconButton} ${className}`.trim()}
      data-icon-position={iconPosition}
      {...buttonProps as ButtonProps}
    >
      <Icon
        name={icon}
        size={iconSize}
        color={iconColor}
        label={iconLabel || (typeof children === 'string' ? children : undefined)}
        className={styles.icon}
      />
      {children && <span className={styles.text}>{children}</span>}
    </Button>
  )
}

export { IconButton }
