<template>
  <nav class="top-bar">
    <div class="top-bar-left">
      <TopBarButton label="cloud-apps" :tooltip="$t('nav.button.app')" mode="toggle" iconName="apps"
        @click="handleNavigation('profile')" />
      <TopBarButton label="services-admin" :tooltip="$t('nav.button.menu')" mode="normal" iconName="menu"
        @click="handleNavigation('profile')" />
      <TopBarBranding />
    </div>
    <div class="top-bar-center">
      <SearchBox />
    </div>
    <div class="top-bar-right">
      <TopBarButton label="portal-shell" :tooltip="$t('nav.button.console')" mode="toggle" iconName="console"
        @click="handleNavigation('profile')" />
      <TopBarButton label="running-tasks" :tooltip="$t('nav.button.tasks')" mode="toggle" iconName="tasks"
        @click="handleNavigation('profile')" />
      <TopBarButton label="notifications" :tooltip="$t('nav.button.notifications')" mode="tab" iconName="notifications"
        @click="handleNavigation('profile')" />
      <TopBarButton label="settings" :tooltip="$t('nav.button.settings')" mode="tab" iconName="settings"
        @click="handleNavigation('profile')" />
      <TopBarButton label="support" :tooltip="$t('nav.button.support')" mode="tab" iconName="support"
        @click="handleNavigation('profile')" />
      <TopBarButton label="fedback" :tooltip="$t('nav.button.feedback')" mode="tab" iconName="feedback"
        @click="handleNavigation('profile')" />
      <UserAccount />
    </div>
    <div class="top-bar-right-shrunk">
      <TopBarButton label="more" :tooltip="$t('nav.button.more')" mode="toggle" iconName="more"
        @click="handleNavigation('profile')" />
      <UserAccount />
    </div>
  </nav>
</template>

<script setup>
  import TopBarButton from '@/components/core/TopBarButton.vue';
  import SearchBox from '@/components/feature/SearchBox.vue';
  import UserAccount from '@/components/feature/UserAccount.vue';
  import TopBarBranding from '@/components/core/TopBarBranding.vue';
</script>

<style lang="scss" scoped>
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
    display: flex;
    width: 100%;
  }
  
  .top-bar-left {
    justify-content: left;
    min-width: 260px;
    max-width: 350px;
  }
  
  .top-bar-center {
    justify-content: center;
  }
  
  .top-bar-right {
    justify-content: right;
    min-width: 470px;
    max-width: 550px;
  }

  .top-bar-right-shrunk {
    display: none;
  }
  
  @media (max-width: $viewport-md) {
    .top-bar-right {
      min-width: 290px;
      max-width: 300px;
    }

   .top-bar-left {
      min-width: 260px;
      max-width: 270px;
    }
  }

  @media (max-width: $viewport-sm) {
    .top-bar-right {
      display: none;
    }

    .top-bar-left {
      min-width: 180px;
      max-width: 190px;
    }

    .top-bar-right-shrunk {
      display: flex;
      justify-content: right;
      min-width: 90px;
      max-width: 100px;
    }
  }
</style>