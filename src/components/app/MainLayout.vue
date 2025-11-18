<template>
  <main class="main-container">
    <MainContent />
  </main>
</template>

<script setup>
  import MainContent from '@/components/layout/MainContent.vue';
</script>

<style scoped>
.main-container {
  display: block;
  overflow-y: auto;
}
</style>
