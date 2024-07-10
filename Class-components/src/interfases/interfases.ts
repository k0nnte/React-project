import { ReactNode } from 'react';

export interface Iresponse {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: Array<string>;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: Array<string>;
  starships: Array<string>;
  url: string;
  vehicles: Array<string>;
}

export interface Iplanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Ifilms {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Ispecies {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Istarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Ivehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
export interface IapiEndpoints {
  people: string;
  planets: string;
  films: string;
  species: string;
  vehicles: string;
  starships: string;
}

export interface Icart {
  response:
    | Iresponse
    | Iplanet
    | Ifilms
    | Ispecies
    | Istarship
    | Ivehicle
    | IapiEndpoints;
}

export interface Idata {
  mas: (
    | Iresponse
    | Iplanet
    | Ifilms
    | Ispecies
    | Istarship
    | Ivehicle
    | IapiEndpoints
  )[];
  isLoad: boolean;
  iserror: boolean;
}

export interface Iobject {
  search: string;
}

export interface props {
  children: ReactNode;
}

export interface state {
  hasError: boolean;
}

export interface Istate {
  inputInfo: string;
  err: boolean;
}
export interface IInputvalueState {
  searchText: string;
}

export interface Irequest {
  count: number;
  next: string | null;
  previous: string | null;
  results: Iresponse[];
}
