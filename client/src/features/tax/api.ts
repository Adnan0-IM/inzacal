import { api } from "@/lib/http";
import type {
  CreateTaxRuleInput,
  TaxRule,
  UpdateTaxRuleInput,
} from "@/types/tax";

export const fetchTaxRules = async (jurisdiction?: string) => {
  const qs = new URLSearchParams();
  if (jurisdiction) qs.set("jurisdiction", jurisdiction);
  const url = qs.toString() ? `/tax?${qs.toString()}` : "/tax";
  const res = await api.get(url);
  if (!res.data) throw new Error("Failed to fetch tax rules");
  return res.data as TaxRule[];
};

export const createTaxRule = async (payload: CreateTaxRuleInput) => {
  const res = await api.post("/tax", payload);
  if (!res.data) throw new Error("Failed to create tax rule");
  return res.data as TaxRule;
};

export const updateTaxRule = async (
  id: string,
  payload: UpdateTaxRuleInput
) => {
  const res = await api.put(`/tax/${id}`, payload);
  if (!res.data) throw new Error("Failed to update tax rule");
  return res.data as TaxRule;
};

export const deleteTaxRule = async (id: string) => {
  const res = await api.delete(`/tax/${id}`);
  if (!res.data) throw new Error("Failed to delete tax rule");
  return res.data as { ok: boolean };
};

export const seedDefaultVatRule = async () => {
  const res = await api.post("/tax/seed-default");
  if (!res.data) throw new Error("Failed to seed default tax rule");
  return res.data as TaxRule | { ok: boolean; id: string };
};
