export interface ICard {
  title: string;
  img: string;
  description: string;
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
  others?: string;
}
