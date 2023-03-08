import React from "react";

const Suggestions = ( { countries, setSelectedCountry } ) => {
  console.log(countries);
    return (
        <div>
          {countries.map(country => (
            <div key={country.cca2}>
              <span>{country.name.common}</span>
              <button onClick={() => setSelectedCountry(country)}>
                Show
              </button>
            </div>
          ))}
        </div>
      )
}

export default Suggestions;
    
