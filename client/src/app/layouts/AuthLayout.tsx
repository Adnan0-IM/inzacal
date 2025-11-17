import { Outlet, Link } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn } from "@daveyplate/better-auth-ui";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="font-semibold">
            Inzakal
          </Link>
          <div className="flex items-center gap-3">
            <SignedIn>
              <Link to="/dashboard" className="text-sm font-medium">
                Go to dashboard
              </Link>
            </SignedIn>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto flex items-center justify-center p-4">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="container mx-auto p-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Inzakal
        </div>
      </footer>
    </div>
  );
}
