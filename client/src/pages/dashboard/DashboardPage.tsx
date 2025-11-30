import { useState, useMemo } from "react";
import { useAnalyticsSummary } from "@/features/analytics/queries";
import { useOrganization } from "@/features/dashboard";
import { useSession } from "@/features/auth/hooks/useSession";
import { Navigate } from "react-router";
import PageHeader from "@/components/common/PageHeader";
import { CardsSkeleton } from "@/components/common/Skeleton";
import EmptyState from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { useLowStockProducts } from "@/features/products/queries";
import { useLocation } from "@/hooks/use-location";
import { useAddress } from "@/hooks/use-address";

type Period = "daily" | "weekly" | "monthly";

const DashboardPage = () => {
  const location = useLocation();
  console.log(location);
  const [period, setPeriod] = useState<Period>("monthly");
  const {
    activeOrg,
    isActiveOrgPending,
    organizations,
    isOrganizationsPending,
  } = useOrganization();
  const {
    data: session,
    isLoading: isSessionLoading,
    error: sessionError,
  } = useSession();
  const { address: addr, loading: addrLoading } = useAddress();

  // Replace salesSummaryQuery with analytics summary
  const { data: summary, isLoading: isSummaryLoading } = useAnalyticsSummary();
  const { data: lowStock = [], isLoading: lowLoading } = useLowStockProducts(8);

  const noActiveOrgAndNoOrgs = useMemo(
    () => !activeOrg && (organizations?.length ?? 0) === 0,
    [activeOrg, organizations]
  );

  if (
    isSummaryLoading ||
    isActiveOrgPending ||
    isOrganizationsPending ||
    isSessionLoading
  ) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        {/* <PageHeaderSkeleton /> */}
        <CardsSkeleton />
      </div>
    );
  }
  if (sessionError || !session?.user)
    return <Navigate to="/auth/sign-in" replace />;

  const name = session.user.name ?? "guest";
  // const currencyCode = activeOrg?.currency ?? "NGN";
  const currencyCode = "NGN";

  // Derive fields from analytics summary
  const kpis = {
    salesToday: summary?.totalSales ?? 0, // you can adjust to daily later
    revenueMtd: summary?.totalRevenue ?? 0,
    profitMtd: summary?.grossProfit ?? 0, // or netProfit depending on your KPI
    expensesMtd: summary?.expensesTotal ?? 0,
    lowStockCount: summary?.lowStockCount ?? 0,
  };
  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader title={name} subtitle="Welcome" />
      <div className="text-xs text-muted-foreground">
        {addrLoading
          ? "Resolving address…"
          : addr?.display
            ? `Approx. location: ${addr.display}`
            : null}
      </div>
      {noActiveOrgAndNoOrgs ? (
        /* First-time onboarding (only show when no orgs/sales yet) */
        <>
          <EmptyState
            title="Create your first organization"
            description="Organizations help you manage members and settings for your business."
            secondary={{
              to: "/account/organizations",
              label: "Open organizations page",
            }}
            action={{
              to: "/account/organizations",
              label: "Create organization",
            }}
            isFirstOrg={true}
          />
          {/* <CreateOrganizationForm/> */}
        </>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              className="border rounded px-2 py-1 text-sm"
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
            >
              <option value="daily">Today</option>
              <option value="weekly">This week</option>
              <option value="monthly">This month</option>
            </select>
          </div>

          {/* KPIs */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <Kpi title="Sales today" value={kpis.salesToday} />
            <Kpi
              title="Revenue (MTD)"
              value={kpis.revenueMtd}
              currencyCode={currencyCode}
            />
            <Kpi
              title="Profit (MTD)"
              value={kpis.profitMtd}
              currencyCode={currencyCode}
            />
            <Kpi
              title="Expenses (MTD)"
              value={kpis.expensesMtd}
              currencyCode={currencyCode}
            />
          </section>

          {/* Trends */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Sales vs Expenses</h3>
                <div className="h-56 rounded bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                  Chart placeholder (line/area)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Top products</h3>
                <div className="h-56 rounded bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                  Chart placeholder (bar/pie)
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Actionables */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Low stock</h3>
                  <a className="text-xs underline" href="/dashboard/inventory">
                    Manage
                  </a>
                </div>
                {lowLoading ? (
                  <div className="text-sm text-muted-foreground">Loading…</div>
                ) : lowStock.length === 0 ? (
                  <EmptyState
                    title="All good"
                    description="No products are below minimum stock."
                    variant="card"
                    align="start"
                  />
                ) : (
                  <ul className="divide-y">
                    {lowStock.map((p) => (
                      <li
                        key={p.id}
                        className="py-2 flex items-center justify-between text-sm"
                      >
                        <span>{p.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {p.stock} / min {p.minStock}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </div>
  );
};

function Kpi({
  title,
  value,
  currencyCode,
}: {
  title: string;
  value: number;
  currencyCode?: string;
}) {
  const display = currencyCode
    ? new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
      }).format(value)
    : value.toLocaleString();
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-xl font-semibold">{display}</div>
      </CardContent>
    </Card>
  );
}

export default DashboardPage;
// <Card>
//             <CardContent className="p-4 space-y-3">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold">Recent sales</h3>
//                 <a className="text-xs underline" href="/dashboard/sales">
//                   View all
//                 </a>
//               </div>
//               {recentSales.length === 0 ? (
//                 <EmptyState
//                   title="No sales recorded yet"
//                   description="Record your first sale to see it here."
//                   action={{ to: "/dashboard/sales", label: "Record sale" }}
//                   variant="card"
//                   align="start"
//                 />
//               ) : (
//                 <ul className="divide-y">
//                   {recentSales.map((s) => (
//                     <li
//                       key={s.id}
//                       className="py-2 flex items-center justify-between"
//                     >
//                       <span className="text-sm">{s.ref}</span>
//                       <span className="text-xs text-muted-foreground">
//                         {/* Use org currency */}
//                         {new Intl.NumberFormat(undefined, {
//                           style: "currency",
//                           currency: currencyCode,
//                         }).format(s.amount)}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </CardContent>
//           </Card>
