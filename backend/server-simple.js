const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Eventbrite API Configuration
const EVENTBRITE_API_URL = 'https://www.eventbriteapi.com/v3';
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;

// Ruhrgebiet Cities for Location Search
const ruhrCities = [
  'Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen',
  'Oberhausen', 'Hagen', 'Bottrop', 'Recklinghausen', 'Herne',
  'Mülheim an der Ruhr', 'Witten', 'Castrop-Rauxel', 'Gladbeck'
];

// Helper function to make Eventbrite API calls
async function makeEventbriteRequest(endpoint, params = {}) {
  if (!EVENTBRITE_TOKEN) {
    throw new Error('Eventbrite API Token not configured');
  }

  const queryParams = new URLSearchParams(params);
  const url = `${EVENTBRITE_API_URL}${endpoint}?${queryParams}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${EVENTBRITE_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Eventbrite API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Convert Eventbrite event to our format
function convertEventbriteEvent(event) {
  const venue = event.venue || {};
  const start = new Date(event.start.local);
  
  return {
    id: `eventbrite_${event.id}`,
    originalId: event.id,
    source: 'eventbrite',
    title: event.name.text,
    description: event.description ? event.description.text : '',
    date: start.toISOString().split('T')[0],
    time: start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    location: venue.name || 'Unbekannte Location',
    address: venue.address ? 
      `${venue.address.localized_area_display || ''} ${venue.address.city || ''}`.trim() : '',
    city: venue.address?.city || 'Ruhrgebiet',
    category: event.category?.short_name || 'Event',
    price: extractPrice(event.ticket_classes),
    url: event.url,
    imageUrl: event.logo ? event.logo.url : null,
    organizer: event.organizer?.name || '',
    capacity: event.capacity,
    isOnline: event.online_event,
    lastUpdated: new Date().toISOString(),
    tags: extractTags(event)
  };
}

// Extract price from ticket classes
function extractPrice(ticketClasses) {
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

// Extract tags from event data
function extractTags(event) {
  const tags = [];
  
  if (event.category) tags.push(event.category.short_name);
  if (event.subcategory) tags.push(event.subcategory.name);
  if (event.format) tags.push(event.format.short_name);
  if (event.online_event) tags.push('Online');
  if (event.venue && event.venue.address?.city) tags.push(event.venue.address.city);
  
  return tags;
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ruhrpott Backend API - Eventbrite Integration',
    version: '1.0.0',
    status: 'Running',
    eventbrite: !!EVENTBRITE_TOKEN
  });
});

// Get Eventbrite events from Ruhrgebiet
app.get('/api/events/eventbrite', async (req, res) => {
  try {
    const { limit = 20, city } = req.query;
    const allEvents = [];
    
    // Search specific city or all Ruhr cities
    const citiesToSearch = city ? [city] : ruhrCities.slice(0, 5); // Limit to 5 cities for performance
    
    for (const searchCity of citiesToSearch) {
      try {
        const params = {
          'location.address': `${searchCity}, Deutschland`,
          'location.within': '25km',
          status: 'live',
          order_by: 'start_asc',
          expand: 'venue,ticket_classes,organizer,category,subcategory,format',
          page_size: Math.min(10, limit),
          start_date: {
            range_start: new Date().toISOString(),
            range_end: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
          }
        };

        const response = await makeEventbriteRequest('/events/search/', params);
        
        if (response.events && response.events.length > 0) {
          const convertedEvents = response.events.map(convertEventbriteEvent);
          allEvents.push(...convertedEvents);
        }
        
        // Small delay between city requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (cityError) {
        console.warn(`Failed to fetch events for ${searchCity}:`, cityError.message);
      }
    }

    // Remove duplicates and sort by date
    const uniqueEvents = allEvents
      .filter((event, index, self) => 
        index === self.findIndex(e => e.originalId === event.originalId)
      )
      .sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      events: uniqueEvents,
      count: uniqueEvents.length,
      source: 'eventbrite',
      searchedCities: citiesToSearch
    });

  } catch (error) {
    console.error('Eventbrite API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      fallback: 'Consider using mock data or checking API configuration'
    });
  }
});

// Test Eventbrite connection
app.get('/api/events/eventbrite/test', async (req, res) => {
  try {
    if (!EVENTBRITE_TOKEN) {
      return res.status(400).json({
        success: false,
        error: 'Eventbrite API Token not configured'
      });
    }

    const response = await makeEventbriteRequest('/users/me/');
    
    res.json({
      success: true,
      message: 'Eventbrite API connection successful',
      user: {
        name: response.name,
        email: response.email
      }
    });

  } catch (error) {
    console.error('Eventbrite connection test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Eventbrite API connection failed'
    });
  }
});

// Webhook endpoint for Eventbrite
app.post('/api/webhooks/eventbrite', (req, res) => {
  const { action, api_url, event_id } = req.body;
  
  console.log('Eventbrite webhook received:', { action, event_id });
  
  // Here you would typically update your database
  // For now, just log and acknowledge
  
  res.status(200).json({ message: 'Webhook received' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Ruhrpott Backend running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🎫 Eventbrite API: ${EVENTBRITE_TOKEN ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`🌐 Frontend CORS: ${process.env.FRONTEND_URL || 'http://localhost:5173-5176'}`);
});
