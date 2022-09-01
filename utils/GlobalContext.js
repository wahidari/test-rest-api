import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const [darkMode, setDarkMode] = useState(false);

  // check dark mode to true if theme in local storage is dark 
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // set theme to local storage based on darkMode value : dark or light
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    // set html class to "dark" or "light"
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <GlobalContext.Provider value={
      { darkMode, setDarkMode }
    }>
      {children}
    </GlobalContext.Provider>
  );
};
