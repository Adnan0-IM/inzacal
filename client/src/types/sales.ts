export type SaleItemInput = {
  productId: string;
  quantity: number;
};

export type CreateSaleInput = {
  items: SaleItemInput[];
  customerId?: string;
  locationId?: string;
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
