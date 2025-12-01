import { api } from "@/lib/http";
import type { Product } from "@/types/product";

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
