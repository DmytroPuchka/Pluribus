'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { authService, usersService, getAccessToken, clearTokens } from '@/lib/api';
import type { LoginRequest, RegisterRequest } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from API on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          // Fetch current user from API
          const currentUser = await usersService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error loading user from API:', error);
        // Token might be invalid, clear it
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const authResponse = await authService.login(credentials);
      setUser(authResponse.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const authResponse = await authService.register(data);
      setUser(authResponse.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await usersService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
