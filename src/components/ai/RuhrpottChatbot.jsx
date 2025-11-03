// === KI CHATBOT FÜR RUHRPOTT EVENTS ===
// Intelligenter Chat-Assistent für Event-Beratung und Informationen

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ruhrpottAI from '../../services/ruhrpottAI';

const RuhrpottChatbot = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hallo! Ich bin dein Ruhrpott Event-Assistent 🏭 Frag mich gerne nach Events, Sehenswürdigkeiten oder Tipps für das Ruhrgebiet!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // KI-Service initialisieren
  useEffect(() => {
    ruhrpottAI.initialize();
  }, []);

  // Auto-scroll zu neuen Nachrichten
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Erweiterte KI-Logik mit Event-Integration
  const getRuhrpottAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Versuche Smart Response mit echten Event-Daten
    const smartResponse = ruhrpottAI.generateSmartResponse(userMessage);
    if (smartResponse) {
      return smartResponse;
    }
    
    // Event-spezifische Antworten
    if (message.includes('event') || message.includes('veranstaltung')) {
      if (message.includes('heute') || message.includes('jetzt')) {
        return {
          message: '🎉 Heute gibt es mehrere coole Events im Ruhrgebiet:\n\n• **Zeche Zollverein Führung** in Essen (14:00 Uhr)\n• **Gasometer Oberhausen** - "Der Berg ruft" Ausstellung\n• **Phoenix Lake Food Market** in Dortmund\n\nSoll ich dir mehr Details zu einem Event geben?',
          suggestions: ['Mehr über Zollverein', 'Gasometer Details', 'Food Market Info']
        };
      }
      if (message.includes('wochenende') || message.includes('samstag') || message.includes('sonntag')) {
        return {
          message: '🌟 Am Wochenende ist richtig was los:\n\n• **Extraschicht** - Die lange Nacht der Industriekultur\n• **Bochum Total Festival** - Kostenloses Musikfest\n• Verschiedene Zechenführungen\n\nWas für Musik magst du denn?',
          suggestions: ['Rock/Metal Events', 'Klassik & Kultur', 'Electronic/Techno']
        };
      }
      return {
        message: '🎪 Im Ruhrgebiet ist immer was los! Wir haben aktuell 5 coole Events:\n\n• Extraschicht - Industriekultur pur\n• Bochum Total - Gratis Musik\n• Zollverein Führungen\n• Gasometer Ausstellungen\n• Food Markets\n\nWonach suchst du genau?',
        suggestions: ['Events heute', 'Wochenend-Tipps', 'Kultur-Events']
      };
    }

    // Stadt-spezifische Antworten
    if (message.includes('essen')) {
      return {
        message: '🏭 Essen ist das Herz des Ruhrgebiets!\n\n**Top Highlights:**\n• Zeche Zollverein (UNESCO Welterbe)\n• Folkwang Museum\n• Gruga Park\n• Alte Synagoge\n\n**Aktuelle Events:** Zollverein-Führungen täglich!\n\nWas interessiert dich in Essen am meisten?',
        suggestions: ['Zollverein besuchen', 'Museum-Tipps', 'Parks & Natur']
      };
    }

    if (message.includes('bochum')) {
      return {
        message: '🎵 Bochum - Stadt der Musik und Kultur!\n\n**Must-See:**\n• Deutsches Bergbau-Museum\n• Schauspielhaus Bochum\n• Bermuda3Eck (Party-Viertel)\n• Jahrhunderthalle\n\n**Event-Tipp:** Bochum Total Festival - Deutschlands größtes kostenloses Stadtfestival!\n\nBrauchst du Tipps für die Anreise?',
        suggestions: ['Festival Details', 'Bergbau-Museum', 'Nightlife Tipps']
      };
    }

    if (message.includes('dortmund')) {
      return {
        message: '⚽ Dortmund - nicht nur Fußball!\n\n**Highlights:**\n• BVB-Stadion & Museum\n• Deutsches Fußballmuseum\n• Phoenix Lake\n• DASA Arbeitsschutz-Museum\n\n**Food-Tipp:** Phoenix Lake Food Market mit Street Food aus aller Welt!\n\nInteresse an Sport oder eher Kultur?',
        suggestions: ['BVB Stadium Tour', 'Phoenix Lake', 'Kultur & Museen']
      };
    }

    // Allgemeine Ruhrgebiet-Fragen
    if (message.includes('ruhrgebiet') || message.includes('ruhrpott') || message.includes('pott')) {
      return {
        message: '🏭 Das Ruhrgebiet - ein einzigartiger Kulturschmelztiegel!\n\n**Fun Facts:**\n• 5.1 Mio Menschen aus 180+ Nationen\n• Größte Industriekultur-Landschaft der Welt\n• 53 Städte von Duisburg bis Dortmund\n• UNESCO-Welterbe Zollverein\n\n**Mein Tipp:** Die Extraschicht - einmal im Jahr wird die ganze Region zur Kulturbühne!\n\nWelche Stadt möchtest du erkunden?',
        suggestions: ['Essen entdecken', 'Bochum erleben', 'Dortmund besuchen']
      };
    }

    // Ticket/Preise
    if (message.includes('ticket') || message.includes('preis') || message.includes('kosten') || message.includes('euro')) {
      return {
        message: '💰 **Preise im Ruhrgebiet:**\n\n• Zollverein-Führung: 12.50€\n• Gasometer: 11€\n• Bergbau-Museum: 10€\n• **Bochum Total: KOSTENLOS! 🎉**\n• Food Markets: 5€ Eintritt\n\n**Tipp:** Viele Events sind überraschend günstig oder sogar kostenlos!\n\nFür welches Event brauchst du Ticket-Infos?',
        suggestions: ['Kostenlose Events', 'Museum-Tickets', 'Festival-Pässe']
      };
    }

    // Anfahrt/Transport
    if (message.includes('anfahrt') || message.includes('bahn') || message.includes('auto') || message.includes('parken')) {
      return {
        message: '🚊 **Anfahrt ins Ruhrgebiet:**\n\n**ÖPNV:** Super vernetzt mit VRR-Ticket\n• S-Bahn, U-Bahn, Straßenbahn, Bus\n• Tagesticket: 8.80€ für ganze Region\n\n**Auto:** A40, A42, A1 - viele Parkplätze\n\n**Zug:** ICE nach Essen, Bochum, Dortmund\n\n**Mein Tipp:** ÖPNV ist oft entspannter als Auto!\n\nWohin genau möchtest du?',
        suggestions: ['VRR-Ticket kaufen', 'Parkplätze finden', 'Bahnverbindungen']
      };
    }

    // Essen/Gastronomie
    if (message.includes('essen') || message.includes('restaurant') || message.includes('currywurst') || message.includes('food')) {
      return {
        message: '🍽️ **Ruhrpott Kulinarik - mehr als nur Currywurst!**\n\n• **Currywurst:** Original von hier! 🌭\n• **Halver Hahn:** Roggenbrötchen mit Käse\n• **Himmel & Erde:** Kartoffeln mit Äpfeln\n• **International:** Türkisch, Polnisch, Italienisch\n\n**Event-Tipp:** Phoenix Lake Food Market - Street Food Festival!\n\nAuf was hast du Hunger?',
        suggestions: ['Currywurst-Spots', 'Food Markets', 'Internationale Küche']
      };
    }

    // Fun Facts für interessantere Antworten
    if (message.includes('wussten sie') || message.includes('fun fact') || message.includes('interessant')) {
      return {
        message: `💡 **Ruhrgebiet Fun Fact:**\n\n${ruhrpottAI.getRandomRuhrgebietFact()}\n\nMöchtest du mehr über Events oder Sehenswürdigkeiten erfahren?`,
        suggestions: ['Noch ein Fun Fact', 'Events suchen', 'Städte entdecken']
      };
    }

    // Fallback-Antworten mit Fun Facts
    const fallbacks = [
      {
        message: `🤔 Das ist eine interessante Frage! Hier ein kleiner Tipp:\n\n${ruhrpottAI.getRandomRuhrgebietFact()}\n\nWomit kann ich dir konkret helfen?`,
        suggestions: ['Events finden', 'Städte erkunden', 'Kultur-Tipps']
      },
      {
        message: '🏭 Als Ruhrpott-Experte kenne ich mich am besten mit Events und Sehenswürdigkeiten aus. Was planst du denn für deinen Besuch?',
        suggestions: ['Event-Suche', 'Tagesplanung', 'Fun Facts']
      },
      {
        message: '⚡ Lass uns über das Ruhrgebiet sprechen! Was interessiert dich: Events, Kultur, Essen oder Anfahrt?',
        suggestions: ['Aktuelle Events', 'Kultur & Museen', 'Restaurants']
      }
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getRuhrpottAIResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: aiResponse.message,
        suggestions: aiResponse.suggestions || [],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 Sekunden
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        style={{ 
          backgroundColor: 'var(--accent-primary)',
          color: 'white'
        }}
        title="Ruhrpott Event-Assistent"
      >
        {isOpen ? (
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-24 right-6 w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col z-40 border-2`}
          style={{ 
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-primary)'
          }}
        >
          {/* Header */}
          <div 
            className="p-4 rounded-t-2xl border-b"
            style={{ 
              backgroundColor: 'var(--accent-primary)',
              borderBottomColor: 'var(--border-secondary)'
            }}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏭</span>
                <div>
                  <h3 className="font-semibold">Ruhrpott Assistent</h3>
                  <p className="text-xs opacity-90">Event-Beratung & Tipps</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.type === 'user' 
                      ? 'text-white' 
                      : 'shadow-sm'
                  }`}
                  style={{
                    backgroundColor: msg.type === 'user' 
                      ? 'var(--accent-primary)' 
                      : 'var(--bg-secondary)',
                    color: msg.type === 'user' ? 'white' : 'var(--text-primary)'
                  }}
                >
                  <div className="whitespace-pre-line text-sm">
                    {msg.message}
                  </div>
                  
                  {/* Suggestion Buttons */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 text-xs rounded-full border transition-colors hover:opacity-80"
                          style={{
                            borderColor: 'var(--accent-primary)',
                            color: 'var(--accent-primary)'
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div 
                  className="rounded-2xl p-3 shadow-sm"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent-primary)', animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent-primary)', animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div 
            className="p-4 border-t"
            style={{ borderTopColor: 'var(--border-primary)' }}
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Frag mich nach Events..."
                className="flex-1 rounded-full px-4 py-2 text-sm border focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RuhrpottChatbot;