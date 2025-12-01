import Loading from "@/components/common/Loading";
import {
  AuthLoading,
  RedirectToSignIn,
  SignedIn,
} from "@daveyplate/better-auth-ui";
import { Outlet } from "react-router";

export default function PrivateRoute() {
  return (
    <>
      <AuthLoading>
        <Loading />
      </AuthLoading>

      <SignedIn>
        <Outlet />
      </SignedIn>

      {/* Only runs when NOT loading and NOT signed in */}
      <RedirectToSignIn />
    </>
  );
}
