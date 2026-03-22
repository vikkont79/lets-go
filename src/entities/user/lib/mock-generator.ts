import { fakerRU as faker } from '@faker-js/faker'
import type { User } from '../types'

export function generateUser(): User {
  return {
    id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    level: faker.number.int({ min: 1, max: 100 }),
  }
}
