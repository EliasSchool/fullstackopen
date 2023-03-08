import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState([]);
    const api_key = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&q=${capital}&appid=${api_key}&units=metric`
    console.log(url)
    useEffect(() => {
        axios
          .get(url)
          .then((res) => {
            console.log(res.data.main.temp) 
            setWeather(res.data)
          }) 
      }, capital, api_key)

    console.log(weather)
    return (
        <div>
            {weather.weather && weather.weather.length > 0 && (
                <div>
                    <h2>Weather in {capital}</h2>
                    <p>temperature {weather.main.temp} Celsius</p>
                    <img
                      style={{height: 100, width: 100, marginLeft: 10}}
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt={weather.weather[0].description}
                      ></img>
                      <p>wind {weather.wind.speed} m/s</p>
                    </div>
                      )}
        </div>
    )
}

export default Weather;