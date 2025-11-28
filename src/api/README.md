src/
└── api/
    ├── clients/          # (1) Centralized configuration for each external API
    │   ├── internalApi.js  
    │   ├── paymentsApi.js  
    │   └── weatherApi.js   
    │
    ├── modules/          # (2) Data/Business logic modules, grouped by resource
    │   ├── user.js         # Uses internalApi
    │   ├── product.js      # Uses internalApi
    │   ├── checkout.js     # Uses paymentsApi
    │   └── reporting.js    # Uses internalApi & weatherApi (if needed)
    │
    └── index.js          # Central export (optional)








1. The Core Client (httpClient.js)
This is the most important file. You create one single instance of your HTTP client (like Axios). This is where you handle:

Base URL (e.g., api.example.com)

Timeouts

Request Interceptors (automatically attaching Auth Tokens)

Response Interceptors (global error handling, e.g., redirecting to login on 401)

JavaScript

// src/api/httpClient.js
import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.my-app.com/v1',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Auto-attach tokens
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Global Error Handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired? Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
3. The API Modules (api/modules/*.js)
Instead of writing URLs in your components, you write function names that describe what the business logic is. Each file corresponds to a backend resource.

src/api/modules/auth.js

JavaScript

import httpClient from '../httpClient';

export default {
  login(credentials) {
    return httpClient.post('/auth/login', credentials);
  },
  register(userData) {
    return httpClient.post('/auth/register', userData);
  },
  logout() {
    return httpClient.post('/auth/logout');
  },
  getProfile() {
    return httpClient.get('/auth/me');
  }
};
src/api/modules/users.js

JavaScript

import httpClient from '../httpClient';

export default {
  getAll(params) {
    // params could be { page: 1, sort: 'name' }
    return httpClient.get('/users', { params });
  },
  getById(id) {
    return httpClient.get(`/users/${id}`);
  },
  update(id, data) {
    return httpClient.put(`/users/${id}`, data);
  },
  delete(id) {
    return httpClient.delete(`/users/${id}`);
  }
};
4. How to use it in your App
Now, your components (or Pinia stores) are clean. They don't know about URLs, HTTP methods, or headers. They just call functions.

Usage inside a Pinia Store (Recommended):

JavaScript

// src/stores/userStore.js
import { defineStore } from 'pinia';
import usersApi from '@/api/modules/users'; // Import the module

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    isLoading: false
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        // CLEAN: No axios calls here, just the API method
        const response = await usersApi.getAll(); 
        this.users = response.data;
      } catch (error) {
        console.error('Failed to load users', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
Usage inside a Component (Directly):

Code snippet

<script setup>
import authApi from '@/api/modules/auth';

const handleLogin = async () => {
  try {
    await authApi.login({ email: 'test@test.com', password: '123' });
    alert('Logged in!');
  } catch (err) {
    alert('Login failed');
  }
};
</script>















1. The Clients Layer (src/api/clients/)
In this layer, you create a distinct Axios instance for every unique API, giving each its own configuration for base URL, headers, and specific interceptors.

Example 1: Internal API Client (internalApi.js)
This client handles your own internal services. It requires the authentication token.

JavaScript

// src/api/clients/internalApi.js
import axios from 'axios';

const internalClient = axios.create({
  baseURL: 'https://api.mycompany.com/v1',
  timeout: 8000,
});

// Request Interceptor: ONLY the internal API needs the Auth Token
internalClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Global 401 redirect for internal API errors
internalClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Internal API token expired. Redirecting.');
      // Logic to redirect or refresh token
    }
    return Promise.reject(error);
  }
);

export default internalClient;
Example 2: External Weather Client (weatherApi.js)
This client connects to a public third-party service. It uses an API key that might be attached differently (e.g., as a query parameter) and doesn't require the user's Auth Token.

JavaScript

// src/api/clients/weatherApi.js
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
2. The Modules Layer (src/api/modules/)
The module files are unchanged, but they now import and use the appropriate client instance. This creates a clear boundary:

The UI (Component/Store): Calls product.getDetails(id).

The Module (product.js): Defines the URL and HTTP method using the internalApi client.

The Client (internalApi.js): Applies the base URL, authentication token, and error handling.

Example 3: Product Module (product.js)
JavaScript

// src/api/modules/product.js
import internalClient from '../clients/internalApi'; // <-- Uses Internal Client

export default {
  // This call will automatically get the Auth Bearer token
  getDetails(id) {
    return internalClient.get(`/products/${id}`);
  },
  
  updateProduct(id, data) {
    return internalClient.put(`/products/${id}`, data);
  }
};
Example 4: Weather Module (weather.js)
JavaScript

// src/api/modules/weather.js
import weatherClient from '../clients/weatherApi'; // <-- Uses Weather Client

export default {
  // This call will automatically get the API Key query parameter
  getForecast(city) {
    return weatherClient.get('/forecast', {
      params: { q: city, units: 'metric' }
    });
  }
};