import { useQuery } from "@tanstack/react-query";
import { analyticsSummary } from "./api";

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ["analytics-summary"],
    queryFn: analyticsSummary,
  });
}
