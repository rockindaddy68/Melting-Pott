import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Events />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}

export default App
