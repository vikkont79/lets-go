import styles from './Header.module.css'
import logo from '@assets/images/logo-white.png'


const Header = () => {
  return (
    <header className={`${styles.header} wrapper`}>
      <nav className={styles.nav}>
        <img
          src={logo}
        />
      </nav>
    </header>
  )
}

export { Header }
