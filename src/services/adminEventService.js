// Event Management Service
class EventManagementService {
  constructor() {
    this.storageKey = 'ruhrpott_admin_events';
    this.init();
  }

  init() {
    // Standarddaten laden wenn noch keine vorhanden
    const stored = this.getEvents();
    if (stored.length === 0) {
      this.seedDefaultEvents();
    }
  }

  // Alle Events aus LocalStorage laden
  getEvents() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading events:', error);
      return [];
    }
  }

  // Events in LocalStorage speichern
  saveEvents(events) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(events));
      return true;
    } catch (error) {
      console.error('Error saving events:', error);
      return false;
    }
  }

  // Event hinzufügen
  addEvent(eventData) {
    const events = this.getEvents();
    const newEvent = {
      ...eventData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    return this.saveEvents(events) ? newEvent : null;
  }

  // Event aktualisieren
  updateEvent(id, eventData) {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    
    if (index !== -1) {
      events[index] = {
        ...events[index],
        ...eventData,
        updatedAt: new Date().toISOString()
      };
      return this.saveEvents(events) ? events[index] : null;
    }
    return null;
  }

  // Event löschen
  deleteEvent(id) {
    const events = this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    return this.saveEvents(filtered);
  }

  // Event nach ID finden
  getEventById(id) {
    const events = this.getEvents();
    return events.find(e => e.id === id) || null;
  }

  // Events nach Stadt filtern
  getEventsByCity(city) {
    const events = this.getEvents();
    return events.filter(e => e.city.toLowerCase() === city.toLowerCase());
  }

  // Events nach Kategorie filtern
  getEventsByCategory(category) {
    const events = this.getEvents();
    return events.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  // Events nach Datum filtern
  getEventsByDateRange(startDate, endDate) {
    const events = this.getEvents();
    return events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
  }

  // Kommende Events (ab heute)
  getUpcomingEvents() {
    const events = this.getEvents();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Events suchen
  searchEvents(query) {
    const events = this.getEvents();
    const searchTerm = query.toLowerCase();
    
    return events.filter(e => 
      e.name.toLowerCase().includes(searchTerm) ||
      e.description.toLowerCase().includes(searchTerm) ||
      e.location.toLowerCase().includes(searchTerm) ||
      e.city.toLowerCase().includes(searchTerm) ||
      e.category.toLowerCase().includes(searchTerm)
    );
  }

  // Daten exportieren
  exportEvents() {
    const events = this.getEvents();
    const exportData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      events: events
    };
    return JSON.stringify(exportData, null, 2);
  }

  // Daten importieren
  importEvents(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (data.events && Array.isArray(data.events)) {
        return this.saveEvents(data.events);
      }
      return false;
    } catch (error) {
      console.error('Error importing events:', error);
      return false;
    }
  }

  // Standard-Events für Entwicklung
  seedDefaultEvents() {
    const defaultEvents = [
      {
        id: 1,
        name: 'Herbert Grönemeyer Konzert - Heimat Tour',
        date: '2025-09-20',
        time: '20:00',
        location: 'Veltins-Arena',
        city: 'Gelsenkirchen',
        category: 'Music',
        price: '45€',
        description: 'Der Bochumer Musiklegende live in der Veltins-Arena',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Dortmunder Philharmoniker - Klassik im Konzerthaus',
        date: '2025-09-16',
        time: '19:30',
        location: 'Konzerthaus Dortmund',
        city: 'Dortmund',
        category: 'Music',
        price: '25€',
        description: 'Klassische Musik vom Feinsten im Herzen Dortmunds',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Ruhrfestspiele Recklinghausen - Hamlet',
        date: '2025-09-18',
        time: '19:00',
        location: 'Ruhrfestspielhaus',
        city: 'Recklinghausen',
        category: 'Theater',
        price: '18€',
        description: 'Shakespeares Klassiker bei den renommierten Ruhrfestspielen',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Zollverein Design Festival - Industriekultur',
        date: '2025-09-22',
        time: '10:00',
        location: 'Zeche Zollverein',
        city: 'Essen',
        category: 'Arts',
        price: 'Kostenlos',
        description: 'Design und Kunst im UNESCO-Welterbe Zollverein',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        name: 'Bochum Total Stadtfestival',
        date: '2025-09-19',
        time: '16:00',
        location: 'Bermudadreieck',
        city: 'Bochum',
        category: 'Festival',
        price: 'Kostenlos',
        description: 'Das größte kostenlose Festival im Ruhrgebiet',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.saveEvents(defaultEvents);
  }

  // Statistiken
  getStatistics() {
    const events = this.getEvents();
    const cities = [...new Set(events.map(e => e.city))];
    const categories = [...new Set(events.map(e => e.category))];
    const upcomingCount = this.getUpcomingEvents().length;
    
    return {
      totalEvents: events.length,
      upcomingEvents: upcomingCount,
      cities: cities.length,
      categories: categories.length,
      citiesList: cities,
      categoriesList: categories
    };
  }
}

// Singleton-Instanz exportieren
const eventService = new EventManagementService();
export default eventService;
