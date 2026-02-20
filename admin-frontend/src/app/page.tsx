'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { adminService } from '@/lib/api';
import type { PlatformStats } from '@/lib/api/types';
import { toast } from 'sonner';
import { Users, Package, ShoppingCart, DollarSign, Star, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminService.getPlatformStats();
      setStats(data);
    } catch (error: any) {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Failed to load dashboard data</p>
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.users.total.toLocaleString(),
      subtitle: `${stats.users.sellers} sellers, ${stats.users.buyers} buyers`,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Products',
      value: stats.products.total.toLocaleString(),
      subtitle: `${stats.products.active} active`,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Orders',
      value: stats.orders.total.toLocaleString(),
      subtitle: `${stats.orders.completed} completed`,
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.total.toLocaleString()}`,
      subtitle: 'From completed orders',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'Reviews',
      value: stats.reviews.total.toLocaleString(),
      subtitle: 'Platform feedback',
      icon: Star,
      color: 'bg-pink-500',
    },
    {
      title: 'Completion Rate',
      value: stats.orders.total > 0
        ? `${Math.round((stats.orders.completed / stats.orders.total) * 100)}%`
        : '0%',
      subtitle: 'Order success rate',
      icon: TrendingUp,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">User Distribution</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Sellers</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {stats.users.total > 0
                      ? Math.round((stats.users.sellers / stats.users.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${stats.users.total > 0
                        ? (stats.users.sellers / stats.users.total) * 100
                        : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Product Activity</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Active Products</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {stats.products.total > 0
                      ? Math.round((stats.products.active / stats.products.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${stats.products.total > 0
                        ? (stats.products.active / stats.products.total) * 100
                        : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
