'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { User } from '@/types';

// Mock user data
const MOCK_USER: User = {
  id: 'user-123',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  role: 'BOTH',
  country: 'United States',
  city: 'New York',
  rating: 4.8,
  reviewCount: 127,
  emailVerified: true,
  phoneVerified: true,
  idVerified: true,
  isActive: true,
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2024-02-08'),
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentRole, setCurrentRole] = useState<'BUYER' | 'SELLER'>('BUYER');

  const handleRoleSwitch = (role: 'BUYER' | 'SELLER') => {
    setCurrentRole(role);
    // Here you would typically dispatch an action or call an API to switch roles
    console.log(`Switched role to: ${role}`);
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar
        user={MOCK_USER}
        currentRole={currentRole}
        onRoleSwitch={handleRoleSwitch}
      />
      <main className="flex-1 overflow-auto">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
