<script setup>
  import AppHeader from '@/components/app/AppHeader.vue';
  import AppContent from '@/components/app/AppContent.vue';
  import AppSplitterH from '@/components/app/AppSplitterH.vue';
  import AppFooter from '@/components/app/AppFooter.vue';
</script>

<template>
  <div class="global-container">
    <AppHeader />
    <AppContent />
    <AppSplitterH />
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
  .global-container {
    display: grid;
    grid-template-rows: auto 1fr 4px auto;
    grid-template-columns: 1fr;
    height: 100%;
  }
</style>
