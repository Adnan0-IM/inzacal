import { api } from "@/lib/http";

export type TopProduct = {
  productId: string;
  name: string;
  sku: string | null;
  qty: number;
  revenue: number;
};

export async function getTopProducts(params?: {
  from?: string;
  to?: string;
  locationId?: string;
  customerId?: string;
  limit?: number;
}): Promise<TopProduct[]> {
  const q = new URLSearchParams();
  if (params?.from) q.set("from", params.from);
  if (params?.to) q.set("to", params.to);
  if (params?.locationId) q.set("locationId", params.locationId);
  if (params?.customerId) q.set("customerId", params.customerId);
  q.set("limit", String(params?.limit ?? 5));
  const res = await api.get(`/analytics/top-products?${q.toString()}`);
  return res.data as TopProduct[];
}

// Summary with period
export async function getAnalyticsSummary(period: string) {
  const { data } = await api.get("/analytics/summary", {
    params: { period },
  });
  return data;
}

// Add missing exports below

export type LocationPerf = {
  locationId: string;
  locationName: string;
  revenue: number;
  grossProfit: number;
  salesCount: number;
};

// which location performs the best
export async function getLocationPerformance(params?: {
  from?: string;
  to?: string;
  limit?: number;
}): Promise<LocationPerf[]> {
  const q = new URLSearchParams();
  if (params?.from) q.set("from", params.from);
  if (params?.to) q.set("to", params.to);
  if (params?.limit) q.set("limit", String(params.limit));
  const res = await api.get(`/analytics/location-performance?${q.toString()}`);
  return res.data as LocationPerf[];
}

export type CustomerPerf = {
  customerId: string;
  customerName: string;
  revenue: number;
  grossProfit: number;
  salesCount: number;
};

export async function getCustomerPerformance(params?: {
  from?: string;
  to?: string;
  limit?: number;
}): Promise<CustomerPerf[]> {
  const q = new URLSearchParams();
  if (params?.from) q.set("from", params.from);
  if (params?.to) q.set("to", params.to);
  if (params?.limit) q.set("limit", String(params.limit));
  const res = await api.get(`/analytics/customer-performance?${q.toString()}`);
  return res.data as CustomerPerf[];
}
