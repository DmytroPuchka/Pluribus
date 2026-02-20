/**
 * Dashboard Orders Page
 * Displays all orders for the authenticated user (buyer or seller)
 *
 * Route: /dashboard/orders
 */

'use client';

import { useState, useMemo, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OrderCard } from '@/components/features/OrderCard';
import { Pagination } from '@/components/common/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Order, OrderStatus } from '@/types';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { ordersService } from '@/lib/api';
import { toast } from 'sonner';

type OrderStatusTab = 'all' | 'pending' | 'completed' | 'cancelled';

interface OrdersPageProps {
  searchParams: Promise<{
    tab?: OrderStatusTab;
  }>;
}

export default function OrdersPage({ searchParams }: OrdersPageProps) {
  const { t } = useTranslations();
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const params = use(searchParams);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatusTab>(
    (params.tab as OrderStatusTab) || 'all'
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Authentication guard
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setIsLoadingOrders(true);

      try {
        const ordersData = await ordersService.getOrders({
          page: 1,
          limit: 1000,
        });

        const convertedOrders = ordersData.data.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }));

        setOrders(convertedOrders);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        const errorMessage =
          error?.response?.data?.error || 'Failed to load orders';
        toast.error('Error', {
          description: errorMessage,
        });
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Filter orders by status and search query
  const filteredOrders = useMemo(() => {
    let result = orders;

    // Filter by tab
    if (activeTab === 'pending') {
      result = result.filter((order) => order.status === 'PENDING');
    } else if (activeTab === 'completed') {
      result = result.filter((order) =>
        ['COMPLETED', 'DELIVERED'].includes(order.status)
      );
    } else if (activeTab === 'cancelled') {
      result = result.filter((order) => order.status === 'CANCELLED');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.product?.title.toLowerCase().includes(query) ||
          order.buyer?.name.toLowerCase().includes(query) ||
          order.seller?.name.toLowerCase().includes(query) ||
          order.id.toLowerCase().includes(query)
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  // Calculate pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset page on tab or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Show loading skeleton
  if (isAuthLoading || isLoadingOrders) {
    return (
      <div className="container px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="mb-6 flex gap-3 flex-col sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('pages.dashboard.orders.title')}</h1>
        <p className="text-muted-foreground">
          {t('pages.dashboard.orders.subtitle')}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-3 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('pages.dashboard.orders.searchPlaceholder')}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="default" className="gap-2">
          <Filter className="w-4 h-4" />
          {t('pages.dashboard.orders.filters')}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as OrderStatusTab)}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all">
            {t('pages.dashboard.orders.tabs.all')}
            <span className="ml-2 text-xs">
              {orders.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="pending">
            {t('pages.dashboard.orders.tabs.pending')}
            <span className="ml-2 text-xs">
              {orders.filter((o) => o.status === 'PENDING').length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">
            {t('pages.dashboard.orders.tabs.completed')}
            <span className="ml-2 text-xs">
              {orders.filter((o) => ['COMPLETED', 'DELIVERED'].includes(o.status)).length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            {t('pages.dashboard.orders.tabs.cancelled')}
            <span className="ml-2 text-xs">
              {orders.filter((o) => o.status === 'CANCELLED').length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Orders List */}
        <div className="mt-6 space-y-4">
          {/* Results Info */}
          {filteredOrders.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {t('pages.dashboard.orders.showing')} {startIndex + 1}-{Math.min(endIndex, totalItems)} {t('pages.dashboard.orders.of')} {totalItems} {t('pages.dashboard.orders.orders')}
              </p>
            </div>
          )}

          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">
                {searchQuery ? t('pages.dashboard.orders.empty.noResults') : t('pages.dashboard.orders.empty.noSearch')}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                >
                  {t('pages.dashboard.orders.empty.clearSearch')}
                </Button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                showItemsPerPageSelector={true}
              />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
