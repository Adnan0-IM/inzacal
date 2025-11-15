import { Outlet, Link } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b">
        <div className="container mx-auto p-4">
          <Link to="/" className="font-semibold">
            Inzakal
          </Link>
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
