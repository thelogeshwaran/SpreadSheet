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
    const references = cell.references || [];

    // Replace each reference with its value
    references.forEach((ref) => {
      const refCell = grid.cells[ref];
      let value: string | number = refCell?.content || "0";

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
  dispatch: Dispatch<Action>
): GridData => {
  const newState = { ...state, cells: { ...state.cells } };

  // First, update all cells that have formulas
  Object.values(newState.cells).forEach((cell) => {
    if (cell.formula) {
      const computed = computeCellValue(cell, newState, dispatch);
      newState.cells[cell.id] = {
        ...cell,
        computed,
      };
    }
  });

  // Then, update cells that reference the changed cells
  const updatedCells = new Set<string>();
  Object.values(newState.cells).forEach((cell) => {
    if (cell.referencedBy?.length) {
      cell.referencedBy.forEach((refId) => {
        if (!updatedCells.has(refId)) {
          const refCell = newState.cells[refId];
          if (refCell?.formula) {
            const computed = computeCellValue(refCell, newState, dispatch);
            newState.cells[refId] = {
              ...refCell,
              computed,
            };
            updatedCells.add(refId);
          }
        }
      });
    }
  });

  return newState;
};
