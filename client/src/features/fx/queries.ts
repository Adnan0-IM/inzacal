import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchFxRates, refreshFxRates } from "./api";

export function useFxRates(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["fx"],
    queryFn: fetchFxRates,
    enabled: opts?.enabled ?? true,
    staleTime: 60_000,
  });
}

export function useRefreshFxRates() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refreshFxRates,
    onSuccess: (data) => {
      toast.success(`FX refreshed (${data.count})`);
      queryClient.invalidateQueries({ queryKey: ["fx"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
