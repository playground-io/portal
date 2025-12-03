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

// Define the simulated delay time in milliseconds
const SIMULATED_DELAY_MS = 15000; // 2 seconds delay

// 💡 Request Interceptor: Attaches the API Key to EVERY request
apiClient.interceptors.request.use(async config => {

  // 🛑 SIMULATION: Add a deliberate, artificial delay
  console.log(`Simulating a ${SIMULATED_DELAY_MS}ms network delay...`);
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY_MS));

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  
  // Tomorrow.io uses a query parameter, not an Authorization header
  if (apiKey) {
    // Ensure the params object exists
    config.params = config.params || {};
    // Attach the API key as a query parameter
    config.params.apikey = apiKey;
    // Set the Authorization header with a 'Bearer' prefix (common for tokens)
    //config.headers.Authorization = `Bearer ${apiKey}`;
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
    // Updated error check for standard authentication flow
    if (error.response.status === 401) { 
      alert("Authentication failed. Please check your token.");
}
  }
  return Promise.reject(error);
});

export default apiClient;