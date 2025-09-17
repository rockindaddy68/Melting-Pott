// Webhook Handler für Eventbrite Integration (Simuliert für lokale Entwicklung)
import eventSyncService from './eventSyncService.js';

class WebhookHandler {
  constructor() {
    this.isSimulating = false;
    this.simulationInterval = null;
    this.webhooks = [];
    
    // Für lokale Entwicklung: Simuliere Webhook Events
    this.simulatedEvents = [
      {
        action: 'event.published',
        api_url: 'https://www.eventbriteapi.com/v3/events/12345/',
        event_id: '12345',
        user_id: 'user123'
      },
      {
        action: 'event.updated',
        api_url: 'https://www.eventbriteapi.com/v3/events/67890/',
        event_id: '67890',
        user_id: 'user123'
      }
    ];
  }

  // Webhook registrieren (für echte Implementierung)
  registerWebhook(url, actions = ['event.published', 'event.updated', 'event.unpublished']) {
    const webhook = {
      id: Date.now().toString(),
      url,
      actions,
      created: new Date().toISOString(),
      active: true
    };
    
    this.webhooks.push(webhook);
    
    console.log('Webhook registriert:', webhook);
    return webhook;
  }

  // Webhook entfernen
  unregisterWebhook(webhookId) {
    this.webhooks = this.webhooks.filter(w => w.id !== webhookId);
    console.log('Webhook entfernt:', webhookId);
  }

  // Webhook Request verarbeiten
  handleWebhookRequest(request) {
    try {
      const { action, api_url, event_id, user_id } = request;
      
      console.log('Webhook empfangen:', { action, event_id });
      
      // An EventSync Service weiterleiten
      eventSyncService.handleWebhook({
        action,
        api_url,
        event_id,
        user_id
      });
      
      return { success: true, message: 'Webhook verarbeitet' };
    } catch (error) {
      console.error('Fehler beim Verarbeiten des Webhooks:', error);
      return { success: false, error: error.message };
    }
  }

  // Simulation für lokale Entwicklung starten
  startSimulation(intervalMinutes = 5) {
    if (this.isSimulating) {
      console.log('Webhook Simulation läuft bereits');
      return;
    }

    console.log(`Webhook Simulation gestartet - Intervall: ${intervalMinutes} Minuten`);
    
    this.isSimulating = true;
    
    // Erste Simulation nach 30 Sekunden
    setTimeout(() => {
      if (this.isSimulating) {
        this.simulateWebhook();
      }
    }, 30000);
    
    // Dann regelmäßige Simulationen
    this.simulationInterval = setInterval(() => {
      this.simulateWebhook();
    }, intervalMinutes * 60 * 1000);
  }

  // Simulation stoppen
  stopSimulation() {
    if (!this.isSimulating) return;

    console.log('Webhook Simulation gestoppt');
    this.isSimulating = false;
    
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  // Webhook simulieren
  simulateWebhook() {
    if (this.simulatedEvents.length === 0) return;

    const randomEvent = this.simulatedEvents[
      Math.floor(Math.random() * this.simulatedEvents.length)
    ];

    console.log('🔄 Simuliere Webhook:', randomEvent.action);
    
    // Webhook verarbeiten
    this.handleWebhookRequest(randomEvent);
  }

  // Manuellen Webhook Test senden
  sendTestWebhook(action = 'event.updated') {
    const testEvent = {
      action,
      api_url: `https://www.eventbriteapi.com/v3/events/test-${Date.now()}/`,
      event_id: `test-${Date.now()}`,
      user_id: 'test-user'
    };

    console.log('📧 Sende Test Webhook:', testEvent);
    return this.handleWebhookRequest(testEvent);
  }

  // Status abrufen
  getStatus() {
    return {
      isSimulating: this.isSimulating,
      webhooksRegistered: this.webhooks.length,
      simulationInterval: this.simulationInterval ? 'Aktiv' : 'Inaktiv'
    };
  }

  // Alle registrierten Webhooks abrufen
  getWebhooks() {
    return this.webhooks;
  }

  // Express.js Middleware für echten Server
  createExpressMiddleware() {
    return (req, res, next) => {
      if (req.path === '/webhook/eventbrite' && req.method === 'POST') {
        const result = this.handleWebhookRequest(req.body);
        
        if (result.success) {
          res.status(200).json(result);
        } else {
          res.status(400).json(result);
        }
      } else {
        next();
      }
    };
  }

  // Ngrok URL für lokale Entwicklung generieren
  generateNgrokInstructions() {
    return {
      instructions: [
        '1. Installieren Sie ngrok: npm install -g ngrok',
        '2. Starten Sie ngrok: ngrok http 3001',
        '3. Kopieren Sie die HTTPS URL (z.B. https://abc123.ngrok.io)',
        '4. Registrieren Sie den Webhook: https://abc123.ngrok.io/webhook/eventbrite',
        '5. Testen Sie mit: curl -X POST https://abc123.ngrok.io/webhook/eventbrite -d \'{"action":"test"}\''
      ],
      exampleCode: `
// Express Server Setup für Webhooks
const express = require('express');
const app = express();

app.use(express.json());
app.use(webhookHandler.createExpressMiddleware());

app.listen(3001, () => {
  console.log('Webhook Server läuft auf Port 3001');
});
      `
    };
  }

  // Cleanup
  destroy() {
    this.stopSimulation();
    this.webhooks = [];
  }
}

// Singleton Instance
const webhookHandler = new WebhookHandler();

export default webhookHandler;
