import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

console.log('[leadService] API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

console.log('[leadService] Axios instance created with baseURL:', API_URL);

// Response interceptor for error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Something went wrong';
    console.error('[leadService] API Error:', message, err);
    return Promise.reject(new Error(message));
  }
);

export const leadService = {
  getAll: (params) => {
    console.log('[leadService] getAll called with params:', params);
    return api.get('/leads', { params });
  },
  search: (params) => {
    console.log('[leadService] search called with params:', params);
    return api.get('/leads/search', { params });
  },
  getStats: () => {
    console.log('[leadService] getStats called');
    return api.get('/leads/stats');
  },
  getById: (id) => {
    console.log('[leadService] getById called with id:', id);
    return api.get(`/leads/${id}`);
  },
  create: (data) => {
    console.log('[leadService] create called with data:', data);
    console.log('[leadService] Sending POST request to /leads with baseURL:', API_URL);
    return api.post('/leads', data);
  },
  update: (id, data) => {
    console.log('[leadService] update called with id:', id, 'data:', data);
    return api.put(`/leads/${id}`, data);
  },
  delete: (id) => {
    console.log('[leadService] delete called with id:', id);
    return api.delete(`/leads/${id}`);
  },
};

export default api;
