import { Link } from "react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import EmptyState from "@/components/common/EmptyState";
import { useSales } from "@/features/sales/queries";

export default function SalesPage() {
  const { data: sales, isLoading } = useSales();

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );

  if (!sales || sales.length === 0) {
    return (
      <EmptyState
        title="No sales yet"
        description="Process your first sale to see history here."
        action={{ label: "New Sale", to: "/dashboard/sales/new" }}
      />
    );
  }

  return (
    <div className="space-y-4 container mx-auto p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Sales History</h2>
        <Button asChild>
          <Link to="/dashboard/sales/new">
            <Plus className="mr-2 h-4 w-4" /> New Sale
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Sold By</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  {new Date(sale.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                    {sale.user.name}
                </TableCell>
                <TableCell>
                    {sale.items.length}
                </TableCell>
                <TableCell className="text-right font-medium">
                    ₦{sale.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
