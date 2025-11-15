import { useState } from "react";
import { Navigate } from "react-router";
import { useSession } from "@/features/auth/hooks/useSession";
import {
  OrganizationMembersCard,
  OrganizationsCard,
} from "@daveyplate/better-auth-ui";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Period = "daily" | "weekly" | "monthly";

const DashboardPage = () => {
  const { data, isLoading, error } = useSession();

  const [period, setPeriod] = useState<Period>("monthly");

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (error || !data?.user) return <Navigate to="/auth/sign-in" replace />;

  const name = data.user.name ?? "guest";

  
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div>
            <div className="text-sm text-muted-foreground">Welcome</div>
            <div className="text-xl font-semibold">{name}</div>
          </div>
        </div>
      </div>

      <section>
        <OrganizationsCard />
        <OrganizationMembersCard />
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Overview</h2>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {/* {kpiLoading && (
          <div className="text-sm text-muted-foreground">Loading KPIs…</div>
        )}
        {isError && (
          <div className="text-sm text-red-600">
            {(kpiError as Error)?.message || "Failed to load summary"}
          </div>
        )} */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded border p-4">
            <div className="text-sm text-muted-foreground">Sales</div>
            <div className="text-2xl font-semibold">
              {fmt.format(Number(summary?.totalSales ?? 0))}
            </div>
          </div>
          <div className="rounded border p-4">
            <div className="text-sm text-muted-foreground">Profit</div>
            <div className="text-2xl font-semibold">
              {fmt.format(Number(summary?.totalProfit ?? 0))}
            </div>
          </div>
          <div className="rounded border p-4">
            <div className="text-sm text-muted-foreground">Orders</div>
            <div className="text-2xl font-semibold">
              {summary?.salesCount ?? 0}
            </div>
          </div>
        </div> */}

        {/* <section className="rounded border p-4">
          <div className="font-medium mb-3">Low stock</div>
          <ul className="space-y-2">
            {(summary?.lowStock ?? []).map((p) => (
              <li key={p.id} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="text-amber-600">
                  {p.quantity} / {p.lowStockThreshold}
                </span>
              </li>
            ))}
            {(summary?.lowStock?.length ?? 0) === 0 && !kpiLoading && (
              <div className="text-sm text-muted-foreground">All good ✅</div>
            )}
          </ul>
        </section> */}
      </section>
    </div>
  );
};

export default DashboardPage;
