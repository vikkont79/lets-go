import type { User } from "@/entities/user";
import type { Country, TransportType, TripDateRange } from "@/shared/types";

export interface Trip {
  id: string;
  tags: string;
  transport: TransportType[];
  companions: number;
  duration: number;
  dates: TripDateRange;
  countries: Country[];
  user: User;
  createdAt?: string;
}
