export default function HourlyForecast({ data }) {
    return (
      <div style={styles.wrapper}>
        <h3 style={styles.heading}>Hourly Forecast (Today)</h3>
        <div style={styles.scroll}>
          {data.map((item, idx) => (
            <div key={idx} style={styles.card}>
              <p style={styles.time}>
                {new Date(item.dt_txt).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="icon"
                style={{ width: '40px' }}
              />
              <p style={styles.temp}>{item.main.temp.toFixed(1)}°C</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const styles = {
    wrapper: {
      marginTop: '1rem',
    },
    heading: {
      fontSize: '20px',
      marginBottom: '1rem',
      fontWeight: '500',
      color: '#fff',
    },
    scroll: {
      display: 'flex',
      gap: '1rem',
      overflowX: 'auto',
      paddingBottom: '1rem',
    },
    card: {
      minWidth: '90px',
      background: 'rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      textAlign: 'center',
      padding: '0.8rem',
      color: '#fff',
      boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
    },
    time: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#eee',
      marginBottom: '0.3rem',
    },
    temp: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#fff',
    },
  };
  