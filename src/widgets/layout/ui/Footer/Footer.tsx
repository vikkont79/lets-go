import { Image } from '../../../../shared/ui'
import logo from '@assets/images/logo-black.png'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={`${styles.footer} wrapper`}>
      <Image
        src={logo}
        alt='Хуета'
        width={200}
        height={50}
      />
    </footer>
  )
}

export { Footer }
