import { api } from "@/lib/http";
import type { ReportPeriod } from "@/types/reports";

export const fetchSalesCsv = async (period: ReportPeriod) => {
  const res = await api.get(`/reports/sales.csv?period=${period}`, {
    responseType: "blob",
  });
  return res.data as Blob;
};

export const fetchSalesPdf = async (
  period: ReportPeriod,
  currency?: string
) => {
  const qs = new URLSearchParams();
  qs.set("period", period);
  if (currency) qs.set("currency", currency);

  const res = await api.get(`/reports/sales.pdf?${qs.toString()}`, {
    responseType: "blob",
  });
  return res.data as Blob;
};
