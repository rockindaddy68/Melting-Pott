const express = require('express');
const router = express.Router();
const db = require('../database/fileDatabase');

// POST /api/messages - Neue Kontaktnachricht speichern
router.post('/', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, E-Mail und Nachricht sind erforderlich'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Ungültige E-Mail-Adresse'
      });
    }

    const messageData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      subject: subject?.trim() || 'Kontaktformular'
    };

    const savedMessage = await db.addMessage(messageData);

    res.status(201).json({
      success: true,
      message: 'Nachricht erfolgreich gespeichert',
      data: {
        id: savedMessage._id,
        createdAt: savedMessage.createdAt
      }
    });

  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Speichern der Nachricht'
    });
  }
});

// GET /api/messages - Alle Nachrichten abrufen (für Admin)
router.get('/', async (req, res) => {
  try {
    const messages = await db.getAllMessages();
    
    // Sortiere nach Datum (neueste zuerst)
    const sortedMessages = messages.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({
      success: true,
      data: sortedMessages,
      count: sortedMessages.length
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Laden der Nachrichten'
    });
  }
});

// PUT /api/messages/:id/read - Nachricht als gelesen markieren
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedMessage = await db.markMessageAsRead(id);

    res.json({
      success: true,
      message: 'Nachricht als gelesen markiert',
      data: updatedMessage
    });

  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Fehler beim Aktualisieren der Nachricht'
    });
  }
});

// DELETE /api/messages/:id - Nachricht löschen
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.deleteMessage(id);

    res.json({
      success: true,
      message: 'Nachricht erfolgreich gelöscht'
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Fehler beim Löschen der Nachricht'
    });
  }
});

module.exports = router;