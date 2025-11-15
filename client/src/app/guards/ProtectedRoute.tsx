import { Navigate, Outlet, useLocation } from "react-router";
import { useSession } from "@/features/auth/hooks/useSession";

export default function ProtectedRoute() {
  const { data, isLoading, error } = useSession();
  const location = useLocation();

  if (isLoading) return <div className="p-6">Loading…</div>;

  if (error || !data?.user) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
}