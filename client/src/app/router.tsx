import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import GuestOnlyAuthRoute from "./guards/GuestOnlyAuthRoute";

const HomePage = lazy(() => import("@/pages/Landing/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const PrivateRootLayout = lazy(() => import("./layouts/PrivateRootLayout"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const OrganizationSettingsPage = lazy(
  () => import("@/pages/dashboard/organization/OrganizationSettingsPage")
);
const OrganizationMembersPage = lazy(
  () => import("@/pages/dashboard/organization/OrganizationMembersPage")
);
const AccountPage = lazy(
  () => import("@/pages/dashboard/organization/AccountPage")
);

// Optional: stub pages for roadmap sections
const InventoryPage = () => <div className="p-6">Inventory</div>;
const SalesPage = () => <div className="p-6">Sales</div>;
const ExpensesPage = () => <div className="p-6">Expenses</div>;
const InvestorsPage = () => <div className="p-6">Investors</div>;
const ReportsPage = () => <div className="p-6">Reports</div>;

const AppRouter = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<PrivateRootLayout />}>
          {/* Protected app */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/inventory" element={<InventoryPage />} />
            <Route path="/dashboard/sales" element={<SalesPage />} />
            <Route path="/dashboard/expenses" element={<ExpensesPage />} />
            <Route path="/dashboard/investors" element={<InvestorsPage />} />
            <Route path="/dashboard/reports" element={<ReportsPage />} />
            <Route
              path="/organization/settings"
              element={<OrganizationSettingsPage />}
            />
            <Route
              path="/organization/members"
              element={<OrganizationMembersPage />}
            />
            <Route path="/account/settings" element={<AccountPage />} />
        </Route>

        {/* Auth pages: only block sign-in/sign-up when logged in */}
        <Route element={<GuestOnlyAuthRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/auth/:pathname" element={<AuthPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
