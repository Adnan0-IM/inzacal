import { api } from "@/lib/http";
import type { CreateSaleInput, Sale } from "@/types/sales";

export const createSale = async (data: CreateSaleInput) => {
  const res = await api.post("/sales", data);
  if (!res) throw new Error("Failed to create sale");
  return res.data;
};

export const fetchSales = async () => {
  const res = await api.get("/sales");
  if (!res) throw new Error("Failed to fetch sales");
  return res.data as Sale[];
};

export const fetchCustomers = async () => {
  const res = await api.get("/customers");
  if (!res) throw new Error("Failed to fetch customers");
  return res.data;
};

export const fetchLocations = async () => {
  const res = await api.get("/locations");
  if (!res) throw new Error("Failed to fetch locations");
  return res.data;
};

export type RecentSale = {
  id: string;
  ref: string;
  date: string; // ISO
  amount: number;
};

export async function getRecentSales(limit = 10) {
  const res = await api.get(`/sales/recent?limit=${limit}`);
  return res.data as {
    id: string;
    ref: string;
    date: string;
    amount: number;
  }[];
}
