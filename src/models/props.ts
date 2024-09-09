import { Country } from './types.ts';

export interface FavoriteCardProps {
  country: Country;
  removeFromFavorites: (country: Country) => void;
}

export interface SearchbarProps {
  handleCountries: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
