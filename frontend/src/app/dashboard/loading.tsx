export default function Loading() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-pulse">
      {/* Welcome Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-72 bg-muted rounded" />
        <div className="h-5 w-96 bg-muted rounded" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg" />
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-4">
          <div className="h-64 bg-muted rounded-lg" />
          <div className="h-48 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}
