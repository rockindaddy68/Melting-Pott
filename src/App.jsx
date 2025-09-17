import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import EnhancedEventTicker from './components/EnhancedEventTicker'
import Footer from './components/layout/Footer'
import AdminDashboard from './components/AdminDashboard'
import userService from './services/userService'
import ticketShopService from './services/ticketShopService'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('DE')
  const [showAdmin, setShowAdmin] = useState(false)

  // Initialize demo data on first load
  useEffect(() => {
    userService.createDemoUsers()
    ticketShopService.initializeDemoData()
  }, [])

  // Admin-Modus über URL-Parameter oder Tastenkombination aktivieren
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin)
  }

  // Tastenkombination für Admin (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        toggleAdmin()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (showAdmin) {
    return <AdminDashboard onClose={() => setShowAdmin(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      
      {/* Hidden Admin Access Button */}
      <button
        onClick={toggleAdmin}
        className="fixed bottom-4 right-4 w-12 h-12 bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 rounded-full opacity-30 hover:opacity-100 transition-all z-50 text-xs"
        title="Admin Panel (Strg+Shift+A)"
      >
        ⚙️
      </button>
      
      <main>
        <Hero selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        <EnhancedEventTicker />
        <Events selectedLanguage={selectedLanguage} />
      </main>
      <Footer selectedLanguage={selectedLanguage} />
    </div>
  )
}

export default App
