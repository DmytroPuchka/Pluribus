/**
 * Products Page Loading State
 */

import { ProductGrid } from '@/components/features/ProductGrid';

export default function Loading() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <div className="h-9 bg-muted animate-pulse rounded w-48 mb-2" />
        <div className="h-5 bg-muted animate-pulse rounded w-72" />
      </div>

      <ProductGrid products={[]} loading={true} />
    </div>
  );
}
