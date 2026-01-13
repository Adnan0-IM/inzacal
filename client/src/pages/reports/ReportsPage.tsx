import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useDownloadSalesCsv,
  useDownloadSalesPdf,
} from "@/features/reports/queries";
import type { ReportPeriod } from "@/types/reports";

export default function ReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>("monthly");
  const [currency, setCurrency] = useState<string>("NGN");

  const csv = useDownloadSalesCsv();
  const pdf = useDownloadSalesPdf();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader title="Reports" subtitle="Export sales reports (CSV/PDF)" />

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Period</div>
              <select
                className="border rounded px-2 py-2 text-sm"
                value={period}
                onChange={(e) => setPeriod(e.target.value as ReportPeriod)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">
                Currency (PDF)
              </div>
              <Input
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant="outline"
                disabled={csv.isPending}
                onClick={() => csv.mutate({ period })}
              >
                {csv.isPending ? "Downloading..." : "Download CSV"}
              </Button>
              <Button
                disabled={pdf.isPending}
                onClick={() => pdf.mutate({ period, currency })}
              >
                {pdf.isPending ? "Downloading..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
