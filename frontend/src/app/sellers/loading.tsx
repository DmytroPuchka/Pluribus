export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl animate-pulse space-y-4">
            <div className="h-10 w-96 bg-muted rounded" />
            <div className="h-6 w-full bg-muted rounded" />
            <div className="h-6 w-3/4 bg-muted rounded" />
          </div>
        </div>
      </section>

      {/* Map Section Skeleton */}
      <section className="py-8 md:py-12 border-b bg-muted/30">
        <div className="container px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-muted rounded" />
            <div className="h-5 w-96 bg-muted rounded" />
            <div className="h-[500px] w-full bg-muted rounded-lg" />
          </div>
        </div>
      </section>

      {/* Search and Filters Skeleton */}
      <section className="py-8 border-b">
        <div className="container px-4 animate-pulse space-y-6">
          <div className="h-11 w-full bg-muted rounded" />
          <div className="h-10 w-32 bg-muted rounded" />
        </div>
      </section>

      {/* Sellers Grid Skeleton */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="animate-pulse space-y-8">
            <div>
              <div className="h-8 w-48 bg-muted rounded mb-2" />
              <div className="h-5 w-64 bg-muted rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
