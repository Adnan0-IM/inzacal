import { api } from "@/lib/http";
import type { FxRate } from "@/types/fx";

export const fetchFxRates = async () => {
  const res = await api.get("/fx");
  if (!res.data) throw new Error("Failed to fetch FX rates");
  return res.data as FxRate[];
};

export const refreshFxRates = async () => {
  const res = await api.post("/fx/refresh");
  if (!res.data) throw new Error("Failed to refresh FX rates");
  return res.data as { count: number };
};
