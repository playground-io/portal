<script setup>
import RunningTasks from '@/components/views/RunningTasks.vue';

</script>

<template>
  <div class="sliding-drawer">
    <div class="frame-holder">
      <RunningTasks />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sliding-drawer {
  position: relative;
  height: 400px;
  width: 100%;
  background-color: lightgrey;
  
  & > .frame-holder {
    position: absolute;
    top: 10px;
    left: 10px;
    bottom:10px;
    right: 10px;    
    border-radius: 4px;
    background-color: white;
  }
}
</style>