// Migration Helper - Gradual transition to refactored architecture
import UserServiceRefactored from './UserServiceRefactored.js';
import userServiceOld from './userService.js';
import config from '../config/config.js';

class MigrationService {
  constructor() {
    this.useRefactored = config.features.backendSync;
    this.userService = this.useRefactored ? UserServiceRefactored : userServiceOld;
    
    console.log(`🔄 Migration Service: Using ${this.useRefactored ? 'Refactored' : 'Legacy'} UserService`);
  }

  // Proxy methods to ensure backward compatibility
  registerUser(userData) {
    return this.userService.registerUser(userData);
  }

  loginUser(loginData) {
    return this.userService.loginUser(loginData);
  }

  logout() {
    return this.userService.logout();
  }

  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  isAuthenticated() {
    return this.userService.isAuthenticated ? 
      this.userService.isAuthenticated() : 
      !!this.userService.getCurrentUser();
  }

  addFavoriteEvent(eventId, eventData) {
    return this.userService.addFavoriteEvent ? 
      this.userService.addFavoriteEvent(eventId, eventData) :
      this.userService.addFavorite(eventData);
  }

  removeFavoriteEvent(eventId) {
    return this.userService.removeFavoriteEvent ? 
      this.userService.removeFavoriteEvent(eventId) :
      this.userService.removeFavorite(eventId);
  }

  getFavoriteEvents() {
    return this.userService.getFavoriteEvents ? 
      this.userService.getFavoriteEvents() :
      this.userService.getFavorites();
  }

  addTicketPurchase(ticketData) {
    return this.userService.addTicketPurchase ? 
      this.userService.addTicketPurchase(ticketData) :
      this.userService.addTicket(ticketData);
  }

  getTicketHistory() {
    return this.userService.getTicketHistory ? 
      this.userService.getTicketHistory() :
      this.userService.getTickets();
  }

  updateProfile(userId, profileData) {
    return this.userService.updateProfile(profileData || userId);
  }

  getUserStats() {
    if (this.userService.getUserStats) {
      return this.userService.getUserStats();
    }
    
    // Fallback implementation
    const user = this.getCurrentUser();
    if (!user) return null;
    
    return {
      memberSince: user.createdAt,
      totalFavorites: 0,
      totalTickets: 0,
      lastLogin: user.lastLogin
    };
  }

  // Migration utility methods
  async migrateToRefactored() {
    if (this.useRefactored) return true;

    try {
      console.log('🔄 Starting migration to refactored service...');
      
      // Switch to refactored service
      this.userService = UserServiceRefactored;
      this.useRefactored = true;
      
      // Update config
      config.features.backendSync = true;
      
      console.log('✅ Migration to refactored service completed');
      return true;
    } catch (error) {
      console.error('❌ Migration failed:', error);
      return false;
    }
  }

  async rollbackToLegacy() {
    if (!this.useRefactored) return true;

    try {
      console.log('🔄 Rolling back to legacy service...');
      
      // Switch back to legacy service
      this.userService = userServiceOld;
      this.useRefactored = false;
      
      // Update config
      config.features.backendSync = false;
      
      console.log('✅ Rollback to legacy service completed');
      return true;
    } catch (error) {
      console.error('❌ Rollback failed:', error);
      return false;
    }
  }

  // Health check
  async checkHealth() {
    try {
      if (this.userService.checkHealth) {
        return await this.userService.checkHealth();
      }
      return true;
    } catch {
      return false;
    }
  }

  // Get service info
  getServiceInfo() {
    return {
      type: this.useRefactored ? 'refactored' : 'legacy',
      isHealthy: this.checkHealth(),
      features: {
        backendSync: this.useRefactored,
        caching: this.useRefactored,
        retryLogic: this.useRefactored,
        errorHandling: this.useRefactored
      }
    };
  }
}

export default new MigrationService();