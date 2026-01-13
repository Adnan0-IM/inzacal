export type Period = "daily" | "weekly" | "monthly";

export type SaleItemInput = {
  productId: string;
  quantity: number;
};

export type CreateSaleInput = {
  items: SaleItemInput[];
  customerId?: string;
  branchName: string;
};

export type SaleItem = {
  id: string;
  quantity: number;
  unitPrice: string;
  product: {
    name: string;
    sku: string | null;
  };
};

export type Sale = {
  id: string;
  totalAmount: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
  items: SaleItem[];
};

export type RecentSale = {
  id: string;
  ref: string;
  date: string; // ISO
  amount: number;
};

export type SalesSummary = {
  period: Period;
  totalRevenue: number;
  salesCount: number;
  lowStock: {
    id: string;
    name: string;
    stock: number;
    minStock: number;
    qty: number;
  }[];
};
