<template>
  <footer class="footer-container">
    <FooterSplitter />
    <StatusBar />
  </footer>
</template>

<script setup>
  import FooterSplitter from '@/components/layout/FooterSplitter.vue';
  import StatusBar from '@/components/layout/StatusBar.vue';
</script>

<style scoped>
  .footer-container {
    display: block;
  }
</style>
