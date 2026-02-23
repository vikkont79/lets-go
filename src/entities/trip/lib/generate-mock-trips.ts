import { fakerRU as faker } from '@faker-js/faker'
import type { Trip } from '../types'
import type { Country } from '@/shared/types'
import { TRANSPORT_OPTIONS } from '@/shared/constants'

export const generateMockTrip = (countries: Country[]): Trip => {
  const userId = faker.string.uuid()

  return {
    id: userId,
    tags: `#${faker.lorem.word()} #${faker.lorem.word()}`,
    transport: faker.helpers.arrayElements(TRANSPORT_OPTIONS, { min: 1, max: 3 }),
    companions: faker.number.int({ min: 1, max: 10 }),
    duration: faker.number.int({ min: 2, max: 31 }),
    dates: {
      from: faker.date.future(),
      to: faker.date.future()
    },
    countries: faker.helpers.arrayElements(countries, { min: 1, max: 4 })
      .map(country => ({
        ...country,
        plan: faker.lorem.paragraph({ min: 1, max: 3 })
      })),
    user: {
      id: userId,
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      avatar: faker.image.avatar(),
      level: faker.number.int({ min: 1, max: 100 }),
      likes: faker.number.int({ min: 0, max: 5000 })
    },
    createdAt: faker.date.recent({ days: 30 }).toISOString()
  }
}

export const generateMockTrips = (count: number, countries: Country[]): Trip[] => {
  return Array.from({ length: count }, () => generateMockTrip(countries))
}
