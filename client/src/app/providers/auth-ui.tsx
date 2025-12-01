import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";
import { useNavigate, NavLink } from "react-router";
// import { api } from "@/lib/http";

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

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <>
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
          ],
        }}
        social={{
          providers: ["google"],
        }}
        // avatar={{
        //   upload: async (file) => {
        //     const formData = new FormData();
        //     formData.append("avatar", file);
        //     const res = await api.post("/uploadAvatar", formData)
        //     const { data } = await res;
        //     return data.url;
        //   },
        //   delete: async (url) => {
        //     await api.post("/deleteAvatar", {
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify({ url }),
        //     });
        //   },
        // }}
        // captcha={{
        //   provider: "google-recaptcha-v3",
        //   siteKey: "your-site-key",
        // }}

        // twoFactor={["otp", "totp"]}
      >
        {children}
      </AuthUIProvider>
    </>
  );
}
