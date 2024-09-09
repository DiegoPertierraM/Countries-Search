import React from 'react';
import './Searchbar.css';
import { SearchbarProps } from '../models/props.ts';

const Searchbar: React.FC<SearchbarProps> = ({ handleCountries }) => {
  return (
    <>
      <input type="text" onChange={handleCountries} />
    </>
  );
};

export default Searchbar;
