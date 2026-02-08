export default function Loading() {
  return (
    <div className="container px-4 py-12 md:py-16 max-w-4xl mx-auto">
      <div className="animate-pulse space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-12 w-96 bg-muted rounded" />
          <div className="h-5 w-48 bg-muted rounded" />
        </div>

        {/* Content Sections Skeleton */}
        <div className="space-y-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-8 w-64 bg-muted rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="h-4 w-4/5 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note Skeleton */}
        <div className="space-y-2 pt-8 border-t">
          <div className="h-5 w-full bg-muted rounded" />
          <div className="h-5 w-3/4 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
