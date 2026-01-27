// Временный тип для прототипа
type SimpleCountry = 'a' | 'b' | 'c';

interface CountrySelectProps {
  // Массив выбранных "стран" (пока a, b, c)
  selected: SimpleCountry[];
  // Добавить "страну" в конец массива
  onAdd: (country: SimpleCountry) => void;
  // Удалить "страну" по индексу
  onRemove: (index: number) => void;
}

const CountrySelect = ({ selected, onAdd, onRemove }: CountrySelectProps) => {
  // Временное состояние для опций
  const allCountries: SimpleCountry[] = ['a', 'b', 'c'];

  return (
    <div>
      {selected.map((country, index) => (
        <div key={`${country}-${index}`}>
          <select
            value={country}
            onChange={(e) => {
              const newValue = e.target.value as SimpleCountry;
              if (!newValue) {
                // Если выбрали пустое значение — удаляем страну
                onRemove(index);
              } else {
                // Если выбрали другую страну — добавляем новую
                onAdd(newValue);
              }
            }}
          >
            <option value="">-- Удалить --</option>
            {allCountries.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>


          <button
            type="button"
            onClick={() => onRemove(index)}
          >
            ×
          </button>
        </div>
      ))}

      {selected.length < 4 && (
        <div>
          <select
            value=""
            onChange={(e) => {
              const newValue = e.target.value as SimpleCountry;
              if (newValue) {
                onAdd(newValue);
              }
            }}
          >
            <option value="">-- Выберите --</option>
            {allCountries.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export { CountrySelect }
