<template>
  <div class="main-content">
    <div class="thediv">
      <AppLang />
      <p>The Space {{ store.bottomHeight  }}ddd</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
      <p>Main Container</p>
    </div>
  </div>
</template>

<script setup>
  import AppLang from '../feature/AppLang.vue';
  import { useTasksStore } from '@/stores/taksStore.js';

  const store = useTasksStore();
  console.log( store.bottomHeight );

</script>

<style scoped>
  .main-content {  
    display: flex;
    min-height: 0; 
    min-width: 0;
  }

  .thediv {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-height: 0; 
    min-width: 0;
  }
</style>