import { AuthLoading, SignedIn, SignedOut } from "@daveyplate/better-auth-ui";
import { Navigate, Outlet, useParams } from "react-router";
import Loading from "@/components/common/Loading";

export default function GuestOnlyAuthRoute() {
  const { pathname } = useParams<{ pathname: string }>();

  // Only guard these two pages
  const isSignInOrUp = pathname === "sign-in" || pathname === "sign-up";

  return (
    <>
      <AuthLoading>
        <Loading />
      </AuthLoading>

      {/* If signed in and trying to visit sign-in/sign-up, send to dashboard */}
      <SignedIn>
        {isSignInOrUp ? <Navigate to="/dashboard" replace /> : <Outlet />}
      </SignedIn>

      {/* If signed out, allow access normally */}
      <SignedOut>
        <Outlet />
      </SignedOut>
    </>
  );
}
