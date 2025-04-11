import React from "react";
import styles from "./Grid.module.css";

const GridHeader = ({ cols }: { cols: number }) => {
  return (
    <div className={styles.headerRow}>
      <div className={styles.corner}></div>
      {Array.from({ length: cols }, (_, i) => (
        <div key={`header-${i}`} className={styles.header}>
          {String.fromCharCode(65 + i)}
        </div>
      ))}
    </div>
  );
};

export default GridHeader;