// Shared type for financial instruments
export interface FinancialInstrument {
  ticker: string;
  price: number;
  assetClass: string;
}

export type SortKey = "ticker" | "price" | "assetClass";
export type SortOrder = "asc" | "desc";
