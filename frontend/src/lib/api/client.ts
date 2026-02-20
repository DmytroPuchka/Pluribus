/**
 * API Client
 * Axios instance with interceptors for authentication and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

// Token storage keys
const ACCESS_TOKEN_KEY = 'pluribus_access_token';
const REFRESH_TOKEN_KEY = 'pluribus_refresh_token';

/**
 * Create axios instance
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - add auth token
  client.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // If 401 and not already retried, try to refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            const response = await axios.post(`${API_URL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data.data;

            // Save new tokens
            setAccessToken(accessToken);
            setRefreshToken(newRefreshToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return client(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          clearTokens();
          // You can emit an event here or use a callback to handle logout
          if (typeof window !== 'undefined') {
            window.location.href = '/login?session=expired';
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Token management functions
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

export const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// Export singleton instance
export const apiClient = createApiClient();

// Export API URL for direct usage
export { API_URL };
