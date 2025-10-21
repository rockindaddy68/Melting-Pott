// === MELTING POTT - HEADER/NAVIGATIONSLEISTE ===
// Diese Komponente stellt die obere Navigationsleiste der Website dar
// Funktionen: Navigation, Sprachauswahl, Benutzer-Authentifizierung

import React, { useState, useEffect } from 'react'
import { AuthModal, MemberDashboard } from '../auth' // Anmelde-Modal und Benutzer-Dashboard
import userService from '../../services/userService'  // Service für Benutzerverwaltung

const Header = ({ selectedLanguage, setSelectedLanguage }) => {
  // === STATE MANAGEMENT FÜR HEADER ===
  
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

  // === SPRACHKONFIGURATION ===
  // Verfügbare Sprachen für die Website (Ruhrgebiet = multikulturell!)
  const languages = [
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },   // Deutsche Hauptsprache
    { code: 'EN', name: 'English', flag: '🇬🇧' },  // Englisch für internationale Besucher
    { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },   // Türkisch (große Community im Ruhrgebiet)
    { code: 'PL', name: 'Polski', flag: '🇵🇱' },   // Polnisch (viele polnische Familien)
    { code: 'RU', name: 'Русский', flag: '🇷🇺' },  // Russisch (russischsprachige Community)
    { code: 'AR', name: 'العربية', flag: '🇸🇦' },   // Arabisch (wachsende arabische Community)
  ]

  const translations = {
    DE: {
      events: 'Events',
      about: 'Über uns',
      contact: 'Kontakt',
      login: 'Anmelden',
      register: 'Registrieren',
      dashboard: 'Mein Bereich',
      logout: 'Abmelden',
      welcome: 'Willkommen'
    },
    EN: {
      events: 'Events',
      about: 'About us',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      dashboard: 'My Area',
      logout: 'Logout',
      welcome: 'Welcome'
    },
    TR: {
      events: 'Etkinlikler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      login: 'Giriş',
      register: 'Kayıt',
      dashboard: 'Benim Alanım',
      logout: 'Çıkış',
      welcome: 'Hoş geldiniz'
    },
    PL: {
      events: 'Wydarzenia',
      about: 'O nas',
      contact: 'Kontakt',
      login: 'Zaloguj',
      register: 'Zarejestruj',
      dashboard: 'Mój obszar',
      logout: 'Wyloguj',
      welcome: 'Witamy'
    },
    RU: {
      events: 'События',
      about: 'О нас',
      contact: 'Контакт',
      login: 'Войти',
      register: 'Регистрация',
      dashboard: 'Моя область',
      logout: 'Выйти',
      welcome: 'Добро пожаловать'
    },
    AR: {
      events: 'الأحداث',
      about: 'معلومات عنا',
      contact: 'اتصل',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      dashboard: 'منطقتي',
      logout: 'تسجيل الخروج',
      welcome: 'مرحبا'
    }
  }

  const t = translations[selectedLanguage] || translations.DE

  return (
    <>
      <header className="bg-black shadow-lg border-b border-orange-400/30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-400">
                Ruhrpott Events
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center text-orange-400 transition-colors">
                  <span className="mr-2">{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                  <span className="text-sm">{selectedLanguage}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Language Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:text-orange-400 hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center"
                    >
                      <span className="mr-3">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <a href="#events" className="text-gray-300 hover:text-orange-400 transition-colors">
                {t.events}
              </a>
              <a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors">
                {t.about}
              </a>
              <a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                {t.contact}
              </a>

              {/* User Authentication */}
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-orange-400 text-sm">
                    {t.welcome}, {currentUser.name?.split(' ')[0]}!
                  </span>
                  <button
                    onClick={() => setShowMemberDashboard(true)}
                    className="flex items-center px-4 py-2 text-orange-400 rounded-lg transition-all text-sm border border-orange-400/40 hover:border-orange-400/60"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t.dashboard}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-4 py-2 text-orange-400 rounded-lg transition-all text-sm border border-orange-400/40 hover:border-orange-400/60"
                  >
                    {t.register}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {currentUser ? (
                <button
                  onClick={() => setShowMemberDashboard(true)}
                  className="text-orange-400 hover:text-orange-300 p-2"
                  title={t.dashboard}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-orange-400 hover:text-orange-300 p-2"
                  title={t.login}
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
