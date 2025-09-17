# Eventbrite Integration für Ruhrpott Events

Diese Implementierung bietet eine vollständige Integration mit der Eventbrite API für automatische Event-Synchronisation im Ruhrgebiet.

## 🚀 Features

- **Automatische Synchronisation** - Events werden regelmäßig von Eventbrite abgerufen
- **Echtzeit-Updates** - Webhook-Support für sofortige Aktualisierungen
- **Smart Caching** - Reduziert API-Calls durch intelligente Zwischenspeicherung
- **Rate Limiting** - Respektiert Eventbrite API-Limits
- **Ruhrgebiet-Focus** - Speziell optimiert für Events in der Ruhr-Region
- **Admin Interface** - Benutzerfreundliche Konfiguration und Überwachung

## 📋 Voraussetzungen

1. **Eventbrite API Token**
   - Kostenlos verfügbar bei [eventbrite.com/platform/api-keys](https://www.eventbrite.com/platform/api-keys)
   - Erfordert Eventbrite-Konto

2. **Organisation ID (Optional)**
   - Nur für eigene Events erforderlich
   - Allgemeine Ruhrgebiet-Suche funktioniert ohne

## 🛠️ Installation & Konfiguration

### 1. Admin Panel öffnen
- Website aufrufen
- Admin Panel öffnen (Passwort: `ruhrpott2025`)
- Tab "Eventbrite Sync" auswählen

### 2. API konfigurieren
```
API Token: [Ihr Eventbrite Token]
Organisation ID: [Optional - für eigene Events]
Sync-Frequenz: [15-720 Minuten]
```

### 3. Verbindung testen
- "Verbindung Testen" klicken
- Bei Erfolg: ✅ Grüner Status
- Bei Fehler: ❌ Fehlermeldung prüfen

### 4. Auto-Sync starten
- "Auto-Sync Starten" klicken
- Events werden automatisch synchronisiert
- Live-Logs zeigen Fortschritt

## 🔄 Synchronisation

### Automatische Synchronisation
- **Intervalle**: 15 Minuten bis 12 Stunden
- **Smart Updates**: Nur geänderte Events werden aktualisiert
- **Duplikat-Schutz**: Verhindert doppelte Events
- **Offline-Toleranz**: Funktioniert auch bei temporären API-Ausfällen

### Manuelle Synchronisation
```javascript
// Über Admin Panel
"Manuelle Synchronisation" → Sofortige Aktualisierung

// Programmatisch
import eventSyncService from './services/eventSyncService.js';
await eventSyncService.performSync(true);
```

### Event-Mapping
Eventbrite Events werden automatisch in das lokale Format konvertiert:

```javascript
{
  id: 'eventbrite_12345',
  originalId: '12345',
  source: 'eventbrite',
  title: 'Event Name',
  date: '2025-09-20',
  time: '19:00',
  location: 'Zeche Zollverein',
  city: 'Essen',
  category: 'Musik',
  price: '25€ - 45€',
  url: 'https://eventbrite.com/e/12345',
  imageUrl: 'https://img.evbuc.com/...',
  tags: ['Konzert', 'Ruhrgebiet']
}
```

## 🪝 Webhooks (Echtzeit-Updates)

### Lokale Entwicklung
```javascript
import webhookHandler from './services/webhookHandler.js';

// Simulation starten (für Tests)
webhookHandler.startSimulation(5); // Alle 5 Minuten

// Test-Webhook senden
webhookHandler.sendTestWebhook('event.updated');
```

### Produktions-Setup
1. **Server bereitstellen** mit öffentlicher URL
2. **Webhook registrieren** bei Eventbrite:
   ```
   POST https://www.eventbriteapi.com/v3/webhooks/
   {
     "endpoint_url": "https://ihre-domain.com/webhook/eventbrite",
     "actions": "event.published,event.updated,event.unpublished"
   }
   ```

3. **ngrok für lokale Tests**:
   ```bash
   npm install -g ngrok
   ngrok http 3001
   # Verwende die HTTPS URL für Webhook
   ```

## 📊 Überwachung & Statistiken

Das Admin Panel zeigt:
- **Verbindungsstatus** - API erreichbar/nicht erreichbar
- **Sync-Status** - Läuft/Gestoppt
- **Statistiken**:
  - Erfolgreiche/Fehlgeschlagene Syncs
  - Events hinzugefügt/aktualisiert/entfernt
  - Letzte Synchronisation
- **Live-Logs** - Echtzeitprotokoll aller Aktivitäten

## 🌍 Ruhrgebiet-Optimierung

### Abgedeckte Städte
```javascript
const ruhrCities = [
  'Dortmund', 'Essen', 'Bochum', 'Duisburg',
  'Gelsenkirchen', 'Oberhausen', 'Hagen',
  'Recklinghausen', 'Bottrop', 'Mühlheim an der Ruhr',
  'Witten', 'Castrop-Rauxel', 'Lünen', 'Unna'
];
```

### Kategorien-Filter
- **Musik** (103) - Konzerte, Festivals
- **Business** (110) - Konferenzen, Networking
- **Community** (113) - Lokale Events
- **Arts** (108) - Theater, Kunst, Kultur

### Radius-Suche
- **Standard**: 50km um jede Stadt
- **Zeitraum**: 90 Tage im Voraus
- **Status**: Nur live/aktive Events

## 🔧 API-Details

### Rate Limiting
- **Minimum**: 100ms zwischen Requests
- **Caching**: 5 Minuten pro Endpoint
- **Retry-Logic**: Bei Fehlern automatisch wiederholen

### Fehlerbehandlung
```javascript
// Verbindungsfehler
if (!eventbriteAPI.token) {
  throw new Error('API Token nicht konfiguriert');
}

// Rate Limit erreicht
if (response.status === 429) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Retry...
}

// Ungültige Events filtern
const validEvents = events.filter(event => 
  event.start && event.venue && event.status === 'live'
);
```

### Cache-Management
```javascript
// Cache leeren
eventbriteAPI.clearCache();

// Cache-Statistiken
const stats = eventbriteAPI.getCacheStats();
console.log(`Cache: ${stats.cacheSize} Einträge`);
```

## 🚨 Troubleshooting

### Häufige Probleme

**❌ "API Token nicht konfiguriert"**
- Token im Admin Panel eingeben
- Token bei eventbrite.com generieren
- Berechtigung prüfen

**❌ "Organisation nicht gefunden"**
- Organisation ID ist optional
- Für allgemeine Suche leer lassen
- ID in Eventbrite Dashboard finden

**❌ "Rate Limit erreicht"**
- Sync-Frequenz erhöhen (weniger häufig)
- Cache wird automatisch verwendet
- Nach 1 Stunde automatisch zurückgesetzt

**❌ "Keine Events gefunden"**
- Eventbrite-Events müssen öffentlich sein
- Status muss "live" sein
- Zeitraum prüfen (90 Tage)

### Debug-Modus
```javascript
// Browser-Konsole öffnen
localStorage.setItem('eventbrite_debug', 'true');

// Ausführliche Logs anzeigen
eventSyncService.performSync(true);
```

## 🔐 Sicherheit

### API-Token
- **Niemals** in öffentlichem Code speichern
- LocalStorage-Speicherung nur für Demo
- Produktion: Server-seitige Umgebungsvariablen

### Webhooks
- HTTPS erforderlich
- Authentifizierung implementieren
- Request-Validation durchführen

## 📱 Mobile Optimierung

Das Admin Panel ist vollständig responsiv:
- **Tablet**: Optimierte Grid-Layouts
- **Mobile**: Stapelbare Karten
- **Touch**: Große Buttons und Inputs

## 🎯 Roadmap

### Geplante Features
- [ ] **Multi-Platform**: Facebook Events, Meetup API
- [ ] **AI-Integration**: Automatische Kategorisierung
- [ ] **Push-Benachrichtigungen**: Neue Events
- [ ] **Kalender-Export**: .ics Dateien
- [ ] **Social Sharing**: Automatische Posts

### Performance-Optimierungen
- [ ] **Service Worker**: Offline-Synchronisation
- [ ] **WebAssembly**: Schnellere Datenverarbeitung
- [ ] **GraphQL**: Optimierte API-Abfragen

## 📞 Support

Bei Problemen:
1. **Admin Panel Logs** prüfen
2. **Browser-Konsole** öffnen
3. **GitHub Issues** erstellen
4. **Eventbrite API Status** prüfen: [status.eventbrite.com](https://status.eventbrite.com)

---

**Entwickelt für die Ruhrpott Community** 🏭❤️
