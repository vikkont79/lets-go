import { Image, IconButton, Input } from '@/shared/ui'
import styles from './Form.module.css'
import level from '@assets/images/level.png'
import avatar from '@assets/images/avatar.jpg'
import { TRANSPORT_OPTIONS } from '../../constants'
import { useTripForm } from '../../lib'

const FormPage = () => {
  const {
    formData,
    handleTagsChange,
    handleToggleTransport,
  } = useTripForm()

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
            value={formData.tags}
            onChange={handleTagsChange}
            label='Список тегов'
            hiddenLabel={true}
            placeholder='#делатьдичь'
          />
        </fieldset>
        <fieldset className={styles.field}>
          <legend className={styles.fieldTitle}>
            транспорт
          </legend>
          <ul className={styles.transportList}>
            {TRANSPORT_OPTIONS.map((item) => (
              <li key={item}>
                <IconButton
                  className={styles.transportButton}
                  icon={item}
                  onClick={() => handleToggleTransport(item)}
                  iconLabel={item}
                  aria-pressed={formData.transport.includes(item)}
                />
              </li>
            ))}
          </ul>
        </fieldset>
      </section>
    </main>
  )
}

export { FormPage }
