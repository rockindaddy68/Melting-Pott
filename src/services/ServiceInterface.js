// Service Interface - Abstraction für Backend/Local Storage
export class ServiceInterface {
  constructor() {
    this.isOnline = false;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  // Health Check
  async checkHealth() {
    throw new Error('checkHealth must be implemented');
  }

  // Auto-retry mit Exponential Backoff
  async withRetry(operation, maxAttempts = this.retryAttempts) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxAttempts) {
          throw error;
        }
        
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }

  // Cache Management
  setCache(key, data, ttl = 300000) { // 5 minutes default
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
  }

  getCache(key) {
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;

      const { data, timestamp, ttl } = JSON.parse(cached);
      
      if (Date.now() - timestamp > ttl) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  clearCache(pattern = '') {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('cache_') && key.includes(pattern)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}

// Hybrid Service - Auto-switching between Backend and Local
export class HybridService extends ServiceInterface {
  constructor(backendService, localService) {
    super();
    this.backendService = backendService;
    this.localService = localService;
    this.preferBackend = true;
    
    this.checkBackendHealth();
  }

  async checkBackendHealth() {
    try {
      await this.backendService.checkHealth();
      this.isOnline = true;
    } catch {
      this.isOnline = false;
    }
  }

  // Auto-delegating method
  async executeOperation(operation, ...args) {
    if (this.preferBackend && this.isOnline) {
      try {
        return await this.backendService[operation](...args);
      } catch (error) {
        console.warn(`Backend ${operation} failed, falling back to local:`, error.message);
        this.isOnline = false;
      }
    }

    // Fallback to local service
    return await this.localService[operation](...args);
  }

  // Sync operations between backend and local
  async syncData() {
    if (!this.isOnline) return false;

    try {
      // Get local data
      const localData = await this.localService.exportData();
      
      // Send to backend
      await this.backendService.importData(localData);
      
      console.log('✅ Data synced to backend');
      return true;
    } catch (error) {
      console.error('❌ Sync failed:', error);
      return false;
    }
  }
}