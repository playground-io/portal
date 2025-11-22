<template>
  <div class="content">
    <h2>{{ $t('nav.brandingLabel') }}</h2>
    <p>{{ $t('nav.serviceLabel') }}</p>

    <button @click="changeLanguage('en')">Switch to English</button>
    <button @click="changeLanguage('pt')">Switch to Portuguese</button>
  </div>
</template>

<script setup>
// 1. Import the necessary tools
import { useI18n } from 'vue-i18n';
import { loadLocaleMessages } from '@/i18n/i18n.js'; // Use the appropriate path

// 2. Access the i18n functions
const { t } = useI18n(); // For script usage

// 4. Function to change the language (triggers lazy loading)
async function changeLanguage(locale) {
  await loadLocaleMessages(locale);
}
</script>