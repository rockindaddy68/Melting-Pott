import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ExplanationSection = ({ selectedLanguage }) => {
  const { theme } = useTheme()
  
  // Aktuelle Sprache ableiten
  const currentLanguageCode = selectedLanguage.toLowerCase();

  const translations = {
    DE: {
      explanationTitle: "Was bedeutet \"Melting Pott\"?",
      explanation: "Der Begriff 'Melting Pott' verbindet das englische Wort für Schmelztiegel mit dem regionalen 'Pott' für das Ruhrgebiet. Seit über 150 Jahren leben und arbeiten hier Menschen aus aller Welt zusammen - von polnischen Bergleuten über türkische Gastarbeiter bis hin zu Familien aus über 180 Nationen. Diese kulturelle Vielfalt macht das Ruhrgebiet zu einem einzigartigen Schmelztiegel der Kulturen."
    },
    EN: {
      explanationTitle: "What does \"Melting Pott\" mean?",
      explanation: "The term 'Melting Pott' combines the English word for melting pot with the regional 'Pott' for the Ruhr area. For over 150 years, people from all over the world have lived and worked together here - from Polish miners to Turkish guest workers to families from over 180 nations. This cultural diversity makes the Ruhr area a unique melting pot of cultures."
    },
    TR: {
      explanationTitle: "\"Melting Pott\" ne anlama gelir?",
      explanation: "Melting Pott terimi, İngilizce eritme potası anlamındaki kelime ile bölgesel 'Pott'u birleştirir. 150 yılı aşkın süredir dünyanın her yerinden insanlar burada birlikte yaşıyor ve çalışıyor - Polonyalı madencilerden Türk misafir işçilere, 180'den fazla ulustan ailelere kadar."
    }
  }

  const currentLang = translations[currentLanguageCode] || translations.DE;

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-orange-50 to-yellow-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Explanation */}
        <div className={`${theme === 'dark' ? 'bg-transparent' : 'bg-white/80'} backdrop-blur-sm rounded-2xl p-8 max-w-5xl mx-auto ${theme === 'dark' ? 'border-0' : 'border border-orange-200/30 shadow-lg'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{currentLang.explanationTitle}</h3>
          </div>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-base leading-relaxed`}>
            {currentLang.explanation}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ExplanationSection