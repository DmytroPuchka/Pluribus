import { apiClient } from './client';
import type { LoginRequest, LoginResponse } from './types';

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);

    // Store tokens
    localStorage.setItem('admin_access_token', response.data.accessToken);
    localStorage.setItem('admin_refresh_token', response.data.refreshToken);

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Always clear tokens even if request fails
      localStorage.removeItem('admin_access_token');
      localStorage.removeItem('admin_refresh_token');
    }
  }

  async getCurrentUser(): Promise<LoginResponse['user']> {
    const response = await apiClient.get<{ user: LoginResponse['user'] }>('/auth/me');
    return response.data.user;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('admin_access_token');
  }
}

export const authService = new AuthService();
