import React, { createContext } from 'react'
import { getTheme } from '../providers/ThemeProvider';

export type ThemeContextType = "light" | "dark" | "funny";

type Themes = {
  dark: string,
  light: string,
  funny: string,
}

export const themes = {
  dark: 'dark',
  light: 'light',
  funny: "funny",
}
export const ThemeContext = createContext(getTheme)