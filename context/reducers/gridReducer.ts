import { Dispatch } from "react";
import { GridData, Action } from "../types";
import { extractReferences, updateComputedValues } from "../utils/formula";

export const createGridReducer = (dispatch: Dispatch<Action>) => {
  return (state: GridData, action: Action): GridData => {
    let newState: GridData;

    switch (action.type) {
      case "UPDATE_CELL": {
        const { id, content, formula } = action.payload;
        const cell = state.cells[id] || {
          id,
          content: "",
          references: [],
          referencedBy: [],
        };

        // Clear old references
        const oldReferences = cell.references || [];
        oldReferences.forEach((ref) => {
          const refCell = state.cells[ref];
          if (refCell) {
            refCell.referencedBy = refCell.referencedBy?.filter(
              (refId) => refId !== id
            );
          }
        });

        // Extract new references
        const newReferences = formula ? extractReferences(formula) : [];

        newState = {
          ...state,
          cells: {
            ...state.cells,
            [id]: {
              ...cell,
              content,
              formula,
              references: newReferences,
            },
          },
        };

        // Update referencedBy for new references
        newReferences.forEach((ref) => {
          const refCell = newState.cells[ref] || {
            id: ref,
            content: "",
            references: [],
            referencedBy: [],
          };
          if (!refCell.referencedBy?.includes(id)) {
            refCell.referencedBy = [...(refCell.referencedBy || []), id];
          }
          newState.cells[ref] = refCell;
        });

        newState = updateComputedValues(newState, dispatch);
        break;
      }

      case "UPDATE_STYLE": {
        const { id, styling } = action.payload;
        newState = {
          ...state,
          cells: {
            ...state.cells,
            [id]: {
              ...state.cells[id],
              styling,
            },
          },
        };
        break;
      }

      case "UPDATE_REFERENCES": {
        const { id, references } = action.payload;
        const cell = state.cells[id];
        if (!cell) return state;

        newState = {
          ...state,
          cells: {
            ...state.cells,
            [id]: {
              ...cell,
              referencedBy: [...(cell.referencedBy || []), references],
            },
          },
        };
        break;
      }

      case "ADD_ROW": {
        newState = {
          ...state,
          rows: state.rows + 1,
        };
        break;
      }

      case "ADD_COLUMN": {
        newState = {
          ...state,
          cols: state.cols + 1,
        };
        break;
      }

      case "UNDO": {
        if (state.historyIndex > 0) {
          return {
            ...state.history[state.historyIndex - 1],
            history: state.history,
            historyIndex: state.historyIndex - 1,
          };
        }
        return state;
      }

      case "REDO": {
        if (state.historyIndex < state.history.length - 1) {
          return {
            ...state.history[state.historyIndex + 1],
            history: state.history,
            historyIndex: state.historyIndex + 1,
          };
        }
        return state;
      }

      case "SET_GRID": {
        return action.payload;
      }

      default:
        return state;
    }

    // Add to history
    newState.history = [
      ...state.history.slice(0, state.historyIndex + 1),
      newState,
    ];
    newState.historyIndex = newState.history.length - 1;

    return newState;
  };
};
