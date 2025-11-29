import { api } from "@/lib/http";

export type LowStockItem = {
  id: string;
  name: string;
  stock: number;
  minStock: number;
};

export async function getLowStockProducts(limit = 10): Promise<LowStockItem[]> {
  const res = await api.get(`/products/low-stock?limit=${limit}`);
  return res.data as LowStockItem[];
}
