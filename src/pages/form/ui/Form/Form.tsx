import { Image, IconButton, Input } from '@/shared/ui'
import styles from './Form.module.css'
import level from '@assets/images/level.png'
import avatar from '@assets/images/avatar.jpg'
import { useState } from 'react'

const FormPage = () => {
  const [hashtags, setHashtags] = useState('')
  const handleChange = (newValue: string) => {
    setHashtags(newValue);
  };
  return (
    <main className={styles.main}>
      <h1 className='visually-hidden'>
        Страница планирования путешествия
      </h1>
      <p className={styles.title}>Направления</p>

      <section className={`${styles.info} wrapper`}>
        <div className={styles.user}>
          <Image
            src={level}
            alt='Уровень попутчика'
            width={95}
            height={95}
          />
          <Image
            className={styles.avatar}
            src={avatar}
            alt='Аватар попутчика'
            width={220}
            height={237}
          />
        </div>
        <fieldset className={styles.field}>
          <legend className={styles.fieldTitle}>
            теги
          </legend>
          <Input
            value={hashtags}
            onChange={handleChange}
            label='Список тегов'
            hiddenLabel={true}
            placeholder='#делать дичь'
          />
        </fieldset>
        <fieldset className={styles.field}>
          <legend className={styles.fieldTitle}>
            транспорт
          </legend>
          <ul className={styles.transportList}>
            <li>
              <IconButton
                className={styles.transportItem}
                icon='plane'
              />
            </li>
            <li>
              <IconButton
                className={styles.transportItem}
                icon='bus'
              />
            </li>
            <li>
              <IconButton
                className={styles.transportItem}
                icon='bicycle'
              />
            </li>
            <li>
              <IconButton
                className={styles.transportItem}
                icon='run'
              />
            </li>
          </ul>
        </fieldset>
      </section>
    </main>
  )
}

export { FormPage }
