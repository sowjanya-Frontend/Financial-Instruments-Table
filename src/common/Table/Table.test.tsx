import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Table, { type Column } from "./Table";
import { PriceColors } from "../../constants/colors";

interface TestRow {
  id: number;
  name: string;
}

const columns: Column<TestRow>[] = [
  { header: "ID", field: "id" },
  { header: "Name", field: "name" },
];

const data: TestRow[] = [
  { id: 1, name: "Alpha" },
  { id: 2, name: "Beta" },
];

describe("Table component", () => {
  it("Renders headers correctly", () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("Renders rows correctly", () => {
    render(<Table data={data} columns={columns} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // 2 data rows + 1 header row
  });

  it("Calls onHeaderClick when header is clicked", () => {
    const onClick = vi.fn();
    render(<Table data={data} columns={columns} onHeaderClick={onClick} />);
    fireEvent.click(screen.getByText("Name"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(columns[1]);
  });

  it("Applies cell styles correctly", () => {
    // Apply color based on id for testing
    const getCellStyle = (row: TestRow, column: Column<TestRow>) => {
      if (column.field === "name") {
        return {
          color: row.id === 1 ? PriceColors.positive : PriceColors.negative,
        };
      }
      return {};
    };

    render(<Table data={data} columns={columns} getCellStyle={getCellStyle} />);

    const rows = screen.getAllByRole("row").slice(1) as HTMLTableRowElement[];

    // Check styles using constants
    expect(rows[0].cells[1]).toHaveStyle({ color: PriceColors.positive }); // Alpha
    expect(rows[1].cells[1]).toHaveStyle({ color: PriceColors.negative }); // Beta
  });
});
