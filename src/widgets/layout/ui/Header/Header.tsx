import { Image, Link } from '@/shared/ui'
import logo from '@assets/images/logo-white.png'
import styles from './Header.module.css'
import { AppRoute } from '@/app/router/routes'


const Header = () => {
  return (
    <header className={`${styles.header} wrapper`}>
      <nav className={styles.nav}>
        <Link to={AppRoute.Main}>
          <Image
            className={styles.image}
            src={logo}
            alt='Хуета'
            width={200}
            height={50}
          />
        </Link>
        <ul className={styles.navList}>
          <Link className={styles.navItem}>о сервисе</Link>
          <Link className={styles.navItem} to={AppRoute.Form}>направления</Link>
          <Link className={styles.navItem} to={AppRoute.Catalog}>попутчики</Link>
        </ul>
      </nav>
    </header>
  )
}

export { Header }
