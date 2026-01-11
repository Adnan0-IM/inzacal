import { useState, useMemo } from "react";
import { useAnalyticsSummary } from "@/features/analytics/queries";
import { useOrganization } from "@/features/auth/hooks/useOrganization";
import { useSession } from "@/features/auth/hooks/useSession";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useTopProducts,
  useLocationPerformance,
  useCustomerPerformance,
} from "@/features/analytics/queries";
import { useRecentSales } from "@/features/sales/queries";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import { SERVER_URL } from "@/config/constants"; // add
import type { LowStockItem } from "@/types/product";
import type { Period } from "@/types/sales";
import { Spinner } from "@/components/ui/spinner";

const DashboardPage = () => {
  // console.debug("geo location", location);
  const [period, setPeriod] = useState<Period>("monthly");
  const { activeOrg, organizations } = useOrganization();
  const { data: session } = useSession();

  const queriesEnabled = !!session?.user && !!activeOrg;

  const { data: summary, isLoading: isSummaryLoading } = useAnalyticsSummary(
    period,
    { enabled: queriesEnabled }
  );

  const { data: topProducts = [], isLoading: topLoading } = useTopProducts(
    {
      limit: 5,
    },
    { enabled: queriesEnabled }
  );
  const { data: locPerf = [], isLoading: locLoading } = useLocationPerformance(
    {
      limit: 5,
    },
    { enabled: queriesEnabled }
  );
  const { data: custPerf = [], isLoading: custLoading } =
    useCustomerPerformance({ limit: 5 }, { enabled: queriesEnabled });
  const { data: recentSales = [], isLoading: recentLoading } = useRecentSales(
    8,
    { enabled: queriesEnabled }
  );

  const noActiveOrgAndNoOrgs = useMemo(
    () => !activeOrg && (organizations?.length ?? 0) === 0,
    [activeOrg, organizations]
  );

  const name = session?.user?.name ?? "guest";
  const currencyCode = "NGN";

  const lowLoading = false;
  const lowStock: LowStockItem[] = [];
  // Derive fields from analytics summary
  const kpis = {
    salesToday: summary?.totalSales ?? 0,
    revenueMtd: summary?.totalRevenue ?? 0,
    profitMtd: summary?.grossProfit ?? 0,
    expensesMtd: summary?.expensesTotal ?? 0,
    lowStockCount: summary?.lowStockCount ?? 0,
  };
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-2">
                {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    variant={p === period ? "default" : "outline"}
                    onClick={() => setPeriod(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button disabled={true} className="bg-accent hover:bg-secondary">
                <a
                  href={`${SERVER_URL}/api/reports/sales.csv?period=${period}`}
                  className="text-xs "
                  target="_blank"
                  rel="noreferrer"
                >
                  Export CSV ({period})
                </a>
              </Button>
              <Button disabled={true}>
                {" "}
                <a
                  href={`${SERVER_URL}/api/reports/sales.pdf?period=${period}&currency=${currencyCode}`}
                  className="text-xs "
                  target="_blank"
                  rel="noreferrer"
                >
                  Export PDF ({period})
                </a>
              </Button>
            </div>
          </div>
          {/* KPIs */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <Kpi
              isSummaryLoading={isSummaryLoading}
              title="Sales"
              value={kpis.salesToday}
            />
            <Kpi
              isSummaryLoading={isSummaryLoading}
              title="Revenue (MTD)"
              value={kpis.revenueMtd}
              currencyCode={currencyCode}
            />
            <Kpi
              isSummaryLoading={isSummaryLoading}
              title="Profit (MTD)"
              value={kpis.profitMtd}
              currencyCode={currencyCode}
            />
            <Kpi
              isSummaryLoading={isSummaryLoading}
              title="Expenses (MTD)"
              value={kpis.expensesMtd}
              currencyCode={currencyCode}
            />
          </section>

          {/* Trends */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Sales vs Expenses (MTD)</h3>
                {isSummaryLoading ? (
                  <div className="h-56 rounded bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
                    Loading…
                  </div>
                ) : (
                  <ChartContainer
                    config={{
                      sales: {
                        label: "Sales",
                        theme: {
                          light: "hsl(var(--chart-1))",
                          dark: "hsl(var(--chart-1))",
                        },
                      },
                      expenses: {
                        label: "Expenses",
                        theme: {
                          light: "hsl(var(--chart-3))",
                          dark: "hsl(var(--chart-3))",
                        },
                      },
                    }}
                  >
                    <ChartLegendContent payload={kpis.salesToday} />
                  </ChartContainer>
                )}
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
            {/* Top products */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Top products</h3>
                  <a className="text-xs underline" href="/dashboard/sales">
                    View sales
                  </a>
                </div>
                {topLoading ? (
                  <div className="text-sm text-muted-foreground">Loading…</div>
                ) : topProducts.length === 0 ? (
                  <EmptyState
                    title="No sales yet"
                    description="Process a sale to see top products."
                    variant="card"
                    align="start"
                  />
                ) : (
                  <ChartContainer
                    id="top-products"
                    config={{
                      revenue: {
                        label: "Revenue",
                        theme: {
                          light: "hsl(var(--chart-1))",
                          dark: "hsl(var(--chart-1))",
                        },
                      },
                      qty: {
                        label: "Qty",
                        theme: {
                          light: "hsl(var(--chart-2))",
                          dark: "hsl(var(--chart-2))",
                        },
                      },
                    }}
                    className="h-56"
                  >
                    <ChartLegendContent />
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Best locations</h3>
                  <a className="text-xs underline" href="/dashboard/sales">
                    View sales
                  </a>
                </div>
                {locLoading ? (
                  <div className="text-sm text-muted-foreground">Loading…</div>
                ) : locPerf.length === 0 ? (
                  <EmptyState
                    title="No data"
                    description="Record sales with a location to see performance."
                    variant="card"
                    align="start"
                  />
                ) : (
                  <ChartContainer
                    id="best-locations"
                    config={{
                      revenue: {
                        label: "Revenue",
                        theme: {
                          light: "hsl(var(--chart-1))",
                          dark: "hsl(var(--chart-1))",
                        },
                      },
                      grossProfit: {
                        label: "Gross Profit",
                        theme: {
                          light: "hsl(var(--chart-4))",
                          dark: "hsl(var(--chart-4))",
                        },
                      },
                    }}
                    className="h-56"
                  >
                    <ChartTooltipContent />
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
            {/* Best customers */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Best customers</h3>
                  <a className="text-xs underline" href="/dashboard/sales">
                    View sales
                  </a>
                </div>
                {custLoading ? (
                  <div className="text-sm text-muted-foreground">Loading…</div>
                ) : custPerf.length === 0 ? (
                  <EmptyState
                    title="No data"
                    description="Record sales with a customer to see performance."
                    variant="card"
                    align="start"
                  />
                ) : (
                  <ChartContainer
                    id="best-customers"
                    config={{
                      revenue: {
                        label: "Revenue",
                        theme: {
                          light: "hsl(var(--chart-1))",
                          dark: "hsl(var(--chart-1))",
                        },
                      },
                      grossProfit: {
                        label: "Gross Profit",
                        theme: {
                          light: "hsl(var(--chart-5))",
                          dark: "hsl(var(--chart-5))",
                        },
                      },
                    }}
                    className="h-56"
                  >
                    <ChartLegendContent />
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
            {/* Recent sales */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Recent sales</h3>
                  <a className="text-xs underline" href="/dashboard/sales">
                    View all
                  </a>
                </div>
                {recentLoading ? (
                  <div className="text-sm text-muted-foreground">Loading…</div>
                ) : recentSales.length === 0 ? (
                  <EmptyState
                    title="No sales recorded yet"
                    description="Record your first sale to see it here."
                    action={{
                      to: "/dashboard/sales/new",
                      label: "Record sale",
                    }}
                    variant="card"
                    align="start"
                  />
                ) : (
                  <ul className="divide-y">
                    {recentSales.map((s) => (
                      <li
                        key={s.id}
                        className="py-2 flex items-center justify-between"
                      >
                        <span className="text-sm">{s.ref}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Intl.NumberFormat(undefined, {
                            style: "currency",
                            currency: currencyCode,
                          }).format(s.amount)}
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
  isSummaryLoading,
}: {
  title: string;
  value: number;
  currencyCode?: string;
  isSummaryLoading?: boolean;
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
        {isSummaryLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-xl font-semibold">{display}</div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DashboardPage;
