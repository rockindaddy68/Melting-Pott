// === KI-SERVICE FÜR RUHRPOTT EVENTS ===
// Zentrale KI-Logik und Event-Integration

class RuhrpottAI {
  constructor() {
    this.eventData = [];
    this.reviewData = [];
    this.initialized = false;
  }

  // Initialisierung mit aktuellen Event-Daten
  async initialize() {
    try {
      // Events vom Backend laden
      const eventsRes = await fetch('http://localhost:5000/api/events');
      const eventsData = await eventsRes.json();
      this.eventData = eventsData.events || [];

      // Reviews vom Backend laden
      const reviewsRes = await fetch('http://localhost:5000/api/reviews');
      const reviewsData = await reviewsRes.json();
      this.reviewData = reviewsData.reviews || [];

      this.initialized = true;
      console.log('🤖 RuhrpottAI initialized with', this.eventData.length, 'events and', this.reviewData.length, 'reviews');
    } catch (error) {
      console.warn('KI-Service: Backend not available, using fallback mode');
      this.initialized = false;
    }
  }

  // Intelligente Event-Suche
  findRelevantEvents(query) {
    if (!this.initialized) return [];

    const queryLower = query.toLowerCase();
    const relevantEvents = [];

    this.eventData.forEach(event => {
      let score = 0;

      // Titel-Match (höchste Priorität)
      if (event.title.toLowerCase().includes(queryLower)) score += 10;
      
      // Stadt-Match
      if (event.city.toLowerCase().includes(queryLower)) score += 8;
      
      // Kategorie-Match
      if (event.category.toLowerCase().includes(queryLower)) score += 6;
      
      // Beschreibung-Match
      if (event.description && event.description.toLowerCase().includes(queryLower)) score += 4;

      // Datum-relevante Begriffe
      if (queryLower.includes('heute') || queryLower.includes('jetzt')) {
        const today = new Date().toDateString();
        const eventDate = new Date(event.date).toDateString();
        if (today === eventDate) score += 15;
      }

      if (queryLower.includes('wochenende')) {
        const eventDate = new Date(event.date);
        const dayOfWeek = eventDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) score += 12; // Sonntag oder Samstag
      }

      if (score > 0) {
        relevantEvents.push({ ...event, relevanceScore: score });
      }
    });

    // Nach Relevanz sortieren
    return relevantEvents
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3); // Top 3 Events
  }

  // Event-Bewertungen analysieren
  getEventSentiment(eventId) {
    const eventReviews = this.reviewData.filter(review => review.eventId === eventId);
    
    if (eventReviews.length === 0) return null;

    const avgRating = eventReviews.reduce((sum, review) => sum + review.rating, 0) / eventReviews.length;
    const totalLikes = eventReviews.reduce((sum, review) => sum + (review.likes || 0), 0);

    return {
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: eventReviews.length,
      totalLikes: totalLikes,
      sentiment: avgRating >= 4 ? 'sehr positiv' : avgRating >= 3 ? 'positiv' : 'gemischt'
    };
  }

  // Personalisierte Event-Empfehlungen
  getPersonalizedRecommendations(userPreferences = {}) {
    if (!this.initialized) return [];

    let recommendations = [...this.eventData];

    // Nach Kategorie filtern
    if (userPreferences.category) {
      recommendations = recommendations.filter(event => 
        event.category.toLowerCase() === userPreferences.category.toLowerCase()
      );
    }

    // Nach Stadt filtern
    if (userPreferences.city) {
      recommendations = recommendations.filter(event => 
        event.city.toLowerCase().includes(userPreferences.city.toLowerCase())
      );
    }

    // Nach Preis filtern
    if (userPreferences.maxPrice) {
      recommendations = recommendations.filter(event => 
        event.price <= userPreferences.maxPrice
      );
    }

    // Bewertungen einbeziehen
    recommendations = recommendations.map(event => {
      const sentiment = this.getEventSentiment(event._id);
      return {
        ...event,
        sentiment,
        recommendationScore: this.calculateRecommendationScore(event, sentiment, userPreferences)
      };
    });

    return recommendations
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5);
  }

  calculateRecommendationScore(event, sentiment, preferences) {
    let score = 0;

    // Basis-Score
    score += 5;

    // Bewertungs-Bonus
    if (sentiment) {
      score += sentiment.averageRating * 2;
      score += Math.min(sentiment.totalLikes / 10, 5); // Max 5 Punkte für Likes
    }

    // Preis-Bonus (günstige Events bevorzugen)
    if (event.price === 0) score += 8; // Kostenlose Events
    else if (event.price <= 10) score += 6;
    else if (event.price <= 20) score += 4;

    // Popularität (Teilnehmerzahl)
    if (event.attendeeCount) {
      score += Math.min(event.attendeeCount / 100, 10);
    }

    return score;
  }

  // Chat-Response mit Event-Integration
  generateSmartResponse(userMessage, context = {}) {
    const message = userMessage.toLowerCase();

    // Versuche relevante Events zu finden
    const relevantEvents = this.findRelevantEvents(userMessage);
    
    if (relevantEvents.length > 0) {
      let response = "🎯 Ich habe passende Events gefunden:\n\n";
      
      relevantEvents.forEach((event, index) => {
        const sentiment = this.getEventSentiment(event._id);
        const priceText = event.price === 0 ? 'Kostenlos! 🎉' : `${event.price}€`;
        
        response += `**${index + 1}. ${event.title}**\n`;
        response += `📍 ${event.city} • 💰 ${priceText}\n`;
        response += `📝 ${event.description}\n`;
        
        if (sentiment) {
          response += `⭐ ${sentiment.averageRating}/5 (${sentiment.totalReviews} Bewertungen)\n`;
        }
        response += '\n';
      });

      return {
        message: response,
        suggestions: [
          'Mehr Event-Details',
          'Ähnliche Events',
          'Anfahrt planen'
        ],
        events: relevantEvents
      };
    }

    // Fallback zur Standard-KI-Logik
    return null;
  }

  // Ruhrgebiet-Facts für interessante Antworten
  getRandomRuhrgebietFact() {
    const facts = [
      "Das Ruhrgebiet hat mehr Theater pro Quadratkilometer als jede andere Region Deutschlands! 🎭",
      "Die Route der Industriekultur verbindet über 400 Sehenswürdigkeiten auf 4000 km! 🏭",
      "Im Ruhrgebiet leben Menschen aus über 180 Nationen - echter Melting Pot! 🌍",
      "Die Zeche Zollverein produzierte über 130 Jahre lang Kohle und ist heute UNESCO-Welterbe! ⚒️",
      "Das Ruhrgebiet ist grüner als viele denken: Über 50% der Fläche sind Grün- und Waldflächen! 🌳",
      "Currywurst wurde 1949 im Ruhrgebiet erfunden - von Herta Heuwer in Berlin? Nein, hier! 🌭",
      "Der Gasometer Oberhausen ist Europas größter Ausstellungsraum ohne Stützen! 🏢"
    ];
    
    return facts[Math.floor(Math.random() * facts.length)];
  }
}

// Singleton-Instanz
const ruhrpottAI = new RuhrpottAI();

export default ruhrpottAI;