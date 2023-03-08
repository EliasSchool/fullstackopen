import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";
import Weather from "./Weather";
const CountryInfo = ( { country } ) => {

    return (
    <div>
      <Country country={country}/>
      <Weather capital={country.capital}/>
    </div>
    )
} 


export default CountryInfo;