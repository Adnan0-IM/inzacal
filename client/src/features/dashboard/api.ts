import { api } from "@/lib/http";
import type { Period } from "@/lib/types";

export type SalesSummary = {
  period: Period;
  totalRevenue: number;
  salesCount: number;
  lowStock: {
    id: string;
    name: string;
    stock: number;
    minStock: number;
    qty: number;
  }[];
};

export async function getSalesSummary(period: Period = "monthly") {
  const { data } = await api.get<SalesSummary>("/sales/summary", {
    params: { period },
  });
  return data;
}

// Shared dashboard types (keep if used elsewhere)
export type Summary = {
  salesToday: number;
  revenueMtd: number;
  profitMtd: number;
  expensesMtd: number;
  lowStockCount: number;
};

export type LowStockItem = { id: string; name: string; qty: number };
export type RecentSale = {
  id: string;
  ref: string;
  amount: number;
  date: string;
};
export type SeriesPoint = { date: string; sales: number; expenses: number };
export type TopProductPoint = { name: string; revenue: number };

// Note: endpoints below require server support; keep only if implemented
export async function getDashboardSummary(
  orgId?: string,
  from?: string,
  to?: string
) {
  const { data } = await api.get<Summary>("/dashboard/summary", {
    params: { orgId, from, to },
  });
  return data;
}

export async function getLowStock(orgId?: string, limit = 5) {
  const { data } = await api.get<LowStockItem[]>("/inventory/low-stock", {
    params: { orgId, limit },
  });
  return data;
}

export async function getRecentSales(orgId?: string, limit = 5) {
  const { data } = await api.get<RecentSale[]>("/sales/recent", {
    params: { orgId, limit },
  });
  return data;
}

export async function getSalesVsExpenses(
  orgId?: string,
  from?: string,
  to?: string,
  interval: "hour" | "day" | "month" = "day"
) {
  const { data } = await api.get<SeriesPoint[]>("/reports/sales-vs-expenses", {
    params: { orgId, from, to, interval },
  });
  return data;
}

export async function getTopProducts(
  orgId?: string,
  from?: string,
  to?: string,
  limit = 5
) {
  const { data } = await api.get<TopProductPoint[]>("/reports/top-products", {
    params: { orgId, from, to, limit },
  });
  return data;
}
