<template>
  <footer class="footer-container">
    <SlidingDrawer />
    <StatusBar />
  </footer>
</template>

<script setup>
  import SlidingDrawer from '@/components/layout/SlidingDrawer.vue';
  import StatusBar from '@/components/layout/StatusBar.vue';
</script>

<style scoped>
  .footer-container {
    display: block;
  }
</style>
