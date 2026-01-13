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
import {
  useCreateTaxRule,
  useDeleteTaxRule,
  useSeedDefaultVatRule,
  useTaxRules,
  useUpdateTaxRule,
} from "@/features/tax/queries";
import type { TaxRule } from "@/types/tax";

function toDateInputValue(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function TaxPage() {
  const [jurisdiction, setJurisdiction] = useState<string>("");
  const { data: rules, isLoading } = useTaxRules(jurisdiction || undefined);

  const { mutate: createRule, isPending: creating } = useCreateTaxRule();
  const { mutate: deleteRule, isPending: deleting } = useDeleteTaxRule();
  const { mutate: seedDefault, isPending: seeding } = useSeedDefaultVatRule();
  const { mutate: updateRule, isPending: updating } = useUpdateTaxRule();

  const [newJurisdiction, setNewJurisdiction] = useState<string>("");
  const [newType, setNewType] = useState<string>("VAT");
  const [newRate, setNewRate] = useState<string>("0.075");
  const [newEffectiveFrom, setNewEffectiveFrom] = useState<string>("");
  const [newEffectiveTo, setNewEffectiveTo] = useState<string>("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const editingRule = useMemo(
    () => rules?.find((r) => r.id === editingId),
    [rules, editingId]
  );

  const [editRate, setEditRate] = useState<string>("");
  const [editEffectiveFrom, setEditEffectiveFrom] = useState<string>("");
  const [editEffectiveTo, setEditEffectiveTo] = useState<string>("");

  const startEdit = (r: TaxRule) => {
    setEditingId(r.id);
    setEditRate(String(r.rate));
    setEditEffectiveFrom(toDateInputValue(r.effectiveFrom));
    setEditEffectiveTo(toDateInputValue(r.effectiveTo ?? null));
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateRule({
      id: editingId,
      payload: {
        rate: Number(editRate),
        effectiveFrom: new Date(editEffectiveFrom).toISOString(),
        effectiveTo: editEffectiveTo
          ? new Date(editEffectiveTo).toISOString()
          : null,
      },
    });
    setEditingId(null);
  };

  const onCreate = () => {
    if (!newJurisdiction || !newType || !newRate || !newEffectiveFrom) return;
    createRule(
      {
        jurisdiction: newJurisdiction,
        type: newType,
        rate: Number(newRate),
        effectiveFrom: new Date(newEffectiveFrom).toISOString(),
        effectiveTo: newEffectiveTo
          ? new Date(newEffectiveTo).toISOString()
          : null,
      },
      {
        onSuccess: () => {
          setNewJurisdiction("");
          setNewType("VAT");
          setNewRate("0.075");
          setNewEffectiveFrom("");
          setNewEffectiveTo("");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Tax Rules"
        subtitle="Manage VAT and other tax rules"
        actions={
          <Button onClick={() => seedDefault()} disabled={seeding}>
            {seeding ? "Seeding..." : "Seed default VAT"}
          </Button>
        }
      />

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Input
              placeholder="Jurisdiction (e.g. NG)"
              value={newJurisdiction}
              onChange={(e) => setNewJurisdiction(e.target.value)}
            />
            <Input
              placeholder="Type (e.g. VAT)"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <Input
              type="number"
              step="0.0001"
              placeholder="Rate (e.g. 0.075)"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
            />
            <Input
              type="date"
              value={newEffectiveFrom}
              onChange={(e) => setNewEffectiveFrom(e.target.value)}
            />
            <Input
              type="date"
              value={newEffectiveTo}
              onChange={(e) => setNewEffectiveTo(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={onCreate} disabled={creating}>
              {creating ? "Saving..." : "Add Rule"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-end gap-3">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">
                Filter jurisdiction
              </div>
              <Input
                placeholder="e.g. NG"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : !rules || rules.length === 0 ? (
            <EmptyState
              title="No tax rules"
              description="Create a tax rule or seed the default VAT rule."
              variant="card"
              align="start"
            />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jurisdiction</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Effective</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.jurisdiction}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{Number(r.rate).toFixed(4)}</TableCell>
                      <TableCell>
                        {toDateInputValue(r.effectiveFrom)}
                        {r.effectiveTo
                          ? ` → ${toDateInputValue(r.effectiveTo)}`
                          : ""}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(r)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={deleting}
                            onClick={() => deleteRule(r.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {editingRule && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="font-medium">Edit rule</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    type="number"
                    step="0.0001"
                    value={editRate}
                    onChange={(e) => setEditRate(e.target.value)}
                  />
                  <Input
                    type="date"
                    value={editEffectiveFrom}
                    onChange={(e) => setEditEffectiveFrom(e.target.value)}
                  />
                  <Input
                    type="date"
                    value={editEffectiveTo}
                    onChange={(e) => setEditEffectiveTo(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                  <Button onClick={saveEdit} disabled={updating}>
                    {updating ? "Saving..." : "Save"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
