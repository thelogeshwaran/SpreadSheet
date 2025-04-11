import React, { useState } from "react";
import { useGrid } from "../../context/GridContext";
import GridToolbar from "./GridToolbar";
import GridHeader from "./GridHeader";
import GridRow from "./GridRow";
import styles from "./Grid.module.css";

const GridContainer = () => {
  const { state } = useGrid();
  const { rows, cols } = state;
  const [activeCell, setActiveCell] = useState<string | null>(null);

  const handleCellClick = (id: string) => {
    setActiveCell(id);
  };

  return (
    <div className={styles.gridContainer}>
      <GridToolbar />
      <div className={styles.grid}>
        <GridHeader cols={cols} />
        {Array.from({ length: rows }, (_, i) => (
          <GridRow
            key={i}
            rowIndex={i}
            cols={cols}
            activeCell={activeCell}
            onCellClick={handleCellClick}
            setActiveCell={setActiveCell}
          />
        ))}
      </div>
    </div>
  );
};

export default GridContainer;
