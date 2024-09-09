import axios from 'axios';
import { Country } from '../models/types.ts';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const apiKey = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (country: Country) => {
  return axios.get(`${baseUrl}${country}&appid=${apiKey}&units=metric`);
};

export default { getWeather };
