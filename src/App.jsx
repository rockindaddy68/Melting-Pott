import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import Footer from './components/Footer'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('DE')

  return (
    <div className="min-h-screen bg-gray-900">
      <main>
        <Hero selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        <Events selectedLanguage={selectedLanguage} />
      </main>
      <Footer selectedLanguage={selectedLanguage} />
    </div>
  )
}

export default App
