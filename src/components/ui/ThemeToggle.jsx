// === THEME TOGGLE BUTTON ===
// Schöner Button zum Umschalten zwischen Dark/Light Mode

import React from 'react'
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-6 rounded-full transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/25'
        }
        hover:scale-105 active:scale-95
        ${className}
      `}
      title={`Zu ${isDark ? 'Light' : 'Dark'} Mode wechseln`}
      aria-label={`Zu ${isDark ? 'Light' : 'Dark'} Mode wechseln`}
    >
      {/* Slider */}
      <div
        className={`
          absolute w-5 h-5 rounded-full transition-all duration-300 ease-in-out
          transform flex items-center justify-center text-xs
          ${isDark 
            ? 'translate-x-3 bg-white text-purple-600' 
            : '-translate-x-3 bg-white text-orange-600'
          }
        `}
      >
        {isDark ? '🌙' : '☀️'}
      </div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 text-xs">
        <span className={`transition-opacity ${isDark ? 'opacity-30' : 'opacity-70'}`}>
          ☀️
        </span>
        <span className={`transition-opacity ${isDark ? 'opacity-70' : 'opacity-30'}`}>
          🌙
        </span>
      </div>
    </button>
  )
}

export default ThemeToggle