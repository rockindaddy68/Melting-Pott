import React, { useState } from 'react'

const Hero = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('DE')

  const languages = [
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'PL', name: 'Polski', flag: '🇵🇱' },
    { code: 'RU', name: 'Русский', flag: '🇷🇺' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' }
  ]

  const translations = {
    DE: {
      title: "Melting Pott",
      subtitle: "Dein Guide für Events im Ruhrgebiet",
      searchPlaceholder: "Event oder Location suchen...",
      discoverBtn: "Entdecken",
      explanation: "Der Begriff 'Melting Pott' verbindet das englische Wort für Schmelztiegel mit dem regionalen 'Pott' für das Ruhrgebiet. Seit über 150 Jahren leben und arbeiten hier Menschen aus aller Welt zusammen - von polnischen Bergleuten über türkische Gastarbeiter bis hin zu Familien aus über 180 Nationen. Diese kulturelle Vielfalt macht das Ruhrgebiet zu einem einzigartigen Schmelztiegel der Kulturen."
    },
    EN: {
      title: "Melting Pott",
      subtitle: "Your Guide to Events in the Ruhr Area",
      searchPlaceholder: "Search events or locations...",
      discoverBtn: "Discover",
      explanation: "The term 'Melting Pott' combines the English word for melting pot with the regional 'Pott' for the Ruhr area. For over 150 years, people from all over the world have lived and worked together here - from Polish miners to Turkish guest workers to families from over 180 nations. This cultural diversity makes the Ruhr area a unique melting pot of cultures."
    },
    TR: {
      title: "Melting Pott",
      subtitle: "Ruhr Bölgesi Etkinlik Rehberiniz",
      searchPlaceholder: "Etkinlik veya konum ara...",
      discoverBtn: "Keşfet",
      explanation: "Melting Pott terimi, İngilizce eritme potası anlamındaki kelime ile bölgesel 'Pott'u birleştirir. 150 yılı aşkın süredir dünyanın her yerinden insanlar burada birlikte yaşıyor ve çalışıyor - Polonyalı madencilerden Türk misafir işçilere, 180'den fazla ulustan ailelere kadar."
    }
  }

  const currentLang = translations[selectedLanguage] || translations.DE

  return (
    <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-20">
        <div className="relative">
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Industrial Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
        <div 
          className="w-full h-full bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af2e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Content */}
        <div className="text-center py-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
            {currentLang.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 font-light max-w-3xl mx-auto">
            {currentLang.subtitle}
          </p>

          {/* Explanation */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-emerald-400">Was bedeutet "Melting Pott"?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {currentLang.explanation}
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder={currentLang.searchPlaceholder}
                className="w-full px-6 py-4 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center gap-2 justify-center">
              <span>{currentLang.discoverBtn}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Hero Images Preview */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1570495259159-c213ba0e3993?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Zeche Zollverein"
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af2e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Landschaftspark Duisburg"
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Gasometer Oberhausen"
                className="w-full h-32 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
