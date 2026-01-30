import type { Country } from "@/features/country-dropdown/model/countries";
import type { TRANSPORT_OPTIONS } from "../constants";


export type TransportType = typeof TRANSPORT_OPTIONS[number];

export interface FormData {
  tags: string;
  transport: TransportType[];
  companions: number;
  duration: number;
  dates: TripDateRange;
  countries: Country[];
}

export type TripDateRange = {
  from: Date | undefined;
  to?: Date | undefined;
} | undefined;



