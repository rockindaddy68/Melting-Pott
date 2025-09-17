// Eventbrite API Service für automatische Event-Synchronisation
class EventbriteAPI {
  constructor() {
    // API Konfiguration - diese sollten später über Admin Panel konfiguriert werden
    this.baseURL = 'https://www.eventbriteapi.com/v3';
    this.token = null; // Wird über Admin Panel gesetzt
    this.organizationId = null; // Wird über Admin Panel gesetzt
    
    // Rate Limiting
    this.lastRequest = 0;
    this.minRequestInterval = 100; // 100ms zwischen Requests
    
    // Cache für bessere Performance
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 Minuten Cache
  }

  // API Token setzen (über Admin Panel)
  setApiToken(token) {
    this.token = token;
    localStorage.setItem('eventbrite_api_token', token);
  }

  // Organization ID setzen
  setOrganizationId(orgId) {
    this.organizationId = orgId;
    localStorage.setItem('eventbrite_org_id', orgId);
  }

  // Gespeicherte Konfiguration laden
  loadConfig() {
    this.token = localStorage.getItem('eventbrite_api_token');
    this.organizationId = localStorage.getItem('eventbrite_org_id');
  }

  // Rate Limiting implementieren
  async rateLimitedRequest(url, options = {}) {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequest = Date.now();
    return fetch(url, options);
  }

  // Basis API Request
  async makeRequest(endpoint, options = {}) {
    if (!this.token) {
      throw new Error('Eventbrite API Token ist nicht konfiguriert');
    }

    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
    
    // Cache prüfen
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await this.rateLimitedRequest(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        throw new Error(`Eventbrite API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // In Cache speichern
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Eventbrite API Request failed:', error);
      throw error;
    }
  }

  // Events für Organisation abrufen
  async getOrganizationEvents(params = {}) {
    if (!this.organizationId) {
      throw new Error('Organization ID ist nicht konfiguriert');
    }

    const defaultParams = {
      status: 'live',
      order_by: 'start_asc',
      expand: 'venue,ticket_classes,organizer',
      page_size: 50
    };

    const queryParams = new URLSearchParams({
      ...defaultParams,
      ...params
    });

    return this.makeRequest(`/organizations/${this.organizationId}/events/?${queryParams}`);
  }

  // Events nach Location suchen (Ruhrgebiet)
  async searchEventsByLocation(location = 'Ruhrgebiet', params = {}) {
    const defaultParams = {
      'location.address': location,
      'location.within': '50km',
      status: 'live',
      order_by: 'start_asc',
      expand: 'venue,ticket_classes,organizer',
      page_size: 50,
      categories: '103,110,113,108', // Musik, Business, Community, Arts
      start_date: {
        range_start: new Date().toISOString(),
        range_end: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 Tage
      }
    };

    const queryParams = new URLSearchParams({
      ...defaultParams,
      ...params
    });

    return this.makeRequest(`/events/search/?${queryParams}`);
  }

  // Spezifische Ruhrgebiet-Städte durchsuchen
  async searchRuhrgebietEvents() {
    const ruhrCities = [
      'Dortmund, Deutschland',
      'Essen, Deutschland',
      'Bochum, Deutschland',
      'Duisburg, Deutschland',
      'Gelsenkirchen, Deutschland',
      'Oberhausen, Deutschland',
      'Hagen, Deutschland',
      'Recklinghausen, Deutschland',
      'Bottrop, Deutschland',
      'Mühlheim an der Ruhr, Deutschland'
    ];

    const allEvents = [];
    
    for (const city of ruhrCities) {
      try {
        const response = await this.searchEventsByLocation(city);
        if (response.events) {
          allEvents.push(...response.events);
        }
        
        // Kleine Pause zwischen Stadt-Abfragen
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.warn(`Fehler beim Laden der Events für ${city}:`, error);
      }
    }

    // Duplikate entfernen (basierend auf Event ID)
    const uniqueEvents = allEvents.filter((event, index, self) =>
      index === self.findIndex(e => e.id === event.id)
    );

    return uniqueEvents;
  }

  // Event Details abrufen
  async getEventDetails(eventId) {
    return this.makeRequest(`/events/${eventId}/?expand=venue,ticket_classes,organizer,category,subcategory,format`);
  }

  // Events seit letzter Aktualisierung
  async getUpdatedEvents(since) {
    const params = {
      changed_since: since,
      expand: 'venue,ticket_classes,organizer'
    };

    return this.getOrganizationEvents(params);
  }

  // Webhook URL registrieren
  async registerWebhook(webhookUrl, actions = ['event.published', 'event.updated']) {
    const webhookData = {
      endpoint_url: webhookUrl,
      actions: actions.join(','),
      format: 'json'
    };

    return this.makeRequest('/webhooks/', {
      method: 'POST',
      body: JSON.stringify(webhookData)
    });
  }

  // Webhook Status prüfen
  async getWebhooks() {
    return this.makeRequest('/webhooks/');
  }

  // Event zu lokalem Format konvertieren
  convertEventToLocal(eventbriteEvent) {
    const venue = eventbriteEvent.venue || {};
    const start = new Date(eventbriteEvent.start.local);
    
    return {
      id: `eventbrite_${eventbriteEvent.id}`,
      originalId: eventbriteEvent.id,
      source: 'eventbrite',
      title: eventbriteEvent.name.text,
      description: eventbriteEvent.description ? eventbriteEvent.description.text : '',
      date: start.toISOString().split('T')[0],
      time: start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      location: venue.name || 'Unbekannte Location',
      address: venue.address ? 
        `${venue.address.localized_area_display || ''} ${venue.address.city || ''}`.trim() : '',
      city: venue.address?.city || 'Ruhrgebiet',
      category: eventbriteEvent.category?.short_name || 'Event',
      price: this.extractPrice(eventbriteEvent.ticket_classes),
      url: eventbriteEvent.url,
      imageUrl: eventbriteEvent.logo ? eventbriteEvent.logo.url : null,
      organizer: eventbriteEvent.organizer?.name || '',
      capacity: eventbriteEvent.capacity,
      isOnline: eventbriteEvent.online_event,
      lastUpdated: new Date().toISOString(),
      tags: this.extractTags(eventbriteEvent)
    };
  }

  // Preis aus Ticket-Klassen extrahieren
  extractPrice(ticketClasses) {
    if (!ticketClasses || ticketClasses.length === 0) return 'Kostenlos';
    
    const prices = ticketClasses
      .filter(tc => tc.cost && tc.cost.major_value)
      .map(tc => parseFloat(tc.cost.major_value));
    
    if (prices.length === 0) return 'Kostenlos';
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    if (minPrice === maxPrice) {
      return `${minPrice}€`;
    } else {
      return `${minPrice}€ - ${maxPrice}€`;
    }
  }

  // Tags aus Event-Daten extrahieren
  extractTags(event) {
    const tags = [];
    
    if (event.category) tags.push(event.category.short_name);
    if (event.subcategory) tags.push(event.subcategory.name);
    if (event.format) tags.push(event.format.short_name);
    if (event.online_event) tags.push('Online');
    if (event.venue && event.venue.address?.city) tags.push(event.venue.address.city);
    
    return tags;
  }

  // API Verbindung testen
  async testConnection() {
    try {
      const response = await this.makeRequest('/users/me/');
      return {
        success: true,
        data: response,
        message: 'Eventbrite API Verbindung erfolgreich'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Eventbrite API Verbindung fehlgeschlagen'
      };
    }
  }

  // Cache leeren
  clearCache() {
    this.cache.clear();
  }

  // Statistiken
  getCacheStats() {
    return {
      cacheSize: this.cache.size,
      lastRequest: this.lastRequest,
      isConfigured: !!(this.token && this.organizationId)
    };
  }
}

// Singleton Instance
const eventbriteAPI = new EventbriteAPI();
eventbriteAPI.loadConfig();

export default eventbriteAPI;
