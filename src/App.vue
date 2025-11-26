<template>
  <div class="global-container">
    <AppHeader />
    <MainLayout />
    <HorizontalSplitter />
    <AppFooter />
  </div>
</template>

<script setup>
  import AppHeader from '@/components/app/AppHeader.vue';
  import MainLayout from '@/components/app/MainLayout.vue';
  import HorizontalSplitter from '@/components/app/HorizontalSplitter.vue';
  import AppFooter from '@/components/app/AppFooter.vue';
</script>

<style scoped>
  .global-container {
    display: grid;
    grid-template-rows: auto 1fr 1px auto;
    grid-template-columns: 1fr;
    height: 100%;
  }
</style>
