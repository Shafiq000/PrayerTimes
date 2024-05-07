import React, { createContext, useState, useEffect, useContext } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const authContext = createContext(null);
export const useAuthContext = () => useContext(authContext);
const authContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light"); 
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("themeMode");
      if (storedTheme) {
        setThemeMode(storedTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        if (systemTheme) {
          setThemeMode(systemTheme);
        } else {
          setThemeMode("light"); // Default to "light" if unable to determine system theme
        }
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeMode", themeMode);
    // setBackgroundColor(themeMode === "dark" ? "#1C1C22" : "#fff");
  }, [themeMode]);

  const toggleThemeMode = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newThemeMode);
  };

  const value = {
    themeMode,
    toggleThemeMode,
    // backgroundColor,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default authContextProvider;
