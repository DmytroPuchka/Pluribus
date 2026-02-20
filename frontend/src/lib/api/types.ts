/**
 * API Response Types
 * Types for API requests and responses
 */

import type {
  User,
  Product,
  UserRole,
  ProductCategory,
} from '@/types';

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  statusCode: number;
  timestamp: string;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  country: string;
  city: string;
  deliveryCountries?: string[];
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Users
export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  deliveryCountries?: string[];
}

export interface UserStatsResponse {
  totalOrders: number;
  totalProducts: number;
  averageRating: number;
  totalReviews: number;
}

// Products
export interface CreateProductRequest {
  title: string;
  description: string;
  photos: string[];
  price: number;
  category: ProductCategory;
  tags?: string[];
  stockQuantity?: number;
}

export interface UpdateProductRequest {
  title?: string;
  description?: string;
  photos?: string[];
  price?: number;
  category?: ProductCategory;
  tags?: string[];
  stockQuantity?: number;
  isAvailable?: boolean;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sellerId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'newest' | 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// Query Parameters
export interface ListUsersParams {
  page?: number;
  limit?: number;
  role?: UserRole;
  country?: string;
  isActive?: boolean;
}
