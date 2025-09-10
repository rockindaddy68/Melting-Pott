const express = require('express');
const Newsletter = require('../models/Newsletter');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email, firstName, lastName, city, interests, language } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'E-Mail-Adresse ist erforderlich'
      });
    }

    // Check if already subscribed
    const existingSubscription = await Newsletter.findOne({ email });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({
          message: 'Diese E-Mail ist bereits für den Newsletter angemeldet'
        });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.firstName = firstName || existingSubscription.firstName;
        existingSubscription.lastName = lastName || existingSubscription.lastName;
        existingSubscription.city = city || existingSubscription.city;
        existingSubscription.interests = interests || existingSubscription.interests;
        existingSubscription.language = language || existingSubscription.language;
        
        await existingSubscription.save();
        
        return res.json({
          message: 'Newsletter-Anmeldung erfolgreich reaktiviert'
        });
      }
    }

    // Create new subscription
    const subscription = new Newsletter({
      email,
      firstName,
      lastName,
      city,
      interests,
      language: language || 'de'
    });

    await subscription.save();

    res.status(201).json({
      message: 'Newsletter-Anmeldung erfolgreich',
      subscription: {
        email: subscription.email,
        firstName: subscription.firstName,
        lastName: subscription.lastName
      }
    });

  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Ungültige E-Mail-Adresse'
      });
    }

    res.status(500).json({
      message: 'Fehler bei der Newsletter-Anmeldung'
    });
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email, token } = req.body;

    const subscription = await Newsletter.findOne({
      $or: [
        { email, isActive: true },
        { unsubscribeToken: token }
      ]
    });

    if (!subscription) {
      return res.status(404).json({
        message: 'Newsletter-Anmeldung nicht gefunden'
      });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({
      message: 'Newsletter erfolgreich abbestellt'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      message: 'Fehler beim Abbestellen des Newsletters'
    });
  }
});

// @route   GET /api/newsletter/subscribers
// @desc    Get all subscribers (Admin only)
// @access  Private/Admin
router.get('/subscribers', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, active = true } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = { isActive: active === 'true' };

    const subscribers = await Newsletter.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Newsletter.countDocuments(filter);

    res.json({
      subscribers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      message: 'Fehler beim Laden der Abonnenten'
    });
  }
});

module.exports = router;
