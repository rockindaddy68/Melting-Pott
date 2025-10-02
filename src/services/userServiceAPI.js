// User Management Service - Backend Connected Version
// Handles registration, login, profile management with API

import apiService from './apiService.js';

class UserServiceAPI {
  constructor() {
    this.sessionKey = 'ruhrpott_session';
  }

  // User Registration
  async registerUser(userData) {
    try {
      const { name, email, password, city } = userData;
      
      if (!name || !email || !password || !city) {
        throw new Error('Alle Felder sind erforderlich');
      }

      // Split name into firstName and lastName
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      const registrationData = {
        username: email, // Use email as username
        email,
        password,
        firstName,
        lastName,
        city
      };

      const response = await apiService.register(registrationData);

      if (response.success) {
        // Create local session
        this.createSession(response.user);
        
        return {
          success: true,
          message: response.message,
          user: this.sanitizeUser(response.user)
        };
      } else {
        throw new Error(response.message);
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // User Login
  async loginUser(loginData) {
    try {
      const { email, password } = loginData;
      
      if (!email || !password) {
        throw new Error('E-Mail und Passwort sind erforderlich');
      }

      const response = await apiService.login({ email, password });

      if (response.success) {
        // Create local session
        this.createSession(response.user);
        
        return {
          success: true,
          message: response.message,
          user: this.sanitizeUser(response.user)
        };
      } else {
        throw new Error(response.message);
      }

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Logout
  logout() {
    localStorage.removeItem(this.sessionKey);
    return apiService.logout();
  }

  // Get current session
  getCurrentUser() {
    const session = localStorage.getItem(this.sessionKey);
    if (session) {
      try {
        return JSON.parse(session);
      } catch (error) {
        console.error('Session parsing error:', error);
        this.logout();
        return null;
      }
    }
    return null;
  }

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      const response = await apiService.updateProfile(profileData);
      
      if (response.success) {
        // Update local session
        this.createSession(response.user);
        
        return {
          success: true,
          message: response.message,
          user: this.sanitizeUser(response.user)
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Favorite Events Management
  async addFavoriteEvent(eventId, eventData) {
    try {
      const response = await apiService.addFavorite(eventData);
      
      if (response.success) {
        return {
          success: true,
          message: response.message,
          favorite: response.favorite
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async removeFavoriteEvent(eventId) {
    try {
      const response = await apiService.removeFavorite(eventId);
      
      if (response.success) {
        return {
          success: true,
          message: response.message
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getFavoriteEvents(userId = null) {
    try {
      const response = await apiService.getFavorites();
      
      if (response.success) {
        return response.favorites || [];
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Get favorites error:', error);
      return [];
    }
  }

  // Ticket History Management
  async addTicketPurchase(ticketData) {
    try {
      const response = await apiService.addTicket(ticketData);
      
      if (response.success) {
        return {
          success: true,
          message: response.message,
          ticket: response.ticket
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getTicketHistory(userId = null) {
    try {
      const response = await apiService.getTickets();
      
      if (response.success) {
        return response.tickets || [];
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Get tickets error:', error);
      return [];
    }
  }

  // Statistics & Analytics
  async getUserStats() {
    try {
      const response = await apiService.getStats();
      
      if (response.success) {
        return response.stats;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Get stats error:', error);
      return {
        totalFavorites: 0,
        totalTickets: 0,
        memberSince: new Date().toISOString(),
        favoriteGenres: []
      };
    }
  }

  // Helper Methods
  createSession(user) {
    const sessionData = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
  }

  sanitizeUser(user) {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  // Newsletter subscription
  async subscribeNewsletter(email, name) {
    try {
      const response = await apiService.subscribeNewsletter(email, name);
      
      if (response.success) {
        return {
          success: true,
          message: response.message
        };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if connected to backend
  isBackendConnected() {
    return apiService.isAuthenticated();
  }
}

export default new UserServiceAPI();