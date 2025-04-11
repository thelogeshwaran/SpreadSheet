export const evaluateFormula = (formula: string, getCellValue: (id: string) => string | number): number | string => {
    try {
      const expression = formula
        .replace(/^=/, "")
        .replace(/[A-Z]+\d+/g, (match) => {
          const val = getCellValue(match);
          return val !== undefined ? String(val) : "0";
        });
      return eval(expression); // ⚠️ Replace with math.js or a safer eval for production
    } catch (e) {
      return "ERROR";
    }
  };
  