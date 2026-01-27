import { Button } from '@/shared/ui';
import styles from './StepsNav.module.css';

interface StepsNavProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
}

const StepsNav = ({
  currentStep,
  onNext,
  onBack,
}: StepsNavProps) => {

  return (
    <div className={styles.stepsNav}>
      <Button onClick={onNext}>
        {currentStep === 3 ? 'Отправить' : 'Следующий шаг'}
      </Button>

      {currentStep > 1 && (
        <Button onClick={onBack} variant="outline">
          На шаг назад
        </Button>
      )}
    </div>
  );
};

export { StepsNav };
