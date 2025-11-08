<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "button",
    required: true
  },
  tooltip: {
    type: String,
    default: ""
  },
  icon: {
    type: [String, null]
  },
  mode: {
    type: String,
    default: "normal",
    validator: (value) => ['normal', 'toogle'].includes(value)
  }
});

// ==============================
// 2. LÓGICA
// ==============================

// Estado reativo para saber se o botão está "ligado" (apenas relevante para 'toggle')
const isActive = ref(false);

const isToggle = computed(() => props.mode === 'toggle');
const modeClass = computed(() => `btn-${props.mode}`);

// Simulação de conteúdo do Ícone para demonstração (substituir por estilos reais de ícones)
const iconPlaceholder = computed(() => {
    // Retorna a primeira letra do nome do ícone (apenas para demonstração)
    return props.iconName ? props.iconName.charAt(0).toUpperCase() : '';
});

// ==============================
// 3. EVENT HANDLER
// ==============================

const handleClick = () => {
  if (isToggle.value) {
    isActive.value = !isActive.value;
    // Opcional: emit('toggled', isActive.value);
  }
  // Opcional: emit('clicked');
};
</script>

<template>
  <button
    :class="[modeClass, { 'is-active': isToggle && isActive }]"
    @click="handleClick"
  >
    <i 
      v-if="iconName" 
      :class="['icon', `icon-${iconName}`]"
      aria-hidden="true" 
    >
      {{ iconPlaceholder }}
    </i>
    <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24">
      <path stroke-width="0" d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
    </svg>
    
    <span class="button-label">
        <slot></slot>
    </span>
    
  </button>
</template>

<style scoped>
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--top-bar-height);
  width: var(--top-bar-height);
  border: none;
  background-color: var(--top-bar-btn-bg);;
  color: var(--top-bar-btn-txt);
  fill: var(--top-bar-btn-txt);
  stroke: var(--top-bar-btn-txt);
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

button.switch-on {
  background-color: var(--top-bar-btn-bg-on);
  color: var(--top-bar-btn-txt-on);
  fill: var(--top-bar-btn-txt-on);
  stroke: var(--top-bar-btn-txt-on);
}
</style>