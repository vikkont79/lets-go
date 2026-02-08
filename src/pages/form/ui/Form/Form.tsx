import { Input } from '@/shared/ui'
import { useFormSubmit, useTripForm, validateStep } from '../../lib'
import { TransportSelector } from '../TransportSelector/TransportSelector'
import styles from './Form.module.css'
import { DatePicker } from '../DatePicker/DatePicker'
import { StepList } from '../StepList/StepList'
import { useCallback, useState } from 'react'
import { StepsNav } from '../StepsNav/StepsNav'
import { CountrySelect } from '@/widgets/country-select'
import { UserInfo } from '@/widgets/user-info'
import { generateUser } from '@/entities/user'
import { CountryPlan } from '../CountryPlans/CountryPlans'
import { Counters } from '../Counters/Counters'

const FormPage = () => {
  const [currentUser] = useState(() => generateUser())
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

  const {
    handleSubmit,
    isSubmit
  } = useFormSubmit(formData, currentUser)

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({})

  const handleNextClick = useCallback(() => {
    const stepKey = `step${currentStep}` as const;
    const validation = validateStep(stepKey, formData)
    if (!validation.isValid) {
      setStepErrors(validation.errors);
      return;
    }
    setStepErrors({})
    currentStep < 3 ? goToNextStep() : handleSubmit()
  }, [currentStep, formData, goToNextStep, handleSubmit])

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
              <Counters
                companions={formData.companions}
                duration={formData.duration}
                onCompanionsChange={handleCompanionsChange}
                onDurationChange={handleDurationChange}
                errors={stepErrors}
              />
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
              <CountryPlan
                countries={formData.countries}
                onPlanChange={handlePlanChange}
                errors={stepErrors}
              />
              <StepsNav
                currentStep={currentStep}
                onNext={handleNextClick}
                onBack={handleBackClick}
                isSubmit={isSubmit}
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
