<template>
  <button
    :class="{ [props.mode]: isToggle && isActive }"
    :title=props.tooltip
    @click="handleClick">
    <ShowIcon :name=props.iconName :size=16 />
  </button>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import ShowIcon from './ShowIcon.vue';

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
      validator: (value) => ['normal', 'toggle', 'tab'].includes(value)
    },
    iconName: {
      type: [String, null]
    }
  });

  const isActive = ref(false);
  const isToggle = computed(() => ['toggle', 'tab'].includes(props.mode));

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
  }
  button:hover {
    background-color: var(--top-bar-btn-bg-hover);
    color: var(--top-bar-btn-txt-hover);
  }
  button:active {
    background-color: var(--top-bar-btn-bg-active);
    color: var(--top-bar-btn-txt-active);
  }
  button:focus-visible {
    outline: 1px dashed rgba(255,255,255,1);
    outline-offset:-1px;
  }
  button.toggle {
    background-color: var(--top-bar-btn-bg-toggle);
    color: var(--top-bar-btn-txt-toggle);
  }
  button.toggle:hover {
    background-color: var(--top-bar-btn-bg-toggle-hover);
    color: var(--top-bar-btn-txt-toggle-hover);
  }
  button.toggle:active {
    background-color: var(--top-bar-btn-bg-toggle-active);
    color: var(--top-bar-btn-txt-toggle-active);
  }
  button.toggle:focus-visible {
    outline: 1px dashed rgba(255,255,255,1);
    outline-offset:-1px;
  }
  button.tab {
    background-color: var(--top-bar-btn-bg-tab);
    color: var(--top-bar-btn-txt-tab);
  }
  button.tab:hover {
    background-color: var(--top-bar-btn-bg-tab-hover);
    color: var(--top-bar-btn-txt-tab-hover);
  }
  button.tab:active {
    background-color: var(--top-bar-btn-bg-tab-active);
    color: var(--top-bar-btn-txt-tab-active);
  }
  button.tab:focus-visible {
    outline: 1px dashed rgb(0, 0, 0);
    outline-offset:-1px;
  }
</style>