<script setup>
import LayoutHeader from '@/components/framework/AppHeader.vue';
import LayoutContent from '@/components/framework/AppContent.vue';
import LayoutSplitterH from '@/components/framework/AppSeparator.vue';
import LayoutFooter from '@/components/framework/ShellFooter.vue';

import { useLayoutStore } from '@/stores/useLayoutStore';

const layoutStore = useLayoutStore();
</script>

<template>
  <div
    class="global-container"
    :class="{ 'extended': layoutStore.isExtended }"
  >
    <LayoutHeader />
    <LayoutContent />
    <LayoutSplitterH v-if="layoutStore.isExtended"/>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.global-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  height: 100%;

  &.extended {
    grid-template-rows: auto 1fr 4px auto;
  }
}
</style>
