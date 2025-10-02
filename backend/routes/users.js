const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database/fileDatabase');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, city } = req.body;

    // Validation
    if (!username || !email || !password || !firstName || !lastName || !city) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if user exists
    const existingUser = await database.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email bereits registriert' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await database.createUser({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      city
    });

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'ruhrpott_secret_key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich',
      user: newUser,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'E-Mail und Passwort sind erforderlich' 
      });
    }

    // Find user
    const user = await database.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Benutzer nicht gefunden' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Falsches Passwort' 
      });
    }

    // Update last login
    await database.updateUser(user._id, { lastLogin: new Date().toISOString() });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'ruhrpott_secret_key',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: `Willkommen zurück, ${user.firstName}!`,
      user: { ...user, password: undefined },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await database.findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: { ...user, password: undefined }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Update Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, username, city } = req.body;
    
    const updatedUser = await database.updateUser(req.user.userId, {
      firstName,
      lastName,
      username,
      city
    });

    res.json({
      success: true,
      message: 'Profil erfolgreich aktualisiert',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Add to Favorites
router.post('/favorites', authenticateToken, async (req, res) => {
  try {
    const eventData = req.body;
    
    const favorite = await database.addFavorite(req.user.userId, eventData);

    res.json({
      success: true,
      message: 'Event zu Favoriten hinzugefügt',
      favorite
    });

  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Get User Favorites
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const favorites = await database.getUserFavorites(req.user.userId);

    res.json({
      success: true,
      favorites
    });

  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Remove from Favorites
router.delete('/favorites/:eventId', authenticateToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    
    await database.removeFavorite(req.user.userId, eventId);

    res.json({
      success: true,
      message: 'Event aus Favoriten entfernt'
    });

  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Add Ticket
router.post('/tickets', authenticateToken, async (req, res) => {
  try {
    const ticketData = req.body;
    
    const ticket = await database.addTicket(req.user.userId, ticketData);

    res.json({
      success: true,
      message: 'Ticket erfolgreich hinzugefügt',
      ticket
    });

  } catch (error) {
    console.error('Add ticket error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    });
  }
});

// Get User Tickets
router.get('/tickets', authenticateToken, async (req, res) => {
  try {
    const tickets = await database.getUserTickets(req.user.userId);

    res.json({
      success: true,
      tickets
    });

  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Get Statistics (Admin)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await database.getStats();

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'ruhrpott_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    req.user = user;
    next();
  });
}

module.exports = router;