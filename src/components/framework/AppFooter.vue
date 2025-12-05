<script setup>
import SlidingDrawer from '@/components/extension/SlidingDrawer.vue';
import StatusBar from '@/components/layout/StatusBar.vue';
</script>

<template>
  <footer class="footer-container">
    <SlidingDrawer />
    <StatusBar />
  </footer>
</template>

<style lang="scss" scoped>
.footer-container {
  display: block;
}
</style>
