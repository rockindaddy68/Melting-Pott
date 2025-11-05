import React from 'react'
import RealEventSearch from './RealEventSearch'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from '../hooks/useTranslation' // Zentralisierte Übersetzungen

const Hero = ({ selectedLanguage, setSelectedLanguage }) => {
  const { theme } = useTheme();
  
  // === ZENTRALISIERTE ÜBERSETZUNGEN ===
  const { 
    hero, 
    welcome, 
    changeLanguage,
    availableLanguages 
  } = useTranslation(selectedLanguage)

  // Aktuelle Sprache ableiten
  const currentLanguageCode = selectedLanguage.toLowerCase();

  // Nutze availableLanguages vom TranslationService (erweitere um Welcome-Text)
  const welcomeButtons = availableLanguages.map(lang => ({
    code: lang.code,
    text: welcome() || lang.name, // Fallback auf Sprachname
    flag: lang.flag
  }));

  // Entferne das duplicate translations-Objekt - nutze jetzt zentralen Service!

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        color: 'var(--text-secondary)' 
      }}
    >


      {/* WegeLaPaDu Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center brightness-50 contrast-125"
          style={{
            backgroundImage: 'url(/WegeLaPaDu.jpg)'
          }}
        ></div>
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/70' : 'bg-white/90'}`}></div>
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-black/60 via-black/50 to-black' 
            : 'bg-gradient-to-b from-white/60 via-white/80 to-white'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Texts in Different Languages - Higher up */}
        <div className="pt-8 pb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {welcomeButtons.map((button) => (
              <div
                key={button.code}
                onClick={() => setSelectedLanguage(button.code)}
                className={`cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100 ${
                  selectedLanguage === button.code 
                    ? (theme === 'dark' ? 'text-orange-400' : 'text-blue-600') 
                    : (theme === 'dark' ? 'text-gray-300' : 'text-gray-600')
                }
                `}
                title={`Switch to ${button.code}`}
              >
                <span className="mr-2">{button.flag}</span>
                <span className="text-sm font-light">{button.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col justify-center min-h-[calc(100vh-200px)]">
        <div className="flex items-center justify-between gap-4 mb-12">
          {/* Left Side - Title */}
          <div className="flex-1 max-w-2xl">
            <h1 
              className="text-6xl lg:text-8xl font-bold mb-6 tracking-tight"
              style={{ color: 'var(--accent-primary)' }}
            >
              {hero('title')}
            </h1>
            <p 
              className="text-2xl lg:text-3xl mb-12 font-light"
              style={{ color: 'var(--text-secondary)' }}
            >
              {hero('subtitle')}
            </p>
          </div>
          
          {/* Right Side - Large Zollverein Image */}
          <div className="hidden lg:block flex-shrink-0">
            <img 
              src="/images/städte/essen/Extraschicht nacht.jpg"
              alt="Zeche Zollverein bei Nacht"
              className="w-[32rem] h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Mobile Zollverein Image */}
        <div className="lg:hidden mb-12 flex justify-center">
          <img 
            src="/images/städte/essen/Extraschicht nacht.jpg"
            alt="Zeche Zollverein bei Nacht"
            className="w-full max-w-md h-64 object-cover rounded-2xl shadow-2xl"
          />
        </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
