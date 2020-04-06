import React from 'react';
import {useState} from "react";
import {City} from "../store/cities/types";
import {CitiesAdapter} from "../api/CitiesAdapter";

type SearchProps = { updateCities: (cities: City[]) => void, setLoading: (loading: boolean) => void, setHasSearched: (searched: boolean) => void };

const Search = ({updateCities, setLoading, setHasSearched}: SearchProps) => {
  const [input, setInput] = useState<string>('');
  const cities = new CitiesAdapter();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => setInput(event.currentTarget.value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!input.match(/^[A-Za-z]+$/)) {
      alert('invalid input');
    }
    setLoading(true);
    const foundCities = await cities.getCities(input);
    setLoading(false);
    setHasSearched(true);
    if(foundCities) {
      updateCities(foundCities);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <input onChange={handleChange} placeholder={'ba'}/>
      <input type='submit' value="Search"/>
    </form>
  );
};

export default Search;