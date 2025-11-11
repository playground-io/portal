<template>
  <nav class="top-bar">
    <div class="top-bar-left">
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="apps"
        @click="handleNavigation('profile')" />
      <TopBarButton label="services-admin" tooltip="Services Admin" mode="normal" iconName="menu"
        @click="handleNavigation('profile')" />
      <div class="top-bar-branding" id="branding"></div>
    </div>
    <div class="top-bar-center">
      <div class="search-container"></div>
    </div>
    <div class="top-bar-right">
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="console"
        @click="handleNavigation('profile')" />
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="notifications"
        @click="handleNavigation('profile')" />
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="tasks"
        @click="handleNavigation('profile')" />
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="settings"
        @click="handleNavigation('profile')" />
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="support"
        @click="handleNavigation('profile')" />
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="feedback"
        @click="handleNavigation('profile')" />
      <div class="top-bar-branding" id="user-avatar"></div>
    </div>
  </nav>
</template>

<script setup>
  import TopBarButton from './TopBarButton.vue';
</script>

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