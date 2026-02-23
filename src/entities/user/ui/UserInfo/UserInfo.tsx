import { Image, Level } from '@/shared/ui'
import avatar from '@assets/images/avatar.jpg'
import styles from './UserInfo.module.css'
import type { User } from '@/entities/user'

interface UserInfoProps {
  user: User | null;
  className?: string;
}

const UserInfo = ({ user, className = '' }: UserInfoProps) => {
  if (!user) return null;
  const avatarSrc = user.avatar || avatar
  const level = user.level ?? 80
  return (
    <section className={`${styles.user} ${className}`}>
      <h2 className='visually-hidden'>Информация о пользователе</h2>
      <Level
        className={styles.level}
        level={level}
      />
      <Image
        className={styles.avatar}
        src={avatarSrc}
        alt='Аватар попутчика'
        width={220}
        height={237}
      />
    </section>
  )
}

export { UserInfo }
