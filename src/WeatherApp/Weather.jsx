import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "da2485f462d9490ba7062931251303"; // Replace with your API key

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Fetching Celsius

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData();
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Enter city" value={city} onChange={handleCityChange} />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C / {(weatherData.main.temp * 9/5 + 32).toFixed(2)}°F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
