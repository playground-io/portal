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