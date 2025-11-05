// === MELTING POTT - HEADER/NAVIGATIONSLEISTE ===
// Diese Komponente stellt die obere Navigationsleiste der Website dar
// Funktionen: Navigation, Sprachauswahl, Benutzer-Authentifizierung
// REFACTORED: Nutzt jetzt den zentralen TranslationService

import React, { useState, useEffect } from 'react'
import { AuthModal, MemberDashboard } from '../auth' // Anmelde-Modal und Benutzer-Dashboard
import userService from '../../services/userService'  // Service für Benutzerverwaltung
import { useTheme } from '../../contexts/ThemeContext' // Theme Context
import { useTranslation } from '../../hooks/useTranslation' // Zentralisierte Übersetzungen

const Header = ({ selectedLanguage, setSelectedLanguage }) => {
  // === STATE MANAGEMENT FÜR HEADER ===
  const { theme } = useTheme(); // Theme Context
  
  // Anmelde-Modal ein/ausblenden
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  // Benutzer-Dashboard ein/ausblenden (nach erfolgreichem Login)
  const [showMemberDashboard, setShowMemberDashboard] = useState(false)
  
  // Aktuell angemeldeter Benutzer (null = nicht angemeldet)
  const [currentUser, setCurrentUser] = useState(null)
  
  // Anmelde-Modus: 'login' oder 'register'
  const [authMode, setAuthMode] = useState('login')

  // === INITIALISIERUNG: PRÜFE OB BENUTZER BEREITS ANGEMELDET ===
  useEffect(() => {
    // Beim Laden der Komponente prüfen ob eine aktive Session existiert
    const user = userService.getCurrentUser()
    setCurrentUser(user) // Benutzer-State aktualisieren
  }, []) // Nur einmal beim ersten Rendern ausführen

  // === EVENT-HANDLER FÜR BENUTZER-AUTHENTIFIZIERUNG ===
  
  // Wird nach erfolgreichem Login/Registrierung ausgeführt
  const handleAuthSuccess = (user) => {
    setCurrentUser(user)      // Benutzer im State speichern
    setShowAuthModal(false)   // Anmelde-Modal schließen
    // Optional: Willkommensnachricht oder Weiterleitung
  }

  // Benutzer abmelden
  const handleLogout = () => {
    userService.logout()         // Session im userService beenden
    setCurrentUser(null)         // Benutzer-State zurücksetzen
    setShowMemberDashboard(false) // Dashboard schließen
  }

  // Anmelde-Modal öffnen (Login oder Registrierung)
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)        // Modus setzen: 'login' oder 'register'
    setShowAuthModal(true)   // Modal anzeigen
  }

  // === ZENTRALISIERTE ÜBERSETZUNGEN ===
  // Nutze den refactorierten useTranslation Hook mit TranslationService
  const { 
    language, 
    navigation, 
    common, 
    changeLanguage, 
    availableLanguages 
  } = useTranslation(selectedLanguage)

  // Synchronisiere mit dem Parent-State für Kompatibilität
  useEffect(() => {
    if (selectedLanguage !== language) {
      changeLanguage(selectedLanguage)
    }
  }, [selectedLanguage, language, changeLanguage])

  const handleLanguageChange = (newLang) => {
    changeLanguage(newLang)
    setSelectedLanguage(newLang)
  }

  // Entferne das duplicate translations-Objekt - nutze jetzt zentralen Service!

  return (
    <>
      <header className={`shadow-lg transition-colors duration-500 ${
        theme === 'dark' ? 'bg-black border-b border-gray-700' : 'bg-white border-b border-gray-200'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold text-orange-400`}>
                Ruhrpott Events
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Language Selector - Nutzt jetzt availableLanguages vom TranslationService */}
              <div className="relative group">
                <button className="flex items-center text-orange-400 transition-colors">
                  <span className="mr-2">{availableLanguages.find(l => l.code === selectedLanguage)?.flag}</span>
                  <span className="text-sm">{selectedLanguage}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Language Dropdown */}
                <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                  theme === 'dark' ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:text-orange-400 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center ${
                        theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links - Nutzt jetzt zentralisierte Übersetzungen */}
              <a href="#events" className={`hover:text-orange-400 transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {navigation('events')}
              </a>
              
              <a href="#about" className={`hover:text-orange-400 transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {navigation('about')}
              </a>
              <a href="#contact" className={`hover:text-orange-400 transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {navigation('contact')}
              </a>

              {/* User Authentication - Nutzt jetzt zentralisierte Übersetzungen */}
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-orange-400 text-sm">
                    {common('welcome')}, {currentUser.name?.split(' ')[0]}!
                  </span>
                  <button
                    onClick={() => setShowMemberDashboard(true)}
                    className="flex items-center px-4 py-2 text-orange-400 rounded-lg transition-all text-sm border border-orange-400/40 hover:border-orange-400/60"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {navigation('dashboard')}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    {navigation('logout')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {navigation('login')}
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-4 py-2 text-orange-400 rounded-lg transition-all text-sm border border-orange-400/40 hover:border-orange-400/60"
                  >
                    {navigation('register')}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Nutzt jetzt zentralisierte Übersetzungen */}
            <div className="md:hidden flex items-center space-x-2">
              {currentUser ? (
                <button
                  onClick={() => setShowMemberDashboard(true)}
                  className="text-orange-400 hover:text-orange-300 p-2"
                  title={navigation('dashboard')}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-orange-400 hover:text-orange-300 p-2"
                  title={navigation('login')}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
              )}
              
              <button className="text-orange-400 p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Member Authentication Modal */}
              <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Member Dashboard Modal */}
      {showMemberDashboard && (
        <MemberDashboard
          onClose={() => setShowMemberDashboard(false)}
        />
      )}
    </>
  )
}

export default Header
