<template>
  <div class="global-container">
    <header class="header-container">
      <TopBar />
    </header>
    <main class="main-container">
      <MainContent />
    </main>
    <footer class="footer-container">
      <BottomBar />
    </footer>
  </div>
</template>

<script setup>
  import TopBar from './components/TopBar.vue';
  import MainContent from './components/MainContent.vue';
  import BottomBar from './components/BottomBar.vue';
</script>

<style scoped>
.global-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  height: 100%;
}

.header-container {
  display: block;
}

.main-container {
  display: block;
  overflow-y: auto;
}

.footer-container {
  display: block;
}
</style>
