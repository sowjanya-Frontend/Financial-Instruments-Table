import { useMemo, useState } from "react";
import Table, { type Column } from "../../common/Table/Table";
import instrumentsData from "../../data/instruments.json";
import type {
  FinancialInstrument,
  SortKey,
  SortOrder,
} from "../../types/types";
import styles from "./FinancialTable.module.css";
import { AssetClassColors, PriceColors } from "../../constants/colors";
import { sortInstumentsBySortKey } from "../../utils/sorting";

/**
 * Financial Table component
 */
function FinancialTable() {
  const tableColumns = useMemo<Column<FinancialInstrument>[]>(
    () => [
      { header: "Ticker", field: "ticker" },
      { header: "Price", field: "price" },
      { header: "Asset Class", field: "assetClass" },
    ],
    []
  );

  const [sortKey, setSortKey] = useState<SortKey>("assetClass");

  const [sortOrder, setSortOrder] = useState<SortOrder>("asc"); // default ascending

  const sortedData = useMemo(
    () => sortInstumentsBySortKey(instrumentsData, sortKey, sortOrder),
    [sortKey, sortOrder]
  );

  // Row background based on Asset Class
  const getRowStyle = (row: FinancialInstrument) => ({
    backgroundColor: AssetClassColors[row.assetClass] || "#801919ff",
  });

  // Price coloring: blue if positive, red if negative
  const getCellStyle = (
    row: FinancialInstrument,
    column: Column<FinancialInstrument>
  ) => {
    if (column.field === "price") {
      return {
        color: row.price >= 0 ? PriceColors.positive : PriceColors.negative,
      };
    }
    return {};
  };

  return (
    <div className="container">
      <div className={styles.tableWrapper}>
        <h5 className="text-center m-2">Financial Instruments Table</h5>
        <div className={styles.tableContainer}>
          <Table
            data={sortedData}
            columns={tableColumns}
            getRowStyle={getRowStyle}
            getCellStyle={getCellStyle}
            sortKey={sortKey}
            onHeaderClick={(column) => {
              const columnKey = column.field as SortKey;
              if (sortKey === columnKey) {
                // toggle direction
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              } else {
                setSortKey(columnKey);
                setSortOrder("asc");
              }
            }}
            sortOrder={sortOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default FinancialTable;
