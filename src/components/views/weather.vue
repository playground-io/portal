<script setup>
import { onMounted, computed } from 'vue';
import { useWeatherStore } from '@/stores/useWeatherStore';

const store = useWeatherStore();
const defaultLocation = '42.3478,-71.0466'; // Boston coordinates

onMounted(() => {
  store.fetchForecast(defaultLocation);
});

// Helper function to get the current temperature from the store
const currentTemperature = computed(() => {
  return store.hourlyForecast[0]?.values.temperature;
});

// Helper to simulate daily icons/data based on 5-day forecast
const fiveDayForecast = computed(() => {
  // NOTE: Tomorrow.io's 'timelines' need more complex mapping for daily data, 
  // but for this UI simulation, we just take the first 5 entries.
  return store.forecastData?.daily?.slice(0, 5).map(day => ({
    day: new Date(day.time).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: Math.round(day.values.tempAvg),
    iconClass: 'i-carbon-cloud-drizzle', // Placeholder icon
  })) || [];
});

// Placeholder for Air Quality Index (AQI) - assume a static good value for now
const airQuality = {
    value: 45,
    status: 'Good'
};
</script>

<template>
  <div class="dashboard-container">
    <div class="glass-panel" :class="{ 'loading-state': store.loading }">

      <div v-if="store.loading" class="loading-overlay">
        <p>Loading weather data...</p>
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="store.error" class="error-message">
        <div class="icon">⚠️</div>
        <p>{{ store.error }}</p>
      </div>

      <div v-else-if="store.forecastData" class="main-grid">
        
        <div class="nowcast-panel">
          <h3 class="title">NOWCAST</h3>
          <div class="current-temp">{{ currentTemperature }}°C</div>
          <p class="condition">Partly Cloudy</p>
          <div class="hourly-chart-placeholder">Hourly Temperature Graph</div>
        </div>

        <div class="globe-container">
          <div class="globe-placeholder">🌍</div>
        </div>

        <div class="forecast-panel">
          <h3 class="title">5-DAY FORECAST</h3>
          <div class="day-list">
            <div v-for="day in fiveDayForecast" :key="day.day" class="day-card">
              <span class="day-label">{{ day.day }}</span>
              <div class="icon-class">🌧️</div>
              <span class="temp-label">{{ day.temp }}°</span>
            </div>
          </div>
          
          <div class="metrics-grid">
            <div class="metric-card">
              <span class="metric-icon">💨</span>
              <span class="metric-value">15 km/h</span>
              <span class="metric-label">Wind</span>
            </div>
            <div class="metric-card">
              <span class="metric-icon">⚡</span>
              <span class="metric-value">3.5 mm</span>
              <span class="metric-label">Precipitation</span>
            </div>
          </div>
        </div>

        <div class="chart-box">Near-term UV/Humidity Charts</div>
        
        <div class="aqi-box">
          <h4 class="title">AIR QUALITY</h4>
          <div class="aqi-value">{{ airQuality.value }}</div>
          <div class="aqi-status">Local AQI: ({{ airQuality.status }})</div>
          <div class="map-placeholder">World Map View</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ----------------------------------------------------------------
   BASE STYLES: Dark Background, Neon Glow, Glass effect
---------------------------------------------------------------- */

/* Overall container matching the room environment */
.dashboard-container {
    background-color: #0b1121; /* Deep, dark blue/black background */
    min-height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* The core 'Glass Panel' mirroring the holographic screen */
.glass-panel {
    width: 90%;
    max-width: 1400px;
    height: 90vh;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.08); /* Semi-transparent white */
    backdrop-filter: blur(20px); /* The key glass effect */
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(78, 184, 255, 0.4); /* Inner and outer glow */
    color: #f0f8ff; /* Light, bright text */
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
}

.title {
    font-size: 1.1em;
    font-weight: 600;
    color: #4eb8ff; /* Neon blue highlight */
    margin-bottom: 15px;
    text-transform: uppercase;
}

/* ----------------------------------------------------------------
   LAYOUT: CSS Grid for Structure
---------------------------------------------------------------- */
.main-grid {
    display: grid;
    height: 100%;
    /* Define the three main columns and five main rows */
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-template-rows: 40% 10% 25% 1fr;
    gap: 20px;
}

/* Positioning the major sections */
.nowcast-panel { grid-area: 1 / 1 / 3 / 2; } /* Row 1 & 2, Col 1 */
.globe-container { grid-area: 1 / 2 / 4 / 3; } /* Row 1 to 3, Col 2 (BIG Center) */
.forecast-panel { grid-area: 1 / 3 / 3 / 4; } /* Row 1 & 2, Col 3 */
.chart-box { grid-area: 3 / 1 / 5 / 2; } /* Row 3 & 4, Col 1 (Chart Stack) */
.aqi-box { grid-area: 4 / 3 / 5 / 4; } /* Row 4, Col 3 */


/* ----------------------------------------------------------------
   CONTENT STYLES
---------------------------------------------------------------- */
.current-temp {
    font-size: 5em;
    font-weight: 300;
    line-height: 1;
    text-shadow: 0 0 10px rgba(78, 184, 255, 0.8);
    margin: 10px 0;
}
.condition {
    font-size: 1.5em;
    color: #c0c0c0;
}

/* Globe Styling */
.globe-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.globe-placeholder {
    font-size: 15em;
    line-height: 1;
    filter: drop-shadow(0 0 40px #4eb8ff);
    animation: pulse 5s infinite alternate;
}

/* 5-Day Forecast List */
.day-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.day-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.05);
}
.day-label { font-size: 0.9em; color: #a0a0a0; margin-bottom: 5px; }
.temp-label { font-weight: 700; font-size: 1.2em; }
.icon-class { font-size: 1.8em; margin: 5px 0; }

/* Metrics Grid */
.metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}
.metric-card {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid rgba(78, 184, 255, 0.3);
}
.metric-icon { font-size: 2em; margin-bottom: 5px; display: block; }
.metric-value { font-size: 1.4em; font-weight: 600; display: block; }
.metric-label { font-size: 0.8em; color: #a0a0a0; }


/* AQI and Charts */
.aqi-box, .chart-box, .hourly-chart-placeholder, .map-placeholder {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.aqi-value { font-size: 3em; font-weight: 700; color: limegreen; }
.aqi-status { margin-top: 5px; font-size: 1.2em; }
.map-placeholder { min-height: 150px; }


/* ----------------------------------------------------------------
   ANIMATION & LOADING
---------------------------------------------------------------- */
@keyframes pulse {
    0% { filter: drop-shadow(0 0 20px #4eb8ff); }
    100% { filter: drop-shadow(0 0 60px #4eb8ff); }
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: #4eb8ff;
    z-index: 10;
}
.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #4eb8ff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-top: 20px;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>