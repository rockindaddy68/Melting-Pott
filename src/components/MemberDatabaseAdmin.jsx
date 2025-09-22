import React, { useState, useEffect } from 'react';
import memberDatabase from '../services/memberDatabase';

const MemberDatabaseAdmin = () => {
  const [stats, setStats] = useState(null);
  const [members, setMembers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    const statistics = memberDatabase.getStatistics();
    const allMembers = memberDatabase.getAllMembers();
    const subscriberList = memberDatabase.getNewsletterSubscribers();
    
    setStats(statistics);
    setMembers(allMembers);
    setNewsletters(subscriberList);
    setLoading(false);
  };

  const exportDatabase = () => {
    const exportData = memberDatabase.exportDatabase();
    if (exportData) {
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ruhrpott_db_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
    }
  };

  const resetDatabase = () => {
    if (window.confirm('⚠️ ACHTUNG: Dies löscht ALLE Daten! Fortfahren?')) {
      memberDatabase.resetDatabase();
      loadData();
      alert('Datenbank zurückgesetzt!');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <div className="text-orange-400">Lade Datenbank...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-orange-400">
          📊 Member Database Admin
        </h2>
        <div className="flex gap-3">
          <button
            onClick={exportDatabase}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg"
          >
            💾 Export DB
          </button>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          >
            🔄 Refresh
          </button>
          <button
            onClick={resetDatabase}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
          >
            ⚠️ Reset DB
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview', label: '📈 Übersicht' },
          { id: 'members', label: '👥 Members' },
          { id: 'newsletter', label: '📧 Newsletter' },
          { id: 'events', label: '🎉 Events' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-orange-400 border border-orange-400/40'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">
                {stats?.totalMembers || 0}
              </div>
              <div className="text-gray-300">Registered Members</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {stats?.totalNewsletterSubscribers || 0}
              </div>
              <div className="text-gray-300">Newsletter Subscribers</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {stats?.totalTicketsSold || 0}
              </div>
              <div className="text-gray-300">Tickets Sold</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {stats?.totalFavorites || 0}
              </div>
              <div className="text-gray-300">Event Favorites</div>
            </div>
          </div>

          {/* Recent Members */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-orange-400 mb-4">
              🆕 Newest Members
            </h3>
            <div className="space-y-2">
              {stats?.recentMembers?.map(member => (
                <div key={member.id} className="flex justify-between items-center bg-gray-600 p-3 rounded">
                  <div>
                    <div className="text-white font-medium">{member.name}</div>
                    <div className="text-gray-400 text-sm">{member.email}</div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(member.createdAt).toLocaleDateString('de-DE')}
                  </div>
                </div>
              )) || <div className="text-gray-400">Keine Members vorhanden</div>}
            </div>
          </div>

          {/* Popular Events */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-orange-400 mb-4">
              🔥 Beliebteste Events
            </h3>
            <div className="space-y-2">
              {stats?.popularEvents?.map(event => (
                <div key={event.eventId} className="flex justify-between items-center bg-gray-600 p-3 rounded">
                  <div className="text-white">{event.eventName}</div>
                  <div className="text-orange-400 font-bold">
                    ❤️ {event.count}
                  </div>
                </div>
              )) || <div className="text-gray-400">Keine beliebten Events</div>}
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-orange-400 mb-4">
            👥 All Members ({members.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="pb-2 text-gray-300">Name</th>
                  <th className="pb-2 text-gray-300">Email</th>
                  <th className="pb-2 text-gray-300">Stadt</th>
                  <th className="pb-2 text-gray-300">Registriert</th>
                  <th className="pb-2 text-gray-300">Letzter Login</th>
                </tr>
              </thead>
              <tbody>
                {members.map(member => (
                  <tr key={member.id} className="border-b border-gray-600">
                    <td className="py-2 text-white">{member.name}</td>
                    <td className="py-2 text-gray-300">{member.email}</td>
                    <td className="py-2 text-gray-300">{member.city}</td>
                    <td className="py-2 text-gray-400">
                      {new Date(member.createdAt).toLocaleDateString('de-DE')}
                    </td>
                    <td className="py-2 text-gray-400">
                      {member.lastLogin 
                        ? new Date(member.lastLogin).toLocaleDateString('de-DE')
                        : 'Nie'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Newsletter Tab */}
      {activeTab === 'newsletter' && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-orange-400 mb-4">
            📧 Newsletter Subscribers ({newsletters.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="pb-2 text-gray-300">Name</th>
                  <th className="pb-2 text-gray-300">Email</th>
                  <th className="pb-2 text-gray-300">Quelle</th>
                  <th className="pb-2 text-gray-300">Angemeldet</th>
                </tr>
              </thead>
              <tbody>
                {newsletters.map(subscriber => (
                  <tr key={subscriber.id} className="border-b border-gray-600">
                    <td className="py-2 text-white">{subscriber.name || 'N/A'}</td>
                    <td className="py-2 text-gray-300">{subscriber.email}</td>
                    <td className="py-2 text-gray-400">{subscriber.source}</td>
                    <td className="py-2 text-gray-400">
                      {new Date(subscriber.subscribedAt).toLocaleDateString('de-DE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-orange-400 mb-4">
            🎉 Event Statistiken
          </h3>
          <div className="text-gray-300">
            <p>Gesamte Favoriten: {stats?.totalFavorites || 0}</p>
            <p>Verkaufte Tickets: {stats?.totalTicketsSold || 0}</p>
          </div>
          
          {/* Popular Events List */}
          <div className="mt-4">
            <h4 className="text-md font-bold text-orange-400 mb-2">Top Events by Favorites:</h4>
            {stats?.popularEvents?.map((event, index) => (
              <div key={event.eventId} className="bg-gray-600 p-2 rounded mb-2">
                <div className="flex justify-between">
                  <span className="text-white">#{index + 1} {event.eventName}</span>
                  <span className="text-orange-400">❤️ {event.count}</span>
                </div>
              </div>
            )) || <div className="text-gray-400">Keine Event-Daten vorhanden</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDatabaseAdmin;
