import type { CSSProperties, JSX } from "react";

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
 */
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowStyle?: (row: T) => CSSProperties;
  getCellStyle?: (row: T, column: Column<T>) => CSSProperties;
}

/**
 * Generic Table component
 * Responsible ONLY for rendering table structure
 */
function Table<T>({
  data,
  columns,
  getRowStyle,
  getCellStyle,
}: TableProps<T>): JSX.Element {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.field)}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} style={getRowStyle ? getRowStyle(row) : undefined}>
            {columns.map((column) => {
              // Merge row background and cell style
              const rowStyle = getRowStyle ? getRowStyle(row) : {};
              const cellStyle = getCellStyle ? getCellStyle(row, column) : {};
              return (
                <td
                  key={String(column.field)}
                  style={{ ...rowStyle, ...cellStyle }}
                >
                  {row[column.field] != null ? String(row[column.field]) : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
