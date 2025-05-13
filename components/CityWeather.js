import React from 'react';

export default function CityWeather({ city, weatherData }) {
  if (!weatherData) return <div>Loading...</div>;
  return (
    <div className="card m-4 text-center" >
      <div className="card-body" >
        <h5 className="card-title">{city}</h5>
        <div className="weather-icon my-3">
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
        </div>
        <ul className="list-unstyled">
          <li>
            <span className="fw-bold">Température: </span>
            {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
          </li>
          <li>
            <span className="fw-bold">Condition: </span>
            {weatherData.current.condition.text}
          </li>
          <li>
            <span className="fw-bold">Humidité: </span>
            {weatherData.current.humidity}%
          </li>
          <li>
            <span className="fw-bold">Vent: </span>
            {weatherData.current.wind_kph} km/h
          </li>
        </ul>
        <a href={`/details/${city}`} className="btn btn-primary mt-3">
          Voir en détails
        </a>
      </div>
    </div>
  );
};


