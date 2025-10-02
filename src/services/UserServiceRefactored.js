// Refactored User Service - Clean Architecture
import { HybridService } from './ServiceInterface.js';
import { validateUserRegistration, validateUserLogin } from '../utils/validation.js';
import { handleApiError, ApiError } from '../utils/errorHandler.js';
import apiService from './apiService.js';
import memberDatabase from './memberDatabase.js';

class BackendUserService {
  async checkHealth() {
    const response = await fetch('http://localhost:5000/api/users/health');
    if (!response.ok) throw new Error('Backend unhealthy');
    return true;
  }

  async register(userData) {
    validateUserRegistration(userData);
    return await apiService.register(userData);
  }

  async login(loginData) {
    validateUserLogin(loginData);
    return await apiService.login(loginData);
  }

  async getProfile() {
    return await apiService.getUserProfile();
  }

  async updateProfile(profileData) {
    return await apiService.updateProfile(profileData);
  }

  async addFavorite(eventData) {
    return await apiService.addFavorite(eventData);
  }

  async getFavorites() {
    return await apiService.getFavorites();
  }

  async removeFavorite(eventId) {
    return await apiService.removeFavorite(eventId);
  }

  async addTicket(ticketData) {
    return await apiService.addTicket(ticketData);
  }

  async getTickets() {
    return await apiService.getTickets();
  }

  logout() {
    return apiService.logout();
  }
}

class LocalUserService {
  constructor() {
    this.storageKey = 'ruhrpott_users';
    this.sessionKey = 'ruhrpott_session';
  }

  async checkHealth() {
    return true; // Local storage is always available
  }

  async register(userData) {
    validateUserRegistration(userData);
    
    const { name, email, password, city, newsletter } = userData;
    const [firstName, ...lastNameParts] = name.trim().split(' ');
    const lastName = lastNameParts.join(' ') || firstName;

    const result = memberDatabase.addMember({
      name,
      email,
      password: this.hashPassword(password),
      firstName,
      lastName,
      city
    });

    if (!result.success) {
      throw new ApiError(result.error, 400);
    }

    if (newsletter) {
      memberDatabase.addNewsletterSubscriber(email, name);
    }

    this.createSession(result.member);

    return {
      success: true,
      message: `Willkommen ${name}! Du bist jetzt registriert.`,
      user: this.sanitizeUser(result.member)
    };
  }

  async login(loginData) {
    validateUserLogin(loginData);
    
    const { email, password } = loginData;
    const result = memberDatabase.loginMember(email, this.hashPassword(password));
    
    if (!result.success) {
      throw new ApiError(result.error, 400);
    }

    this.createSession(result.member);

    return {
      success: true,
      message: `Willkommen zurück, ${result.member.name}!`,
      user: this.sanitizeUser(result.member)
    };
  }

  async getProfile() {
    const user = this.getCurrentUser();
    if (!user) {
      throw new ApiError('Nicht angemeldet', 401);
    }
    return { success: true, user };
  }

  async updateProfile(profileData) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new ApiError('Nicht angemeldet', 401);
    }

    // Update implementation here
    return { success: true, user };
  }

  async addFavorite(eventData) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new ApiError('Nicht angemeldet', 401);
    }

    const result = memberDatabase.addToFavorites(user.id, eventData);
    return result;
  }

  async getFavorites() {
    const user = this.getCurrentUser();
    if (!user) return { success: true, favorites: [] };

    return {
      success: true,
      favorites: memberDatabase.getMemberFavorites(user.id)
    };
  }

  async removeFavorite(eventId) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new ApiError('Nicht angemeldet', 401);
    }

    // Implementation here
    return { success: true };
  }

  async addTicket(ticketData) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new ApiError('Nicht angemeldet', 401);
    }

    const result = memberDatabase.addTicketPurchase(user.id, ticketData);
    return result;
  }

  async getTickets() {
    const user = this.getCurrentUser();
    if (!user) return { success: true, tickets: [] };

    return {
      success: true,
      tickets: memberDatabase.getMemberTickets(user.id)
    };
  }

  logout() {
    localStorage.removeItem(this.sessionKey);
    return { success: true, message: 'Erfolgreich abgemeldet' };
  }

  // Helper methods
  getCurrentUser() {
    try {
      const session = localStorage.getItem(this.sessionKey);
      if (!session) return null;

      const sessionData = JSON.parse(session);
      
      // Check if session is expired (24 hours)
      const sessionAge = Date.now() - new Date(sessionData.createdAt).getTime();
      if (sessionAge > 24 * 60 * 60 * 1000) {
        this.logout();
        return null;
      }

      return sessionData.user;
    } catch {
      return null;
    }
  }

  createSession(user) {
    const sessionData = {
      user: this.sanitizeUser(user),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
  }

  sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  hashPassword(password) {
    return btoa(password + 'ruhrpott_salt');
  }
}

// Refactored UserService using Hybrid Architecture
class UserService extends HybridService {
  constructor() {
    const backendService = new BackendUserService();
    const localService = new LocalUserService();
    
    super(backendService, localService);
    
    console.log('🔄 UserService initialized with Hybrid Architecture');
  }

  async register(userData) {
    try {
      return await this.executeOperation('register', userData);
    } catch (error) {
      return handleApiError(error, 'Registration');
    }
  }

  async login(loginData) {
    try {
      return await this.executeOperation('login', loginData);
    } catch (error) {
      return handleApiError(error, 'Login');
    }
  }

  async getProfile() {
    try {
      return await this.executeOperation('getProfile');
    } catch (error) {
      return handleApiError(error, 'Profile');
    }
  }

  async updateProfile(profileData) {
    try {
      return await this.executeOperation('updateProfile', profileData);
    } catch (error) {
      return handleApiError(error, 'Profile Update');
    }
  }

  async addFavorite(eventData) {
    try {
      return await this.executeOperation('addFavorite', eventData);
    } catch (error) {
      return handleApiError(error, 'Add Favorite');
    }
  }

  async getFavorites() {
    try {
      // Try cache first
      const cached = this.getCache('user_favorites');
      if (cached) return cached;

      const result = await this.executeOperation('getFavorites');
      
      // Cache successful result
      if (result.success) {
        this.setCache('user_favorites', result);
      }
      
      return result;
    } catch (error) {
      return handleApiError(error, 'Get Favorites');
    }
  }

  async removeFavorite(eventId) {
    try {
      const result = await this.executeOperation('removeFavorite', eventId);
      
      // Clear favorites cache
      this.clearCache('user_favorites');
      
      return result;
    } catch (error) {
      return handleApiError(error, 'Remove Favorite');
    }
  }

  async addTicket(ticketData) {
    try {
      return await this.executeOperation('addTicket', ticketData);
    } catch (error) {
      return handleApiError(error, 'Add Ticket');
    }
  }

  async getTickets() {
    try {
      return await this.executeOperation('getTickets');
    } catch (error) {
      return handleApiError(error, 'Get Tickets');
    }
  }

  logout() {
    try {
      this.clearCache(); // Clear all cache
      return this.executeOperation('logout');
    } catch (error) {
      return handleApiError(error, 'Logout');
    }
  }

  getCurrentUser() {
    return this.localService.getCurrentUser();
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  // Legacy compatibility methods
  registerUser(userData) { return this.register(userData); }
  loginUser(loginData) { return this.login(loginData); }
  addFavoriteEvent(eventId, eventData) { return this.addFavorite(eventData); }
  removeFavoriteEvent(eventId) { return this.removeFavorite(eventId); }
  getFavoriteEvents() { return this.getFavorites(); }
  addTicketPurchase(ticketData) { return this.addTicket(ticketData); }
  getTicketHistory() { return this.getTickets(); }
}

export default new UserService();