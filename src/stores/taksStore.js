import { defineStore } from 'pinia'
import { ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTasksStore = defineStore('tasks', () => {

  const bottomHeight='Hello'
  
// State: This flag will be watched by the target component.
  const triggerNotification = ref(false); 

  // Action: This is the function called by the button component.
  const isLocked = () => {
    // We increment the count to ensure a state change is always detected, 
    // even if the button is pressed multiple times quickly.
    triggerNotification.value=!triggerNotification.value; 
    console.log(triggerNotification.value);
  };

  return { bottomHeight, isLocked, triggerNotification}
})