// src/api/weatherService.js
import apiClient from './client';

export const WeatherService = {
  /**
   * Fetches the weather forecast for a given location.
   * @param {string} location - Coordinates in 'lat,long' format (e.g., '42.3478,-71.0466').
   * @param {string} units - Unit system (e.g., 'metric', 'imperial').
   * @returns {Promise<AxiosResponse>}
   */
  getForecast(location, units = 'metric') {
    const params = {
      location: location,
      units: units,
      // The API key is already added by the apiClient interceptor!
    };
    
    // The endpoint path is 'forecast' and params handles the query string
    return apiClient.get('forecast', { params });
  },
  
  // You would add other methods here, e.g., getAlerts()
};