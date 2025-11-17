import Loading from "@/components/common/Loading";
import {
  AuthLoading,
  RedirectToSignIn,
  SignedIn,
} from "@daveyplate/better-auth-ui";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RedirectToSignIn />
      <AuthLoading>
        <Loading />
      </AuthLoading>
      <SignedIn>{children}</SignedIn>
    </>
  );
}
