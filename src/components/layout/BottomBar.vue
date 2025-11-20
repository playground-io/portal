<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      {{ $t('nav.home') }}
    </div>
    <div class="bottom-bar-center">
      bottom-bar-center
    </div>
    <div class="bottom-bar-right">
      bottom-bar-right
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
  .bottom-bar {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: var(--bottom-bar-bg);
    color: var(--bottom-bar-txt);
    height: var(--bottom-bar-height);
  }
</style>