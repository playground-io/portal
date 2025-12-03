<template>
  <div class="main-content">
    <div class="thediv">
      
      <AppLang />
      <p>The Space {{ store.bottomHeight  }}</p>
      <p>{{loading}}</p>
      <p>{{user}}</p>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted} from 'vue';
  import {useTasksStore} from '@/stores/taksStore.js';
  import userService from '@/api/services/userService';  
  import weather from '@/components/views/weather.vue'

// 1. Define Local Reactive State
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // 2. Define the Fetching Logic
  const fetchUser = async () => {
    loading.value = true;
    error.value = null;
    user.value = null; // Clear previous user data

    try {
      const response = await userService.getUsers();
      // Assign data to the local reactive reference
      user.value = response.data; 
    } catch (err) {
      console.error('API Error:', err);
      error.value = 'Failed to load user data.';
      // Optionally re-throw or handle specific error codes here
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchUser();
  });

  const store = useTasksStore();
  console.log( store.bottomHeight );

</script>

<style scoped>
  .main-content {  
    display: flex;
    min-height: 0; 
    min-width: 0;
  }

  .thediv {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-height: 0; 
    min-width: 0;
  }
</style>