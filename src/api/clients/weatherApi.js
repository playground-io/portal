import axios from 'axios';

const WEATHER_API_KEY = 'your-public-key-here';

const weatherClient = axios.create({
  baseURL: 'https://api.weather-provider.com/data/2.5',
  timeout: 5000,
});

// Request Interceptor: ONLY the weather API needs the API Key
weatherClient.interceptors.request.use(config => {
  // Attach API key as a query parameter to every request
  config.params = {
    ...config.params,
    appid: WEATHER_API_KEY,
  };
  return config;
});

export default weatherClient;