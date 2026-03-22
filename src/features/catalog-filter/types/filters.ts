import type { FOOD_OPTIONS, HOBBY_OPTIONS, MUSIC_OPTIONS } from '@/shared/constants'
import type { TransportType } from '@/shared/types'

export type HobbyType = typeof HOBBY_OPTIONS[number]['key']
export type MusicType = typeof MUSIC_OPTIONS[number]['key']
export type FoodType = typeof FOOD_OPTIONS[number]['key']

export interface FiltersData {
  hobbies: HobbyType[];
  music: MusicType[];
  food: FoodType[];
  transport: TransportType[];
  level: [number, number];
}
