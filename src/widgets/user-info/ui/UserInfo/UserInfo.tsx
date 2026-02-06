// widgets/user-info/ui/UserInfo/UserInfo.tsx
import { Image } from '@/shared/ui';
import levelImage from '@assets/images/level.png';
import avatarImage from '@assets/images/avatar.jpg';
import styles from './UserInfo.module.css';

interface UserInfoProps {
  className?: string;
}

const UserInfo = ({ className = '' }: UserInfoProps) => {
  return (
    <section className={`${styles.user} ${className}`}>
      <h2 className='visually-hidden'>Информация о пользователе</h2>
      <Image
        src={levelImage}
        alt='Уровень попутчика'
        width={94}
        height={94}
      />
      <Image
        className={styles.avatar}
        src={avatarImage}
        alt='Аватар попутчика'
        width={220}
        height={237}
      />
    </section>
  )
}

export { UserInfo }
