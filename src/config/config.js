// Configuration Management
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000
  },

  // Database Configuration
  database: {
    name: 'ruhrpott_members_db',
    maxUsers: 10000,
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    cacheTimeout: 5 * 60 * 1000 // 5 minutes
  },

  // Validation Rules
  validation: {
    password: {
      minLength: 6,
      requireSpecialChar: false,
      requireNumber: false
    },
    name: {
      minLength: 2,
      maxLength: 50
    },
    email: {
      maxLength: 100
    }
  },

  // UI Configuration
  ui: {
    theme: 'dark',
    defaultCity: 'Essen',
    itemsPerPage: 20,
    autoRefreshInterval: 30000 // 30 seconds
  },

  // Feature Flags
  features: {
    backendSync: true,
    caching: true,
    offlineMode: true,
    analytics: false,
    newsletter: true,
    favorites: true,
    tickets: true
  },

  // Cities in Ruhrgebiet
  cities: [
    'Bochum', 'Bottrop', 'Dortmund', 'Duisburg', 'Essen',
    'Gelsenkirchen', 'Hagen', 'Hamm', 'Herne', 'Oberhausen'
  ],

  // Event Categories
  eventCategories: [
    'Konzert', 'Festival', 'Theater', 'Sport', 'Kultur',
    'Party', 'Kunst', 'Bildung', 'Familie', 'Business'
  ],

  // Error Messages
  messages: {
    errors: {
      networkError: 'Netzwerkfehler - bitte versuchen Sie es später erneut',
      validationError: 'Bitte überprüfen Sie Ihre Eingaben',
      authError: 'Authentifizierung fehlgeschlagen',
      serverError: 'Serverfehler - bitte versuchen Sie es später erneut',
      notFound: 'Die angeforderte Ressource wurde nicht gefunden'
    },
    success: {
      registered: 'Registrierung erfolgreich',
      loggedIn: 'Erfolgreich angemeldet',
      loggedOut: 'Erfolgreich abgemeldet',
      favoriteAdded: 'Event zu Favoriten hinzugefügt',
      favoriteRemoved: 'Event aus Favoriten entfernt',
      profileUpdated: 'Profil erfolgreich aktualisiert'
    }
  }
};

// Environment-specific overrides
if (process.env.NODE_ENV === 'production') {
  config.api.baseUrl = 'https://api.ruhrpott-events.de/api';
  config.features.analytics = true;
}

if (process.env.NODE_ENV === 'development') {
  config.database.maxUsers = 100;
  config.api.timeout = 5000;
}

// Configuration Getter
export const getConfig = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], config);
};

// Update Configuration
export const updateConfig = (path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((obj, key) => obj[key], config);
  target[lastKey] = value;
};

export default config;