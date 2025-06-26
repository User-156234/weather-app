export default function Forecast({ data }) {
    return (
      <div>
        <h3>7-Day Forecast</h3>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          {data.map((day, idx) => (
            <div key={idx} style={{ border: '1px solid gray', padding: '0.5rem' }}>
              <p>{new Date(day.dt * 1000).toDateString()}</p>
              <p>🌡️ Day: {day.temp.day}°C</p>
              <p>🌡️ Night: {day.temp.night}°C</p>
              <p>{day.weather[0].main}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  