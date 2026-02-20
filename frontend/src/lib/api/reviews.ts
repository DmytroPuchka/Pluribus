/**
 * Reviews API Service
 * Handles review management endpoints
 */

import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  CreateReviewRequest,
  ReviewsFilters,
  Review,
} from './types';

/**
 * Create review
 */
export async function createReview(data: CreateReviewRequest): Promise<Review> {
  const response = await apiClient.post<ApiResponse<Review>>('/reviews', data);
  return response.data.data;
}

/**
 * Get all reviews with filters
 */
export async function getReviews(filters?: ReviewsFilters): Promise<PaginatedResponse<Review>> {
  const response = await apiClient.get<PaginatedResponse<Review>>('/reviews', {
    params: filters,
  });
  return response.data;
}

/**
 * Get review by ID
 */
export async function getReviewById(reviewId: string): Promise<Review> {
  const response = await apiClient.get<ApiResponse<Review>>(`/reviews/${reviewId}`);
  return response.data.data;
}

/**
 * Get reviews for a specific user
 */
export async function getUserReviews(
  userId: string,
  filters?: ReviewsFilters
): Promise<PaginatedResponse<Review>> {
  const response = await apiClient.get<PaginatedResponse<Review>>(`/reviews/user/${userId}`, {
    params: filters,
  });
  return response.data;
}

/**
 * Get reviews for a specific product
 */
export async function getProductReviews(
  productId: string,
  filters?: ReviewsFilters
): Promise<PaginatedResponse<Review>> {
  const response = await apiClient.get<PaginatedResponse<Review>>(`/reviews/product/${productId}`, {
    params: filters,
  });
  return response.data;
}

/**
 * Delete review (reviewer only)
 */
export async function deleteReview(reviewId: string): Promise<void> {
  await apiClient.delete(`/reviews/${reviewId}`);
}
