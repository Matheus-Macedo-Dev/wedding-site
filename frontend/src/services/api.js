import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? 'https://your-app.railway.app/api'  // Update this after Railway deployment
  : 'http://localhost:3000/api';

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
export const createCheckout = (giftId) => api.post(`/gifts/${giftId}/checkout`);

// Health check
export const healthCheck = () => api.get('/health');

// Note: RSVP functionality is handled by separate Vue.js application
// No RSVP API calls needed in this React app

export default api;
