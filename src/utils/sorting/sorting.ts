import type {
  FinancialInstrument,
  SortKey,
  SortOrder,
} from "../../types/types";

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
    let comparison = 0;
    switch (sortKey) {
      case "assetClass":
        comparison =
          assetClassOrder[a.assetClass] - assetClassOrder[b.assetClass];
        break;
      case "price":
        comparison = a.price - b.price; // ascending by default
        break;
      case "ticker":
        comparison = a.ticker.localeCompare(b.ticker);
        break;
    }
    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}
