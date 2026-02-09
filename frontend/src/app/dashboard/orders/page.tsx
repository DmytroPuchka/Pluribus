/**
 * Dashboard Orders Page
 * Displays all orders for the authenticated user (buyer or seller)
 *
 * Route: /dashboard/orders
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OrderCard } from '@/components/features/OrderCard';
import { Pagination } from '@/components/common/Pagination';
import { Order, OrderStatus } from '@/types';
import { useTranslations } from '@/contexts/TranslationsContext';

// Mock data for development
const getMockOrders = (): Order[] => [
  {
    id: 'order-1',
    orderNumber: 'ORD-2025-001',
    buyerId: 'buyer-1',
    buyer: {
      id: 'buyer-1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'BUYER',
      country: 'United States',
      city: 'New York',
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-1',
    seller: {
      id: 'seller-1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'SELLER',
      country: 'United States',
      city: 'New York',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '1',
    product: {
      id: '1',
      sellerId: 'seller-1',
      title: 'Apple iPhone 15 Pro Max',
      description: 'Brand new Apple iPhone 15 Pro Max with 256GB storage.',
      photos: ['https://images.unsplash.com/photo-1696446702183-cbd80e00b9c8?w=400'],
      price: 1299,
      currency: 'USD',
      category: 'ELECTRONICS',
      tags: ['smartphone', 'apple'],
      stockQuantity: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'DELIVERED',
    quantity: 1,
    price: 1299,
    currency: 'USD',
    deliveryAddress: '123 Main St, New York, NY 10001',
    trackingNumber: 'TRACK-2025-001',
    notes: 'Please handle with care',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-2025-002',
    buyerId: 'buyer-2',
    buyer: {
      id: 'buyer-2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'BUYER',
      country: 'Canada',
      city: 'Toronto',
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-2',
    seller: {
      id: 'seller-2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'SELLER',
      country: 'Spain',
      city: 'Barcelona',
      rating: 4.9,
      reviewCount: 89,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '2',
    product: {
      id: '2',
      sellerId: 'seller-2',
      title: 'Premium Leather Handbag',
      description: 'Handcrafted leather handbag from Barcelona.',
      photos: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
      price: 299,
      currency: 'EUR',
      category: 'CLOTHING',
      tags: ['handbag', 'leather'],
      stockQuantity: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'SHIPPED',
    quantity: 1,
    price: 299,
    currency: 'EUR',
    deliveryAddress: '456 King St, Toronto, ON M5H 2R2',
    trackingNumber: 'TRACK-2025-002',
    notes: '',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-3',
    orderNumber: 'ORD-2025-003',
    buyerId: 'buyer-1',
    buyer: {
      id: 'buyer-1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'BUYER',
      country: 'United States',
      city: 'New York',
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-3',
    seller: {
      id: 'seller-3',
      name: 'Yuki Tanaka',
      email: 'yuki@example.com',
      role: 'SELLER',
      country: 'Japan',
      city: 'Tokyo',
      rating: 5.0,
      reviewCount: 234,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '3',
    product: {
      id: '3',
      sellerId: 'seller-3',
      title: 'Traditional Japanese Tea Set',
      description: 'Authentic Japanese tea set with teapot and 4 cups.',
      photos: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'],
      price: 89,
      currency: 'USD',
      category: 'HOME',
      tags: ['tea', 'japanese'],
      stockQuantity: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'PENDING',
    quantity: 2,
    price: 178,
    currency: 'USD',
    deliveryAddress: '123 Main St, New York, NY 10001',
    notes: 'Gift for my mother',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-4',
    orderNumber: 'ORD-2025-004',
    buyerId: 'buyer-3',
    buyer: {
      id: 'buyer-3',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: 'BUYER',
      country: 'United Kingdom',
      city: 'London',
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-1',
    seller: {
      id: 'seller-1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'SELLER',
      country: 'United States',
      city: 'New York',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '4',
    product: {
      id: '4',
      sellerId: 'seller-1',
      title: 'Sony WH-1000XM5 Headphones',
      description: 'Premium noise-cancelling wireless headphones.',
      photos: ['https://images.unsplash.com/photo-1545127398-14699f92334b?w=400'],
      price: 399,
      currency: 'USD',
      category: 'ELECTRONICS',
      tags: ['headphones', 'sony'],
      stockQuantity: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'COMPLETED',
    quantity: 1,
    price: 399,
    currency: 'USD',
    deliveryAddress: '789 Oxford St, London, W1D 2HU',
    trackingNumber: 'TRACK-2025-004',
    notes: '',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-5',
    orderNumber: 'ORD-2025-005',
    buyerId: 'buyer-4',
    buyer: {
      id: 'buyer-4',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      role: 'BUYER',
      country: 'Mexico',
      city: 'Mexico City',
      emailVerified: true,
      phoneVerified: false,
      idVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-2',
    seller: {
      id: 'seller-2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'SELLER',
      country: 'Spain',
      city: 'Barcelona',
      rating: 4.9,
      reviewCount: 89,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '2',
    product: {
      id: '2',
      sellerId: 'seller-2',
      title: 'Premium Leather Handbag',
      description: 'Handcrafted leather handbag from Barcelona.',
      photos: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
      price: 299,
      currency: 'EUR',
      category: 'CLOTHING',
      tags: ['handbag', 'leather'],
      stockQuantity: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'CANCELLED',
    quantity: 1,
    price: 299,
    currency: 'EUR',
    deliveryAddress: 'Reforma 505, Mexico City, CDMX 06500',
    notes: 'Order cancelled by buyer',
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-6',
    orderNumber: 'ORD-2025-006',
    buyerId: 'buyer-2',
    buyer: {
      id: 'buyer-2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'BUYER',
      country: 'Canada',
      city: 'Toronto',
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-3',
    seller: {
      id: 'seller-3',
      name: 'Yuki Tanaka',
      email: 'yuki@example.com',
      role: 'SELLER',
      country: 'Japan',
      city: 'Tokyo',
      rating: 5.0,
      reviewCount: 234,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '3',
    product: {
      id: '3',
      sellerId: 'seller-3',
      title: 'Traditional Japanese Tea Set',
      description: 'Authentic Japanese tea set with teapot and 4 cups.',
      photos: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'],
      price: 89,
      currency: 'USD',
      category: 'HOME',
      tags: ['tea', 'japanese'],
      stockQuantity: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'PAID',
    quantity: 1,
    price: 89,
    currency: 'USD',
    deliveryAddress: '456 King St, Toronto, ON M5H 2R2',
    notes: '',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-7',
    orderNumber: 'ORD-2025-007',
    buyerId: 'buyer-1',
    buyer: {
      id: 'buyer-1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'BUYER',
      country: 'United States',
      city: 'New York',
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-1',
    seller: {
      id: 'seller-1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'SELLER',
      country: 'United States',
      city: 'New York',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '1',
    product: {
      id: '1',
      sellerId: 'seller-1',
      title: 'Apple iPhone 15 Pro Max',
      description: 'Brand new Apple iPhone 15 Pro Max with 256GB storage.',
      photos: ['https://images.unsplash.com/photo-1696446702183-cbd80e00b9c8?w=400'],
      price: 1299,
      currency: 'USD',
      category: 'ELECTRONICS',
      tags: ['smartphone', 'apple'],
      stockQuantity: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'ACCEPTED',
    quantity: 1,
    price: 1299,
    currency: 'USD',
    deliveryAddress: '123 Main St, New York, NY 10001',
    notes: '',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'order-8',
    orderNumber: 'ORD-2025-008',
    buyerId: 'buyer-3',
    buyer: {
      id: 'buyer-3',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: 'BUYER',
      country: 'United Kingdom',
      city: 'London',
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sellerId: 'seller-2',
    seller: {
      id: 'seller-2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'SELLER',
      country: 'Spain',
      city: 'Barcelona',
      rating: 4.9,
      reviewCount: 89,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    productId: '2',
    product: {
      id: '2',
      sellerId: 'seller-2',
      title: 'Premium Leather Handbag',
      description: 'Handcrafted leather handbag from Barcelona.',
      photos: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
      price: 299,
      currency: 'EUR',
      category: 'CLOTHING',
      tags: ['handbag', 'leather'],
      stockQuantity: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'PENDING',
    quantity: 1,
    price: 299,
    currency: 'EUR',
    deliveryAddress: '789 Oxford St, London, W1D 2HU',
    notes: 'Expedited shipping requested',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
];

type OrderStatusTab = 'all' | 'pending' | 'completed' | 'cancelled';

interface OrdersPageProps {
  searchParams: {
    tab?: OrderStatusTab;
  };
}

export default function OrdersPage({ searchParams }: OrdersPageProps) {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatusTab>(
    (searchParams.tab as OrderStatusTab) || 'all'
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const orders = getMockOrders();

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
