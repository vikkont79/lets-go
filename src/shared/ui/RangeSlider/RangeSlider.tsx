import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import styles from './RangeSlider.module.css'
import { useState, useEffect } from 'react'

interface RangeSliderProps {
  min?: number
  max?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  className?: string
  label?: string
}

const RangeSliderComponent = ({
  min = 1,
  max = 100,
  value,
  onChange,
  className = '',
}: RangeSliderProps) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value)
  const [error, setError] = useState<string>('')
  const [inputValues, setInputValues] = useState<[string, string]>([
    String(value[0]),
    String(value[1])
  ])

  // Синхронизация с внешним value
  useEffect(() => {
    setLocalValue(value)
    setInputValues([String(value[0]), String(value[1])])
    setError('')
  }, [value])

  const validateAndApply = (newMin: number, newMax: number): boolean => {
    // Проверка на NaN
    if (isNaN(newMin) || isNaN(newMax)) {
      setError('Введите корректные числа')
      return false
    }

    // Проверка границ
    if (newMin < min || newMax > max) {
      setError(`Значения должны быть от ${min} до ${max}`)
      return false
    }

    // Проверка соотношения min/max
    if (newMin > newMax) {
      setError('Минимальное значение не может быть больше максимального')
      return false
    }

    // Всё ок
    setError('')
    onChange([newMin, newMax])
    return true
  }

  const handleMinBlur = () => {
    const num = Number(inputValues[0])
    validateAndApply(num, localValue[1])
  }

  const handleMaxBlur = () => {
    const num = Number(inputValues[1])
    validateAndApply(localValue[0], num)
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Разрешаем только цифры и пустую строку
    if (val === '' || /^\d+$/.test(val)) {
      setInputValues([val, inputValues[1]])
    }
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Разрешаем только цифры и пустую строку
    if (val === '' || /^\d+$/.test(val)) {
      setInputValues([inputValues[0], val])
    }
  }

  const handleSliderChange = (newValue: [number, number]) => {
    setLocalValue(newValue)
    setInputValues([String(newValue[0]), String(newValue[1])])
    setError('')
    onChange(newValue)
  }

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      <div className={styles.inputs}>
        <input
          type="text"
          inputMode="numeric"
          value={inputValues[0]}
          onChange={handleMinChange}
          onBlur={handleMinBlur}
          aria-label="Минимальное значение"
        />
        <span className={styles.separator}>—</span>
        <input
          type="text"
          inputMode="numeric"
          value={inputValues[1]}
          onChange={handleMaxChange}
          onBlur={handleMaxBlur}
          aria-label="Максимальное значение"
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <RangeSlider
        min={min}
        max={max}
        value={localValue}
        onInput={handleSliderChange}
      />
    </div>
  )
}

export { RangeSliderComponent as RangeSlider }
