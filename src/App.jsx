// === MELTING POTT - HAUPT-APP-KOMPONENTE ===
// Diese Datei ist das Herz der gesamten Anwendung und orchestriert alle Hauptkomponenten

// React Hooks für State-Management und Lifecycle
import { useState, useEffect } from 'react'

// === LAYOUT-KOMPONENTEN ===
// Diese Komponenten strukturieren das grundlegende Layout der Website
import Header from './components/layout/Header'        // Navigationsleiste oben
import Hero from './components/Hero'                    // Großer Willkommensbereich
import Events from './components/Events'                // Event-Anzeige und Suche
import EnhancedEventTicker from './components/EnhancedEventTicker' // Laufband mit aktuellen Events
import ContactSection from './components/ContactSection' // Kontaktformular und Info
import Footer from './components/layout/Footer'        // Fußzeile mit Links

// === ADMIN-KOMPONENTEN ===
// Verwaltungsbereich für die Website-Administration
import AdminDashboard from './components/AdminDashboard' // Admin-Panel für Event-Management
import BackendStatus from './components/BackendStatus'   // Zeigt Server-Verbindungsstatus
import DatabaseViewer from './components/DatabaseViewer' // Live-Anzeige der Datenbank
import SQLViewer from './components/SQLViewer'           // SQL-ähnliche Datenbank-Abfragen

// === SERVICES ===
// Diese Services handhaben Geschäftslogik und Datenmanagement
import userService from './services/userService'         // Benutzerverwaltung
import ticketShopService from './services/ticketShopService' // Ticket-System

function App() {
  // === STATE MANAGEMENT ===
  // Zentrale Zustandsverwaltung für die gesamte App
  
  // Sprachauswahl (DE/EN) - wird an alle Komponenten weitergegeben
  const [selectedLanguage, setSelectedLanguage] = useState('DE')
  
  // Admin-Panel Ein/Aus - versteckter Verwaltungsbereich
  const [showAdmin, setShowAdmin] = useState(false)
  
  // Database Viewer Ein/Aus - Live-Datenbank-Anzeige
  const [showDatabase, setShowDatabase] = useState(false)
  
  // SQL Viewer Ein/Aus - SQL-ähnliche Abfragen
  const [showSQL, setShowSQL] = useState(false)

  // === INITIALISIERUNG BEI APP-START ===
  // useEffect wird beim ersten Laden der App ausgeführt
  useEffect(() => {
    // Demo-Benutzer anlegen für Testzwecke
    userService.createDemoUsers()
    
    // Demo-Events und Ticket-Daten initialisieren
    ticketShopService.initializeDemoData()
  }, []) // Leeres Array [] bedeutet: nur einmal beim ersten Rendern ausführen

  // === ADMIN-FUNKTIONALITÄT ===
  // Funktion zum Ein-/Ausblenden des Admin-Panels
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin) // Aktuellen Zustand umkehren
  }

  // === TASTENKOMBINATION FÜR ADMIN-ZUGANG ===
  // useEffect für Event-Listener (Tastatur-Events)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prüfe ob Strg + Shift + A gedrückt wurde
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault() // Standard-Browser-Aktion verhindern
        toggleAdmin()      // Admin-Panel öffnen/schließen
      }
      // Prüfe ob Strg + Shift + D gedrückt wurde
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setShowDatabase(!showDatabase) // Database Viewer öffnen/schließen
      }
      // Prüfe ob Strg + Shift + S gedrückt wurde
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault()
        setShowSQL(!showSQL) // SQL Viewer öffnen/schließen
      }
    }
    
    // Event-Listener für Tastatur-Events registrieren
    document.addEventListener('keydown', handleKeyDown)
    
    // Cleanup-Funktion: Event-Listener beim Unmount entfernen
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, []) // Leeres Array: Event-Listener nur einmal registrieren

  // === BEDINGTE ANZEIGE: ADMIN vs. DATABASE vs. SQL vs. NORMALE WEBSITE ===
  if (showAdmin) {
    // Wenn Admin-Modus aktiv: Zeige nur das Admin-Dashboard
    return <AdminDashboard onClose={() => setShowAdmin(false)} />
  }

  if (showDatabase) {
    // Wenn Database Viewer aktiv: Zeige Live-Datenbank
    return <DatabaseViewer onClose={() => setShowDatabase(false)} />
  }

  if (showSQL) {
    // Wenn SQL Viewer aktiv: Zeige SQL-Interface
    return <SQLViewer onClose={() => setShowSQL(false)} />
  }

  // === HAUPT-WEBSITE STRUKTUR ===
  return (
    <div className="min-h-screen bg-black"> {/* Vollbild-Container mit schwarzem Hintergrund */}
      
      {/* === KOPFBEREICH === */}
      <Header 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage} 
      />
      
      {/* === SYSTEM-STATUS === */}
      {/* Zeigt Verbindungsstatus zum Backend-Server */}
      <BackendStatus />
      
      {/* === VERSTECKTER ADMIN-ZUGANG === */}
      {/* Kleiner Button unten links für Admin-Zugang (nur für Entwickler sichtbar) */}
      <button
        onClick={toggleAdmin}
        className="fixed bottom-4 left-4 w-12 h-12 text-orange-400 rounded-full opacity-30 hover:opacity-100 transition-all z-50 text-xs border border-orange-400/20 hover:border-orange-400/40"
        title="Admin Panel (Strg+Shift+A)"
      >
        ⚙️
      </button>
      
      {/* Database Viewer Button */}
      <button
        onClick={() => setShowDatabase(!showDatabase)}
        className="fixed bottom-4 left-20 w-12 h-12 text-blue-400 rounded-full opacity-30 hover:opacity-100 transition-all z-50 text-xs border border-blue-400/20 hover:border-blue-400/40"
        title="Database Viewer (Strg+Shift+D)"
      >
        🗄️
      </button>
      
      {/* SQL Viewer Button */}
      <button
        onClick={() => setShowSQL(!showSQL)}
        className="fixed bottom-4 left-36 w-12 h-12 text-green-400 rounded-full opacity-30 hover:opacity-100 transition-all z-50 text-xs border border-green-400/20 hover:border-green-400/40"
        title="SQL Viewer (Strg+Shift+S)"
      >
        🗃️
      </button>
      
      {/* === HAUPTINHALT === */}
      <main>
        {/* Hero-Section: Großer Willkommensbereich mit Städte-Auswahl */}
        <Hero 
          selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage} 
        />
        
        {/* Event-Ticker: Laufende Anzeige aktueller Events */}
        <EnhancedEventTicker />
        
        {/* Event-Bereich: Suche, Filter und Event-Liste */}
        <Events selectedLanguage={selectedLanguage} />
        
        {/* Kontakt-Sektion: Kontaktformular und Informationen */}
        <ContactSection selectedLanguage={selectedLanguage} />
      </main>
      
      {/* === FUSSBEREICH === */}
      <Footer selectedLanguage={selectedLanguage} />
    </div>
  )
}

export default App
