import React, { useState, useEffect, useRef } from 'react';
import EventbriteService from '../services/eventbriteService';
import { formatGermanDate, getCategoryColor } from '../utils/eventsHelpers';

const EventSearch = ({ language = 'de' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef(null);

  const eventbriteService = new EventbriteService();

  // Hero-Suche Event Listener
  useEffect(() => {
    const handleHeroSearch = (event) => {
      const query = event.detail.query;
      setSearchQuery(query);
      setShowResults(true);
      // Automatisch suchen nach kurzer Verzögerung
      setTimeout(() => {
        performSearch(query, selectedCity);
      }, 100);
    };

    window.addEventListener('heroSearch', handleHeroSearch);
    
    return () => {
      window.removeEventListener('heroSearch', handleHeroSearch);
    };
  }, [selectedCity]);

  // Automatische Suche beim Tippen (Debounced)
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim().length >= 3) {
      setShowResults(true);
      searchTimeout.current = setTimeout(() => {
        performSearch(searchQuery, selectedCity);
      }, 500); // 500ms Verzögerung
    } else if (searchQuery.trim().length === 0) {
      setResults([]);
      setShowResults(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery, selectedCity]);

  // Ruhrgebiet Städte
  const ruhrgebietCities = [
    'Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen',
    'Oberhausen', 'Hagen', 'Bottrop', 'Recklinghausen', 'Herne',
    'Mülheim an der Ruhr', 'Witten'
  ];

  const translations = {
    de: {
      title: 'Event Suche',
      searchPlaceholder: 'Mindestens 3 Zeichen eingeben (z.B. "Zollverein", "Museum", "Konzert")...',
      cityFilter: 'Stadt wählen',
      allCities: 'Alle Städte',
      searchButton: 'Suchen',
      noResults: 'Keine Events gefunden',
      minChars: 'Mindestens 3 Zeichen eingeben',
      loading: 'Suche Events...',
      error: 'Fehler beim Laden der Events',
      resultsCount: 'Events gefunden',
      clearSearch: 'Suche löschen',
      date: 'Datum',
      location: 'Ort',
      category: 'Kategorie',
      free: 'Kostenlos',
      from: 'ab',
      eventbrite: 'Eventbrite',
      local: 'Lokal'
    },
    en: {
      title: 'Event Search',
      searchPlaceholder: 'Enter at least 3 characters (e.g. "Zollverein", "Museum", "Concert")...',
      cityFilter: 'Choose city',
      allCities: 'All cities',
      searchButton: 'Search',
      noResults: 'No events found',
      minChars: 'Enter at least 3 characters',
      loading: 'Searching events...',
      error: 'Error loading events',
      resultsCount: 'events found',
      clearSearch: 'Clear search',
      date: 'Date',
      location: 'Location',
      category: 'Category',
      free: 'Free',
      from: 'from',
      eventbrite: 'Eventbrite',
      local: 'Local'
    }
  };

  const t = translations[language] || translations.de;

  // Suche ausführen
  const performSearch = async (query = searchQuery, city = selectedCity) => {
    if (!query.trim() && !city) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      let eventbriteResults = [];
      let localResults = [];

      // Eventbrite Events suchen
      if (city) {
        eventbriteResults = await eventbriteService.searchEventsByCity(city, query, 10);
      } else if (query) {
        eventbriteResults = await eventbriteService.searchEventsByQuery(query, 10);
      }

      // Lokale Events suchen (aus permanentAttractions.js)
      if (query) {
        localResults = await searchLocalEvents(query);
      }

      // Ergebnisse kombinieren und sortieren
      const combinedResults = [...eventbriteResults, ...localResults]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 20); // Maximal 20 Ergebnisse

      setResults(combinedResults);
    } catch (err) {
      setError(t.error);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler für Button-Suche
  const handleSearch = () => {
    performSearch();
  };

  // Lokale Events durchsuchen (Erweitert mit mehr Daten)
  const searchLocalEvents = async (query) => {
    try {
      const { default: permanentAttractions } = await import('../data/permanentAttractions.js');
      const results = [];

      // Zusätzliche lokale Events für bessere Suche
      const additionalLocalEvents = [
        {
          name: 'Zeche Zollverein Führung',
          location: 'Zeche Zollverein',
          city: 'Essen',
          date: 'permanent',
          category: 'Kultur',
          price: '15€',
          source: 'local',
          description: 'UNESCO-Welterbe Zeche Zollverein - Industriekultur pur'
        },
        {
          name: 'Museum Folkwang',
          location: 'Museum Folkwang',
          city: 'Essen', 
          date: 'permanent',
          category: 'Museum',
          price: '7€',
          source: 'local',
          description: 'Kunst des 19. bis 21. Jahrhunderts'
        },
        {
          name: 'Signal Iduna Park Tour',
          location: 'Signal Iduna Park',
          city: 'Dortmund',
          date: 'permanent', 
          category: 'Sport',
          price: '12€',
          source: 'local',
          description: 'Stadion-Tour durch das legendäre BVB-Stadion'
        },
        {
          name: 'Deutsches Bergbau-Museum',
          location: 'Deutsches Bergbau-Museum',
          city: 'Bochum',
          date: 'permanent',
          category: 'Museum',
          price: '10€', 
          source: 'local',
          description: 'Bergbaugeschichte erleben'
        },
        {
          name: 'Landschaftspark Duisburg-Nord',
          location: 'Landschaftspark Duisburg-Nord',
          city: 'Duisburg',
          date: 'permanent',
          category: 'Park',
          price: 'Kostenlos',
          source: 'local',
          description: 'Industriekultur in grüner Umgebung'
        },
        {
          name: 'Jahrhunderthalle Bochum Konzert',
          location: 'Jahrhunderthalle Bochum',
          city: 'Bochum',
          date: '2025-10-15',
          category: 'Musik',
          price: '25€',
          source: 'local',
          description: 'Konzerte in historischem Ambiente'
        }
      ];

      // Durch permanente Attraktionen suchen
      permanentAttractions.forEach(city => {
        city.events.forEach(event => {
          const searchFields = [
            event.name,
            event.location,
            event.category,
            city.city
          ].join(' ').toLowerCase();

          if (searchFields.includes(query.toLowerCase())) {
            results.push({
              ...event,
              city: city.city,
              source: 'local'
            });
          }
        });
      });

      // Durch zusätzliche lokale Events suchen
      additionalLocalEvents.forEach(event => {
        const searchFields = [
          event.name,
          event.location,
          event.category,
          event.city,
          event.description
        ].join(' ').toLowerCase();

        if (searchFields.includes(query.toLowerCase())) {
          results.push(event);
        }
      });

      return results;
    } catch (err) {
      console.error('Error searching local events:', err);
      return [];
    }
  };

  // Handler für Input-Änderungen
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      setError(null);
    }
  };

  // Stadt-Filter ändern
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    if (searchQuery.trim().length >= 3) {
      setShowResults(true);
    }
  };

  // Suche leeren
  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCity('');
    setResults([]);
    setShowResults(false);
    setError(null);
  };

  // Enter-Taste für Suche
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim().length >= 3) {
      setShowResults(true);
      performSearch();
    }
  };

  return (
    <div data-event-search className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 max-w-6xl mx-auto">
      {/* Suche Header */}
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {t.title}
      </h2>

      {/* Suche Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Suchfeld */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={t.searchPlaceholder}
            className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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

        {/* Stadt Filter */}
        <div className="md:w-48">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">{t.allCities}</option>
            {ruhrgebietCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Anzeigen */}
      <div className="mb-4">
        {searchQuery.length > 0 && searchQuery.length < 3 && (
          <p className="text-gray-400 text-sm">
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.minChars}
          </p>
        )}

        {results.length > 0 && showResults && !isLoading && (
          <p className="text-orange-400 text-sm font-medium">
            {results.length} {t.resultsCount}
            {searchQuery && ` für "${searchQuery}"`}
            {selectedCity && ` in ${selectedCity}`}
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && showResults && (
        <div className="bg-gray-800/30 rounded-xl p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">{t.loading}</p>
        </div>
      )}

      {/* Error State */}
      {error && showResults && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Suchergebnisse */}
      {showResults && results.length > 0 && !isLoading && (
        <div className="bg-gray-800/30 rounded-xl p-4 space-y-3 max-h-96 overflow-y-auto">
          {results.map((event, index) => (
            <div
              key={`${event.source}-${index}`}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-orange-500/30 transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* Event Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-base font-semibold text-white leading-tight">{event.name}</h3>
                    <div className="flex gap-1 flex-shrink-0">
                      {/* Source Badge */}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.source === 'eventbrite' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {event.source === 'eventbrite' ? t.eventbrite : t.local}
                      </span>
                      
                      {/* Category Badge */}
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}
                      >
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
                      <span className="truncate">
                        {event.location} {event.city && `(${event.city})`}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {event.price === 'Kostenlos' || event.price === 'Free' ? 
                        <span className="text-emerald-400 font-medium">{t.free}</span> :
                        <span>{t.from} {event.price}</span>
                      }
                    </div>
                  </div>
                </div>

                {/* Link/Button */}
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors duration-200 text-sm font-medium whitespace-nowrap"
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
      {showResults && results.length === 0 && !isLoading && !error && searchQuery.length >= 3 && (
        <div className="bg-gray-800/30 rounded-xl p-8 text-center">
          <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 mb-2">{t.noResults}</p>
          <p className="text-sm text-gray-500">
            Versuchen Sie andere Suchbegriffe wie "Museum", "Konzert", "Theater" oder "Zollverein"
          </p>
        </div>
      )}
    </div>
  );
};

export default EventSearch;
