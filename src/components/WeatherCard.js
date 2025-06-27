export default function WeatherCard({ data }) {
  const toTime = (unix) =>
    new Date(unix * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div style={styles.card}>
      <h2 style={styles.city}>{data.name}</h2>
      <p style={styles.desc}>{data.weather[0].description.toUpperCase()}</p>

      <div style={styles.tempHighlight}>
        <span style={styles.tempValue}>{data.main.temp}°C</span>
        <span style={styles.feels}>Feels like {data.main.feels_like}°C</span>
      </div>

      <div style={styles.metrics}>
        <div style={styles.col}>
          <span style={styles.label}>💧 Humidity</span>
          <span style={styles.value}>{data.main.humidity}%</span>
        </div>
        <div style={styles.col}>
          <span style={styles.label}>🌬️ Wind</span>
          <span style={styles.value}>{data.wind.speed} m/s</span>
        </div>
        <div style={styles.col}>
          <span style={styles.label}>📟 Pressure</span>
          <span style={styles.value}>{data.main.pressure} hPa</span>
        </div>
        <div style={styles.col}>
          <span style={styles.label}>👁️ Visibility</span>
          <span style={styles.value}>{(data.visibility / 1000).toFixed(1)} km</span>
        </div>
        <div style={styles.col}>
          <span style={styles.label}>🌅 Sunrise</span>
          <span style={styles.value}>{toTime(data.sys.sunrise)}</span>
        </div>
        <div style={styles.col}>
          <span style={styles.label}>🌇 Sunset</span>
          <span style={styles.value}>{toTime(data.sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(18px)',
    borderRadius: '20px',
    padding: '2.5rem',
    color: '#ffffff',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    fontFamily: `'Segoe UI', sans-serif`,
    maxWidth: '550px',
    margin: '0 auto',
  },
  city: {
    fontSize: '30px',
    fontWeight: '600',
    marginBottom: '0.3rem',
    textShadow: '2px 2px 5px rgba(0,0,0,0.4)',
    color: '#f1f1f1',
  },
  desc: {
    fontSize: '14px',
    color: '#eaeaea',
    marginBottom: '1rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  tempHighlight: {
    marginBottom: '2rem',
  },
  tempValue: {
    fontSize: '58px',
    fontWeight: '600',
    fontFamily: `'Poppins', 'Segoe UI', sans-serif`,
    letterSpacing: '-1px',
    color: '#ffffff',
    textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
  },
  feels: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#dddddd',
    marginTop: '0.3rem',
    display: 'block',
  },
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.2rem',
  },
  col: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '0.8rem',
    borderRadius: '12px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#cccccc',
    display: 'block',
    marginBottom: '0.2rem',
  },
  value: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#ffffff',
  },
};
