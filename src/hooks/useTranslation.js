import { useState } from 'react';

const translations = {
  de: {
    welcome: 'Willkommen im Ruhrgebiet',
    search: 'Suchen',
    events: 'Events',
    login: 'Anmelden',
    register: 'Registrieren',
    logout: 'Abmelden',
    profile: 'Profil',
    favorites: 'Favoriten',
    tickets: 'Tickets',
    newsletter: 'Newsletter',
    admin: 'Admin',
    loading: 'Wird geladen...',
    error: 'Fehler',
    noResults: 'Keine Ergebnisse gefunden',
    cancel: 'Abbrechen',
    save: 'Speichern',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    close: 'Schließen'
  },
  en: {
    welcome: 'Welcome to the Ruhr Area',
    search: 'Search',
    events: 'Events',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    favorites: 'Favorites',
    tickets: 'Tickets',
    newsletter: 'Newsletter',
    admin: 'Admin',
    loading: 'Loading...',
    error: 'Error',
    noResults: 'No results found',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close'
  },
  tr: {
    welcome: 'Ruhr Bölgesine Hoş Geldiniz',
    search: 'Ara',
    events: 'Etkinlikler',
    login: 'Giriş',
    register: 'Kayıt Ol',
    logout: 'Çıkış',
    profile: 'Profil',
    favorites: 'Favoriler',
    tickets: 'Biletler',
    newsletter: 'Haber Bülteni',
    admin: 'Yönetici',
    loading: 'Yükleniyor...',
    error: 'Hata',
    noResults: 'Sonuç bulunamadı',
    cancel: 'İptal',
    save: 'Kaydet',
    delete: 'Sil',
    edit: 'Düzenle',
    close: 'Kapat'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState('de');

  const t = (key, fallback = key) => {
    return translations[language]?.[key] || translations.de?.[key] || fallback;
  };

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('ruhrpott-language', newLanguage);
    }
  };

  // Initialize language from localStorage
  const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem('ruhrpott-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  };

  return {
    language,
    t,
    changeLanguage,
    initializeLanguage,
    availableLanguages: Object.keys(translations)
  };
};
