export interface ICard {
  title: string;
  description_en: string;
  description_pt: string;
  slides?: string[];
  type: number;
  region: number;
  coordinates: Coords;
  facilities?: Facilities;
}
interface Coords {
  lat: number;
  lon: number;
}
interface Facilities {
  wc?: boolean;
  restaurants?: boolean;
  parks?: boolean;
  others_en?: string;
  others_pt?: string;
}
