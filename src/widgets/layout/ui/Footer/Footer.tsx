import { Image, Link } from '@/shared/ui'
import logo from '@assets/images/logo-black.png'
import styles from './Footer.module.css'
import { AppRoute } from '@/app/router/routes'

const Footer = () => {
  return (
    <footer className={`${styles.footer} wrapper`}>
      <Link to={AppRoute.Main}>
        <Image
          src={logo}
          alt='Хуета'
          width={200}
          height={50}
        />
      </Link>
    </footer>
  )
}

export { Footer }
