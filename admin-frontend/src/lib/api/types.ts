export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  averageRating: number | null;
  totalReviews: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  sellerId: string;
  seller: {
    id: string;
    username: string;
    fullName: string;
  };
}

export interface PlatformStats {
  users: {
    total: number;
    sellers: number;
    buyers: number;
  };
  products: {
    total: number;
    active: number;
  };
  orders: {
    total: number;
    completed: number;
  };
  revenue: {
    total: number;
  };
  reviews: {
    total: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
