import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSale, fetchSales, fetchCustomers, fetchLocations } from "./api";
import { toast } from "sonner";

export function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      toast.success("Sale completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["sales"] });
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
export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
}
export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });
}
