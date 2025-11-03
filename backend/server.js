const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose'); // Disabled for file database
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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

// Initialize File Database
const database = require('./database/fileDatabase');
console.log('✅ File Database initialized');

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ruhrpott Backend API',
    version: '1.0.0',
    status: 'Running'
  });
});

// Eventbrite Integration
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN || '7ZJQJ7GELBDQO3QZ6OC7';
const EVENTBRITE_API_URL = 'https://www.eventbriteapi.com/v3';

// Helper function for Eventbrite API calls
async function fetchEventbriteEvents() {
  if (!EVENTBRITE_TOKEN) {
    console.log('❌ Kein Eventbrite Token - verwende lokale Daten');
    return [];
  }

  try {
    const ruhrgebietCities = ['Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen', 'Oberhausen'];
    const allEvents = [];

    for (const city of ruhrgebietCities) {
      const url = `${EVENTBRITE_API_URL}/events/search/?location.address=${city}&location.within=25km&expand=venue,organizer`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${EVENTBRITE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        allEvents.push(...(data.events || []).slice(0, 5)); // Max 5 pro Stadt
      }
    }

    return allEvents.map(event => ({
      id: `eventbrite_${event.id}`,
      name: event.name.text,
      date: event.start.local.split('T')[0],
      time: event.start.local.split('T')[1]?.substring(0, 5),
      location: event.venue?.name || 'TBD',
      city: event.venue?.address?.city || 'Ruhrgebiet',
      url: event.url,
      source: 'eventbrite',
      description: event.description?.text?.substring(0, 200) || ''
    }));
  } catch (error) {
    console.log('❌ Eventbrite API Fehler:', error.message);
    return [];
  }
}

// Enhanced Events API with Eventbrite integration
app.get('/api/events', async (req, res) => {
  try {
    const db = database.loadDatabase();
    const localEvents = db.events || [];
    
    // Versuche Eventbrite Events zu laden
    const eventbriteEvents = await fetchEventbriteEvents();
    
    // Kombiniere lokale und Eventbrite Events
    const allEvents = [...localEvents, ...eventbriteEvents];
    
    res.json({
      success: true,
      events: allEvents,
      count: allEvents.length,
      sources: {
        local: localEvents.length,
        eventbrite: eventbriteEvents.length
      },
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    // Fallback zu lokalen Daten
    const db = database.loadDatabase();
    res.json({
      success: true,
      events: db.events || [],
      count: db.events?.length || 0,
      error: 'Eventbrite integration failed, using local data'
    });
  }
});

app.get('/api/reviews', (req, res) => {
  try {
    const db = database.loadDatabase();
    res.json({
      success: true,
      reviews: db.eventReviews || [],
      count: db.eventReviews?.length || 0
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', error: error.message });
  }
});

// Import routes (we'll create these next)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
// app.use('/api/events', require('./routes/events')); // Disabled for file database
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/messages', require('./routes/messages'));

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
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Ruhrpott Backend running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`💾 Using File Database: ${database ? 'Ready' : 'Error'}`);
  });
};

startServer();
