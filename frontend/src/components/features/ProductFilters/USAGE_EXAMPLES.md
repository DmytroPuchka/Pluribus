# ProductFilters Component - Usage Examples

## Basic Usage

The simplest way to use ProductFilters:

```tsx
'use client';

import { useState } from 'react';
import { ProductFilters } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

export default function BrowseProducts() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <ProductFilters
        products={allProducts}
        onFiltersChange={(filtered) => setFilteredProducts(filtered)}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
```

## Advanced: With Filter State Tracking

Track and display active filters:

```tsx
'use client';

import { useState } from 'react';
import { ProductFilters, ProductFiltersState } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<ProductFiltersState>({});

  const handleFiltersChange = (filtered: Product[], filters: ProductFiltersState) => {
    setFilteredProducts(filtered);
    setActiveFilters(filters);
  };

  const handleReset = () => {
    // Additional reset logic if needed
    console.log('Filters reset');
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Browse Products</h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} products found
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ProductFilters
          products={allProducts}
          onFiltersChange={handleFiltersChange}
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
```

## Sidebar Layout with Results Counter

Complete implementation with styled layout:

```tsx
'use client';

import { useState } from 'react';
import { ProductFilters } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Products</h1>
        <p className="text-muted-foreground text-lg">
          Discover amazing products from sellers worldwide
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4">
            <ProductFilters
              products={allProducts}
              onFiltersChange={(filtered) => setFilteredProducts(filtered)}
              className="mb-6"
            />
          </div>
        </aside>

        {/* Main Area */}
        <main className="lg:col-span-3">
          {/* Results Info Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Showing results</p>
                  <p className="text-2xl font-bold">
                    {filteredProducts.length} of {allProducts.length} products
                  </p>
                </div>
                {filteredProducts.length === 0 && (
                  <p className="text-muted-foreground italic">
                    No products match your filters
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
}
```

## With Search Integration

Combine filters with search functionality:

```tsx
'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { ProductFilters } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  // Combine search and filter results
  const searchedAndFiltered = useMemo(() => {
    if (!searchTerm) return filteredProducts;

    const term = searchTerm.toLowerCase();
    return filteredProducts.filter(
      product =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [filteredProducts, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-2xl"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Found {searchedAndFiltered.length} results
        </p>
      </div>

      {/* Filters and Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ProductFilters
          products={allProducts}
          onFiltersChange={(filtered) => setFilteredProducts(filtered)}
        />
        <ProductGrid products={searchedAndFiltered} />
      </div>
    </div>
  );
}
```

## Mobile-Optimized Layout

Responsive design with mobile drawer:

```tsx
'use client';

import { useState } from 'react';
import { ProductFilters } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Button } from '@/components/ui/button';
import { Sliders } from 'lucide-react';
import { Product } from '@/types';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="w-full"
        >
          <Sliders className="w-4 h-4 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters - Hidden on mobile by default */}
        {(showFilters || true) && (
          <div className="lg:col-span-1">
            <ProductFilters
              products={allProducts}
              onFiltersChange={(filtered) => setFilteredProducts(filtered)}
            />
          </div>
        )}

        {/* Products */}
        <div className="lg:col-span-3">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
```

## Custom: Pre-filtered Category

Start with a specific category pre-filtered:

```tsx
'use client';

import { useState } from 'react';
import { ProductFilters } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

interface CategoryPageProps {
  category: string;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const allProducts = getAllProducts();
  const categoryProducts = allProducts.filter(p => p.category === category);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(categoryProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category} Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ProductFilters
          products={categoryProducts}
          onFiltersChange={(filtered) => setFilteredProducts(filtered)}
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
```

## API Integration Example

Using real data from an API:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { ProductFilters } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <ProductFilters
        products={allProducts}
        onFiltersChange={(filtered) => setFilteredProducts(filtered)}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
```

## With Seller Store Page

Filter products within a specific seller's store:

```tsx
'use client';

import { useState, useMemo } from 'react';
import { ProductFilters } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

interface SellerStorePageProps {
  sellerId: string;
}

export default function SellerStorePage({ sellerId }: SellerStorePageProps) {
  const allProducts = getAllProducts().filter(p => p.sellerId === sellerId);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Seller Store</h1>
        <p className="text-muted-foreground">
          Browse products from this seller
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ProductFilters
          products={allProducts}
          onFiltersChange={(filtered) => setFilteredProducts(filtered)}
        />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
```

## Advanced: With Analytics Tracking

Track filter usage for analytics:

```tsx
'use client';

import { useState } from 'react';
import { ProductFilters, ProductFiltersState } from '@/components/features/ProductFilters';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Product } from '@/types';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  const handleFiltersChange = (filtered: Product[], filters: ProductFiltersState) => {
    setFilteredProducts(filtered);

    // Track analytics
    if (Object.keys(filters).length > 0) {
      trackEvent('filters_applied', {
        filters: filters,
        results_count: filtered.length,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <ProductFilters
        products={allProducts}
        onFiltersChange={handleFiltersChange}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
```

## Tips and Best Practices

### 1. Performance
- Use `useMemo` for all products list that doesn't change frequently
- Avoid unnecessary re-renders by using proper state management

### 2. UX
- Show result count to help users understand filter impact
- Keep filters visible on desktop, collapsible on mobile
- Provide feedback when no results match filters

### 3. Accessibility
- The component includes proper labels and semantic HTML
- Ensure filter sections are keyboard navigable
- Test with screen readers

### 4. Mobile Optimization
- Use responsive grid layout (1 col mobile, 4 col desktop)
- Consider drawer/modal for filters on very small screens
- Make buttons large enough for touch targets (44px minimum)

### 5. Data
- Ensure product data includes required fields (seller info, ratings)
- Handle cases where seller data might be null/undefined
- Format dates properly for newest sorting

## Troubleshooting

### Products not filtering
- Ensure `onFiltersChange` callback is properly updating parent state
- Verify product data structure matches `Product` type
- Check browser console for errors

### Filters not showing options
- Verify products array is passed and populated
- Check that seller information is included in products
- Ensure categories and countries are valid values

### Performance issues
- Check if products list is very large (1000+)
- Consider implementing pagination
- Use server-side filtering for large datasets

### Style issues
- Ensure Tailwind CSS is properly configured
- Check for CSS conflicts with other components
- Verify Button, Badge, Select components are imported
