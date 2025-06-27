import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

// Accepts a city, village, or any location name
export const getCurrentWeather = async (locationName) => {
  try {
    // Step 1: Resolve location name to coordinates (lat, lon)
    const geoRes = await axios.get(GEO_URL, {
      params: {
        q: locationName,
        limit: 1,
        appid: API_KEY,
      },
    });

    if (!geoRes.data || geoRes.data.length === 0) {
      throw new Error("Location not found");
    }

    const { lat, lon } = geoRes.data[0];

    // Step 2: Fetch weather using coordinates
    const weatherRes = await axios.get(WEATHER_URL, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: API_KEY,
      },
    });

    return weatherRes.data;
  } catch (error) {
    console.error("getCurrentWeather error:", error.message);
    throw error;
  }
};



