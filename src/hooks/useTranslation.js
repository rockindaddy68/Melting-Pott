// === REFACTORED TRANSLATION HOOK ===
// Nutzt den zentralen TranslationService für konsistente Übersetzungen
import { useState, useEffect } from 'react';
import TranslationService, { LANGUAGES } from '../services/translationService';

export const useTranslation = (initialLanguage = 'DE') => {
  const [language, setLanguage] = useState(initialLanguage);

  // Allgemeine Übersetzungsfunktion
  const t = (section, key, fallback = key) => {
    return TranslationService.getTranslation(section, language, key, fallback);
  };

  // Spezifische Übersetzungsfunktionen für bessere DX
  const navigation = (key) => TranslationService.getNavigationText(language, key);
  const hero = (key) => TranslationService.getHeroText(language, key);
  const welcome = () => TranslationService.getWelcomeText(language);
  const explanation = (key) => TranslationService.getExplanationText(language, key);
  const experiences = (key) => TranslationService.getExperiencesText(language, key);
  const eventReviews = (key) => TranslationService.getEventReviewsText(language, key);
  const eventTicker = (key) => TranslationService.getEventTickerText(language, key);
  const footer = (key) => TranslationService.getFooterText(language, key);
  const common = (key) => TranslationService.getCommonText(language, key);

  // Sprache ändern mit Persistierung
  const changeLanguage = (newLanguage) => {
    const lang = newLanguage?.toUpperCase();
    if (LANGUAGES.find(l => l.code === lang)) {
      setLanguage(lang);
      localStorage.setItem('ruhrpott-language', lang);
    }
  };

  // Sprache aus localStorage initialisieren
  const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem('ruhrpott-language');
    if (savedLanguage && LANGUAGES.find(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  };

  // Auto-initialisierung beim ersten Laden
  useEffect(() => {
    initializeLanguage();
  }, []);

  return {
    // Current language
    language,
    
    // Translation functions
    t,
    navigation,
    hero,
    welcome,
    explanation,
    experiences,
    eventReviews,
    eventTicker,
    footer,
    common,
    
    // Language management
    changeLanguage,
    initializeLanguage,
    
    // Available languages
    availableLanguages: LANGUAGES,
    supportedLanguageCodes: LANGUAGES.map(l => l.code)
  };
};
