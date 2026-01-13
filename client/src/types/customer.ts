export type Customer = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  lga?: string;
  country?: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
};

export type CreateCustomerInput = {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  lga?: string;
  country?: string;
  lat?: number;
  lng?: number;
};
