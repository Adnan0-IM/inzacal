import { api } from "@/lib/http";

export type LowStockItem = {
  id: string;
  name: string;
  stock: number;
  minStock: number;
};

export async function getLowStockProducts(limit = 10) {
  const res = await api.get(`/products/low-stock?limit=${limit}`);
  if (!res) throw new Error("Failed to fetch low stock");
  return res.data as LowStockItem[];
}
