// Simple JSON Database Service für Member-Daten
class MemberDatabase {
  constructor() {
    this.dbName = 'ruhrpott_members_db';
    this.initDatabase();
  }

  // Datenbank initialisieren
  initDatabase() {
    if (!localStorage.getItem(this.dbName)) {
      const initialData = {
        members: [],
        newsletter_subscribers: [],
        events: [],
        favorites: [],
        tickets: [],
        admin_users: ['admin@ruhrpott.de'],
        settings: {
          auto_backup: true,
          max_members: 10000,
          created: new Date().toISOString()
        }
      };
      localStorage.setItem(this.dbName, JSON.stringify(initialData));
    }
  }

  // Datenbank laden
  loadDatabase() {
    try {
      const data = localStorage.getItem(this.dbName);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Database load error:', error);
      return null;
    }
  }

  // Datenbank speichern
  saveDatabase(data) {
    try {
      localStorage.setItem(this.dbName, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Database save error:', error);
      return false;
    }
  }

  // Member hinzufügen
  addMember(memberData) {
    const db = this.loadDatabase();
    if (!db) return { success: false, error: 'Database not available' };

    // Prüfen ob Email bereits existiert
    const existingMember = db.members.find(m => m.email === memberData.email);
    if (existingMember) {
      return { success: false, error: 'Email bereits registriert' };
    }

    // Neuen Member erstellen
    const newMember = {
      id: this.generateId(),
      ...memberData,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: true,
      favoriteEvents: [],
      ticketHistory: []
    };

    db.members.push(newMember);
    
    if (this.saveDatabase(db)) {
      return { success: true, member: newMember };
    } else {
      return { success: false, error: 'Speichern fehlgeschlagen' };
    }
  }

  // Member finden
  findMember(email) {
    const db = this.loadDatabase();
    if (!db) return null;
    
    return db.members.find(m => m.email === email && m.isActive);
  }

  // Member anmelden
  loginMember(email, password) {
    const member = this.findMember(email);
    if (!member) {
      return { success: false, error: 'Benutzer nicht gefunden' };
    }

    if (member.password !== password) {
      return { success: false, error: 'Falsches Passwort' };
    }

    // Last login aktualisieren
    const db = this.loadDatabase();
    const memberIndex = db.members.findIndex(m => m.id === member.id);
    if (memberIndex !== -1) {
      db.members[memberIndex].lastLogin = new Date().toISOString();
      this.saveDatabase(db);
    }

    return { success: true, member: { ...member, password: undefined } };
  }

  // Alle Member abrufen (Admin)
  getAllMembers() {
    const db = this.loadDatabase();
    if (!db) return [];
    
    return db.members.map(m => ({ ...m, password: undefined }));
  }

  // Member löschen
  deleteMember(memberId) {
    const db = this.loadDatabase();
    if (!db) return { success: false, error: 'Database not available' };

    const memberIndex = db.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) {
      return { success: false, error: 'Member nicht gefunden' };
    }

    // Soft delete - nur isActive auf false setzen
    db.members[memberIndex].isActive = false;
    db.members[memberIndex].deletedAt = new Date().toISOString();

    if (this.saveDatabase(db)) {
      return { success: true };
    } else {
      return { success: false, error: 'Löschen fehlgeschlagen' };
    }
  }

  // Newsletter Subscriber hinzufügen
  addNewsletterSubscriber(email, name = '', source = 'website') {
    const db = this.loadDatabase();
    if (!db) return { success: false, error: 'Database not available' };

    // Prüfen ob bereits abonniert
    const existing = db.newsletter_subscribers.find(s => s.email === email);
    if (existing) {
      return { success: false, error: 'Bereits für Newsletter angemeldet' };
    }

    const subscriber = {
      id: this.generateId(),
      email,
      name,
      source,
      subscribedAt: new Date().toISOString(),
      isActive: true
    };

    db.newsletter_subscribers.push(subscriber);
    
    if (this.saveDatabase(db)) {
      return { success: true, subscriber };
    } else {
      return { success: false, error: 'Speichern fehlgeschlagen' };
    }
  }

  // Newsletter Subscribers abrufen
  getNewsletterSubscribers() {
    const db = this.loadDatabase();
    if (!db) return [];
    
    return db.newsletter_subscribers.filter(s => s.isActive);
  }

  // Event zu Favoriten hinzufügen
  addToFavorites(memberId, eventData) {
    const db = this.loadDatabase();
    if (!db) return { success: false, error: 'Database not available' };

    const memberIndex = db.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) {
      return { success: false, error: 'Member nicht gefunden' };
    }

    const favorite = {
      id: this.generateId(),
      memberId,
      eventId: eventData.id,
      eventName: eventData.name,
      eventDate: eventData.start,
      venue: eventData.venue,
      addedAt: new Date().toISOString()
    };

    // Prüfen ob bereits in Favoriten
    if (!db.favorites.find(f => f.memberId === memberId && f.eventId === eventData.id)) {
      db.favorites.push(favorite);
      
      // Auch im Member-Objekt hinzufügen
      if (!db.members[memberIndex].favoriteEvents) {
        db.members[memberIndex].favoriteEvents = [];
      }
      db.members[memberIndex].favoriteEvents.push(favorite);
    }

    if (this.saveDatabase(db)) {
      return { success: true, favorite };
    } else {
      return { success: false, error: 'Speichern fehlgeschlagen' };
    }
  }

  // Member Favoriten abrufen
  getMemberFavorites(memberId) {
    const db = this.loadDatabase();
    if (!db) return [];
    
    return db.favorites.filter(f => f.memberId === memberId);
  }

  // Ticket-Kauf speichern
  addTicketPurchase(memberId, ticketData) {
    const db = this.loadDatabase();
    if (!db) return { success: false, error: 'Database not available' };

    const ticket = {
      id: this.generateId(),
      memberId,
      eventId: ticketData.eventId,
      eventName: ticketData.eventName,
      ticketType: ticketData.ticketType || 'Standard',
      price: ticketData.price,
      quantity: ticketData.quantity || 1,
      purchaseDate: new Date().toISOString(),
      status: 'purchased',
      ticketCode: this.generateTicketCode()
    };

    db.tickets.push(ticket);

    // Auch im Member hinzufügen
    const memberIndex = db.members.findIndex(m => m.id === memberId);
    if (memberIndex !== -1) {
      if (!db.members[memberIndex].ticketHistory) {
        db.members[memberIndex].ticketHistory = [];
      }
      db.members[memberIndex].ticketHistory.push(ticket);
    }

    if (this.saveDatabase(db)) {
      return { success: true, ticket };
    } else {
      return { success: false, error: 'Speichern fehlgeschlagen' };
    }
  }

  // Member Tickets abrufen
  getMemberTickets(memberId) {
    const db = this.loadDatabase();
    if (!db) return [];
    
    return db.tickets.filter(t => t.memberId === memberId);
  }

  // Statistiken für Admin
  getStatistics() {
    const db = this.loadDatabase();
    if (!db) return null;

    return {
      totalMembers: db.members.filter(m => m.isActive).length,
      totalNewsletterSubscribers: db.newsletter_subscribers.filter(s => s.isActive).length,
      totalTicketsSold: db.tickets.length,
      totalFavorites: db.favorites.length,
      recentMembers: db.members
        .filter(m => m.isActive)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
      popularEvents: this.getMostFavoritedEvents()
    };
  }

  // Beliebteste Events
  getMostFavoritedEvents() {
    const db = this.loadDatabase();
    if (!db) return [];

    const eventCounts = {};
    db.favorites.forEach(f => {
      if (!eventCounts[f.eventId]) {
        eventCounts[f.eventId] = {
          eventId: f.eventId,
          eventName: f.eventName,
          count: 0
        };
      }
      eventCounts[f.eventId].count++;
    });

    return Object.values(eventCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  // Datenbank Export (Backup)
  exportDatabase() {
    const db = this.loadDatabase();
    if (!db) return null;

    return {
      ...db,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
  }

  // Datenbank Import
  importDatabase(importData) {
    try {
      // Validierung der Import-Daten
      if (!importData.members || !Array.isArray(importData.members)) {
        return { success: false, error: 'Ungültige Datenbankstruktur' };
      }

      if (this.saveDatabase(importData)) {
        return { success: true };
      } else {
        return { success: false, error: 'Import fehlgeschlagen' };
      }
    } catch (error) {
      return { success: false, error: 'Import-Fehler: ' + error.message };
    }
  }

  // ID Generator
  generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Ticket Code Generator
  generateTicketCode() {
    return 'RP' + Date.now().toString().substr(-6) + Math.random().toString(36).substr(2, 4).toUpperCase();
  }

  // Datenbank zurücksetzen (nur für Development)
  resetDatabase() {
    localStorage.removeItem(this.dbName);
    this.initDatabase();
    return { success: true };
  }
}

// Singleton Pattern
const memberDatabase = new MemberDatabase();

export default memberDatabase;
