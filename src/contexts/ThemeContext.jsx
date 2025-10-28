// === THEME CONTEXT - DARK/LIGHT MODE ===
// Globaler Context für Theme-Management

import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // Theme aus localStorage laden oder default 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('melting-pott-theme')
    return saved || 'dark'
  })

  // Theme in localStorage speichern
  useEffect(() => {
    localStorage.setItem('melting-pott-theme', theme)
    
    // CSS-Klasse auf html-Element setzen
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext