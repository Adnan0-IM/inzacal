import { Outlet, NavLink, useNavigate } from "react-router";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";

type LinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};
const RouterLink = ({ href, className, children }: LinkProps) => (
  <NavLink to={href} className={className}>
    {children}
  </NavLink>
);

/**
 * Nested provider enabling organization features only in protected subtree.
 * Mounted under <PrivateRoute />, so it won’t run for signed-out users.
 */
export default function OrgUIRoute() {
  const navigate = useNavigate();
  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={navigate}
      Link={RouterLink}
      redirectTo="/dashboard"
      account={{}}
      organization={{
        logo: true,
        customRoles: [
          { role: "accountant", label: "Accountant" },
          { role: "salesperson", label: "Salesperson" },
          { role: "investor", label: "Investor" }, 
        ],
      }}
      social={{ providers: ["google"] }}
    >
      <Outlet />
    </AuthUIProvider>
  );
}
