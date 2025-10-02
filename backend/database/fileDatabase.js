const fs = require('fs');
const path = require('path');

class FileDatabase {
  constructor() {
    this.dbPath = path.join(__dirname, 'db.json');
    this.initDatabase();
  }

  // Datenbank initialisieren
  initDatabase() {
    if (!fs.existsSync(this.dbPath)) {
      const initialData = {
        users: [],
        events: [],
        newsletters: [],
        favorites: [],
        tickets: [],
        settings: {
          created: new Date().toISOString(),
          version: '1.0.0'
        }
      };
      this.saveDatabase(initialData);
    }
  }

  // Datenbank laden
  loadDatabase() {
    try {
      const data = fs.readFileSync(this.dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Database load error:', error);
      return null;
    }
  }

  // Datenbank speichern
  saveDatabase(data) {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Database save error:', error);
      return false;
    }
  }

  // User Operations
  async createUser(userData) {
    const db = this.loadDatabase();
    if (!db) throw new Error('Database not available');

    // Check if user already exists
    const existingUser = db.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      _id: this.generateId(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      favoriteEvents: [],
      ticketHistory: []
    };

    db.users.push(newUser);
    
    if (this.saveDatabase(db)) {
      return { ...newUser, password: undefined };
    } else {
      throw new Error('Failed to save user');
    }
  }

  async findUserByEmail(email) {
    const db = this.loadDatabase();
    if (!db) return null;
    
    return db.users.find(u => u.email === email && u.isActive);
  }

  async findUserById(id) {
    const db = this.loadDatabase();
    if (!db) return null;
    
    return db.users.find(u => u._id === id && u.isActive);
  }

  async updateUser(id, updateData) {
    const db = this.loadDatabase();
    if (!db) throw new Error('Database not available');

    const userIndex = db.users.findIndex(u => u._id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    db.users[userIndex] = {
      ...db.users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    if (this.saveDatabase(db)) {
      return { ...db.users[userIndex], password: undefined };
    } else {
      throw new Error('Failed to update user');
    }
  }

  // Newsletter Operations
  async addNewsletterSubscriber(email, name = '') {
    const db = this.loadDatabase();
    if (!db) throw new Error('Database not available');

    // Check if already subscribed
    const existing = db.newsletters.find(n => n.email === email);
    if (existing) {
      throw new Error('Already subscribed');
    }

    const subscriber = {
      _id: this.generateId(),
      email,
      name,
      subscribedAt: new Date().toISOString(),
      isActive: true
    };

    db.newsletters.push(subscriber);
    
    if (this.saveDatabase(db)) {
      return subscriber;
    } else {
      throw new Error('Failed to save subscriber');
    }
  }

  // Favorite Operations
  async addFavorite(userId, eventData) {
    const db = this.loadDatabase();
    if (!db) throw new Error('Database not available');

    // Check if already favorited
    const existing = db.favorites.find(f => f.userId === userId && f.eventId === eventData.id);
    if (existing) {
      throw new Error('Already in favorites');
    }

    const favorite = {
      _id: this.generateId(),
      userId,
      eventId: eventData.id,
      eventName: eventData.name,
      eventDate: eventData.start,
      venue: eventData.venue,
      addedAt: new Date().toISOString()
    };

    db.favorites.push(favorite);
    
    if (this.saveDatabase(db)) {
      return favorite;
    } else {
      throw new Error('Failed to save favorite');
    }
  }

  async getUserFavorites(userId) {
    const db = this.loadDatabase();
    if (!db) return [];
    
    return db.favorites.filter(f => f.userId === userId);
  }

  async removeFavorite(userId, eventId) {
    const db = this.loadDatabase();
    if (!db) throw new Error('Database not available');

    const favoriteIndex = db.favorites.findIndex(f => f.userId === userId && f.eventId === eventId);
    if (favoriteIndex === -1) {
      throw new Error('Favorite not found');
    }

    db.favorites.splice(favoriteIndex, 1);
    
    if (this.saveDatabase(db)) {
      return true;
    } else {
      throw new Error('Failed to remove favorite');
    }
  }

  // Ticket Operations
  async addTicket(userId, ticketData) {
    const db = this.loadDatabase();
    if (!db) throw new Error('Database not available');

    const ticket = {
      _id: this.generateId(),
      userId,
      ...ticketData,
      ticketCode: this.generateTicketCode(),
      purchasedAt: new Date().toISOString(),
      status: 'active'
    };

    db.tickets.push(ticket);
    
    if (this.saveDatabase(db)) {
      return ticket;
    } else {
      throw new Error('Failed to save ticket');
    }
  }

  async getUserTickets(userId) {
    const db = this.loadDatabase();
    if (!db) return [];
    
    return db.tickets.filter(t => t.userId === userId);
  }

  // Statistics
  async getStats() {
    const db = this.loadDatabase();
    if (!db) return null;

    return {
      totalUsers: db.users.filter(u => u.isActive).length,
      totalNewsletterSubscribers: db.newsletters.filter(n => n.isActive).length,
      totalTickets: db.tickets.length,
      totalFavorites: db.favorites.length,
      recentUsers: db.users
        .filter(u => u.isActive)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(u => ({ ...u, password: undefined }))
    };
  }

  // Utility methods
  generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateTicketCode() {
    return 'RP' + Date.now().toString().substr(-6) + Math.random().toString(36).substr(2, 4).toUpperCase();
  }

  // Export/Import
  async exportData() {
    const db = this.loadDatabase();
    if (!db) return null;

    return {
      ...db,
      exportedAt: new Date().toISOString()
    };
  }

  async importData(importData) {
    if (this.saveDatabase(importData)) {
      return true;
    } else {
      throw new Error('Import failed');
    }
  }
}

module.exports = new FileDatabase();