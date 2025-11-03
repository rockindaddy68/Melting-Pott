// === THEME CONTEXT - SICHERES DARK/LIGHT MODE SYSTEM ===
// Diese Context-API verwaltet das Dark/Light Mode System ohne localStorage-Probleme
// Verwendet CSS Custom Properties für bessere Performance und SSR-Kompatibilität

import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme Context erstellen
const ThemeContext = createContext();

// Custom Hook für Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme muss innerhalb von ThemeProvider verwendet werden');
  }
  return context;
};

// Theme Provider Komponente
export const ThemeProvider = ({ children }) => {
  // Initial Theme State - standardmäßig 'dark' (wie bisher)
  const [theme, setTheme] = useState('dark');
  const [isInitialized, setIsInitialized] = useState(false);

  // Theme initialisieren beim ersten Laden
  useEffect(() => {
    try {
      // Versuche Theme aus localStorage zu laden (mit Fehlerbehandlung)
      const savedTheme = localStorage.getItem('ruhrpott-theme');
      if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
        setTheme(savedTheme);
      }
      
      // System-Präferenz prüfen falls kein gespeichertes Theme
      if (!savedTheme) {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      // Bei localStorage-Problemen: Fallback zu 'dark'
      console.warn('Theme localStorage error, using dark mode:', error);
      setTheme('dark');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Theme wechseln
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Sicher in localStorage speichern
    try {
      localStorage.setItem('ruhrpott-theme', newTheme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error);
    }
  };

  // Theme direkt setzen
  const setThemeMode = (newTheme) => {
    if (['dark', 'light'].includes(newTheme)) {
      setTheme(newTheme);
      try {
        localStorage.setItem('ruhrpott-theme', newTheme);
      } catch (error) {
        console.warn('Could not save theme to localStorage:', error);
      }
    }
  };

  // Theme direkt am HTML-Element und Body setzen
  useEffect(() => {
    if (!isInitialized) return;

    const html = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
      body.style.backgroundColor = '#000000';
      body.style.color = '#ffffff';
      body.className = 'bg-black text-white min-h-screen transition-colors duration-300';
    } else {
      html.classList.add('light');  
      html.classList.remove('dark');
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#1f2937';
      body.className = 'bg-white text-gray-800 min-h-screen transition-colors duration-300';
    }
  }, [theme, isInitialized]);

  // System Theme Change Detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Nur System-Theme verwenden wenn kein manueller Override gesetzt
      try {
        const savedTheme = localStorage.getItem('ruhrpott-theme');
        if (!savedTheme) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        // Bei localStorage-Problemen ignorieren
      }
    };

    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, []);

  const contextValue = {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isInitialized
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;