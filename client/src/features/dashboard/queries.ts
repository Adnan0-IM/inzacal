import { useQuery } from "@tanstack/react-query";
import { getSalesSummary,type Period } from "./api";

export function useDashboardSummary(
  orgId?: string | null,
  period: Period = "monthly"
) {
  return useQuery({
    queryKey: ["sales-summary", orgId, period],
    enabled: !!orgId,
    queryFn: () => getSalesSummary(orgId as string, period),
  });
}
