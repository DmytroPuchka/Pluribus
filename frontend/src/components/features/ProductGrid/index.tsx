/**
 * ProductGrid Component
 * Displays a grid of products with loading and empty states
 *
 * @component
 * @example
 * ```tsx
 * <ProductGrid products={products} loading={false} />
 * ```
 */

import { FC } from 'react';
import { PackageOpen } from 'lucide-react';
import { ProductCard } from '@/components/features/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

// Loading skeleton component
const ProductCardSkeleton: FC = () => (
  <Card className="overflow-hidden">
    <div className="w-full h-48 bg-muted animate-pulse" />
    <CardContent className="p-4 space-y-3">
      <div className="h-6 bg-muted animate-pulse rounded" />
      <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
      <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
      <div className="h-8 bg-muted animate-pulse rounded w-1/3" />
    </CardContent>
  </Card>
);

// Empty state component
const EmptyState: FC = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <PackageOpen className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
    <p className="text-muted-foreground max-w-md">
      We couldn't find any products matching your criteria. Try adjusting your filters or check back later.
    </p>
  </div>
);

export const ProductGrid: FC<ProductGridProps> = ({
  products,
  loading = false,
  className,
}) => {
  // Loading state
  if (loading) {
    return (
      <div className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
        className
      )}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className={cn('grid grid-cols-1', className)}>
        <EmptyState />
      </div>
    );
  }

  // Products grid
  return (
    <div className={cn(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
      className
    )}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
