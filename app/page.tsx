"use client";
import { GridProvider } from "../context/GridContext";
import GridContainer from "./_components/GridContainer";
import styles from "./_components/Grid.module.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GridProvider>
        <div className={styles.title}>Spreadsheet</div>
        <GridContainer />
      </GridProvider>
    </main>
  );
}
