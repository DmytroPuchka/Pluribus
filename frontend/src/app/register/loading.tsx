export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="w-full max-w-md animate-pulse space-y-8">
        {/* Logo Skeleton */}
        <div className="flex justify-center">
          <div className="h-10 w-32 bg-muted rounded" />
        </div>

        {/* Card Skeleton */}
        <div className="bg-muted rounded-lg p-8 space-y-6">
          <div className="space-y-2 text-center">
            <div className="h-8 w-48 bg-muted-foreground/20 rounded mx-auto" />
            <div className="h-5 w-72 bg-muted-foreground/20 rounded mx-auto" />
          </div>

          {/* OAuth Button Skeleton */}
          <div className="h-10 w-full bg-muted-foreground/20 rounded" />

          {/* Divider */}
          <div className="h-px w-full bg-muted-foreground/20" />

          {/* Form Fields Skeleton */}
          <div className="space-y-5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-muted-foreground/20 rounded" />
                <div className="h-9 w-full bg-muted-foreground/20 rounded" />
              </div>
            ))}
            <div className="h-10 w-full bg-muted-foreground/20 rounded" />
          </div>

          {/* Links Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-56 bg-muted-foreground/20 rounded mx-auto" />
            <div className="h-3 w-64 bg-muted-foreground/20 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
