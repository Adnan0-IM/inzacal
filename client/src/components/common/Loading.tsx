import { useLocation } from "react-router";
import { CardsSkeleton, PageHeaderSkeleton } from "./Skeleton";

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
    <div className="container mx-auto p-6 space-y-6">
      <PageHeaderSkeleton />
      <CardsSkeleton />
    </div>
  );
};

export default Loading;
