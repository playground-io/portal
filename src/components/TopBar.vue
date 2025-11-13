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
      <SearchContainer />
    </div>
    <div class="top-bar-right">
      <TopBarButton label="portal-shell" tooltip="Portal Shell" mode="toggle" iconName="console"
        @click="handleNavigation('profile')" />
      <TopBarButton label="running-tasks" tooltip="Running Tasks" mode="toggle" iconName="tasks"
        @click="handleNavigation('profile')" />
      <TopBarButton label="notifications" tooltip="Notifications" mode="tab" iconName="notifications"
        @click="handleNavigation('profile')" />
      <TopBarButton label="settings" tooltip="Settings" mode="tab" iconName="settings"
        @click="handleNavigation('profile')" />
      <TopBarButton label="support" tooltip="Support" mode="tab" iconName="support"
        @click="handleNavigation('profile')" />
      <TopBarButton label="fedback" tooltip="Feedback" mode="tab" iconName="feedback"
        @click="handleNavigation('profile')" />
      <div class="top-bar-branding" id="user-avatar"></div>
    </div>
  </nav>
</template>

<script setup>
  import TopBarButton from './TopBarButton.vue';
  import SearchContainer from './SearchContainer.vue';
</script>

<style scoped>
.top-bar {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  height: var(--top-bar-height);
  color: var(--top-bar-txt);
  background-color: var(--top-bar-bg);
}

.top-bar-left, .top-bar-center, .top-bar-right {
  display:flex;
  align-items: center;

}
</style>