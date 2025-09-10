import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main>
        <Hero />
        <Events />
      </main>
      <Footer />
    </div>
  )
}

export default App
