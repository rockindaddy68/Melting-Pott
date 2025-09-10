const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, city } = req.body;

    // Validation
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: 'Bitte alle Pflichtfelder ausfüllen'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Passwort muss mindestens 6 Zeichen lang sein'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email 
          ? 'E-Mail bereits registriert'
          : 'Benutzername bereits vergeben'
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      city
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registrierung erfolgreich',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Serverfehler bei der Registrierung'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'E-Mail und Passwort sind erforderlich'
      });
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(400).json({
        message: 'Ungültige Anmeldedaten'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({
        message: 'Ungültige Anmeldedaten'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Anmeldung erfolgreich',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Serverfehler bei der Anmeldung'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        city: req.user.city,
        role: req.user.role,
        avatar: req.user.avatar,
        favoriteEvents: req.user.favoriteEvents,
        newsletterSubscribed: req.user.newsletterSubscribed,
        preferences: req.user.preferences
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      message: 'Fehler beim Laden der Benutzerdaten'
    });
  }
});

module.exports = router;
