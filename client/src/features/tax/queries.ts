import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTaxRule,
  deleteTaxRule,
  fetchTaxRules,
  seedDefaultVatRule,
  updateTaxRule,
} from "./api";
import type { CreateTaxRuleInput, UpdateTaxRuleInput } from "@/types/tax";

export function useTaxRules(
  jurisdiction?: string,
  opts?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["tax", jurisdiction ?? null],
    queryFn: () => fetchTaxRules(jurisdiction),
    enabled: opts?.enabled ?? true,
  });
}

export function useCreateTaxRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaxRuleInput) => createTaxRule(payload),
    onSuccess: () => {
      toast.success("Tax rule created");
      queryClient.invalidateQueries({ queryKey: ["tax"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateTaxRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateTaxRuleInput;
    }) => updateTaxRule(id, payload),
    onSuccess: () => {
      toast.success("Tax rule updated");
      queryClient.invalidateQueries({ queryKey: ["tax"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteTaxRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTaxRule(id),
    onSuccess: () => {
      toast.success("Tax rule deleted");
      queryClient.invalidateQueries({ queryKey: ["tax"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useSeedDefaultVatRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: seedDefaultVatRule,
    onSuccess: () => {
      toast.success("Default VAT rule seeded");
      queryClient.invalidateQueries({ queryKey: ["tax"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
