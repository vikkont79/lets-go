import type { TRANSPORT_OPTIONS } from '@/shared/constants';


export type TransportType = typeof TRANSPORT_OPTIONS[number];

export type TripDateRange = {
  from: Date | undefined;
  to?: Date | undefined;
} | undefined;

export type Country = { code: string; name_ru: string };

export interface FormData {
  tags: string;
  transport: TransportType[];
  companions: number;
  duration: number;
  dates: TripDateRange;
  countries: Country[];
  entertainment: string;
}





