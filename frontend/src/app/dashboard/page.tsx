import React from 'react';
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
} from 'lucide-react';
import { Order, Product, User } from '@/types';

// Mock data
const MOCK_USER: User = {
  id: 'user-123',
  email: 'john.doe@example.com',
  name: 'John Doe',
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

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sellerId: 'user-123',
    title: 'Vintage Camera',
    description: 'Classic film camera in excellent condition',
    photos: ['https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400'],
    price: 149.99,
    currency: 'USD',
    category: 'ELECTRONICS',
    tags: ['vintage', 'camera', 'collectible'],
    stockQuantity: 1,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: 'prod-2',
    sellerId: 'user-123',
    title: 'Handmade Leather Wallet',
    description: 'Premium leather wallet with RFID protection',
    photos: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'],
    price: 45.00,
    currency: 'USD',
    category: 'HOME',
    tags: ['leather', 'handmade', 'wallet'],
    stockQuantity: 5,
    isActive: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-08'),
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
                {Math.abs(change)}% from last month
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
      {status}
    </Badge>
  );
}

export default function DashboardPage() {
  const totalRevenue = MOCK_PRODUCTS.reduce(
    (sum, product) => sum + product.price * (product.stockQuantity || 1),
    0
  );

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {MOCK_USER.name}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your Pluribus dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={MOCK_ORDERS.length}
          change={12}
          trend="up"
        />
        <StatCard
          icon={Package}
          label="Active Products"
          value={MOCK_PRODUCTS.length}
          change={8}
          trend="up"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          change={24}
          trend="up"
        />
        <StatCard
          icon={Eye}
          label="Profile Views"
          value="1,234"
          change={5}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    Your latest {MOCK_ORDERS.length} orders
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/orders">
                    View All
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
                        {order.quantity} item(s) · ${order.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <OrderStatusBadge status={order.status} />
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/orders/${order.id}`}>
                          View
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
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/dashboard/orders/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Place New Order
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/profile">
                  View Profile
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/settings">
                  Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Active Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Products</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/products">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_PRODUCTS.slice(0, 2).map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                      <img
                        src={product.photos[0]}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${product.price.toFixed(2)} · Stock: {product.stockQuantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
