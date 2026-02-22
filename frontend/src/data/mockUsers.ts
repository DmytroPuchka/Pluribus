/**
 * Mock Users for Testing
 * 3 test accounts with different roles for UI testing
 */

import { User } from '@/types';

export const MOCK_USERS: Record<string, User> = {
  'buyer-1': {
    id: 'buyer-1',
    email: 'buyer@test.com',
    name: 'Anna Buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    role: 'BUYER',
    country: 'Ukraine',
    city: 'Kyiv',
    rating: 4.5,
    reviewCount: 12,
    emailVerified: true,
    phoneVerified: true,
    idVerified: false,
    isActive: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date(),
  },
  'seller-1': {
    id: 'seller-1',
    email: 'seller@test.com',
    name: 'John Seller',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    role: 'SELLER',
    country: 'United States',
    city: 'New York',
    deliveryCountries: ['United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany', 'France', 'Ukraine'],
    rating: 4.8,
    reviewCount: 125,
    emailVerified: true,
    phoneVerified: true,
    idVerified: true,
    isActive: true,
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date(),
  },
  'both-1': {
    id: 'both-1',
    email: 'both@test.com',
    name: 'Maria Martinez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    role: 'SELLER',
    country: 'Spain',
    city: 'Barcelona',
    deliveryCountries: ['Spain', 'Portugal', 'France', 'Italy', 'Germany', 'Netherlands', 'Belgium', 'United Kingdom', 'Ukraine'],
    rating: 4.9,
    reviewCount: 89,
    emailVerified: true,
    phoneVerified: true,
    idVerified: true,
    isActive: true,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date(),
  },
};

export const TEST_ACCOUNTS = [
  {
    id: 'buyer-1',
    email: 'buyer@test.com',
    password: 'password123',
    name: 'Anna Buyer',
    role: 'BUYER',
    description: 'Test account - Buyer only',
  },
  {
    id: 'seller-1',
    email: 'seller@test.com',
    password: 'password123',
    name: 'John Seller',
    role: 'SELLER',
    description: 'Test account - Seller only',
  },
  {
    id: 'both-1',
    email: 'both@test.com',
    password: 'password123',
    name: 'Maria Martinez',
    role: 'SELLER',
    description: 'Test account - Seller (can buy and sell)',
  },
];

/**
 * Get mock user by email and password
 */
export function getMockUserByCredentials(email: string, password: string): User | null {
  // Find test account
  const account = TEST_ACCOUNTS.find(
    acc => acc.email === email && acc.password === password
  );

  if (!account) {
    return null;
  }

  // Return corresponding user
  return MOCK_USERS[account.id];
}

/**
 * Get mock user by ID
 */
export function getMockUserById(id: string): User | null {
  return MOCK_USERS[id] || null;
}
