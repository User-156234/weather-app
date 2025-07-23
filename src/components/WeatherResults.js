// src/components/WeatherResults.js
import WeatherCard from './WeatherCard';
import Forecast from './Forecast';
import HourlyForecast from './HourlyForecast';

export default function WeatherResults({ weather, hourlyForecast, forecast, error, styles }) {
  // Show an error message if the API call fails
  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  // Don't render anything if there's no data yet
  if (!weather) {
    return null;
  }

  return (
    <>
      <div style={{ marginTop: '2rem' }}>
        <WeatherCard data={weather} />
      </div>

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
    </>
  );
}