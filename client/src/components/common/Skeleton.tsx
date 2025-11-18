import { Skeleton } from "../ui/skeleton";


export function PageHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
      <Skeleton className="h-9 w-24" />
    </div>
  );
}

export function CardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full" />
      ))}
    </div>
  );
}
