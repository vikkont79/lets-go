import { Image, IconButton, Input } from '@/shared/ui'
import styles from './Form.module.css'
import level from '@assets/images/level.png'
import avatar from '@assets/images/avatar.jpg'
import { useCallback, useState } from 'react'
import { type FormData, type TransportType } from '../../types'
import { TRANSPORT_OPTIONS } from '../../constants'

const FormPage = () => {

  const [formData, setFormData] = useState<FormData>({
    tags: '',
    transport: []
  })

  const handleTagsChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, tags: value }));
  }, []);

  const toggleTransport = useCallback((type: TransportType) => {
    setFormData(prev => ({
      ...prev,
      transport: prev.transport.includes(type)
        ? prev.transport.filter(item => item !== type) // убираем если уже выбран
        : [...prev.transport, type] // добавляем если не выбран
    }));
  }, []);

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
                  onClick={() => toggleTransport(item)}
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
