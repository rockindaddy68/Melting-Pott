import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const SimpleHotte = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Moin! Ich bin Hotte, euer Ruhrpott-Kumpel! 👋", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    
    // Einfache Antworten
    let response = "Das ist interessant! 🤔";
    if (input.toLowerCase().includes('hallo')) {
      response = "Moin Moin! Wat geht ab im Pott? 😊";
    } else if (input.toLowerCase().includes('essen')) {
      response = "In Essen musst du unbedingt zum Zollverein! UNESCO-Welterbe und echt sehenswert! 🏭";
    } else if (input.toLowerCase().includes('event')) {
      response = "Events? Da kenn ich mich aus! Schau mal oben in der Event-Liste! 🎉";
    }
    
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, text: response, isUser: false };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
    
    setInput('');
  };

  if (!isOpen) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: theme === 'dark' ? '#ff6600' : '#0066ff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          🧑‍🏭
        </button>
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {/* Chat Window */}
      <div style={{
        width: '320px',
        height: '400px',
        background: theme === 'dark' ? '#1f2937' : 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: theme === 'dark' ? '#ff6600' : '#0066ff',
          color: 'white',
          padding: '12px',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🧑‍🏭</span>
            <span style={{ fontWeight: 'bold' }}>Hotte</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          padding: '12px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                background: msg.isUser 
                  ? (theme === 'dark' ? '#ff6600' : '#0066ff')
                  : (theme === 'dark' ? '#374151' : '#f3f4f6'),
                color: msg.isUser ? 'white' : (theme === 'dark' ? 'white' : 'black'),
                padding: '8px 12px',
                borderRadius: '12px',
                maxWidth: '70%',
                fontSize: '14px'
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: '12px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Frag Hotte was..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              background: theme === 'dark' ? '#374151' : 'white',
              color: theme === 'dark' ? 'white' : 'black'
            }}
          />
          <button
            onClick={handleSend}
            style={{
              background: theme === 'dark' ? '#ff6600' : '#0066ff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            📤
          </button>
        </div>
      </div>

      {/* Floating Button (minimized state) */}
      <button
        onClick={() => setIsOpen(false)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: theme === 'dark' ? '#ff6600' : '#0066ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        🧑‍🏭
      </button>
    </div>
  );
};

export default SimpleHotte;