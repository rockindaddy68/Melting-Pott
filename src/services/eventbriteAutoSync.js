// Auto-Sync Service für Eventbrite Integration
import eventbriteService from './eventbriteService.js';
import eventService from './adminEventService.js';

class EventbriteAutoSync {
  constructor() {
    this.isRunning = false;
    this.syncInterval = null;
    this.syncFrequency = 15 * 60 * 1000; // 15 Minuten
    this.lastSync = null;
    this.eventListeners = new Set();
    
    // Sync Statistiken
    this.stats = {
      totalSyncs: 0,
      successfulSyncs: 0,
      failedSyncs: 0,
      lastSyncTime: null,
      eventsAdded: 0,
      eventsUpdated: 0,
      eventsRemoved: 0,
      lastError: null
    };

    // Konfiguration
    this.config = {
      enabled: false,
      frequency: 15, // Minuten
      autoStart: false,
      cities: ['Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen', 'Oberhausen'],
      categories: ['music', 'arts', 'food-and-drink', 'community', 'sports-fitness'],
      maxEvents: 100
    };

    this.loadConfig();
    
    // Auto-Start wenn konfiguriert
    if (this.config.autoStart && this.config.enabled) {
      setTimeout(() => this.start(), 5000); // 5s Verzögerung für App-Init
    }
  }

  // Konfiguration laden
  loadConfig() {
    try {
      const saved = localStorage.getItem('eventbrite_autosync_config');
      if (saved) {
        const config = JSON.parse(saved);
        this.config = { ...this.config, ...config };
        this.syncFrequency = this.config.frequency * 60 * 1000;
      }

      const savedStats = localStorage.getItem('eventbrite_autosync_stats');
      if (savedStats) {
        this.stats = { ...this.stats, ...JSON.parse(savedStats) };
      }
    } catch (error) {
      console.error('Error loading auto-sync config:', error);
    }
  }

  // Konfiguration speichern
  saveConfig() {
    try {
      localStorage.setItem('eventbrite_autosync_config', JSON.stringify(this.config));
      localStorage.setItem('eventbrite_autosync_stats', JSON.stringify(this.stats));
    } catch (error) {
      console.error('Error saving auto-sync config:', error);
    }
  }

  // Event Listener hinzufügen
  addEventListener(callback) {
    this.eventListeners.add(callback);
  }

  // Event Listener entfernen
  removeEventListener(callback) {
    this.eventListeners.delete(callback);
  }

  // Event an alle Listener senden
  emit(eventType, data) {
    this.eventListeners.forEach(callback => {
      try {
        callback(eventType, data);
      } catch (error) {
        console.error('Error in auto-sync event listener:', error);
      }
    });
  }

  // Auto-Sync starten
  start() {
    if (this.isRunning) {
      console.log('🔄 Eventbrite Auto-Sync läuft bereits');
      return { success: false, message: 'Auto-Sync läuft bereits' };
    }

    if (!this.config.enabled) {
      console.log('❌ Auto-Sync ist deaktiviert');
      return { success: false, message: 'Auto-Sync ist deaktiviert' };
    }

    console.log(`🚀 Eventbrite Auto-Sync gestartet - Intervall: ${this.config.frequency} Minuten`);
    
    this.isRunning = true;
    
    // Erste Synchronisation sofort
    this.performSync();
    
    // Dann regelmäßige Synchronisation
    this.syncInterval = setInterval(() => {
      this.performSync();
    }, this.syncFrequency);

    this.emit('autosync_started', { 
      frequency: this.config.frequency,
      config: this.config 
    });

    return { 
      success: true, 
      message: `Auto-Sync gestartet (${this.config.frequency} min Intervall)` 
    };
  }

  // Auto-Sync stoppen
  stop() {
    if (!this.isRunning) {
      return { success: false, message: 'Auto-Sync läuft nicht' };
    }

    console.log('⏹️ Eventbrite Auto-Sync gestoppt');
    
    this.isRunning = false;
    
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    this.emit('autosync_stopped', { stats: this.stats });

    return { success: true, message: 'Auto-Sync gestoppt' };
  }

  // Einzelne Synchronisation durchführen
  async performSync() {
    if (!this.config.enabled) {
      console.log('⚠️ Auto-Sync deaktiviert - überspringe');
      return;
    }

    const syncId = Date.now();
    console.log(`🔄 Starte Eventbrite Sync #${syncId}`);
    
    this.emit('sync_started', { syncId, timestamp: new Date() });
    
    try {
      this.stats.totalSyncs++;
      
      // 1. Eventbrite API-Verbindung testen
      const connectionTest = await eventbriteService.testConnection();
      if (!connectionTest) {
        throw new Error('Eventbrite API nicht verfügbar');
      }

      // 2. Events von Eventbrite abrufen
      const eventbriteEvents = await this.fetchEventbriteEvents();
      
      // 3. Lokale Events abrufen
      const localEvents = eventService.getEvents();
      
      // 4. Synchronisation durchführen
      const syncResult = await this.synchronizeEvents(eventbriteEvents, localEvents);
      
      // 5. Statistiken aktualisieren
      this.stats.successfulSyncs++;
      this.stats.lastSyncTime = new Date().toISOString();
      this.stats.eventsAdded += syncResult.added;
      this.stats.eventsUpdated += syncResult.updated;
      this.stats.eventsRemoved += syncResult.removed;
      this.stats.lastError = null;
      
      this.lastSync = new Date();
      this.saveConfig();
      
      console.log(`✅ Sync #${syncId} erfolgreich:`, syncResult);
      
      this.emit('sync_completed', {
        syncId,
        success: true,
        result: syncResult,
        stats: this.stats
      });

    } catch (error) {
      console.error(`❌ Sync #${syncId} fehlgeschlagen:`, error);
      
      this.stats.failedSyncs++;
      this.stats.lastError = {
        message: error.message,
        timestamp: new Date().toISOString()
      };
      
      this.saveConfig();
      
      this.emit('sync_failed', {
        syncId,
        error: error.message,
        stats: this.stats
      });
    }
  }

  // Eventbrite Events abrufen
  async fetchEventbriteEvents() {
    const allEvents = [];
    
    for (const city of this.config.cities) {
      try {
        console.log(`📍 Lade Events für ${city}...`);
        const cityEvents = await eventbriteService.searchEvents({
          location: city,
          categories: this.config.categories,
          limit: Math.floor(this.config.maxEvents / this.config.cities.length)
        });
        
        allEvents.push(...cityEvents);
      } catch (error) {
        console.warn(`⚠️ Fehler beim Laden von Events für ${city}:`, error.message);
      }
    }
    
    return allEvents;
  }

  // Events synchronisieren
  async synchronizeEvents(eventbriteEvents, localEvents) {
    let added = 0;
    let updated = 0;
    let removed = 0;
    
    // Eventbrite Events zu lokalen Events hinzufügen/aktualisieren
    for (const ebEvent of eventbriteEvents) {
      const existingEvent = localEvents.find(local => 
        local.source === 'eventbrite' && local.externalId === ebEvent.id
      );
      
      if (existingEvent) {
        // Event aktualisieren
        const wasUpdated = this.updateEvent(existingEvent, ebEvent);
        if (wasUpdated) updated++;
      } else {
        // Neues Event hinzufügen
        this.addEvent(ebEvent);
        added++;
      }
    }
    
    // Veraltete Eventbrite Events entfernen (optional)
    if (this.config.removeOldEvents) {
      const eventbriteIds = eventbriteEvents.map(eb => eb.id);
      const toRemove = localEvents.filter(local => 
        local.source === 'eventbrite' && 
        !eventbriteIds.includes(local.externalId) &&
        new Date(local.date) > new Date() // Nur zukünftige Events
      );
      
      for (const event of toRemove) {
        eventService.deleteEvent(event.id);
        removed++;
      }
    }
    
    return { added, updated, removed, total: eventbriteEvents.length };
  }

  // Event hinzufügen
  addEvent(eventbriteEvent) {
    const newEvent = {
      name: eventbriteEvent.name?.text || 'Unbekanntes Event',
      date: eventbriteEvent.start?.local?.split('T')[0] || '',
      time: eventbriteEvent.start?.local?.split('T')[1]?.substr(0, 5) || '',
      location: eventbriteEvent.venue?.name || 'Venue TBD',
      city: this.extractCity(eventbriteEvent),
      category: this.categorizeEvent(eventbriteEvent),
      price: this.formatPrice(eventbriteEvent),
      description: eventbriteEvent.description?.text || '',
      source: 'eventbrite',
      externalId: eventbriteEvent.id,
      url: eventbriteEvent.url,
      lastSync: new Date().toISOString()
    };
    
    return eventService.addEvent(newEvent);
  }

  // Event aktualisieren
  updateEvent(localEvent, eventbriteEvent) {
    const updates = {};
    let hasChanges = false;
    
    // Vergleiche relevante Felder
    const newName = eventbriteEvent.name?.text || localEvent.name;
    const newDate = eventbriteEvent.start?.local?.split('T')[0] || localEvent.date;
    const newTime = eventbriteEvent.start?.local?.split('T')[1]?.substr(0, 5) || localEvent.time;
    const newLocation = eventbriteEvent.venue?.name || localEvent.location;
    
    if (localEvent.name !== newName) {
      updates.name = newName;
      hasChanges = true;
    }
    
    if (localEvent.date !== newDate) {
      updates.date = newDate;
      hasChanges = true;
    }
    
    if (localEvent.time !== newTime) {
      updates.time = newTime;
      hasChanges = true;
    }
    
    if (localEvent.location !== newLocation) {
      updates.location = newLocation;
      hasChanges = true;
    }
    
    if (hasChanges) {
      updates.lastSync = new Date().toISOString();
      eventService.updateEvent(localEvent.id, updates);
    }
    
    return hasChanges;
  }

  // Hilfsfunktionen
  extractCity(event) {
    if (event.venue?.address?.city) {
      const city = event.venue.address.city;
      return this.config.cities.find(c => 
        city.toLowerCase().includes(c.toLowerCase())
      ) || city;
    }
    return 'Unbekannt';
  }

  categorizeEvent(event) {
    const categories = event.category?.name?.toLowerCase() || '';
    if (categories.includes('music')) return 'Musik';
    if (categories.includes('art')) return 'Kunst';
    if (categories.includes('food')) return 'Food & Drink';
    if (categories.includes('sport')) return 'Sport';
    if (categories.includes('business')) return 'Business';
    return 'Sonstiges';
  }

  formatPrice(event) {
    if (event.ticket_availability?.minimum_ticket_price) {
      const price = event.ticket_availability.minimum_ticket_price.major_value;
      return price > 0 ? `ab ${price}€` : 'Kostenlos';
    }
    return 'Preis auf Anfrage';
  }

  // Konfiguration aktualisieren
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.syncFrequency = this.config.frequency * 60 * 1000;
    this.saveConfig();
    
    // Sync neu starten wenn läuft
    if (this.isRunning) {
      this.stop();
      if (this.config.enabled) {
        this.start();
      }
    }
    
    this.emit('config_updated', { config: this.config });
  }

  // Status abrufen
  getStatus() {
    return {
      isRunning: this.isRunning,
      config: this.config,
      stats: this.stats,
      lastSync: this.lastSync,
      nextSync: this.isRunning ? 
        new Date(Date.now() + this.syncFrequency) : null
    };
  }

  // Manual Sync
  async triggerManualSync() {
    if (this.isRunning) {
      return { success: false, message: 'Auto-Sync läuft bereits' };
    }
    
    console.log('🔄 Manueller Sync gestartet');
    await this.performSync();
    return { success: true, message: 'Manueller Sync abgeschlossen' };
  }
}

// Singleton Instanz
const eventbriteAutoSync = new EventbriteAutoSync();

export default eventbriteAutoSync;