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
    <section className="relative min-h-screen bg-gray-900 text-gray-400 overflow-hidden">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-20">
        <div className="relative">
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* WegeLaPaDu Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center brightness-50 contrast-125"
          style={{
            backgroundImage: 'url(/WegeLaPaDu.jpg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Layout */}
        <div className="flex items-center justify-between gap-4 mb-12 mt-20">
          {/* Left Side - Title */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 tracking-tight text-orange-400">
              {currentLang.title}
            </h1>
            <p className="text-2xl lg:text-3xl text-gray-300 mb-12 font-light">
              {currentLang.subtitle}
            </p>
          </div>
          
          {/* Right Side - Large Zollverein Image */}
          <div className="hidden lg:block flex-shrink-0">
            <img 
              src="/src/assets/images/städte/essen/Extraschicht nacht.jpg"
              alt="Zeche Zollverein bei Nacht"
              className="w-[32rem] h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Mobile Zollverein Image */}
        <div className="lg:hidden mb-12 flex justify-center">
          <img 
            src="/src/assets/images/städte/essen/Extraschicht nacht.jpg"
            alt="Zeche Zollverein bei Nacht"
            className="w-full max-w-md h-64 object-cover rounded-2xl shadow-2xl"
          />
        </div>

        {/* Search Bar - Same Width as Explanation */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-5xl mx-auto mt-4 w-full">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder={currentLang.searchPlaceholder}
                className="w-full h-[60px] px-6 py-4 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          <button className="px-6 py-4 h-[60px] bg-orange-400/70 hover:bg-orange-300/80 text-white font-semibold text-lg rounded-xl transition-colors duration-200 flex items-center gap-2 justify-center shadow-lg border border-orange-400/50 flex-shrink-0">
            <span>{currentLang.discoverBtn}</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Explanation - Bottom */}
        <div className="mt-12 bg-transparent backdrop-blur-sm rounded-2xl p-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-orange-400">Was bedeutet "Melting Pott"?</h3>
          </div>
          <p className="text-gray-400 text-base leading-relaxed">
            {currentLang.explanation}
          </p>
        </div>

        {/* Historical S/W Images Band */}
        <div className="mt-16 mb-8">
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-8 whitespace-nowrap">
              {/* Historical Images - First set - using available photos with grayscale filter */}
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
                <img src="/src/assets/images/städte/essen/Extraschicht nacht.jpg" alt="Zeche Zollverein 1932" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Zeche Zollverein 1932</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/Kaue.jpg" alt="Bergarbeiter Schicht 1920" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Bergarbeiter 1920</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/Hochofen.jpg" alt="Hochofen Phoenix Hörde" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Phoenix Hörde</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/duisburg/LaPaDu.jpg" alt="Margarethenhöhe Arbeitersiedlung" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Margarethenhöhe</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/dortmund/DortmunderU.jpg" alt="Zeche Germania Dortmund 1890" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Zeche Germania 1890</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/hattingen/Henrichshütte.jpeg" alt="Kokerei Hansa Dortmund 1928" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Kokerei Hansa 1928</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/duisburg/TigerAndTurtle2.jpg" alt="Rhein-Herne-Kanal Bau 1906" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Rhein-Herne-Kanal</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/oberhausen/Gasometer.jpg" alt="Völklingen Hütte 1873" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Gasometer 1929</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/gelsenkirchen/NordsternHerkules.jpg" alt="Zeche Consolidation Gelsenkirchen" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Zeche Consolidation</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/bochum/Bergbaumuseum.jpg" alt="Thyssen Stahlwerk 1871" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Thyssen Stahlwerk</div>
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/essen/Extraschicht nacht.jpg" alt="Zeche Zollverein 1932" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Zeche Zollverein 1932</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/Kaue.jpg" alt="Bergarbeiter Schicht 1920" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Bergarbeiter 1920</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/Hochofen.jpg" alt="Hochofen Phoenix Hörde" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Phoenix Hörde</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/duisburg/LaPaDu.jpg" alt="Margarethenhöhe Arbeitersiedlung" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Margarethenhöhe</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/dortmund/DortmunderU.jpg" alt="Zeche Germania Dortmund 1890" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Zeche Germania 1890</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/hattingen/Henrichshütte.jpeg" alt="Kokerei Hansa Dortmund 1928" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Kokerei Hansa 1928</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/duisburg/TigerAndTurtle2.jpg" alt="Rhein-Herne-Kanal Bau 1906" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Rhein-Herne-Kanal</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/oberhausen/Gasometer.jpg" alt="Völklingen Hütte 1873" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Gasometer 1929</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/gelsenkirchen/NordsternHerkules.jpg" alt="Zeche Consolidation Gelsenkirchen" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Zeche Consolidation</div>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 h-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600 relative">
                <img src="/src/assets/images/städte/bochum/Bergbaumuseum.jpg" alt="Thyssen Stahlwerk 1871" className="w-full h-full object-cover grayscale sepia-0 contrast-125 brightness-90" />
                <div className="absolute inset-0 bg-black/20 flex items-end">
                  <div className="text-white text-xs p-2 bg-black/60 w-full text-center">Thyssen Stahlwerk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
