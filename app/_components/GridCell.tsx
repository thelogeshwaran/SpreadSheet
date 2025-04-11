import React, { useState, useRef, useEffect } from "react";
import { useGrid } from "../../context/GridContext";
import styles from "./Grid.module.css";

const GridCell = ({
  id,
  isActive,
  onCellClick,
  activeCell,
  setActiveCell,
}: {
  id: string;
  isActive: boolean;
  onCellClick: (id: string) => void;
  activeCell: string | null;
  setActiveCell: (id: string) => void;
}) => {
  const { state, dispatch } = useGrid();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cell = state.cells[id] || { content: "", formula: "" };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    onCellClick(id);
    setIsEditing(true);
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeCell) return;

    const value = e.target.value;
    const isFormula = value.startsWith("=");

    dispatch({
      type: "UPDATE_CELL",
      payload: {
        id: activeCell,
        content: value,
        formula: isFormula ? value.slice(1) : undefined,
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!activeCell) return;

    const match = activeCell.match(/([A-Z]+)(\d+)/);

    if (!match) return;

    const colLetter = match[1];
    const rowNumber = match[2];
    const colIndex = colLetter.charCodeAt(0) - 65;
    const rowIndex = parseInt(rowNumber, 10) - 1;

    switch (e.key) {
      
      case "Enter":
        setIsEditing(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (rowIndex > 0) {
          setActiveCell(`${colLetter}${rowIndex}`);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (rowIndex < state.rows - 1) {
          setActiveCell(`${colLetter}${rowIndex + 2}`);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (colIndex > 0) {
          setActiveCell(`${String.fromCharCode(colIndex + 64)}${rowNumber}`);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (colIndex < state.cols - 1) {
          setActiveCell(`${String.fromCharCode(colIndex + 66)}${rowNumber}`);
        }
        break;
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const displayValue =
    cell?.computed !== undefined && cell?.formula !== undefined
      ? cell.computed
      : cell?.content || "";

      const isReferenced = cell?.referencedBy?.includes(activeCell || "");

  return (
    <div
      className={`${styles.cell} ${isActive ? styles.active : ""} ${
        isReferenced ? styles.referenced : ""
      }`}
      onClick={handleClick}
      tabIndex={0}
    >
      { isActive ? (
        <input
          ref={inputRef}
          type="text"
          value={cell?.content || ""}
          onChange={handleCellChange}
          onBlur={handleBlur}
          className={styles.input}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span>{displayValue}</span>
      )}
    </div>
  );
};

export default GridCell;
