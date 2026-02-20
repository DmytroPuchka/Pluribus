'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/lib/api';
import type { User, LoginRequest } from '@/lib/api/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser();

          // Only allow admin users (ADMIN role only)
          if (currentUser.role === 'ADMIN') {
            setUser(currentUser);
          } else {
            await authService.logout();
          }
        } catch (error) {
          console.error('Failed to fetch current user:', error);
          await authService.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);

    // Only allow ADMIN role to access admin panel
    if (response.user.role !== 'ADMIN') {
      await authService.logout();
      throw new Error('Access denied. Administrator role required.');
    }

    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
