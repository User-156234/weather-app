import { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [bgStyle, setBgStyle] = useState(styles.defaultBg);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
          );
          if (!response.ok) throw new Error("Failed to fetch weather");
          const data = await response.json();
          setWeather(data);

          // Set dynamic background based on temperature
          const temp = data.main.temp;
          if (temp < 10) {
            setBgStyle(styles.coldBg);
          } else if (temp >= 10 && temp <= 25) {
            setBgStyle(styles.pleasantBg);
          } else {
            setBgStyle(styles.hotBg);
          }

        } catch (err) {
          setError('Error fetching weather: ' + err.message);
        }
      },
      (err) => setError('Location access denied: ' + err.message)
    );
  }, []);

  return (
    <div style={{ ...styles.base, ...bgStyle }}>
      <div style={styles.card}>
        <h1 style={styles.title}>Current Weather</h1>
        {error && <p style={styles.error}>{error}</p>}
        {weather ? (
          <WeatherCard data={weather} />
        ) : (
          !error && <p style={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  base: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    transition: 'background 1s ease',
  },
  coldBg: {
    background: 'linear-gradient(135deg, #89f7fe, #66a6ff)'  // light icy blue
  },
  pleasantBg: {
    background: 'linear-gradient(135deg, #fceabb, #f8b500)'  // yellowish warm
  },
  hotBg: {
    background: 'linear-gradient(135deg, #ff6a00, #ee0979)'  // orange-red
  },
  defaultBg: {
    background: 'linear-gradient(135deg, #c9d6ff, #e2e2e2)'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(14px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    padding: '2rem',
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
    color: '#333',
  },
  title: {
    color:'black',
    fontSize: '26px',
    marginBottom: '1rem',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  loading: {
    fontStyle: 'italic',
    color: '#666',
  }
};
