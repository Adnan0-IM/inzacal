import { api } from "@/lib/http";

export const analyticsSummary = async () => {
  const res = await api.get("/analytics/summary");
  if (!res) throw new Error("Failed");
  return res.data as {
    totalRevenue: number;
    totalSales: number;
    lowStockCount: number;
    totalProducts: number;
  };
};
