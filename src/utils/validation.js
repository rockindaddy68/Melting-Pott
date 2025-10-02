// Validation Utilities
import { ValidationError } from './errorHandler.js';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    throw new ValidationError('E-Mail ist erforderlich', 'email');
  }
  if (!emailRegex.test(email)) {
    throw new ValidationError('Ungültige E-Mail-Adresse', 'email');
  }
  return true;
};

export const validatePassword = (password) => {
  if (!password) {
    throw new ValidationError('Passwort ist erforderlich', 'password');
  }
  if (password.length < 6) {
    throw new ValidationError('Passwort muss mindestens 6 Zeichen lang sein', 'password');
  }
  return true;
};

export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim().length === 0) {
    throw new ValidationError(`${fieldName} ist erforderlich`, fieldName.toLowerCase());
  }
  if (name.trim().length < 2) {
    throw new ValidationError(`${fieldName} muss mindestens 2 Zeichen lang sein`, fieldName.toLowerCase());
  }
  return true;
};

export const validateCity = (city) => {
  const validCities = [
    'Bochum', 'Bottrop', 'Dortmund', 'Duisburg', 'Essen', 
    'Gelsenkirchen', 'Hagen', 'Hamm', 'Herne', 'Oberhausen'
  ];
  
  if (!city) {
    throw new ValidationError('Stadt ist erforderlich', 'city');
  }
  if (!validCities.includes(city)) {
    throw new ValidationError('Bitte wählen Sie eine Stadt aus dem Ruhrgebiet', 'city');
  }
  return true;
};

export const validateUserRegistration = (userData) => {
  const { name, email, password, city } = userData;
  
  validateName(name, 'Name');
  validateEmail(email);
  validatePassword(password);
  validateCity(city);
  
  return true;
};

export const validateUserLogin = (loginData) => {
  const { email, password } = loginData;
  
  validateEmail(email);
  validatePassword(password);
  
  return true;
};

export const validateEventData = (eventData) => {
  const { name, date, city, venue } = eventData;
  
  if (!name || name.trim().length === 0) {
    throw new ValidationError('Event-Name ist erforderlich', 'name');
  }
  
  if (!date) {
    throw new ValidationError('Event-Datum ist erforderlich', 'date');
  }
  
  const eventDate = new Date(date);
  if (eventDate < new Date()) {
    throw new ValidationError('Event-Datum muss in der Zukunft liegen', 'date');
  }
  
  validateCity(city);
  
  if (!venue || venue.trim().length === 0) {
    throw new ValidationError('Veranstaltungsort ist erforderlich', 'venue');
  }
  
  return true;
};