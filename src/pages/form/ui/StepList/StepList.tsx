import styles from './StepList.module.css'

interface StepListProps {
  currentStep: 1 | 2 | 3;
}

const StepList = ({ currentStep }: StepListProps) => {
  return (
    <ul className={styles.stepList}>
      <li className={`${styles.stepItem} ${currentStep === 1 ? styles.active : ''}`}>
        Даты
      </li>
      <li className={`${styles.stepItem} ${currentStep === 2 ? styles.active : ''}`}>
        Маршрут
      </li>
      <li className={`${styles.stepItem} ${currentStep === 3 ? styles.active : ''}`}>
        Развлечения
      </li>
    </ul>
  )
}

export { StepList }
