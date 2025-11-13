<template>
  <div class="search-container">
    <AppIcon class="search-icon" name="find" :size=20 />
    <input type="text" name="" id="" placeholder="Search resources, services, and docs" autocomplete="off" maxlength="100">
  </div>
</template>

<script setup>
  import AppIcon from './AppIcons.vue';
</script>

<style scoped>
.search-container {
  display: inline-flex;
  height: 70%;
  border-radius: 2px;
  align-items: center;
  padding: 0 5px;
  min-width: 364px;
  max-width: 520px;
  background-color: #e1dfdd;
  stroke: #000000;
}

.search-container input {
  border: transparent;
  outline: transparent;
  background-color: transparent;
  color: #1b1b1b;
  height: 100%;
  width: 100%;
  padding: 0 8px;
  font-size: 13px;
}

.search-container input::placeholder {
  color: grey;
}

.search-container:focus-within {
  background-color: #e1dfdd;
}
.search-container:focus-within .search-icon  {
  stroke: #1b1b1b;
  transform: scale(-1,1);
}
</style>