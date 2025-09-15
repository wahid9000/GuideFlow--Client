import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const TourDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start w-full mb-6">
        <div className="flex-1">
          <Skeleton className="h-12 w-3/4 mb-4 rounded-lg" />
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
        </div>
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 mb-10">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="w-full h-48 rounded-xl" />
          ))}
      </div>

      <Separator className="my-10" />

      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-10">
          {/* Description */}
          <div>
            <Skeleton className="h-8 w-1/4 mb-4 rounded" />
            <Skeleton className="h-4 w-full mb-2 rounded" />
            <Skeleton className="h-4 w-full mb-2 rounded" />
            <Skeleton className="h-4 w-5/6 mb-2 rounded" />
          </div>

          <Separator className="my-10" />

          {/* Key Details */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3 mb-4 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 shadow-md"
                  >
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-4 w-full rounded" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <Separator className="my-10" />

          {/* Included & Excluded */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {["Included", "Excluded"].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-xl space-y-3 shadow-md"
              >
                <Skeleton className="h-6 w-32 rounded" />
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <Skeleton key={idx} className="h-4 w-full rounded" />
                  ))}
              </div>
            ))}
          </div>

          <Separator className="my-10" />

          {/* Amenities & Tour Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-gray-100 p-6 rounded-xl space-y-3">
                  <Skeleton className="h-6 w-36 rounded" />
                  {Array(3)
                    .fill(0)
                    .map((_, idx) => (
                      <Skeleton key={idx} className="h-4 w-full rounded" />
                    ))}
                </div>
              ))}
          </div>
        </div>

        {/* Sidebar
        <div className="hidden md:block">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div> */}
      </div>
    </div>
  );
};
