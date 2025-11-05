// === MELTING POTT - HAUPT-APP-KOMPONENTE ===
// Diese Datei ist das Herz der gesamten Anwendung und orchestriert alle Hauptkomponenten

// React Hooks für State-Management und Lifecycle
import { useState, useEffect } from 'react'

// === THEME CONTEXT ===
// Theme Provider für Dark/Light Mode
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

// === LAYOUT-KOMPONENTEN ===
// Diese Komponenten strukturieren das grundlegende Layout der Website
import Header from './components/layout/Header'        // Navigationsleiste oben
import Hero from './components/Hero'                    // Großer Willkommensbereich
import ExplanationSection from './components/ExplanationSection' // Was bedeutet "Melting Pott"
import Events from './components/Events'                // Event-Anzeige und Suche
import EnhancedEventTicker from './components/EnhancedEventTicker' // Laufband mit aktuellen Events
import ContactSection from './components/ContactSection' // Kontaktformular und Info
import Footer from './components/layout/Footer'        // Fußzeile mit Links
import RealEventSearch from './components/RealEventSearch' // Event-Suche Komponente
import EventReviewsViewer from './components/EventReviewsViewer' // Event-Reviews Anzeige

// === KI-KOMPONENTEN ===
// Intelligente Features für bessere User Experience
import SimpleHotte from './components/ai/SimpleHotte' // Einfache Hotte-Version

// Einfacher Theme-Toggle-Button
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: theme === 'dark' ? '#ff6600' : '#0066ff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}

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

// AppContent-Komponente die das Theme verwendet
function AppContent() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <MainApp />
    </div>
  );
}

function MainApp() {
  // === STATE MANAGEMENT ===
  // Zentrale Zustandsverwaltung für die gesamte App
  
  // Sprachauswahl (DE/EN) - wird an alle Komponenten weitergegeben
  const [selectedLanguage, setSelectedLanguage] = useState('DE')
  
  // === ÜBERSETZUNGEN FÜR EXPERIENCES SEKTION ===
  const experiencesTranslations = {
    DE: {
      title: "🏭 Echte Erfahrungen aus dem Ruhrpott",
      description: "Entdecke authentische Bewertungen von Events in Essen, Bochum, Dortmund und dem ganzen Ruhrgebiet. Von Zollverein bis Gasometer - erfahre, was andere Besucher wirklich denken!"
    },
    EN: {
      title: "🏭 Real Experiences from the Ruhr Area",
      description: "Discover authentic reviews of events in Essen, Bochum, Dortmund and the entire Ruhr area. From Zollverein to Gasometer - find out what other visitors really think!"
    },
    TR: {
      title: "🏭 Ruhr Bölgesi'nden Gerçek Deneyimler",
      description: "Essen, Bochum, Dortmund ve tüm Ruhr bölgesindeki etkinliklerin otantik değerlendirmelerini keşfedin. Zollverein'dan Gasometer'e kadar - diğer ziyaretçilerin gerçekten ne düşündüğünü öğrenin!"
    },
    PL: {
      title: "🏭 Prawdziwe Doświadczenia z Zagłębia Ruhry",
      description: "Odkryj autentyczne recenzje wydarzeń w Essen, Bochum, Dortmundzie i całym Zagłębiu Ruhry. Od Zollverein do Gasometer - dowiedz się, co naprawdę myślą inni odwiedzający!"
    },
    RU: {
      title: "🏭 Реальный Опыт из Рурской области",
      description: "Откройте для себя подлинные отзывы о событиях в Эссене, Бохуме, Дортмунде и всей Рурской области. От Цольферайна до Газометра - узнайте, что на самом деле думают другие посетители!"
    },
    AR: {
      title: "🏭 تجارب حقيقية من منطقة الرور",
      description: "اكتشف تقييمات حقيقية للأحداث في إيسن وبوخوم ودورتموند وكامل منطقة الرور. من تسولفيراين إلى غازوميتر - تعرف على ما يفكر فيه الزوار الآخرون حقاً!"
    },
    IT: {
      title: "🏭 Esperienze Autentiche dalla Ruhr",
      description: "Scopri recensioni autentiche di eventi a Essen, Bochum, Dortmund e in tutta l'area della Ruhr. Da Zollverein al Gasometer - scopri cosa pensano davvero gli altri visitatori!"
    },
    NL: {
      title: "🏭 Echte Ervaringen uit het Ruhrgebied",
      description: "Ontdek authentieke beoordelingen van evenementen in Essen, Bochum, Dortmund en het hele Ruhrgebied. Van Zollverein tot Gasometer - ontdek wat andere bezoekers echt denken!"
    },
    FR: {
      title: "🏭 Expériences Authentiques de la Ruhr",
      description: "Découvrez des avis authentiques d'événements à Essen, Bochum, Dortmund et dans toute la région de la Ruhr. De Zollverein au Gasomètre - découvrez ce que pensent vraiment les autres visiteurs !"
    },
    ES: {
      title: "🏭 Experiencias Auténticas del Ruhr",
      description: "Descubre reseñas auténticas de eventos en Essen, Bochum, Dortmund y toda la región del Ruhr. De Zollverein al Gasómetro - ¡descubre lo que realmente piensan otros visitantes!"
    }
  };

  const getExperiencesTitle = () => {
    return experiencesTranslations[selectedLanguage]?.title || experiencesTranslations.DE.title;
  };

  const getExperiencesDescription = () => {
    return experiencesTranslations[selectedLanguage]?.description || experiencesTranslations.DE.description;
  };
  
  // Admin-Panel Ein/Aus - versteckter Verwaltungsbereich
  const [showAdmin, setShowAdmin] = useState(false)
  
  // Database Viewer Ein/Aus - Live-Datenbank-Anzeige
  const [showDatabase, setShowDatabase] = useState(false)
  
  // SQL Viewer Ein/Aus - SQL-ähnliche Abfragen
  const [showSQL, setShowSQL] = useState(false)

  // Event Reviews Viewer Ein/Aus
  const [showReviews, setShowReviews] = useState(false)

  // === INITIALISIERUNG BEI APP-START ===
  // useEffect wird beim ersten Laden der App ausgeführt
  useEffect(() => {
    // Demo-Benutzer anlegen für Testzwecke
    userService.createDemoUsers()
    
    // Demo-Events und Ticket-Daten initialisieren
    ticketShopService.initializeDemoData()

    // Event Reviews Toggle global verfügbar machen
    window.eventReviewsToggle = () => setShowReviews(!showReviews)
  }, [showReviews]) // showReviews als Dependency damit die Funktion aktuell bleibt

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
      // Prüfe ob Strg + Shift + R gedrückt wurde
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault()
        setShowReviews(!showReviews) // Reviews Viewer öffnen/schließen
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

  if (showReviews) {
    // Wenn Reviews Viewer aktiv: Zeige Event Reviews
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowReviews(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg"
          >
            ✕ Schließen
          </button>
        </div>
        <EventReviewsViewer selectedLanguage={selectedLanguage} />
      </div>
    )
  }

  // === HAUPT-WEBSITE STRUKTUR ===
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      
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

      {/* Reviews Viewer Button */}
      <button
        onClick={() => setShowReviews(!showReviews)}
        className="fixed bottom-4 left-52 w-12 h-12 text-purple-400 rounded-full opacity-30 hover:opacity-100 transition-all z-50 text-xs border border-purple-400/20 hover:border-purple-400/40"
        title="Event Reviews (Strg+Shift+R)"
      >
        ⭐
      </button>
      
      {/* === HAUPTINHALT === */}
      <main>
        {/* 1. Hero-Section: Großer Willkommensbereich mit Städte-Auswahl */}
        <Hero 
          selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage} 
        />
        
        {/* 2. Erklärung: Was bedeutet "Melting Pott"? */}
        <ExplanationSection selectedLanguage={selectedLanguage} />
        
        {/* 3. Was läuft wo? - Event Suche */}
        <section className={`py-16 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-black' : 'bg-gray-50'
        }`}>
          <div className="max-w-6xl mx-auto px-4">
            <RealEventSearch language={selectedLanguage.toLowerCase()} />
          </div>
        </section>
        
        {/* Event Reviews CTA Section */}
        <section className={`py-16 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-black' : 'bg-gray-50'
        }`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {getExperiencesTitle()}
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {getExperiencesDescription()}
            </p>
            <button
              onClick={() => setShowReviews(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-orange-500/25"
            >
              <span className="mr-3 text-2xl">⭐</span>
              Event Reviews entdecken
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <p className="text-sm text-gray-400 mt-4">
              8 Bewertungen • 5 Events • Authentisch & ehrlich
            </p>
          </div>
        </section>
        
        {/* 4. Event-Ticker: Laufende Anzeige aktueller Events */}
        <EnhancedEventTicker selectedLanguage={selectedLanguage} />
        
        {/* Event-Bereich: Suche, Filter und Event-Liste */}
        <Events selectedLanguage={selectedLanguage} />
        
        {/* Kontakt-Sektion: Kontaktformular und Informationen */}
        <ContactSection selectedLanguage={selectedLanguage} />
      </main>
      
      {/* === FUSSBEREICH === */}
      <Footer selectedLanguage={selectedLanguage} />
      
      {/* === THEME TOGGLE BUTTON === */}
      <ThemeToggleButton />
      
      {/* === ANIMIERTER KI-ASSISTENT HOTTE === */}
      <SimpleHotte />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
