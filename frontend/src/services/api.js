import axios from 'axios';

// Use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Gift endpoints
export const getGifts = () => api.get('/gifts');
export const getGift = (id) => api.get(`/gifts/${id}`);
export const createCheckout = (giftId, version, uploadedImageUrl) => 
  api.post(`/gifts/${giftId}/checkout`, { version, uploadedImageUrl });
export const uploadPhoto = (formData) => 
  api.post('/gifts/upload-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Health check
export const healthCheck = () => api.get('/health');

// Note: RSVP functionality is handled by separate Vue.js application
// No RSVP API calls needed in this React app

export default api;
