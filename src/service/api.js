import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/synergy' 
  : 'http://localhost:8080/synergy';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

// request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Instead of redirecting here, throw an error that can be handled by the component
      throw new Error('Authentication expired');
    }
    return Promise.reject(error);
  }
);

// User-related API calls
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response); // Debug log
     
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', email, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Forgot password error:', error.response?.data || error.message);
      throw error;
    }
  },

  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error.response?.data || error.message);
      throw error;
    }
  },
};

  export const userAPI = {
    createUser: async (userData) => {
      try {
        const response = await api.post('/auth/create', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        return response.data;
      } catch (error) {
        console.error('Error creating user:', error.response?.data || error);
        throw error;
      }
    },

  getUser: async (id) => {
    return await api.get(`/users/${id}`);
  },
  
  updateUser: async (id, userData) => {
    return await api.put(`/users/${id}`, userData);
  },
  
  deleteUser: async (id) => {
    return await api.delete(`/users/${id}`);
  },
  
  getAllUsers: async () => {
    return await api.get('/users');
  }
};

//usermanagement crud
export const adminAPI = {
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error.response?.data || error);
        throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await api.post('/users/create', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};