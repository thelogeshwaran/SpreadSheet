"use client";
import { GridData } from "../types/types";

const STORAGE_KEY = "spreadsheet_data";

export const saveToStorage = (data: GridData) => {
  if (typeof window !== "undefined") {
    // Create a clean state object without history
    const cleanState = {
      rows: data.rows,
      cols: data.cols,
      cells: data.cells,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
  }
};

export const loadFromStorage = (): GridData | null => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Add history to the loaded state
      return {
        ...parsed,
        history: [],
        historyIndex: -1,
      };
    }
  }
  return null;
};
