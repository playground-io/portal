import internalClient from '../clients/internalApi'; // <-- Uses Internal Client

export default {
  // This call will automatically get the Auth Bearer token
  getDetails(id) {
    return internalClient.get(`/products/${id}`);
  },
  
  updateProduct(id, data) {
    return internalClient.put(`/products/${id}`, data);
  }
};