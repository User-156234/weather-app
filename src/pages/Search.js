import { useState } from 'react';
import { getCurrentWeather, getWeeklyForecast } from '../api';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';

export default function Search() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a location");
      return;
    }
  
    try {
      const data = await getCurrentWeather(query);
      setWeather(data);
    } catch (error) {
      alert("Location not found. Please try again.");
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city or village"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {weather && <WeatherCard data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
