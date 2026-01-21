import { Image, Input } from '@/shared/ui'
import styles from './Form.module.css'
import level from '@assets/images/level.png'
import avatar from '@assets/images/avatar.jpg'
import { useTripForm } from '../../lib'
import { TransportSelector } from '../TransportSelector/TransportSelector'

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
      <section className={styles.user}>
        <h2 className='visually-hidden'>Информация о пользователе</h2>
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
      </section>
      <form>
        <div className={`${styles.baseFields} wrapper`}>
          <h2 className='visually-hidden'>Базовые параметры маршрута</h2>
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
          <TransportSelector
            selected={formData.transport}
            onChange={handleToggleTransport}
          />
        </div>
        <div className={`${styles.stepFields} wrapper`}>
          <h2 className='visually-hidden'>Пошаговый план маршрута</h2>
          <p>Добавить план:</p>
          <fieldset className={styles.stepField}>
            <legend className='visually-hidden'>Выбор даты и участников</legend>
            <p>Шаг 1. Даты пребывания</p>
            <p>Укажите предпочтительное количество попутчиков, которых
              вы хотели бы позвать в поездку, и ее предполагаемую длительность.</p>
            {/* Поля формы */}
          </fieldset>
          <fieldset className={styles.stepField}>
            <legend className='visually-hidden'>Выбор маршрута</legend>
            <p>Шаг 2. Маршрут</p>
            <p>Укажите страны, которые вы хотели бы посетить.
              Это может быть одна или сразу несколько.</p>
            {/* Поля формы */}
          </fieldset>
          <fieldset className={styles.stepField}>
            <legend className='visually-hidden'>Выбор развлечений</legend>
            <p>Шаг 3. Развлечения</p>
            <p>Наконец, расскажите о своих планах времяпровождения.
              Можно писать в свободной форме и ставить тэги.
            </p>
            {/* Поля формы */}
          </fieldset>
        </div>
      </form>
      {/*<pre>{JSON.stringify(formData, null, 2)}</pre>*/}
    </main>
  )
}

export { FormPage }
