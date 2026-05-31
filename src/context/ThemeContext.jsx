import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function readTheme() {
  try {
    return localStorage.getItem("ss-theme") || "dark";
  } catch {
    return "dark";
  }
}

function writeTheme(theme) {
  try {
    localStorage.setItem("ss-theme", theme);
  } catch {
    // Ignore storage failures so the app still renders.
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    writeTheme(theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
