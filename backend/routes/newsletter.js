const express = require('express');
const database = require('../database/fileDatabase');

const router = express.Router();

// Subscribe to Newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'E-Mail ist erforderlich'
      });
    }

    const subscriber = await database.addNewsletterSubscriber(email, name);

    res.json({
      success: true,
      message: 'Erfolgreich für Newsletter angemeldet',
      subscriber
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

module.exports = router;