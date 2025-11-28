import weatherClient from '../clients/weatherApi'; // <-- Uses Weather Client

export default {
  // This call will automatically get the API Key query parameter
  getForecast(city) {
    return weatherClient.get('/forecast', {
      params: { q: city, units: 'metric' }
    });
  }
};