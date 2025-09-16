// User Management Service - Ruhrpott Event Platform
// Handles registration, login, profile management with LocalStorage

class UserService {
  constructor() {
    this.storageKey = 'ruhrpott_users'
    this.sessionKey = 'ruhrpott_session'
    this.favoriteEventsKey = 'ruhrpott_user_favorites'
    this.ticketHistoryKey = 'ruhrpott_ticket_history'
  }

  // User Registration
  async registerUser(userData) {
    try {
      const { email, name, password, confirmPassword } = userData

      // Validation
      if (!email || !name || !password || !confirmPassword) {
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

      // Check if user already exists
      const existingUsers = this.getAllUsers()
      if (existingUsers.find(user => user.email === email)) {
        throw new Error('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits')
      }

      // Create new user
      const newUser = {
        id: this.generateUserId(),
        email,
        name,
        password: this.hashPassword(password), // Simple hash for demo
        createdAt: new Date().toISOString(),
        lastLogin: null,
        preferences: {
          language: 'de',
          emailNotifications: true,
          favoriteGenres: [],
          favoriteCities: []
        },
        profile: {
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || '',
          phone: '',
          birthday: '',
          address: {
            street: '',
            city: '',
            zip: '',
            country: 'Deutschland'
          }
        }
      }

      // Save user
      existingUsers.push(newUser)
      localStorage.setItem(this.storageKey, JSON.stringify(existingUsers))

      // Auto login after registration
      this.createSession(newUser)

      return {
        success: true,
        message: 'Registrierung erfolgreich! Willkommen bei Ruhrpott Events!',
        user: this.sanitizeUser(newUser)
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // User Login
  async loginUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error('E-Mail und Passwort sind erforderlich')
      }

      const users = this.getAllUsers()
      const user = users.find(u => u.email === email)

      if (!user) {
        throw new Error('Benutzer nicht gefunden')
      }

      if (!this.verifyPassword(password, user.password)) {
        throw new Error('Ungültiges Passwort')
      }

      // Update last login
      user.lastLogin = new Date().toISOString()
      const updatedUsers = users.map(u => u.id === user.id ? user : u)
      localStorage.setItem(this.storageKey, JSON.stringify(updatedUsers))

      // Create session
      this.createSession(user)

      return {
        success: true,
        message: `Willkommen zurück, ${user.name}!`,
        user: this.sanitizeUser(user)
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Logout
  logout() {
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
