import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExpense, fetchExpenses, type ExpenseRangeParams } from "./api";

export function useExpenses(
  params?: ExpenseRangeParams,
  opts?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["expenses", params?.from ?? null, params?.to ?? null],
    queryFn: () => fetchExpenses(params),
    enabled: opts?.enabled ?? true,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success("Expense recorded");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
