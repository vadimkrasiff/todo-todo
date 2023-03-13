import React, { useEffect, useState } from 'react'
import { ThemeContext, themes, ThemeContextType } from '../contexts/ThemeContext'

// type LayoutProps = {
//     children: React.ReactElement; // или `JSX.Element`
//   };

export const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`
  
  if (Object.values(themes).includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)')
  const userMedia1 = window.matchMedia('(prefers-color-scheme: funny)')
  if (userMedia.matches) return themes.light
  if (userMedia1.matches) return themes.funny
  return themes.dark
}



const ThemeProvider = ({ children}) => {
  const [ theme, setTheme ] = useState(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider