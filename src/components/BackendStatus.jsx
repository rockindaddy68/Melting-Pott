import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [backendInfo, setBackendInfo] = useState(null);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      
      if (response.ok) {
        const data = await response.json();
        setBackendInfo(data);
        setStatus('connected');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
      setStatus('disconnected');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'disconnected': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return '🟢';
      case 'disconnected': return '🟡';
      case 'error': return '🔴';
      default: return '⚪';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Backend verbunden';
      case 'disconnected': return 'Backend nicht verfügbar (Lokaler Modus)';
      case 'error': return 'Backend Fehler';
      default: return 'Prüfe Backend...';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-600 rounded-lg p-3 min-w-[250px] shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getStatusIcon()}</span>
        <div>
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>
          {backendInfo && (
            <div className="text-xs text-gray-400 mt-1">
              API v{backendInfo.version} - {backendInfo.status}
            </div>
          )}
        </div>
        <button
          onClick={checkBackendStatus}
          className="ml-2 text-gray-400 hover:text-orange-400 transition-colors"
          title="Status aktualisieren"
        >
          🔄
        </button>
      </div>
    </div>
  );
};

export default BackendStatus;