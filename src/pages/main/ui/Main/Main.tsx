import { Hero } from '../Hero/Hero'
import styles from './Main.module.css'

const MainPage = () => {
  return (
    <main className={`${styles.main} wrapper`}>
      <Hero />
    </main>
  )
}

export { MainPage }
