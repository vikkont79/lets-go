import type { Country } from "@/shared/types";
import { COUNTRIES } from "../model/countries"


export const fetchCountriesByLetter = (
  letter: string
): Promise<Country[]> => {
  return new Promise((resolve, reject) => {
    // Имитируем небольшую сетевую задержку (как у реального API)
    setTimeout(() => {
      try {
        // Приводим букву к нижнему регистру для регистронезависимого поиска
        const normalizedLetter = letter.toLowerCase().trim();

        if (!normalizedLetter || normalizedLetter.length !== 1) {
          // Имитируем валидацию на сервере - если буква некорректна, возвращаем пустой массив
          resolve([]);
          return;
        }

        // Фильтруем страны: название должно начинаться с заданной буквы
        const filteredCountries = COUNTRIES.filter(country =>
          country.name_ru.toLowerCase().startsWith(normalizedLetter)
        );

        // Имитируем сортировку на сервере - по алфавиту
        const sortedCountries = [...filteredCountries].sort((a, b) =>
          a.name_ru.localeCompare(b.name_ru, 'ru')
        );

        // Возвращаем результат
        resolve(sortedCountries);
      } catch (error) {
        // Имитируем ошибку сервера при необходимости
        reject(new Error('Не удалось загрузить список стран'));
      }
    }, 50); // 50ms задержка - похоже на реальный сетевой запрос
  });
};
