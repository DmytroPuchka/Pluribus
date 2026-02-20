/**
 * Orders API Service
 * Handles order management endpoints
 */

import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrdersFilters,
  Order,
  OrderStats,
} from './types';

/**
 * Create order
 */
export async function createOrder(data: CreateOrderRequest): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>('/orders', data);
  return response.data.data;
}

/**
 * Get all orders with filters
 */
export async function getOrders(filters?: OrdersFilters): Promise<PaginatedResponse<Order>> {
  const response = await apiClient.get<PaginatedResponse<Order>>('/orders', {
    params: filters,
  });
  return response.data;
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<Order> {
  const response = await apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`);
  return response.data.data;
}

/**
 * Update order status (seller only)
 */
export async function updateOrderStatus(
  orderId: string,
  data: UpdateOrderStatusRequest
): Promise<Order> {
  const response = await apiClient.patch<ApiResponse<Order>>(`/orders/${orderId}/status`, data);
  return response.data.data;
}

/**
 * Cancel order (buyer only)
 */
export async function cancelOrder(orderId: string): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>(`/orders/${orderId}/cancel`);
  return response.data.data;
}

/**
 * Get order statistics
 */
export async function getOrderStats(): Promise<OrderStats> {
  const response = await apiClient.get<ApiResponse<OrderStats>>('/orders/stats');
  return response.data.data;
}
