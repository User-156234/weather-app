import { useState } from 'react';

export default function Forecast({ data }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleDayClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>5-Day Forecast</h3>

      {expandedIndex !== null && (
        <div style={styles.expandedCard}>
          <h4 style={styles.day}>
            {new Date(data[expandedIndex].dt_txt).toLocaleDateString('en-IN', { weekday: 'long' })}
          </h4>
          <p style={styles.description}>{data[expandedIndex].weather[0].description}</p>
          <div style={styles.tempHighlight}>
            <span style={styles.tempValue}>{data[expandedIndex].main.temp.toFixed(1)}°C</span>
            <span style={styles.feels}>Feels like {data[expandedIndex].main.feels_like.toFixed(1)}°C</span>
          </div>
          <div style={styles.metrics}>
            <div style={styles.col}><span style={styles.label}>Min</span><span style={styles.value}>{data[expandedIndex].main.temp_min.toFixed(1)}°C</span></div>
            <div style={styles.col}><span style={styles.label}>Max</span><span style={styles.value}>{data[expandedIndex].main.temp_max.toFixed(1)}°C</span></div>
            <div style={styles.col}><span style={styles.label}>Humidity</span><span style={styles.value}>{data[expandedIndex].main.humidity}%</span></div>
            <div style={styles.col}><span style={styles.label}>Wind</span><span style={styles.value}>{data[expandedIndex].wind.speed} m/s</span></div>
            <div style={styles.col}><span style={styles.label}>Pressure</span><span style={styles.value}>{data[expandedIndex].main.pressure} hPa</span></div>
          </div>
        </div>
      )}
      

      <div style={styles.grid}>
        {data.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleDayClick(idx)}
            style={{
              ...styles.card,
              border: expandedIndex === idx ? '1px solid #ffffff55' : '1px solid transparent',
            }}
          >
            <p style={styles.dayShort}>{new Date(item.dt_txt).toLocaleDateString('en-IN', { weekday: 'short' })}</p>
            <p style={styles.condition}>{item.weather[0].main}</p>
            <p style={styles.tempSmall}>🌡️ {item.main.temp.toFixed(1)}°C</p>
            <p style={styles.meta}>💧 {item.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '2rem',
    color: '#ffffff',
    fontFamily: `'Segoe UI', sans-serif`,
  },
  heading: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '1.2rem',
    textAlign: 'center',
    color: '#f1f1f1',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '1.2rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(14px)',
    borderRadius: '16px',
    padding: '1.2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
  },
  expandedCard: {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(18px)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
  },
  day: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '0.3rem',
    color: '#f1f1f1',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  description: {
    fontSize: '14px',
    color: '#eaeaea',
    marginBottom: '1rem',
    textTransform: 'capitalize',
  },
  tempHighlight: {
    marginBottom: '2rem',
  },
  tempValue: {
    fontSize: '48px',
    fontWeight: '600',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
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
  dayShort: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '0.3rem',
  },
  condition: {
    fontSize: '14px',
    color: '#dddddd',
    marginBottom: '0.3rem',
  },
  tempSmall: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: '0.2rem',
  },
  meta: {
    fontSize: '14px',
    color: '#f0f0f0',
  },
};
