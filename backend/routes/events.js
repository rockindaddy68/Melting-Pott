const express = require('express');
const Event = require('../models/Event');
const { authenticateToken, optionalAuth, requireModerator } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      city, 
      category, 
      featured, 
      upcoming = true,
      page = 1, 
      limit = 12 
    } = req.query;

    const filter = { status: 'published' };
    
    if (city) filter.city = city;
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (upcoming === 'true') {
      filter['dateTime.start'] = { $gte: new Date() };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const events = await Event.find(filter)
      .populate('createdBy', 'username firstName lastName')
      .sort({ 'dateTime.start': 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(filter);

    res.json({
      events,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      message: 'Fehler beim Laden der Events'
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'username firstName lastName')
      .populate('reviews.user', 'username firstName lastName avatar');

    if (!event) {
      return res.status(404).json({
        message: 'Event nicht gefunden'
      });
    }

    res.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      message: 'Fehler beim Laden des Events'
    });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user._id
    };

    const event = new Event(eventData);
    await event.save();

    const populatedEvent = await Event.findById(event._id)
      .populate('createdBy', 'username firstName lastName');

    res.status(201).json({
      message: 'Event erfolgreich erstellt',
      event: populatedEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Ungültige Event-Daten',
        errors: error.errors
      });
    }

    res.status(500).json({
      message: 'Fehler beim Erstellen des Events'
    });
  }
});

module.exports = router;
