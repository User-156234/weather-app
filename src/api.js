import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Accept a city or village name
export const getCurrentWeather = async (locationName) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: locationName, // <--- this must be a valid city/village name
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("getCurrentWeather error:", error);
    throw error;
  }
};
