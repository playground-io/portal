<script setup>
import { computed } from 'vue'; 
import ICON_REGISTRY from '@/assets/icons/icon-registry.json';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
});

const iconPath = computed(() => {
  return ICON_REGISTRY[props.name] || '<!-- Icon not found -->';
});
</script>

<template>
  <svg class="show-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size" 
    :height="size"
  >
    <g v-html="iconPath"></g> <!-- V-HTML injects the raw path data for rendering -->
  </svg>
</template>

<style lang="scss" scoped>
.show-icon {
  display: block;
  margin: auto;
  stroke-linecap: round;
  stroke-linejoin: round;
  clip-rule: evenodd;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
</style>