'use client';

/**
 * Products Page
 * Browse and search products from sellers worldwide
 *
 * Route: /products
 */

import { useState, useEffect } from 'react';
import { ProductGrid } from '@/components/features/ProductGrid';
import { ProductFilters } from '@/components/features/ProductFilters';
import { Pagination } from '@/components/common/Pagination';
import { Product, ProductFiltersState } from '@/types';
import { useTranslations } from '@/contexts/TranslationsContext';
import { productsService } from '@/lib/api';
import type { ProductFilters as APIProductFilters } from '@/lib/api';
import { toast } from 'sonner';

export default function ProductsPage() {
  const { t } = useTranslations();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<ProductFiltersState>({});
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        // Build API filters
        const apiFilters: APIProductFilters = {
          page: currentPage,
          limit: itemsPerPage,
          sortBy: activeFilters.sortBy === 'newest' ? 'newest' : undefined,
        };

        if (activeFilters.category) {
          apiFilters.category = activeFilters.category;
        }
        if (activeFilters.minPrice) {
          apiFilters.minPrice = activeFilters.minPrice;
        }
        if (activeFilters.maxPrice) {
          apiFilters.maxPrice = activeFilters.maxPrice;
        }

        const response = await productsService.getProducts(apiFilters);

        // Response structure: { data: [...], pagination: {...} }
        // Convert string dates to Date objects
        const productsWithDates = response.data.map((product) => ({
          ...product,
          price: parseFloat(product.price as any),
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt),
          seller: product.seller
            ? {
                ...product.seller,
                createdAt: new Date(product.seller.createdAt),
                updatedAt: new Date(product.seller.updatedAt),
              }
            : undefined,
        }));

        setAllProducts(productsWithDates);
        setFilteredProducts(productsWithDates);
        setTotalItems(response.pagination.total);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products', {
          description: error?.response?.data?.error || 'Please try again later',
        });
        setAllProducts([]);
        setFilteredProducts([]);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, activeFilters]);

  // Calculate pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  const handleFiltersChange = (filtered: Product[], filters: ProductFiltersState) => {
    setActiveFilters(filters);
    // Note: we don't use filtered products here because API handles filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (isLoading && allProducts.length === 0) {
    return (
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('pages.products.title')}</h1>
          <p className="text-muted-foreground">{t('pages.products.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('pages.products.title')}</h1>
        <p className="text-muted-foreground">{t('pages.products.subtitle')}</p>
      </div>

      {/* Layout: Filters on left, Products on right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters products={allProducts} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3">
          {/* Results Info */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t('pages.products.showing')} {totalItems > 0 ? startIndex + 1 : 0}-{endIndex}{' '}
              {t('pages.products.of')} {totalItems} {t('pages.products.products')}
            </p>
            {isLoading && (
              <span className="text-sm text-muted-foreground">Loading...</span>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
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
      </div>
    </div>
  );
}
