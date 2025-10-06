import React, { useState, useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import { formatGermanDate } from '../utils/eventsHelpers'

const Events = ({ selectedLanguage = 'DE' }) => {
  const [lang, setLang] = useState({})
  const { events: dynamicEvents, loading, error, lastUpdated, refresh } = useEvents()

  // Fallback static events (falls Backend nicht verfügbar)
  const staticCities = [
    {
      id: 1,
      name: "Essen",
      events: [
        {
          title: "Zeche Zollverein UNESCO-Führung",
          subtitle: "Welterbe Industriekultur erleben",
          date: "2025-10-15",
          time: "14:00",
          location: "Zeche Zollverein",
          category: "Kultur",
          price: "12€"
        },
        {
          title: "Philharmonie Essen Konzert",
          subtitle: "Ruhr Piano Festival",
          date: "2025-10-22",
          time: "19:30",
          location: "Philharmonie Essen",
          category: "Musik",
          price: "45€"
        }
      ],
      image: "/src/assets/images/städte/essen/Zollverein.jpg"
    },
    // ... weitere Städte können hier hinzugefügt werden
  ]

  const translations = {
    DE: {
      title: "Events in den 12 Ruhrgebietsstädten",
      subtitle: "Entdecke die Vielfalt der Kulturen und Events in den wichtigsten Städten des Ruhrgebiets",
      loadingText: "Events werden geladen...",
      errorText: "Fehler beim Laden der Events",
      lastUpdatedText: "Zuletzt aktualisiert:",
      refreshText: "Aktualisieren",
      noEventsText: "Keine Events verfügbar",
      categories: {
        Kultur: "Kultur",
        Musik: "Musik", 
        Sport: "Sport",
        Familie: "Familie",
        Kunst: "Kunst",
        Bildung: "Bildung",
        Shopping: "Shopping",
        Aussicht: "Aussicht",
        Wissenschaft: "Wissenschaft",
        musik: "Musik",
        kunst: "Kunst",
        theater: "Theater",
        sport: "Sport",
        familie: "Familie",
        kultur: "Kultur",
        industrie: "Industrie",
        festival: "Festival",
        markt: "Markt",
        workshop: "Workshop"
      }
    },
    EN: {
      title: "Events in the 12 Ruhr Area Cities",
      subtitle: "Discover the diversity of cultures and events in the most important cities of the Ruhr area",
      loadingText: "Loading events...",
      errorText: "Error loading events",
      lastUpdatedText: "Last updated:",
      refreshText: "Refresh",
      noEventsText: "No events available",
      categories: {
        Kultur: "Culture",
        Musik: "Music",
        Sport: "Sports", 
        Familie: "Family",
        Kunst: "Arts",
        Bildung: "Education",
        Shopping: "Shopping",
        Aussicht: "Viewpoint",
        Wissenschaft: "Science",
        musik: "Music",
        kunst: "Arts",
        theater: "Theater",
        sport: "Sports",
        familie: "Family",
        kultur: "Culture",
        industrie: "Industry",
        festival: "Festival",
        markt: "Market",
        workshop: "Workshop"
      }
    },
    TR: {
      title: "12 Ruhr Bölgesi Şehrinde Etkinlikler",
      subtitle: "Ruhr bölgesinin en önemli şehirlerindeki kültür ve etkinlik çeşitliliğini keşfedin",
      loadingText: "Etkinlikler yükleniyor...",
      errorText: "Etkinlikler yüklenirken hata",
      lastUpdatedText: "Son güncelleme:",
      refreshText: "Yenile",
      noEventsText: "Etkinlik yok",
      categories: {
        Kultur: "Kültür",
        Musik: "Müzik",
        Sport: "Spor",
        Familie: "Aile",
        Kunst: "Sanat",
        Bildung: "Eğitim",
        Shopping: "Alışveriş",
        Aussicht: "Manzara",
        Wissenschaft: "Bilim",
        musik: "Müzik",
        kunst: "Sanat",
        theater: "Tiyatro",
        sport: "Spor",
        familie: "Aile",
        kultur: "Kültür",
        industrie: "Endüstri",
        festival: "Festival",
        markt: "Pazar",
        workshop: "Atölye"
      }
    }
  }

  useEffect(() => {
    setLang(translations[selectedLanguage] || translations.DE)
  }, [selectedLanguage])

  // Verwende dynamische Events wenn verfügbar, ansonsten statische
  const events = dynamicEvents.length > 0 ? dynamicEvents : staticCities

  // Verwende die importierte formatGermanDate Funktion

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-kohleschwarz">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            <span className="text-gray-400 text-lg">{lang.loadingText || "Events werden geladen..."}</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-kohleschwarz">
      <div className="max-w-7xl mx-auto">
        {/* Header mit Aktualisierung */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-stahlgrau mb-4">
            {lang.title || "Events in den 12 Ruhrgebietsstädten"}
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            {lang.subtitle || "Entdecke die Vielfalt der Kulturen und Events"}
          </p>
          
          {/* Aktualisierungs-Info */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            {lastUpdated && (
              <span>
                {lang.lastUpdatedText || "Zuletzt aktualisiert:"} {lastUpdated.toLocaleTimeString('de-DE')}
              </span>
            )}
            <button 
              onClick={refresh}
              className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{lang.refreshText || "Aktualisieren"}</span>
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-900/50 text-red-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{lang.errorText || "Fehler beim Laden der Events"}: {error}</span>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((city) => (
            <div key={city.id} className="bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50">
              {/* City Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/src/assets/images/städte/default-city.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{city.name}</h3>
              </div>

              {/* Events List */}
              <div className="p-6">
                {city.events.length > 0 ? (
                  city.events.map((event, index) => (
                    <div key={index} className="border-l-4 border-orange-400 hover:border-orange-300 pl-4 py-2 hover:bg-gray-700/50 hover:pl-6 transition-all duration-300 cursor-pointer rounded-r-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 rounded text-orange-400 text-xs font-medium bg-transparent border border-orange-400/40 hover:text-orange-400 hover:shadow-lg hover:scale-105 transition-all duration-300">
                          {lang.categories?.[event.category] || event.category}
                        </span>
                        <span className="text-xs text-orange-400 border border-orange-400/40 px-3 py-1.5 rounded-full font-medium transition-all duration-300">
                          {event.price}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-bold text-orange-400 mb-1 line-clamp-1">
                        {event.title}
                      </h4>
                      
                      <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                        {event.subtitle}
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
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    {lang.noEventsText || "Keine Events verfügbar"}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
