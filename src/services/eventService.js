const API_BASE_URL = 'http://localhost:3001/api';

class EventService {
  // Hole alle Events
  async getEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  // Hole Events nach Stadt
  async getEventsByCity(city) {
    try {
      const response = await fetch(`${API_BASE_URL}/events?city=${city}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch events for ${city}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching events for ${city}:`, error);
      return [];
    }
  }

  // Hole Events nach Kategorie
  async getEventsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/events?category=${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch events for category ${category}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching events for category ${category}:`, error);
      return [];
    }
  }

  // Hole kommende Events (nächste 30 Tage)
  async getUpcomingEvents() {
    try {
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      
      const response = await fetch(`${API_BASE_URL}/events?startDate=${now.toISOString()}&endDate=${thirtyDaysFromNow.toISOString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
  }

  // Suche Events
  async searchEvents(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/events/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching events:', error);
      return [];
    }
  }

  // Formatiere Event-Daten für die Frontend-Darstellung
  formatEventForDisplay(event) {
    return {
      title: event.title,
      subtitle: event.shortDescription,
      date: new Date(event.dateTime.start).toISOString().split('T')[0],
      time: new Date(event.dateTime.start).toLocaleTimeString('de-DE', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      location: event.venue.name,
      category: this.capitalizeFirst(event.category),
      price: event.price.isFree ? 'Kostenlos' : 
             event.price.min === event.price.max ? 
             `${event.price.min}€` : 
             `${event.price.min}-${event.price.max}€`,
      city: this.capitalizeFirst(event.city),
      image: event.images.find(img => img.isPrimary)?.url || '/src/assets/images/default-event.jpg'
    };
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Gruppiere Events nach Stadt für die Events-Komponente
  async getEventsGroupedByCity() {
    try {
      const events = await this.getUpcomingEvents();
      const groupedEvents = {};

      // Initialisiere alle Ruhrgebiet-Städte
      const ruhrCities = [
        'essen', 'dortmund', 'duisburg', 'bochum', 'gelsenkirchen', 
        'oberhausen', 'herne', 'hamm', 'mülheim-an-der-ruhr', 
        'hattingen', 'recklinghausen', 'moers'
      ];

      ruhrCities.forEach(city => {
        groupedEvents[city] = {
          id: ruhrCities.indexOf(city) + 1,
          name: this.capitalizeFirst(city.replace('-', ' ')),
          events: [],
          image: `/src/assets/images/städte/${city}/${city}-main.jpg`
        };
      });

      // Gruppiere Events nach Stadt
      events.forEach(event => {
        const cityKey = event.city.toLowerCase().replace(/\s+/g, '-');
        if (groupedEvents[cityKey]) {
          groupedEvents[cityKey].events.push(this.formatEventForDisplay(event));
        }
      });

      return Object.values(groupedEvents).slice(0, 12); // Nur 12 Städte zeigen
    } catch (error) {
      console.error('Error grouping events by city:', error);
      return [];
    }
  }
}

export default new EventService();
