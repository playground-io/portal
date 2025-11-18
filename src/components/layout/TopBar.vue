<template>
  <nav class="top-bar">
    <div class="top-bar-left">
      <TopBarButton label="cloud-apps" tooltip="Cloud Apps" mode="toggle" iconName="apps"
        @click="handleNavigation('profile')" />
      <TopBarButton label="services-admin" tooltip="Services Admin" mode="normal" iconName="menu"
        @click="handleNavigation('profile')" />
      <!-- <TopBarBranding /> -->
    </div>
    <div class="top-bar-center">
      <!-- <SearchBox /> -->
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
      <!-- <AvatarContainer /> -->
    </div>
  </nav>
</template>

<script setup>
  import TopBarButton from '@/components/core/TopBarButton.vue';
  import SearchBox from '@/components/feature/SearchBox.vue';
  import AvatarContainer from '@/components/feature/AvatarContainer.vue';
  import TopBarBranding from '@/components/core/TopBarBranding.vue';
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  height: var(--top-bar-height);
  color: var(--top-bar-txt);
  background-color: var(--top-bar-bg);
}

.top-bar-left,
.top-bar-center,
.top-bar-right {
  display: inline-flex;
  width: 100%;
}

.top-bar-left {
  justify-content: left;
}

.top-bar-center {
  justify-content: center;
  max-width: 500px;
  min-width: 250px;
}

.top-bar-right {
  justify-content: right;
}
</style>