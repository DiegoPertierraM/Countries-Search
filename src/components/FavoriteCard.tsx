import React from 'react';
import './FavoriteCard.css';
import { FavoriteCardProps } from '../models/props.ts';

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  country,
  removeFromFavorites,
}) => {
  return (
    <div className="favorite-card">
      <h3>{country.name.common}</h3>
      <img src={country.flags.svg} alt="Country flag" width="100" />
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <p>
        Languages:{' '}
        {Object.keys(country.languages)
          .map((key) => country.languages[key])
          .join(', ')}
      </p>
      <button
        className="remove-btn"
        onClick={() => removeFromFavorites(country)}
      >
        Remove from favorites
      </button>
    </div>
  );
};

export default FavoriteCard;
