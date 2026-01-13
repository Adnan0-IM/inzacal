import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFxRates, useRefreshFxRates } from "@/features/fx/queries";
import { useMemo, useState } from "react";

export default function FxPage() {
  const { data: rates, isLoading } = useFxRates();
  const { mutate: refresh, isPending } = useRefreshFxRates();

  const [base, setBase] = useState<string>("");
  const [quote, setQuote] = useState<string>("");

  const filteredRates = useMemo(() => {
    const baseFilter = base.trim().toLowerCase();
    const quoteFilter = quote.trim().toLowerCase();
    return (rates ?? []).filter((r) => {
      if (baseFilter && !r.base.toLowerCase().includes(baseFilter))
        return false;
      if (quoteFilter && !r.quote.toLowerCase().includes(quoteFilter))
        return false;
      return true;
    });
  }, [rates, base, quote]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="FX Rates"
        subtitle="Latest stored exchange rates"
        actions={
          <Button onClick={() => refresh()} disabled={isPending}>
            {isPending ? "Refreshing..." : "Refresh"}
          </Button>
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Input
              placeholder="Filter base (e.g. USD)"
              value={base}
              onChange={(e) => setBase(e.target.value)}
            />
            <Input
              placeholder="Filter quote (e.g. NGN)"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : !rates || rates.length === 0 ? (
            <EmptyState
              title="No FX rates"
              description="Refresh to fetch and store FX rates."
              variant="card"
              align="start"
            />
          ) : filteredRates.length === 0 ? (
            <EmptyState
              title="No matches"
              description="Try a different base/quote filter."
              variant="card"
              align="start"
            />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pair</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Fetched</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRates.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        {r.base}/{r.quote}
                      </TableCell>
                      <TableCell>{Number(r.rate).toFixed(6)}</TableCell>
                      <TableCell>
                        {new Date(r.fetchedAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
