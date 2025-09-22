import React, { useState, useEffect } from 'react';
import { citiesData } from '../data/citiesData.js';
import { formatGermanDate } from '../utils/eventsHelpers.js';
import EventbriteService from '../services/eventbriteService.js';

const EnhancedEventTicker = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState('local');

  // Eventbrite Service initialisieren
  const eventbriteService = new EventbriteService();

  // Lokale Events laden
  const getLocalEvents = () => {
    const allEvents = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    citiesData.forEach(city => {
      city.events.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate >= today) {
          allEvents.push({
            ...event,
            cityName: city.name,
            cityId: city.id,
            source: 'local'
          });
        }
      });
    });

    return allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Alle Events laden (lokale + Eventbrite)
  const loadAllEvents = async () => {
    setIsLoading(true);
    
    try {
      const localEvents = getLocalEvents();
      let eventbriteEvents = [];
      
      try {
        console.log('🔄 Lade Eventbrite Events...');
        eventbriteEvents = await eventbriteService.fetchRuhrgebietEvents(15);
        
        if (eventbriteEvents && eventbriteEvents.length > 0) {
          console.log(`✅ Eventbrite: ${eventbriteEvents.length} Events geladen`);
          setDataSource('mixed');
        } else {
          console.log('📝 Keine Eventbrite Events erhalten - nur lokale Events');
          setDataSource('local');
        }
      } catch (error) {
        console.error('❌ Fehler beim Laden von Eventbrite Events:', error);
        console.log('⚠️ Eventbrite API nicht verfügbar - nur lokale Events');
        setDataSource('local');
      }
      
      const combinedEvents = [...localEvents, ...eventbriteEvents]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 25);
      
      setAllEvents(combinedEvents);
      setDataSource(eventbriteEvents.length > 0 ? 'mixed' : 'local');
      
    } catch (error) {
      console.error('❌ Fehler beim Laden der Events:', error);
      setAllEvents(getLocalEvents());
      setDataSource('local');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllEvents();
  }, []);

  // Ticker Animation
  useEffect(() => {
    if (allEvents.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentEventIndex(prev => 
          prev >= allEvents.length - 1 ? 0 : prev + 1
        );
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [allEvents.length]);

  // Kategorie bestimmen
  const getEventCategory = (eventDate) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    const diffTime = eventDay.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return { label: "HEUTE", color: "text-orange-400", pulse: true };
    } else if (diffDays <= 2) {
      return { label: "MORGEN", color: "text-orange-400", pulse: false };
    } else if (diffDays <= 7) {
      return { label: "DIESE WOCHE", color: "text-orange-400", pulse: false };
    } else {
      return { label: "DEMNÄCHST", color: "text-orange-400", pulse: false };
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-black text-white p-8 rounded-xl shadow-2xl min-h-[280px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Lade Events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (allEvents.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-black text-white p-8 rounded-xl shadow-2xl min-h-[280px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🎫</div>
            <span className="text-xl font-semibold text-white">
              Keine aktuellen Veranstaltungen verfügbar
            </span>
            <p className="text-gray-400 text-sm">
              Alle Events wurden bereits durchgeführt oder sind noch nicht geplant.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentEvent = allEvents[currentEventIndex];
  const category = getEventCategory(currentEvent.date);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-black text-white p-8 rounded-xl shadow-2xl min-h-[280px]">
        {/* Header mit Datenquelle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <span className="text-3xl">🎫</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">LIVE EVENT-TICKER</h2>
              <div className="flex items-center space-x-2 mt-1">
                {dataSource === 'mixed' && (
                  <>
                    <span className="px-2 py-1 text-orange-400 text-xs rounded-full font-semibold">LIVE</span>
                    <span className="text-orange-400 text-sm">Eventbrite + Lokale Daten</span>
                  </>
                )}
                {dataSource === 'local' && (
                  <span className="px-2 py-1 text-orange-400 text-xs rounded-full font-semibold">LOKAL</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <span className="opacity-75 text-gray-300">
              {currentEventIndex + 1} von {allEvents.length}
            </span>
            <div className="flex space-x-1">
              {allEvents.slice(0, 10).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentEventIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div 
          className={`transition-all duration-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="flex items-start justify-between">
            {/* Event Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-4">
                {/* Kategorie Badge */}
                <span 
                  className={`px-4 py-2 rounded-full text-sm font-bold ${category.color} ${
                    category.pulse ? 'animate-pulse' : ''
                  } shadow-lg`}
                >
                  {category.label}
                </span>
                
                {/* Stadt */}
                <span className="text-gray-300 font-semibold text-lg">
                  📍 {currentEvent.cityName}
                </span>

                {/* Datenquelle Badge */}
                {currentEvent.source === 'eventbrite' && (
                  <span className="px-2 py-1 text-orange-400 text-xs rounded font-semibold">
                    🔴 LIVE
                  </span>
                )}
              </div>

              {/* Event Titel */}
              <h3 className="text-2xl font-bold mb-2 text-white leading-tight">
                {currentEvent.title}
              </h3>
              
              {/* Event Untertitel */}
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                {currentEvent.subtitle}
              </p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-3 rounded-lg">
                  <span className="text-xl">📅</span>
                  <div>
                    <span className="text-gray-400 text-sm block">Datum</span>
                    <span className="font-medium text-white">
                      {formatGermanDate(currentEvent.date)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-3 rounded-lg">
                  <span className="text-xl">⏰</span>
                  <div>
                    <span className="text-gray-400 text-sm block">Uhrzeit</span>
                    <span className="text-white font-medium">{currentEvent.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-3 rounded-lg">
                  <span className="text-xl">📍</span>
                  <div>
                    <span className="text-gray-400 text-sm block">Ort</span>
                    <span className="text-white font-medium">{currentEvent.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-3 rounded-lg">
                  <span className="text-xl">🎫</span>
                  <div>
                    <span className="text-gray-400 text-sm block">Preis</span>
                    <span className="font-bold text-orange-400 text-lg">
                      {currentEvent.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="ml-8 flex-shrink-0">
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    className="text-gray-600"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    className="text-white animate-pulse"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - (currentEventIndex + 1) / allEvents.length)}`}
                    style={{
                      transition: 'stroke-dashoffset 0.5s ease-in-out'
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {Math.round(((currentEventIndex + 1) / allEvents.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-Scroll Indikator */}
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span>Automatische Aktualisierung alle 4 Sekunden</span>
              {dataSource === 'mixed' && (
                <span className="text-blue-300">• Live-Daten aktiv</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEventTicker;