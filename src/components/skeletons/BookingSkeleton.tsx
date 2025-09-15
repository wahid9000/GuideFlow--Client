import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const BookingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-4 animate-pulse">
      {/* Hero Section */}
      <div className="relative w-full h-40 rounded-3xl overflow-hidden mb-12 border border-gray-700" />

      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12 shadow-xl">
          {/* Description */}
          <div>
            <Skeleton className="h-8 w-1/3 mb-4 rounded" />
            <Skeleton className="h-4 w-full mb-2 rounded" />
            <Skeleton className="h-4 w-full mb-2 rounded" />
            <Skeleton className="h-4 w-5/6 mb-2 rounded" />
          </div>

          <Separator className="my-10" />

          {/* Tour Details */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/4 mb-6 rounded" />
            <div className="grid sm:grid-cols-2 gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl  border border-gray-200"
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

          {/* Included Items */}
          <div>
            <Skeleton className="h-8 w-1/3 mb-4 rounded" />
            <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-8 list-none">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Booking Card */}
        <div className="md:col-span-1 order-first md:order-last">
          <div className="md:sticky md:top-20 md:mt-24">
            <div className="border border-gray-200 p-8 rounded-2xl shadow-lg space-y-6 ">
              <Skeleton className="h-10 w-1/2 rounded mb-2" />
              <Skeleton className="h-4 w-1/3 rounded" />
              <Separator className="my-6" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
