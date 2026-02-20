import { apiClient } from './client';
import type { PlatformStats, User, Product } from './types';

class AdminService {
  // Platform Statistics
  async getPlatformStats(): Promise<PlatformStats> {
    const response = await apiClient.get<PlatformStats>('/admin/stats');
    return response.data;
  }

  // User Management
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    role?: 'BUYER' | 'SELLER';
    isActive?: boolean;
    search?: string;
  }): Promise<{ users: User[]; total: number; page: number; totalPages: number }> {
    const response = await apiClient.get<{
      users: User[];
      total: number;
      page: number;
      totalPages: number;
    }>('/admin/users', { params });
    return response.data;
  }

  async toggleUserStatus(userId: string, isActive: boolean): Promise<User> {
    const response = await apiClient.patch<User>(`/admin/users/${userId}/status`, {
      isActive,
    });
    return response.data;
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`/admin/users/${userId}`);
    return response.data;
  }

  // Product Management
  async getAllProducts(params?: {
    page?: number;
    limit?: number;
    isActive?: boolean;
    category?: string;
    search?: string;
  }): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await apiClient.get<{
      products: Product[];
      total: number;
      page: number;
      totalPages: number;
    }>('/admin/products', { params });
    return response.data;
  }

  async toggleProductStatus(productId: string, isActive: boolean): Promise<Product> {
    const response = await apiClient.patch<Product>(`/admin/products/${productId}/status`, {
      isActive,
    });
    return response.data;
  }

  async deleteProduct(productId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `/admin/products/${productId}`
    );
    return response.data;
  }
}

export const adminService = new AdminService();
