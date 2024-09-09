import './index.css';
import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import countriesService from './services/countries.ts';
import weatherService from './services/weather.ts';
import Searchbar from './components/Searchbar.tsx';
import FavoriteCard from './components/FavoriteCard.tsx';
import { Country, Weather } from './models/types.ts';
import { AxiosResponse } from 'axios';

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<Country[]>([]);
  const [weather, setWeather] = useState<Weather>({});
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [favorites, setFavorites] = useState<Country[]>([]);

  useEffect(() => {
    countriesService.getAll().then((response: AxiosResponse<Country[]>) => {
      setCountries(response.data);
    });

    const savedFavorites: Country[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (search.length === 1) {
      setSelectedCountry(search[0]);
    }
  }, [search]);

  useEffect(() => {
    if (selectedCountry) {
      weatherService
        .getWeather(selectedCountry.capital as any)
        .then((response: AxiosResponse<Country[]>) =>
          setWeather(response.data as any)
        )
        .catch((error: Error) => console.log(error));
    }
  }, [selectedCountry]);

  const handleCountries = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  const showCountry = (name: string) => {
    const handler = () => {
      setSearch(search.filter((country) => country.name.common === name));
    };
    return handler;
  };

  const addToFavorites = (country: Country) => {
    if (!favorites.some((fav) => fav.name.common === country.name.common)) {
      const updatedFavorites = [...favorites, country];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (country: Country) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.name.common !== country.name.common
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const searchReturn = (countries: Country[]) => {
    if (countries.length <= 0 || countries.length === 250) {
      return <></>;
    }

    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (countries.length === 1) {
      const country = countries[0];
      return (
        <ul>
          <li>
            <h2 className="country-header">{country.name.common}</h2>
          </li>
          <li>Capital: {country.capital[0]}</li>
          <li>Area: {country.area}</li>
          <li>
            <h3>languages:</h3>
            <ul className="languages">
              {Object.keys(country.languages).map((key, index) => (
                <li key={index}>
                  {key}: {country.languages[key]}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <img src={country.flags.svg} alt="Country flag" width="150" />
          </li>
          <li>
            <h3 className="weather-header">Weather in {country.capital}</h3>
          </li>
          <li>Temperature: {weather.main?.temp} Celsius</li>
          {weather.weather && weather.weather[0] && (
            <li>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </li>
          )}
          <li>Wind: {weather.wind?.speed} m/s</li>
          <li>
            <button
              className="show-btn"
              onClick={() => addToFavorites(country)}
            >
              Add to favorites
            </button>
            <button
              className="remove-btn"
              onClick={() => removeFromFavorites(country)}
            >
              Remove from favorites
            </button>
          </li>
        </ul>
      );
    }

    if (countries.length > 1 && countries.length <= 10) {
      return countries.map((country) => (
        <li key={country.cca3}>
          <span>{country.name.common}</span>{' '}
          <button onClick={showCountry(country.name.common)}>show</button>
        </li>
      ));
    }
  };

  const renderFavorites = () => {
    if (favorites.length === 0) {
      return <p>No favorite countries yet.</p>;
    }
    return (
      <div className="favorites-container">
        {favorites.map((country) => (
          <FavoriteCard
            key={country.cca3}
            country={country}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Dynamic Country Search</h1>
      <h2>Search a country</h2>
      <Searchbar handleCountries={handleCountries} />
      <ul>{searchReturn(search)}</ul>
      <h2>Your Favorite Countries</h2>
      {renderFavorites()}
    </div>
  );
};

export default App;
