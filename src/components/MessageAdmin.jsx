import { useState, useEffect } from 'react';

const MessageAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, new, read

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      if (response.ok) {
        const result = await response.json();
        setMessages(result.data || []);
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      console.warn('Backend not available, using localStorage fallback');
      const localMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      setMessages(localMessages);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}/read`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        loadMessages(); // Reload from backend
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      // Fallback: Update localStorage
      const localMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const messageIndex = localMessages.findIndex(m => m.id === messageId);
      if (messageIndex !== -1) {
        localMessages[messageIndex].isRead = true;
        localMessages[messageIndex].readAt = new Date().toISOString();
        localStorage.setItem('contactMessages', JSON.stringify(localMessages));
        setMessages(localMessages);
      }
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Nachricht wirklich löschen?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadMessages(); // Reload from backend
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      // Fallback: Update localStorage
      const localMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const filteredMessages = localMessages.filter(m => m.id !== messageId && m._id !== messageId);
      localStorage.setItem('contactMessages', JSON.stringify(filteredMessages));
      setMessages(filteredMessages);
    }
    
    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'new') return !message.isRead;
    if (filter === 'read') return message.isRead;
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('de-DE');
  };

  const getMessageId = (message) => {
    return message._id || message.id;
  };

  if (loading) {
    return (
      <div className="p-6 bg-zinc-900 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Kontaktnachrichten</h1>
            <p className="text-gray-400">
              {messages.length} Nachrichten insgesamt
            </p>
          </div>
          
          <div className="flex space-x-4">
            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700"
            >
              <option value="all">Alle ({messages.length})</option>
              <option value="new">Neu ({messages.filter(m => !m.isRead).length})</option>
              <option value="read">Gelesen ({messages.filter(m => m.isRead).length})</option>
            </select>
            
            {/* Refresh Button */}
            <button
              onClick={loadMessages}
              className="bg-orange-400 text-black px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors"
            >
              Aktualisieren
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1">
            <div className="bg-black/50 rounded-xl border border-orange-400/20 max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  Keine Nachrichten gefunden
                </div>
              ) : (
                <div className="divide-y divide-zinc-700">
                  {filteredMessages.map((message) => (
                    <div
                      key={getMessageId(message)}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.isRead) {
                          markAsRead(getMessageId(message));
                        }
                      }}
                      className={`p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors ${
                        selectedMessage && getMessageId(selectedMessage) === getMessageId(message)
                          ? 'bg-orange-400/10 border-l-4 border-orange-400'
                          : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-white truncate">
                            {message.name}
                          </h3>
                          {!message.isRead && (
                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-1">
                        {message.email}
                      </p>
                      
                      <p className="text-sm text-orange-400 mb-2 truncate">
                        {message.subject || 'Kontaktformular'}
                      </p>
                      
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-black/50 rounded-xl border border-orange-400/20 p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {selectedMessage.subject || 'Kontaktformular'}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Von: {selectedMessage.name}</span>
                      <span>•</span>
                      <span>{selectedMessage.email}</span>
                      <span>•</span>
                      <span>{formatDate(selectedMessage.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      selectedMessage.isRead 
                        ? 'bg-green-400/20 text-green-400'
                        : 'bg-orange-400/20 text-orange-400'
                    }`}>
                      {selectedMessage.isRead ? 'Gelesen' : 'Neu'}
                    </span>
                    
                    <button
                      onClick={() => deleteMessage(getMessageId(selectedMessage))}
                      className="px-3 py-1 bg-red-400/20 text-red-400 rounded-full text-xs hover:bg-red-400/30 transition-colors"
                    >
                      Löschen
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-400 mb-3">Nachricht:</h3>
                  <div className="text-white whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-4">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Ihre Kontaktanfrage'}&body=Hallo ${selectedMessage.name},%0A%0A`}
                    className="bg-orange-400 text-black px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Antworten
                  </a>
                  
                  {!selectedMessage.isRead && (
                    <button
                      onClick={() => markAsRead(getMessageId(selectedMessage))}
                      className="bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition-colors"
                    >
                      Als gelesen markieren
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-black/50 rounded-xl border border-orange-400/20 p-6 flex items-center justify-center h-64">
                <div className="text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p>Wählen Sie eine Nachricht aus, um sie anzuzeigen</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAdmin;