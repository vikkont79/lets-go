import { CounterInput, Input, Textarea } from '@/shared/ui'
import { useTripForm, validateStep } from '../../lib'
import { TransportSelector } from '../TransportSelector/TransportSelector'
import styles from './Form.module.css'
import { DatePicker } from '../DatePicker/DatePicker'
import { StepList } from '../StepList/StepList'
import { useCallback, useState } from 'react'
import { StepsNav } from '../StepsNav/StepsNav'
import { CountrySelect } from '@/widgets/country-select'
import { UserInfo } from '@/widgets/user-info'

const FormPage = () => {
  const {
    formData,
    currentStep,
    handleTagsChange,
    handleToggleTransport,
    handleCompanionsChange,
    handleDurationChange,
    handleDateChange,
    handleAddCountry,
    handleRemoveCountry,
    handleReplaceCountry,
    handlePlanChange,
    goToNextStep,
    goToPrevStep,
  } = useTripForm()

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const handleNextClick = useCallback(() => {
    const stepKey = `step${currentStep}` as const;
    const validation = validateStep(stepKey, formData);

    if (!validation.isValid) {
      setStepErrors(validation.errors);
      return;
    }

    setStepErrors({});
    goToNextStep();
  }, [currentStep, formData, goToNextStep])

  const handleBackClick = useCallback(() => {
    setStepErrors({});
    goToPrevStep();
  }, [goToPrevStep])

  return (
    <main className={styles.main}>
      <h1 className='visually-hidden'>
        Страница планирования путешествия
      </h1>
      <p className={styles.title}>Направления</p>
      <UserInfo className={styles.user} />
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
                  error={stepErrors.companions}
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
                  error={stepErrors.duration}
                />
              </div>
              <DatePicker
                value={formData.dates}
                onChange={handleDateChange}
              />
              <StepsNav
                currentStep={currentStep}
                onNext={handleNextClick}
                onBack={handleBackClick}
              />
            </fieldset>
          )}
          {currentStep === 2 && (
            <fieldset className={styles.stepField}>
              <legend className='visually-hidden'>Выбор маршрута</legend>
              <div className={styles.stepContent}>
                <div className={styles.stepIntro}>
                  <p className={styles.stepTitle}>Шаг 2. Маршрут</p>
                  <p className={styles.stepDescription}>Укажите страны, которые вы хотели бы посетить.<br />
                    Это может быть одна или сразу несколько.</p>
                </div>
                <StepList
                  currentStep={currentStep}
                />
              </div>
              <CountrySelect
                selected={formData.countries}
                onAdd={handleAddCountry}
                onRemove={handleRemoveCountry}
                onReplace={handleReplaceCountry}
                error={stepErrors.countries}
              />
              <StepsNav
                currentStep={currentStep}
                onNext={handleNextClick}
                onBack={handleBackClick}
              />
            </fieldset>
          )}
          {currentStep === 3 && (
            <fieldset className={styles.stepField}>
              <legend className='visually-hidden'>Выбор развлечений</legend>
              <div className={styles.stepContent}>
                <div className={styles.stepIntro}>
                  <p className={styles.stepTitle}>Шаг 3. Развлечения</p>
                  <p className={styles.stepDescription}>Наконец, расскажите о своих планах времяпровождения.<br />
                    Можно писать в свободной форме и ставить тэги.
                  </p>
                </div>
                <StepList
                  currentStep={currentStep}
                />
              </div>
              <div className={styles.plans}>
                {formData.countries.map(country => (
                  <div className={styles.plan} key={country.code}>
                    <p className={styles.country}>{country.name_ru}</p>
                    <img
                      src={`https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/${country.code.toLowerCase()}.svg`}
                      alt={country.name_ru}
                      className={styles.flag}
                      width={70}
                      height={47}
                      onError={(e) => {
                        // fallback: скрыть или поставить заглушку
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <Textarea
                      className={styles.textarea}
                      value={country.plan || ''}
                      onChange={(value) => handlePlanChange(country.code, value)}
                      placeholder='План действий'
                      label={`Информация о досуге в ${country.name_ru}`}
                      hiddenLabel={true}
                      error={stepErrors[`plan-${country.code}`]}
                      rows={5}
                    />
                  </div>
                ))}
              </div>
              <StepsNav
                currentStep={currentStep}
                onNext={handleNextClick}
                onBack={handleBackClick}
              />
            </fieldset>
          )}
        </div>
      </form>
      {/*<pre>{JSON.stringify(formData, null, 2)}</pre>*/}
    </main>
  )
}

export { FormPage }
