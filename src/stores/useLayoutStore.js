// Store Global WebApp Layout
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  // STATES
  const isExtended = ref(false); 

  // ACTIONS
  const setLayouExtended = () => {
    isExtended.value = !isExtended.value;
    console.log(isExtended.value);
  };
  
  // GETTERS
  const getLayoutExtended = computed(() => {
    return isExtended.value;
  });

  // RETURN
  return {
    isExtended,
    setLayouExtended,
    getLayoutExtended
  };
});