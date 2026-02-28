// shared/ui/RangeSlider/RangeSlider.tsx
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
  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      <div className={styles.inputs}>
        <input
          type="number"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([+e.target.value, value[1]])}
        />
        <span>—</span>
        <input
          type="number"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], +e.target.value])}
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
