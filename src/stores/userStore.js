import { defineStore } from 'pinia';
import usersApi from '@/api/modules/users'; // Import the module

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    isLoading: false
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        // CLEAN: No axios calls here, just the API method
        const response = await usersApi.getAll(); 
        this.users = response.data;
      } catch (error) {
        console.error('Failed to load users', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});