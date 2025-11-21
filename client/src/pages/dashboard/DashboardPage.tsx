import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { salesSummaryQuery } from "@/features/dashboard/queries";
import { useOrganization } from "@/features/dashboard";
import { useSession } from "@/features/auth/hooks/useSession";
import { Navigate } from "react-router";
import PageHeader from "@/components/common/PageHeader";
import {
  CardsSkeleton,
} from "@/components/common/Skeleton";
import EmptyState from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";

type Period = "daily" | "weekly" | "monthly";

const DashboardPage = () => {
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

  const { data: stats, isLoading: isSummaryLoading } = useQuery(
    salesSummaryQuery(activeOrg?.id, period)
  );

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
  const currencyCode = "NGN"

  const summary = {
    salesToday: stats?.salesCount || 0,
    revenueMtd: stats?.totalRevenue || 0,
    profitMtd: 0, // not computed on server yet
    expensesMtd: 0,
    lowStockCount: stats?.lowStock?.length || 0,
  };

  const lowStockItems =
    stats?.lowStock?.map((i) => ({
      id: i.id,
      name: i.name,
      stock: i.stock,
      minStock: i.minStock,
    })) || [];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader title={name} subtitle="Welcome" />
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
            <Kpi title="Sales today" value={summary.salesToday} />
            <Kpi
              title="Revenue (MTD)"
              value={summary.revenueMtd}
              currencyCode={currencyCode}
            />
            <Kpi
              title="Profit (MTD)"
              value={summary.profitMtd}
              currencyCode={currencyCode}
            />
            <Kpi
              title="Expenses (MTD)"
              value={summary.expensesMtd}
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
                  <span className="text-xs text-muted-foreground">
                    {summary.lowStockCount} items
                  </span>
                </div>
                {lowStockItems.length === 0 ? (
                  <EmptyState
                    title="No low-stock items"
                    description="You're all stocked up. Add reorder points to track items."
                    action={{
                      to: "/dashboard/inventory",
                      label: "Go to inventory",
                    }}
                    variant="card"
                    align="start"
                  />
                ) : (
                  <ul className="divide-y">
                    {lowStockItems.map((it) => (
                      <li
                        key={it.id}
                        className="py-2 flex items-center justify-between"
                      >
                        <span className="text-sm">{it.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Qty: {it.stock}
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