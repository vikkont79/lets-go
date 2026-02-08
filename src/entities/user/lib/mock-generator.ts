import { fakerRU as faker } from '@faker-js/faker'
import type { User } from '../types';

export function generateUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName()
  }
}
