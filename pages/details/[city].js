import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../../public/styles/bootstrap.css";
import "../../public/styles/global.css";
import { apiKey } from "../../config/apiKey";

export default function CityDetails() {
  const router = useRouter();
  const { city } = router.query;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data));
    }
  }, [city]);

  if (!weatherData) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div
        className="card"
        style={{
          backgroundImage: `url('/backimg4.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="card-body text-center">
          <h1 className="card-title">Détails de la météo pour {city}</h1>
          <p className="card-text ">
            <span className="fw-bold">Pays: </span>
            {weatherData.location.country}
          </p>

          <ul className="list-unstyled">
            <li>
              <span className="fw-bold">Température: </span>
              {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
            </li>
            <li>
              <span className="fw-bold">Condition: </span>
              {weatherData.current.condition.text}
            </li>
            <div className="weather-icon my-3">
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
              />
            </div>
            <li>
              <span className="fw-bold">Humidité: </span>
              {weatherData.current.humidity}%
            </li>
            <li>
              <span className="fw-bold">Vent: </span>
              {weatherData.current.wind_kph} km/h
            </li>
            <li>
              <span className="fw-bold">Latitude: </span>
              {weatherData.location.lat}
            </li>
            <li>
              <span className="fw-bold">Longitude: </span>
              {weatherData.location.lon}
            </li>
          </ul>
          <a href="/home" className="btn btn-primary mt-3">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
