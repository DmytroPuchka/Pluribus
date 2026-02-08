export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-pulse space-y-8">
        {/* Logo Skeleton */}
        <div className="flex justify-center">
          <div className="h-10 w-32 bg-muted rounded" />
        </div>

        {/* Card Skeleton */}
        <div className="bg-muted rounded-lg p-8 space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted-foreground/20 rounded mx-auto" />
            <div className="h-5 w-64 bg-muted-foreground/20 rounded mx-auto" />
          </div>

          {/* Form Fields Skeleton */}
          <div className="space-y-4">
            <div className="h-10 w-full bg-muted-foreground/20 rounded" />
            <div className="h-10 w-full bg-muted-foreground/20 rounded" />
            <div className="h-5 w-32 bg-muted-foreground/20 rounded" />
            <div className="h-10 w-full bg-muted-foreground/20 rounded" />
          </div>

          {/* Links Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-48 bg-muted-foreground/20 rounded mx-auto" />
            <div className="h-4 w-40 bg-muted-foreground/20 rounded mx-auto" />
          </div>
        </div>

        {/* Terms Skeleton */}
        <div className="h-4 w-72 bg-muted rounded mx-auto" />
      </div>
    </div>
  );
}
