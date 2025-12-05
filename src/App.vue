<script setup>
import AppHeader from '@/components/framework/AppHeader.vue';
import AppContent from '@/components/framework/AppContent.vue';
import AppSeparator from '@/components/framework/AppSeparator.vue';
import AppFooter from '@/components/framework/AppFooter.vue';

import { useLayoutStore } from '@/stores/useLayoutStore';

const layoutStore = useLayoutStore();
</script>

<template>
  <div
    class="global-container"
    :class="{ 'extended': layoutStore.isExtended }"
  >
    <AppHeader />
    <AppContent />
    <AppSeparator v-if="layoutStore.isExtended"/>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.global-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  height: 100%;

  &.extended {
    grid-template-rows: auto 1fr 6px auto;
  }
}
</style>
