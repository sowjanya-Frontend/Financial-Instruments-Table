import { describe, expect, it } from "vitest";
import type { FinancialInstrument } from "../../types/types";
import { sortInstumentsBySortKey } from "./sorting";

describe("sortInstumentsBySortKey", () => {
  const mockData: FinancialInstrument[] = [
    {
      ticker: "BETA",
      price: 100,
      assetClass: "Credit",
    },
    {
      ticker: "ALPHA",
      price: -50,
      assetClass: "Equities",
    },
    {
      ticker: "DELTA",
      price: 200,
      assetClass: "Macro",
    },
  ];

  it("Sort by ticker alphabetically - ascending", () => {
    const result = sortInstumentsBySortKey(mockData, "ticker", "asc");
    expect(result.map((item) => item.ticker)).toEqual([
      "ALPHA",
      "BETA",
      "DELTA",
    ]);
  });

  it("Sort by price descending", () => {
    const result = sortInstumentsBySortKey(mockData, "price", "desc");

    expect(result.map((item) => item.price)).toEqual([200, 100, -50]);
  });

  it("Sort by asset class with Equities first, then Macro and Credit last", () => {
    const result = sortInstumentsBySortKey(mockData, "assetClass", "asc");
    expect(result.map((item) => item.assetClass)).toEqual([
      "Equities",
      "Macro",
      "Credit",
    ]);
  });
});
