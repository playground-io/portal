<template>
  <footer class="footer-container">
    <RunningTasks />
    <StatusBar />
  </footer>
</template>

<script setup>
  import RunningTasks from '@/components/layout/RunningTasks.vue';
  import StatusBar from '@/components/layout/StatusBar.vue';
</script>

<style scoped>
  .footer-container {
    display: block;
  }
</style>
