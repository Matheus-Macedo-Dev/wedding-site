import axios from 'axios';

// Use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config;
    const isNetworkOrTimeout =
      !error.response || error.code === 'ECONNABORTED';

    if (!isNetworkOrTimeout) {
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    config.__retryCount += 1;
    return new Promise((resolve) =>
      setTimeout(() => resolve(api(config)), RETRY_DELAY_MS)
    );
  }
);

// Gift endpoints
export const getGifts = () => api.get('/gifts');
export const getGift = (id) => api.get(`/gifts/${id}`);
export const createCheckout = (giftId, uploadedImageUrl) => 
  api.post(`/gifts/${giftId}/checkout`, { uploadedImageUrl });
export const uploadPhoto = (formData) => 
  api.post('/gifts/upload-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Health check
export const healthCheck = () => api.get('/health');


export default api;
