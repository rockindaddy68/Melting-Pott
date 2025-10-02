// API Service für Backend-Kommunikation
class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
    this.token = localStorage.getItem('ruhrpott_token');
  }

  // Helper method for making requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    const response = await this.makeRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (response.success && response.token) {
      this.token = response.token;
      localStorage.setItem('ruhrpott_token', response.token);
    }

    return response;
  }

  async login(loginData) {
    const response = await this.makeRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(loginData)
    });

    if (response.success && response.token) {
      this.token = response.token;
      localStorage.setItem('ruhrpott_token', response.token);
    }

    return response;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('ruhrpott_token');
    return { success: true, message: 'Erfolgreich abgemeldet' };
  }

  // User methods
  async getUserProfile() {
    return await this.makeRequest('/users/profile');
  }

  async updateProfile(profileData) {
    return await this.makeRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Favorites methods
  async addFavorite(eventData) {
    return await this.makeRequest('/users/favorites', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  async getFavorites() {
    return await this.makeRequest('/users/favorites');
  }

  async removeFavorite(eventId) {
    return await this.makeRequest(`/users/favorites/${eventId}`, {
      method: 'DELETE'
    });
  }

  // Tickets methods
  async addTicket(ticketData) {
    return await this.makeRequest('/users/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData)
    });
  }

  async getTickets() {
    return await this.makeRequest('/users/tickets');
  }

  // Newsletter methods
  async subscribeNewsletter(email, name = '') {
    return await this.makeRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name })
    });
  }

  // Stats methods (Admin)
  async getStats() {
    return await this.makeRequest('/users/stats');
  }

  // Check if user is logged in
  isAuthenticated() {
    return !!this.token;
  }

  // Get current user from token
  getCurrentUser() {
    if (!this.token) return null;

    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return {
        userId: payload.userId,
        email: payload.email
      };
    } catch (error) {
      console.error('Token parsing error:', error);
      return null;
    }
  }
}

export default new ApiService();