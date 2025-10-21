// Real Events Service für Event Ticker Integration
import eventbriteService from './eventbriteService.js';
import adminEventService from './adminEventService.js';

class RealEventsService {
  constructor() {
    this.isLoading = false;
    this.lastFetch = null;
    this.cachedEvents = [];
    this.cacheExpiry = 10 * 60 * 1000; // 10 Minuten Cache
  }

  // Hauptfunktion: Alle realen Events für den Ticker laden
  async getRealEventsForTicker(limit = 20) {
    console.log('🎯 Lade reale Events für Event Ticker...');
    
    try {
      // Cache prüfen
      if (this.isCacheValid()) {
        console.log('📋 Verwende gecachte Events');
        return this.cachedEvents.slice(0, limit);
      }

      this.isLoading = true;
      
      // 1. Events aus verschiedenen Quellen sammeln
      const allEvents = await this.collectEventsFromAllSources();
      
      // 2. Events filtern und sortieren
      const filteredEvents = this.filterAndSortEvents(allEvents);
      
      // 3. Events für Ticker formatieren
      const tickerEvents = this.formatEventsForTicker(filteredEvents, limit);
      
      // 4. Cache aktualisieren
      this.updateCache(tickerEvents);
      
      console.log(`✅ ${tickerEvents.length} reale Events für Ticker geladen`);
      return tickerEvents;
      
    } catch (error) {
      console.error('❌ Fehler beim Laden realer Events:', error);
      return this.getFallbackEvents(limit);
    } finally {
      this.isLoading = false;
    }
  }

  // Events aus allen verfügbaren Quellen sammeln
  async collectEventsFromAllSources() {
    const eventSources = [];
    
    try {
      // 1. Eventbrite Events
      console.log('🔄 Lade Eventbrite Events...');
      const eventbriteEvents = await this.getEventbriteEvents();
      eventSources.push(...eventbriteEvents);
      console.log(`📅 Eventbrite: ${eventbriteEvents.length} Events geladen`);
      
    } catch (error) {
      console.warn('⚠️ Eventbrite Events nicht verfügbar:', error.message);
    }

    try {
      // 2. Admin Events (Backend)
      console.log('🔄 Lade Admin Events...');
      const adminEvents = await this.getAdminEvents();
      eventSources.push(...adminEvents);
      console.log(`📅 Admin Events: ${adminEvents.length} Events geladen`);
      
    } catch (error) {
      console.warn('⚠️ Admin Events nicht verfügbar:', error.message);
    }

    try {
      // 3. Mock Events als Fallback
      console.log('🔄 Lade Mock Events...');
      const mockEvents = await this.getMockEvents();
      eventSources.push(...mockEvents);
      console.log(`📅 Mock Events: ${mockEvents.length} Events geladen`);
      
    } catch (error) {
      console.warn('⚠️ Mock Events nicht verfügbar:', error.message);
    }

    return eventSources;
  }

  // Eventbrite Events abrufen
  async getEventbriteEvents() {
    try {
      // Teste API-Verbindung
      const isConnected = await eventbriteService.testConnection();
      
      if (!isConnected) {
        console.log('📝 Eventbrite API nicht verfügbar - verwende Mock-Events');
        return eventbriteService.getMockEventbriteEvents();
      }

      // Echte API-Events abrufen
      const events = await eventbriteService.fetchRuhrgebietEvents(15);
      return events.map(event => ({
        ...event,
        source: 'eventbrite-api',
        priority: 1 // Höchste Priorität für echte Events
      }));
      
    } catch (error) {
      console.warn('Eventbrite API Fehler:', error);
      // Fallback auf Mock-Events
      return eventbriteService.getMockEventbriteEvents().map(event => ({
        ...event,
        source: 'eventbrite-mock',
        priority: 2
      }));
    }
  }

  // Admin Events aus Backend abrufen
  async getAdminEvents() {
    try {
      const events = adminEventService.getEvents();
      return events
        .filter(event => new Date(event.date) >= new Date())
        .map(event => ({
          id: `admin_${event.id}`,
          title: event.name || event.title,
          subtitle: `${event.category} @ ${event.location}`,
          date: event.date,
          time: event.time || '19:00',
          location: event.location,
          category: event.category || 'Event',
          price: event.price || 'Preis auf Anfrage',
          cityName: event.city,
          source: 'admin-backend',
          priority: 1,
          description: event.description || '',
          organizer: event.organizer || 'Ruhrpott Events'
        }));
    } catch (error) {
      console.warn('Admin Events nicht verfügbar:', error);
      return [];
    }
  }

  // Mock Events für Demo-Zwecke
  async getMockEvents() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return [
      {
        id: 'real_mock_1',
        title: 'Ruhrpott Konzert Night',
        subtitle: 'Live Musik @ Zeche Zollverein',
        date: tomorrow.toISOString().split('T')[0],
        time: '20:00',
        location: 'Zeche Zollverein',
        category: 'Musik',
        price: '18€',
        cityName: 'Essen',
        source: 'mock-events',
        priority: 3,
        description: 'Ein Abend voller Musik aus der Region',
        organizer: 'Ruhrpott Music Collective'
      },
      {
        id: 'real_mock_2',
        title: 'Digital Future Conference',
        subtitle: 'Innovation @ Dortmunder U',
        date: nextWeek.toISOString().split('T')[0],
        time: '09:00',
        location: 'Dortmunder U',
        category: 'Business',
        price: 'Kostenlos',
        cityName: 'Dortmund',
        source: 'mock-events',
        priority: 3,
        description: 'Digitale Transformation im Ruhrgebiet',
        organizer: 'Digital Ruhr e.V.'
      },
      {
        id: 'real_mock_3',
        title: 'Herbstfest am Phoenix See',
        subtitle: 'Familie & Spaß @ Phoenix See',
        date: nextWeek.toISOString().split('T')[0],
        time: '14:00',
        location: 'Phoenix See',
        category: 'Familie',
        price: 'Kostenlos',
        cityName: 'Dortmund',
        source: 'mock-events',
        priority: 3,
        description: 'Familienfreundliches Fest mit regionalen Anbietern',
        organizer: 'Phoenix See Events'
      }
    ];
  }

  // Events filtern und sortieren
  filterAndSortEvents(events) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      // Nur zukünftige Events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      })
      // Duplikate entfernen (basierend auf Titel und Datum)
      .filter((event, index, self) => 
        index === self.findIndex(e => 
          e.title === event.title && e.date === event.date
        )
      )
      // Nach Priorität und Datum sortieren
      .sort((a, b) => {
        // Erst nach Priorität (niedriger = höher)
        if (a.priority !== b.priority) {
          return (a.priority || 5) - (b.priority || 5);
        }
        // Dann nach Datum
        return new Date(a.date) - new Date(b.date);
      });
  }

  // Events für Ticker formatieren
  formatEventsForTicker(events, limit) {
    return events
      .slice(0, limit)
      .map(event => {
        // Sicherstellen, dass alle notwendigen Felder vorhanden sind
        return {
          id: event.id || `ticker_${Date.now()}_${Math.random()}`,
          title: this.truncateText(event.title, 60),
          subtitle: this.truncateText(event.subtitle || event.location, 80),
          date: event.date,
          time: event.time || '19:00',
          location: this.truncateText(event.location, 40),
          category: event.category || 'Event',
          price: event.price || 'Preis auf Anfrage',
          cityName: event.cityName,
          source: event.source,
          priority: event.priority || 5,
          tickerDisplay: this.createTickerDisplay(event),
          url: event.url || '#',
          organizer: event.organizer || 'Ruhrpott Events'
        };
      });
  }

  // Ticker-Display Text erstellen
  createTickerDisplay(event) {
    const date = new Date(event.date);
    const dateStr = date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit'
    });
    
    const timeStr = event.time || '19:00';
    const cityStr = event.cityName || 'Ruhrgebiet';
    const priceStr = event.price || '';
    
    // Kompakter Ticker-Text
    return `${dateStr} ${timeStr} | ${event.title} | ${cityStr} | ${priceStr}`;
  }

  // Text kürzen wenn zu lang
  truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  }

  // Cache Management
  isCacheValid() {
    if (!this.lastFetch || this.cachedEvents.length === 0) {
      return false;
    }
    
    const now = new Date().getTime();
    const cacheAge = now - this.lastFetch.getTime();
    
    return cacheAge < this.cacheExpiry;
  }

  updateCache(events) {
    this.cachedEvents = [...events];
    this.lastFetch = new Date();
  }

  clearCache() {
    this.cachedEvents = [];
    this.lastFetch = null;
  }

  // Fallback Events wenn alles fehlschlägt
  getFallbackEvents(limit = 10) {
    console.log('🚨 Verwende Fallback Events');
    
    const fallbackEvents = [
      {
        id: 'fallback_1',
        title: 'Ruhrgebiet Events',
        subtitle: 'Entdecke das Ruhrgebiet',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        location: 'Verschiedene Orte',
        category: 'Kultur',
        price: 'Variiert',
        cityName: 'Ruhrgebiet',
        source: 'fallback',
        priority: 9,
        tickerDisplay: 'Täglich neue Events im Ruhrgebiet entdecken'
      }
    ];
    
    return fallbackEvents.slice(0, limit);
  }

  // Status-Information abrufen
  getStatus() {
    return {
      isLoading: this.isLoading,
      cacheValid: this.isCacheValid(),
      cachedEventsCount: this.cachedEvents.length,
      lastFetch: this.lastFetch,
      cacheExpiry: this.cacheExpiry
    };
  }

  // Manual Refresh
  async refreshEvents(limit = 20) {
    this.clearCache();
    return await this.getRealEventsForTicker(limit);
  }
}

// Singleton Instanz
const realEventsService = new RealEventsService();

export default realEventsService;