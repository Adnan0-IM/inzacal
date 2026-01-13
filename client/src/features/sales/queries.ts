import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSale, fetchSales, getRecentSales } from "./api";
import { toast } from "sonner";

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      toast.success("Sale completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["low-stock"] });
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["recent-sales"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
  });
}

export function useRecentSales(limit = 10, opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["recent-sales", limit],
    queryFn: () => getRecentSales(limit),
    enabled: opts?.enabled ?? true,
    staleTime: 30_000,
  });
}
