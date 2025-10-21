import React, { useState, useEffect } from 'react';
import { formatGermanDate } from '../utils/eventsHelpers';
import eventService from '../services/adminEventService';
import MemberDatabaseAdmin from './MemberDatabaseAdmin';
import EventbriteAdmin from './EventbriteAdmin';
import MessageAdmin from './MessageAdmin';

const AdminDashboard = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    city: '',
    category: '',
    price: '',
    description: ''
  });

  // Einfache Authentifizierung (in Produktion sollte das sicherer sein)
  const handleLogin = () => {
    if (password === 'ruhrpott2025') {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Falsches Passwort!');
    }
  };

  // Daten laden
  const loadData = () => {
    const loadedEvents = eventService.getEvents();
    const stats = eventService.getStatistics();
    setEvents(loadedEvents);
    setStatistics(stats);
  };

  // Neues Event hinzufügen
  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.city) {
      alert('Bitte alle Pflichtfelder ausfüllen!');
      return;
    }

    const addedEvent = eventService.addEvent(newEvent);
    if (addedEvent) {
      loadData(); // Daten neu laden
      setNewEvent({
        name: '',
        date: '',
        time: '',
        location: '',
        city: '',
        category: '',
        price: '',
        description: ''
      });
      alert('Event erfolgreich hinzugefügt!');
    } else {
      alert('Fehler beim Hinzufügen des Events!');
    }
  };

  // Event löschen
  const handleDeleteEvent = (id) => {
    if (window.confirm('Event wirklich löschen?')) {
      if (eventService.deleteEvent(id)) {
        loadData(); // Daten neu laden
      } else {
        alert('Fehler beim Löschen des Events!');
      }
    }
  };

  // Event exportieren (JSON)
  const exportEvents = () => {
    const dataStr = eventService.exportEvents();
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ruhrpott_events_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-black p-8 rounded-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold text-orange-400 mb-6 text-center">
            🔐 Admin Login
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Passwort eingeben..."
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full text-orange-400 py-3 rounded-lg font-semibold border border-orange-400/40 hover:border-orange-400/60 transition-all"
            >
              Anmelden
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-400">
              🎯 Ruhrpott Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Zurück zur App
              </button>
              <span className="text-gray-400">Admin Panel</span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Übersicht', icon: '📊' },
              { id: 'members', label: 'Member Database', icon: '👥' },
              { id: 'messages', label: 'Kontaktnachrichten', icon: '📧' },
              { id: 'events', label: 'Events verwalten', icon: '🎉' },
              { id: 'eventbrite', label: 'Eventbrite Sync', icon: '🔄' },
              { id: 'export', label: 'Export/Import', icon: '💾' },
              { id: 'settings', label: 'Einstellungen', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-400 text-orange-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistiken */}
            {statistics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-black p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-2">📅 Gesamt Events</h3>
                  <p className="text-3xl font-bold text-orange-400">{statistics.totalEvents}</p>
                </div>
                <div className="bg-black p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-2">🔜 Kommende Events</h3>
                  <p className="text-3xl font-bold text-green-400">{statistics.upcomingEvents}</p>
                </div>
                <div className="bg-black p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-2">🏙️ Städte</h3>
                  <p className="text-3xl font-bold text-blue-400">{statistics.cities}</p>
                </div>
                <div className="bg-black p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-2">🏷️ Kategorien</h3>
                  <p className="text-3xl font-bold text-purple-400">{statistics.categories}</p>
                </div>
              </div>
            )}
            
            {/* Schnellzugriff */}
            <div className="bg-black p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6">⚡ Schnellzugriff</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('events')}
                  className="text-orange-400 p-4 rounded-lg border border-orange-400/40 hover:border-orange-400/60 transition-all text-left"
                >
                  <div className="text-2xl mb-2">🆕</div>
                  <div className="font-semibold">Neues Event</div>
                  <div className="text-sm opacity-80">Event hinzufügen</div>
                </button>
                <button
                  onClick={exportEvents}
                  className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">📥</div>
                  <div className="font-semibold">Export</div>
                  <div className="text-sm opacity-80">Daten exportieren</div>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-semibold">Einstellungen</div>
                  <div className="text-sm opacity-80">System konfigurieren</div>
                </button>
              </div>
            </div>

            {/* Letzte Events */}
            <div className="bg-black p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6">🕐 Letzte Events</h2>
              <div className="space-y-3">
                {events.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">{event.name}</h4>
                      <p className="text-gray-400 text-sm">{formatGermanDate(event.date)} • {event.city}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.category === 'Music' ? 'bg-purple-600' :
                      event.category === 'Theater' ? 'bg-red-600' :
                      event.category === 'Arts' ? 'bg-blue-600' :
                      'bg-gray-600'
                    } text-white`}>
                      {event.category}
                    </span>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="text-center text-gray-400 py-4">
                    Noch keine Events vorhanden
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <MemberDatabaseAdmin />
        )}

        {activeTab === 'messages' && (
          <MessageAdmin />
        )}

        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Event hinzufügen */}
            <div className="bg-black p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6">🆕 Neues Event hinzufügen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Event Name *"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <select
                  value={newEvent.city}
                  onChange={(e) => setNewEvent({...newEvent, city: e.target.value})}
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Stadt wählen *</option>
                  {['Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen', 'Oberhausen', 'Hagen', 'Bottrop', 'Recklinghausen', 'Herne', 'Mülheim an der Ruhr', 'Witten'].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Kategorie wählen</option>
                  <option value="Music">Musik</option>
                  <option value="Theater">Theater</option>
                  <option value="Arts">Kunst</option>
                  <option value="Sports">Sport</option>
                  <option value="Festival">Festival</option>
                  <option value="Comedy">Comedy</option>
                </select>
                <input
                  type="text"
                  placeholder="Preis (z.B. 25€ oder Kostenlos)"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <textarea
                  placeholder="Beschreibung"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="md:col-span-2 px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 h-24 resize-none"
                />
              </div>
              <button
                onClick={handleAddEvent}
                className="text-orange-400 px-6 py-3 rounded-lg font-semibold border border-orange-400/40 hover:border-orange-400/60 transition-all"
              >
                Event hinzufügen
              </button>
            </div>

            {/* Event Liste */}
            <div className="bg-black p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">📅 Alle Events ({events.length})</h2>
                <button
                  onClick={exportEvents}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📥 Export JSON
                </button>
              </div>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                        <div className="text-gray-400 text-sm mt-1 space-y-1">
                          <p>📅 {formatGermanDate(event.date)} um {event.time}</p>
                          <p>📍 {event.location}, {event.city}</p>
                          <p>🏷️ {event.category} • 💰 {event.price}</p>
                          {event.description && <p className="text-gray-300 mt-2">{event.description}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors ml-4"
                      >
                        🗑️ Löschen
                      </button>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    Noch keine Events vorhanden. Fügen Sie das erste Event hinzu!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eventbrite' && (
          <EventbriteAdmin />
        )}

        {activeTab === 'export' && (
          <div className="bg-black p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">📊 Export & Import</h2>
            <div className="space-y-4">
              <button
                onClick={exportEvents}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors block w-full md:w-auto"
              >
                📥 Events als JSON exportieren
              </button>
              <div className="text-gray-400 text-sm">
                <p>Exportiert alle Events als JSON-Datei für Backup oder Transfer.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-black p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">⚙️ Einstellungen</h2>
            <div className="text-gray-400">
              <p>Hier können später weitere Einstellungen verwaltet werden:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Sprachen verwalten</li>
                <li>Design-Einstellungen</li>
                <li>API-Konfiguration</li>
                <li>Benutzer-Berechtigungen</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
