import React, { useState, useEffect, createContext } from "react";

export type Theme = "light" | "dark" | "default" | string;

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicializar o tema diretamente do localStorage ou preferência do sistema
  const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme;
      if (storedTheme) {
        return storedTheme;
      }

      return "dark"; // Se não houver tema armazenado, use o padrão do sistema
    }
    return "dark"; // Fallback para SSR
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Função para detectar o tema do sistema
  const getSystemTheme = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Efeito para atualizar o tema quando as preferências do sistema mudam
  useEffect(() => {
    if (theme === "default") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Função para atualizar a UI quando a preferência do sistema mudar
      const handleSystemThemeChange = () => {
        const root = window.document.documentElement;
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };

      // Aplicar o tema do sistema inicialmente
      handleSystemThemeChange();

      // Adicionar listener para mudanças na preferência do sistema
      mediaQuery.addEventListener("change", handleSystemThemeChange);

      // Limpar o listener quando o componente for desmontado
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, [theme]);

  useEffect(() => {
    // Atualizar a classe no <html> e armazenar o tema
    const root = window.document.documentElement;

    if (theme === "default") {
      // Quando for "default", o tema será gerenciado pelo outro useEffect
      localStorage.setItem("theme", theme);
    } else {
      // Para temas explícitos (light/dark)
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "default") {
      // Se estiver no modo "default", mude para o oposto do tema do sistema
      setTheme(getSystemTheme() === "light" ? "dark" : "light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
