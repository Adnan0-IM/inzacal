import { useQuery } from "@tanstack/react-query";
import {
  getAnalyticsSummary,
  getTopProducts,
  getLocationPerformance,
  getCustomerPerformance,
  type TopProduct,
  type LocationPerf,
  type CustomerPerf,
} from "./api";

export function useAnalyticsSummary(
  period: string = "monthly",
  opts?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["analytics", "summary", period],
    queryFn: () => getAnalyticsSummary(period),
    enabled: opts?.enabled ?? true,
  });
}

export function useTopProducts(
  params?: {
    from?: string;
    to?: string;
    locationId?: string;
    customerId?: string;
    limit?: number;
  },
  opts?: { enabled?: boolean }
) {
  return useQuery<TopProduct[]>({
    queryKey: ["top-products", params],
    queryFn: () => getTopProducts(params),
    staleTime: 60_000,
    enabled: opts?.enabled ?? true,
  });
}

export function useLocationPerformance(
  params?: { from?: string; to?: string; limit?: number },
  opts?: { enabled?: boolean }
) {
  return useQuery<LocationPerf[]>({
    queryKey: ["location-performance", params],
    queryFn: () => getLocationPerformance(params),
    staleTime: 60_000,
    enabled: opts?.enabled ?? true,
  });
}

export function useCustomerPerformance(
  params?: { from?: string; to?: string; limit?: number },
  opts?: { enabled?: boolean }
) {
  return useQuery<CustomerPerf[]>({
    queryKey: ["customer-performance", params],
    queryFn: () => getCustomerPerformance(params),
    staleTime: 60_000,
    enabled: opts?.enabled ?? true,
  });
}
