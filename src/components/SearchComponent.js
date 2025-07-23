// src/components/SearchComponent.js
import { useState, useEffect } from 'react';

export default function SearchComponent({ onSearch, styles }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Fetch live location suggestions as the user types
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // Handles the final search action
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      alert('Please enter a location');
      return;
    }
    onSearch(searchTerm); // Pass the search term to the parent
    setQuery(searchTerm);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <>
      <h2 style={styles.heading}>Search Weather</h2>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city or village"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />
        <button onClick={() => handleSearch(query)} style={styles.button}>
          Search
        </button>
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <ul style={styles.suggestionList}>
          {suggestions.map((sug, i) => (
            <li
              key={i}
              style={styles.suggestionItem}
              onClick={() => handleSearch(`${sug.name}, ${sug.country}`)}
            >
              {sug.name}, {sug.state ? `${sug.state}, ` : ''}{sug.country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}