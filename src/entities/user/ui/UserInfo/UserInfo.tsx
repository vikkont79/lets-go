import { Image } from '@/shared/ui'
import level from '@assets/images/level.png'
import levelMob from '@assets/images/level-mob.png'
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
  return (
    <section className={`${styles.user} ${className}`}>
      <h2 className='visually-hidden'>Информация о пользователе</h2>


      <Image
        className={styles.level}
        src={level}
        srcMob={levelMob}
        alt='Уровень попутчика'
        width={100}
        height={100}
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
