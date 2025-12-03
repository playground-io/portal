// stores/layoutStore.js (Composition API Style)
import { defineStore } from 'pinia';
import { ref, computed } from 'vue'; // Importar 'ref' para o estado

export const useSplitterStore = defineStore('splitter', () => {
  // 1. STATE (Variáveis Reativas, usando ref)
  // 'bottomHeight' é o estado compartilhado, inicializado a 0.
  const bottomHeight = ref(0); 

  // 2. ACTIONS (Funções para Modificar o Estado)
  // Define a função que será chamada para atualizar o estado.
  const setBottomHeight = (newHeight) => {
    // Acessa e modifica o valor usando .value, como no Vue Components
    bottomHeight.value = newHeight;
  };
  
  // 3. GETTERS (Variáveis Calculadas, usando computed)
  // Exemplo opcional de um getter
  const getBottomHeight = computed(() => {
    // Poderia adicionar alguma lógica de transformação aqui se necessário
    return bottomHeight.value;
  });

  // 4. RETORNO (Tudo o que deve ser público)
  // Você deve retornar explicitamente todas as variáveis de estado, ações e getters.
  return { 
    bottomHeight,     // Estado (variável ref)
    setBottomHeight,  // Ação (função)
    getBottomHeight   // Getter (variável computed)
  };
});