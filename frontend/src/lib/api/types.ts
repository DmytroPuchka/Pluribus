/**
 * API Response Types
 * Types for API requests and responses
 */

import type {
  User,
  Product,
  Order,
  Review,
  UserRole,
  ProductCategory,
  OrderStatus,
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
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  requiresEmailVerification?: boolean;
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

// Orders
export interface CreateOrderRequest {
  productId?: string;
  customOrderId?: string;
  price: number;
  currency: string;
  deliveryAddress: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  trackingNumber?: string;
}

export interface OrdersFilters {
  role?: 'buyer' | 'seller';
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export interface OrderStats {
  totalOrders: number;
  totalAsBuyer: number;
  totalAsSeller: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
}

// Reviews
export interface CreateReviewRequest {
  orderId: string;
  revieweeId: string;
  overallRating: number;
  communicationRating: number;
  timelinessRating: number;
  comment?: string;
}

export interface ReviewsFilters {
  page?: number;
  limit?: number;
  minRating?: number;
  maxRating?: number;
}

// Custom Orders
export interface CreateCustomOrderRequest {
  sellerId?: string;
  title: string;
  description: string;
  photos?: string[];
  items?: any;
  maxPrice: number;
  currency: string;
  deliveryDeadline?: string;
  deliveryType?: 'ASAP' | 'DATE';
}

export interface UpdateCustomOrderStatusRequest {
  status: 'ACCEPTED' | 'DECLINED' | 'COMPLETED' | 'CANCELLED';
}

export interface CustomOrdersFilters {
  role?: 'buyer' | 'seller';
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED' | 'CANCELLED';
  page?: number;
  limit?: number;
}

// Export Order, Review, and CustomOrder types
export type { Order, Review, CustomOrder } from '@/types';
