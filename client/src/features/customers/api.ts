import { api } from "@/lib/http";
import type { CreateCustomerInput, Customer } from "@/types/customer";

export const fetchCustomers = async () => {
  const res = await api.get("/customers");
  if (!res.data) throw new Error("Failed to fetch customers");
  return res.data as Customer[];
};

export const createCustomer = async (payload: CreateCustomerInput) => {
  const res = await api.post("/customers", payload);
  if (!res.data) throw new Error("Failed to create customer");
  return res.data as Customer;
};
