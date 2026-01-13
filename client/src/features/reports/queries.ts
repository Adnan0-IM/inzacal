import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchSalesCsv, fetchSalesPdf } from "./api";
import type { ReportPeriod } from "@/types/reports";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function useDownloadSalesCsv() {
  return useMutation({
    mutationFn: async ({ period }: { period: ReportPeriod }) => {
      const blob = await fetchSalesCsv(period);
      downloadBlob(blob, `sales-${period}.csv`);
      return true;
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDownloadSalesPdf() {
  return useMutation({
    mutationFn: async ({
      period,
      currency,
    }: {
      period: ReportPeriod;
      currency?: string;
    }) => {
      const blob = await fetchSalesPdf(period, currency);
      downloadBlob(blob, `sales-${period}.pdf`);
      return true;
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
