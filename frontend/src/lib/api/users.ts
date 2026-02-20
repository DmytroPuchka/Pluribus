/**
 * Users API Service
 * Handles user management endpoints
 */

import { apiClient } from './client';
import type { User } from '@/types';
import type {
  ApiResponse,
  UpdateProfileRequest,
  UserStatsResponse,
  ListUsersParams,
  PaginatedResponse,
} from './types';

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>('/users/me');
  return response.data.data;
}

/**
 * Update current user profile
 */
export async function updateProfile(data: UpdateProfileRequest): Promise<User> {
  const response = await apiClient.put<ApiResponse<User>>('/users/me', data);
  return response.data.data;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  return response.data.data;
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<UserStatsResponse> {
  const response = await apiClient.get<ApiResponse<UserStatsResponse>>('/users/stats');
  return response.data.data;
}

/**
 * Delete user account
 */
export async function deleteUser(): Promise<void> {
  await apiClient.delete('/users/me');
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(params?: ListUsersParams): Promise<PaginatedResponse<User>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users', {
    params,
  });
  return response.data.data;
}
