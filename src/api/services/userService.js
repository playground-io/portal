// Assuming 'client.js' is located in '../api/client.js' relative to this file
import mockApiClient from '@/api/clients/mockApi'; 

/**
 * Service methods for interacting with the /users API endpoint.
 * Note: These methods return the raw Axios Response object, which contains
 * response data in the 'data' property.
 */
const userService = {
    /**
     * Fetches all users.
     * @returns {Promise<AxiosResponse>} The full Axios response object.
     */
    getUsers() {
        return mockApiClient.get('/users');
    },

    /**
     * Fetches details for a specific user.
     * @param {string} id - The ID of the user.
     * @returns {Promise<AxiosResponse>} The full Axios response object.
     */
    getDetails(id) {
        return mockApiClient.get(`/users/${id}`);
    },
    
    /**
     * Updates data for a specific user.
     * @param {string} id - The ID of the user.
     * @param {object} data - The data payload to update.
     * @returns {Promise<AxiosResponse>} The full Axios response object.
     */
    updateUser(id, data) {
        return mockApiClient.put(`/users/${id}`, data);
    }
};

export default userService;