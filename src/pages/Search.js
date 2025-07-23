// src/pages/Search.js
import { useState } from 'react';
import { getCurrentWeather } from '../api';
import SearchComponent from '../components/SearchComponent';
// Make sure these are imported if they are not passed through WeatherResults
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';
import HourlyForecast from '../components/HourlyForecast';


export default function Search() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    setIsLoading(true);
    setError('');
    setWeather(null); // Clear previous results
    
    try {
      const currentWeatherData = await getCurrentWeather(term);
      currentWeatherData.name = term.split(',')[0];
      setWeather(currentWeatherData);

      const { lat, lon } = currentWeatherData.coord;
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      if (!forecastRes.ok) throw new Error('Forecast fetch failed');
      const forecastData = await forecastRes.json();
      
      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
      setForecast(daily);

      const today = new Date().toISOString().split('T')[0];
      const hourly = forecastData.list.filter(entry => entry.dt_txt.startsWith(today));
      setHourlyForecast(hourly);

    } catch (err) {
      setError('Location not found. Please try again.');
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* CARD 1: Search Input */}
      <div style={styles.card}>
        <SearchComponent onSearch={handleSearch} styles={styles} />
      </div>

      {/* Loading state message */}
      {isLoading && <p style={{ color: 'white', margin: '2rem 0' }}>Loading weather data...</p>}
      
      {/* Error message card */}
      {error && !isLoading && (
        <div style={{ ...styles.card, marginTop: '2rem', background: 'rgba(255, 82, 82, 0.2)' }}>
          <p style={styles.error}>{error}</p>
        </div>
      )}

      {/* CARD 2: Weather Results (appears only when data is available) */}
      {weather && !isLoading && (
        <div style={{ ...styles.card, marginTop: '2rem' }}>
          {/* You can use the WeatherResults component or place the items directly */}
          <WeatherCard data={weather} />

          {hourlyForecast.length > 0 && (
            <div style={styles.forecastSection}>
              <h3 style={styles.sectionTitle}>Today’s Hourly Forecast</h3>
              <div style={styles.scrollContainer}>
                <HourlyForecast data={hourlyForecast} />
              </div>
            </div>
          )}

          {forecast.length > 0 && (
            <div style={styles.forecastSection}>
              <h3 style={styles.sectionTitle}>Weekly Forecast</h3>
              <Forecast data={forecast} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Styles object with an updated container style
const styles = {
  container: {
    minHeight: '100vh',
    background: '#1E1E1E',
    display: 'flex',
    flexDirection: 'column', // Stack cards vertically
    alignItems: 'center',    // Center cards horizontally
    padding: '4rem 1rem',
    gap: '0rem' // Reset gap, marginTop will handle spacing
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(18px)',
    borderRadius: '20px',
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '680px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  // ... all other styles from your original file remain the same
  heading: {
    fontSize: '30px',
    marginBottom: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    textShadow: '2px 2px 6px rgba(0,0,0,0.4)',
    letterSpacing: '1px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '1rem',
    textAlign: 'left',
    color: '#f0f0f0',
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
  suggestionList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1rem',
    background: '#2a2a2a',
    borderRadius: '10px',
    overflow: 'hidden',
    textAlign: 'left',
  },
  suggestionItem: {
    padding: '10px 14px',
    cursor: 'pointer',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    color: '#eee',
  },
  error: {
    color: '#ffaaaa',
    // No margin needed if it's the only item in the card
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
    textAlign: 'left',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    gap: '1rem',
    paddingBottom: '0.5rem',
    scrollbarColor: '#666 #2a2a2a',
    scrollbarWidth: 'thin',
  },
};