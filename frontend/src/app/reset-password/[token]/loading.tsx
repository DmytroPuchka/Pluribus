export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50/50 to-white px-4 py-12">
      <div className="w-full max-w-md animate-pulse space-y-8">
        {/* Back Link Skeleton */}
        <div className="h-5 w-32 bg-muted rounded" />

        {/* Header Skeleton */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-10 w-32 bg-muted rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-8 w-72 bg-muted rounded mx-auto" />
            <div className="h-5 w-64 bg-muted rounded mx-auto" />
          </div>
        </div>

        {/* Card Skeleton */}
        <div className="bg-muted rounded-lg p-8 space-y-6">
          {/* Instructions Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted-foreground/20 rounded" />
            <div className="h-4 w-4/5 bg-muted-foreground/20 rounded" />
          </div>

          {/* Form Fields Skeleton */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
              <div className="h-10 w-full bg-muted-foreground/20 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-40 bg-muted-foreground/20 rounded" />
              <div className="h-10 w-full bg-muted-foreground/20 rounded" />
            </div>
          </div>

          {/* Password Requirements Skeleton */}
          <div className="space-y-2">
            <div className="h-3 w-48 bg-muted-foreground/20 rounded" />
            <div className="h-3 w-40 bg-muted-foreground/20 rounded" />
            <div className="h-3 w-44 bg-muted-foreground/20 rounded" />
          </div>

          {/* Submit Button Skeleton */}
          <div className="h-10 w-full bg-muted-foreground/20 rounded" />
        </div>

        {/* Links Skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-4 w-48 bg-muted rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}
