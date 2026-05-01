const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for making API calls
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || error.message || 'API Error');
  }
  
  return response.json();
}

// Authentication APIs
export const authAPI = {
  signup: (email, password, name, phone, city) =>
    fetchAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, phone, city }),
    }),
  
  login: (email, password) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  getCurrentUser: () => fetchAPI('/auth/me'),
};

// Ads APIs
export const adsAPI = {
  getAds: (page = 1, limit = 10, category, city, sortBy) =>
    fetchAPI(`/ads?page=${page}&limit=${limit}${category ? `&category=${category}` : ''}${city ? `&city=${city}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}`),
  
  getAdById: (id) => fetchAPI(`/ads/${id}`),
  
  createAd: (adData) =>
    fetchAPI('/ads', {
      method: 'POST',
      body: JSON.stringify(adData),
    }),
  
  updateAd: (id, adData) =>
    fetchAPI(`/ads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adData),
    }),
  
  deleteAd: (id) =>
    fetchAPI(`/ads/${id}`, {
      method: 'DELETE',
    }),
  
  getUserAds: () => fetchAPI('/ads/user/my-ads'),
};

// Auth persistence utilities
export function saveAuthData(token, user) {
  if (token) {
    localStorage.setItem('token', token);
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getAuthData() {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  return {
    token,
    user: userStr ? JSON.parse(userStr) : null,
  };
}

export function isAuthenticated() {
  return !!getAuthData().token;
}

export function logout() {
  clearAuthData();
}

export function getUser() {
  return getAuthData().user;
}
