import { Routes, Route } from "react-router"; // was react-router
import { lazy, Suspense } from "react";
import GuestOnlyAuthRoute from "./guards/GuestOnlyAuthRoute";
import Loading from "@/components/common/Loading";
import NewProduct from "@/pages/dashboard/inventory/NewProduct";
import NewSalePage from "@/pages/dashboard/sales/NewSalePage";

const HomePage = lazy(() => import("@/pages/Landing/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const PrivateRootLayout = lazy(() => import("./layouts/PrivateRootLayout"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const OrganizationsPage = lazy(
  () => import("@/pages/dashboard/organization/OrganizationsPage")
);
const OrganizationSettingsPage = lazy(
  () => import("@/pages/dashboard/organization/OrganizationSettingsPage")
);
const OrganizationMembersPage = lazy(
  () => import("@/pages/dashboard/organization/OrganizationMembersPage")
);
const AccountPage = lazy(
  () => import("@/pages/dashboard/organization/AccountPage")
);
const AcceptInvitationPage = lazy(
  () => import("@/pages/dashboard/organization/AcceptInvitationPage")
);
const OrganizationLayout = lazy(
  () => import("@/pages/dashboard/organization/OrganizationLayout")
);

const InventoryPage = lazy(
  () => import("@/pages/dashboard/inventory/InventoryPage")
);

const SalesPage = lazy( () => import("@/pages/dashboard/sales/SalesPage"))
// Optional: stub pages for roadmap sections
const ExpensesPage = () => <div className="p-6">Expenses</div>;
const InvestorsPage = () => <div className="p-6">Investors</div>;
const ReportsPage = () => <div className="p-6">Reports</div>;

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<HomePage />} />
        {/* Protected app */}
        <Route element={<PrivateRootLayout />}>
          <Route path="/dashboard">
            <Route index element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage />}/>
              <Route path="inventory/new" element={<NewProduct />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="sales/new" element={<NewSalePage />} />
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="investors" element={<InvestorsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* Organization area with shared layout */}
          <Route path="/organization" element={<OrganizationLayout />}>
            <Route path="settings" element={<OrganizationSettingsPage />} />
            <Route path="members" element={<OrganizationMembersPage />} />
            <Route index element={<OrganizationSettingsPage />} />
          </Route>

          {/* Account */}
          <Route path="/account">
            <Route path="organizations" element={<OrganizationsPage />} />
            <Route path="settings" element={<AccountPage />} />
          </Route>

          {/* Invitations */}
          <Route
            path="/invitations/accept"
            element={<AcceptInvitationPage />}
          />
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
