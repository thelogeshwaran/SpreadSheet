import React from "react";
import { useGrid } from "../../context/GridContext";
import styles from "./Grid.module.css";

const GridToolbar = () => {
  const { dispatch } = useGrid();

  return (
    <div className={styles.toolbar}>
      <button  onClick={() => dispatch({ type: "ADD_ROW" })}>Add Row</button>
      <button  onClick={() => dispatch({ type: "ADD_COLUMN" })}>
        Add Column
      </button>
      <button  onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
      <button  onClick={() => dispatch({ type: "REDO" })}>Redo</button>
    </div>
  );
};

export default GridToolbar;
