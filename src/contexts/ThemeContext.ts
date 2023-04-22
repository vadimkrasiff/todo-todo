import React, { createContext } from 'react'
import { getTheme } from '../providers/ThemeProvider';

export interface ThemeContextType {
  theme:string;
  setTheme?:React.Dispatch<React.SetStateAction<ThemeContextType>>;
};

let theme = getTheme;

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
export const ThemeContext = createContext<ThemeContextType| (() => ThemeContextType)| React.Dispatch<React.SetStateAction<ThemeContextType>>>(getTheme);