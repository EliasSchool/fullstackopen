import React from "react";
import { useState, useEffect } from 'react'
import axios, { all } from 'axios'
import Countries from './components/Countries'
import Suggestions from './components/Suggestions'
import CountryInfo from "./components/CountryInfo";


const App = () => {
  console.log("App");
  const [allCountries, SetAllCountries] = useState([])
  const [countries, SetCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filterCountries, SetFilterCountries] = useState("")

  useEffect(() => {
    axios 
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
          console.log("request completed");
          SetAllCountries(response.data)
      })
  }, [])


  useEffect(() => {
    const filteredCountries = allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(filterCountries.toLowerCase())
    );
    SetCountries(filteredCountries);
  }, [allCountries, filterCountries]);
    
  const handleSearch = (event) => {
    event.preventDefault();
    SetFilterCountries(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <div>
      <Countries handleSearch={handleSearch} />
      {selectedCountry ? (
        <CountryInfo country={selectedCountry}/>
      ) : countries.length === 1 ? (
        <CountryInfo country={countries[0]} />
      ) : countries.length < 10 && countries.length > 1 ? (
        <Suggestions countries={countries} setSelectedCountry={setSelectedCountry}/>
      ) : countries.length <= 0 ? (
        <p>Not any countries that match your search</p>
      ) : (
          <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
}

export default App;