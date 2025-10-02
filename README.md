# 🏭 Ruhrpott Events - Das Eventportal fürs Ruhrgebiet

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://github.com/rockindaddy68/Ruhrpott)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

> Eine moderne, vollständige Event-Plattform für das Ruhrgebiet mit React Frontend, Node.js Backend und intelligenter Datenbank-Integration.

## ✨ Features

### 🎭 **Event-Management**
- **Live Event-Ticker** mit aktuellen Veranstaltungen
- **Event-Suche** nach Stadt, Kategorie und Datum
- **Wikipedia-Integration** für Städteinformationen
- **Deutsche Datumsformatierung** optimiert für lokale Nutzer

### 👥 **Benutzer-System**
- **Registrierung & Login** mit sicherer Authentifizierung
- **Favoriten-Management** für Events
- **Ticket-History** und Kaufverwaltung
- **Newsletter-Abonnement** mit Präferenzen

### 🏗️ **Moderne Architektur**
- **Hybrid-Datenbank**: Automatisches Switching zwischen Backend-API und localStorage
- **Clean Architecture** mit Service-Abstraktionen
- **Error Handling** mit benutzerfreundlichen Fehlermeldungen
- **Retry-Logic** mit exponential backoff
- **Smart Caching** für optimale Performance

### 📱 **User Experience**
- **Responsive Design** für alle Geräte
- **Dark Theme** optimiert für Events
- **Smooth Animations** und Übergänge
- **Accessibility** (WCAG konform)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Moderne UI-Bibliothek
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Hooks** - Wiederverwendbare React-Logik

### Backend
- **Node.js** - Server-Runtime
- **Express.js** - Web-Framework
- **JWT** - Sichere Authentifizierung
- **bcrypt** - Password-Hashing
- **File-Database** - JSON-basierte Datenspeicherung

### Architektur
- **Clean Architecture** - Separation of Concerns
- **Service Layer Pattern** - Abstrakte Datenservices
- **Error Boundary Pattern** - Robuste Fehlerbehandlung
- **Configuration Management** - Feature Flags & Settings

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm oder yarn

### Installation & Start

```bash
# Repository klonen
git clone https://github.com/rockindaddy68/Ruhrpott.git
cd Ruhrpott

# Frontend Dependencies installieren
npm install

# Backend Dependencies installieren
cd backend
npm install

# Backend starten (Terminal 1)
npm start

# Frontend starten (Terminal 2) 
cd ..
npm run dev
```

### URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api

## 📁 Projekt-Struktur

```
Ruhrpott/
├── src/                          # Frontend Source
│   ├── components/              # React Components
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── auth/               # Login, Register, Dashboard
│   │   └── admin/              # Admin-Interface
│   ├── services/               # Business Logic
│   │   ├── userService.js      # User Management (Legacy)
│   │   ├── UserServiceRefactored.js  # Clean Architecture
│   │   ├── apiService.js       # HTTP Client
│   │   └── ServiceInterface.js # Abstract Base
│   ├── utils/                  # Helper Functions
│   │   ├── errorHandler.js     # Error Management
│   │   ├── validation.js       # Input Validation
│   │   └── eventsHelpers.js    # Date/Time Utils
│   ├── config/                 # Configuration
│   │   └── config.js          # App Settings
│   └── hooks/                  # Custom React Hooks
├── backend/                     # Backend API
│   ├── routes/                 # API Routes
│   │   ├── users.js           # User endpoints
│   │   └── newsletter.js      # Newsletter endpoints
│   ├── database/              # Data Layer
│   │   ├── fileDatabase.js    # JSON Database
│   │   └── db.json           # Data Storage
│   ├── utils/                 # Backend Utils
│   │   └── errorHandler.js    # Error Middleware
│   └── server.js              # Express Server
└── docs/                       # Documentation
```

## 🔧 Konfiguration

### Environment Variables
```bash
# Backend (.env)
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

# Frontend (.env.local)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Feature Flags
```javascript
// src/config/config.js
export const config = {
  features: {
    backendSync: true,     // Backend-Integration
    caching: true,         // Smart Caching
    offlineMode: true,     // Offline-Funktionalität
    analytics: false,      // Analytics (Produktion)
    newsletter: true,      // Newsletter-Feature
  }
};
```

## 🏛️ Architektur-Details

### Service Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API    │    │   Database      │
│                 │    │                  │    │                 │
│ UserService ────┼────┼─► /api/users ────┼────┼─► fileDatabase  │
│ apiService  ────┼────┼─► JWT Auth   ────┼────┼─► JSON Storage  │
│ HybridService ──┼────┼─► Error Handle───┼────┼─► Validation    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                                               │
         └─────────────── localStorage Fallback ────────┘
```

### Error Handling Flow
```
API Call → Validation → Backend → Database
    ↓         ↓           ↓         ↓
 Retry     Field      Server    Storage
 Logic     Error      Error     Error
    ↓         ↓           ↓         ↓
Fallback → User       Logging   Backup
Storage    Message    System    System
```

## 🎨 Screenshots

### Desktop View
- **Homepage**: Moderne Landingpage mit Event-Ticker
- **Events**: Filtierbare Event-Übersicht nach Städten
- **Dashboard**: Benutzer-Dashboard mit Favoriten und Tickets

### Mobile View
- **Responsive Design**: Optimiert für Touch-Bedienung
- **Navigation**: Hamburger-Menu mit smooth Animationen
- **Performance**: Lazy Loading und optimierte Bilder

## 🚀 Deployment

### Netlify (Frontend)
```bash
# Build für Produktion
npm run build

# Deploy zu Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Heroku (Backend)
```bash
# Heroku CLI installieren und einloggen
heroku create ruhrpott-backend
git subtree push --prefix backend heroku main
```

### GitHub Pages (Static)
```bash
# GitHub Actions für Auto-Deploy konfiguriert
git push origin main  # Automatisches Deployment
```

## 🧪 Testing

```bash
# Unit Tests
npm run test

# E2E Tests
npm run test:e2e

# Coverage Report
npm run test:coverage
```

## 📈 Performance

- **Lighthouse Score**: 95+ 
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB gzipped

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Changes committen (`git commit -m 'Add AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📝 License

Dieses Projekt ist unter der MIT License lizenziert - siehe [LICENSE](LICENSE) file.

## 👥 Team

- **Entwicklung**: [rockindaddy68](https://github.com/rockindaddy68)
- **Design**: Ruhrpott Community
- **Content**: Wikipedia & Community Beiträge

## 📞 Kontakt

- **Website**: [Ruhrpott Events](https://github.com/rockindaddy68/Ruhrpott)
- **Email**: info@ruhrpott-events.de
- **Issues**: [GitHub Issues](https://github.com/rockindaddy68/Ruhrpott/issues)

---

<div align="center">
  <strong>🏭 Made with ❤️ for the Ruhrgebiet 🏭</strong>
</div>
- **Error Boundary Pattern** - Robuste Fehlerbehandlung
- **Configuration Management** - Feature Flags & Settings

### Installation und Start
```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build
```

### Verfügbare Scripts
- `npm run dev` - Startet den Entwicklungsserver auf http://localhost:5173
- `npm run build` - Erstellt einen Production Build
- `npm run preview` - Startet eine Vorschau des Production Builds

## 📱 Komponenten

- **Header** - Navigation mit responsivem Design
- **Hero** - Eindrucksvolle Willkommensnachricht
- **Events** - Aktuelle Veranstaltungen im Ruhrgebiet
- **Gallery** - Foto-Galerie mit historischen und modernen Bildern
- **Footer** - Social Media Links und Quick Navigation

## 🎨 Design-System

Benutzerdefiniertes Farbschema basierend auf dem "Ruhrpott"-Thema mit modernen Grautönen und der Inter-Schriftart.

---

Entwickelt mit ❤️ für das Ruhrgebiet
