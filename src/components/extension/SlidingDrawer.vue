<script setup>
import RunningTasks from '@/components/views/RunningTasks.vue';
import { useSplitterStore } from '@/stores/useSplitterStore';
import { useLayoutStore } from '@/stores/useLayoutStore';

const layoutStore = useLayoutStore();
const splitterStore = useSplitterStore();
</script>

<template>
  <div class="sliding-drawer"
    :style="{ height: splitterStore.getBottomHeight + 'px' }"
    v-if="layoutStore.isExtended"
  >
    <div class="frame-holder">
      <RunningTasks />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sliding-drawer {
  width: 100%;
  background-color: rgb(255, 255, 255);
  overflow-y: auto;
  
  & > .frame-holder {
    margin: 10px;
    background-color: white;
  }
}
</style>