import { Hero } from '../Hero/Hero'
import { Image } from '@/shared/ui'
import styles from './Main.module.css'
import map from '@assets/images/map.png'

const MainPage = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <Image
        src={map}
        alt='Карта города'
        width={1440}
        height={585}
      />
    </main>
  )
}

export { MainPage }
