import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCustomer, fetchCustomers } from "./api";

export function useCustomers(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    enabled: opts?.enabled ?? true,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
