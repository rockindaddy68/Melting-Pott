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

// Import routes (we'll create these next)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
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
