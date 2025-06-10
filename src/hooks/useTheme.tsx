import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado por volta do ThemeProvider");
  }

  return context;
};
