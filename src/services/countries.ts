import axios from 'axios';
import { Country } from '../models/types.ts';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
  return axios.get(`${baseUrl}/all`);
};

const getCountry = (country: Country) => {
  return axios.get(`${baseUrl}/name/${country}`);
};

export default { getAll, getCountry };
