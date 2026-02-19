/**
 * CustomOrderCard Usage Examples
 *
 * This file demonstrates how to use the CustomOrderCard component
 * in different scenarios.
 */

import { CustomOrderCard } from './CustomOrderCard';
import { CustomOrder } from '@/types';

// Example 1: Seller View with Actions
const ExampleSellerView = () => {
  const customOrder: CustomOrder = {
    id: '1',
    buyerId: 'buyer-1',
    buyer: {
      id: 'buyer-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatars/john.jpg',
      role: 'BUYER',
      country: 'USA',
      city: 'New York',
      rating: 4.8,
      reviewCount: 15,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-02-01'),
    },
    sellerId: 'seller-1',
    title: 'Custom Leather Wallet with Engraving',
    description: 'I need a handmade leather wallet with my initials engraved on it. Dark brown color preferred.',
    photos: [
      '/images/wallet-reference-1.jpg',
      '/images/wallet-reference-2.jpg',
    ],
    maxPrice: 75.00,
    currency: 'USD',
    deliveryDeadline: new Date('2024-03-15'),
    deliveryType: 'date' as const,
    deliveryAddress: '123 Main St, New York, NY 10001',
    status: 'PENDING_SELLER_RESPONSE',
    messages: [],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    expiresAt: new Date('2024-03-10'),
  };

  const handleAccept = (orderId: string) => {
    console.log('Accepting order:', orderId);
    // API call to accept the order
  };

  const handleDecline = (orderId: string) => {
    console.log('Declining order:', orderId);
    // API call to decline the order
  };

  const handleClarify = (orderId: string) => {
    console.log('Clarifying order:', orderId);
    // Open messaging dialog
  };

  return (
    <CustomOrderCard
      order={customOrder}
      userRole="SELLER"
      onAccept={handleAccept}
      onDecline={handleDecline}
      onClarify={handleClarify}
    />
  );
};

// Example 2: Buyer View with Click Handler
const ExampleBuyerView = () => {
  const customOrder: CustomOrder = {
    id: '2',
    buyerId: 'buyer-2',
    sellerId: 'seller-2',
    seller: {
      id: 'seller-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/avatars/jane.jpg',
      role: 'SELLER',
      country: 'UK',
      city: 'London',
      rating: 4.9,
      reviewCount: 42,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2024-02-01'),
    },
    title: 'Custom Wedding Cake Topper',
    description: 'Need a personalized wedding cake topper with our names and wedding date.',
    photos: ['/images/topper-example.jpg'],
    maxPrice: 120.00,
    currency: 'USD',
    deliveryType: 'asap' as const,
    deliveryAddress: '456 Baker Street, London, UK',
    status: 'ACCEPTED',
    messages: [],
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-13'),
    expiresAt: new Date('2024-03-12'),
  };

  const handleClick = () => {
    // Navigate to order details page
    console.log('Navigating to order details');
  };

  return (
    <CustomOrderCard
      order={customOrder}
      userRole="BUYER"
      onClick={handleClick}
    />
  );
};

// Example 3: List of Orders
const ExampleOrdersList = () => {
  const orders: CustomOrder[] = [
    // ... array of custom orders
  ];

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <CustomOrderCard
          key={order.id}
          order={order}
          userRole="SELLER"
          onClick={() => console.log('View details:', order.id)}
        />
      ))}
    </div>
  );
};

// Example 4: Grid Layout
const ExampleOrdersGrid = () => {
  const orders: CustomOrder[] = [
    // ... array of custom orders
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {orders.map((order) => (
        <CustomOrderCard
          key={order.id}
          order={order}
          userRole="BOTH"
          onClick={() => console.log('View details:', order.id)}
        />
      ))}
    </div>
  );
};

export {
  ExampleSellerView,
  ExampleBuyerView,
  ExampleOrdersList,
  ExampleOrdersGrid,
};
