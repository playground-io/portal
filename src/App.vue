<template>
  <div class="global-container">
    <header class="header-container">
      <TopBar />
    </header>
    <main class="main-container">
      <MainContainer />
    </main>
    <footer class="footer-container">
      <BottomBar />
    </footer>
  </div>
</template>

<script setup>
  import TopBar from './components/TopBar.vue';
  import MainContainer from './components/MainContainer.vue';
  import BottomBar from './components/BottomBar.vue';
</script>

<style scoped>
.global-container {
  display: grid;
  height: 100%; 
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr; 
}

.header-container {
  display: block;
}

.main-container {
  display: flex;
}

.footer-container {
  display: block;
  border: 1px white solid;
}
</style>
