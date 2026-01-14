import { useMemo } from "react";
import Table, { type Column } from "../../common/Table/Table";
import instrumentsData from "../../data/instruments.json";
import type { FinancialInstrument } from "../../types/types";
import styles from "./FinancialTable.module.css";
import { AssetClassColors, PriceColors } from "../../constants/colors";

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
            data={instrumentsData}
            columns={tableColumns}
            getRowStyle={getRowStyle}
            getCellStyle={getCellStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default FinancialTable;
