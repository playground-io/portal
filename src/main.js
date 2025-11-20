import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { messages } from '@/assets/i18n/translate.js'
import App from '@/App.vue'
import '@/assets/scss/styles.scss' // <-- Import the global styles

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App)
app.use(i18n)
app.mount('#app')

  import { useI18n } from 'vue-i18n'; // 1. Import the hook
  const { locale } = useI18n(); // 2. Call the hook to get what you need
  locale.value = 'es'; // Correctly updates the global state