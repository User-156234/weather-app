import { useState } from 'react';
import { getCurrentWeather } from '../api';
import WeatherCard from '../components/WeatherCard';


export default function Search() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a location");
      return;
    }

    try {
      const data = await getCurrentWeather(query);
      setWeather(data);
    } catch (error) {
      alert("Location not found. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Search Weather</h2>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter city or village"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>Search</button>
        </div>
        {weather && <div style={{ marginTop: '2rem' }}><WeatherCard data={weather} /></div>}
        
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dbe6f6, #c5796d)',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '4rem',
    paddingBottom: '4rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px)',
    borderRadius: '20px',
    padding: '2rem',
    width: '100%',
    maxWidth: '520px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
  searchBox: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  input: {
    padding: '0.7rem 1rem',
    borderRadius: '10px',
    border: 'none',
    width: '65%',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '0.7rem 1.5rem',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    color: '#333',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
  }
};
