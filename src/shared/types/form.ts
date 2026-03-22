import type { TRANSPORT_OPTIONS } from '../constants';

export type TransportType = typeof TRANSPORT_OPTIONS[number];

export type TripDateRange = {
  from: Date | undefined;
  to: Date | undefined;
} | undefined;

export type Country = {
  id?: string;
  code: string;
  name_ru: string;
  continent: string;
  plan?: string;
}

export interface FormData {
  tags: string;
  transport: TransportType[];
  companions: number;
  hasChildren: boolean;
  duration: number;
  dates: TripDateRange;
  countries: Country[];
}





