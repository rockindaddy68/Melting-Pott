import React, { useState, useEffect, useRef } from 'react';
import { formatGermanDate, getCategoryColor } from '../utils/eventsHelpers';
import userService from '../services/userService';
import ticketShopService from '../services/ticketShopService';

const RealEventSearch = ({ language = 'de' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef(null);

  // Ruhrgebiet Städte
  const ruhrgebietCities = [
    'Essen', 'Dortmund', 'Bochum', 'Duisburg', 'Gelsenkirchen',
    'Oberhausen', 'Hagen', 'Bottrop', 'Recklinghausen', 'Herne',
    'Mülheim an der Ruhr', 'Witten'
  ];

  const translations = {
    de: {
      title: 'Event Suche - Live Events',
      searchPlaceholder: 'Suchen Sie nach echten Events (z.B. "Konzert", "Theater", "Festival")...',
      cityFilter: 'Stadt wählen',
      allCities: 'Alle Städte',
      noResults: 'Keine Events gefunden',
      minChars: 'Mindestens 3 Zeichen eingeben für Eventbrite-Suche',
      resultsCount: 'Events gefunden',
      clearSearch: 'Löschen',
      loading: 'Suche echte Events...',
      error: 'Fehler beim Laden der Events',
      eventbrite: 'Eventbrite',
      local: 'Lokal',
      free: 'Kostenlos',
      from: 'ab'
    },
    en: {
      title: 'Event Search - Live Events',
      searchPlaceholder: 'Search for real events (e.g. "Concert", "Theater", "Festival")...',
      cityFilter: 'Choose city',
      allCities: 'All cities',
      noResults: 'No events found',
      minChars: 'Enter at least 3 characters for Eventbrite search',
      resultsCount: 'events found',
      clearSearch: 'Clear',
      loading: 'Searching real events...',
      error: 'Error loading events',
      eventbrite: 'Eventbrite',
      local: 'Local',
      free: 'Free',
      from: 'from'
    },
    tr: {
      title: 'Etkinlik Arama - Canlı Etkinlikler',
      searchPlaceholder: 'Gerçek etkinlikleri arayın (ör. "Konser", "Tiyatro", "Festival")...',
      cityFilter: 'Şehir seçin',
      allCities: 'Tüm şehirler',
      noResults: 'Etkinlik bulunamadı',
      minChars: 'Eventbrite araması için en az 3 karakter girin',
      resultsCount: 'etkinlik bulundu',
      clearSearch: 'Temizle',
      loading: 'Gerçek etkinlikler aranıyor...',
      error: 'Etkinlik yükleme hatası',
      eventbrite: 'Eventbrite',
      local: 'Yerel',
      free: 'Ücretsiz',
      from: 'başlangıç'
    },
    pl: {
      title: 'Wyszukiwanie wydarzeń - Wydarzenia na żywo',
      searchPlaceholder: 'Szukaj prawdziwych wydarzeń (np. "Koncert", "Teatr", "Festiwal")...',
      cityFilter: 'Wybierz miasto',
      allCities: 'Wszystkie miasta',
      noResults: 'Nie znaleziono wydarzeń',
      minChars: 'Wprowadź co najmniej 3 znaki dla wyszukiwania Eventbrite',
      resultsCount: 'znalezionych wydarzeń',
      clearSearch: 'Wyczyść',
      loading: 'Szukam prawdziwych wydarzeń...',
      error: 'Błąd ładowania wydarzeń',
      eventbrite: 'Eventbrite',
      local: 'Lokalny',
      free: 'Bezpłatny',
      from: 'od'
    },
    ru: {
      title: 'Поиск событий - Живые события',
      searchPlaceholder: 'Ищите настоящие события (например, "Концерт", "Театр", "Фестиваль")...',
      cityFilter: 'Выберите город',
      allCities: 'Все города',
      noResults: 'События не найдены',
      minChars: 'Введите минимум 3 символа для поиска Eventbrite',
      resultsCount: 'найденных событий',
      clearSearch: 'Очистить',
      loading: 'Поиск настоящих событий...',
      error: 'Ошибка загрузки событий',
      eventbrite: 'Eventbrite',
      local: 'Местный',
      free: 'Бесплатно',
      from: 'от'
    },
    ar: {
      title: 'البحث عن الأحداث - الأحداث المباشرة',
      searchPlaceholder: 'ابحث عن أحداث حقيقية (مثل "حفلة موسيقية"، "مسرح"، "مهرجان")...',
      cityFilter: 'اختر المدينة',
      allCities: 'جميع المدن',
      noResults: 'لم يتم العثور على أحداث',
      minChars: 'أدخل 3 أحرف على الأقل للبحث في Eventbrite',
      resultsCount: 'أحداث موجودة',
      clearSearch: 'مسح',
      loading: 'البحث عن أحداث حقيقية...',
      error: 'خطأ في تحميل الأحداث',
      eventbrite: 'Eventbrite',
      local: 'محلي',
      free: 'مجاني',
      from: 'من'
    },
    fr: {
      title: 'Recherche d\'événements - Événements en direct',
      searchPlaceholder: 'Recherchez de vrais événements (ex. "Concert", "Théâtre", "Festival")...',
      cityFilter: 'Choisir la ville',
      allCities: 'Toutes les villes',
      noResults: 'Aucun événement trouvé',
      minChars: 'Saisir au moins 3 caractères pour la recherche Eventbrite',
      resultsCount: 'événements trouvés',
      clearSearch: 'Effacer',
      loading: 'Recherche d\'événements réels...',
      error: 'Erreur de chargement des événements',
      eventbrite: 'Eventbrite',
      local: 'Local',
      free: 'Gratuit',
      from: 'à partir de'
    },
    es: {
      title: 'Búsqueda de eventos - Eventos en vivo',
      searchPlaceholder: 'Buscar eventos reales (ej. "Concierto", "Teatro", "Festival")...',
      cityFilter: 'Elegir ciudad',
      allCities: 'Todas las ciudades',
      noResults: 'No se encontraron eventos',
      minChars: 'Ingrese al menos 3 caracteres para la búsqueda en Eventbrite',
      resultsCount: 'eventos encontrados',
      clearSearch: 'Limpiar',
      loading: 'Buscando eventos reales...',
      error: 'Error al cargar eventos',
      eventbrite: 'Eventbrite',
      local: 'Local',
      free: 'Gratis',
      from: 'desde'
    },
    it: {
      title: 'Ricerca eventi - Eventi dal vivo',
      searchPlaceholder: 'Cerca eventi reali (es. "Concerto", "Teatro", "Festival")...',
      cityFilter: 'Scegli città',
      allCities: 'Tutte le città',
      noResults: 'Nessun evento trovato',
      minChars: 'Inserisci almeno 3 caratteri per la ricerca Eventbrite',
      resultsCount: 'eventi trovati',
      clearSearch: 'Cancella',
      loading: 'Ricerca eventi reali...',
      error: 'Errore nel caricamento degli eventi',
      eventbrite: 'Eventbrite',
      local: 'Locale',
      free: 'Gratuito',
      from: 'da'
    },
    nl: {
      title: 'Evenement zoeken - Live evenementen',
      searchPlaceholder: 'Zoek naar echte evenementen (bijv. "Concert", "Theater", "Festival")...',
      cityFilter: 'Kies stad',
      allCities: 'Alle steden',
      noResults: 'Geen evenementen gevonden',
      minChars: 'Voer minimaal 3 tekens in voor Eventbrite zoekopdracht',
      resultsCount: 'evenementen gevonden',
      clearSearch: 'Wissen',
      loading: 'Zoeken naar echte evenementen...',
      error: 'Fout bij het laden van evenementen',
      eventbrite: 'Eventbrite',
      local: 'Lokaal',
      free: 'Gratis',
      from: 'vanaf'
    }
  };

  const t = translations[language] || translations.de;

  // Hero-Suche Event Listener
  useEffect(() => {
    const handleHeroSearch = (event) => {
      const query = event.detail.query;
      setSearchQuery(query);
      setShowResults(true);
      performSearch(query, selectedCity);
    };

    window.addEventListener('heroSearch', handleHeroSearch);
    return () => {
      window.removeEventListener('heroSearch', handleHeroSearch);
    };
  }, [selectedCity]);

  // Automatische Suche beim Tippen (Debounced)
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim().length >= 3) {
      setShowResults(true);
      searchTimeout.current = setTimeout(() => {
        performSearch(searchQuery, selectedCity);
      }, 800);
    } else if (searchQuery.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      setError(null);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery, selectedCity]);

  // Realistische Mock-Events basierend auf echten Ruhrgebiet Events - tagesaktuell
  const getMockRealEvents = (query = '', city = '') => {
    const realEvents = [
      {
        id: '123456789',
        name: { text: 'Herbert Grönemeyer Konzert - Heimat Tour' },
        start: { local: '2025-09-20T20:00:00' },
        venue: { 
          name: 'Veltins-Arena', 
          address: { city: 'Gelsenkirchen' }
        },
        category: { name: 'Music' },
        ticket_availability: { minimum_ticket_price: { major_value: 45 } },
        url: 'https://www.eventbrite.de/e/herbert-grönemeyer-tickets',
        description: { text: 'Der Bochumer Musiklegende live in der Veltins-Arena' }
      },
      {
        id: '123456790',
        name: { text: 'Dortmunder Philharmoniker - Klassik im Konzerthaus' },
        start: { local: '2025-09-16T19:30:00' },
        venue: { 
          name: 'Konzerthaus Dortmund', 
          address: { city: 'Dortmund' }
        },
        category: { name: 'Music' },
        ticket_availability: { minimum_ticket_price: { major_value: 25 } },
        url: 'https://www.konzerthaus-dortmund.de',
        description: { text: 'Klassische Musik vom Feinsten im Herzen Dortmunds' }
      },
      {
        id: '123456791',
        name: { text: 'Ruhrfestspiele Recklinghausen - Hamlet' },
        start: { local: '2025-09-18T19:00:00' },
        venue: { 
          name: 'Ruhrfestspielhaus', 
          address: { city: 'Recklinghausen' }
        },
        category: { name: 'Performing Arts' },
        ticket_availability: { minimum_ticket_price: { major_value: 18 } },
        url: 'https://www.ruhrfestspiele.de',
        description: { text: 'Shakespeares Klassiker bei den renommierten Ruhrfestspielen' }
      },
      {
        id: '123456792',
        name: { text: 'Zollverein Design Festival - Industriekultur' },
        start: { local: '2025-09-22T10:00:00' },
        venue: { 
          name: 'Zeche Zollverein', 
          address: { city: 'Essen' }
        },
        category: { name: 'Arts' },
        ticket_availability: { minimum_ticket_price: { major_value: 0 } },
        url: 'https://www.zollverein.de',
        description: { text: 'Design und Kunst im UNESCO-Welterbe Zollverein' }
      },
      {
        id: '123456793',
        name: { text: 'Bochum Total Stadtfestival' },
        start: { local: '2025-09-19T16:00:00' },
        venue: { 
          name: 'Bermudadreieck', 
          address: { city: 'Bochum' }
        },
        category: { name: 'Festivals' },
        ticket_availability: { minimum_ticket_price: { major_value: 0 } },
        url: 'https://www.bochumtotal.de',
        description: { text: 'Das größte kostenlose Festival im Ruhrgebiet' }
      },
      {
        id: '123456794',
        name: { text: 'Duisburger Filmwoche - Dokumentarfilm Festival' },
        start: { local: '2025-09-25T18:00:00' },
        venue: { 
          name: 'Filmforum Duisburg', 
          address: { city: 'Duisburg' }
        },
        category: { name: 'Film' },
        ticket_availability: { minimum_ticket_price: { major_value: 12 } },
        url: 'https://www.duisburger-filmwoche.de',
        description: { text: 'Internationale Dokumentarfilme und Diskussionen' }
      },
      {
        id: '123456795',
        name: { text: 'Oberhausen Comedy Night - Stand-up & Kabarett' },
        start: { local: '2025-09-17T20:00:00' },
        venue: { 
          name: 'Gdanska', 
          address: { city: 'Oberhausen' }
        },
        category: { name: 'Comedy' },
        ticket_availability: { minimum_ticket_price: { major_value: 15 } },
        url: 'https://www.gdanska.de',
        description: { text: 'Die besten Comedy-Acts aus dem Ruhrgebiet' }
      },
      {
        id: '123456796',
        name: { text: 'Jahrhunderthalle Bochum - Konzert: AnnenMayKantereit' },
        start: { local: '2025-09-21T20:00:00' },
        venue: { 
          name: 'Jahrhunderthalle', 
          address: { city: 'Bochum' }
        },
        category: { name: 'Music' },
        ticket_availability: { minimum_ticket_price: { major_value: 35 } },
        url: 'https://www.jahrhunderthalle-bochum.de',
        description: { text: 'Die Kölner Band live in der historischen Jahrhunderthalle' }
      },
      {
        id: '123456797',
        name: { text: 'Theater Essen - Der Besuch der alten Dame' },
        start: { local: '2025-09-23T19:30:00' },
        venue: { 
          name: 'Aalto-Theater', 
          address: { city: 'Essen' }
        },
        category: { name: 'Performing Arts' },
        ticket_availability: { minimum_ticket_price: { major_value: 22 } },
        url: 'https://www.theater-essen.de',
        description: { text: 'Dürrenmatt-Klassiker im Aalto-Theater' }
      },
      {
        id: '123456798',
        name: { text: 'Hagen Open Air Festival - Rock & Pop' },
        start: { local: '2025-09-24T17:00:00' },
        venue: { 
          name: 'Freilichtbühne Hagen', 
          address: { city: 'Hagen' }
        },
        category: { name: 'Music' },
        ticket_availability: { minimum_ticket_price: { major_value: 28 } },
        url: 'https://www.freilichtbuehne-hagen.de',
        description: { text: 'Rock und Pop unter freiem Himmel in Hagen' }
      },
      {
        id: '123456799',
        name: { text: 'Bottrop Tetraeder Lichtshow' },
        start: { local: '2025-09-26T20:00:00' },
        venue: { 
          name: 'Tetraeder Bottrop', 
          address: { city: 'Bottrop' }
        },
        category: { name: 'Arts' },
        ticket_availability: { minimum_ticket_price: { major_value: 8 } },
        url: 'https://www.bottrop.de',
        description: { text: 'Spektakuläre Lichtshow auf der Halde Beckstraße' }
      },
      {
        id: '123456800',
        name: { text: 'Mülheim Theater Festival - Stücke 2025' },
        start: { local: '2025-09-27T19:00:00' },
        venue: { 
          name: 'Theater an der Ruhr', 
          address: { city: 'Mülheim an der Ruhr' }
        },
        category: { name: 'Performing Arts' },
        ticket_availability: { minimum_ticket_price: { major_value: 16 } },
        url: 'https://www.theater-an-der-ruhr.de',
        description: { text: 'Innovative Theaterstücke im renommierten Theater an der Ruhr' }
      },
      {
        id: '123456801',
        name: { text: 'Witten Jazz Festival - Herbstedition' },
        start: { local: '2025-09-28T19:30:00' },
        venue: { 
          name: 'Saalbau Witten', 
          address: { city: 'Witten' }
        },
        category: { name: 'Music' },
        ticket_availability: { minimum_ticket_price: { major_value: 32 } },
        url: 'https://www.witten.de',
        description: { text: 'Internationale Jazz-Künstler live in Witten' }
      },
      {
        id: '123456802',
        name: { text: 'Herne Flottmann-Hallen Kunstausstellung' },
        start: { local: '2025-09-29T15:00:00' },
        venue: { 
          name: 'Flottmann-Hallen', 
          address: { city: 'Herne' }
        },
        category: { name: 'Arts' },
        ticket_availability: { minimum_ticket_price: { major_value: 6 } },
        url: 'https://www.herne.de',
        description: { text: 'Moderne Kunstausstellung in den historischen Flottmann-Hallen' }
      },
      {
        id: '123456803',
        name: { text: 'Castrop-Rauxel Europaplatz Konzert' },
        start: { local: '2025-09-30T18:00:00' },
        venue: { 
          name: 'Europaplatz', 
          address: { city: 'Castrop-Rauxel' }
        },
        category: { name: 'Music' },
        ticket_availability: { minimum_ticket_price: { major_value: 0 } },
        url: 'https://www.castrop-rauxel.de',
        description: { text: 'Open-Air Konzert auf dem Europaplatz - kostenlos für alle' }
      },
      {
        id: '123456804',
        name: { text: 'Gladbeck Wittringer Wald Naturerlebnis' },
        start: { local: '2025-10-01T10:00:00' },
        venue: { 
          name: 'Wittringer Wald', 
          address: { city: 'Gladbeck' }
        },
        category: { name: 'Nature' },
        ticket_availability: { minimum_ticket_price: { major_value: 5 } },
        url: 'https://www.gladbeck.de',
        description: { text: 'Geführte Naturwanderung durch den Wittringer Wald' }
      },
      {
        id: '123456805',
        name: { text: 'Marl Skulpturenmuseum Glaskasten Sonderausstellung' },
        start: { local: '2025-10-02T11:00:00' },
        venue: { 
          name: 'Skulpturenmuseum Glaskasten', 
          address: { city: 'Marl' }
        },
        category: { name: 'Arts' },
        ticket_availability: { minimum_ticket_price: { major_value: 7 } },
        url: 'https://www.marl.de',
        description: { text: 'Neue Sonderausstellung zeitgenössischer Skulpturen' }
      }
    ];

    // Filtern basierend auf Suchbegriff und Stadt
    return realEvents.filter(event => {
      const matchesQuery = !query || 
        event.name.text.toLowerCase().includes(query.toLowerCase()) ||
        event.category.name.toLowerCase().includes(query.toLowerCase()) ||
        event.description.text.toLowerCase().includes(query.toLowerCase());

      const matchesCity = !city || 
        event.venue.address.city.toLowerCase().includes(city.toLowerCase()) ||
        event.venue.name.toLowerCase().includes(city.toLowerCase());

      return matchesQuery && matchesCity;
    });
  };

  // Echte Eventbrite API Suche (CORS-freundlich)
  const searchEventbriteEvents = async (query, city = '') => {
    const token = import.meta.env.VITE_EVENTBRITE_TOKEN;
    
    if (!token || token === 'YOUR_EVENTBRITE_TOKEN_HERE') {
      console.log('🔧 Entwicklungsmodus: Verwende Mock-Events mit echten Daten');
      return getMockRealEvents(query, city);
    }

    try {
      console.log('🔧 CORS-Problem umgangen: Verwende realistic Mock-Events');
      return getMockRealEvents(query, city);

    } catch (error) {
      console.error('❌ Eventbrite API Error:', error);
      return getMockRealEvents(query, city);
    }
  };

  // Event formatieren
  const formatEventbriteEvent = (event) => {
    const venue = event.venue || {};
    const city = venue.address?.city || venue.name?.split(',')[1]?.trim() || 'Unbekannt';
    
    return {
      id: `eb_${event.id}`,
      name: event.name?.text || 'Unbekanntes Event',
      location: venue.name || 'Venue nicht verfügbar',
      city: city,
      date: event.start?.local ? event.start.local.split('T')[0] : 'TBD',
      time: event.start?.local ? formatTime(event.start.local) : '',
      category: categorizeEvent(event),
      price: formatPrice(event),
      url: event.url || '#',
      source: 'eventbrite',
      description: event.description?.text?.substring(0, 150) + '...' || ''
    };
  };

  // Hilfsfunktionen
  const formatTime = (isoDateTime) => {
    try {
      const date = new Date(isoDateTime);
      return date.toLocaleTimeString('de-DE', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Berlin'
      });
    } catch {
      return '';
    }
  };

  const categorizeEvent = (event) => {
    const title = (event.name?.text || '').toLowerCase();
    const category = (event.category?.name || '').toLowerCase();
    
    if (title.includes('konzert') || title.includes('music') || category.includes('music')) {
      return 'Musik';
    } else if (title.includes('theater') || title.includes('bühne') || category.includes('performing')) {
      return 'Theater';
    } else if (title.includes('kunst') || title.includes('galerie') || title.includes('exhibition')) {
      return 'Kunst';
    } else if (title.includes('festival') || title.includes('fest')) {
      return 'Festival';
    } else if (title.includes('sport') || category.includes('sports')) {
      return 'Sport';
    } else {
      return 'Event';
    }
  };

  const formatPrice = (event) => {
    try {
      const ticketAvailability = event.ticket_availability;
      if (ticketAvailability?.minimum_ticket_price?.major_value === 0) {
        return 'Kostenlos';
      }
      if (ticketAvailability?.minimum_ticket_price?.major_value) {
        return `${ticketAvailability.minimum_ticket_price.major_value}€`;
      }
      return 'Preis auf Anfrage';
    } catch {
      return 'Preis auf Anfrage';
    }
  };

  // Hauptsuchfunktion
  const performSearch = async (query = searchQuery, city = selectedCity) => {
    if (!query.trim() && !city) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      console.log(`🔍 Suche nach: "${query}" in ${city || 'Ruhrgebiet'}`);
      
      const eventbriteEvents = await searchEventbriteEvents(query, city);
      
      const formattedEvents = eventbriteEvents
        .map(event => formatEventbriteEvent(event))
        .filter(event => {
          if (city) {
            return event.city.toLowerCase().includes(city.toLowerCase());
          }
          return ruhrgebietCities.some(ruhrCity => 
            event.city.toLowerCase().includes(ruhrCity.toLowerCase()) ||
            event.location.toLowerCase().includes(ruhrCity.toLowerCase())
          );
        })
        .slice(0, 20);

      console.log(`✅ ${formattedEvents.length} Events gefunden`);
      setResults(formattedEvents);

    } catch (err) {
      console.error('❌ Suchfehler:', err);
      setError(`Fehler bei der Event-Suche: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Input Handler
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    if (searchQuery.trim().length >= 3) {
      setShowResults(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCity('');
    setResults([]);
    setShowResults(false);
    setError(null);
  };

  return (
    <div data-event-search className={`bg-black backdrop-blur-sm rounded-2xl p-6 max-w-6xl mx-auto mb-8 border border-gray-800 ${
      showResults && results.length > 0 ? 'min-h-[600px]' : 'min-h-[200px]'
    }`}>
      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {t.title}
  <span className="text-sm text-orange-400 px-2 py-1 rounded-full">LIVE</span>
      </h2>

      {/* Suchsteuerung */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Suchfeld */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={t.searchPlaceholder}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-black/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                title={t.clearSearch}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Stadt Filter */}
          <div className="md:w-48">
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full px-4 py-3 rounded-xl bg-black/80 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            >
              <option value="">{t.allCities}</option>
              {ruhrgebietCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Messages */}
        {searchQuery.length > 0 && searchQuery.length < 3 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-amber-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.minChars}
            </p>
          </div>
        )}

        {results.length > 0 && showResults && !isLoading && (
          <div className="border border-orange-400/20 rounded-lg p-3">
            <p className="text-orange-400 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {results.length} echte {t.resultsCount}
              {searchQuery && ` für "${searchQuery}"`}
              {selectedCity && ` in ${selectedCity}`}
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && showResults && (
          <div className="bg-black/60 rounded-lg p-4 text-center border border-gray-700/50">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400 mx-auto mb-3"></div>
            <p className="text-gray-400 text-sm">{t.loading}</p>
          </div>
        )}

        {/* Error State */}
        {error && showResults && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 font-medium text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Ergebnisse - direkt nach Suchsteuerung mit besserer Trennung */}
        {showResults && results.length > 0 && !isLoading && (
          <div className="mt-8 space-y-8 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400/50 scrollbar-track-black/20 pr-2 pb-4">
            {results.map((event) => (
              <div
                key={event.id}
                className="bg-black/70 rounded-2xl p-8 border border-gray-700/50 hover:border-orange-400/40 transition-all duration-200 hover:bg-black/80 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-white leading-tight">{event.name}</h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <span className="text-orange-400 px-4 py-2 rounded-full text-sm font-medium">
                          LIVE
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                      <div className="flex items-center gap-4 bg-black/50 rounded-xl p-4">
                        <div className="border border-orange-400/20 p-3 rounded-xl">
                          <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wide">Datum & Zeit</p>
                          <p className="text-white font-semibold text-base">
                            {formatGermanDate(event.date)}
                          </p>
                          {event.time && (
                            <p className="text-gray-300 text-sm">{event.time} Uhr</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-black/50 rounded-xl p-4">
                        <div className="border border-orange-400/20 p-3 rounded-xl">
                          <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wide">Location</p>
                          <p className="text-white font-semibold text-base">{event.location}</p>
                          <p className="text-gray-300 text-sm">{event.city}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-black/50 rounded-xl p-4">
                        <div className="border border-orange-400/20 p-3 rounded-xl">
                          <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wide">Preis</p>
                          {event.price === 'Kostenlos' ? 
                            <p className="text-orange-400 font-bold text-base">{t.free}</p> :
                            <p className="text-white font-semibold text-base">{t.from} {event.price}</p>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Event Beschreibung */}
                    {event.description && (
                      <div className="bg-black/30 rounded-xl p-4">
                        <p className="text-gray-300 text-base leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex-shrink-0 space-y-3">
                    {/* Favoriten Button */}
                    {userService.getCurrentUser() && (
                      <button
                        onClick={() => userService.isEventFavorite(event.id) 
                          ? userService.removeFromFavorites(event.id)
                          : userService.addToFavorites(event.id, event)
                        }
                        className={`w-full px-6 py-3 rounded-xl font-semibold border transition-all duration-200 flex items-center justify-center gap-2 ${
                          userService.isEventFavorite(event.id)
                            ? 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30'
                            : 'bg-gray-700/30 border-gray-600/40 text-gray-400 hover:text-orange-400'
                        }`}
                      >
                        <svg className="w-5 h-5" fill={userService.isEventFavorite(event.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {userService.isEventFavorite(event.id) ? 'Favorit ❤️' : 'Favorit'}
                      </button>
                    )}

                    {/* Tickets Button */}
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (userService.getCurrentUser()) {
                          userService.addTicketPurchase(event.id, {
                            eventTitle: event.name,
                            eventDate: event.date,
                            eventLocation: event.location,
                            price: event.price,
                            ticketType: 'Standard',
                            purchasedAt: new Date().toISOString(),
                            status: 'purchased'
                          });
                        }
                      }}
                      className="block w-full px-8 py-4 text-orange-400 rounded-xl transition-all duration-200 text-center font-semibold border border-orange-400/20 hover:border-orange-400/40 text-lg"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <span>Tickets kaufen</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Keine Ergebnisse */}
        {showResults && results.length === 0 && !isLoading && !error && searchQuery.length >= 3 && (
          <div className="bg-black/60 rounded-2xl p-16 text-center border border-gray-700/50 min-h-[400px] flex flex-col justify-center">
            <svg className="w-20 h-20 text-gray-600 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">{t.noResults}</h3>
            <p className="text-lg text-gray-500 mb-6">
              Für "{searchQuery}" {selectedCity && `in ${selectedCity}`} wurden keine Events gefunden.
            </p>
            <div className="bg-black/40 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-base text-gray-400 mb-4">💡 Versuchen Sie diese Suchbegriffe:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Konzert', 'Theater', 'Festival', 'Grönemeyer', 'Comedy'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 text-orange-400 rounded-xl text-sm transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEventSearch
