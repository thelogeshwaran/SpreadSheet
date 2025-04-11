import React from "react";
import GridCell from "./GridCell";
import styles from "./Grid.module.css";

const GridRow = ({
  rowIndex,
  cols,
  activeCell,
  onCellClick,
  setActiveCell,
}: {
  rowIndex: number;
  cols: number;
  activeCell: string | null;
  onCellClick: (id: string) => void;
  setActiveCell: (id: string) => void;
}) => {
  return (
    <div className={styles.row}>
      <div className={styles.rowHeader}>{rowIndex + 1}</div>
      {Array.from({ length: cols }, (_, colIndex) => (
        <GridCell
          key={`${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`}
          id={`${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`}
          isActive={
            activeCell ===
            `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`
          }
          onCellClick={onCellClick}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
        />
      ))}
    </div>
  );
};

export default GridRow;
