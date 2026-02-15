/**
 * Dashboard Custom Orders Page
 * Displays custom order requests for buyers and sellers
 *
 * Route: /dashboard/custom-orders
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Plus, Package } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CustomOrderCard } from '@/components/features/CustomOrderCard';
import { CustomOrderDetails } from '@/components/features/CustomOrderDetails';
import { Pagination } from '@/components/common/Pagination';
import { CustomOrder, CustomOrderStatus, User } from '@/types';
import { useTranslations } from '@/contexts/TranslationsContext';

// Mock current user - in real app this would come from auth context
const CURRENT_USER_ID = 'buyer-1';
const CURRENT_USER_ROLE: 'BUYER' | 'SELLER' | 'BOTH' = 'BUYER'; // Can be 'BUYER', 'SELLER', or 'BOTH'

// Mock data for development
const getMockCustomOrders = (): CustomOrder[] => [
  {
    id: 'custom-order-1',
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
      city: 'Los Angeles',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    title: 'Custom Gaming PC Build',
    description: 'Looking for a high-end gaming PC with RTX 4090, i9-13900K, 32GB RAM, and RGB lighting. Need it for streaming and 4K gaming.',
    photos: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    ],
    maxPrice: 3500,
    currency: 'USD',
    deliveryDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    deliveryAddress: '123 Main St, New York, NY 10001',
    deliveryType: 'date' as const,
    status: 'ACCEPTED',
    messages: [],
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'custom-order-2',
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
    sellerId: '',
    title: 'Handmade Leather Wallet',
    description: 'Need a custom leather wallet with initials engraved. Premium quality leather preferred. Looking for minimalist design with RFID protection.',
    photos: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'],
    maxPrice: 150,
    currency: 'USD',
    deliveryDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    deliveryAddress: '123 Main St, New York, NY 10001',
    deliveryType: 'asap' as const,
    status: 'PENDING_SELLER_RESPONSE',
    messages: [],
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'custom-order-3',
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
    sellerId: 'seller-1',
    seller: {
      id: 'seller-1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'SELLER',
      country: 'United States',
      city: 'Los Angeles',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    title: 'Professional Photography Setup',
    description: 'Need a complete photography setup for portrait photography. Including camera body, lenses, lighting equipment, and accessories.',
    photos: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'],
    maxPrice: 5000,
    currency: 'USD',
    deliveryDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    deliveryAddress: '456 King St, Toronto, ON M5H 2R2',
    deliveryType: 'date' as const,
    status: 'PENDING_SELLER_RESPONSE',
    messages: [],
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'custom-order-4',
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
    title: 'Vintage Vinyl Record Collection',
    description: 'Looking for a curated collection of 70s and 80s rock vinyl records. Condition should be very good or excellent.',
    photos: [],
    maxPrice: 800,
    currency: 'USD',
    deliveryAddress: '123 Main St, New York, NY 10001',
    deliveryType: 'date' as const,
    status: 'CONVERTED_TO_ORDER',
    messages: [],
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'custom-order-5',
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
      city: 'Los Angeles',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    title: 'Smart Home Automation Package',
    description: 'Complete smart home setup for a 3-bedroom house. Need smart lights, thermostats, security cameras, and hub.',
    photos: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=400'],
    maxPrice: 2000,
    currency: 'USD',
    deliveryDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    deliveryAddress: '789 Oxford St, London, W1D 2HU',
    deliveryType: 'asap' as const,
    status: 'PENDING_SELLER_RESPONSE',
    messages: [],
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'custom-order-6',
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
    sellerId: '',
    title: 'Custom Mountain Bike',
    description: 'Looking for a custom-built mountain bike for trail riding. Medium frame, carbon fiber preferred, full suspension.',
    photos: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400'],
    maxPrice: 4000,
    currency: 'USD',
    deliveryDeadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    deliveryAddress: '123 Main St, New York, NY 10001',
    deliveryType: 'date' as const,
    status: 'DECLINED',
    messages: [],
    expiresAt: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
];

type CustomOrderTab = 'outgoing' | 'incoming';
type StatusFilter = 'all' | CustomOrderStatus;

export default function CustomOrdersPage() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<CustomOrderTab>(
    CURRENT_USER_ROLE === 'SELLER' ? 'incoming' : 'outgoing'
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const allCustomOrders = getMockCustomOrders();

  // Filter orders based on tab (incoming/outgoing)
  const tabFilteredOrders = useMemo(() => {
    if (activeTab === 'outgoing') {
      // Buyer view: orders created by current user
      return allCustomOrders.filter((order) => order.buyerId === CURRENT_USER_ID);
    } else {
      // Seller view: orders where current user is the seller OR available to all sellers (no seller assigned yet)
      return allCustomOrders.filter(
        (order) =>
          order.sellerId === CURRENT_USER_ID ||
          (!order.sellerId && order.buyerId !== CURRENT_USER_ID)
      );
    }
  }, [allCustomOrders, activeTab]);

  // Apply status and search filters
  const filteredOrders = useMemo(() => {
    let result = tabFilteredOrders;

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.title.toLowerCase().includes(query) ||
          order.description.toLowerCase().includes(query) ||
          order.buyer?.name.toLowerCase().includes(query) ||
          order.seller?.name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tabFilteredOrders, statusFilter, searchQuery]);

  // Calculate pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, statusFilter, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleAcceptOrder = (customOrderId: string) => {
    console.log('Accepting order:', customOrderId);
    // In real app, this would call an API
    setSelectedOrder(null);
  };

  const handleDeclineOrder = (customOrderId: string) => {
    console.log('Declining order:', customOrderId);
    // In real app, this would call an API
    setSelectedOrder(null);
  };

  // Count orders by status for the current tab
  const statusCounts = useMemo(() => {
    return {
      all: tabFilteredOrders.length,
      PENDING_SELLER_RESPONSE: tabFilteredOrders.filter((o) => o.status === 'PENDING_SELLER_RESPONSE').length,
      ACCEPTED: tabFilteredOrders.filter((o) => o.status === 'ACCEPTED').length,
      DECLINED: tabFilteredOrders.filter((o) => o.status === 'DECLINED').length,
      CLARIFICATION_NEEDED: tabFilteredOrders.filter((o) => o.status === 'CLARIFICATION_NEEDED').length,
      CONVERTED_TO_ORDER: tabFilteredOrders.filter((o) => o.status === 'CONVERTED_TO_ORDER').length,
      CANCELLED: tabFilteredOrders.filter((o) => o.status === 'CANCELLED').length,
    };
  }, [tabFilteredOrders]);

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('pages.dashboard.customOrders.dashboard.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('pages.dashboard.customOrders.dashboard.subtitle')}
          </p>
        </div>
        <Button className="gap-2 w-fit">
          <Plus className="w-4 h-4" />
          Create Custom Order
        </Button>
      </div>

      {/* Main Tabs: Incoming/Outgoing */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as CustomOrderTab)}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
          {CURRENT_USER_ROLE === 'BUYER' && (
            <TabsTrigger value="outgoing" className="gap-2">
              <Package className="w-4 h-4" />
              My Requests
              <span className="ml-1 text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                {allCustomOrders.filter((o) => o.buyerId === CURRENT_USER_ID).length}
              </span>
            </TabsTrigger>
          )}
          {CURRENT_USER_ROLE === 'SELLER' && (
            <TabsTrigger value="incoming" className="gap-2">
              <Package className="w-4 h-4" />
              Incoming Requests
              <span className="ml-1 text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                {
                  allCustomOrders.filter(
                    (o) =>
                      o.sellerId === CURRENT_USER_ID ||
                      (!o.sellerId && o.buyerId !== CURRENT_USER_ID)
                  ).length
                }
              </span>
            </TabsTrigger>
          )}
          {CURRENT_USER_ROLE === 'BOTH' && (
            <>
              <TabsTrigger value="outgoing" className="gap-2">
                <Package className="w-4 h-4" />
                My Requests
                <span className="ml-1 text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                  {allCustomOrders.filter((o) => o.buyerId === CURRENT_USER_ID).length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="incoming" className="gap-2">
                <Package className="w-4 h-4" />
                Incoming
                <span className="ml-1 text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                  {
                    allCustomOrders.filter(
                      (o) =>
                        o.sellerId === CURRENT_USER_ID ||
                        (!o.sellerId && o.buyerId !== CURRENT_USER_ID)
                    ).length
                  }
                </span>
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Search and Filter */}
          <div className="mb-6 flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search custom orders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="default" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Status Filter Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All ({statusCounts.all})
            </Button>
            <Button
              variant={statusFilter === 'PENDING_SELLER_RESPONSE' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('PENDING_SELLER_RESPONSE')}
            >
              Pending ({statusCounts.PENDING_SELLER_RESPONSE})
            </Button>
            <Button
              variant={statusFilter === 'ACCEPTED' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('ACCEPTED')}
            >
              Accepted ({statusCounts.ACCEPTED})
            </Button>
            <Button
              variant={statusFilter === 'DECLINED' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('DECLINED')}
            >
              Declined ({statusCounts.DECLINED})
            </Button>
            <Button
              variant={statusFilter === 'CLARIFICATION_NEEDED' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('CLARIFICATION_NEEDED')}
            >
              Clarification ({statusCounts.CLARIFICATION_NEEDED})
            </Button>
            <Button
              variant={statusFilter === 'CONVERTED_TO_ORDER' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('CONVERTED_TO_ORDER')}
            >
              Converted ({statusCounts.CONVERTED_TO_ORDER})
            </Button>
            <Button
              variant={statusFilter === 'CANCELLED' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('CANCELLED')}
            >
              Cancelled ({statusCounts.CANCELLED})
            </Button>
          </div>

          {/* Results Info */}
          {filteredOrders.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}{' '}
                custom orders
              </p>
            </div>
          )}

          {/* Orders List */}
          <div className="space-y-4">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <CustomOrderCard
                  key={order.id}
                  order={order}
                  userRole={CURRENT_USER_ROLE}
                  onClick={() => setSelectedOrder(order)}
                  onAccept={handleAcceptOrder}
                  onDecline={handleDeclineOrder}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {searchQuery
                    ? 'No custom orders found'
                    : activeTab === 'outgoing'
                      ? t('pages.dashboard.customOrders.dashboard.empty.noOrders')
                      : t('pages.dashboard.customOrders.dashboard.empty.noRequests')}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : activeTab === 'outgoing'
                      ? 'Create a custom order to get started'
                      : 'Check back later for new requests'}
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                )}
                {!searchQuery && activeTab === 'outgoing' && (
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Custom Order
                  </Button>
                )}
              </div>
            )}
          </div>

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
        </TabsContent>
      </Tabs>

      {/* Custom Order Details View */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CustomOrderDetails
              order={selectedOrder}
              userRole={CURRENT_USER_ROLE}
              onAccept={handleAcceptOrder}
              onDecline={handleDeclineOrder}
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setSelectedOrder(null)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
