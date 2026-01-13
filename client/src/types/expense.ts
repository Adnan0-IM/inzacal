export type Expense = {
  id: string;
  createdAt: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  occurredOn: string;
  organizationId?: string;
  userId?: string | null;
};

export type CreateExpenseInput = {
  description: string;
  category: string;
  amount: number;
  currency?: string;
  occurredOn: string;
};
