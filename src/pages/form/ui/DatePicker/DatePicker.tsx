
import { DayPicker } from 'react-day-picker'
import { ru } from 'date-fns/locale';
import 'react-day-picker/dist/style.css'
import type { TripDateRange } from '../../types';

interface DatePickerProps {
  value: TripDateRange;
  onChange: (range: TripDateRange) => void;
}

const DatePicker = ({
  value,
  onChange,
}: DatePickerProps) => {
  return (
    <DayPicker
      mode='range'
      selected={value}
      onSelect={onChange}
      disabled={{ before: new Date() }}
      required
      min={1}
      max={30}
      excludeDisabled
      locale={ru}
    />
  )
}

export { DatePicker }


