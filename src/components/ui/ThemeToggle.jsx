// === THEME TOGGLE COMPONENT ===
// Schöner Toggle-Switch für Dark/Light Mode mit Ruhrpott-Design

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isInitialized } = useTheme();

  // Während Initialisierung: Skeleton anzeigen
  if (!isInitialized) {
    return (
      <div className="w-14 h-8 bg-gray-300 animate-pulse rounded-full"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
        ${theme === 'dark' 
          ? 'bg-gray-800 focus:ring-offset-gray-900' 
          : 'bg-orange-200 focus:ring-offset-white'
        }
        ${className}
      `}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Kreis */}
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full transition-all duration-300 shadow-lg
          ${theme === 'dark' 
            ? 'translate-x-1 bg-gray-600' 
            : 'translate-x-7 bg-orange-500'
          }
        `}
      >
        {/* Icon im Kreis */}
        <span className="flex items-center justify-center h-full text-xs
          ${isDark 
            ? 'translate-x-3 bg-white text-purple-600' 
            : '-translate-x-3 bg-white text-orange-600'
          }
        ">
          {theme === 'dark' ? (
            // Mond-Icon für Dark Mode
            <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
            </svg>
          ) : (
            // Sonne-Icon für Light Mode
            <svg className="w-3 h-3 text-orange-100" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </span>
      </span>

      {/* Hintergrund-Gradient für besseres Design */}
      <span className="absolute inset-0 rounded-full">
        <span className={`
          absolute inset-y-1 left-1 w-6 h-6 rounded-full transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-gray-700 to-gray-600 shadow-inner' 
            : 'bg-gradient-to-r from-orange-400 to-orange-600 shadow-inner translate-x-6'
          }
        `}></span>
      </span>
    </button>
  );
};

export default ThemeToggle;