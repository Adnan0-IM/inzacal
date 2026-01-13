import { useMemo, useState } from "react";
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
import { useCreateExpense, useExpenses } from "@/features/expenses/queries";

export default function ExpensesPage() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const params = useMemo(
    () => ({ from: from || undefined, to: to || undefined }),
    [from, to]
  );

  const { data: expenses, isLoading } = useExpenses(params);
  const { mutate: createExpense, isPending } = useCreateExpense();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [occurredOn, setOccurredOn] = useState<string>("");

  const onCreate = () => {
    if (!description || !category || !amount || !occurredOn) return;
    createExpense(
      {
        description,
        category,
        amount: Number(amount),
        occurredOn: new Date(occurredOn).toISOString(),
      },
      {
        onSuccess: () => {
          setDescription("");
          setCategory("");
          setAmount("");
          setOccurredOn("");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader title="Expenses" subtitle="Track business spending" />

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder="Category (e.g. Logistics)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              type="date"
              value={occurredOn}
              onChange={(e) => setOccurredOn(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={onCreate} disabled={isPending}>
              {isPending ? "Saving..." : "Add Expense"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">From</div>
                <Input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">To</div>
                <Input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : !expenses || expenses.length === 0 ? (
            <EmptyState
              title="No expenses yet"
              description="Add your first expense to see it here."
              variant="card"
              align="start"
            />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((ex) => (
                    <TableRow key={ex.id}>
                      <TableCell>
                        {new Date(ex.occurredOn).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{ex.description}</TableCell>
                      <TableCell>{ex.category}</TableCell>
                      <TableCell className="text-right font-medium">
                        {ex.currency} {Number(ex.amount).toFixed(2)}
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
