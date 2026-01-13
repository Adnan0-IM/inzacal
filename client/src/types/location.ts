export type Location = {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  lat?: number;
  lng?: number;
  createdAt?: string;
};

export type CreateLocationInput = {
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  lat?: number;
  lng?: number;
};
