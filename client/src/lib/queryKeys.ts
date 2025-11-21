export const qk = {
  salesSummary: (orgId?: string, period?: string) => [
    "sales-summary",
    orgId ?? "no-org",
    period ?? "monthly",
  ],
};
