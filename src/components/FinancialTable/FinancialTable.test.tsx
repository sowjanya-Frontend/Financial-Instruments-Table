import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FinancialTable from "./FinancialTable";
import instrumentsData from "../../data/instruments.json";
import { PriceColors } from "../../constants/colors";

describe("FinancialTable Component", () => {
  it("Renders all rows from instrumentsData", () => {
    render(<FinancialTable />);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(instrumentsData.length + 1); // +1 for header
  });

  it("Renders header columns correctly", () => {
    render(<FinancialTable />);

    expect(screen.getByText("Ticker")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Asset Class")).toBeInTheDocument();
  });

  it("Clicking on Ticker header sorts by ticker ascending and toggles desc", () => {
    render(<FinancialTable />);

    const tickerHeader = screen.getByText("Ticker");

    // First click → ascending
    fireEvent.click(tickerHeader);
    const firstRowAsc = screen.getAllByRole("row")[1] as HTMLTableRowElement;
    expect(firstRowAsc.cells[0].textContent).toBe("ALPHA"); // Alphabetical first

    // Second click → descending
    fireEvent.click(tickerHeader);
    const firstRowDesc = screen.getAllByRole("row")[1] as HTMLTableRowElement;
    expect(firstRowDesc.cells[0].textContent).toBe("ZETA"); // Alphabetical last
  });

  it("Price cells have correct color based on value", () => {
    render(<FinancialTable />);

    const rows = screen.getAllByRole("row").slice(1); // skip header
    rows.forEach((row) => {
      const tableRow = row as HTMLTableRowElement;
      const priceCell = tableRow.cells[1]; // price is second column
      const price = Number(priceCell.textContent);
      if (price >= 0) {
        expect(priceCell).toHaveStyle(`color: ${PriceColors.positive}`);
      } else {
        expect(priceCell).toHaveStyle(`color: ${PriceColors.negative}`);
      }
    });
  });
});
