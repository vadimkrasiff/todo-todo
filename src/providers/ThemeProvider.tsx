import React, { useEffect, useState, createContext } from 'react'
import { themes, ThemeContextType, ThemeContext } from '../contexts/ThemeContext'

type LayoutProps = {
  children: React.ReactElement; // или `JSX.Element`
};




export const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`

  if (Object.values(themes).includes(theme)) return { theme }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  const userMedia1 = window.matchMedia('(prefers-color-scheme: funny)');
  if (userMedia.matches) return { theme: themes.light };
  if (userMedia1.matches) return { theme: themes.funny };
  return { theme: themes.dark };
};



const ThemeProvider: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeContextType>(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme.theme;
    localStorage.setItem('theme', theme.theme);
  }, [theme])
  const valueTheme = theme.theme;
  return <ThemeContext.Provider value={{ theme: valueTheme, setTheme }}>
    {children}
  </ThemeContext.Provider>
};

export default ThemeProvider;