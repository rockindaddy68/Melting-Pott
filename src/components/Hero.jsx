import React from 'react'
import RealEventSearch from './RealEventSearch'
import { useTheme } from '../contexts/ThemeContext'

const Hero = ({ selectedLanguage, setSelectedLanguage }) => {
  const { theme } = useTheme();
  // Aktuelle Sprache ableiten
  const currentLanguageCode = selectedLanguage.toLowerCase();

  const welcomeButtons = [
    { code: 'DE', text: 'Willkommen im Ruhrgebiet', flag: '🇩🇪' },
    { code: 'EN', text: 'Welcome to the Ruhr Area', flag: '🇬🇧' },
    { code: 'TR', text: 'Ruhr Bölgesine Hoş Geldiniz', flag: '🇹🇷' },
    { code: 'PL', text: 'Witamy w Zagłębiu Ruhry', flag: '🇵🇱' },
    { code: 'RU', text: 'Добро пожаловать в Рурскую область', flag: '🇷🇺' },
    { code: 'AR', text: 'مرحباً بكم في منطقة الرور', flag: '🇸🇦' },
    { code: 'FR', text: 'Bienvenue dans la Ruhr', flag: '🇫🇷' },
    { code: 'ES', text: 'Bienvenidos al Área del Ruhr', flag: '🇪🇸' },
    { code: 'IT', text: 'Benvenuti nella Ruhr', flag: '🇮🇹' },
    { code: 'NL', text: 'Welkom in het Ruhrgebied', flag: '🇳🇱' }
  ]

  const translations = {
    DE: {
      title: "Melting Pott",
      subtitle: "Dein Guide für Events im Ruhrgebiet",
      searchPlaceholder: "Was läuft wo?",
      discoverBtn: "Entdecken",
      explanationTitle: "Was bedeutet \"Melting Pott\"?",
      explanation: "Der Begriff 'Melting Pott' verbindet das englische Wort für Schmelztiegel mit dem regionalen 'Pott' für das Ruhrgebiet. Seit über 150 Jahren leben und arbeiten hier Menschen aus aller Welt zusammen - von polnischen Bergleuten über türkische Gastarbeiter bis hin zu Familien aus über 180 Nationen. Diese kulturelle Vielfalt macht das Ruhrgebiet zu einem einzigartigen Schmelztiegel der Kulturen."
    },
    EN: {
      title: "Melting Pott", 
      subtitle: "Your Guide to Events in the Ruhr Area",
      searchPlaceholder: "Search events or locations...",
      discoverBtn: "Discover",
      explanationTitle: "What does \"Melting Pott\" mean?",
      explanation: "The term 'Melting Pott' combines the English word for melting pot with the regional 'Pott' for the Ruhr area. For over 150 years, people from all over the world have lived and worked together here - from Polish miners to Turkish guest workers to families from over 180 nations. This cultural diversity makes the Ruhr area a unique melting pot of cultures."
    },
    TR: {
      title: "Melting Pott",
      subtitle: "Ruhr Bölgesi Etkinlik Rehberiniz",
      searchPlaceholder: "Etkinlik veya konum ara...",
      discoverBtn: "Keşfet",
      explanationTitle: "\"Melting Pott\" ne anlama gelir?",
      explanation: "Melting Pott terimi, İngilizce eritme potası anlamındaki kelime ile bölgesel 'Pott'u birleştirir. 150 yılı aşkın süredir dünyanın her yerinden insanlar burada birlikte yaşıyor ve çalışıyor - Polonyalı madencilerden Türk misafir işçilere, 180'den fazla ulustan ailelere kadar."
    },
    PL: {
      title: "Melting Pott",
      subtitle: "Twój przewodnik po wydarzeniach w Zagłębiu Ruhry",
      searchPlaceholder: "Szukaj wydarzeń lub lokalizacji...",
      discoverBtn: "Odkryj",
      explanation: "Termin 'Melting Pott' łączy angielskie słowo oznaczające tygiel z regionalnym 'Pott' dla Zagłębia Ruhry. Przez ponad 150 lat ludzie z całego świata żyją i pracują tutaj razem - od polskich górników po tureckich robotników gościnnych, po rodziny z ponad 180 narodów."
    },
    RU: {
      title: "Melting Pott", 
      subtitle: "Ваш гид по событиям в Рурской области",
      searchPlaceholder: "Поиск событий или локаций...",
      discoverBtn: "Открыть",
      explanation: "Термин 'Melting Pott' объединяет английское слово 'плавильный котел' с региональным 'Pott' для Рурской области. Уже более 150 лет здесь живут и работают вместе люди со всего мира - от польских шахтеров до турецких гастарбайтеров и семей из более чем 180 стран."
    },
    AR: {
      title: "Melting Pott",
      subtitle: "دليلكم لفعاليات منطقة الرور", 
      searchPlaceholder: "البحث عن الأحداث أو المواقع...",
      discoverBtn: "اكتشف",
      explanation: "يجمع مصطلح 'Melting Pott' بين الكلمة الإنجليزية التي تعني بوتقة الانصهار و'Pott' الإقليمية لمنطقة الرور. لأكثر من 150 عاماً، يعيش ويعمل الناس من جميع أنحاء العالم هنا معاً - من عمال المناجم البولنديين إلى العمال الضيوف الأتراك وحتى العائلات من أكثر من 180 دولة."
    },
    FR: {
      title: "Melting Pott",
      subtitle: "Votre guide des événements dans la Ruhr",
      searchPlaceholder: "Rechercher des événements ou des lieux...",
      discoverBtn: "Découvrir",
      explanation: "Le terme 'Melting Pott' combine le mot anglais pour creuset avec le 'Pott' régional pour la région de la Ruhr. Depuis plus de 150 ans, des gens du monde entier vivent et travaillent ensemble ici - des mineurs polonais aux travailleurs invités turcs, en passant par des familles de plus de 180 nations."
    },
    ES: {
      title: "Melting Pott", 
      subtitle: "Tu guía de eventos en el Área del Ruhr",
      searchPlaceholder: "Buscar eventos o ubicaciones...",
      discoverBtn: "Descubrir",
      explanation: "El término 'Melting Pott' combina la palabra inglesa para crisol con el 'Pott' regional para el Área del Ruhr. Durante más de 150 años, personas de todo el mundo han vivido y trabajado juntas aquí - desde mineros polacos hasta trabajadores invitados turcos y familias de más de 180 naciones."
    },
    IT: {
      title: "Melting Pott",
      subtitle: "La tua guida agli eventi nella Ruhr", 
      searchPlaceholder: "Cerca eventi o luoghi...",
      discoverBtn: "Scopri",
      explanation: "Il termine 'Melting Pott' combina la parola inglese per crogiolo con il 'Pott' regionale per l'area della Ruhr. Da oltre 150 anni, persone di tutto il mondo vivono e lavorano insieme qui - dai minatori polacchi ai lavoratori ospiti turchi, alle famiglie di oltre 180 nazioni."
    },
    NL: {
      title: "Melting Pott",
      subtitle: "Jouw gids voor evenementen in het Ruhrgebied",
      searchPlaceholder: "Zoek evenementen of locaties...",
      discoverBtn: "Ontdek",
      explanation: "De term 'Melting Pott' combineert het Engelse woord voor smeltpot met de regionale 'Pott' voor het Ruhrgebied. Al meer dan 150 jaar leven en werken mensen uit de hele wereld hier samen - van Poolse mijnwerkers tot Turkse gastarbeiders tot families uit meer dan 180 landen."
    }
  }

  const currentLang = translations[selectedLanguage] || translations.DE

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
              {currentLang.title}
            </h1>
            <p 
              className="text-2xl lg:text-3xl mb-12 font-light"
              style={{ color: 'var(--text-secondary)' }}
            >
              {currentLang.subtitle}
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
