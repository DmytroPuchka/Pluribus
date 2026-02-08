export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="space-y-8 w-full max-w-4xl">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded-md w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-md w-1/2 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 p-6 border rounded-lg">
              <div className="h-8 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Additional content skeleton */}
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded-md w-2/3 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md w-4/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
