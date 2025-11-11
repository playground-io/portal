<template>
  <button
    :class="[{ 'switched': isToggle && isActive }]"
    @click="handleClick">
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M 3 3 h 4 v 4 h -4 z M 10 3 h 4 v 4 h -4 z M 17 3 h 4 v 4 h -4 z M 3 10 h 4 v 4 h -4 z M 10 10 h 4 v 4 h -4 z M 17 10 h 4 v 4 h -4 z M 3 17 h 4 v 4 h -4 z M 10 17 h 4 v 4 h -4 z M 17 17 h 4 v 4 h -4 z" 
  />
</svg>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "Label",
    required: true
  },
  tooltip: {
    type: String,
    default: "Tooltip"
  },
  mode: {
    type: String,
    default: "normal",
    validator: (value) => ['normal', 'toggle'].includes(value)
  },
  iconName: {
    type: [String, null]
  }
});

const isActive = ref(false);
const isToggle = computed(() => props.mode === 'toggle');

const handleClick = () => {
  if (isToggle.value) {
    isActive.value = !isActive.value;
  }
};
</script>

<style scoped>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    aspect-ratio: 1/1;
    border: none;
    padding: 0;
    background-color: var(--top-bar-btn-bg);;
    color: var(--top-bar-btn-txt);
    fill: var(--top-bar-btn-txt);
    stroke: var(--top-bar-btn-txt);
    stroke-width: 0;
  }
  button:hover {
    background-color: var(--top-bar-btn-bg-hover);
    color: var(--top-bar-btn-txt-hover);
    fill: var(--top-bar-btn-txt-hover);
    stroke: var(--top-bar-btn-txt-hover);
  }
  button:active {
    background-color: var(--top-bar-btn-bg-active);
    color: var(--top-bar-btn-txt-active);
    fill: var(--top-bar-btn-txt-active);
    stroke: var(--top-bar-btn-txt-active);
  }
  button.switched {
    background-color: var(--top-bar-btn-bg-sw);
    color: var(--top-bar-btn-txt-sw);
    fill: var(--top-bar-btn-txt-sw);
    stroke: var(--top-bar-btn-txt-sw);
  }
  button.switched:hover {
    background-color: var(--top-bar-btn-bg-sw-hover);
    color: var(--top-bar-btn-txt-sw-hover);
    fill: var(--top-bar-btn-txt-sw-hover);
    stroke: var(--top-bar-btn-txt-sw-hover);
  }
  button.switched:active {
    background-color: var(--top-bar-btn-bg-sw-active);
    color: var(--top-bar-btn-txt-sw-active);
    fill: var(--top-bar-btn-txt-sw-active);
    stroke: var(--top-bar-btn-txt-sw-active);
  }
</style>