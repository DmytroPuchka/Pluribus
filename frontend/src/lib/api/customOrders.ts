/**
 * Custom Orders API Service
 * Handles custom orders management endpoints
 */

import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  CreateCustomOrderRequest,
  UpdateCustomOrderStatusRequest,
  CustomOrdersFilters,
  CustomOrder,
} from './types';

/**
 * Create custom order
 */
export async function createCustomOrder(data: CreateCustomOrderRequest): Promise<CustomOrder> {
  const response = await apiClient.post<ApiResponse<CustomOrder>>('/custom-orders', data);
  return response.data.data;
}

/**
 * Get all custom orders with filters
 */
export async function getCustomOrders(filters?: CustomOrdersFilters): Promise<PaginatedResponse<CustomOrder>> {
  const response = await apiClient.get<PaginatedResponse<CustomOrder>>('/custom-orders', {
    params: filters,
  });
  return response.data;
}

/**
 * Get custom order by ID
 */
export async function getCustomOrderById(customOrderId: string): Promise<CustomOrder> {
  const response = await apiClient.get<ApiResponse<CustomOrder>>(`/custom-orders/${customOrderId}`);
  return response.data.data;
}

/**
 * Update custom order status (accept/decline/cancel/complete)
 */
export async function updateCustomOrderStatus(
  customOrderId: string,
  data: UpdateCustomOrderStatusRequest
): Promise<CustomOrder> {
  const response = await apiClient.patch<ApiResponse<CustomOrder>>(
    `/custom-orders/${customOrderId}/status`,
    data
  );
  return response.data.data;
}

/**
 * Delete custom order (buyer only, if pending/declined)
 */
export async function deleteCustomOrder(customOrderId: string): Promise<void> {
  await apiClient.delete(`/custom-orders/${customOrderId}`);
}
