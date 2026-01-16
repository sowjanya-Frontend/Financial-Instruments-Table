import type { FinancialInstrument, SortKey, SortOrder } from "../types/types";

const assetClassOrder: Record<string, number> = {
  Equities: 0,
  Macro: 1,
  Credit: 2,
};

/**
 * Returns a new sorted array according to the sortKey and sort order
 */
export function sortInstumentsBySortKey(
  data: FinancialInstrument[],
  sortKey: SortKey,
  order: SortOrder = "asc"
): FinancialInstrument[] {
  const sorted = [...data].sort((a, b) => {
    switch (sortKey) {
      case "assetClass":
        return assetClassOrder[a.assetClass] - assetClassOrder[b.assetClass];
      case "price":
        return b.price - a.price; // descending by default
      case "ticker":
        return a.ticker.localeCompare(b.ticker);
      default:
        return 0;
    }
  });

  return order === "asc" ? sorted : sorted.reverse();
}
