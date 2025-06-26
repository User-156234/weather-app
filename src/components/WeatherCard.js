export default function WeatherCard({ data }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.city}>{data.name}</h2>
      <p style={styles.desc}>{data.weather[0].description.toUpperCase()}</p>
      <div style={styles.details}>
        <p style={styles.item}>🌡️ <span>Temperature:</span> {data.main.temp} °C</p>
        <p style={styles.item}>💧 <span>Humidity:</span> {data.main.humidity}%</p>
        <p style={styles.item}>🌬️ <span>Wind Speed:</span> {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(15px)',
    borderRadius: '16px',
    padding: '1.8rem',
    color: '#fdfdfd',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    fontFamily: `'Segoe UI', sans-serif`,
  },
  city: {
    fontSize: '30px',
    fontWeight: 600,
    marginBottom: '0.5rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
  desc: {
    fontSize: '16px',
    color: '#eaeaea',
    marginBottom: '1rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
    fontSize: '16px',
  },
  item: {
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '0.6rem',
    borderRadius: '10px',
    fontWeight: 500,
    color: '#ffffff',
    textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.4)',
  }
};
