import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// --- Configuration for Delay Simulation ---
// 💡 IMPORTANT: Define these in your .env.development file
const SIMULATE_DELAY_MS = 1500; // e.g., 1500ms (1.5 seconds)
const IS_DEV_MODE = import.meta.env.DEV; // Vite's built-in flag for development mode

// Utility function to create a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ----------------------------------------------------
// 💡 Request Interceptor for Delay
// ----------------------------------------------------
apiClient.interceptors.request.use(
  async config => {
    
    // 1. Only execute the delay logic in development mode
    if (IS_DEV_MODE) {
      console.log(`[DEV MODE] Simulating ${SIMULATE_DELAY_MS}ms network delay...`);
      // 2. Await the delay function. The request is paused here.
      await delay(SIMULATE_DELAY_MS);
    }
    
    // 3. (Optional) Authentication logic remains here
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 4. Once the delay is finished, the request proceeds
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// ----------------------------------------------------

export default apiClient;