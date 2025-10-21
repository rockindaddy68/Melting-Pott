// Eventbrite API Service
class EventbriteService {
  constructor() {
    // Eventbrite API Konfiguration
    this.apiUrl = 'https://www.eventbriteapi.com/v3';
    // Vite verwendet import.meta.env für Environment Variables
    this.token = import.meta.env.VITE_EVENTBRITE_TOKEN || 'YOUR_EVENTBRITE_TOKEN_HERE';
    
    // Ruhrgebiet Städte für Location-Filter
    this.ruhrgebietCities = [
      'Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen',
      'Oberhausen', 'Hagen', 'Bottrop', 'Recklinghausen', 'Herne',
      'Mülheim an der Ruhr', 'Witten', 'Castrop-Rauxel', 'Gladbeck'
    ];
  }

  // API-Verbindung testen
  async testConnection() {
    if (this.token === 'YOUR_EVENTBRITE_TOKEN_HERE' || !this.token) {
      console.log('❌ Kein gültiger API Token konfiguriert');
      return false;
    }

    try {
      console.log('🧪 Teste Eventbrite API Verbindung...');
      const response = await fetch(`${this.apiUrl}/users/me/`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('✅ Eventbrite API Verbindung erfolgreich:', userData.name);
        return true;
      } else {
        console.error('❌ API Test fehlgeschlagen:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ API Test Fehler:', error.message);
      // Spezifische CORS-Behandlung
      if (error.message.includes('CORS') || error.message.includes('fetch')) {
        console.log('🔧 CORS-Problem erkannt - verwende Mock-Daten für Entwicklung');
      }
      return false;
    }
  }

  // Events aus dem Ruhrgebiet abrufen
  async fetchRuhrgebietEvents(limit = 20) {
    // Nur Mock-Daten verwenden wenn kein Token konfiguriert ist
    if (this.token === 'YOUR_EVENTBRITE_TOKEN_HERE' || !this.token) {
      console.log('🔧 Kein API Token: Verwende Mock Eventbrite-Daten');
      return this.getMockEventbriteEvents();
    }

    // API-Verbindung erst testen
    const connectionOk = await this.testConnection();
    if (!connectionOk) {
      console.log('📝 API nicht erreichbar - verwende Mock-Daten');
      return this.getMockEventbriteEvents();
    }

    console.log('🚀 Verwende echte Eventbrite API mit Token:', this.token.substring(0, 8) + '...');

    try {
      const events = [];
      
      // Für jede Stadt Events abrufen
      for (const city of this.ruhrgebietCities.slice(0, 5)) { // Erstmal 5 Städte testen
        console.log(`🔍 Suche Events in ${city}...`);
        const cityEvents = await this.fetchEventsByLocation(city, 5);
        events.push(...cityEvents);
      }

      console.log(`✅ ${events.length} Events von Eventbrite API geladen`);
      return this.formatEventsForApp(events);
    } catch (error) {
      console.error('Eventbrite API Fehler:', error);
      console.log('📝 Fallback zu Mock-Daten');
      return this.getMockEventbriteEvents();
    }
  }

  // Events für eine bestimmte Stadt abrufen
  async fetchEventsByLocation(city, limit = 10) {
    const params = new URLSearchParams({
      'location.address': `${city}, Deutschland`,
      'location.within': '25km',
      'start_date.range_start': new Date().toISOString(),
      'sort_by': 'date',
      'status': 'live',
      'page_size': limit,
      'expand': 'venue,organizer'
    });

    const response = await fetch(`${this.apiUrl}/events/search/?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Eventbrite API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.events || [];
  }

  // Eventbrite Events in unser App-Format umwandeln
  formatEventsForApp(eventbriteEvents) {
    return eventbriteEvents.map(event => {
      // Stadt aus Venue-Adresse extrahieren
      const city = this.extractCityFromVenue(event.venue);
      
      return {
        id: `eb_${event.id}`,
        title: event.name.text,
        subtitle: this.generateSubtitle(event),
        date: event.start.local.split('T')[0], // YYYY-MM-DD Format
        time: this.formatTime(event.start.local),
        location: event.venue?.name || 'Venue TBD',
        category: this.categorizeEvent(event),
        price: this.formatPrice(event),
        cityName: city,
        source: 'eventbrite',
        url: event.url,
        description: event.description?.text || '',
        organizer: event.organizer?.name || 'Unbekannt'
      };
    }).filter(event => event.cityName); // Nur Events mit gültiger Stadt
  }

  // Stadt aus Venue-Information extrahieren
  extractCityFromVenue(venue) {
    if (!venue || !venue.address) return null;
    
    const address = venue.address;
    const city = address.city || address.localized_area_display || '';
    
    // Prüfen ob es eine Ruhrgebiet-Stadt ist
    const matchedCity = this.ruhrgebietCities.find(ruhrCity => 
      city.toLowerCase().includes(ruhrCity.toLowerCase()) ||
      ruhrCity.toLowerCase().includes(city.toLowerCase())
    );
    
    return matchedCity || null;
  }

  // Event-Kategorie basierend auf Name/Beschreibung bestimmen
  categorizeEvent(event) {
    const title = event.name.text.toLowerCase();
    const description = event.description?.text?.toLowerCase() || '';
    const combined = `${title} ${description}`;

    if (combined.includes('musik') || combined.includes('konzert') || combined.includes('band')) {
      return 'Musik';
    } else if (combined.includes('theater') || combined.includes('bühne') || combined.includes('schauspiel')) {
      return 'Theater';
    } else if (combined.includes('kunst') || combined.includes('galerie') || combined.includes('ausstellung')) {
      return 'Kunst';
    } else if (combined.includes('sport') || combined.includes('fitness') || combined.includes('lauf')) {
      return 'Sport';
    } else if (combined.includes('familie') || combined.includes('kinder') || combined.includes('kids')) {
      return 'Familie';
    } else if (combined.includes('business') || combined.includes('workshop') || combined.includes('seminar')) {
      return 'Business';
    } else if (combined.includes('festival') || combined.includes('fest')) {
      return 'Festival';
    } else {
      return 'Kultur';
    }
  }

  // Preis formatieren
  formatPrice(event) {
    if (!event.ticket_availability || !event.ticket_availability.minimum_ticket_price) {
      return 'Preis auf Anfrage';
    }
    
    const price = event.ticket_availability.minimum_ticket_price;
    if (price.major_value === 0) {
      return 'Kostenlos';
    }
    
    return `${price.major_value}€`;
  }

  // Zeit formatieren (HH:MM)
  formatTime(isoDateTime) {
    const date = new Date(isoDateTime);
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Europe/Berlin'
    });
  }

  // Untertitel generieren
  generateSubtitle(event) {
    const organizer = event.organizer?.name;
    const venue = event.venue?.name;
    
    if (organizer && venue) {
      return `${organizer} @ ${venue}`;
    } else if (venue) {
      return venue;
    } else if (organizer) {
      return `Veranstaltet von ${organizer}`;
    } else {
      return 'Live Event aus dem Ruhrgebiet';
    }
  }

  // Test-Funktion für API-Verbindung
  async testConnection() {
    // Entwicklungsmodus: Immer erfolgreich
    if (this.token === 'YOUR_EVENTBRITE_TOKEN_HERE' || import.meta.env.DEV) {
      return false; // Kein echter API-Zugang
    }

    try {
      const response = await fetch(`${this.apiUrl}/users/me/`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('Eventbrite Verbindungstest fehlgeschlagen:', error);
      return false;
    }
  }

  // Mock Eventbrite-Events für Entwicklung/Demo
  getMockEventbriteEvents() {
    const mockEvents = [
      {
        id: 'eb_mock_1',
        title: 'Jazz Night im Ruhrgebiet',
        subtitle: 'Live Jazz @ Blue Note Essen',
        date: '2025-10-26',
        time: '20:00',
        location: 'Blue Note Jazz Club',
        category: 'Musik',
        price: '15€',
        cityName: 'Essen',
        source: 'eventbrite',
        url: '#',
        description: 'Ein Abend voller Jazz-Musik im Herzen des Ruhrgebiets.',
        organizer: 'Ruhr Jazz Events'
      },
      {
        id: 'eb_mock_2',
        title: 'Streetfood Festival Dortmund',
        subtitle: 'Kulinarische Weltreise @ Phoenix See',
        date: '2025-11-02',
        time: '12:00',
        location: 'Phoenix See',
        category: 'Festival',
        price: 'Kostenlos',
        cityName: 'Dortmund',
        source: 'eventbrite',
        url: '#',
        description: 'Internationale Küche und Live-Musik am Phoenix See.',
        organizer: 'Dortmund Events'
      },
      {
        id: 'eb_mock_3',
        title: 'Digitale Kunst Ausstellung',
        subtitle: 'KI & Kreativität @ Zeche Zollverein',
        date: '2025-11-15',
        time: '10:00',
        location: 'Zeche Zollverein',
        category: 'Kunst',
        price: '12€',
        cityName: 'Essen',
        source: 'eventbrite',
        url: '#',
        description: 'Moderne Kunst trifft auf künstliche Intelligenz.',
        organizer: 'Digital Arts Collective'
      },
      {
        id: 'eb_mock_4',
        title: 'Startup Pitch Night',
        subtitle: 'Innovation im Ruhrgebiet @ TechnologieZentrum',
        date: '2025-11-20',
        time: '18:30',
        location: 'TechnologieZentrum Dortmund',
        category: 'Business',
        price: '5€',
        cityName: 'Dortmund',
        source: 'eventbrite',
        url: '#',
        description: 'Junge Unternehmer präsentieren ihre Ideen.',
        organizer: 'Ruhr Startup Hub'
      },
      {
        id: 'eb_mock_5',
        title: 'Familienfest im Landschaftspark',
        subtitle: 'Spaß für Groß und Klein @ Landschaftspark Duisburg',
        date: '2025-11-09',
        time: '14:00',
        location: 'Landschaftspark Duisburg-Nord',
        category: 'Familie',
        price: 'Kostenlos',
        cityName: 'Duisburg',
        source: 'eventbrite',
        url: '#',
        description: 'Ein Tag voller Aktivitäten für die ganze Familie.',
        organizer: 'Landschaftspark Events'
      },
      {
        id: 'eb_mock_6',
        title: 'Herbstfest auf Zollverein',
        subtitle: 'Saisonale Feier @ UNESCO-Welterbe',
        date: '2025-10-31',
        time: '15:00',
        location: 'Zeche Zollverein',
        category: 'Festival',
        price: '8€',
        cityName: 'Essen',
        source: 'eventbrite',
        url: '#',
        description: 'Halloween trifft Industriekultur - Familienfreundliche Veranstaltung.',
        organizer: 'Zollverein Events'
      },
      {
        id: 'eb_mock_7',
        title: 'Wintermarkt Bochum Innenstadt',
        subtitle: 'Gemütliche Weihnachtszeit @ Stadtpark',
        date: '2025-12-07',
        time: '16:00',
        location: 'Bochum Stadtpark',
        category: 'Familie',
        price: 'Kostenlos',
        cityName: 'Bochum',
        source: 'eventbrite',
        url: '#',
        description: 'Traditioneller Weihnachtsmarkt mit regionalen Anbietern.',
        organizer: 'Bochum Marketing'
      },
      {
        id: 'eb_mock_8',
        title: 'Konzert: Witten Jazz Festival Vorschau',
        subtitle: 'Jazz Preview @ Saalbau Witten',
        date: '2025-11-22',
        time: '19:30',
        location: 'Saalbau Witten',
        category: 'Musik',
        price: '25€',
        cityName: 'Witten',
        source: 'eventbrite',
        url: '#',
        description: 'Vorgeschmack auf das kommende Witten Jazz Festival 2026.',
        organizer: 'Witten Jazz e.V.'
      }
    ];

    return mockEvents;
  }

  // Suche Events nach spezifischer Stadt
  async searchEventsByCity(city, query = '', limit = 10) {
    if (this.token === 'YOUR_EVENTBRITE_TOKEN_HERE' || import.meta.env.DEV) {
      console.log(`🔍 Suche Mock-Events in ${city} für "${query}"`);
      return this.getMockEventbriteEvents()
        .filter(event => 
          event.city.toLowerCase().includes(city.toLowerCase()) ||
          (query && event.name.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, limit);
    }

    try {
      const response = await fetch(
        `${this.apiUrl}/events/search/?q=${encodeURIComponent(query + ' ' + city)}&location.address=${encodeURIComponent(city)}&expand=venue&token=${this.token}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      return data.events
        .filter(event => this.isInRuhrgebiet(event))
        .slice(0, limit)
        .map(event => this.formatEventbriteEvent(event));

    } catch (error) {
      console.warn(`⚠️ Eventbrite Stadt-Suche fehlgeschlagen für ${city}:`, error.message);
      // Fallback zu Mock-Daten
      return this.getMockEventbriteEvents()
        .filter(event => 
          event.city.toLowerCase().includes(city.toLowerCase()) ||
          (query && event.name.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, limit);
    }
  }

  // Suche Events nach Suchbegriff (alle Städte)
  async searchEventsByQuery(query, limit = 20) {
    if (this.token === 'YOUR_EVENTBRITE_TOKEN_HERE' || import.meta.env.DEV) {
      console.log(`🔍 Suche Mock-Events für "${query}"`);
      return this.getMockEventbriteEvents()
        .filter(event => 
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.location.toLowerCase().includes(query.toLowerCase()) ||
          event.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, limit);
    }

    try {
      const events = [];
      
      // Suche in verschiedenen Ruhrgebiet-Städten
      for (const city of this.ruhrgebietCities.slice(0, 6)) { // Erste 6 Städte
        const response = await fetch(
          `${this.apiUrl}/events/search/?q=${encodeURIComponent(query)}&location.address=${encodeURIComponent(city)}&expand=venue&token=${this.token}`
        );

        if (response.ok) {
          const data = await response.json();
          const cityEvents = data.events
            .filter(event => this.isInRuhrgebiet(event))
            .map(event => this.formatEventbriteEvent(event));
          
          events.push(...cityEvents);
        }
      }

      // Duplikate entfernen und limitieren
      const uniqueEvents = events.filter((event, index, self) => 
        index === self.findIndex(e => e.name === event.name && e.location === event.location)
      );

      return uniqueEvents.slice(0, limit);

    } catch (error) {
      console.warn(`⚠️ Eventbrite Suche fehlgeschlagen für "${query}":`, error.message);
      // Fallback zu Mock-Daten
      return this.getMockEventbriteEvents()
        .filter(event => 
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.location.toLowerCase().includes(query.toLowerCase()) ||
          event.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, limit);
    }
  }

  // Hilfsmethode: Eventbrite Event für Suche formatieren
  formatEventbriteEvent(event) {
    return {
      id: `eb_${event.id}`,
      name: event.name.text,
      location: event.venue?.name || 'Venue nicht verfügbar',
      city: this.extractCityFromVenue(event.venue),
      date: event.start.local.split('T')[0],
      time: this.formatTime(event.start.local),
      category: this.categorizeEvent(event),
      price: this.formatPrice(event),
      url: event.url,
      source: 'eventbrite',
      description: event.description?.text || ''
    };
  }
}

export default EventbriteService;