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

      {/* Story Section Skeleton */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto animate-pulse space-y-8">
            <div className="text-center space-y-4">
              <div className="h-10 w-48 bg-muted rounded mx-auto" />
              <div className="h-5 w-72 bg-muted rounded mx-auto" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section Skeleton */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container px-4">
          <div className="animate-pulse space-y-16">
            <div className="text-center space-y-4">
              <div className="h-10 w-64 bg-muted rounded mx-auto" />
              <div className="h-5 w-96 bg-muted rounded mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-52 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section Skeleton */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="animate-pulse space-y-16">
            <div className="text-center space-y-4">
              <div className="h-10 w-64 bg-muted rounded mx-auto" />
              <div className="h-5 w-96 bg-muted rounded mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
