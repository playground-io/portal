// src/api/client.js
import axios from 'axios';

// Get base URL from environment variables
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 💡 Request Interceptor: Attaches the API Key to EVERY request
apiClient.interceptors.request.use(config => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
  // Tomorrow.io uses a query parameter, not an Authorization header
  if (apiKey) {
    // Ensure the params object exists
    config.params = config.params || {};
    // Attach the API key as a query parameter
    config.params.apikey = apiKey;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 💡 Response Interceptor: Handles global API errors
apiClient.interceptors.response.use(response => response, error => {
  if (error.response) {
    console.error(`Global API Error (${error.response.status}):`, error.response.data);
    
    // Example: Handle 403 Forbidden specifically
    if (error.response.status === 403) {
      alert("API Key is invalid or expired. Cannot proceed.");
    }
  }
  return Promise.reject(error);
});

export default apiClient;