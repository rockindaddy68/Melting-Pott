// === MELTING POTT - EVENTS HAUPTKOMPONENTE ===
// Diese Komponente zeigt alle verfügbaren Events in einer ansprechenden Karten-Ansicht
// Features: Städte-basierte Organisation, Mehrsprachigkeit, Hover-Effekte

import React, { useEffect, useState } from 'react'
import eventsTranslations from '../translations/eventsTranslations' // Übersetzungen für UI-Texte
import citiesData from '../data/permanentAttractions'              // Statische Daten der Ruhrgebiet-Städte
import { formatGermanDate, getCategoryColor, getCityImageClass } from '../utils/eventsHelpers' // Hilfsfunktionen

const Events = ({ selectedLanguage = 'DE' }) => {
  // === STATE MANAGEMENT ===
  // Lokaler Sprach-State, der mit dem globalen selectedLanguage synchronisiert wird
  const [currentLang, setCurrentLang] = useState('DE')

  // === SPRACHE SYNCHRONISIEREN ===
  // Reagiert auf Änderungen der globalen Sprachauswahl
  useEffect(() => {
    setCurrentLang(selectedLanguage)
  }, [selectedLanguage]) // Wird ausgeführt wenn selectedLanguage sich ändert

  // === ÜBERSETZUNGEN LADEN ===
  // Lädt die Übersetzungen für die aktuelle Sprache, fallback auf Deutsch
  const lang = eventsTranslations[currentLang] || eventsTranslations.DE

  return (
    <section id="events" className="pt-48 pb-32 bg-black text-gray-400 relative -mt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-black/20 via-40% via-black/60 via-70% to-black to-100%"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 text-orange-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-400">
              {lang.title}
            </h2>
          </div>
          <p className="text-gray-400">
            {lang.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {citiesData.map((city) => (
            <div key={city.id} className="bg-transparent backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-700/60 hover:shadow-2xl hover:shadow-gray-400/50 transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="aspect-w-16 aspect-h-10 relative">
                <img 
                  src={city.image} 
                  alt={city.name}
                  className={`w-full h-72 group-hover:scale-110 transition-transform duration-700 ${getCityImageClass(city.name)}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-orange-900/40 group-hover:via-orange-800/10 transition-all duration-500">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-gray-400 text-2xl font-bold group-hover:text-orange-400 transition-colors duration-300">{city.name}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                      <span className="text-orange-400 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                        {city.events.length} Events verfügbar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {city.events.map((event, index) => (
                  <div key={index} className="border-l-4 border-orange-400 hover:border-orange-400 pl-4 py-2 hover:bg-gray-700/50 hover:pl-6 transition-all duration-300 cursor-pointer rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 rounded text-orange-400 text-xs font-medium bg-transparent border border-orange-400/40 hover:text-orange-400 hover:shadow-lg hover:scale-105 transition-all duration-300">
                        {lang.categories[event.category] || event.category}
                      </span>
                      <span className="text-xs text-orange-400 border border-orange-400/40 px-3 py-1.5 rounded-full font-medium transition-all duration-300">
                        {event.price}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-orange-400 mb-1 line-clamp-1">
                      {lang.events?.[event.title]?.title || event.title}
                    </h4>
                    
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                      {lang.events?.[event.title]?.subtitle || event.subtitle}
                    </p>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatGermanDate(event.date)} • {event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      
                      {/* Social Share Buttons */}
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700">
                        <span className="text-xs text-gray-400">Teilen:</span>
                        <button 
                          onClick={() => window.open('/fake-social/whatsapp.html?event=' + encodeURIComponent(event.title), '_blank')}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
                          title="Auf WhatsApp teilen"
                        >
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => window.open('/fake-social/facebook.html?event=' + encodeURIComponent(event.title), '_blank')}
                          className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                          title="Auf Facebook teilen"
                        >
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => window.open('/fake-social/instagram.html?event=' + encodeURIComponent(event.title), '_blank')}
                          className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:from-purple-400 hover:via-pink-400 hover:to-orange-300 transition-colors"
                          title="Auf Instagram teilen"
                        >
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => window.open('/fake-social/twitter.html?event=' + encodeURIComponent(event.title), '_blank')}
                          className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                          title="Auf X (Twitter) teilen"
                        >
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
