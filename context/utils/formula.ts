import { Dispatch } from "react";
import { GridData, CellData, Action } from "../types";

export const extractReferences = (formula: string): string[] => {
  if (!formula) return [];
  const matches = formula.toUpperCase().match(/[A-Z]+\d+/g) || [];
  return matches;
};

export const computeCellValue = (
  cell: CellData,
  grid: GridData,
  dispatch: Dispatch<Action>
): string | number => {
  if (!cell.formula) {
    const numValue = Number(cell.content);
    return !isNaN(numValue) ? numValue : cell.content;
  }

  try {
    let formula = cell.formula;
    console.log("formula", cell);

    // Replace each reference with its value
    cell.references?.forEach((ref) => {
      const refCell = grid.cells[ref];
      let value: string | number = refCell?.content || "0";

      dispatch({
        type: "UPDATE_REFERENCES",
        payload: { id: ref, references: cell.id },
      });
      if (refCell?.formula) {
        value = computeCellValue(refCell, grid, dispatch);
      }

      const numValue = Number(value);
      const replacement =
        !isNaN(numValue) && value !== null ? numValue.toString() : "0";
      formula = formula.replace(new RegExp(ref, "gi"), replacement);
    });

    const result = new Function("return " + formula)();
    return isNaN(result) ? "#ERROR" : result;
  } catch (e) {
    return "#ERROR";
  }
};

export const updateComputedValues = (
  state: GridData,
  dispatch: any
): GridData => {
  const newState = { ...state };

  Object.keys(newState.cells).forEach((cellId) => {
    const cell = newState.cells[cellId];
    if (cell) {
      cell.computed = computeCellValue(cell, newState, dispatch);
    }
  });

  return newState;
};
