export type Product = {
  id: string;
  name: string;
  sku?: string;
  description?: string;
  price: number; 
  costPrice?: number;
  stock: number;
  minStock: number;
};