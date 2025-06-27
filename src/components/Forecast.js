import { useState } from 'react';

export default function Forecast({ data }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleDayClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>5-Day Forecast</h3>
      {expandedIndex !== null ? (
        <div style={styles.expandedWrapper}>
          <div style={styles.expandedCard}>
            <div style={styles.expandedLeft}>
              <p style={styles.day}>
                {new Date(data[expandedIndex].dt_txt).toLocaleDateString('en-IN', { weekday: 'long' })}
              </p>
              <p style={styles.condition}>{data[expandedIndex].weather[0].description}</p>
              <p style={styles.tempBig}>🌡️ {data[expandedIndex].main.temp.toFixed(1)}°C</p>
            </div>
            <div style={styles.expandedRight}>
              <p>Feels Like: {data[expandedIndex].main.feels_like.toFixed(1)}°C</p>
              <p>Min: {data[expandedIndex].main.temp_min.toFixed(1)}°C</p>
              <p>Max: {data[expandedIndex].main.temp_max.toFixed(1)}°C</p>
              <p>Humidity: {data[expandedIndex].main.humidity}%</p>
              <p>Wind: {data[expandedIndex].wind.speed} m/s</p>
              <p>Pressure: {data[expandedIndex].main.pressure} hPa</p>
            </div>
          </div>
          <div style={styles.stackGrid}>
            {data.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleDayClick(idx)}
                style={{
                  ...styles.stackCard,
                  background: idx === expandedIndex ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'
                }}
              >
                <p><strong>{new Date(item.dt_txt).toLocaleDateString('en-IN', { weekday: 'short' })}</strong></p>
                <p>{item.weather[0].main}</p>
                <p>🌡️ {item.main.temp.toFixed(1)}°C</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={styles.grid}>
          {data.map((item, idx) => (
            <div key={idx} style={styles.card} onClick={() => handleDayClick(idx)}>
              <p style={styles.day}>{new Date(item.dt_txt).toLocaleDateString('en-IN', { weekday: 'short' })}</p>
              <p style={styles.condition}>{item.weather[0].main}</p>
              <p style={styles.temp}>🌡️ {item.main.temp.toFixed(1)}°C</p>
              <p style={styles.meta}>💧 {item.main.humidity}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '1rem',
    color: '#fff',
  },
  heading: {
    fontSize: '22px',
    marginBottom: '1.5rem',
    fontWeight: '600',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '1.2rem',
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    padding: '1rem',
    borderRadius: '14px',
    textAlign: 'center',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
    fontFamily: `'Segoe UI', sans-serif`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  expandedWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  expandedCard: {
    display: 'flex',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    backdropFilter: 'blur(14px)',
    justifyContent: 'space-between',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
    flexWrap: 'wrap',
  },
  expandedLeft: {
    flex: 1,
    minWidth: '220px',
  },
  expandedRight: {
    flex: 1,
    fontSize: '15px',
    lineHeight: '1.8',
    minWidth: '220px',
  },
  stackGrid: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
  },
  stackCard: {
    minWidth: '100px',
    background: 'rgba(255,255,255,0.08)',
    padding: '0.8rem',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  day: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '0.3rem',
  },
  condition: {
    fontSize: '14px',
    color: '#ddd',
    marginBottom: '0.5rem',
  },
  temp: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: '0.3rem',
  },
  tempBig: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0.8rem 0',
  },
  meta: {
    fontSize: '14px',
    color: '#f0f0f0',
  },
};
