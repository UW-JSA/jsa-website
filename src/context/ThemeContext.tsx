"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { SupportedLanguage } from "@/interfaces/SupportedLanguage";

type ThemeContextType = {
  language: SupportedLanguage;
  toggleLanguage: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  language: "en",
  toggleLanguage: function (): void {
    throw new Error("Function not implemented.");
  }
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "ja" : "en"));
  const value = useMemo(() => ({ language, toggleLanguage }), [language]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
