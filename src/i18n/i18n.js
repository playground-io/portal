import { createI18n } from 'vue-i18n';

// Get the user's preferred browser locale (e.g., 'en-US' -> 'en')
const initialLocale = localStorage.getItem('locale') || navigator.language.split('-')[0] || 'en';
console.log(localStorage.getItem('locale') );
// Initialize the i18n instance
const i18n = createI18n({
  // Use Composition API mode (required for useI18n())
  legacy: false,
  // Set the initial locale from browser or storage
  locale: initialLocale,
  // Fallback to 'en' if a key is missing in the current locale
  fallbackLocale: 'en',
  // Start with only the default messages loaded (best for performance)
  messages: {
    // Only load the initial locale's messages to start
    [initialLocale]: {} // This will be filled by loadLocaleMessages below
  }
});

// Function to dynamically load locale messages
export async function loadLocaleMessages(locale) {
  try {
    // Dynamically import the language JSON file
    const messages = await import(`./locales/${locale}.json`);
    // Set the loaded messages
    i18n.global.setLocaleMessage(locale, messages.default);
    // Activate the new locale
    i18n.global.locale.value = locale;
    // Optional: save the preference
    localStorage.setItem('locale', locale);

  } catch (error) {
    console.error(`Failed to load locale ${locale}:`, error);
    // Fallback if the file doesn't exist
    i18n.global.locale.value = i18n.global.fallbackLocale;
  }
}

// Ensure the initial locale messages are loaded immediately
loadLocaleMessages(initialLocale);

export default i18n;