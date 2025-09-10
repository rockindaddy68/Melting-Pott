// Mock Event Service für lokale Entwicklung (ohne Backend)
class MockEventService {
  constructor() {
    // Simuliere verschiedene Events für verschiedene Städte
    this.mockEvents = [
      {
        title: "Zeche Zollverein UNESCO-Führung",
        shortDescription: "Welterbe Industriekultur erleben", 
        category: "kultur",
        city: "essen",
        venue: { name: "Zeche Zollverein" },
        dateTime: { 
          start: new Date(2025, 9, 15, 14, 0) // 15. Oktober 2025, 14:00
        },
        price: { min: 12, max: 12, isFree: false },
        images: [{ url: "/src/assets/images/städte/essen/Zollverein.jpg", isPrimary: true }]
      },
      {
        title: "BVB Stadion-Tour",
        shortDescription: "Signal Iduna Park erleben",
        category: "sport", 
        city: "dortmund",
        venue: { name: "Signal Iduna Park" },
        dateTime: { 
          start: new Date(2025, 9, 18, 15, 0)
        },
        price: { min: 18, max: 18, isFree: false },
        images: [{ url: "/src/assets/images/städte/dortmund/SignalIdunaPark.jpg", isPrimary: true }]
      },
      {
        title: "LaPaDu Lichtinstallation",
        shortDescription: "Spektakuläre Lichtshow im Landschaftspark",
        category: "kunst",
        city: "duisburg", 
        venue: { name: "Landschaftspark Duisburg-Nord" },
        dateTime: {
          start: new Date(2025, 9, 20, 19, 30)
        },
        price: { min: 0, max: 0, isFree: true },
        images: [{ url: "/src/assets/images/städte/duisburg/Landschaftspark.jpg", isPrimary: true }]
      },
      {
        title: "Deutsches Bergbau-Museum", 
        shortDescription: "Industriegeschichte hautnah erleben",
        category: "bildung",
        city: "bochum",
        venue: { name: "Deutsches Bergbau-Museum" },
        dateTime: {
          start: new Date(2025, 9, 22, 10, 0)
        },
        price: { min: 10, max: 10, isFree: false },
        images: [{ url: "/src/assets/images/städte/bochum/Jahrhunderthalle Bochum.jpg", isPrimary: true }]
      },
      {
        title: "ZOOM Erlebniswelt",
        shortDescription: "Weltreise an einem Tag", 
        category: "familie",
        city: "gelsenkirchen",
        venue: { name: "ZOOM Erlebniswelt" },
        dateTime: {
          start: new Date(2025, 9, 25, 9, 0)
        },
        price: { min: 24, max: 24, isFree: false },
        images: [{ url: "/src/assets/images/städte/gelsenkirchen/NordsternHerkules.jpg", isPrimary: true }]
      },
      {
        title: "Gasometer Ausstellung",
        shortDescription: "Das zerbrechliche Paradies",
        category: "kunst",
        city: "oberhausen",
        venue: { name: "Gasometer Oberhausen" },
        dateTime: {
          start: new Date(2025, 9, 28, 11, 0)
        },
        price: { min: 15, max: 15, isFree: false },
        images: [{ url: "/src/assets/images/städte/oberhausen/Gasometer.jpg", isPrimary: true }]
      }
    ];
  }

  // Simuliere API-Aufrufe mit Delays
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getUpcomingEvents() {
    await this.delay(300); // Simuliere Netzwerk-Delay
    // Filtere Events, die in der Zukunft liegen
    const now = new Date();
    return this.mockEvents.filter(event => event.dateTime.start > now);
  }

  async getEventsByCity(city) {
    await this.delay(200);
    return this.mockEvents.filter(event => 
      event.city.toLowerCase() === city.toLowerCase()
    );
  }

  async searchEvents(query) {
    await this.delay(400);
    const searchTerm = query.toLowerCase();
    return this.mockEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm) ||
      event.shortDescription.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm)
    );
  }

  formatEventForDisplay(event) {
    return {
      title: event.title,
      subtitle: event.shortDescription,
      date: event.dateTime.start.toISOString().split('T')[0],
      time: event.dateTime.start.toLocaleTimeString('de-DE', { 
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
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
  }

  async getEventsGroupedByCity() {
    await this.delay(500);
    
    const events = await this.getUpcomingEvents();
    const groupedEvents = {};

    // Ruhrgebiet-Städte
    const ruhrCities = [
      'essen', 'dortmund', 'duisburg', 'bochum', 'gelsenkirchen', 
      'oberhausen', 'herne', 'hamm', 'mülheim-an-der-ruhr', 
      'hattingen', 'recklinghausen', 'moers'
    ];

    ruhrCities.forEach(city => {
      groupedEvents[city] = {
        id: ruhrCities.indexOf(city) + 1,
        name: this.capitalizeFirst(city),
        events: [],
        image: `/src/assets/images/städte/${city}/${city}-main.jpg`
      };
    });

    // Gruppiere Events nach Stadt
    events.forEach(event => {
      const cityKey = event.city.toLowerCase();
      if (groupedEvents[cityKey]) {
        groupedEvents[cityKey].events.push(this.formatEventForDisplay(event));
      }
    });

    // Füge Mock-Events für Städte ohne Events hinzu
    Object.keys(groupedEvents).forEach(cityKey => {
      if (groupedEvents[cityKey].events.length === 0) {
        // Füge Platzhalter-Events hinzu
        groupedEvents[cityKey].events.push({
          title: `Entdecke ${groupedEvents[cityKey].name}`,
          subtitle: "Weitere Events folgen bald",
          date: new Date().toISOString().split('T')[0],
          time: "Ganztägig",
          location: `${groupedEvents[cityKey].name} Zentrum`,
          category: "Info",
          price: "Kostenlos"
        });
      }
    });

    return Object.values(groupedEvents).slice(0, 12);
  }

  // Simuliere Live-Updates (neue Events)
  generateRandomEvent() {
    const titles = [
      "Neue Kunstausstellung", 
      "Jazz-Konzert", 
      "Familientag", 
      "Industriekultur-Führung",
      "Foodtruck Festival"
    ];
    
    const cities = ['essen', 'dortmund', 'bochum', 'duisburg'];
    const categories = ['kultur', 'musik', 'familie', 'kunst', 'festival'];
    
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Event für nächste Woche generieren
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7 + Math.floor(Math.random() * 14));
    
    return {
      title: randomTitle,
      shortDescription: "Neu hinzugefügtes Event",
      category: randomCategory,
      city: randomCity,
      venue: { name: `${this.capitalizeFirst(randomCity)} Location` },
      dateTime: { start: nextWeek },
      price: { min: Math.floor(Math.random() * 30), max: Math.floor(Math.random() * 30) + 30, isFree: Math.random() > 0.7 },
      images: [{ url: `/src/assets/images/städte/${randomCity}/${randomCity}-main.jpg`, isPrimary: true }]
    };
  }
}

// Exportiere sowohl den MockService als auch eine API für Zukunft
const eventService = new MockEventService();

export default eventService;
