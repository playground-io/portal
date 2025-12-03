<script setup>
import RunningTasks from '@/components/views/RunningTasks.vue';
import { useSplitterStore } from '@/stores/useSplitterStore';

const splitterStore = useSplitterStore();
</script>

<template>
  <div class="sliding-drawer" :style="{ height: splitterStore.getBottomHeight + 'px' }">
    <div class="frame-holder">
      <RunningTasks />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sliding-drawer {
  //position: relative;
  width: 100%;
  background-color: rgb(255, 255, 255);
  overflow-y: auto;
  
  
  & > .frame-holder {
    /*position: absolute;
    top: 10px;
    left: 10px;
    bottom:10px;
    right: 10px;    
    border-radius: 4px;*/
    margin: 10px;
    background-color: white;
  }
}
</style>