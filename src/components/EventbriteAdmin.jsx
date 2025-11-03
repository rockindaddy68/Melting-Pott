// Eventbrite Integration Admin Panel Component
import React, { useState, useEffect } from 'react';
import eventbriteAPI from '../services/eventbriteAPI.js';
import eventSyncService from '../services/eventSyncService.js';
import eventbriteAutoSync from '../services/eventbriteAutoSync.js';

const EventbriteAdmin = () => {
  const [config, setConfig] = useState({
    apiToken: '',
    organizationId: '',
    syncEnabled: false,
    syncFrequency: 30
  });
  
  const [status, setStatus] = useState({
    connected: false,
    syncing: false,
    lastSync: null
  });
  
  // Auto-Sync Status
  const [autoSyncStatus, setAutoSyncStatus] = useState({
    isRunning: false,
    config: {},
    stats: {},
    lastSync: null,
    nextSync: null
  });
  
  const [syncStats, setSyncStats] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadConfig();
    loadStatus();
    loadAutoSyncStatus();
    
    // Event Listener für Sync Updates
    const handleSyncEvent = (eventType, data) => {
      addLog(`${eventType}: ${JSON.stringify(data)}`);
      
      if (eventType === 'sync_completed') {
        setSyncStats(data.stats);
        setStatus(prev => ({
          ...prev,
          syncing: false,
          lastSync: data.stats.lastSyncTime
        }));
      } else if (eventType === 'sync_started_single') {
        setStatus(prev => ({ ...prev, syncing: true }));
      }
    };
    
    // Auto-Sync Event Listener
    const handleAutoSyncEvent = (eventType, data) => {
      addLog(`Auto-Sync ${eventType}: ${JSON.stringify(data)}`);
      loadAutoSyncStatus();
    };
    
    eventSyncService.addEventListener(handleSyncEvent);
    eventbriteAutoSync.addEventListener(handleAutoSyncEvent);
    
    return () => {
      eventSyncService.removeEventListener(handleSyncEvent);
      eventbriteAutoSync.removeEventListener(handleAutoSyncEvent);
    };
  }, []);

  const loadConfig = () => {
    const savedToken = localStorage.getItem('eventbrite_api_token') || '';
    const savedOrgId = localStorage.getItem('eventbrite_org_id') || '';
    const syncConfig = eventSyncService.getStatus();
    
    setConfig({
      apiToken: savedToken,
      organizationId: savedOrgId,
      syncEnabled: syncConfig.isRunning,
      syncFrequency: Math.round(syncConfig.frequency / 60000)
    });
  };

  const loadStatus = () => {
    const syncStatus = eventSyncService.getStatus();
    setSyncStats(syncStatus.stats);
    
    setStatus({
      connected: !!(localStorage.getItem('eventbrite_api_token')),
      syncing: syncStatus.isRunning,
      lastSync: syncStatus.lastSync
    });
  };

  const loadAutoSyncStatus = () => {
    const autoStatus = eventbriteAutoSync.getStatus();
    setAutoSyncStatus(autoStatus);
  };

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-49), `[${timestamp}] ${message}`]);
  };

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveConfiguration = async () => {
    try {
      // API Konfiguration speichern
      eventbriteAPI.setApiToken(config.apiToken);
      eventbriteAPI.setOrganizationId(config.organizationId);
      
      // Sync Frequenz setzen
      eventSyncService.setSyncFrequency(config.syncFrequency);
      
      addLog('Konfiguration gespeichert');
      
      // Verbindung testen
      await testConnection();
      
    } catch (error) {
      addLog(`Fehler beim Speichern: ${error.message}`);
    }
  };

  const testConnection = async () => {
    setTestResults(null);
    addLog('Teste Eventbrite Verbindung...');
    
    try {
      const result = await eventbriteAPI.testConnection();
      setTestResults(result);
      
      if (result.success) {
        addLog('✅ Verbindung erfolgreich');
        setStatus(prev => ({ ...prev, connected: true }));
      } else {
        addLog(`❌ Verbindung fehlgeschlagen: ${result.message}`);
        setStatus(prev => ({ ...prev, connected: false }));
      }
    } catch (error) {
      const errorResult = {
        success: false,
        message: error.message
      };
      setTestResults(errorResult);
      addLog(`❌ Verbindungstest fehlgeschlagen: ${error.message}`);
    }
  };

  const toggleAutoSync = () => {
    if (config.syncEnabled) {
      eventSyncService.stopAutoSync();
      addLog('Auto-Sync gestoppt');
      setConfig(prev => ({ ...prev, syncEnabled: false }));
    } else {
      eventSyncService.startAutoSync(config.syncFrequency * 60 * 1000);
      addLog(`Auto-Sync gestartet (${config.syncFrequency} Minuten)`);
      setConfig(prev => ({ ...prev, syncEnabled: true }));
    }
  };

  // Neue Auto-Sync Funktionen
  const startAutoSync = async () => {
    try {
      const result = await eventbriteAutoSync.start();
      addLog(`🚀 ${result.message}`);
      loadAutoSyncStatus();
    } catch (error) {
      addLog(`❌ Auto-Sync Start fehlgeschlagen: ${error.message}`);
    }
  };

  const stopAutoSync = async () => {
    try {
      const result = await eventbriteAutoSync.stop();
      addLog(`⏹️ ${result.message}`);
      loadAutoSyncStatus();
    } catch (error) {
      addLog(`❌ Auto-Sync Stop fehlgeschlagen: ${error.message}`);
    }
  };

  const triggerManualSync = async () => {
    try {
      addLog('🔄 Starte manuellen Sync...');
      const result = await eventbriteAutoSync.triggerManualSync();
      addLog(`✅ ${result.message}`);
      loadAutoSyncStatus();
    } catch (error) {
      addLog(`❌ Manueller Sync fehlgeschlagen: ${error.message}`);
    }
  };

  const updateAutoSyncConfig = (newConfig) => {
    eventbriteAutoSync.updateConfig(newConfig);
    addLog('Auto-Sync Konfiguration aktualisiert');
    loadAutoSyncStatus();
  };

  const performManualSync = async () => {
    if (status.syncing) return;
    
    addLog('Starte manuelle Synchronisation...');
    
    try {
      await eventSyncService.performSync(true);
      addLog('✅ Manuelle Synchronisation abgeschlossen');
    } catch (error) {
      addLog(`❌ Synchronisation fehlgeschlagen: ${error.message}`);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const resetStats = () => {
    eventSyncService.resetStats();
    setSyncStats(eventSyncService.getStatus().stats);
    addLog('Statistiken zurückgesetzt');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Eventbrite Integration</h2>
        <p className="text-gray-600 mt-2">
          Automatische Synchronisation von Events aus der Eventbrite API
        </p>
      </div>

      {/* Konfiguration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Konfiguration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eventbrite API Token
              </label>
              <input
                type="password"
                value={config.apiToken}
                onChange={(e) => handleConfigChange('apiToken', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ihr Eventbrite API Token"
              />
              <p className="text-xs text-gray-500 mt-1">
                Erhalten Sie einen Token von: eventbrite.com/platform/api-keys
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organisation ID (Optional)
              </label>
              <input
                type="text"
                value={config.organizationId}
                onChange={(e) => handleConfigChange('organizationId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ihre Organisation ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leer lassen für allgemeine Ruhrgebiet-Suche
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sync-Frequenz (Minuten)
              </label>
              <select
                value={config.syncFrequency}
                onChange={(e) => handleConfigChange('syncFrequency', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value={15}>15 Minuten</option>
                <option value={30}>30 Minuten</option>
                <option value={60}>1 Stunde</option>
                <option value={120}>2 Stunden</option>
                <option value={240}>4 Stunden</option>
                <option value={720}>12 Stunden</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={saveConfiguration}
                className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Konfiguration Speichern
              </button>
              
              <button
                onClick={testConnection}
                className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Verbindung Testen
              </button>
            </div>
          </div>
        </div>

        {/* Status & Steuerung */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Steuerung</h3>
          
          {/* Verbindungsstatus */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">API Verbindung</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status.connected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {status.connected ? 'Verbunden' : 'Nicht verbunden'}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Legacy Auto-Sync</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                config.syncEnabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {config.syncEnabled ? 'Aktiv' : 'Inaktiv'}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Eventbrite Auto-Sync</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                autoSyncStatus.isRunning 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {autoSyncStatus.isRunning ? 'Läuft' : 'Gestoppt'}
              </span>
            </div>
            
            {autoSyncStatus.lastSync && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Letzter Auto-Sync</span>
                <span className="text-xs text-gray-600">
                  {new Date(autoSyncStatus.lastSync).toLocaleString('de-DE')}
                </span>
              </div>
            )}

            {autoSyncStatus.nextSync && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Nächster Auto-Sync</span>
                <span className="text-xs text-gray-600">
                  {new Date(autoSyncStatus.nextSync).toLocaleString('de-DE')}
                </span>
              </div>
            )}
            
            {status.lastSync && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Letzter Legacy Sync</span>
                <span className="text-xs text-gray-600">
                  {new Date(status.lastSync).toLocaleString('de-DE')}
                </span>
              </div>
            )}
          </div>

          {/* Auto-Sync Konfiguration */}
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h4 className="text-md font-semibold text-orange-400 mb-3">🚀 Eventbrite Auto-Sync</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Auto-Sync aktivieren</label>
                <button
                  onClick={() => updateAutoSyncConfig({ 
                    enabled: !autoSyncStatus.config.enabled 
                  })}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    autoSyncStatus.config.enabled
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {autoSyncStatus.config.enabled ? 'EIN' : 'AUS'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Sync-Intervall</label>
                <select
                  value={autoSyncStatus.config.frequency || 15}
                  onChange={(e) => updateAutoSyncConfig({ 
                    frequency: parseInt(e.target.value) 
                  })}
                  className="px-2 py-1 text-xs border border-blue-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 min</option>
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={60}>1 Std</option>
                  <option value={120}>2 Std</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Auto-Start</label>
                <button
                  onClick={() => updateAutoSyncConfig({ 
                    autoStart: !autoSyncStatus.config.autoStart 
                  })}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    autoSyncStatus.config.autoStart
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {autoSyncStatus.config.autoStart ? 'EIN' : 'AUS'}
                </button>
              </div>
            </div>

            {/* Auto-Sync Statistiken */}
            {autoSyncStatus.stats && Object.keys(autoSyncStatus.stats).length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-600">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-orange-400">Gesamt:</span>
                    <span className="ml-1 font-medium">{autoSyncStatus.stats.totalSyncs || 0}</span>
                  </div>
                  <div>
                    <span className="text-green-600">Erfolgreich:</span>
                    <span className="ml-1 font-medium">{autoSyncStatus.stats.successfulSyncs || 0}</span>
                  </div>
                  <div>
                    <span className="text-red-600">Fehler:</span>
                    <span className="ml-1 font-medium">{autoSyncStatus.stats.failedSyncs || 0}</span>
                  </div>
                  <div>
                    <span className="text-orange-400">Events:</span>
                    <span className="ml-1 font-medium">{autoSyncStatus.stats.eventsAdded || 0} neu</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Synchronisation Steuerung */}
          <div className="space-y-3">
            {/* Legacy Auto-Sync */}
            <button
              onClick={toggleAutoSync}
              disabled={!status.connected}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                config.syncEnabled
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              } ${!status.connected ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {config.syncEnabled ? 'Legacy Auto-Sync Stoppen' : 'Legacy Auto-Sync Starten'}
            </button>

            {/* Eventbrite Auto-Sync Controls */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={startAutoSync}
                disabled={autoSyncStatus.isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoSyncStatus.isRunning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                🚀 Auto-Sync Start
              </button>

              <button
                onClick={stopAutoSync}
                disabled={!autoSyncStatus.isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !autoSyncStatus.isRunning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                ⏹️ Auto-Sync Stop
              </button>
            </div>

            {/* Manual Sync */}
            <button
              onClick={triggerManualSync}
              disabled={autoSyncStatus.isRunning}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                autoSyncStatus.isRunning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              🔄 Manueller Sync
            </button>
            
            <button
              onClick={performManualSync}
              disabled={!status.connected || status.syncing}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                status.syncing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white ${!status.connected ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status.syncing ? 'Synchronisiere...' : 'Manuelle Synchronisation'}
            </button>
          </div>
        </div>
      </div>

      {/* Test Ergebnisse */}
      {testResults && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verbindungstest</h3>
          <div className={`p-4 rounded-lg ${
            testResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full ${
                testResults.success ? 'bg-green-500' : 'bg-red-500'
              } mt-0.5 mr-3`}>
                <span className="block w-3 h-3 bg-white rounded-full mx-auto mt-1"></span>
              </div>
              <div>
                <p className={`font-medium ${
                  testResults.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResults.message}
                </p>
                {testResults.data && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Benutzer: {testResults.data.name}</p>
                    <p>E-Mail: {testResults.data.email}</p>
                  </div>
                )}
                {testResults.error && (
                  <p className="mt-2 text-sm text-red-600">
                    Fehler: {testResults.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistiken */}
      {syncStats && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Synchronisation Statistiken</h3>
            <button
              onClick={resetStats}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Zurücksetzen
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{syncStats.totalSyncs}</div>
              <div className="text-sm text-gray-600">Gesamt Syncs</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{syncStats.successfulSyncs}</div>
              <div className="text-sm text-gray-600">Erfolgreich</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{syncStats.eventsAdded}</div>
              <div className="text-sm text-gray-600">Events hinzugefügt</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{syncStats.eventsUpdated}</div>
              <div className="text-sm text-gray-600">Events aktualisiert</div>
            </div>
          </div>
        </div>
      )}

      {/* Live Logs */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Logs</h3>
          <button
            onClick={clearLogs}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Logs löschen
          </button>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              Keine Logs verfügbar
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-green-400 mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hilfe */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Hilfe</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• API Token erhalten Sie kostenlos bei Eventbrite unter "Account Settings" → "API Keys"</li>
          <li>• Die Organisation ID ist optional - ohne diese werden alle öffentlichen Events im Ruhrgebiet gesucht</li>
          <li>• Auto-Sync läuft im Browser - bei geschlossenem Tab wird nicht synchronisiert</li>
          <li>• Webhooks für Echtzeit-Updates erfordern einen eigenen Server</li>
        </ul>
      </div>
    </div>
  );
};

export default EventbriteAdmin;
