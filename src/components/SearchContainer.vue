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
  height: 65%;
  border-radius: 2px;
  align-items: center;
  gap: 5px;
  padding: 0 5px;
  width: 100%;
  background-color: var(--search-bg-color);
  stroke: var(--search-placeholder-color);
}

.search-container input {
  font-family: inherit;
  border: transparent;
  outline: transparent;
  background-color: transparent;
  color: var(--search-placeholder-color);
  height: 100%;
  width: 100%;
  font-size: 13px;
}

.search-container input:focus{
  color: var(--search-text-color);
}

.search-container input::placeholder {
  color: var(--search-placeholder-color);
}

.search-container:focus-within {
  background-color: white;
}
.search-container:focus-within .search-icon  {
  stroke: var(--search-text-color);
  transform: scale(-1,1);
}
</style>