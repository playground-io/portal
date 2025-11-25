<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <ShowIcon name="pulse_anime1" size="24" class="icon" />
      {{ $t('footer.tasks') }}
    </div>
    <div class="bottom-bar-center">
      {{ $t('footer.rights') }}
    </div>
    <div class="bottom-bar-right">
      {{ $t('footer.copyright') }}
    </div>
  </div>
</template>

<script setup>
  import ShowIcon from '@/components/core/ShowIcon.vue';
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    border-top: 1px solid var(--bottom-bar-bg);
    /*background-color: var(--bottom-bar-bg);*/
    color: var(--bottom-bar-txt);
    height: var(--bottom-bar-height);
    transition: background-color var(--transition-fast) ease;
  }

  .bottom-bar:hover {
    background-color: lightblue;
  }

  .bottom-bar-left,
  .bottom-bar-center,
  .bottom-bar-right {
    display: flex;
    align-items: center;
  }

  .bottom-bar-left {
    gap: 8px;
    font-weight: 600;
    color: red;
  }
</style>