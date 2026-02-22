'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowRight,
  Plus,
  Eye,
  Users,
  History,
  Repeat,
  Star,
} from 'lucide-react';
import { Order, Product, User } from '@/types';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { usersService, productsService } from '@/lib/api';
import { toast } from 'sonner';

// Mock orders data (TODO: Replace with API call when orders endpoint is ready)
const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: '#ORD-001',
    buyerId: 'user-123',
    sellerId: 'seller-1',
    status: 'SHIPPED',
    quantity: 2,
    price: 59.99,
    currency: 'USD',
    deliveryAddress: '123 Main St, New York, NY',
    trackingNumber: 'TRACK123456789',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-07'),
  },
  {
    id: 'order-2',
    orderNumber: '#ORD-002',
    buyerId: 'user-123',
    sellerId: 'seller-2',
    status: 'DELIVERED',
    quantity: 1,
    price: 29.99,
    currency: 'USD',
    deliveryAddress: '123 Main St, New York, NY',
    trackingNumber: 'TRACK987654321',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-02-04'),
  },
  {
    id: 'order-3',
    orderNumber: '#ORD-003',
    buyerId: 'user-123',
    sellerId: 'seller-3',
    status: 'PENDING',
    quantity: 3,
    price: 89.99,
    currency: 'USD',
    deliveryAddress: '123 Main St, New York, NY',
    createdAt: new Date('2024-02-06'),
    updatedAt: new Date('2024-02-06'),
  },
];


function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <p
                className={`text-xs mt-2 ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend === 'up' ? '+' : '-'}
                {Math.abs(change)}%
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderStatusBadge({ status }: { status: string }) {
  const { t } = useTranslations();
  const variants: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    ACCEPTED: 'bg-blue-100 text-blue-800',
    PAID: 'bg-purple-100 text-purple-800',
    SHIPPED: 'bg-cyan-100 text-cyan-800',
    DELIVERED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    DISPUTED: 'bg-orange-100 text-orange-800',
  };

  return (
    <Badge className={`${variants[status] || 'bg-gray-100 text-gray-800'}`}>
      {t(`pages.dashboard.orderStatus.${status}`)}
    </Badge>
  );
}

export default function DashboardPage() {
  const { t } = useTranslations();
  const { user, isLoading: authLoading } = useAuth();
  const { currentRole } = useRole();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    averageRating: 0,
    totalReviews: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Determine capabilities based on current role
  const canBuy = currentRole === 'BUYER' || currentRole === 'SELLER';
  const canSell = currentRole === 'SELLER';

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      setIsLoadingData(true);

      try {
        // Fetch user stats
        const userStats = await usersService.getUserStats();
        setStats(userStats);

        // Fetch user's products if they are a seller
        if (canSell) {
          const productsData = await productsService.getProducts({
            sellerId: user.id,
            limit: 10,
          });

          const convertedProducts = productsData.data.map(p => ({
            ...p,
            createdAt: new Date(p.createdAt),
            updatedAt: new Date(p.updatedAt),
          }));

          setProducts(convertedProducts);
        }
      } catch (error: any) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Error loading dashboard', {
          description: error?.response?.data?.error || 'Failed to load dashboard data',
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [user, canSell]);

  const totalRevenue = products.reduce(
    (sum, product) => sum + Number(product.price) * (product.stockQuantity || 1),
    0
  );

  // Loading state
  if (authLoading || !user) {
    return (
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <div className="h-10 bg-muted animate-pulse rounded w-1/3 mb-2" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="h-24 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('pages.dashboard.welcome')}, {user.name}!</h1>
        <p className="text-muted-foreground">
          {t('pages.dashboard.subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${canSell ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-4`}>
        <StatCard
          icon={ShoppingCart}
          label={t('pages.dashboard.stats.totalOrders')}
          value={stats.totalOrders}
        />
        {canSell && (
          <StatCard
            icon={Package}
            label={t('pages.dashboard.stats.activeProducts')}
            value={stats.totalProducts}
          />
        )}
        {canSell && (
          <StatCard
            icon={TrendingUp}
            label={t('pages.dashboard.stats.totalRevenue')}
            value={`$${totalRevenue.toFixed(2)}`}
          />
        )}
        {canSell && (
          <StatCard
            icon={Star}
            label={t('pages.dashboard.stats.sellerRating')}
            value={stats.totalReviews > 0 ? `${stats.averageRating.toFixed(1)} ★ (${stats.totalReviews})` : t('pages.dashboard.stats.noRatings')}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('pages.dashboard.recentOrders.title')}</CardTitle>
                  <CardDescription>
                    {t('pages.dashboard.recentOrders.subtitle', { count: MOCK_ORDERS.length })}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/orders">
                    {t('pages.dashboard.recentOrders.viewAll')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.quantity} {t('pages.dashboard.recentOrders.items')} · ${order.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <OrderStatusBadge status={order.status} />
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/orders/${order.id}`}>
                          {t('pages.dashboard.recentOrders.view')}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('pages.dashboard.quickActions.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Place Order - Only for BUYER and BOTH */}
              {canBuy && (
                <Button className="w-full justify-start" asChild>
                  <Link href="/sellers">
                    <Users className="mr-2 h-4 w-4" />
                    {t('pages.dashboard.quickActions.placeOrder')}
                  </Link>
                </Button>
              )}

              {/* Add Product - Only for SELLER and BOTH */}
              {canSell && (
                <Button className="w-full justify-start" variant={canBuy ? "outline" : "default"} asChild>
                  <Link href="/dashboard/products/new">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('pages.dashboard.quickActions.addProduct')}
                  </Link>
                </Button>
              )}

              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/profile">
                  {t('pages.dashboard.quickActions.viewProfile')}
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/settings">
                  {t('pages.dashboard.quickActions.settings')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Order History Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('pages.dashboard.orderHistory.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Buyer's Order History */}
              {canBuy && (
                <>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/dashboard/orders?role=buyer">
                      <History className="mr-2 h-4 w-4" />
                      {t('pages.dashboard.orderHistory.myOrders')}
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/dashboard/orders?role=buyer&reorder=true">
                      <Repeat className="mr-2 h-4 w-4" />
                      {t('pages.dashboard.orderHistory.reorder')}
                    </Link>
                  </Button>
                </>
              )}

              {/* Seller's Order History */}
              {canSell && (
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/dashboard/orders?role=seller">
                    <Package className="mr-2 h-4 w-4" />
                    {t('pages.dashboard.orderHistory.completedOrders')}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Active Products */}
          {canSell && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{t('pages.dashboard.activeProducts.title')}</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/products">
                      {t('pages.dashboard.recentOrders.viewAll')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingData ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-16 bg-muted animate-pulse rounded" />
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <div className="space-y-3">
                    {products.slice(0, 2).map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="h-12 w-12 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                          {product.photos && product.photos.length > 0 ? (
                            <img
                              src={product.photos[0]}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                              {t('pages.dashboard.noImage')}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${Number(product.price).toFixed(2)} · {t('pages.dashboard.activeProducts.stock')}: {product.stockQuantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No products yet
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
