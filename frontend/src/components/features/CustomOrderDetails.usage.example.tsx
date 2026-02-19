/**
 * CustomOrderDetails Usage Examples
 *
 * This file demonstrates how to use the CustomOrderDetails component
 * in different scenarios.
 */

import { CustomOrderDetails } from './CustomOrderDetails';
import { CustomOrder } from '@/types';

// Example 1: Full Seller View with Actions
const ExampleSellerDetailView = () => {
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
    description: `I need a handmade leather wallet with my initials engraved on it.

Requirements:
- Dark brown color
- Premium quality leather
- Engraving: "J.D."
- Multiple card slots
- Bill compartment

Please let me know if you can deliver this by March 15th.`,
    photos: [
      '/images/wallet-reference-1.jpg',
      '/images/wallet-reference-2.jpg',
      '/images/wallet-reference-3.jpg',
    ],
    maxPrice: 75.00,
    currency: 'USD',
    deliveryDeadline: new Date('2024-03-15'),
    deliveryType: 'date',
    deliveryAddress: '123 Main St, New York, NY 10001',
    status: 'PENDING_SELLER_RESPONSE',
    messages: [],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    expiresAt: new Date('2024-03-10'),
  };

  const messages = [
    {
      id: 'msg-1',
      senderId: 'buyer-1',
      senderName: 'John Doe',
      message: 'Hi! I have attached some reference images. Can you make something similar?',
      timestamp: new Date('2024-02-10T10:00:00'),
    },
    {
      id: 'msg-2',
      senderId: 'seller-1',
      senderName: 'Current Seller',
      message: 'Yes, I can definitely make this. I have some questions about the engraving placement.',
      timestamp: new Date('2024-02-10T11:30:00'),
    },
  ];

  const statusHistory = [
    {
      id: 'status-1',
      status: 'PENDING_SELLER_RESPONSE' as const,
      timestamp: new Date('2024-02-10T09:00:00'),
      note: 'Order created',
    },
  ];

  const handleAccept = (orderId: string) => {
    console.log('Accepting order:', orderId);
    // API call to accept the order
  };

  const handleDecline = (orderId: string, reason?: string) => {
    console.log('Declining order:', orderId, 'Reason:', reason);
    // API call to decline the order
  };

  const handleSendMessage = (orderId: string, message: string) => {
    console.log('Sending message for order:', orderId, 'Message:', message);
    // API call to send message
  };

  return (
    <CustomOrderDetails
      order={customOrder}
      userRole="SELLER"
      messages={messages}
      statusHistory={statusHistory}
      onAccept={handleAccept}
      onDecline={handleDecline}
      onSendMessage={handleSendMessage}
    />
  );
};

// Example 2: Buyer View with Active Order
const ExampleBuyerDetailView = () => {
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
    description: `Need a personalized wedding cake topper with our names and wedding date.

Details:
- Names: Sarah & Michael
- Wedding Date: June 15, 2024
- Style: Modern, elegant
- Material: Acrylic preferred
- Height: 6-7 inches`,
    photos: [
      '/images/topper-example-1.jpg',
      '/images/topper-example-2.jpg',
    ],
    maxPrice: 120.00,
    currency: 'USD',
    deliveryType: 'date',
    deliveryDeadline: new Date('2024-06-01'),
    deliveryAddress: '456 Oak Avenue, Chicago, IL 60614',
    status: 'ACCEPTED',
    messages: [],
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-13'),
    expiresAt: new Date('2024-05-15'),
  };

  const messages = [
    {
      id: 'msg-1',
      senderId: 'buyer-2',
      senderName: 'Current Buyer',
      message: 'Hello! Can you create this cake topper for our wedding?',
      timestamp: new Date('2024-02-12T14:00:00'),
    },
    {
      id: 'msg-2',
      senderId: 'seller-2',
      senderName: 'Jane Smith',
      message: 'Absolutely! This is beautiful. I can definitely create this for you.',
      timestamp: new Date('2024-02-12T15:30:00'),
    },
    {
      id: 'msg-3',
      senderId: 'seller-2',
      senderName: 'Jane Smith',
      message: 'I will start working on your design this week. Expected completion in 2 weeks.',
      timestamp: new Date('2024-02-13T09:00:00'),
    },
  ];

  const statusHistory = [
    {
      id: 'status-1',
      status: 'PENDING_SELLER_RESPONSE' as const,
      timestamp: new Date('2024-02-12T14:00:00'),
      note: 'Order created',
    },
    {
      id: 'status-2',
      status: 'ACCEPTED' as const,
      timestamp: new Date('2024-02-13T09:00:00'),
      note: 'Seller accepted the order and will begin work',
    },
  ];

  const handleSendMessage = (orderId: string, message: string) => {
    console.log('Sending message for order:', orderId, 'Message:', message);
    // API call to send message
  };

  const handleCancel = (orderId: string, reason?: string) => {
    console.log('Cancelling order:', orderId, 'Reason:', reason);
    // API call to cancel the order
  };

  return (
    <CustomOrderDetails
      order={customOrder}
      userRole="BUYER"
      messages={messages}
      statusHistory={statusHistory}
      onSendMessage={handleSendMessage}
      onCancel={handleCancel}
    />
  );
};

// Example 3: Completed Order View
const ExampleCompletedOrderView = () => {
  const customOrder: CustomOrder = {
    id: '3',
    buyerId: 'buyer-3',
    buyer: {
      id: 'buyer-3',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'BUYER',
      country: 'Canada',
      city: 'Toronto',
      rating: 4.7,
      reviewCount: 8,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-01'),
    },
    sellerId: 'seller-3',
    seller: {
      id: 'seller-3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'SELLER',
      country: 'Canada',
      city: 'Vancouver',
      rating: 5.0,
      reviewCount: 67,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2022-03-01'),
      updatedAt: new Date('2024-02-01'),
    },
    title: 'Custom Pet Portrait Painting',
    description: 'A beautiful watercolor portrait of my golden retriever Max.',
    photos: ['/images/max-photo.jpg'],
    maxPrice: 150.00,
    currency: 'USD',
    deliveryType: 'date',
    deliveryDeadline: new Date('2024-02-20'),
    deliveryAddress: '789 Maple Drive, Toronto, ON M5H 2N2',
    status: 'CONVERTED_TO_ORDER',
    messages: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-18'),
    expiresAt: new Date('2024-02-15'),
  };

  const messages = [
    {
      id: 'msg-1',
      senderId: 'buyer-3',
      senderName: 'Alice Johnson',
      message: 'Can you paint a portrait of my dog?',
      timestamp: new Date('2024-01-20T10:00:00'),
    },
    {
      id: 'msg-2',
      senderId: 'seller-3',
      senderName: 'Bob Wilson',
      message: 'Of course! Your dog is adorable. I would love to paint him.',
      timestamp: new Date('2024-01-20T11:00:00'),
    },
    {
      id: 'msg-3',
      senderId: 'seller-3',
      senderName: 'Bob Wilson',
      message: 'The portrait is complete! I will ship it today.',
      timestamp: new Date('2024-02-18T14:00:00'),
    },
    {
      id: 'msg-4',
      senderId: 'buyer-3',
      senderName: 'Alice Johnson',
      message: 'It is absolutely beautiful! Thank you so much!',
      timestamp: new Date('2024-02-18T18:00:00'),
    },
  ];

  const statusHistory = [
    {
      id: 'status-1',
      status: 'PENDING_SELLER_RESPONSE' as const,
      timestamp: new Date('2024-01-20T10:00:00'),
      note: 'Order created',
    },
    {
      id: 'status-2',
      status: 'ACCEPTED' as const,
      timestamp: new Date('2024-01-20T11:00:00'),
      note: 'Seller accepted the commission',
    },
    {
      id: 'status-3',
      status: 'CONVERTED_TO_ORDER' as const,
      timestamp: new Date('2024-02-18T14:00:00'),
      note: 'Portrait completed and shipped',
    },
  ];

  const handleSendMessage = (orderId: string, message: string) => {
    console.log('Sending message for order:', orderId, 'Message:', message);
  };

  return (
    <CustomOrderDetails
      order={customOrder}
      userRole="BUYER"
      messages={messages}
      statusHistory={statusHistory}
      onSendMessage={handleSendMessage}
    />
  );
};

export {
  ExampleSellerDetailView,
  ExampleBuyerDetailView,
  ExampleCompletedOrderView,
};
