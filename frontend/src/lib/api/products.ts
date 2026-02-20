/**
 * Products API Service
 * Handles product management endpoints
 */

import { apiClient } from './client';
import type { Product } from '@/types';
import type {
  ApiResponse,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilters,
  PaginatedResponse,
} from './types';

/**
 * Get all products with filters
 */
export async function getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
  const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
    params: filters,
  });
  return response.data;
}

/**
 * Get product by ID
 */
export async function getProductById(productId: string): Promise<Product> {
  const response = await apiClient.get<ApiResponse<Product>>(`/products/${productId}`);
  return response.data.data;
}

/**
 * Create new product (seller only)
 */
export async function createProduct(data: CreateProductRequest): Promise<Product> {
  const response = await apiClient.post<ApiResponse<Product>>('/products', data);
  return response.data.data;
}

/**
 * Update product (seller only)
 */
export async function updateProduct(
  productId: string,
  data: UpdateProductRequest
): Promise<Product> {
  const response = await apiClient.put<ApiResponse<Product>>(`/products/${productId}`, data);
  return response.data.data;
}

/**
 * Delete product (seller only)
 */
export async function deleteProduct(productId: string): Promise<void> {
  await apiClient.delete(`/products/${productId}`);
}
