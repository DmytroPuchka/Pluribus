/**
 * Zustand stores for global state management
 */

// Auth store
export { useAuthStore, selectUser, selectIsAuthenticated } from './auth';
export type { User } from '@/types';

// UI store
export { useUIStore } from './ui';
