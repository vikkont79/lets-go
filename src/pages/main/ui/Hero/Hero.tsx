import { Image } from '@/shared/ui'
import styles from './Hero.module.css'
import bgImage from '@assets/images/globe.png'
import traveller from '@assets/images/traveller.png'

const Hero = () => {
  return (
    <section className={`${styles.hero} wrapper`}>
      <Image
        src={bgImage}
        alt='Вид на планету'
        width={1440}
        height={750}
        className={styles.bgImage}
      />
      <div className={styles.content}>
        <p className={styles.slogan}>
          В путешествие<br />
          с крутыми<br />
          попутчиками!
        </p>
        <ul className={styles.roadmap}>
          <li className={styles.roadmapItem}>
            Выберите
            направление
          </li>
          <li className={styles.roadmapItem}>
            Изучите идеи
            путешественников
          </li>
          <li className={styles.roadmapItem}>
            Находите тех,
            кто похож на вас
          </li>
          <li className={styles.roadmapItem}>
            Путешествуйте
            вместе!
          </li>
        </ul>
      </div>
      <Image
        src={traveller}
        alt='Путешественник'
        width={430}
        height={640}
        className={styles.heroImage}
      />
    </section>
  )
}

export { Hero }
