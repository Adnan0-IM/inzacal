import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function FxPage() {
  const { data: rates, isLoading } = useFxRates();
  const { mutate: refresh, isPending } = useRefreshFxRates();

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
                  {rates.map((r) => (
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
