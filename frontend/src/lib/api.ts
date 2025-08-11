import axios from 'axios';
import { ShortenUrlRequest, ShortenUrlResponse, AnalyticsResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'An unexpected error occurred');
  }
);

export const urlService = {
  // Shorten a URL
  shortenUrl: async (data: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
    const response = await api.post<ShortenUrlResponse>('/api/shorten', data);
    return response.data;
  },

  // Get analytics data
  getAnalytics: async (): Promise<AnalyticsResponse> => {
    const response = await api.get<AnalyticsResponse>('/api/analytics');
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
