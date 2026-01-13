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

// Payload for creating a product; optional locationId allocates initial stock to a branch
export type CreateProductInput = Omit<Product, "id"> & {
  locationId?: string;
};

export type LowStockItem = {
  id: string;
  name: string;
  stock: number;
  minStock: number;
};
