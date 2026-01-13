export type FxRate = {
  id: string;
  base: string;
  quote: string;
  rate: number;
  fetchedAt: string;
};

export type RefreshFxResponse = {
  success?: boolean;
};
