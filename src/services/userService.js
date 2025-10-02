// User Management Service - Ruhrpott Event Platform
// Handles registration, login, profile management - now with Backend API

import userServiceAPI from './userServiceAPI.js';
import memberDatabase from './memberDatabase.js';

class UserService {
  constructor() {
    // Check if backend is available
    this.useBackend = this.checkBackendAvailability();
    
    // Fallback keys for localStorage
    this.storageKey = 'ruhrpott_users'
    this.sessionKey = 'ruhrpott_session'
    this.favoriteEventsKey = 'ruhrpott_user_favorites'
    this.ticketHistoryKey = 'ruhrpott_ticket_history'
    
    console.log(this.useBackend ? '🌐 Using Backend API' : '💾 Using Local Storage');
  }

  // Check if backend is available
  async checkBackendAvailability() {
    try {
      const response = await fetch('http://localhost:5000/api', { 
        method: 'GET',
        timeout: 3000 
      });
      return response.ok;
    } catch (error) {
      console.log('Backend not available, using local storage');
      return false;
    }
  }

  // User Registration - Backend API or Local
  async registerUser(userData) {
    // Try backend first, fallback to local
    try {
      return await userServiceAPI.registerUser(userData);
    } catch (error) {
      console.log('Backend registration failed, using local:', error.message);
      return await this.registerUserLocal(userData);
    }
  }

  // Local registration fallback
  async registerUserLocal(userData) {
    try {
      const { firstName, lastName, email, password, confirmPassword, city, newsletter } = userData

      // Validation
      if (!email || !firstName || !lastName || !password || !confirmPassword) {
        throw new Error('Alle Felder sind erforderlich')
      }

      if (password !== confirmPassword) {
        throw new Error('Passwörter stimmen nicht überein')
      }

      if (password.length < 6) {
        throw new Error('Passwort muss mindestens 6 Zeichen lang sein')
      }

      if (!this.isValidEmail(email)) {
        throw new Error('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      }

      // Use memberDatabase for registration
      const memberData = {
        email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        password: this.hashPassword(password), // Simple hash for demo
        city: city || 'Essen',
        preferences: {
          language: 'de',
          emailNotifications: true,
          favoriteGenres: [],
          favoriteCities: []
        },
        profile: {
          firstName,
          lastName,
          phone: '',
          birthday: '',
          address: {
            street: '',
            city: city || 'Essen',
            zip: '',
            country: 'Deutschland'
          }
        }
      };

      // Register in memberDatabase
      const result = memberDatabase.addMember(memberData);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Newsletter subscription if requested
      if (newsletter) {
        memberDatabase.addNewsletterSubscriber(email, `${firstName} ${lastName}`, 'registration');
      }

      // Auto login after registration
      this.createSession(result.member)

      return {
        success: true,
        message: 'Registrierung erfolgreich! Willkommen bei Ruhrpott Events!',
        user: this.sanitizeUser(result.member)
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // User Login - Backend API or Local
  async loginUser(loginData) {
    // Try backend first, fallback to local
    try {
      return await userServiceAPI.loginUser(loginData);
    } catch (error) {
      console.log('Backend login failed, using local:', error.message);
      return await this.loginUserLocal(loginData);
    }
  }

  // Local login fallback
  async loginUserLocal(loginData) {
    try {
      const { email, password } = loginData;
      
      if (!email || !password) {
        throw new Error('E-Mail und Passwort sind erforderlich')
      }

      // Use memberDatabase for login
      const result = memberDatabase.loginMember(email, this.hashPassword(password));
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Create session
      this.createSession(result.member)

      return {
        success: true,
        message: `Willkommen zurück, ${result.member.name}!`,
        user: this.sanitizeUser(result.member)
      }

    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Logout
  logout() {
    try {
      // Try backend logout first
      userServiceAPI.logout();
    } catch (error) {
      console.log('Backend logout failed:', error.message);
    }
    
    // Always clear local session
    localStorage.removeItem(this.sessionKey)
    return {
      success: true,
      message: 'Erfolgreich abgemeldet'
    }
  }

  // Get current session
  getCurrentUser() {
    try {
      const session = localStorage.getItem(this.sessionKey)
      if (!session) return null

      const sessionData = JSON.parse(session)
      
      // Check if session is expired (24 hours)
      const sessionAge = Date.now() - new Date(sessionData.createdAt).getTime()
      if (sessionAge > 24 * 60 * 60 * 1000) {
        this.logout()
        return null
      }

      return sessionData.user
    } catch {
      return null
    }
  }

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      const users = this.getAllUsers()
      const userIndex = users.findIndex(u => u.id === userId)

      if (userIndex === -1) {
        throw new Error('Benutzer nicht gefunden')
      }

      users[userIndex] = {
        ...users[userIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      }

      localStorage.setItem(this.storageKey, JSON.stringify(users))

      // Update session
      const currentUser = this.getCurrentUser()
      if (currentUser && currentUser.id === userId) {
        this.createSession(users[userIndex])
      }

      return {
        success: true,
        message: 'Profil erfolgreich aktualisiert',
        user: this.sanitizeUser(users[userIndex])
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Favorite Events Management
  addFavoriteEvent(eventId, eventData) {
    const userId = this.getCurrentUser()?.id
    if (!userId) return false

    const favorites = this.getFavoriteEvents(userId)
    const newFavorite = {
      id: eventId,
      ...eventData,
      addedAt: new Date().toISOString()
    }

    const updatedFavorites = [...favorites.filter(fav => fav.id !== eventId), newFavorite]
    localStorage.setItem(`${this.favoriteEventsKey}_${userId}`, JSON.stringify(updatedFavorites))
    return true
  }

  removeFavoriteEvent(eventId) {
    const userId = this.getCurrentUser()?.id
    if (!userId) return false

    const favorites = this.getFavoriteEvents(userId)
    const updatedFavorites = favorites.filter(fav => fav.id !== eventId)
    localStorage.setItem(`${this.favoriteEventsKey}_${userId}`, JSON.stringify(updatedFavorites))
    return true
  }

  getFavoriteEvents(userId = null) {
    const currentUserId = userId || this.getCurrentUser()?.id
    if (!currentUserId) return []

    try {
      const favorites = localStorage.getItem(`${this.favoriteEventsKey}_${currentUserId}`)
      return favorites ? JSON.parse(favorites) : []
    } catch {
      return []
    }
  }

  // Ticket History Management
  addTicketPurchase(ticketData) {
    const userId = this.getCurrentUser()?.id
    if (!userId) return false

    const history = this.getTicketHistory(userId)
    const newTicket = {
      id: this.generateTicketId(),
      ...ticketData,
      purchasedAt: new Date().toISOString(),
      status: 'purchased'
    }

    const updatedHistory = [newTicket, ...history]
    localStorage.setItem(`${this.ticketHistoryKey}_${userId}`, JSON.stringify(updatedHistory))
    return true
  }

  getTicketHistory(userId = null) {
    const currentUserId = userId || this.getCurrentUser()?.id
    if (!currentUserId) return []

    try {
      const history = localStorage.getItem(`${this.ticketHistoryKey}_${currentUserId}`)
      return history ? JSON.parse(history) : []
    } catch {
      return []
    }
  }

  // Statistics & Analytics
  getUserStats() {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return null

    const favorites = this.getFavoriteEvents()
    const tickets = this.getTicketHistory()
    
    return {
      memberSince: currentUser.createdAt,
      totalFavorites: favorites.length,
      totalTickets: tickets.length,
      lastLogin: currentUser.lastLogin,
      favoriteGenres: this.getMostFavoriteGenres(favorites),
      favoriteCities: this.getMostFavoriteCities(favorites)
    }
  }

  // Helper Methods
  getAllUsers() {
    try {
      const users = localStorage.getItem(this.storageKey)
      return users ? JSON.parse(users) : []
    } catch {
      return []
    }
  }

  createSession(user) {
    const sessionData = {
      user: this.sanitizeUser(user),
      createdAt: new Date().toISOString()
    }
    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData))
  }

  sanitizeUser(user) {
    const { password, ...safeUser } = user
    return safeUser
  }

  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  generateTicketId() {
    return 'ticket_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  hashPassword(password) {
    // Simple hash for demo - in production use proper hashing
    return btoa(password + 'ruhrpott_salt')
  }

  verifyPassword(password, hashedPassword) {
    return this.hashPassword(password) === hashedPassword
  }

  getMostFavoriteGenres(favorites) {
    const genreCount = {}
    favorites.forEach(fav => {
      if (fav.category) {
        genreCount[fav.category] = (genreCount[fav.category] || 0) + 1
      }
    })
    return Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre, count]) => ({ genre, count }))
  }

  getMostFavoriteCities(favorites) {
    const cityCount = {}
    favorites.forEach(fav => {
      if (fav.city) {
        cityCount[fav.city] = (cityCount[fav.city] || 0) + 1
      }
    })
    return Object.entries(cityCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([city, count]) => ({ city, count }))
  }

  // Demo Users für Development
  createDemoUsers() {
    const demoUsers = [
      {
        id: 'demo_user_1',
        email: 'max@ruhrpott.de',
        name: 'Max Mustermann',
        password: this.hashPassword('password123'),
        createdAt: '2025-01-01T00:00:00.000Z',
        lastLogin: new Date().toISOString(),
        preferences: {
          language: 'de',
          emailNotifications: true,
          favoriteGenres: ['Konzerte', 'Festival'],
          favoriteCities: ['Essen', 'Dortmund']
        }
      }
    ]

    const existingUsers = this.getAllUsers()
    if (existingUsers.length === 0) {
      localStorage.setItem(this.storageKey, JSON.stringify(demoUsers))
    }
  }
}

export default new UserService()
