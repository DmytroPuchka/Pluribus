/**
 * Product Details Page Loading State
 * Shows skeleton loaders while product data is being fetched
 */

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8">
        <div className="h-4 bg-muted animate-pulse rounded w-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Image Gallery Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <div className="w-full h-96 bg-muted animate-pulse rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div className="h-6 bg-muted animate-pulse rounded w-20" />

          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          </div>

          {/* Price Section */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-8 bg-muted animate-pulse rounded w-1/2" />
          </div>

          {/* Stock Status */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="h-10 bg-muted animate-pulse rounded-md" />
            <div className="h-10 bg-muted animate-pulse rounded-md" />
            <div className="h-10 bg-muted animate-pulse rounded-md" />
          </div>

          {/* Description */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          </div>
        </div>
      </div>

      {/* Seller Card Skeleton */}
      <Card className="mb-8">
        <CardHeader>
          <div className="h-6 bg-muted animate-pulse rounded w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-muted animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-muted animate-pulse rounded w-2/3" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted animate-pulse rounded w-1/2" />
              ))}
            </div>
          </div>
          <div className="h-10 bg-muted animate-pulse rounded-md mt-4" />
        </CardContent>
      </Card>

      {/* Reviews Card Skeleton */}
      <Card className="mb-8">
        <CardHeader>
          <div className="h-6 bg-muted animate-pulse rounded w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="pb-4 border-b last:border-0">
              <div className="flex justify-between mb-2">
                <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/6" />
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-muted animate-pulse rounded w-full" />
                <div className="h-3 bg-muted animate-pulse rounded w-5/6" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Products Card Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted animate-pulse rounded w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="w-full h-40 bg-muted animate-pulse rounded-lg mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-full mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
