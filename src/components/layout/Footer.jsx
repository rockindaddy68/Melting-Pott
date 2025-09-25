import React, { useState, useEffect } from 'react'

const Footer = ({ selectedLanguage = 'DE' }) => {
  const [lang, setLang] = useState({})

  // Wikipedia URLs für jede Stadt in verschiedenen Sprachen
  const cityWikipediaLinks = {
    'Essen': {
      DE: 'https://de.wikipedia.org/wiki/Essen',
      EN: 'https://en.wikipedia.org/wiki/Essen',
      TR: 'https://tr.wikipedia.org/wiki/Essen',
      IT: 'https://it.wikipedia.org/wiki/Essen',
      FR: 'https://fr.wikipedia.org/wiki/Essen',
      ES: 'https://es.wikipedia.org/wiki/Essen',
      PL: 'https://pl.wikipedia.org/wiki/Essen',
      RU: 'https://ru.wikipedia.org/wiki/Эссен',
      AR: 'https://ar.wikipedia.org/wiki/إيسن',
      NL: 'https://nl.wikipedia.org/wiki/Essen_(Duitsland)'
    },
    'Dortmund': {
      DE: 'https://de.wikipedia.org/wiki/Dortmund',
      EN: 'https://en.wikipedia.org/wiki/Dortmund',
      TR: 'https://tr.wikipedia.org/wiki/Dortmund',
      IT: 'https://it.wikipedia.org/wiki/Dortmund',
      FR: 'https://fr.wikipedia.org/wiki/Dortmund',
      ES: 'https://es.wikipedia.org/wiki/Dortmund',
      PL: 'https://pl.wikipedia.org/wiki/Dortmund',
      RU: 'https://ru.wikipedia.org/wiki/Дортмунд',
      AR: 'https://ar.wikipedia.org/wiki/دورتموند',
      NL: 'https://nl.wikipedia.org/wiki/Dortmund'
    },
    'Duisburg': {
      DE: 'https://de.wikipedia.org/wiki/Duisburg',
      EN: 'https://en.wikipedia.org/wiki/Duisburg',
      TR: 'https://tr.wikipedia.org/wiki/Duisburg',
      IT: 'https://it.wikipedia.org/wiki/Duisburg',
      FR: 'https://fr.wikipedia.org/wiki/Duisbourg',
      ES: 'https://es.wikipedia.org/wiki/Duisburgo',
      PL: 'https://pl.wikipedia.org/wiki/Duisburg',
      RU: 'https://ru.wikipedia.org/wiki/Дуйсбург',
      AR: 'https://ar.wikipedia.org/wiki/دويسبورغ',
      NL: 'https://nl.wikipedia.org/wiki/Duisburg'
    },
    'Bochum': {
      DE: 'https://de.wikipedia.org/wiki/Bochum',
      EN: 'https://en.wikipedia.org/wiki/Bochum',
      TR: 'https://tr.wikipedia.org/wiki/Bochum',
      IT: 'https://it.wikipedia.org/wiki/Bochum',
      FR: 'https://fr.wikipedia.org/wiki/Bochum',
      ES: 'https://es.wikipedia.org/wiki/Bochum',
      PL: 'https://pl.wikipedia.org/wiki/Bochum',
      RU: 'https://ru.wikipedia.org/wiki/Бохум',
      AR: 'https://ar.wikipedia.org/wiki/بوخوم',
      NL: 'https://nl.wikipedia.org/wiki/Bochum'
    },
    'Gelsenkirchen': {
      DE: 'https://de.wikipedia.org/wiki/Gelsenkirchen',
      EN: 'https://en.wikipedia.org/wiki/Gelsenkirchen',
      TR: 'https://tr.wikipedia.org/wiki/Gelsenkirchen',
      IT: 'https://it.wikipedia.org/wiki/Gelsenkirchen',
      FR: 'https://fr.wikipedia.org/wiki/Gelsenkirchen',
      ES: 'https://es.wikipedia.org/wiki/Gelsenkirchen',
      PL: 'https://pl.wikipedia.org/wiki/Gelsenkirchen',
      RU: 'https://ru.wikipedia.org/wiki/Гельзенкирхен',
      AR: 'https://ar.wikipedia.org/wiki/غيلزنكيرشن',
      NL: 'https://nl.wikipedia.org/wiki/Gelsenkirchen'
    },
    'Oberhausen': {
      DE: 'https://de.wikipedia.org/wiki/Oberhausen',
      EN: 'https://en.wikipedia.org/wiki/Oberhausen',
      TR: 'https://tr.wikipedia.org/wiki/Oberhausen',
      IT: 'https://it.wikipedia.org/wiki/Oberhausen',
      FR: 'https://fr.wikipedia.org/wiki/Oberhausen',
      ES: 'https://es.wikipedia.org/wiki/Oberhausen',
      PL: 'https://pl.wikipedia.org/wiki/Oberhausen',
      RU: 'https://ru.wikipedia.org/wiki/Оберхаузен',
      AR: 'https://ar.wikipedia.org/wiki/أوبرهاوزن',
      NL: 'https://nl.wikipedia.org/wiki/Oberhausen'
    },
    'Bottrop': {
      DE: 'https://de.wikipedia.org/wiki/Bottrop',
      EN: 'https://en.wikipedia.org/wiki/Bottrop',
      TR: 'https://tr.wikipedia.org/wiki/Bottrop',
      IT: 'https://it.wikipedia.org/wiki/Bottrop',
      FR: 'https://fr.wikipedia.org/wiki/Bottrop',
      ES: 'https://es.wikipedia.org/wiki/Bottrop',
      PL: 'https://pl.wikipedia.org/wiki/Bottrop',
      RU: 'https://ru.wikipedia.org/wiki/Боттроп',
      AR: 'https://ar.wikipedia.org/wiki/بوتروب',
      NL: 'https://nl.wikipedia.org/wiki/Bottrop'
    },
    'Herne': {
      DE: 'https://de.wikipedia.org/wiki/Herne',
      EN: 'https://en.wikipedia.org/wiki/Herne,_North_Rhine-Westphalia',
      TR: 'https://tr.wikipedia.org/wiki/Herne',
      IT: 'https://it.wikipedia.org/wiki/Herne_(Germania)',
      FR: 'https://fr.wikipedia.org/wiki/Herne_(Allemagne)',
      ES: 'https://es.wikipedia.org/wiki/Herne_(Alemania)',
      PL: 'https://pl.wikipedia.org/wiki/Herne',
      RU: 'https://ru.wikipedia.org/wiki/Херне',
      AR: 'https://ar.wikipedia.org/wiki/هيرنه',
      NL: 'https://nl.wikipedia.org/wiki/Herne_(Duitsland)'
    },
    'Moers': {
      DE: 'https://de.wikipedia.org/wiki/Moers',
      EN: 'https://en.wikipedia.org/wiki/Moers',
      TR: 'https://tr.wikipedia.org/wiki/Moers',
      IT: 'https://it.wikipedia.org/wiki/Moers',
      FR: 'https://fr.wikipedia.org/wiki/Moers',
      ES: 'https://es.wikipedia.org/wiki/Moers',
      PL: 'https://pl.wikipedia.org/wiki/Moers',
      RU: 'https://ru.wikipedia.org/wiki/Мёрс',
      AR: 'https://ar.wikipedia.org/wiki/موئرس',
      NL: 'https://nl.wikipedia.org/wiki/Moers'
    },
    'Mülheim an der Ruhr': {
      DE: 'https://de.wikipedia.org/wiki/Mülheim_an_der_Ruhr',
      EN: 'https://en.wikipedia.org/wiki/Mülheim',
      TR: 'https://tr.wikipedia.org/wiki/Mülheim_an_der_Ruhr',
      IT: 'https://it.wikipedia.org/wiki/Mülheim_an_der_Ruhr',
      FR: 'https://fr.wikipedia.org/wiki/Mülheim_an_der_Ruhr',
      ES: 'https://es.wikipedia.org/wiki/Mülheim_an_der_Ruhr',
      PL: 'https://pl.wikipedia.org/wiki/Mülheim_an_der_Ruhr',
      RU: 'https://ru.wikipedia.org/wiki/Мюльхайм-на-Руре',
      AR: 'https://ar.wikipedia.org/wiki/مولهايم_أن_در_رور',
      NL: 'https://nl.wikipedia.org/wiki/Mülheim_an_der_Ruhr'
    },
    'Hattingen': {
      DE: 'https://de.wikipedia.org/wiki/Hattingen',
      EN: 'https://en.wikipedia.org/wiki/Hattingen',
      TR: 'https://tr.wikipedia.org/wiki/Hattingen',
      IT: 'https://it.wikipedia.org/wiki/Hattingen',
      FR: 'https://fr.wikipedia.org/wiki/Hattingen',
      ES: 'https://es.wikipedia.org/wiki/Hattingen',
      PL: 'https://pl.wikipedia.org/wiki/Hattingen',
      RU: 'https://ru.wikipedia.org/wiki/Хаттинген',
      AR: 'https://ar.wikipedia.org/wiki/هاتينغن',
      NL: 'https://nl.wikipedia.org/wiki/Hattingen'
    },
    'Recklinghausen': {
      DE: 'https://de.wikipedia.org/wiki/Recklinghausen',
      EN: 'https://en.wikipedia.org/wiki/Recklinghausen',
      TR: 'https://tr.wikipedia.org/wiki/Recklinghausen',
      IT: 'https://it.wikipedia.org/wiki/Recklinghausen',
      FR: 'https://fr.wikipedia.org/wiki/Recklinghausen',
      ES: 'https://es.wikipedia.org/wiki/Recklinghausen',
      PL: 'https://pl.wikipedia.org/wiki/Recklinghausen',
      RU: 'https://ru.wikipedia.org/wiki/Реклингхаузен',
      AR: 'https://ar.wikipedia.org/wiki/ريكلنغهاوزن',
      NL: 'https://nl.wikipedia.org/wiki/Recklinghausen'
    }
  }

  // Funktion zum Abrufen der Wikipedia-URL
  const getWikipediaLink = (cityName) => {
    const cityData = cityWikipediaLinks[cityName]
    if (!cityData) return '#'
    return cityData[selectedLanguage] || cityData.DE || '#'
  }

  // Funktion für lokalisierten Tooltip-Text
  const getTooltipText = (cityName) => {
    const template = lang.learnMore || "Mehr über {city} erfahren"
    return template.replace('{city}', cityName)
  }

  const translations = {
    DE: {
      title: "Melting Pott",
      subtitle: "Dein Guide für Events im Ruhrgebiet. Entdecke die Kultur und Geschichte des Ruhrpotts.",
      cities: "Ruhrgebietsstädte",
      socialMedia: "Social Media",
      copyright: "Alle Rechte vorbehalten.",
      learnMore: "Mehr über {city} erfahren"
    },
    EN: {
      title: "Melting Pott",
      subtitle: "Your guide for events in the Ruhr area. Discover the culture and history of the Ruhrpott.",
      cities: "Ruhr Area Cities",
      socialMedia: "Social Media",
      copyright: "All rights reserved.",
      learnMore: "Learn more about {city}"
    },
    TR: {
      title: "Melting Pott",
      subtitle: "Ruhr bölgesindeki etkinlikler için rehberiniz. Ruhrpott'un kültürünü ve tarihini keşfedin.",
      cities: "Ruhr Bölgesi Şehirleri",
      socialMedia: "Sosyal Medya",
      copyright: "Tüm hakları saklıdır.",
      learnMore: "{city} hakkında daha fazla bilgi edinin"
    },
    IT: {
      title: "Melting Pott",
      subtitle: "La tua guida per gli eventi nella regione della Ruhr. Scopri la cultura e la storia del Ruhrpott.",
      cities: "Città della Ruhr",
      socialMedia: "Social Media",
      copyright: "Tutti i diritti riservati.",
      learnMore: "Scopri di più su {city}"
    },
    FR: {
      title: "Melting Pott",
      subtitle: "Votre guide pour les événements dans la région de la Ruhr. Découvrez la culture et l'histoire du Ruhrpott.",
      cities: "Villes de la Ruhr",
      socialMedia: "Médias Sociaux",
      copyright: "Tous droits réservés.",
      learnMore: "En savoir plus sur {city}"
    },
    ES: {
      title: "Melting Pott",
      subtitle: "Tu guía para eventos en la región del Ruhr. Descubre la cultura e historia del Ruhrpott.",
      cities: "Ciudades del Ruhr",
      socialMedia: "Redes Sociales",
      copyright: "Todos los derechos reservados.",
      learnMore: "Conoce más sobre {city}"
    },
    PL: {
      title: "Melting Pott",
      subtitle: "Twój przewodnik po wydarzeniach w regionie Ruhry. Odkryj kulturę i historię Ruhrpott.",
      cities: "Miasta Zagłębia Ruhry",
      socialMedia: "Media Społecznościowe",
      copyright: "Wszelkie prawa zastrzeżone.",
      learnMore: "Dowiedz się więcej o {city}"
    },
    RU: {
      title: "Melting Pott",
      subtitle: "Ваш гид по событиям в Рурской области. Откройте культуру и историю Рурпотта.",
      cities: "Города Рурской области",
      socialMedia: "Социальные сети",
      copyright: "Все права защищены.",
      learnMore: "Узнать больше о {city}"
    },
    AR: {
      title: "Melting Pott",
      subtitle: "دليلك للأحداث في منطقة الرور. اكتشف ثقافة وتاريخ الرورپوت.",
      cities: "مدن منطقة الرور",
      socialMedia: "وسائل التواصل الاجتماعي",
      copyright: "جميع الحقوق محفوظة.",
      learnMore: "تعرف على المزيد حول {city}"
    },
    NL: {
      title: "Melting Pott",
      subtitle: "Jouw gids voor evenementen in het Ruhrgebied. Ontdek de cultuur en geschiedenis van het Ruhrpott.",
      cities: "Ruhrgebied Steden",
      socialMedia: "Sociale Media",
      copyright: "Alle rechten voorbehouden.",
      learnMore: "Leer meer over {city}"
    }
  }

  useEffect(() => {
    setLang(translations[selectedLanguage] || translations.DE)
  }, [selectedLanguage])
  return (
    <footer 
      className="text-gray-400 py-12 relative -mt-16"
      style={{
        backgroundImage: 'url(/src/assets/hochofen.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.3) brightness(0.8) saturate(1.5) hue-rotate(10deg)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 via-orange-900/30 to-black/80"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{lang.title || "Melting Pott"}</h3>
            <p className="text-gray-400 mb-4">
              {lang.subtitle || "Dein Guide für Events im Ruhrgebiet. Entdecke die Kultur und Geschichte des Ruhrpotts."}
            </p>
          </div>

          {/* Städte */}
          <div>
            <h4 className="font-semibold mb-4">{lang.cities || "Ruhrgebietsstädte"}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a 
                  href={getWikipediaLink('Essen')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Essen')}
                >
                  Essen
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Dortmund')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Dortmund')}
                >
                  Dortmund
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Duisburg')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Duisburg')}
                >
                  Duisburg
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Bochum')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Bochum')}
                >
                  Bochum
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Gelsenkirchen')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Gelsenkirchen')}
                >
                  Gelsenkirchen
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Oberhausen')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Oberhausen')}
                >
                  Oberhausen
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-transparent">.</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a 
                  href={getWikipediaLink('Bottrop')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Bottrop')}
                >
                  Bottrop
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Herne')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Herne')}
                >
                  Herne
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Moers')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Moers')}
                >
                  Moers
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Mülheim an der Ruhr')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Mülheim an der Ruhr')}
                >
                  Mülheim an der Ruhr
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Hattingen')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Hattingen')}
                >
                  Hattingen
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href={getWikipediaLink('Recklinghausen')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-orange-400 transition-colors flex items-center group"
                  title={getTooltipText('Recklinghausen')}
                >
                  Recklinghausen
                  <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">{lang.socialMedia || "Social Media"}</h4>
            <div className="grid grid-cols-4 gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Melting Pott. {lang.copyright || "Alle Rechte vorbehalten."}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
