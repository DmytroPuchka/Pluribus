export default function Loading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center animate-pulse space-y-6">
            <div className="h-12 w-96 bg-muted rounded mx-auto" />
            <div className="h-6 w-full bg-muted rounded" />
            <div className="h-6 w-3/4 bg-muted rounded mx-auto" />
          </div>
        </div>
      </section>

      {/* Steps Section Skeleton */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="animate-pulse space-y-12">
            <div className="text-center space-y-4">
              <div className="h-10 w-72 bg-muted rounded mx-auto" />
              <div className="h-5 w-96 bg-muted rounded mx-auto" />
            </div>
            <div className="space-y-8 max-w-4xl mx-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-6">
                  <div className="h-12 w-12 bg-muted rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-7 w-64 bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-5/6 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <div className="animate-pulse space-y-16">
            <div className="text-center space-y-4">
              <div className="h-10 w-48 bg-muted rounded mx-auto" />
              <div className="h-5 w-96 bg-muted rounded mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto animate-pulse space-y-8">
            <div className="text-center space-y-4">
              <div className="h-10 w-96 bg-muted rounded mx-auto" />
              <div className="h-5 w-72 bg-muted rounded mx-auto" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
