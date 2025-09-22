import React, { useState, useEffect } from 'react'
import userService from '../services/userService'
import { formatGermanDate } from '../utils/eventsHelpers'

const MemberDashboard = ({ onClose }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [userStats, setUserStats] = useState(null)
  const [favoriteEvents, setFavoriteEvents] = useState([])
  const [ticketHistory, setTicketHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    setLoading(true)
    try {
      const user = userService.getCurrentUser()
      if (!user) {
        onClose()
        return
      }

      setCurrentUser(user)
      setUserStats(userService.getUserStats())
      setFavoriteEvents(userService.getFavoriteEvents())
      setTicketHistory(userService.getTicketHistory())
    } catch (error) {
      console.error('Fehler beim Laden der Benutzerdaten:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    userService.logout()
    onClose()
  }

  const removeFavorite = (eventId) => {
    userService.removeFavoriteEvent(eventId)
    setFavoriteEvents(prev => prev.filter(event => event.id !== eventId))
  }

  const getTicketShopUrl = (eventTitle, eventCity) => {
    // Eventim Integration
    const eventimQuery = encodeURIComponent(`${eventTitle} ${eventCity}`)
    return `https://www.eventim.de/search/?term=${eventimQuery}`
  }

  const tabs = [
    { id: 'overview', name: 'Übersicht', icon: '📊' },
    { id: 'favorites', name: 'Favoriten', icon: '❤️' },
    { id: 'tickets', name: 'Tickets', icon: '🎫' },
    { id: 'profile', name: 'Profil', icon: '👤' },
    { id: 'settings', name: 'Einstellungen', icon: '⚙️' }
  ]

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-3 text-white">Lade Dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-orange-400/30 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 text-orange-400 rounded-full flex items-center justify-center border border-orange-400/40 text-xl font-bold mr-4">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-400">Member Dashboard</h2>
              <p className="text-gray-300">Willkommen, {currentUser?.name || 'Benutzer'}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Abmelden
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === tab.id
                      ? 'text-orange-400 border border-orange-400/40'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3 text-lg">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Dashboard Übersicht</h3>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Favoriten</p>
                        <p className="text-3xl font-bold text-orange-400">{userStats?.totalFavorites || 0}</p>
                      </div>
                      <div className="text-4xl">❤️</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Tickets</p>
                        <p className="text-3xl font-bold text-orange-400">{userStats?.totalTickets || 0}</p>
                      </div>
                      <div className="text-4xl">🎫</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Mitglied seit</p>
                        <p className="text-lg font-bold text-orange-400">
                          {userStats?.memberSince ? formatGermanDate(userStats.memberSince).split(',')[0] : 'Heute'}
                        </p>
                      </div>
                      <div className="text-4xl">📅</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Letzter Login</p>
                        <p className="text-sm font-bold text-orange-400">
                          {userStats?.lastLogin ? formatGermanDate(userStats.lastLogin).split(',')[0] : 'Heute'}
                        </p>
                      </div>
                      <div className="text-4xl">🕐</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-xl font-bold text-white mb-4">Schnellzugriff</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">🔍</div>
                      <div className="text-white font-semibold">Events suchen</div>
                      <div className="text-gray-400 text-sm">Neue Events entdecken</div>
                    </button>
                    
                    <a
                      href="https://www.eventim.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left block"
                    >
                      <div className="text-2xl mb-2">🛒</div>
                      <div className="text-white font-semibold">Tickets kaufen</div>
                      <div className="text-gray-400 text-sm">Bei Eventim bestellen</div>
                    </a>
                    
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left"
                    >
                      <div className="text-2xl mb-2">⚙️</div>
                      <div className="text-white font-semibold">Profil bearbeiten</div>
                      <div className="text-gray-400 text-sm">Einstellungen anpassen</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Meine Favoriten</h3>
                  <span className="text-orange-400">{favoriteEvents.length} Events</span>
                </div>

                {favoriteEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <p className="text-gray-400 text-lg">Noch keine Favoriten gespeichert</p>
                    <p className="text-gray-500 mt-2">Suchen Sie nach Events und fügen Sie sie zu Ihren Favoriten hinzu!</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {favoriteEvents.map((event, index) => (
                      <div key={event.id || index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-orange-400/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                            <div className="space-y-2">
                              <p className="text-orange-400 font-semibold">📍 {event.city}</p>
                              <p className="text-gray-300">📅 {event.date}</p>
                              {event.venue && <p className="text-gray-400">🏟️ {event.venue}</p>}
                              {event.category && (
                                <span className="inline-block px-3 py-1 text-orange-400 rounded-full text-sm border border-orange-400/40">
                                  {event.category}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <a
                              href={getTicketShopUrl(event.title, event.city)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 text-orange-400 rounded-lg transition-all text-sm text-center border border-orange-400/40 hover:border-orange-400/60"
                            >
                              Tickets kaufen
                            </a>
                            <button
                              onClick={() => removeFavorite(event.id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                            >
                              Entfernen
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tickets Tab */}
            {activeTab === 'tickets' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Meine Tickets</h3>
                  <span className="text-orange-400">{ticketHistory.length} Tickets</span>
                </div>

                {ticketHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎫</div>
                    <p className="text-gray-400 text-lg">Noch keine Tickets gekauft</p>
                    <p className="text-gray-500 mt-2">Ihre Ticketkäufe werden hier angezeigt</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {ticketHistory.map((ticket) => (
                      <div key={ticket.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-white">{ticket.eventTitle}</h4>
                            <p className="text-orange-400">📅 {ticket.eventDate}</p>
                            <p className="text-gray-400">🏟️ {ticket.venue}</p>
                            <p className="text-gray-300 mt-2">Gekauft am: {formatGermanDate(ticket.purchasedAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange-400">{ticket.price}€</p>
                            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Mein Profil</h3>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-xl font-bold text-white mb-4">Persönliche Informationen</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={currentUser?.name || ''}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail</label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        disabled
                      />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Profil-Bearbeitung kommt in einem zukünftigen Update
                  </p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Einstellungen</h3>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-xl font-bold text-white mb-4">Ticket-Shop Einstellungen</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bevorzugter Ticket-Anbieter
                      </label>
                      <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        <option value="eventim">Eventim (Standard)</option>
                        <option value="ticketmaster">Ticketmaster</option>
                        <option value="adticket">ADticket</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-300">E-Mail-Benachrichtigungen für neue Events</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-300">Preis-Alerts für Favoriten</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-red-400 mb-4">Konto löschen</h4>
                  <p className="text-gray-300 mb-4">
                    Möchten Sie Ihr Konto permanent löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                  </p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    Konto löschen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberDashboard
