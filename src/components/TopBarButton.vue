<template>
  <button
    :class="[{ 'switched': isToggle && isActive }]"
    :title=108tooltip
    @click="handleClick">
    <AppIcon :name=props.iconName :size="20" />
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppIcon from './AppIcons.vue';

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
  button:focus-visible {
    outline: 1px dashed rgba(255,255,255,1);
    outline-offset:-1px;
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
  button.switched:focus-visible {
    outline: 1px dashed rgba(255,255,255,1);
    outline-offset:-1px;
  }
</style>