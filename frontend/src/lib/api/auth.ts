/**
 * Auth API Service
 * Handles authentication endpoints
 */

import { apiClient, setAccessToken, setRefreshToken, clearTokens, getRefreshToken } from './client';
import type {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
} from './types';

/**
 * Register a new user
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);

  // Save tokens only if email verification is not required
  const { accessToken, refreshToken, requiresEmailVerification } = response.data.data;

  if (!requiresEmailVerification && accessToken && refreshToken) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }

  return response.data.data;
}

/**
 * Login with email and password
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);

  // Save tokens
  const { accessToken, refreshToken } = response.data.data;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  return response.data.data;
}

/**
 * Refresh access token
 */
export async function refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', data);

  // Save new tokens
  const { accessToken, refreshToken: newRefreshToken } = response.data.data;
  setAccessToken(accessToken);
  setRefreshToken(newRefreshToken);

  return response.data.data;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  try {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await apiClient.post('/auth/logout', { refreshToken });
    }
  } finally {
    // Clear tokens even if request fails
    clearTokens();
  }
}
