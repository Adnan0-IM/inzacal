import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts, type LowStockItem } from "./api";

export function useLowStockProducts(limit = 10, opts?: { enabled?: boolean }) {
  return useQuery<LowStockItem[]>({
    queryKey: ["low-stock", limit],
    queryFn: () => getLowStockProducts(limit),
    staleTime: 60_000,
    enabled: opts?.enabled ?? true,
  });
}
