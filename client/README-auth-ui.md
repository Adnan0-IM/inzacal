# Better Auth UI — Setup and Customization (Client)

This guide shows how to integrate and customize `@daveyplate/better-auth-ui` in a React + Vite + React Router app.

## Prerequisites

- Server is running Better Auth with your database connected (Prisma `DATABASE_URL` set).
- OAuth providers (e.g., Google/GitHub) are configured on the server (see “Enable social providers” below).
- Client dependencies installed:
  - `@daveyplate/better-auth-ui`
  - `react`, `react-router` (or `react-router-dom`)
- You’ve created an `authClient` that points to your server’s auth routes.

## 1) Wrap your app with AuthUIProvider

This gives the UI access to navigation and links from your router.

- You already have this:

```tsx
// filepath: /home/adnan/Home_/inzacal/client/src/Provider.tsx
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useNavigate, NavLink } from "react-router"

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={navigate}
      Link={NavLink}
    >
      {children}
    </AuthUIProvider>
  )
}
```

Ensure the `Providers` component is rendered under a Router:

```tsx
// filepath: /home/adnan/Home_/inzacal/client/src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import "./index.css";
import App from "./app/App.tsx";
import { Providers } from "./Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Providers>
        <App />
      </Providers>
    </Router>
  </StrictMode>
);
```

## 2) Define your auth routes

The library expects a route that captures which auth view to show via a `pathname` param (e.g., `sign-in`, `sign-up`, `forgot-password`, etc.).

```tsx
// filepath: /home/adnan/Home_/inzacal/client/src/app/router.tsx
import AuthPage from "@/pages/auth/AuthPage";
import { Routes, Route } from "react-router";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/:pathname" element={<AuthPage />} />
    </Routes>
  );
};

export default AppRouter;
```

Example URLs:
- /auth/sign-in
- /auth/sign-up
- /auth/forgot-password

## 3) Render AuthView and customize

You already render `AuthView` and pass `pathname` from the URL. Add `redirectTo` (where to go on success) and optionally tweak social button layout.

```tsx
// filepath: /home/adnan/Home_/inzacal/client/src/pages/auth/AuthPage.tsx
import { useParams } from "react-router"
import { AuthView } from "@daveyplate/better-auth-ui"

export default function AuthPage() {
  const { pathname } = useParams()

  return (
    <main className="container mx-auto flex min-h-dvh items-center justify-center p-4">
      <AuthView
        pathname={pathname}
        redirectTo="/dashboard"
        socialLayout="auto"        // e.g. "auto" | "vertical" | "horizontal" (see docs)
        // className="max-w-md w-full" // example styling hook
      />
    </main>
  )
}
```

Notes:
- `pathname` controls which view is shown (sign-in, sign-up, forgot-password, etc.).
- `redirectTo` is used after a successful auth action.

## 4) Ensure “Sign up” and “Forgot password” links work

Because you supplied `Link` and `navigate` to `AuthUIProvider`, built‑in links inside `AuthView` will use your router automatically. Just make sure your route path exists (`/auth/:pathname`), and you navigate to supported views like:
- Sign in: `/auth/sign-in`
- Sign up: `/auth/sign-up`
- Forgot password: `/auth/forgot-password`

If you want your own custom links on that page, add them next to `AuthView`:

```tsx
// no filepath (optional snippet)
import { NavLink } from "react-router"

<aside className="mt-4 text-sm">
  <NavLink to="/auth/forgot-password" className="underline mr-3">Forgot password?</NavLink>
  <NavLink to="/auth/sign-up" className="underline">Create an account</NavLink>
</aside>
```

## 5) Enable social providers (server)

Social buttons render when the corresponding providers are enabled on the server. Example (Express + Better Auth):

```ts
// filepath: /home/adnan/Home_/inzacal/server/src/api/auth.ts
import express from "express";
import { betterAuth } from "better-auth";
import { github, google } from "better-auth/providers";

export const auth = betterAuth({
  database: { /* your Prisma adapter/config here */ },
  baseURL: process.env.AUTH_BASE_URL ?? "http://localhost:5173", // or your site URL
  // Enable providers you want to show in the UI:
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export function mountAuth(app: express.Express) {
  app.use("/api/auth", auth.router); // expose auth endpoints
}
```

Environment:

```env
# filepath: /home/adnan/Home_/inzacal/server/.env
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

On the client, point `authClient` to your server’s routes:

```ts
// filepath: /home/adnan/Home_/inzacal/client/src/lib/auth-client.ts
import { createAuthClient } from "@daveyplate/better-auth-ui"; // or the client factory you use

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL ?? "http://localhost:3000/api/auth",
});
```

Now the `AuthView` will show GitHub/Google buttons automatically. Use `socialLayout` to tune layout.

## 6) Redirects and success handling

Set `redirectTo` on `AuthView` to send users to a page (e.g., `/dashboard`) after sign in/sign up/password reset. If you need custom behavior, you can also handle success in your app’s state and call `navigate("/dashboard")`.

## 7) Styling and theme

- Wrap your app in a theme provider (you already use one).
- Pass `className` to `AuthView` or place it in a styled container to control width/padding.
- Use your CSS/Tailwind tokens for consistent theming.

## 8) Common pitfalls

- “useNavigate may be used only in the context of a Router”: Ensure `<Providers>` is rendered under `<Router>`.
- Social buttons not showing: Verify server provider config and env vars; restart server; check network calls to `/api/auth/*`.
- Links don’t change the view: Ensure your route is `/auth/:pathname` and you navigate to supported values (`sign-in`, `sign-up`, `forgot-password`, etc.).
- Redirect doesn’t happen: Confirm `redirectTo` and that your server returns success (inspect network tab).

## 9) Quick test checklist

- Visit `/auth/sign-in`: email/password form + social buttons (if configured).
- Click “Create an account” => `/auth/sign-up`.
- Click “Forgot password” => `/auth/forgot-password` (submit email).
- Sign in with Google/GitHub => redirected to `/dashboard`.

---
For advanced options (additional fields, copy, or layout), see the component props in the official docs. Keep server/provider config as the single source of truth for which social buttons appear.