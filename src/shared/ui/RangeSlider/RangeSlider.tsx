import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import styles from './RangeSlider.module.css'

interface RangeSliderProps {
  min?: number
  max?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  className?: string
}

const RangeSliderComponent = ({
  min = 1,
  max = 100,
  value,
  onChange,
  className = ''
}: RangeSliderProps) => {
  const preventEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
  }
  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      <div className={styles.inputs}>
        <input
          type="text"
          inputMode="numeric"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([+e.target.value, value[1]])}
          onKeyDown={preventEnter}
        />
        <span className={styles.separator}>—</span>
        <input
          type="text"
          inputMode="numeric"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], +e.target.value])}
          onKeyDown={preventEnter}
        />
      </div>
      <RangeSlider
        min={min}
        max={max}
        value={value}
        onInput={onChange}
      />
    </div>
  )
}

export { RangeSliderComponent as RangeSlider }
