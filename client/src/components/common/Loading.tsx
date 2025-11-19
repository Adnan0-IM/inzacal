import { useLocation } from "react-router";
import {
  CardsSkeleton,
  GenericChartsSkeleton,
  GenericHeaderSkeleton,
  GenericSidebarSkeleton,
} from "./Skeleton";

type LoadingProps = {
  size?: number; // tailwind w/h in px
  className?: string;
};

const Loading = ({ size = 20, className = "" }: LoadingProps) => {
  const s = `${size}px`;
  const location = useLocation();
  if (location.pathname === "/")
    return (
      <div className="flex items-center justify-center h-screen">
        <span
          role="status"
          aria-label="Loading"
          className={`inline-block rounded-full border-2 border-primary/70 border-t-transparent animate-spin ${className}`}
          style={{ width: s, height: s }}
        />
      </div>
    );

  return (
    <div className="p-6 grid gap-6 md:grid-cols-4">
      {/* Sidebar */}
      <aside className="space-y-6 hidden md:block">
        <GenericSidebarSkeleton />
      </aside>
      {/* Main */}
      <main className="md:col-span-3 space-y-8">
        <GenericHeaderSkeleton />
        <GenericChartsSkeleton />
        <CardsSkeleton />
      </main>
    </div>
  );
};

export default Loading;
