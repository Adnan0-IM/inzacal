import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
              <Select
                value={period}
                onValueChange={(v) => setPeriod(v as ReportPeriod)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
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
