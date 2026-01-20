import type { TRANSPORT_OPTIONS } from "../constants";


export type TransportType = typeof TRANSPORT_OPTIONS[number];

export interface FormData {
  tags: string;
  transport: TransportType[];
}

