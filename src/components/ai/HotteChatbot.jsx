import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ruhrpottAI } from '../../services/ruhrpottAI';

const HotteChatbot = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hallo! Ich bin Hotte, euer Kumpel aus dem Ruhrpott! 👋 Fragt mich alles über Events und das Leben hier bei uns!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hotteAnimation, setHotteAnimation] = useState('idle');
  const messagesEndRef = useRef(null);

  // Hotte Animationszustände
  const animations = {
    idle: { transform: 'translateY(0px) rotate(0deg)', animation: 'hotteFloat 3s ease-in-out infinite' },
    talking: { transform: 'scale(1.1)', animation: 'hotteTalk 0.5s ease-in-out infinite' },
    thinking: { transform: 'rotate(5deg)', animation: 'hotteThink 1s ease-in-out infinite' },
    excited: { transform: 'scale(1.2) rotate(-5deg)', animation: 'hotteExcited 0.3s ease-in-out infinite' },
    waving: { transform: 'rotate(15deg)', animation: 'hotteWave 0.6s ease-in-out 3' }
  };

  // Hotte Sprüche und Reaktionen
  const hotteResponses = {
    greeting: [
      "Moin Moin! Wat geht ab im Pott? 😊",
      "Na, alles klar bei dir? Ich bin Hotte, dein Ruhrpott-Kumpel!",
      "Tach auch! Hotte hier, euer Event-Experte aus dem Revier! 🎉",
      "Hallöchen! Ready für Events und Pott-Geschichten? 🏭"
    ],
    events: [
      "Events? Da kenn ich jeden Schuppen im Revier! 🎪",
      "Oh, Events! Von Zollverein bis Westfalenpark - ich weiß Bescheid! 🎭",
      "Events im Ruhrgebiet? Da bin ich der absolute Profi! 🎵",
      "Kultur, Konzerte, Kirmesse - ich kenn sie alle! �"
    ],
    location: [
      "Ruhrpott is einfach der Hammer! 💪",
      "Hier im Revier ist immer Vollgas! ⚡",
      "Das Ruhrgebiet rockt wie nix Gutes! 🔥",
      "Von Duisburg bis Dortmund - überall steppt der Bär! �"
    ],
    confused: [
      "Äh... dat hab ich nich so verstanden, Kumpel. Nochmal? 🤔",
      "Hmm, da bin ich überfragt. Hilfste mir mal? 😅",
      "Dat is mir zu hoch, Meister. Erklär's nochmal! 🧐",
      "Sorry, dat check ich nich. Kannste das anders sagen? �‍♂️"
    ]
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Service initialisieren
  useEffect(() => {
    if (isOpen) {
      ruhrpottAI.initialize().catch(() => {
        console.log('🤖 Hotte läuft im Offline-Modus');
      });
    }
  }, [isOpen]);

  useEffect(() => {
    // Animation für das Öffnen
    if (isOpen) {
      setHotteAnimation('waving');
      setTimeout(() => setHotteAnimation('idle'), 2000);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getRandomResponse = (category) => {
    const responses = hotteResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const determineHotteReaction = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hallo') || lowerMessage.includes('hi') || lowerMessage.includes('moin')) {
      return { animation: 'waving', response: getRandomResponse('greeting') };
    }
    if (lowerMessage.includes('event') || lowerMessage.includes('konzert') || lowerMessage.includes('festival')) {
      return { animation: 'excited', response: getRandomResponse('events') };
    }
    if (lowerMessage.includes('ruhr') || lowerMessage.includes('pott') || lowerMessage.includes('dortmund') || lowerMessage.includes('essen')) {
      return { animation: 'excited', response: getRandomResponse('location') };
    }
    
    return { animation: 'thinking', response: null };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Hotte Reaktion bestimmen
    const hotteReaction = determineHotteReaction(inputMessage);
    setHotteAnimation(hotteReaction.animation);

    try {
      // Kurze Pause für die Animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let aiResponse;
      if (hotteReaction.response) {
        aiResponse = hotteReaction.response;
      } else {
        // Erst versuchen mit echter AI, dann Fallback zu lokalen Antworten
        try {
          aiResponse = await ruhrpottAI.generateResponse(inputMessage, messages);
        } catch (error) {
          // Fallback zu intelligenten lokalen Antworten
          aiResponse = generateSmartResponse(inputMessage.toLowerCase());
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setHotteAnimation('talking');
      
      // Nach dem Sprechen zurück zu idle
      setTimeout(() => setHotteAnimation('idle'), 2000);
      
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Ups! Da ist was schiefgelaufen. Probier's nochmal! 😅",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setHotteAnimation('confused');
    } finally {
      setIsTyping(false);
    }
  };

  // Intelligente Antwort-Engine
  const generateSmartResponse = (message) => {
    // Event-bezogene Anfragen mit echten Daten
    if (message.includes('event') || message.includes('veranstaltung') || message.includes('konzert') || message.includes('festival')) {
      // Versuche echte Event-Daten zu verwenden
      try {
        if (ruhrpottAI.initialized && ruhrpottAI.eventData.length > 0) {
          const randomEvent = ruhrpottAI.eventData[Math.floor(Math.random() * ruhrpottAI.eventData.length)];
          if (message.includes('heute') || message.includes('jetzt')) {
            return `Heute könnt ihr zum Beispiel zur "${randomEvent.name}" ${randomEvent.location ? `in ${randomEvent.location}` : ''}! 🎉 Oder schaut in den Event-Ticker für mehr aktuelle Sachen!`;
          }
          return `Events? Klar! Zum Beispiel läuft "${randomEvent.name}" ${randomEvent.location ? `in ${randomEvent.location}` : ''}! 🎪 Check die Event-Liste oben für mehr!`;
        }
      } catch (error) {
        console.log('Fallback zu lokalen Event-Antworten');
      }
      
      // Fallback lokale Antworten
      if (message.includes('heute') || message.includes('jetzt')) {
        return "Heute läuft bestimmt was Cooles! 🎉 Schau mal in den Event-Ticker oder die Event-Suche oben. Da findest du alle aktuellen Sachen im Pott!";
      }
      if (message.includes('wochenende') || message.includes('samstag') || message.includes('sonntag')) {
        return "Am Wochenende ist im Ruhrgebiet immer Vollgas! 🔥 Von Zollverein bis zum Westfalenpark - überall steppt der Bär!";
      }
      return "Events? Da kenn ich mich aus! 🎪 Im Ruhrpott ist immer was los - von Industrial Culture bis zu Stadtfesten. Check die Event-Liste oben!";
    }

    // Stadt-spezifische Anfragen
    if (message.includes('dortmund')) {
      if (message.includes('ansehen') || message.includes('sehenswürdigkeiten') || message.includes('besuchen') || message.includes('muss')) {
        return "In Dortmund musst du sehen: 💛 BVB-Stadion (Signal Iduna Park), Deutsches Fußballmuseum, Phoenix Lake, DASA Arbeitswelt Ausstellung, Dortmunder U (Kunst & Kreativität) und das Deutsche Rosarium! Und natürlich ne Bratwurst am Borsigplatz! 🌭";
      }
      return "Dortmund! 💛 BVB-Stadt mit tollem Stadion und Phoenix Lake. Was willste denn da genau wissen?";
    }
    if (message.includes('essen') && !message.includes('restaurant') && !message.includes('currywurst')) {
      if (message.includes('ansehen') || message.includes('sehenswürdigkeiten') || message.includes('besuchen') || message.includes('muss')) {
        return "In Essen musst du unbedingt sehen: 🏭 Zeche Zollverein (UNESCO-Welterbe!), Red Dot Design Museum, Villa Hügel (Krupp-Familie), Folkwang Museum und den Baldeneysee! Und die Margarethenhöhe ist auch sehenswert!";
      }
      return "Essen! 🏭 Kulturhauptstadt 2010 mit Zollverein als Highlight. Was willste denn da genau wissen?";
    }
    if (message.includes('bochum')) {
      if (message.includes('ansehen') || message.includes('sehenswürdigkeiten') || message.includes('besuchen') || message.includes('muss')) {
        return "In Bochum solltest du sehen: 🎭 Starlight Express (das Musical!), Deutsches Bergbau-Museum mit dem Förderturm, Bermuda3Eck (Party-Meile), Planetarium, Ruhr-Uni Campus und das Eisenbahnmuseum! Abends dann ins Bermuda3Eck! 🍻";
      }
      return "Bochum! 🎭 Starlight Express und Bergbau-Museum sind top! Wat willste denn da wissen?";
    }
    if (message.includes('duisburg')) {
      if (message.includes('ansehen') || message.includes('sehenswürdigkeiten') || message.includes('besuchen') || message.includes('muss')) {
        return "In Duisburg unbedingt sehen: ⚓ Landschaftspark Duisburg-Nord (Industrie-Denkmal mit Klettergarten!), Innenhafen mit Gehry-Bauten, Museum der Deutschen Binnenschifffahrt, Tiger & Turtle (begehbare Achterbahn-Skulptur) und das Lehmbruck Museum! 🎢";
      }
      return "Duisburg! ⚓ Landschaftspark Nord und der Innenhafen sind hammer! Was willste wissen?";
    }
    if (message.includes('gelsenkirchen')) {
      if (message.includes('ansehen') || message.includes('sehenswürdigkeiten') || message.includes('besuchen') || message.includes('muss')) {
        return "In Gelsenkirchen musst du hin: ⚽ Veltins-Arena (auch wenn Schalke... na ja 😅), ZOOM Erlebniswelt (Top-Zoo!), Schloss Berge, Wissenschaftspark mit dem Glaselefanten und die Nordsternpark! Und falls Schalke spielt - Stadionatmosphäre ist trotzdem geil! 💙";
      }
      return "Gelsenkirchen! ⚽ ZOOM Erlebniswelt und Veltins-Arena. Was suchste da?";
    }
    if (message.includes('oberhausen')) {
      if (message.includes('ansehen') || message.includes('sehenswürdigkeiten') || message.includes('besuchen') || message.includes('muss')) {
        return "In Oberhausen solltest du sehen: 🛍️ Gasometer (117m hohe Ausstellungshalle - spektakulär!), CentrO (Mega-Shopping), Sea Life, Legoland Discovery Centre, Industrial Heritage Trail und das Theater Oberhausen! Shopping und Kultur perfekt kombiniert! 🎭";
      }
      return "Oberhausen! 🛍️ Gasometer ist der Hammer und CentrO zum Shoppen! Was brauchste?";
    }

    // Musik & Kultur
    if (message.includes('musik') || message.includes('konzert') || message.includes('band')) {
      return "Musik im Pott? 🎵 Von Industrial bis Hip-Hop, von der Jahrhunderthalle bis zu kleinen Clubs - hier rockt's! Matrix, Turbinenhalle, Zeche Bochum...";
    }
    if (message.includes('kultur')) {
      return "Kultur satt! 🎭 UNESCO-Welterbe Zollverein, Ruhrtriennale, Extraschicht... Das Ruhrgebiet ist Kulturhauptstadt im Herzen!";
    }

    // Food & Trinken
    if (message.includes('essen') && !message.includes('stadt')) {
      return "Essen im Ruhrpott? 🍽️ Currywurst mit Pommes Schranke, Himmel & Erde, und Pfefferpotthast! Und dazu ein Fiege oder Stauder! 🍺";
    }
    if (message.includes('bier') || message.includes('trinken') || message.includes('kneipe')) {
      return "Bier? Na klar! 🍺 Fiege, Stauder, Dortmunder... und die besten Eckkneipen deutschlandweit! Wo willste denn einen heben?";
    }

    // Fun Facts
    if (message.includes('fun fact') || message.includes('wissen') || message.includes('interessant')) {
      const funFacts = [
        "Wusstest du, dass das Ruhrgebiet mehr Museen pro Quadratkilometer hat als das Ruhrgebiet? 🏛️ Über 200 Stück!",
        "Die Zeche Zollverein war mal die 'schönste Zeche der Welt' - jetzt UNESCO-Welterbe! ⚙️",
        "Im Ruhrpott leben 5,1 Millionen Menschen - das ist mehr als in ganz Norwegen! 👥",
        "Die A40 wird liebevoll 'Ruhrschnellweg' genannt und ist quasi die Hauptstraße des Potts! 🚗",
        "Currywurst wurde 1949 in Berlin erfunden, aber perfektioniert im Ruhrgebiet! 🌭"
      ];
      return funFacts[Math.floor(Math.random() * funFacts.length)];
    }

    // Dialekt & Sprache
    if (message.includes('dialekt') || message.includes('sprache') || message.includes('ruhrpott')) {
      return "Ruhrpott-Sprache? 😄 'Wat is dat denn für'n Schiet?' ist Hochdeutsch für uns! Lecker Kumpel, ne?";
    }

    // Hilfe & Information
    if (message.includes('hilfe') || message.includes('help') || message.includes('?')) {
      return "Brauchste Hilfe? 🤝 Frag mich nach Events, Städten, Kultur, Essen oder einfach Fun Facts über den Pott! Ich kenn mich aus!";
    }

    // Standard-Antworten mit Persönlichkeit
    const defaultResponses = [
      "Dat kann ich dir nich so genau sagen... 🤔 Aber versuch mal was anderes zu fragen!",
      "Hmm, da bin ich überfragt! 😅 Frag mich lieber nach Events oder Städten im Ruhrgebiet!",
      "Dat versteh ich nich so ganz... 🧐 Kannste das nochmal anders formulieren?",
      "Da muss ich passen! 🤷‍♂️ Aber bei Events und Ruhrpott-Sachen bin ich der Richtige!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const suggestionButtons = [
    "Was läuft heute?",
    "Events in Dortmund",
    "Fun Fact Ruhrgebiet",
    "Beste Kneipen?"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <style>
          {`
            @keyframes hotteFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes hottePulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}
        </style>
        <button
          onClick={() => setIsOpen(true)}
          className={`
            relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500' 
              : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
            }
          `}
          style={{ animation: 'hotteFloat 3s ease-in-out infinite' }}
        >
          {/* Hotte Avatar */}
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center text-2xl">
            🧑‍🏭
          </div>
          
          {/* Notification Badge */}
          <div className={`
            absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white font-bold
            ${theme === 'dark' ? 'bg-cyan-400' : 'bg-green-500'}
          `}>
            !
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <style>
        {`
          @keyframes hotteFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes hotteTalk {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @keyframes hotteThink {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
          }
          @keyframes hotteExcited {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-3deg); }
            75% { transform: scale(1.1) rotate(3deg); }
          }
          @keyframes hotteWave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(15deg); }
            75% { transform: rotate(-15deg); }
          }
          @keyframes hotteConfused {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(-10deg) scale(0.95); }
            75% { transform: rotate(10deg) scale(1.05); }
          }
        `}
      </style>

      {/* Chat Window */}
      <div className={`
        mb-4 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500
        ${theme === 'dark' 
          ? 'bg-gray-900 border border-gray-700' 
          : 'bg-white border border-gray-200'
        }
      `}>
        {/* Header mit Hotte */}
        <div className={`
          p-4 flex items-center justify-between
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-orange-600 to-red-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-700'
          }
        `}>
          <div className="flex items-center space-x-3">
            {/* Animierter Hotte Avatar */}
            <div 
              className="text-3xl transition-all duration-300"
              style={animations[hotteAnimation]}
            >
              🧑‍🏭
            </div>
            <div className="text-white">
              <h3 className="font-bold">Hotte</h3>
              <p className="text-xs opacity-90">Euer Ruhrpott-Kumpel</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="mr-2 text-lg">🧑‍🏭</div>
              )}
              <div
                className={`
                  max-w-[70%] p-3 rounded-2xl text-sm
                  ${message.isUser
                    ? theme === 'dark'
                      ? 'bg-orange-600 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-100 border border-gray-700'
                      : 'bg-gray-100 text-gray-900'
                  }
                `}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="text-lg">🧑‍🏭</div>
              <div className={`
                p-3 rounded-2xl text-sm
                ${theme === 'dark' 
                  ? 'bg-gray-800 text-gray-100' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Buttons */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <div className="grid grid-cols-2 gap-2">
              {suggestionButtons.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputMessage(suggestion);
                    handleSendMessage();
                  }}
                  className={`
                    text-xs p-2 rounded-lg transition-colors
                    ${theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`
          p-4 border-t
          ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Frag Hotte was..."
              className={`
                flex-1 p-2 rounded-lg border text-sm focus:outline-none focus:ring-2
                ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-600 text-white focus:ring-orange-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                }
              `}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`
                p-2 rounded-lg transition-colors disabled:opacity-50
                ${theme === 'dark'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              📤
            </button>
          </div>
        </div>
      </div>

      {/* Minimized Hotte */}
      <button
        onClick={() => setIsOpen(false)}
        className={`
          w-16 h-16 rounded-full shadow-lg transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-gradient-to-br from-orange-500 to-red-600 hover:shadow-orange-500/25' 
            : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:shadow-blue-500/25'
          }
        `}
        style={animations[hotteAnimation]}
      >
        <div className="text-2xl">🧑‍🏭</div>
      </button>
    </div>
  );
};

export default HotteChatbot;