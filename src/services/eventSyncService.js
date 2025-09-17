// Event Synchronisation Service für automatische Updates
import eventbriteAPI from './eventbriteAPI.js';

class EventSyncService {
  constructor() {
    this.isRunning = false;
    this.syncInterval = null;
    this.webhookPort = 3001;
    this.lastSync = null;
    this.syncFrequency = 30 * 60 * 1000; // 30 Minuten
    this.eventListeners = new Set();
    
    // Sync Status
    this.stats = {
      totalSyncs: 0,
      successfulSyncs: 0,
      failedSyncs: 0,
      lastSyncTime: null,
      eventsAdded: 0,
      eventsUpdated: 0,
      eventsRemoved: 0
    };

    this.loadConfig();
  }

  // Konfiguration laden
  loadConfig() {
    const saved = localStorage.getItem('eventSync_config');
    if (saved) {
      const config = JSON.parse(saved);
      this.syncFrequency = config.frequency || this.syncFrequency;
      this.lastSync = config.lastSync ? new Date(config.lastSync) : null;
      this.stats = { ...this.stats, ...config.stats };
    }
  }

  // Konfiguration speichern
  saveConfig() {
    const config = {
      frequency: this.syncFrequency,
      lastSync: this.lastSync?.toISOString(),
      stats: this.stats
    };
    localStorage.setItem('eventSync_config', JSON.stringify(config));
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
        console.error('Error in event listener:', error);
      }
    });
  }

  // Automatische Synchronisation starten
  startAutoSync(frequency = null) {
    if (this.isRunning) {
      console.log('Event Sync läuft bereits');
      return;
    }

    if (frequency) {
      this.syncFrequency = frequency;
    }

    console.log(`Event Sync gestartet - Intervall: ${this.syncFrequency / 1000 / 60} Minuten`);
    
    this.isRunning = true;
    
    // Erste Synchronisation sofort
    this.performSync();
    
    // Dann regelmäßige Synchronisation
    this.syncInterval = setInterval(() => {
      this.performSync();
    }, this.syncFrequency);

    this.emit('sync_started', { frequency: this.syncFrequency });
  }

  // Automatische Synchronisation stoppen
  stopAutoSync() {
    if (!this.isRunning) return;

    console.log('Event Sync gestoppt');
    this.isRunning = false;
    
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    this.emit('sync_stopped', {});
  }

  // Einmalige Synchronisation durchführen
  async performSync(force = false) {
    if (!force && !this.shouldSync()) {
      console.log('Sync übersprungen - zu früh seit letzter Synchronisation');
      return;
    }

    console.log('Starte Event-Synchronisation...');
    this.emit('sync_started_single', {});
    
    this.stats.totalSyncs++;
    
    try {
      // 1. Lokale Events laden
      const localEvents = this.getLocalEvents();
      
      // 2. Eventbrite Events abrufen
      let eventbriteEvents = [];
      
      try {
        eventbriteEvents = await eventbriteAPI.searchRuhrgebietEvents();
        console.log(`${eventbriteEvents.length} Events von Eventbrite abgerufen`);
      } catch (error) {
        console.warn('Fehler beim Abrufen von Eventbrite Events:', error);
      }

      // 3. Events synchronisieren
      const syncResults = this.synchronizeEvents(localEvents, eventbriteEvents);
      
      // 4. Statistiken aktualisieren
      this.stats.successfulSyncs++;
      this.stats.lastSyncTime = new Date().toISOString();
      this.stats.eventsAdded += syncResults.added;
      this.stats.eventsUpdated += syncResults.updated;
      this.stats.eventsRemoved += syncResults.removed;
      
      this.lastSync = new Date();
      this.saveConfig();

      console.log('Event-Synchronisation abgeschlossen:', syncResults);
      
      this.emit('sync_completed', {
        success: true,
        results: syncResults,
        stats: this.stats
      });

      return syncResults;

    } catch (error) {
      console.error('Fehler bei Event-Synchronisation:', error);
      
      this.stats.failedSyncs++;
      this.saveConfig();
      
      this.emit('sync_completed', {
        success: false,
        error: error.message,
        stats: this.stats
      });
      
      throw error;
    }
  }

  // Prüfen ob Sync notwendig ist
  shouldSync() {
    if (!this.lastSync) return true;
    
    const timeSinceLastSync = Date.now() - this.lastSync.getTime();
    return timeSinceLastSync >= this.syncFrequency;
  }

  // Lokale Events laden
  getLocalEvents() {
    const stored = localStorage.getItem('ruhrpott_events');
    if (!stored) return [];
    
    try {
      const events = JSON.parse(stored);
      // Nur Eventbrite-Events für Sync berücksichtigen
      return events.filter(event => event.source === 'eventbrite');
    } catch (error) {
      console.error('Fehler beim Laden lokaler Events:', error);
      return [];
    }
  }

  // Alle Events laden (lokale + externe)
  getAllLocalEvents() {
    const stored = localStorage.getItem('ruhrpott_events');
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Fehler beim Laden aller Events:', error);
      return [];
    }
  }

  // Events synchronisieren
  synchronizeEvents(localEvents, externalEvents) {
    const results = {
      added: 0,
      updated: 0,
      removed: 0,
      total: externalEvents.length
    };

    // Alle Events laden (nicht nur Eventbrite)
    const allLocalEvents = this.getAllLocalEvents();
    
    // Map für schnellen Zugriff auf lokale Eventbrite Events
    const localEventMap = new Map();
    localEvents.forEach(event => {
      localEventMap.set(event.originalId, event);
    });

    // Neue und aktualisierte Events hinzufügen
    const updatedEventbriteEvents = [];
    
    externalEvents.forEach(externalEvent => {
      const convertedEvent = eventbriteAPI.convertEventToLocal(externalEvent);
      const localEvent = localEventMap.get(externalEvent.id);
      
      if (!localEvent) {
        // Neues Event
        updatedEventbriteEvents.push(convertedEvent);
        results.added++;
      } else {
        // Event aktualisieren, wenn sich was geändert hat
        if (this.hasEventChanged(localEvent, convertedEvent)) {
          updatedEventbriteEvents.push({
            ...localEvent,
            ...convertedEvent,
            id: localEvent.id // Lokale ID beibehalten
          });
          results.updated++;
        } else {
          // Unverändertes Event beibehalten
          updatedEventbriteEvents.push(localEvent);
        }
      }
    });

    // Events die nicht mehr bei Eventbrite existieren entfernen
    const externalEventIds = new Set(externalEvents.map(e => e.id));
    const keptLocalEvents = allLocalEvents.filter(event => {
      if (event.source === 'eventbrite') {
        const shouldKeep = externalEventIds.has(event.originalId);
        if (!shouldKeep) results.removed++;
        return shouldKeep;
      }
      return true; // Nicht-Eventbrite Events behalten
    });

    // Eventbrite Events durch aktualisierte ersetzen
    const finalEvents = [
      ...keptLocalEvents.filter(e => e.source !== 'eventbrite'),
      ...updatedEventbriteEvents
    ];

    // Events nach Datum sortieren
    finalEvents.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    // Speichern
    localStorage.setItem('ruhrpott_events', JSON.stringify(finalEvents));

    return results;
  }

  // Prüfen ob Event geändert wurde
  hasEventChanged(localEvent, externalEvent) {
    const compareFields = ['title', 'description', 'date', 'time', 'location', 'price'];
    
    return compareFields.some(field => {
      const localValue = String(localEvent[field] || '').trim();
      const externalValue = String(externalEvent[field] || '').trim();
      return localValue !== externalValue;
    });
  }

  // Webhook Server starten (für Echtzeit-Updates)
  startWebhookServer() {
    // In einer echten Implementierung würde hier ein Express Server gestartet
    console.log(`Webhook Server würde auf Port ${this.webhookPort} gestartet`);
    
    // Webhook bei Eventbrite registrieren
    this.registerWebhooks();
  }

  // Webhooks bei Eventbrite registrieren
  async registerWebhooks() {
    try {
      const webhookUrl = `https://your-domain.com/webhook/eventbrite`;
      const response = await eventbriteAPI.registerWebhook(webhookUrl);
      console.log('Webhook registriert:', response);
    } catch (error) {
      console.error('Fehler beim Registrieren des Webhooks:', error);
    }
  }

  // Webhook Request verarbeiten
  handleWebhook(webhookData) {
    const { action, api_url } = webhookData;
    
    console.log(`Webhook empfangen: ${action}`);
    
    switch (action) {
      case 'event.published':
      case 'event.updated':
        this.handleEventUpdate(api_url);
        break;
      case 'event.unpublished':
        this.handleEventRemoved(api_url);
        break;
      default:
        console.log(`Unbekannte Webhook Action: ${action}`);
    }
  }

  // Einzelnes Event Update verarbeiten
  async handleEventUpdate(apiUrl) {
    try {
      const eventId = this.extractEventIdFromUrl(apiUrl);
      const eventData = await eventbriteAPI.getEventDetails(eventId);
      
      const localEvents = this.getAllLocalEvents();
      const convertedEvent = eventbriteAPI.convertEventToLocal(eventData);
      
      // Event in lokaler Liste finden und aktualisieren
      const eventIndex = localEvents.findIndex(e => e.originalId === eventId);
      
      if (eventIndex >= 0) {
        localEvents[eventIndex] = {
          ...localEvents[eventIndex],
          ...convertedEvent
        };
        console.log(`Event aktualisiert: ${convertedEvent.title}`);
      } else {
        localEvents.push(convertedEvent);
        console.log(`Neues Event hinzugefügt: ${convertedEvent.title}`);
      }
      
      localStorage.setItem('ruhrpott_events', JSON.stringify(localEvents));
      
      this.emit('event_updated', { event: convertedEvent });
      
    } catch (error) {
      console.error('Fehler beim Verarbeiten des Event Updates:', error);
    }
  }

  // Event entfernen
  async handleEventRemoved(apiUrl) {
    try {
      const eventId = this.extractEventIdFromUrl(apiUrl);
      const localEvents = this.getAllLocalEvents();
      
      const filteredEvents = localEvents.filter(e => e.originalId !== eventId);
      
      if (filteredEvents.length < localEvents.length) {
        localStorage.setItem('ruhrpott_events', JSON.stringify(filteredEvents));
        console.log(`Event entfernt: ${eventId}`);
        
        this.emit('event_removed', { eventId });
      }
      
    } catch (error) {
      console.error('Fehler beim Entfernen des Events:', error);
    }
  }

  // Event ID aus API URL extrahieren
  extractEventIdFromUrl(apiUrl) {
    const match = apiUrl.match(/\/events\/(\d+)/);
    return match ? match[1] : null;
  }

  // Sync-Frequenz setzen
  setSyncFrequency(minutes) {
    this.syncFrequency = minutes * 60 * 1000;
    this.saveConfig();
    
    // Wenn Auto-Sync läuft, neu starten
    if (this.isRunning) {
      this.stopAutoSync();
      this.startAutoSync();
    }
  }

  // Status abrufen
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastSync: this.lastSync,
      frequency: this.syncFrequency,
      stats: this.stats,
      nextSync: this.isRunning && this.lastSync ? 
        new Date(this.lastSync.getTime() + this.syncFrequency) : null
    };
  }

  // Statistiken zurücksetzen
  resetStats() {
    this.stats = {
      totalSyncs: 0,
      successfulSyncs: 0,
      failedSyncs: 0,
      lastSyncTime: null,
      eventsAdded: 0,
      eventsUpdated: 0,
      eventsRemoved: 0
    };
    this.saveConfig();
  }

  // Service cleanup
  destroy() {
    this.stopAutoSync();
    this.eventListeners.clear();
  }
}

// Singleton Instance
const eventSyncService = new EventSyncService();

export default eventSyncService;
