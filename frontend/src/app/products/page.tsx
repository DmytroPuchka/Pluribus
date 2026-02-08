/**
 * Products Page
 * Browse and search products from sellers worldwide
 *
 * Route: /products
 */

import { Metadata } from 'next';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

export const metadata: Metadata = {
  title: 'Products | Pluribus',
  description: 'Browse products from sellers worldwide. Find what you need and get it delivered internationally.',
};

// Mock data for development
// TODO: Replace with actual API call
const getMockProducts = (): Product[] => {
  return [
    {
      id: '1',
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
      title: 'Apple iPhone 15 Pro Max',
      description: 'Brand new Apple iPhone 15 Pro Max with 256GB storage. Factory unlocked, works worldwide.',
      photos: ['https://images.unsplash.com/photo-1696446702183-cbd80e00b9c8?w=400'],
      price: 1299,
      currency: 'USD',
      category: 'ELECTRONICS',
      tags: ['smartphone', 'apple', 'iphone'],
      stockQuantity: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
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
      title: 'Premium Leather Handbag',
      description: 'Handcrafted leather handbag from Barcelona. Genuine Italian leather with elegant design.',
      photos: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
      price: 299,
      currency: 'EUR',
      category: 'CLOTHING',
      tags: ['handbag', 'leather', 'fashion'],
      stockQuantity: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
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
      title: 'Traditional Japanese Tea Set',
      description: 'Authentic Japanese tea set with teapot and 4 cups. Perfect for traditional tea ceremonies.',
      photos: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'],
      price: 89,
      currency: 'USD',
      category: 'HOME',
      tags: ['tea', 'japanese', 'traditional'],
      stockQuantity: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
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
      title: 'Sony WH-1000XM5 Headphones',
      description: 'Premium noise-cancelling wireless headphones with industry-leading audio quality.',
      photos: ['https://images.unsplash.com/photo-1545127398-14699f92334b?w=400'],
      price: 399,
      currency: 'USD',
      category: 'ELECTRONICS',
      tags: ['headphones', 'sony', 'wireless'],
      stockQuantity: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

interface ProductsPageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const products = getMockProducts();

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Products</h1>
        <p className="text-muted-foreground">
          Discover products from sellers worldwide
        </p>
      </div>

      {/* TODO: Add filters and search */}

      {/* Products Grid */}
      <ProductGrid products={products} />

      {/* TODO: Add pagination */}
    </div>
  );
}
