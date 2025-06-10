import { useEffect, useState } from "react";

export function useDarkMode(): boolean {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);

    // Verifica a preferência inicial
    setIsDarkMode(mediaQuery.matches);

    // Adiciona listener para mudanças
    mediaQuery.addEventListener("change", handleChange);

    // Limpeza do listener ao desmontar
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDarkMode;
}
