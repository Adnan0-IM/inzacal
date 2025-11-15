import { api } from "@/lib/http";

export type Period = "daily" | "weekly" | "monthly";

export type SalesSummary = {
  period: Period;
  totalSales: number;
  totalProfit: number;
  salesCount: number;
  lowStock: {
    id: string;
    name: string;
    quantity: number;
    lowStockThreshold: number;
  }[];
};

export async function getSalesSummary(
  organizationId: string,
  period: Period = "monthly",
) {
  const { data } = await api.get<SalesSummary>("/sales/summary", {
    params: { organizationId, period },
  });
  return data;
}
