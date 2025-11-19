<template>
  <div class="global-container">
    <AppHeader />
    <MainLayout />
    <AppFooter />
  </div>
</template>

<script setup>
  import AppHeader from '@/components/app/AppHeader.vue';
  import AppFooter from '@/components/app/AppFooter.vue';
  import MainLayout from '@/components/app/MainLayout.vue';
</script>

<style scoped>
  .global-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    height: 100%;
  }
</style>
