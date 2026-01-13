export type TaxRule = {
  id: string;
  organizationId?: string;
  jurisdiction: string;
  type: string;
  rate: number;
  effectiveFrom: string;
  effectiveTo?: string | null;
  createdAt: string;
};

export type CreateTaxRuleInput = {
  jurisdiction: string;
  type: string;
  rate: number;
  effectiveFrom: string;
  effectiveTo?: string | null;
};

export type UpdateTaxRuleInput = Partial<CreateTaxRuleInput>;
