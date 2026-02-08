export default function Loading() {
  return (
    <div className="container px-4 py-8 animate-pulse space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="h-10 w-64 bg-muted rounded" />
        <div className="h-6 w-full max-w-2xl bg-muted rounded" />
        <div className="h-6 w-3/4 bg-muted rounded" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-12 w-full max-w-xl bg-muted rounded-lg" />

      {/* Categories Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 bg-muted rounded-lg" />
        ))}
      </div>

      {/* FAQ Section Skeleton */}
      <div className="space-y-4 mt-12">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
