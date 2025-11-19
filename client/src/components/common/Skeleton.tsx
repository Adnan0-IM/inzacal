import { Skeleton } from "../ui/skeleton";





 function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full" />
      ))}
    </div>
  );
}

// Generic header with avatar/title/subtitle/action button
function GenericHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-8" />
      <Skeleton className="h-9 w-38 hidden sm:block" />
      <div className="flex gap-4">
        <Skeleton className="h-9 w-8" />
        <Skeleton className="h-9 w-8" />
      </div>
    </div>
  );
}

// Generic sidebar with section headers + items
function GenericSidebarSkeleton({
  sections = 3,
  itemsPerSection = 4,
}: {
  sections?: number;
  itemsPerSection?: number;
}) {
  return (
    <>
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-38" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-8">
        {Array.from({ length: sections }).map((_, sIdx) => (
          <div key={sIdx} className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-2">
              {Array.from({ length: itemsPerSection }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Filters row (dropdowns/buttons)
function GenericFiltersSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-28 rounded" />
      ))}
    </div>
  );
}

// Charts / analytics placeholder grid
function GenericChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-56 w-full rounded" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-56 w-full rounded" />
      </div>
    </div>
  );
}
export { CardsSkeleton, GenericHeaderSkeleton, GenericSidebarSkeleton, GenericFiltersSkeleton, GenericChartsSkeleton };