const express = require('express');
const User = require('../models/User');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('favoriteEvents');
    
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Fehler beim Laden des Profils'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, city, preferences } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(city && { city }),
        ...(preferences && { preferences })
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profil erfolgreich aktualisiert',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: 'Fehler beim Aktualisieren des Profils'
    });
  }
});

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: 'Fehler beim Laden der Benutzer'
    });
  }
});

module.exports = router;
