// === KI CHAT ANALYTICS ADMIN ===
// Admin-Panel für KI-Chatbot Statistiken und Management

import React, { useState, useEffect } from 'react';

const ChatAnalyticsAdmin = () => {
  const [stats, setStats] = useState({
    totalChats: 127,
    activeUsers: 23,
    topQuestions: [
      { question: "Events heute", count: 45 },
      { question: "Zollverein Führung", count: 32 },
      { question: "Bochum Total Festival", count: 28 },
      { question: "Anfahrt Ruhrgebiet", count: 22 },
      { question: "Currywurst Restaurants", count: 18 }
    ],
    responseTime: 1.2,
    satisfactionRate: 89,
    popularCities: [
      { city: "Essen", queries: 78 },
      { city: "Bochum", queries: 56 },
      { city: "Dortmund", queries: 49 },
      { city: "Oberhausen", queries: 34 }
    ]
  });

  const [aiSettings, setAiSettings] = useState({
    responseDelay: 1500,
    maxSuggestions: 3,
    funFactsEnabled: true,
    smartEventSearch: true,
    multiLanguageSupport: false
  });

  const handleSettingChange = (setting, value) => {
    setAiSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    console.log('🤖 KI-Einstellung geändert:', setting, '=', value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-orange-400 mb-2">🤖 KI Chat-Assistent Analytics</h2>
        <p className="text-gray-400">Statistiken und Einstellungen für den Ruhrpott Event-Chatbot</p>
      </div>

      {/* Statistiken Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-black p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-2">💬 Gespräche</h3>
          <p className="text-3xl font-bold text-blue-400">{stats.totalChats}</p>
          <p className="text-sm text-gray-400 mt-1">Gesamt heute</p>
        </div>
        
        <div className="bg-black p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-2">👥 Aktive User</h3>
          <p className="text-3xl font-bold text-green-400">{stats.activeUsers}</p>
          <p className="text-sm text-gray-400 mt-1">Gerade online</p>
        </div>
        
        <div className="bg-black p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-2">⚡ Antwortzeit</h3>
          <p className="text-3xl font-bold text-orange-400">{stats.responseTime}s</p>
          <p className="text-sm text-gray-400 mt-1">Durchschnitt</p>
        </div>
        
        <div className="bg-black p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-2">😊 Zufriedenheit</h3>
          <p className="text-3xl font-bold text-purple-400">{stats.satisfactionRate}%</p>
          <p className="text-sm text-gray-400 mt-1">User-Bewertung</p>
        </div>
      </div>

      {/* Top Fragen */}
      <div className="bg-black p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">🔥 Häufigste Fragen</h3>
        <div className="space-y-3">
          {stats.topQuestions.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
              <span className="text-gray-300">#{index + 1} {item.question}</span>
              <span className="text-orange-400 font-semibold">{item.count}x</span>
            </div>
          ))}
        </div>
      </div>

      {/* Beliebte Städte */}
      <div className="bg-black p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">🏙️ Beliebte Städte</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.popularCities.map((city, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{city.city}</span>
                <span className="text-orange-400">{city.queries} Anfragen</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                <div 
                  className="bg-orange-400 h-2 rounded-full transition-all"
                  style={{ width: `${(city.queries / stats.popularCities[0].queries) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KI-Einstellungen */}
      <div className="bg-black p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">⚙️ KI-Einstellungen</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Antwort-Verzögerung (ms)</label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={aiSettings.responseDelay}
              onChange={(e) => handleSettingChange('responseDelay', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-400 mt-1">{aiSettings.responseDelay}ms</div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Max. Vorschläge pro Antwort</label>
            <select
              value={aiSettings.maxSuggestions}
              onChange={(e) => handleSettingChange('maxSuggestions', parseInt(e.target.value))}
              className="w-full bg-gray-800 text-white p-2 rounded"
            >
              <option value={1}>1 Vorschlag</option>
              <option value={2}>2 Vorschläge</option>
              <option value={3}>3 Vorschläge</option>
              <option value={4}>4 Vorschläge</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="funFacts"
              checked={aiSettings.funFactsEnabled}
              onChange={(e) => handleSettingChange('funFactsEnabled', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="funFacts" className="text-gray-300">Fun Facts aktivieren</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="smartSearch"
              checked={aiSettings.smartEventSearch}
              onChange={(e) => handleSettingChange('smartEventSearch', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="smartSearch" className="text-gray-300">Intelligente Event-Suche</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="multiLang"
              checked={aiSettings.multiLanguageSupport}
              onChange={(e) => handleSettingChange('multiLanguageSupport', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="multiLang" className="text-gray-300">Mehrsprachiger Support (Beta)</label>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            💾 Einstellungen speichern
          </button>
        </div>
      </div>

      {/* KI-Status */}
      <div className="bg-black p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">📊 System-Status</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Event-Datenbank</span>
            <span className="text-green-400">✅ Verbunden (5 Events)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Review-System</span>
            <span className="text-green-400">✅ Aktiv (8 Reviews)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">KI-Engine</span>
            <span className="text-green-400">✅ RuhrpottAI v1.0 aktiv</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Chat-Interface</span>
            <span className="text-green-400">✅ Theme-Integration aktiv</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnalyticsAdmin;