// src/stores/useWeatherStore.js
import { defineStore } from 'pinia';
import { WeatherService } from '@/api/clients/weatherService'; // Adjust path as necessary

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    forecastData: null,
    loading: false,
    error: null,
  }),
  
  actions: {
    /**
     * Calls the service layer to fetch the weather and manages the application state.
     * @param {string} location - e.g., '42.3478,-71.0466'
     */
    async fetchForecast(location) {
      if (!location) {
        this.error = "Location is required.";
        return;
      }
      
      this.loading = true;
      this.error = null;
      
      try {
        // 1. Call the clean Service Layer function
        const response = await WeatherService.getForecast(location); 
        
        // 2. Map or shape the data for application use
        this.forecastData = response.data.timelines;
        
      } catch (err) {
        // 3. Handle the rejected promise from the API/Axios interceptor
        this.error = 'Failed to fetch weather data. Please try again later.';
        console.error('Store Error during fetchForecast:', err);
      } finally {
        this.loading = false;
      }
    },
  },
  
  getters: {
    // Example: Create a computed value for the next 24 hours of weather
    hourlyForecast: (state) => {
        return state.forecastData?.hourly || [];
    }
  }
});