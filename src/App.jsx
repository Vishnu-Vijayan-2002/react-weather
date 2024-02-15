import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"
import './bootstrap.min.css'
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c'; 

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again.');
    }
  };


  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
    <div className='main-container'>
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter city" value={city} onChange={handleChange} />
          <button className='btn btn-info m-2' type="submit">Search City</button>
        </form>
        {error && <p>{error}</p>}
        {weatherData && (
          <div className='container'>
            <h2>Weather in {weatherData.name}</h2>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp} Kelvin</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;