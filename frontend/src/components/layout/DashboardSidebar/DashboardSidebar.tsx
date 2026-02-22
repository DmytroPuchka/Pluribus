'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  User,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User as UserType, UserRole } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/contexts/TranslationsContext';
import { toast } from 'sonner';

interface DashboardSidebarProps {
  user: UserType;
  onRoleSwitch?: (role: UserRole) => void;
  currentRole?: UserRole;
}

export function DashboardSidebar({
  user,
  onRoleSwitch,
  currentRole = 'BUYER',
}: DashboardSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { t } = useTranslations();

  const allNavItems = [
    {
      href: '/dashboard',
      label: t('dashboard.sidebar.overview'),
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/dashboard/orders',
      label: t('dashboard.sidebar.orders'),
      icon: ShoppingCart,
    },
    {
      href: '/dashboard/custom-orders',
      label: t('dashboard.sidebar.customOrders'),
      icon: ClipboardList,
    },
    {
      href: '/dashboard/products',
      label: t('dashboard.sidebar.products'),
      icon: Package,
      roles: ['SELLER'], // Only for sellers
    },
    {
      href: '/dashboard/profile',
      label: t('dashboard.sidebar.profile'),
      icon: User,
    },
    {
      href: '/dashboard/settings',
      label: t('dashboard.sidebar.settings'),
      icon: Settings,
    },
  ];

  // Filter navigation items based on user role
  const navItems = allNavItems.filter(item => {
    if (!item.roles) return true; // Show items without role restrictions
    return item.roles.includes(user.role);
  });

  const handleLogout = () => {
    logout();
    toast.success(t('auth.logout.success'));
    router.push('/');
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'BUYER':
        return `🛍️ ${t('dashboard.sidebar.roleBuyer')}`;
      case 'SELLER':
        return `🏪 ${t('dashboard.sidebar.roleSeller')}`;
      case 'ADMIN':
        return `👑 ${t('dashboard.sidebar.roleAdmin')}`;
      default:
        return role;
    }
  };

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* User Info */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
          {user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>

      {/* Role Switcher */}
      {onRoleSwitch && (
        <div className="mb-6 rounded-lg bg-muted p-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {t('dashboard.sidebar.currentRole')}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                <span>{getRoleLabel(currentRole)}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => onRoleSwitch(user.role)}>
                <span>{getRoleLabel(user.role)}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2 mb-8 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => {
          setIsMobileOpen(false);
          handleLogout();
        }}
      >
        <LogOut className="h-4 w-4 mr-2" />
        {t('header.user.logout')}
      </Button>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden sticky top-0 z-40 border-b bg-background p-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">Pluribus</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 border-r bg-background p-6 transition-transform duration-200 lg:relative lg:translate-x-0 lg:top-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="hidden lg:block mb-8">
          <h1 className="font-bold text-lg text-blue-600">Pluribus</h1>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}
