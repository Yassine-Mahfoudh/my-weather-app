import { useEffect, useState } from "react";
import CityWeather from "../components/CityWeather";
import "../public/styles/bootstrap.css";
import "../public/styles/global.css";
import { apiKey } from "../config/apiKey";

const defaultCities = ["Paris", "New York", "Tokyo", "Sydney", "Cairo"];
export default function Home() {
  const [cities, setCities] = useState(defaultCities);
  const [newCity, setNewCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [citySuggestions, setCitySuggestions] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCities = localStorage.getItem("cities");
      setCities(storedCities ? JSON.parse(storedCities) : defaultCities);
    }
  }, []);

  useEffect(() => {
    cities.forEach((city) => {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      )
        .then((response) => response.json())
        .then((data) =>
          setWeatherData((prevState) => ({ ...prevState, [city]: data }))
        );
    });
  }, [cities]);

  const addCityToLocalStorage = (updatedCities) => {
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  };

  const fetchCitiesSuggestions = (query) => {
    fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La recherche de suggestions de villes a échoué.");
        }
        return response.json();
      })
      .then((data) => {
        const suggestions = data.map((city) => city.name);
        setCitySuggestions(suggestions);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la recherche de suggestions de villes :",
          error
        );
      });
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setNewCity(value);
    fetchCitiesSuggestions(value);
  };

  const handleAddCity = () => {
    if (!newCity) {
      window.alert("Veuillez entrer le nom d'une ville.");
      return;
    }

    if (cities.includes(newCity)) {
      window.alert("Cette ville est déjà dans la liste.");
      return;
    }

    // Vérifier si la ville existe
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${newCity}`
    )
      .then((response) => {
        if (!response.ok) {
          window.alert("La ville que vous avez entrée n'existe pas.");
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          const updatedCities = [...cities, newCity];
          setCities(updatedCities);
          setNewCity("");
          addCityToLocalStorage(updatedCities);
          setCitySuggestions([]); // Réinitialiser la liste des suggestions
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche de la ville :", error);
      });
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url('/backimg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-center"> Météo Actuelle</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ajouter une ville"
          value={newCity}
          onChange={handleSearchInputChange}
        />
        <ul className="list-group">
          {citySuggestions.map((city, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => setNewCity(city)}
            >
              {city}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-secondary"
          onClick={handleAddCity}
          style={{
            backgroundImage: `url('/backimg4.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          Ajouter
        </button>
      </div>
      <div className="row">
        {cities.map((city) => (
          <div className="col-md-4" key={city}>
            <CityWeather city={city} weatherData={weatherData[city]} />
          </div>
        ))}
      </div>
    </div>
  );
}
