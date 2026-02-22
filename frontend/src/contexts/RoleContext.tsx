'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types';
import { useAuth } from './AuthContext';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    // Initialize from localStorage or default
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('pluribus_current_role') as UserRole;
      if (savedRole) return savedRole;
    }
    return 'BUYER';
  });

  // Update role when user changes
  useEffect(() => {
    if (user) {
      const savedRole = localStorage.getItem('pluribus_current_role') as UserRole;
      if (savedRole && savedRole === user.role) {
        setCurrentRoleState(savedRole);
      } else {
        setCurrentRoleState(user.role);
        localStorage.setItem('pluribus_current_role', user.role);
      }
    }
  }, [user]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    localStorage.setItem('pluribus_current_role', role);
  };

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    // Return default values instead of throwing error
    // This prevents the component from crashing during initial render
    return {
      currentRole: 'BUYER' as UserRole,
      setCurrentRole: () => {},
    };
  }
  return context;
}
