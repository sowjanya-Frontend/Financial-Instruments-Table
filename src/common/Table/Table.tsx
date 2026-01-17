import type { CSSProperties, JSX } from "react";
import tableStyles from "./Table.module.css";

/**
 * Column configuration interface
 *  header - header text to display
 *  field - Property name from the data object
 */
export interface Column<T> {
  header: string;
  field: keyof T;
}

/**
 * Props accepted by the reusable Table component
 * data -  Array of row objects to render
 * columns - Column definitions
 * getRowStyle - Optional callback to apply dynamic styles to an entire row
 * getCellStyle - Optional callback to apply dynamic styles to a specific cell
 * onHeaderClick - Optional callback invoked when a table header is clicked (used for sorting)
 * sortKey - The currently sorted column key
 * sortOrder - The current sort direction ("asc" for ascending, "desc" for descending)
 */
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowStyle?: (row: T) => CSSProperties;
  getCellStyle?: (row: T, column: Column<T>) => CSSProperties;
  onHeaderClick?: (column: Column<T>) => void;
  sortKey?: keyof T;
  sortOrder?: "asc" | "desc";
}

/**
 * Generic Table component
 */
function Table<T>({
  data,
  columns,
  getRowStyle,
  getCellStyle,
  onHeaderClick,
  sortKey,
  sortOrder,
}: TableProps<T>): JSX.Element {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  return (
    <table className={tableStyles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className={`${tableStyles.th} ${
                sortKey === column.field
                  ? sortOrder === "asc"
                    ? tableStyles["sorted-asc"]
                    : tableStyles["sorted-desc"]
                  : ""
              }`}
              key={String(column.field)}
              onClick={() => onHeaderClick?.(column)}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} style={getRowStyle ? getRowStyle(row) : undefined}>
            {columns.map((column) => (
              <td
                className={tableStyles.td}
                key={String(column.field)}
                style={getCellStyle ? getCellStyle(row, column) : undefined}
              >
                {String(row[column.field])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
