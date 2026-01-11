import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, fetchProducts, getLowStockProducts } from "./api";
import type { LowStockItem } from "@/types/product";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useLowStockProducts(limit = 10, opts?: { enabled?: boolean }) {
  return useQuery<LowStockItem[]>({
    queryKey: ["low-stock", limit],
    queryFn: () => getLowStockProducts(limit),
    staleTime: 60_000,
    enabled: opts?.enabled ?? true,
  });
}
