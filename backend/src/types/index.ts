// Common types used across the application

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  meta?: {
    timestamp: string;
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type CustomOrderStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';

export type ProductCategory =
  | 'electronics'
  | 'fashion'
  | 'home'
  | 'beauty'
  | 'sports'
  | 'books'
  | 'toys'
  | 'food'
  | 'other';

export type NotificationType =
  | 'order_created'
  | 'order_accepted'
  | 'order_shipped'
  | 'order_delivered'
  | 'custom_order_received'
  | 'custom_order_accepted'
  | 'message_received'
  | 'review_received'
  | 'payment_received';

export type DeliveryType = 'asap' | 'date';

// JWT Payload
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Request with authenticated user
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: UserRole;
  };
}
