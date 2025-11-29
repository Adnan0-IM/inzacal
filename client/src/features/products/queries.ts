import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts, type LowStockItem } from "./api";

export function useLowStockProducts(limit = 10) {
  return useQuery<LowStockItem[]>({
    queryKey: ["low-stock", limit],
    queryFn: () => getLowStockProducts(limit),
    staleTime: 60_000,
  });
}
