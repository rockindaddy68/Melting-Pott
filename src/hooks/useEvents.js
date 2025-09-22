import { useState, useEffect } from 'react';
import eventService from '../services/eventService';

// Hook für Events mit automatischer Aktualisierung
export const useEvents = (refreshInterval = 300000) => { // 5 Minuten Standard
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventData = await eventService.getEventsGroupedByCity();
      setEvents(eventData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    fetchEvents();

    // Automatische Aktualisierung
    const interval = setInterval(() => {
      fetchEvents();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const refresh = () => {
    fetchEvents();
  };

  return {
    events,
    loading,
    error,
    lastUpdated,
    refresh
  };
};

// Hook für Events einer spezifischen Stadt
export const useCityEvents = (cityName, refreshInterval = 300000) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCityEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventData = await eventService.getEventsByCity(cityName);
      setEvents(eventData.map(event => eventService.formatEventForDisplay(event)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityName) {
      fetchCityEvents();
      
      const interval = setInterval(() => {
        fetchCityEvents();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [cityName, refreshInterval]);

  return { events, loading, error };
};

// Hook für Event-Suche
export const useEventSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const search = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      const results = await eventService.searchEvents(query);
      setSearchResults(results.map(event => eventService.formatEventForDisplay(event)));
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchError(null);
  };

  return {
    search,
    clearSearch,
    searchResults,
    searchLoading,
    searchError
  };
};

// Hook für kommende Events (für Hero-Sektion)
export const useUpcomingEvents = (limit = 5) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const events = await eventService.getUpcomingEvents();
        setUpcomingEvents(events.slice(0, limit));
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
    
    // Aktualisiere jede Stunde
    const interval = setInterval(fetchUpcoming, 3600000);
    return () => clearInterval(interval);
  }, [limit]);

  return { upcomingEvents, loading };
};
