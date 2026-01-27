import { Button, CounterInput, Image, Input } from '@/shared/ui'
import level from '@assets/images/level.png'
import avatar from '@assets/images/avatar.jpg'
import { useTripForm, validateStep } from '../../lib'
import { TransportSelector } from '../TransportSelector/TransportSelector'
import styles from './Form.module.css'
import { DatePicker } from '../DatePicker/DatePicker'
import { StepList } from '../StepList/StepList'
import { useState } from 'react'

const FormPage = () => {
  const {
    formData,
    currentStep,
    handleTagsChange,
    handleToggleTransport,
    handleCompanionsChange,
    handleDurationChange,
    handleDateChange,
    goToNextStep,
    goToPrevStep,
  } = useTripForm()

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const handleNextClick = () => {
    const stepKey = `step${currentStep}` as const;
    const validation = validateStep(stepKey, formData);

    if (!validation.isValid) {
      setStepErrors(validation.errors);
      return;
    }

    // 3. Если ошибок нет:
    setStepErrors({}); // Очищаем ошибки
    goToNextStep();     // Переходим к шагу 2
  }

  const handleBackClick = () => {
    setStepErrors({});    // Очищаем ошибки
    goToPrevStep();       // Переходим назад
  }

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
              error={stepErrors.tags}
              onChange={handleTagsChange}
              label='Список тегов'
              hiddenLabel={true}
              placeholder='#делатьдичь'
            />
          </fieldset>
          <TransportSelector
            selected={formData.transport}
            onChange={handleToggleTransport}
            error={stepErrors.transport}
          />
        </div>
        <div className={`${styles.stepFields} wrapper`}>
          <h2 className='visually-hidden'>Пошаговый план маршрута</h2>
          <p className={styles.stepsTitle}>Добавить план:</p>
          {currentStep === 1 && (
            <fieldset className={styles.stepField}>
              <legend className='visually-hidden'>Выбор даты и участников</legend>
              <div className={styles.stepContent}>
                <div className={styles.stepIntro}>
                  <p className={styles.stepTitle}>Шаг 1. Даты пребывания</p>
                  <p className={styles.stepDescription}>Укажите предпочтительное количество попутчиков, которых<br /> вы хотели бы позвать в поездку, и ее предполагаемую длительность.</p>
                </div>
                <StepList
                  currentStep={currentStep}
                />
              </div>
              <div className={styles.counterInputs}>
                <CounterInput
                  className={styles.counterInput}
                  id='companions-input'
                  label='Ищу попутчиков:'
                  value={formData.companions}

                  unit='чел.'
                  onChange={handleCompanionsChange}
                  min={1}
                  max={10}
                />
                <CounterInput
                  className={styles.counterInput}
                  id='duration'
                  label='Длительность:'
                  value={formData.duration}
                  unit='дн.'
                  onChange={handleDurationChange}
                  min={2}
                  max={31}
                />
              </div>
              <DatePicker
                value={formData.dates}
                onChange={handleDateChange}
              />
              <div className={styles.stepsNav}>
                <Button
                  onClick={handleNextClick}
                >Следующий шаг</Button>
                <Button
                  onClick={handleBackClick}
                >На шаг назад</Button>
              </div>
            </fieldset>
          )}
          {currentStep === 2 && (
            <fieldset className={styles.stepField}>
              <legend className='visually-hidden'>Выбор маршрута</legend>
              <div className={styles.stepContent}>
                <div className={styles.stepIntro}>
                  <p className={styles.stepTitle}>Шаг 2. Маршрут</p>
                  <p className={styles.stepDescription}>Укажите страны, которые вы хотели бы посетить.
                    Это может быть одна или сразу несколько.</p>
                </div>
                <StepList
                  currentStep={currentStep}
                />
              </div>
              {/* Поля формы */}
              <div className={styles.stepsNav}>
                <Button
                  onClick={handleNextClick}
                >Следующий шаг</Button>
                <Button
                  onClick={handleBackClick}
                >На шаг назад</Button>
              </div>
            </fieldset>
          )}
          {currentStep === 3 && (
            <fieldset className={styles.stepField}>
              <legend className='visually-hidden'>Выбор развлечений</legend>
              <div className={styles.stepContent}>
                <div className={styles.stepIntro}>
                  <p className={styles.stepTitle}>Шаг 3. Развлечения</p>
                  <p className={styles.stepDescription}>Наконец, расскажите о своих планах времяпровождения.
                    Можно писать в свободной форме и ставить тэги.
                  </p>
                </div>
                <StepList
                  currentStep={currentStep}
                />
              </div>
              {/* Поля формы */}
              <div className={styles.stepsNav}>
                <Button
                  onClick={handleNextClick}
                >Следующий шаг</Button>
                <Button
                  onClick={handleBackClick}
                >На шаг назад</Button>
              </div>
            </fieldset>
          )}
        </div>
      </form>
      {/*<pre>{JSON.stringify(formData, null, 2)}</pre>*/}
    </main>
  )
}

export { FormPage }
