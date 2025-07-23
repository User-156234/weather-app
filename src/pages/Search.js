import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../api';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';
import HourlyForecast from '../components/HourlyForecast';

export default function Search() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState('');

  // 🌐 Fetch live location suggestions
  useEffect(() => {
    if (!query) return;
    const fetchSuggestions = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = async (q) => {
    const term = typeof q === 'string' ? q : query;
    if (!term.trim()) {
      alert('Please enter a location');
      return;
    }

    try {
      const data = await getCurrentWeather(term);
      data.name = term;
      setWeather(data);

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );

      if (!forecastRes.ok) throw new Error('Forecast fetch failed');
      const forecastData = await forecastRes.json();

      // 📅 Daily Forecast (12 PM)
      const daily = forecastData.list.filter(item =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(daily);

      // ⏱ Hourly Forecast (today only)
      const today = new Date().toISOString().split('T')[0];
      const hourly = forecastData.list.filter(entry =>
        entry.dt_txt.startsWith(today)
      );
      setHourlyForecast(hourly);

      setError('');
      setSuggestions([]);
    } catch (err) {
      setError('Location not found. Please try again.');
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
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
          <button onClick={() => handleSearch()} style={styles.button}>Search</button>
        </div>

        {/* 🔍 Suggestions */}
        {suggestions.length > 0 && (
          <ul style={styles.suggestionList}>
            {suggestions.map((sug, i) => (
              <li
                key={i}
                style={styles.suggestionItem}
                onClick={() => {
                  setQuery(`${sug.name}, ${sug.country}`);
                  handleSearch(`${sug.name}, ${sug.country}`);
                }}
              >
                {sug.name}, {sug.state ? `${sug.state}, ` : ''}{sug.country}
              </li>
            ))}
          </ul>
        )}

        {error && <p style={styles.error}>{error}</p>}

        {weather && (
          <div style={{ marginTop: '2rem' }}>
            <WeatherCard data={weather} />
          </div>
        )}

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
    maxWidth: '680px',
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
