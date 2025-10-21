import React, { useState, useEffect } from 'react';

const SQLViewer = ({ onClose }) => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('SELECT * FROM users');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load database
  const loadDatabase = async () => {
    try {
      // Try backend first
      const response = await fetch('http://localhost:5000/api/users');
      if (response.ok) {
        const backendData = await response.json();
        const dbData = {
          users: backendData.users || [],
          newsletters: JSON.parse(localStorage.getItem('ruhrpott_newsletter') || '[]'),
          favorites: [],
          tickets: []
        };
        setData(dbData);
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      // Fallback to localStorage
      const dbData = {
        users: JSON.parse(localStorage.getItem('ruhrpott_users') || '[]'),
        newsletters: JSON.parse(localStorage.getItem('ruhrpott_newsletter') || '[]'),
        favorites: JSON.parse(localStorage.getItem('ruhrpott_user_favorites') || '[]'),
        tickets: JSON.parse(localStorage.getItem('ruhrpott_ticket_history') || '[]')
      };
      setData(dbData);
    }
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  // SQL-like query processor
  const executeQuery = () => {
    if (!data) return;
    
    setLoading(true);
    const queryLower = query.toLowerCase().trim();
    
    try {
      if (queryLower.includes('select * from users')) {
        setResult(data.users);
      } else if (queryLower.includes('select * from newsletters')) {
        setResult(data.newsletters);
      } else if (queryLower.includes('select * from favorites')) {
        setResult(data.favorites);
      } else if (queryLower.includes('select * from tickets')) {
        setResult(data.tickets);
      } else if (queryLower.includes('select count(*) from users')) {
        setResult([{ count: data.users.length }]);
      } else if (queryLower.includes('select * from users where')) {
        // Simple WHERE parsing
        const whereClause = queryLower.split('where')[1].trim();
        let filtered = data.users;
        
        if (whereClause.includes('city')) {
          const city = whereClause.split('=')[1].trim().replace(/['"]/g, '');
          filtered = data.users.filter(user => 
            user.city?.toLowerCase().includes(city.toLowerCase())
          );
        }
        setResult(filtered);
      } else {
        setResult([{ error: 'Query nicht unterstützt' }]);
      }
    } catch (error) {
      setResult([{ error: 'Query Fehler: ' + error.message }]);
    }
    
    setLoading(false);
  };

  const predefinedQueries = [
    'SELECT * FROM users',
    'SELECT * FROM newsletters', 
    'SELECT COUNT(*) FROM users',
    'SELECT * FROM users WHERE city = "Oberhausen"',
    'SELECT * FROM users WHERE city = "Essen"'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            🗃️ SQL Database Viewer
          </h1>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            ✕ Schließen
          </button>
        </div>

        {/* Database Status */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">📊 Database Status</h3>
          {data && (
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-blue-600 rounded p-3">
                <div className="text-2xl font-bold">{data.users.length}</div>
                <div className="text-sm">Users</div>
              </div>
              <div className="bg-green-600 rounded p-3">
                <div className="text-2xl font-bold">{data.newsletters.length}</div>
                <div className="text-sm">Newsletter</div>
              </div>
              <div className="bg-yellow-600 rounded p-3">
                <div className="text-2xl font-bold">{data.favorites.length}</div>
                <div className="text-sm">Favorites</div>
              </div>
              <div className="bg-purple-600 rounded p-3">
                <div className="text-2xl font-bold">{data.tickets.length}</div>
                <div className="text-sm">Tickets</div>
              </div>
            </div>
          )}
        </div>

        {/* SQL Query Input */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">💻 SQL Query</h3>
          
          {/* Predefined Queries */}
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">Vordefinierte Queries:</div>
            <div className="flex flex-wrap gap-2">
              {predefinedQueries.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(q)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Query Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              placeholder="SELECT * FROM users"
            />
            <button
              onClick={executeQuery}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold"
            >
              {loading ? '⏳' : '▶️'} Execute
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">📋 Query Results</h3>
          
          {result.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              Keine Ergebnisse - führe eine Query aus
            </div>
          ) : (
            <div className="overflow-x-auto">
              {result[0]?.error ? (
                <div className="bg-red-600 text-white p-4 rounded">
                  ❌ {result[0].error}
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      {Object.keys(result[0] || {}).map(key => (
                        <th key={key} className="text-left p-2 text-yellow-400">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="p-2">
                            {typeof value === 'object' ? 
                              JSON.stringify(value).substring(0, 50) + '...' : 
                              String(value).substring(0, 100)
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
              <div className="mt-4 text-gray-400 text-sm">
                📊 {result.length} Zeile(n) gefunden
              </div>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={loadDatabase}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
          >
            🔄 Database Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SQLViewer;