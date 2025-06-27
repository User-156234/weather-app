import { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [bgStyle, setBgStyle] = useState(styles.defaultBg);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Fetch current weather
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
          );
          if (!response.ok) throw new Error("Failed to fetch weather");
          const data = await response.json();
          setWeather(data);

          // Background based on temperature
          setBgStyle(styles.defaultBg);

          // Fetch forecast
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
          );
          if (!forecastResponse.ok) throw new Error("Failed to fetch forecast");
          const forecastData = await forecastResponse.json();

          const dailyForecasts = forecastData.list.filter(entry =>
            entry.dt_txt.includes("12:00:00")
          );
          setForecast(dailyForecasts);
        } catch (err) {
          setError('Error fetching weather: ' + err.message);
        }
      },
      (err) => setError('Location access denied: ' + err.message)
    );
  }, []);

  return (
    <div style={{ ...styles.base, ...bgStyle }}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>Current Weather</h1>
          {error && <p style={styles.error}>{error}</p>}
          {weather ? (
            <WeatherCard data={weather} />
          ) : (
            !error && <p style={styles.loading}>Loading current weather...</p>
          )}
        </div>

        {forecast.length > 0 && (
          <div style={styles.forecastSection}>
            <h2 style={styles.subtitle}>Weekly Forecast</h2>
            <Forecast data={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  base: {
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    transition: 'background 1s ease',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  
  defaultBg: {
    background: '#1E1E1E'
  },
  wrapper: {
    width: '100%',
    maxWidth: '960px',
    backdropFilter: 'blur(6px)',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    padding: '2rem',
    textAlign: 'center',
    color: '#fff',
    marginBottom: '2rem',
  },
  forecastSection: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '1.5rem',
    color: '#fff',
    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '32px',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: '1rem',
    fontWeight: '500',
    color: '#f0f0f0'
  },
  error: {
    color: '#ffb3b3',
    fontWeight: 'bold',
  },
  loading: {
    fontStyle: 'italic',
    color: '#eee',
  }
};
