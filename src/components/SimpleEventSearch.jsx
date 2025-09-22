import React, { useState, useEffect } from 'react';
import { formatGermanDate, getCategoryColor } from '../utils/eventsHelpers';

const SimpleEventSearch = ({ language = 'de' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Statische Test-Events für sofortige Funktionalität
  const staticEvents = [
    {
      id: 'ze1',
      name: 'Zeche Zollverein Führung',
      location: 'Zeche Zollverein, Essen',
      city: 'Essen',
      date: 'permanent',
      category: 'Kultur',
      price: '15€',
      source: 'local',
      description: 'UNESCO-Welterbe Zeche Zollverein - Industriekultur pur',
      url: 'https://www.zollverein.de'
    },
    {
      id: 'mf1',
      name: 'Museum Folkwang',
      location: 'Museum Folkwang, Essen',
      city: 'Essen',
      date: 'permanent',
      category: 'Museum',
      price: '7€',
      source: 'local',
      description: 'Kunst des 19. bis 21. Jahrhunderts',
      url: 'https://www.museum-folkwang.de'
    },
    {
      id: 'si1',
      name: 'Signal Iduna Park Tour',
      location: 'Signal Iduna Park, Dortmund',
      city: 'Dortmund',
      date: 'permanent',
      category: 'Sport',
      price: '12€',
      source: 'local',
      description: 'Stadion-Tour durch das legendäre BVB-Stadion',
      url: 'https://www.bvb.de'
    },
    {
      id: 'db1',
      name: 'Deutsches Bergbau-Museum',
      location: 'Deutsches Bergbau-Museum, Bochum',
      city: 'Bochum',
      date: 'permanent',
      category: 'Museum',
      price: '10€',
      source: 'local',
      description: 'Bergbaugeschichte erleben',
      url: 'https://www.bergbaumuseum.de'
    },
    {
      id: 'lp1',
      name: 'Landschaftspark Duisburg-Nord',
      location: 'Landschaftspark Duisburg-Nord',
      city: 'Duisburg',
      date: 'permanent',
      category: 'Park',
      price: 'Kostenlos',
      source: 'local',
      description: 'Industriekultur in grüner Umgebung',
      url: 'https://www.landschaftspark.de'
    },
    {
      id: 'jh1',
      name: 'Jahrhunderthalle Konzert',
      location: 'Jahrhunderthalle Bochum',
      city: 'Bochum',
      date: '2025-10-15',
      category: 'Musik',
      price: '25€',
      source: 'local',
      description: 'Konzerte in historischem Ambiente',
      url: '#'
    },
    {
      id: 'rp1',
      name: 'Ruhr Museum',
      location: 'Ruhr Museum, Essen',
      city: 'Essen',
      date: 'permanent',
      category: 'Museum',
      price: '8€',
      source: 'local',
      description: 'Die Geschichte des Ruhrgebiets',
      url: 'https://www.ruhrmuseum.de'
    },
    {
      id: 'th1',
      name: 'Theater Oberhausen',
      location: 'Theater Oberhausen',
      city: 'Oberhausen',
      date: '2025-09-25',
      category: 'Theater',
      price: '18€',
      source: 'local',
      description: 'Modernes Theater im Ruhrgebiet',
      url: '#'
    }
  ];

  const translations = {
    de: {
      title: 'Event Suche',
      searchPlaceholder: 'Suchen Sie nach "Zollverein", "Museum", "Konzert"...',
      noResults: 'Keine Events gefunden',
      minChars: 'Mindestens 2 Zeichen eingeben',
      resultsCount: 'Events gefunden',
      clearSearch: 'Löschen',
      date: 'Datum',
      location: 'Ort',
      category: 'Kategorie',
      free: 'Kostenlos',
      from: 'ab',
      local: 'Lokal'
    },
    en: {
      title: 'Event Search',
      searchPlaceholder: 'Search for "Zollverein", "Museum", "Concert"...',
      noResults: 'No events found',
      minChars: 'Enter at least 2 characters',
      resultsCount: 'events found',
      clearSearch: 'Clear',
      date: 'Date',
      location: 'Location', 
      category: 'Category',
      free: 'Free',
      from: 'from',
      local: 'Local'
    }
  };

  const t = translations[language] || translations.de;

  // Hero-Suche Event Listener
  useEffect(() => {
    const handleHeroSearch = (event) => {
      const query = event.detail.query;
      setSearchQuery(query);
      setShowResults(true);
      performSearch(query);
    };

    window.addEventListener('heroSearch', handleHeroSearch);
    
    return () => {
      window.removeEventListener('heroSearch', handleHeroSearch);
    };
  }, []);

  // Automatische Suche beim Tippen
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setShowResults(true);
      performSearch(searchQuery);
    } else if (searchQuery.trim().length === 0) {
      setResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Suche durchführen
  const performSearch = (query) => {
    setIsLoading(true);
    
    // Simuliere kurze Ladezeit
    setTimeout(() => {
      const filteredResults = staticEvents.filter(event => {
        const searchFields = [
          event.name,
          event.location,
          event.city,
          event.category,
          event.description
        ].join(' ').toLowerCase();
        
        return searchFields.includes(query.toLowerCase());
      });
      
      setResults(filteredResults);
      setIsLoading(false);
    }, 300);
  };

  // Input Handler
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Suche löschen
  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div data-event-search className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {t.title}
      </h2>

      {/* Suchfeld */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={t.searchPlaceholder}
            className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              title={t.clearSearch}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Status */}
        <div className="mt-2">
          {searchQuery.length > 0 && searchQuery.length < 2 && (
            <p className="text-gray-400 text-sm">{t.minChars}</p>
          )}

          {results.length > 0 && showResults && !isLoading && (
            <p className="text-orange-400 text-sm font-medium">
              {results.length} {t.resultsCount}{searchQuery && ` für "${searchQuery}"`}
            </p>
          )}
        </div>
      </div>

      {/* Loading */}
      {isLoading && showResults && (
        <div className="bg-gray-800/30 rounded-xl p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Suche Events...</p>
        </div>
      )}

      {/* Ergebnisse */}
      {showResults && results.length > 0 && !isLoading && (
        <div className="bg-gray-800/30 rounded-xl p-4 space-y-3 max-h-96 overflow-y-auto">
          {results.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-orange-400/30 transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-base font-semibold text-white leading-tight">{event.name}</h3>
                    <div className="flex gap-1 flex-shrink-0">
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium">
                        {t.local}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">
                        {event.date === 'permanent' ? 'Permanent' : formatGermanDate(event.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {event.price === 'Kostenlos' ? 
                        <span className="text-emerald-400 font-medium">{t.free}</span> :
                        <span>{t.from} {event.price}</span>
                      }
                    </div>
                  </div>
                </div>

                {event.url && event.url !== '#' && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-orange-400 rounded-lg transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                  >
                    Details →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Keine Ergebnisse */}
      {showResults && results.length === 0 && !isLoading && searchQuery.length >= 2 && (
        <div className="bg-gray-800/30 rounded-xl p-8 text-center">
          <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 mb-2">{t.noResults}</p>
          <p className="text-sm text-gray-500">
            Versuchen Sie: "Zollverein", "Museum", "Konzert", "Dortmund", "Bochum"
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleEventSearch;
