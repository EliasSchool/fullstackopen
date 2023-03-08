import React from "react";

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <p><b>Languages:</b></p>
            {Object.values(country.languages).map((language) => (
              <li style={{marginLeft:30}}key={language}>{language}</li>
            ))}
            <img style={{marginTop:30}}src={country.flags.png}></img>
        </div>
    )
}


export default Country;