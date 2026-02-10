import { DayPicker } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import type { TripDateRange } from '@/shared//types'
import './DatePicker.module.css'
import { memo } from 'react';

interface DatePickerProps {
  value: TripDateRange;
  onChange: (range: TripDateRange) => void;
}

const DatePickerComponent = ({
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

const DatePicker = memo(DatePickerComponent)

export { DatePicker }


