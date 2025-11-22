import { createApp } from 'vue';
import App from '@/App.vue';
import '@/assets/scss/styles.scss'; // <-- Import the global styles
import i18n, { loadLocaleMessages } from '@/i18n/i18n.js';

const app = createApp(App);
app.use(i18n);
// Define the initial locale - get it from i18n
const initialLocale = i18n.global.locale.value; 
// Await the initial loading function
await loadLocaleMessages(initialLocale);
app.mount('#app');