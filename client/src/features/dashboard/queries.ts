import { useQuery } from "@tanstack/react-query";
import {
  getDashboardSummary,
  getLowStock as fetchLowStock,
  getRecentSales as fetchRecentSales,
  getSalesVsExpenses as fetchSalesVsExpenses,
  getTopProducts as fetchTopProducts,
  getSalesSummary,
} from "./api";
import { qk } from "../../lib/queryKeys";
import type { Period } from "../../lib/types";

export type {
  Summary,
  LowStockItem,
  RecentSale,
  SeriesPoint,
  TopProductPoint,
} from "./api";

export function useDashboardSummary(
  orgId?: string,
  from?: string,
  to?: string
) {
  return useQuery({
    queryKey: ["dashboard", "summary", { orgId, from, to }],
    queryFn: () => getDashboardSummary(orgId, from, to),
  });
}

export function useLowStock(orgId?: string, limit = 5) {
  return useQuery({
    queryKey: ["inventory", "low-stock", { orgId, limit }],
    queryFn: () => fetchLowStock(orgId, limit),
  });
}

export function useRecentSales(orgId?: string, limit = 5) {
  return useQuery({
    queryKey: ["sales", "recent", { orgId, limit }],
    queryFn: () => fetchRecentSales(orgId, limit),
  });
}

export function useSalesVsExpenses(
  orgId?: string,
  from?: string,
  to?: string,
  interval = "day"
) {
  return useQuery({
    queryKey: ["reports", "sales-vs-expenses", { orgId, from, to, interval }],
    queryFn: () =>
      fetchSalesVsExpenses(
        orgId,
        from,
        to,
        interval as "hour" | "day" | "month"
      ),
  });
}

export function useTopProducts(
  orgId?: string,
  from?: string,
  to?: string,
  limit = 5
) {
  return useQuery({
    queryKey: ["reports", "top-products", { orgId, from, to, limit }],
    queryFn: () => fetchTopProducts(orgId, from, to, limit),
  });
}

export const salesSummaryQuery = (
  orgId: string | undefined,
  period: Period
) => ({
  queryKey: qk.salesSummary(orgId, period),
  queryFn: () => getSalesSummary(period),
  enabled: !!orgId,
});
