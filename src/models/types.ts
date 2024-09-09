export interface Country {
  name: {
    common: string;
  };
  capital: string[];
  area: number;
  languages: Record<string, string>;
  flags: {
    svg: string;
  };
  cca3: string;
}

export interface Weather {
  main?: {
    temp: number;
  };
  weather?: {
    icon: string;
  }[];
  wind?: {
    speed: number;
  };
}
