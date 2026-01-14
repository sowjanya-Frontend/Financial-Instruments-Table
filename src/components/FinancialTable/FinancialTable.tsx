import { useMemo } from "react";
import Table, { type Column } from "../../common/Table/Table";
import instrumentsData from "../../data/instruments.json";
import type { FinancialInstrument } from "../../types/types";
import styles from "./FinancialTable.module.css";

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
  return (
    <div className="container">
      <div className={styles.tableWrapper}>
        <h5 className="text-center m-2">Financial Instruments Table</h5>
        <div className={styles.tableContainer}>
          <Table data={instrumentsData} columns={tableColumns} />
        </div>
      </div>
    </div>
  );
}

export default FinancialTable;
