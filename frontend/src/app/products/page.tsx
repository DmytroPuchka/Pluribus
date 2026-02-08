'use client';

/**
 * Products Page
 * Browse and search products from sellers worldwide
 *
 * Route: /products
 */

import { useState, useMemo, useEffect } from 'react';
import { ProductGrid } from '@/components/features/ProductGrid';
import { ProductFilters } from '@/components/features/ProductFilters';
import { Pagination } from '@/components/common/Pagination';
import { Product, ProductFiltersState } from '@/types';

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
    {
      id: '5',
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
      title: 'Winter Wool Coat',
      description: 'Premium winter coat made from 100% Italian wool. Elegant and warm for cold weather.',
      photos: ['https://images.unsplash.com/photo-1539533057440-7814a5dc7dea?w=400'],
      price: 189,
      currency: 'EUR',
      category: 'CLOTHING',
      tags: ['coat', 'wool', 'winter'],
      stockQuantity: 7,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
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
      title: 'Japanese Ceramic Vase',
      description: 'Hand-painted ceramic vase from Kyoto. Unique decorative piece with traditional patterns.',
      photos: ['https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400'],
      price: 145,
      currency: 'USD',
      category: 'HOME',
      tags: ['vase', 'ceramic', 'japanese'],
      stockQuantity: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

export default function ProductsPage() {
  const allProducts = useMemo(() => getMockProducts(), []);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [activeFilters, setActiveFilters] = useState<ProductFiltersState>({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const handleFiltersChange = (filtered: Product[], filters: ProductFiltersState) => {
    setFilteredProducts(filtered);
    setActiveFilters(filters);
  };

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
        <h1 className="text-3xl font-bold mb-2">Browse Products</h1>
        <p className="text-muted-foreground">
          Discover products from sellers worldwide
        </p>
      </div>

      {/* Layout: Filters on left, Products on right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters
            products={allProducts}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} products
            </p>
          </div>

          {/* Products Grid */}
          <ProductGrid products={currentProducts} />

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
      </div>
    </div>
  );
}
