<script setup>
  import TopBarButton from './TopBarButton.vue';
</script>

<template>
  <nav class="top-bar">
    <div class="top-bar-left">
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="icon-apps"
        @click="handleNavigation('profile')" />
      <TopBarButton label="services-admin" tooltip="Services Admin" mode="normal" iconName="icon-apps"
        @click="handleNavigation('profile')" />
      <div class="top-bar-branding" id="branding"></div>
    </div>
    <div class="top-bar-center">
      <div class="search-container"></div>
    </div>
    <div class="top-bar-right">
      <button class="top-bar-button" id="portal-shell"></button>
      <button class="top-bar-button" id="running-tasks"></button>
      <button class="top-bar-button" id="notifications"></button>
      <button class="top-bar-button" id="support"></button>
      <button class="top-bar-button" id="feedback"></button>
      <div class="top-bar-branding" id="user-avatar"></div>
    </div>
  </nav>
</template>

<style scoped>
.top-bar {
  display: inline-flex;
  position: fixed;
  justify-content: space-between;
  top: 0;
  width: 100%;
  height: var(--top-bar-height);
  background-color: var(--top-bar-bg);
  color: var(--top-bar-txt);
}

.top-bar-left, .top-bar-center, .top-bar-right {
  height: 100%;
}
</style>