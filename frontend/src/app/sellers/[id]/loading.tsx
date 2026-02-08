/**
 * Seller Profile Page Loading State
 * Skeleton loading while seller profile is being fetched
 */

import { ProductGrid } from '@/components/features/ProductGrid';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Hero Background */}
      <div className="h-32 bg-muted animate-pulse rounded-lg" />

      {/* Seller Info Skeleton */}
      <div className="flex flex-col sm:flex-row gap-6 -mt-16 mb-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full border-4 border-background bg-muted animate-pulse shadow-lg" />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <div className="h-9 bg-muted animate-pulse rounded w-64" />
          <div className="h-5 bg-muted animate-pulse rounded w-48" />
          <div className="flex items-center gap-2">
            <div className="h-5 bg-muted animate-pulse rounded w-32" />
            <div className="h-5 bg-muted animate-pulse rounded w-24" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 bg-muted animate-pulse rounded-full w-28" />
            ))}
          </div>
          <div className="h-10 bg-muted animate-pulse rounded w-40" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="h-8 bg-muted animate-pulse rounded w-16 mx-auto" />
                <div className="h-4 bg-muted animate-pulse rounded w-24 mx-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About Section Skeleton */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="h-6 bg-muted animate-pulse rounded w-20" />
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </CardContent>
      </Card>

      {/* Products Section Header */}
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded w-40" />
        <div className="h-5 bg-muted animate-pulse rounded w-72" />
      </div>

      {/* Products Grid Skeleton */}
      <ProductGrid products={[]} loading={true} />

      {/* Reviews Section Header */}
      <div className="space-y-4 mt-12">
        <div className="h-8 bg-muted animate-pulse rounded w-48" />
        <div className="h-5 bg-muted animate-pulse rounded w-64" />
      </div>

      {/* Reviews Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-5 bg-muted animate-pulse rounded w-40 mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-32" />
                </div>
                <div className="h-5 bg-muted animate-pulse rounded w-24" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
