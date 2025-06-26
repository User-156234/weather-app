import { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

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
        } catch (err) {
          setError('Error fetching weather: ' + err.message);
        }
      },
      (err) => setError('Location access denied: ' + err.message)
    );
  }, []);

  return (
    <div>
      <h1>Weather in Your Location</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather ? (
        <WeatherCard data={weather} />
      ) : (
        !error && <p>Loading current weather...</p>
      )}
    </div>
  );
}
