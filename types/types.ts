export interface CellData {
  id: string;
  content: string;
  computed?: string | number;
  styling?: CellStyle;
  references?: string[]; // Cells this cell references
  referencedBy?: string[]; // Cells that reference this cell
  formula?: string;
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
  cells: Record<string, CellData>; // key = "A1", "B2", etc.
  history: GridData[];
  historyIndex: number;
}

export interface Action {
  type: string;
  payload: any;
}
