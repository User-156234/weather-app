import { useState } from 'react';
import { getCurrentWeather } from '../api';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';

export default function Search() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a location");
      return;
    }

    try {
      const data = await getCurrentWeather(query);
      data.name=query
      setWeather(data);

      // Fetch forecast based on coordinates from current weather
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );

      if (!forecastRes.ok) throw new Error("Forecast fetch failed");
      const forecastData = await forecastRes.json();

      // Filter to get daily forecast (12:00 PM)
      const dailyForecasts = forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecasts);
      setError('');
    } catch (err) {
      setError("Location not found. Please try again.");
      setWeather(null);
      setForecast([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Search Weather</h2>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter city or village"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>Search</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}

        {weather && (
          <div style={{ marginTop: '2rem' }}>
            <WeatherCard data={weather} />
          </div>
        )}

        {forecast.length > 0 && (
          <div style={styles.forecastSection}>
            <Forecast data={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#1E1E1E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '4rem 1rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(18px)',
    borderRadius: '20px',
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  heading: {
    fontSize: '30px',
    marginBottom: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    textShadow: '2px 2px 6px rgba(0,0,0,0.4)',
    letterSpacing: '1px',
  },
  searchBox: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.8rem 1.2rem',
    borderRadius: '12px',
    border: 'none',
    width: '65%',
    fontSize: '16px',
    outline: 'none',
    background: '#ffffff',
    color: '#333',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
  button: {
    padding: '0.8rem 1.6rem',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    color: '#333',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  error: {
    color: '#ffaaaa',
    marginTop: '1rem',
    fontWeight: 'bold',
  },
  forecastSection: {
    marginTop: '2rem',
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
    color: 'white',
    backdropFilter: 'blur(12px)',
  },
  subtitle: {
    fontSize: '22px',
    marginBottom: '1rem',
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
};
