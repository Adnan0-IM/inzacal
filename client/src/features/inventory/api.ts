import { api } from "@/lib/http";
import type { LowStockItem, Product } from "@/types/product";

export const fetchProducts = async () => {
  const res = await api.get("/products");
  if (!res.data) throw new Error("Failed to fetch products");
  return res.data as Product[];
};

export const createProduct = async (newProduct: Omit<Product, "id">) => {
  const res = await api.post("/products", newProduct);
  if (!res.data) throw new Error("Failed to create");
  return res.data;
};

export async function getLowStockProducts(limit = 10) {
  const res = await api.get(`/products/low-stock?limit=${limit}`);
  if (!res) throw new Error("Failed to fetch low stock");
  return res.data as LowStockItem[];
}