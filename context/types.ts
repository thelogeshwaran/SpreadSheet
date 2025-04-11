export interface CellData {
  id: string;
  content: string;
  computed?: string | number;
  formula?: string;
  references?: string[];
  referencedBy?: string[];
  styling?: CellStyle;
}

export interface CellStyle {
  bold?: boolean;
  italic?: boolean;
  align?: "left" | "center" | "right";
  backgroundColor?: string;
  color?: string;
}

export interface GridData {
  rows: number;
  cols: number;
  cells: Record<string, CellData>;
  history: GridData[];
  historyIndex: number;
}

export interface Action {
  type: ActionType;
  payload: any;
}

export type ActionType =
  | "UPDATE_CELL"
  | "UPDATE_STYLE"
  | "ADD_ROW"
  | "ADD_COLUMN"
  | "UNDO"
  | "REDO"
  | "SET_GRID"
  | "UPDATE_REFERENCES";

export const defaultGridData: GridData = {
  rows: 10,
  cols: 10,
  cells: {},
  history: [],
  historyIndex: -1,
};
