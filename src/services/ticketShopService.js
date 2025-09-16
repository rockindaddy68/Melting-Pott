// Ticket Shop Integration Service
// Handles links to external ticket providers and affiliate tracking

class TicketShopService {
  constructor() {
    this.providers = {
      eventim: {
        name: 'Eventim',
        baseUrl: 'https://www.eventim.de',
        searchUrl: 'https://www.eventim.de/search/?term=',
        logo: 'https://www.eventim.de/favicon.ico',
        affiliateId: 'ruhrpott2025', // Demo Affiliate ID
        commission: 5 // Prozent
      },
      ticketmaster: {
        name: 'Ticketmaster',
        baseUrl: 'https://www.ticketmaster.de',
        searchUrl: 'https://www.ticketmaster.de/search?q=',
        logo: 'https://www.ticketmaster.de/favicon.ico',
        affiliateId: 'ruhrpott_tm',
        commission: 4
      },
      adticket: {
        name: 'ADticket',
        baseUrl: 'https://www.adticket.de',
        searchUrl: 'https://www.adticket.de/search?q=',
        logo: 'https://www.adticket.de/favicon.ico',
        affiliateId: 'ruhrpott_ad',
        commission: 3
      },
      reservix: {
        name: 'Reservix',
        baseUrl: 'https://www.reservix.de',
        searchUrl: 'https://www.reservix.de/tickets/search?q=',
        logo: 'https://www.reservix.de/favicon.ico',
        affiliateId: 'ruhrpott_rv',
        commission: 4
      }
    }

    this.ruhrgebietVenues = {
      'Essen': [
        'Grugahalle',
        'Zeche Zollverein',
        'Philharmonie Essen',
        'GOP Varieté-Theater',
        'Altes Funkhaus',
        'Weststadthalle'
      ],
      'Dortmund': [
        'Westfalenhalle',
        'Signal Iduna Park',
        'Theater Dortmund',
        'Konzerthaus Dortmund',
        'Phoenix Hall',
        'FZW'
      ],
      'Bochum': [
        'Ruhr-Universität Bochum Audimax',
        'Starlight Express Theater',
        'Schauspielhaus Bochum',
        'Matrix Bochum',
        'Zeche Bochum',
        'RuhrCongress'
      ],
      'Duisburg': [
        'Theater Duisburg',
        'Mercatorhalle',
        'Landschaftspark Duisburg-Nord',
        'Grammatikoff',
        'Pulp'
      ],
      'Gelsenkirchen': [
        'Veltins-Arena',
        'Musiktheater im Revier',
        'Amphitheater Gelsenkirchen',
        'Hans-Sachs-Haus'
      ],
      'Oberhausen': [
        'König-Pilsener-Arena',
        'Gasometer Oberhausen',
        'Theater Oberhausen',
        'Turbinenhalle'
      ]
    }
  }

  // Generate ticket purchase URL with affiliate tracking
  generateTicketUrl(eventData, provider = 'eventim', userId = null) {
    const providerConfig = this.providers[provider]
    if (!providerConfig) return null

    const { title, city, date, venue } = eventData
    const searchQuery = encodeURIComponent(`${title} ${city}`)
    
    let url = `${providerConfig.searchUrl}${searchQuery}`
    
    // Add affiliate parameters
    if (providerConfig.affiliateId) {
      const separator = url.includes('?') ? '&' : '?'
      url += `${separator}affiliate=${providerConfig.affiliateId}&source=ruhrpott`
      
      // Add user tracking for commission attribution
      if (userId) {
        url += `&user=${userId}`
      }
    }

    // Track the click
    this.trackTicketClick(eventData, provider, userId)

    return url
  }

  // Get all available ticket providers for an event
  getTicketProviders(eventData) {
    return Object.entries(this.providers).map(([key, config]) => ({
      id: key,
      name: config.name,
      url: this.generateTicketUrl(eventData, key),
      logo: config.logo,
      commission: config.commission
    }))
  }

  // Search for events across multiple platforms
  async searchEvents(query, city = '', category = '') {
    // This would integrate with real APIs in production
    // For demo, return mock data with ticket links
    
    const mockEvents = this.generateMockEvents(query, city, category)
    
    return mockEvents.map(event => ({
      ...event,
      ticketProviders: this.getTicketProviders(event),
      primaryTicketUrl: this.generateTicketUrl(event, 'eventim')
    }))
  }

  // Generate affiliate earnings report
  getAffiliateReport(userId, startDate, endDate) {
    try {
      const clicks = this.getTrackedClicks(userId, startDate, endDate)
      const totalClicks = clicks.length
      const estimatedEarnings = this.calculateEstimatedEarnings(clicks)
      
      return {
        totalClicks,
        estimatedEarnings,
        clicksByProvider: this.groupClicksByProvider(clicks),
        topEvents: this.getTopClickedEvents(clicks)
      }
    } catch (error) {
      console.error('Fehler beim Generieren des Affiliate-Reports:', error)
      return null
    }
  }

  // Track ticket purchase clicks for analytics
  trackTicketClick(eventData, provider, userId = null) {
    try {
      const clickData = {
        id: this.generateClickId(),
        timestamp: new Date().toISOString(),
        eventTitle: eventData.title,
        eventCity: eventData.city,
        eventDate: eventData.date,
        provider,
        userId,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        source: 'ruhrpott_dashboard'
      }

      // Store in localStorage for demo (in production, send to analytics service)
      const existingClicks = this.getStoredClicks()
      existingClicks.push(clickData)
      
      // Keep only last 1000 clicks to prevent localStorage overflow
      if (existingClicks.length > 1000) {
        existingClicks.splice(0, existingClicks.length - 1000)
      }
      
      localStorage.setItem('ruhrpott_ticket_clicks', JSON.stringify(existingClicks))

      // Optional: Send to analytics service
      // this.sendToAnalytics(clickData)

    } catch (error) {
      console.error('Fehler beim Tracking von Ticket-Klicks:', error)
    }
  }

  // Get popular venues for a city
  getVenuesForCity(city) {
    return this.ruhrgebietVenues[city] || []
  }

  // Helper Methods
  generateMockEvents(query, city, category) {
    const categories = ['Konzert', 'Theater', 'Comedy', 'Festival', 'Sport', 'Kabarett']
    const cities = Object.keys(this.ruhrgebietVenues)
    
    return Array.from({ length: 5 }, (_, index) => {
      const eventCity = city || cities[index % cities.length]
      const venues = this.getVenuesForCity(eventCity)
      
      return {
        id: `mock_event_${Date.now()}_${index}`,
        title: `${query || 'Event'} ${index + 1}`,
        city: eventCity,
        venue: venues[index % venues.length] || 'Venue nicht verfügbar',
        date: this.getRandomFutureDate(),
        category: category || categories[index % categories.length],
        description: `Spannende ${category || 'Veranstaltung'} in ${eventCity}`,
        price: this.getRandomPrice(),
        image: `https://picsum.photos/400/300?random=${index}`
      }
    })
  }

  getRandomFutureDate() {
    const start = new Date()
    const end = new Date(start.getTime() + (90 * 24 * 60 * 60 * 1000)) // 90 days from now
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return randomDate.toISOString().split('T')[0]
  }

  getRandomPrice() {
    const prices = [15, 25, 35, 45, 55, 75, 95, 120, 150]
    return prices[Math.floor(Math.random() * prices.length)]
  }

  getStoredClicks() {
    try {
      const clicks = localStorage.getItem('ruhrpott_ticket_clicks')
      return clicks ? JSON.parse(clicks) : []
    } catch {
      return []
    }
  }

  getTrackedClicks(userId = null, startDate = null, endDate = null) {
    const allClicks = this.getStoredClicks()
    
    return allClicks.filter(click => {
      if (userId && click.userId !== userId) return false
      if (startDate && new Date(click.timestamp) < new Date(startDate)) return false
      if (endDate && new Date(click.timestamp) > new Date(endDate)) return false
      return true
    })
  }

  calculateEstimatedEarnings(clicks) {
    // Estimate earnings based on average conversion rates and commissions
    const averageConversion = 0.03 // 3% of clicks result in purchases
    const averageTicketPrice = 45 // EUR
    
    return clicks.reduce((total, click) => {
      const provider = this.providers[click.provider]
      if (!provider) return total
      
      const estimatedPurchases = averageConversion
      const estimatedRevenue = estimatedPurchases * averageTicketPrice
      const commission = estimatedRevenue * (provider.commission / 100)
      
      return total + commission
    }, 0)
  }

  groupClicksByProvider(clicks) {
    const grouped = {}
    clicks.forEach(click => {
      if (!grouped[click.provider]) {
        grouped[click.provider] = 0
      }
      grouped[click.provider]++
    })
    return grouped
  }

  getTopClickedEvents(clicks, limit = 5) {
    const eventCounts = {}
    clicks.forEach(click => {
      const key = `${click.eventTitle} - ${click.eventCity}`
      eventCounts[key] = (eventCounts[key] || 0) + 1
    })
    
    return Object.entries(eventCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([event, clicks]) => ({ event, clicks }))
  }

  generateClickId() {
    return 'click_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Demo data for development
  initializeDemoData() {
    // Create some demo clicks for testing
    if (this.getStoredClicks().length === 0) {
      const demoClicks = [
        {
          id: 'demo_click_1',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          eventTitle: 'Rock Konzert',
          eventCity: 'Essen',
          provider: 'eventim',
          userId: 'demo_user_1'
        },
        {
          id: 'demo_click_2',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          eventTitle: 'Theater Aufführung',
          eventCity: 'Dortmund',
          provider: 'ticketmaster',
          userId: 'demo_user_1'
        }
      ]
      
      localStorage.setItem('ruhrpott_ticket_clicks', JSON.stringify(demoClicks))
    }
  }
}

export default new TicketShopService()
