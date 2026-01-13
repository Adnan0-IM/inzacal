import { api } from "@/lib/http";
import type { CreateExpenseInput, Expense } from "@/types/expense";

export type ExpenseRangeParams = {
  from?: string;
  to?: string;
};

export const fetchExpenses = async (params?: ExpenseRangeParams) => {
  const qs = new URLSearchParams();
  if (params?.from) qs.set("from", params.from);
  if (params?.to) qs.set("to", params.to);

  const url = qs.toString() ? `/expenses?${qs.toString()}` : "/expenses";
  const res = await api.get(url);
  if (!res.data) throw new Error("Failed to fetch expenses");
  return res.data as Expense[];
};

export const createExpense = async (payload: CreateExpenseInput) => {
  const res = await api.post("/expenses", payload);
  if (!res.data) throw new Error("Failed to create expense");
  return res.data as Expense;
};
