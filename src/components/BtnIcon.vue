<template>
  <span 
    class="svg-icon" 
    v-html="svgContent"
    :style="{ width: size, height: size }"
  >
  </span>
</template>

<script setup>
import { computed } from 'vue';

// --- SIMULAÇÃO DE CONTEÚDO SVG (Em Projeto Real, seria um import dinâmico) ---
const svgLibrary = {
    // Conteúdo de um ícone 'home'
    home: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>`,
    // Conteúdo de um ícone 'moon' (dark mode)
    moon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.3,4.01C7.87,3.63,4.01,7.02,4.01,12c0,4.98,4.01,9,9,9c3.98,0,7.37-3.86,7.99-8.3C15.82,14.61,12.3,4.01,12.3,4.01z M12.3,21.01c-5.98,0-10-4.02-10-9c0-4.98,4.02-9,10-9c0.3,0,0.6,0.02,0.89,0.06c-3.14,2.26-4.99,6.01-4.99,10.94C8.2,17.43,9.58,20.06,12.3,21.01z"/></svg>`,
};
// --------------------------------------------------------------------------

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '1.2em' // Usa 'em' para escalar com o tamanho da fonte do pai
  }
});

// Encontra o conteúdo SVG na "biblioteca"
const svgContent = computed(() => {
    return svgLibrary[props.name] || ''; 
});
</script>

<style scoped>
.svg-icon {
    display: inline-flex; /* Garante que o span se comporta bem com flex */
    color: inherit; /* O SVG herda a cor do texto do botão */
    line-height: 1; /* Previne espaços extra causados pela linha */
}

/* O SVG interno herda a cor atual do elemento span/button */
.svg-icon :deep(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor; 
}
</style>