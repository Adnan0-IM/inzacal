export type Organization = {
  id: string;
  name: string;
  slug: string;
  currency: string;
  address: string;
  logo?: string | null;
  taxId?: string | null;
  phone?: string | null;
  website?: string | null;
  industry?: string | null;
  timezone?: string | null;
  fiscalYearStart?: number | null; // 1-12
};
