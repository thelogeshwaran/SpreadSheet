"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useRef,
} from "react";
import { GridData, defaultGridData } from "./types";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { createGridReducer } from "./reducers/gridReducer";

const GridContext = createContext<{
  state: GridData;
  dispatch: React.Dispatch<any>;
} | null>(null);

export const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const dispatchRef = useRef<React.Dispatch<any>>(() => {});
  const [state, dispatch] = useReducer(
    createGridReducer((action) => dispatchRef.current?.(action)),
    defaultGridData
  );
  dispatchRef.current = dispatch;

  useEffect(() => {
    setIsClient(true);
    const savedData = loadFromStorage();
    if (savedData) {
      dispatch({ type: "SET_GRID", payload: savedData });
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      saveToStorage(state);
    }
  }, [state, isClient]);

  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
};
