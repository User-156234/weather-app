export default function WeatherCard({ data }) {
    return (
      <div style={{ border: "1px solid gray", padding: "1rem", borderRadius: "10px" }}>
        <h2>{data.name}</h2>
        <p>{data.weather[0].description}</p>
        <p>🌡️ Temp: {data.main.temp} °C</p>
        <p>💧 Humidity: {data.main.humidity}%</p>
        <p>🌬️ Wind: {data.wind.speed} m/s</p>
      </div>
    );
  }
  