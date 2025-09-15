import React, { useEffect, useState } from 'react'
import eventsTranslations from '../translations/eventsTranslations'
import citiesData from '../data/permanentAttractions'
import { formatGermanDate, getCategoryColor, getCityImageClass } from '../utils/eventsHelpers'

const Events = ({ selectedLanguage = 'DE' }) => {
  const [currentLang, setCurrentLang] = useState('DE')

  useEffect(() => {
    setCurrentLang(selectedLanguage)
  }, [selectedLanguage])

  // Aktuelle Sprach-Übersetzungen aus der separaten Datei laden
  const lang = eventsTranslations[currentLang] || eventsTranslations.DE

  return (
    <section id="events" className="pt-48 pb-32 bg-black text-gray-400 relative -mt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-black/20 via-40% via-black/60 via-70% to-black to-100%"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
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
                    <h3 className="text-gray-400 text-2xl font-bold group-hover:text-orange-200 transition-colors duration-300">{city.name}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                      <span className="text-orange-300 text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {city.events.length} Events verfügbar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {city.events.map((event, index) => (
                  <div key={index} className="border-l-4 border-orange-400 hover:border-orange-300 pl-4 py-2 hover:bg-gray-700/50 hover:pl-6 transition-all duration-300 cursor-pointer rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 rounded text-orange-300 text-xs font-medium bg-transparent border border-orange-400/40 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                        {lang.categories[event.category] || event.category}
                      </span>
                      <span className="text-xs text-gray-300 bg-gray-700/50 border border-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 px-3 py-1.5 rounded-full font-medium transition-all duration-300">
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
