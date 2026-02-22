/**
 * Global TypeScript types for Pluribus
 */

// User types
export type UserRole = 'BUYER' | 'SELLER' | 'BOTH';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  country: string;
  city: string;
  deliveryCountries?: string[]; // List of country codes where seller can deliver (only for sellers)
  rating?: number;
  reviewCount?: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product types
export type ProductCategory =
  | 'ELECTRONICS'
  | 'CLOTHING'
  | 'FOOD'
  | 'BEAUTY'
  | 'BOOKS'
  | 'TOYS'
  | 'SPORTS'
  | 'HOME'
  | 'OTHER';

export interface Product {
  id: string;
  sellerId: string;
  seller?: User;
  title: string;
  description: string;
  photos: string[];
  price: number;
  currency: string;
  category: ProductCategory;
  tags: string[];
  stockQuantity?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order types
export type OrderStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'PAID'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyer?: User;
  sellerId: string;
  seller?: User;
  productId?: string;
  product?: Product;
  customOrderId?: string;
  status: OrderStatus;
  quantity: number;
  price: number;
  currency: string;
  deliveryAddress: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Custom Order types
export type CustomOrderStatus =
  | 'PENDING_SELLER_RESPONSE'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'CLARIFICATION_NEEDED'
  | 'CONVERTED_TO_ORDER'
  | 'CANCELLED';

export interface CustomOrderMessage {
  id: string;
  customOrderId: string;
  senderId: string;
  sender?: User;
  message: string;
  attachments?: string[];
  createdAt: Date;
}

export interface CustomOrderItem {
  id: string;
  text: string;
  isCompleted: boolean;
  completedBy?: string; // sellerId who marked it as completed
  completedAt?: Date;
}

export interface CustomOrder {
  id: string;
  buyerId: string;
  buyer?: User;
  sellerId: string;
  seller?: User;
  title: string;
  description: string;
  photos: string[];
  items?: CustomOrderItem[]; // Optional list of items (Google Keep style)
  maxPrice: number;
  currency: string;
  deliveryDeadline?: Date;
  deliveryType: 'asap' | 'date'; // 'asap' for as soon as possible, 'date' for specific date
  deliveryAddress: string;
  status: CustomOrderStatus;
  rejectionReason?: string;
  notes?: string;
  messages: CustomOrderMessage[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

// Review types
export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewer?: User;
  revieweeId: string;
  reviewee?: User;
  role: 'BUYER' | 'SELLER';
  overallRating: number;
  communicationRating: number;
  timelinessRating: number;
  comment?: string;
  createdAt: Date;
}

// Location types
export interface Location {
  lat: number;
  lng: number;
}

export interface SellerLocation extends Location {
  sellerId: string;
  seller: User;
  productCount: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  role: UserRole;
}

export interface CreateProductFormData {
  title: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  photos: File[];
  tags: string[];
  stockQuantity?: number;
}

export interface CreateOrderFormData {
  productId: string;
  quantity: number;
  deliveryAddress: string;
  notes?: string;
}

// Product Filter types
export interface ProductFiltersState {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  country?: string; // Seller's country
  deliveryCountry?: string; // Country where buyer wants delivery
  sortBy?: 'newest' | 'price-low-high' | 'price-high-low' | 'rating';
}
