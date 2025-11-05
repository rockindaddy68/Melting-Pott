// === ZENTRALER ÜBERSETZUNGSSERVICE ===
// Alle Übersetzungen für die gesamte Melting-Pott Website
// Unterstützt 10 Sprachen: DE, EN, TR, PL, RU, AR, IT, NL, FR, ES

export const LANGUAGES = [
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'PL', name: 'Polski', flag: '🇵🇱' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
  { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'NL', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
];

export const TRANSLATIONS = {
  // === HEADER & NAVIGATION ===
  navigation: {
    DE: {
      events: 'Events',
      about: 'Über uns',
      contact: 'Kontakt',
      login: 'Anmelden',
      register: 'Registrieren',
      dashboard: 'Mein Bereich',
      logout: 'Abmelden',
      welcome: 'Willkommen'
    },
    EN: {
      events: 'Events',
      about: 'About us',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      dashboard: 'My Area',
      logout: 'Logout',
      welcome: 'Welcome'
    },
    TR: {
      events: 'Etkinlikler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      login: 'Giriş Yap',
      register: 'Kayıt Ol',
      dashboard: 'Benim Alanım',
      logout: 'Çıkış Yap',
      welcome: 'Hoş Geldiniz'
    },
    PL: {
      events: 'Wydarzenia',
      about: 'O nas',
      contact: 'Kontakt',
      login: 'Zaloguj',
      register: 'Zarejestruj',
      dashboard: 'Mój obszar',
      logout: 'Wyloguj',
      welcome: 'Witamy'
    },
    RU: {
      events: 'События',
      about: 'О нас',
      contact: 'Контакт',
      login: 'Войти',
      register: 'Регистрация',
      dashboard: 'Моя область',
      logout: 'Выйти',
      welcome: 'Добро пожаловать'
    },
    AR: {
      events: 'الأحداث',
      about: 'معلومات عنا',
      contact: 'اتصل',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      dashboard: 'منطقتي',
      logout: 'تسجيل الخروج',
      welcome: 'مرحبا'
    },
    IT: {
      events: 'Eventi',
      about: 'Chi siamo',
      contact: 'Contatto',
      login: 'Accedi',
      register: 'Registrati',
      dashboard: 'La mia area',
      logout: 'Esci',
      welcome: 'Benvenuti'
    },
    NL: {
      events: 'Evenementen',
      about: 'Over ons',
      contact: 'Contact',
      login: 'Inloggen',
      register: 'Registreren',
      dashboard: 'Mijn gebied',
      logout: 'Uitloggen',
      welcome: 'Welkom'
    },
    FR: {
      events: 'Événements',
      about: 'À propos',
      contact: 'Contact',
      login: 'Se connecter',
      register: 'S\'inscrire',
      dashboard: 'Mon espace',
      logout: 'Se déconnecter',
      welcome: 'Bienvenue'
    },
    ES: {
      events: 'Eventos',
      about: 'Acerca de',
      contact: 'Contacto',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      dashboard: 'Mi área',
      logout: 'Cerrar sesión',
      welcome: 'Bienvenidos'
    }
  },

  // === HERO SECTION ===
  hero: {
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
      explanation: "Melting Pott' terimi, İngilizce eritme potası kelimesi ile Ruhr bölgesi için bölgesel 'Pott' kelimesini birleştirir. 150 yıldan fazla süredir dünyanın her yerinden insanlar burada birlikte yaşar ve çalışır - Polonyalı madencilerden Türk misafir işçilere, 180'den fazla ulustan ailelere kadar."
    },
    PL: {
      title: "Melting Pott",
      subtitle: "Twój przewodnik po eventach w Zagłębiu Ruhry",
      searchPlaceholder: "Szukaj wydarzeń lub lokalizacji...",
      discoverBtn: "Odkryj",
      explanationTitle: "Co znaczy \"Melting Pott\"?",
      explanation: "Termin 'Melting Pott' łączy angielskie słowo melting pot z regionalnym 'Pott' dla Zagłębia Ruhry. Od ponad 150 lat mieszkają i pracują tu razem ludzie z całego świata - od polskich górników po tureckich robotników-gości po rodziny z ponad 180 narodów."
    },
    RU: {
      title: "Melting Pott",
      subtitle: "Ваш гид по событиям в Рурской области",
      searchPlaceholder: "Поиск событий или локаций...",
      discoverBtn: "Откройте",
      explanationTitle: "Что означает \"Melting Pott\"?",
      explanation: "Термин 'Melting Pott' сочетает английское слово melting pot с региональным 'Pott' для Рурской области. Уже более 150 лет люди со всего мира живут и работают здесь вместе - от польских шахтеров до турецких гастарбайтеров до семей из более чем 180 наций."
    },
    AR: {
      title: "Melting Pott",
      subtitle: "دليلك للأحداث في منطقة الرور",
      searchPlaceholder: "البحث عن الأحداث أو المواقع...",
      discoverBtn: "اكتشف",
      explanationTitle: "ماذا يعني \"Melting Pott\"؟",
      explanation: "يجمع مصطلح 'Melting Pott' بين الكلمة الإنجليزية melting pot و'Pott' الإقليمية لمنطقة الرور. لأكثر من 150 عامًا، يعيش ويعمل الناس من جميع أنحاء العالم معًا هنا - من عمال المناجم البولنديين إلى العمال الضيوف الأتراك إلى العائلات من أكثر من 180 دولة."
    },
    IT: {
      title: "Melting Pott",
      subtitle: "La tua guida agli eventi nella regione della Ruhr",
      searchPlaceholder: "Cerca eventi o luoghi...",
      discoverBtn: "Scopri",
      explanationTitle: "Cosa significa \"Melting Pott\"?",
      explanation: "Il termine 'Melting Pott' combina la parola inglese melting pot con il 'Pott' regionale per la regione della Ruhr. Da oltre 150 anni persone da tutto il mondo vivono e lavorano insieme qui - dai minatori polacchi ai lavoratori ospiti turchi alle famiglie di oltre 180 nazioni."
    },
    NL: {
      title: "Melting Pott",
      subtitle: "Jouw gids voor evenementen in het Ruhrgebied",
      searchPlaceholder: "Zoek evenementen of locaties...",
      discoverBtn: "Ontdek",
      explanationTitle: "Wat betekent \"Melting Pott\"?",
      explanation: "De term 'Melting Pott' combineert het Engelse woord melting pot met de regionale 'Pott' voor het Ruhrgebied. Al meer dan 150 jaar leven en werken mensen uit de hele wereld hier samen - van Poolse mijnwerkers tot Turkse gastarbeiders tot families uit meer dan 180 landen."
    },
    FR: {
      title: "Melting Pott",
      subtitle: "Votre guide pour les événements dans la région de la Ruhr",
      searchPlaceholder: "Rechercher des événements ou des lieux...",
      discoverBtn: "Découvrir",
      explanationTitle: "Que signifie \"Melting Pott\"?",
      explanation: "Le terme 'Melting Pott' combine le mot anglais melting pot avec le 'Pott' régional pour la région de la Ruhr. Depuis plus de 150 ans, des gens du monde entier vivent et travaillent ensemble ici - des mineurs polonais aux travailleurs invités turcs aux familles de plus de 180 nations."
    },
    ES: {
      title: "Melting Pott",
      subtitle: "Tu guía para eventos en la región del Ruhr",
      searchPlaceholder: "Buscar eventos o ubicaciones...",
      discoverBtn: "Descubrir",
      explanationTitle: "¿Qué significa \"Melting Pott\"?",
      explanation: "El término 'Melting Pott' combina la palabra inglesa melting pot con el 'Pott' regional para la región del Ruhr. Durante más de 150 años, personas de todo el mundo han vivido y trabajado juntas aquí - desde mineros polacos hasta trabajadores invitados turcos hasta familias de más de 180 naciones."
    }
  },

  // === HERO WELCOME BUTTONS ===
  welcomeButtons: {
    DE: 'Willkommen im Ruhrgebiet',
    EN: 'Welcome to the Ruhr Area',
    TR: 'Ruhr Bölgesine Hoş Geldiniz',
    PL: 'Witamy w Zagłębiu Ruhry',
    RU: 'Добро пожаловать в Рурскую область',
    AR: 'مرحباً بكم في منطقة الرور',
    IT: 'Benvenuti nella Ruhr',
    NL: 'Welkom in het Ruhrgebied',
    FR: 'Bienvenue dans la Ruhr',
    ES: 'Bienvenidos al Área del Ruhr'
  },

  // === EXPLANATION SECTION ===
  explanation: {
    DE: {
      title: "Was bedeutet \"Melting Pott\"?",
      text: "Der Begriff 'Melting Pott' verbindet das englische Wort 'Melting Pot' mit dem regionalen 'Pott' für das Ruhrgebiet. Seit über 150 Jahren leben und arbeiten hier Menschen aus aller Welt zusammen - von polnischen Bergleuten über türkische Gastarbeiter bis hin zu Familien aus über 180 Nationen. Diese kulturelle Vielfalt macht das Ruhrgebiet zu einem einzigartigen Schmelztiegel der Kulturen."
    },
    EN: {
      title: "What does \"Melting Pott\" mean?",
      text: "The term 'Melting Pott' combines the English word 'melting pot' with the regional 'Pott' for the Ruhr area. For over 150 years, people from all over the world have been living and working together here - from Polish miners to Turkish guest workers to families from over 180 nations. This cultural diversity makes the Ruhr area a unique melting pot of cultures."
    },
    TR: {
      title: "\"Melting Pott\" ne anlama geliyor?",
      text: "'Melting Pott' terimi, İngilizce 'melting pot' kelimesi ile Ruhr bölgesi için kullanılan bölgesel 'Pott' kelimesini birleştirir. 150 yıldan fazla bir süredir dünyanın her yerinden insanlar burada birlikte yaşıyor ve çalışıyor - Polonyalı madencilerden Türk misafir işçilere, 180'den fazla ülkeden ailelere kadar. Bu kültürel çeşitlilik Ruhr bölgesini eşsiz bir kültür potası haline getiriyor."
    },
    PL: {
      title: "Co oznacza \"Melting Pott\"?",
      text: "Termin 'Melting Pott' łączy angielskie słowo 'melting pot' z regionalnym 'Pott' dla Zagłębia Ruhry. Przez ponad 150 lat ludzie z całego świata żyją i pracują tutaj razem - od polskich górników po tureckich robotników gościnnych, po rodziny z ponad 180 narodów. Ta kulturowa różnorodność czyni Zagłębie Ruhry wyjątkowym tyglem kultur."
    },
    RU: {
      title: "Что означает \"Melting Pott\"?",
      text: "Термин 'Melting Pott' сочетает английское слово 'плавильный котёл' с региональным 'Pott' для Рурской области. Уже более 150 лет здесь живут и работают вместе люди со всего мира - от польских шахтёров до турецких рабочих-мигрантов и семей из более чем 180 стран. Это культурное разнообразие делает Рурскую область уникальным плавильным котлом культур."
    },
    AR: {
      title: "ماذا يعني \"Melting Pott\"؟",
      text: "يجمع مصطلح 'Melting Pott' بين الكلمة الإنجليزية التي تعني بوتقة الانصهار مع 'Pott' الإقليمي لمنطقة الرور. منذ أكثر من 150 عاماً، يعيش ويعمل هنا أشخاص من جميع أنحاء العالم معاً - من عمال المناجم البولنديين إلى العمال الضيوف الأتراك وصولاً إلى عائلات من أكثر من 180 دولة. هذا التنوع الثقافي يجعل منطقة الرور بوتقة انصهار فريدة للثقافات."
    },
    IT: {
      title: "Cosa significa \"Melting Pott\"?",
      text: "Il termine 'Melting Pott' combina la parola inglese 'melting pot' con il termine regionale 'Pott' per la regione della Ruhr. Da oltre 150 anni, qui vivono e lavorano insieme persone provenienti da tutto il mondo - dai minatori polacchi ai lavoratori ospiti turchi fino alle famiglie di oltre 180 paesi. Questa diversità culturale rende la regione della Ruhr un crogiolo unico di culture."
    },
    NL: {
      title: "Wat betekent \"Melting Pott\"?",
      text: "De term 'Melting Pott' combineert het Engelse woord 'melting pot' met het regionale 'Pott' voor het Ruhrgebied. Al meer dan 150 jaar wonen en werken hier mensen uit de hele wereld samen - van Poolse mijnwerkers tot Turkse gastarbeiders tot families uit meer dan 180 landen. Deze culturele diversiteit maakt het Ruhrgebied tot een unieke smeltkroes van culturen."
    },
    FR: {
      title: "Que signifie \"Melting Pott\" ?",
      text: "Le terme 'Melting Pott' combine le mot anglais 'melting pot' avec le terme régional 'Pott' pour la région de la Ruhr. Depuis plus de 150 ans, des personnes du monde entier vivent et travaillent ici ensemble - des mineurs polonais aux travailleurs invités turcs jusqu'aux familles de plus de 180 pays. Cette diversité culturelle fait de la région de la Ruhr un creuset unique de cultures."
    },
    ES: {
      title: "¿Qué significa \"Melting Pott\"?",
      text: "El término 'Melting Pott' combina la palabra inglesa 'melting pot' con el término regional 'Pott' para la región del Ruhr. Durante más de 150 años, personas de todo el mundo han vivido y trabajado aquí juntas - desde mineros polacos hasta trabajadores invitados turcos y familias de más de 180 países. Esta diversidad cultural convierte la región del Ruhr en un crisol único de culturas."
    }
  },

  // === EXPERIENCES SECTION ===
  experiences: {
    DE: {
      title: "🏭 Echte Erfahrungen aus dem Ruhrpott",
      description: "Entdecke authentische Bewertungen von Events in Essen, Bochum, Dortmund und dem ganzen Ruhrgebiet. Von Zollverein bis Gasometer - erfahre, was andere Besucher wirklich denken!"
    },
    EN: {
      title: "🏭 Real Experiences from the Ruhr Area",
      description: "Discover authentic reviews of events in Essen, Bochum, Dortmund and the entire Ruhr area. From Zollverein to Gasometer - find out what other visitors really think!"
    },
    TR: {
      title: "🏭 Ruhr Bölgesi'nden Gerçek Deneyimler",
      description: "Essen, Bochum, Dortmund ve tüm Ruhr bölgesindeki etkinliklerin otantik değerlendirmelerini keşfedin. Zollverein'dan Gasometer'e kadar - diğer ziyaretçilerin gerçekten ne düşündüğünü öğrenin!"
    },
    PL: {
      title: "🏭 Prawdziwe Doświadczenia z Zagłębia Ruhry",
      description: "Odkryj autentyczne recenzje wydarzeń w Essen, Bochum, Dortmundzie i całym Zagłębiu Ruhry. Od Zollverein do Gasometer - dowiedz się, co naprawdę myślą inni odwiedzający!"
    },
    RU: {
      title: "🏭 Реальный Опыт из Рурской области",
      description: "Откройте для себя подлинные отзывы о событиях в Эссене, Бохуме, Дортмунде и всей Рурской области. От Цольферайна до Газометра - узнайте, что на самом деле думают другие посетители!"
    },
    AR: {
      title: "🏭 تجارب حقيقية من منطقة الرور",
      description: "اكتشف تقييمات حقيقية للأحداث في إيسن وبوخوم ودورتموند وكامل منطقة الرور. من تسولفيراين إلى غازوميتر - تعرف على ما يفكر فيه الزوار الآخرون حقاً!"
    },
    IT: {
      title: "🏭 Esperienze Autentiche dalla Ruhr",
      description: "Scopri recensioni autentiche di eventi a Essen, Bochum, Dortmund e in tutta l'area della Ruhr. Da Zollverein al Gasometer - scopri cosa pensano davvero gli altri visitatori!"
    },
    NL: {
      title: "🏭 Echte Ervaringen uit het Ruhrgebied",
      description: "Ontdek authentieke beoordelingen van evenementen in Essen, Bochum, Dortmund en het hele Ruhrgebied. Van Zollverein tot Gasometer - ontdek wat andere bezoekers echt denken!"
    },
    FR: {
      title: "🏭 Expériences Authentiques de la Ruhr",
      description: "Découvrez des avis authentiques d'événements à Essen, Bochum, Dortmund et dans toute la région de la Ruhr. De Zollverein au Gasomètre - découvrez ce que pensent vraiment les autres visiteurs !"
    },
    ES: {
      title: "🏭 Experiencias Auténticas del Ruhr",
      description: "Descubre reseñas auténticas de eventos en Essen, Bochum, Dortmund y toda la región del Ruhr. De Zollverein al Gasómetro - ¡descubre lo que realmente piensan otros visitantes!"
    }
  },

  // === EVENT REVIEWS ===
  eventReviews: {
    DE: {
      title: "🏭 Ruhrgebiet Events & Reviews",
      loading: "Lade Events und Reviews...",
      events: "Events",
      reviews: "Bewertungen", 
      reviewsCount: "Bewertungen",
      free: "Kostenlos",
      from: "aus",
      verified: "Verifiziert",
      noReviews: "Noch keine Bewertungen für dieses Event"
    },
    EN: {
      title: "🏭 Ruhr Area Events & Reviews",
      loading: "Loading Events and Reviews...",
      events: "Events",
      reviews: "Reviews",
      reviewsCount: "Reviews", 
      free: "Free",
      from: "from",
      verified: "Verified",
      noReviews: "No reviews yet for this event"
    },
    TR: {
      title: "🏭 Ruhr Bölgesi Etkinlikler & Değerlendirmeler",
      loading: "Etkinlikler ve Değerlendirmeler yükleniyor...",
      events: "Etkinlikler",
      reviews: "Değerlendirmeler",
      reviewsCount: "Değerlendirmeler",
      free: "Ücretsiz", 
      from: "dan",
      verified: "Doğrulanmış",
      noReviews: "Bu etkinlik için henüz değerlendirme yok"
    },
    PL: {
      title: "🏭 Wydarzenia i Recenzje Zagłębia Ruhry",
      loading: "Ładowanie wydarzeń i recenzji...",
      events: "Wydarzenia",
      reviews: "Recenzje",
      reviewsCount: "Recenzje",
      free: "Bezpłatne",
      from: "z",
      verified: "Zweryfikowane", 
      noReviews: "Brak recenzji dla tego wydarzenia"
    },
    RU: {
      title: "🏭 События и Отзывы Рурской области",
      loading: "Загрузка событий и отзывов...",
      events: "События",
      reviews: "Отзывы",
      reviewsCount: "Отзывы",
      free: "Бесплатно",
      from: "из",
      verified: "Проверено",
      noReviews: "Пока нет отзывов для этого события"
    },
    AR: {
      title: "🏭 أحداث ومراجعات منطقة الرور",
      loading: "تحميل الأحداث والمراجعات...",
      events: "الأحداث", 
      reviews: "المراجعات",
      reviewsCount: "المراجعات",
      free: "مجاني",
      from: "من",
      verified: "تم التحقق",
      noReviews: "لا توجد مراجعات حتى الآن لهذا الحدث"
    },
    IT: {
      title: "🏭 Eventi e Recensioni della Ruhr",
      loading: "Caricamento eventi e recensioni...",
      events: "Eventi",
      reviews: "Recensioni",
      reviewsCount: "Recensioni",
      free: "Gratuito",
      from: "da",
      verified: "Verificato",
      noReviews: "Nessuna recensione ancora per questo evento"
    },
    NL: {
      title: "🏭 Ruhrgebied Evenementen & Beoordelingen",
      loading: "Evenementen en beoordelingen laden...",
      events: "Evenementen",
      reviews: "Beoordelingen",
      reviewsCount: "Beoordelingen",
      free: "Gratis",
      from: "uit",
      verified: "Geverifieerd",
      noReviews: "Nog geen beoordelingen voor dit evenement"
    },
    FR: {
      title: "🏭 Événements et Avis de la Ruhr",
      loading: "Chargement des événements et avis...",
      events: "Événements",
      reviews: "Avis",
      reviewsCount: "Avis",
      free: "Gratuit",
      from: "de",
      verified: "Vérifié",
      noReviews: "Pas encore d'avis pour cet événement"
    },
    ES: {
      title: "🏭 Eventos y Reseñas del Ruhr",
      loading: "Cargando eventos y reseñas...",
      events: "Eventos",
      reviews: "Reseñas",
      reviewsCount: "Reseñas",
      free: "Gratis",
      from: "desde",
      verified: "Verificado",
      noReviews: "Aún no hay reseñas para este evento"
    }
  },

  // === EVENT TICKER ===
  eventTicker: {
    DE: {
      today: "HEUTE",
      tomorrow: "MORGEN",
      thisWeek: "DIESE WOCHE",
      upcoming: "DEMNÄCHST",
      loading: "Events werden geladen...",
      noEvents: "Aktuell keine Events verfügbar",
      noEventsSubtitle: "Alle Events sind bereits vorbei oder noch nicht geplant."
    },
    EN: {
      today: "TODAY",
      tomorrow: "TOMORROW",
      thisWeek: "THIS WEEK",
      upcoming: "UPCOMING",
      loading: "Loading events...",
      noEvents: "No events currently available",
      noEventsSubtitle: "All events are already over or not yet planned."
    },
    TR: {
      today: "BUGÜN",
      tomorrow: "YARIN",
      thisWeek: "BU HAFTA",
      upcoming: "YAKLAŞAN",
      loading: "Etkinlikler yükleniyor...",
      noEvents: "Şu anda mevcut etkinlik yok",
      noEventsSubtitle: "Tüm etkinlikler zaten bitti veya henüz planlanmadı."
    },
    PL: {
      today: "DZISIAJ",
      tomorrow: "JUTRO",
      thisWeek: "W TYM TYGODNIU",
      upcoming: "NADCHODZĄCE",
      loading: "Ładowanie wydarzeń...",
      noEvents: "Obecnie brak dostępnych wydarzeń",
      noEventsSubtitle: "Wszystkie wydarzenia już się skończyły lub nie są jeszcze zaplanowane."
    },
    RU: {
      today: "СЕГОДНЯ",
      tomorrow: "ЗАВТРА",
      thisWeek: "НА ЭТОЙ НЕДЕЛЕ",
      upcoming: "ПРЕДСТОЯЩИЕ",
      loading: "Загрузка событий...",
      noEvents: "Нет доступных событий",
      noEventsSubtitle: "Все события уже завершены или еще не запланированы."
    },
    AR: {
      today: "اليوم",
      tomorrow: "غداً",
      thisWeek: "هذا الأسبوع",
      upcoming: "قريباً", 
      loading: "تحميل الأحداث...",
      noEvents: "لا توجد أحداث متاحة حالياً",
      noEventsSubtitle: "جميع الأحداث تم إنجازها بالفعل أو لم يتم التخطيط لها بعد."
    },
    IT: {
      today: "OGGI",
      tomorrow: "DOMANI", 
      thisWeek: "QUESTA SETTIMANA",
      upcoming: "PROSSIMAMENTE",
      loading: "Caricamento eventi...",
      noEvents: "Nessun evento attualmente disponibile",
      noEventsSubtitle: "Tutti gli eventi sono già terminati o non sono ancora stati pianificati."
    },
    NL: {
      today: "VANDAAG",
      tomorrow: "MORGEN",
      thisWeek: "DEZE WEEK", 
      upcoming: "BINNENKORT",
      loading: "Evenementen laden...",
      noEvents: "Momenteel geen evenementen beschikbaar",
      noEventsSubtitle: "Alle evenementen zijn al afgelopen of nog niet gepland."
    },
    FR: {
      today: "AUJOURD'HUI",
      tomorrow: "DEMAIN",
      thisWeek: "CETTE SEMAINE",
      upcoming: "À VENIR",
      loading: "Chargement des événements...",
      noEvents: "Aucun événement actuellement disponible",
      noEventsSubtitle: "Tous les événements sont déjà terminés ou pas encore planifiés."
    },
    ES: {
      today: "HOY",
      tomorrow: "MAÑANA",
      thisWeek: "ESTA SEMANA",
      upcoming: "PRÓXIMAMENTE", 
      loading: "Cargando eventos...",
      noEvents: "No hay eventos disponibles actualmente",
      noEventsSubtitle: "Todos los eventos ya han terminado o aún no están planificados."
    }
  },

  // === FOOTER SECTION ===
  footer: {
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
    IT: {
      title: "Melting Pott",
      subtitle: "La tua guida per gli eventi nella regione della Ruhr. Scopri la cultura e la storia del Ruhrpott.",
      cities: "Città della Ruhr",
      socialMedia: "Social Media",
      copyright: "Tutti i diritti riservati.",
      learnMore: "Scopri di più su {city}"
    },
    NL: {
      title: "Melting Pott",
      subtitle: "Jouw gids voor evenementen in het Ruhrgebied. Ontdek de cultuur en geschiedenis van het Ruhrpott.",
      cities: "Ruhrgebied Steden",
      socialMedia: "Sociale Media",
      copyright: "Alle rechten voorbehouden.",
      learnMore: "Leer meer over {city}"
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
    }
  },

  // === COMMON UI ELEMENTS ===
  common: {
    DE: {
      loading: 'Wird geladen...',
      error: 'Fehler',
      noResults: 'Keine Ergebnisse gefunden',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      close: 'Schließen',
      search: 'Suchen',
      filter: 'Filter',
      clear: 'Löschen'
    },
    EN: {
      loading: 'Loading...',
      error: 'Error',
      noResults: 'No results found',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear'
    },
    TR: {
      loading: 'Yükleniyor...',
      error: 'Hata',
      noResults: 'Sonuç bulunamadı',
      cancel: 'İptal',
      save: 'Kaydet',
      delete: 'Sil',
      edit: 'Düzenle',
      close: 'Kapat',
      search: 'Ara',
      filter: 'Filtre',
      clear: 'Temizle'
    },
    PL: {
      loading: 'Ładowanie...',
      error: 'Błąd',
      noResults: 'Nie znaleziono wyników',
      cancel: 'Anuluj',
      save: 'Zapisz',
      delete: 'Usuń',
      edit: 'Edytuj',
      close: 'Zamknij',
      search: 'Szukaj',
      filter: 'Filtruj',
      clear: 'Wyczyść'
    },
    RU: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      noResults: 'Результаты не найдены',
      cancel: 'Отмена',
      save: 'Сохранить',
      delete: 'Удалить',
      edit: 'Редактировать',
      close: 'Закрыть',
      search: 'Поиск',
      filter: 'Фильтр',
      clear: 'Очистить'
    },
    AR: {
      loading: 'تحميل...',
      error: 'خطأ',
      noResults: 'لم يتم العثور على نتائج',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      close: 'إغلاق',
      search: 'بحث',
      filter: 'فلتر',
      clear: 'مسح'
    },
    IT: {
      loading: 'Caricamento...',
      error: 'Errore',
      noResults: 'Nessun risultato trovato',
      cancel: 'Annulla',
      save: 'Salva',
      delete: 'Elimina',
      edit: 'Modifica',
      close: 'Chiudi',
      search: 'Cerca',
      filter: 'Filtra',
      clear: 'Cancella'
    },
    NL: {
      loading: 'Laden...',
      error: 'Fout',
      noResults: 'Geen resultaten gevonden',
      cancel: 'Annuleren',
      save: 'Opslaan',
      delete: 'Verwijderen',
      edit: 'Bewerken',
      close: 'Sluiten',
      search: 'Zoeken',
      filter: 'Filter',
      clear: 'Wissen'
    },
    FR: {
      loading: 'Chargement...',
      error: 'Erreur',
      noResults: 'Aucun résultat trouvé',
      cancel: 'Annuler',
      save: 'Sauvegarder',
      delete: 'Supprimer',
      edit: 'Modifier',
      close: 'Fermer',
      search: 'Rechercher',
      filter: 'Filtrer',
      clear: 'Effacer'
    },
    ES: {
      loading: 'Cargando...',
      error: 'Error',
      noResults: 'No se encontraron resultados',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      search: 'Buscar',
      filter: 'Filtrar',
      clear: 'Limpiar'
    }
  }
};

// === TRANSLATION SERVICE FUNCTIONS ===
export class TranslationService {
  static getTranslation(section, language, key, fallback = key) {
    const lang = language?.toUpperCase() || 'DE';
    const translation = TRANSLATIONS[section]?.[lang]?.[key] || 
                       TRANSLATIONS[section]?.DE?.[key] || 
                       fallback;
    return translation;
  }

  static getNavigationText(language, key) {
    return this.getTranslation('navigation', language, key);
  }

  static getHeroText(language, key) {
    return this.getTranslation('hero', language, key);
  }

  static getWelcomeText(language) {
    return TRANSLATIONS.welcomeButtons[language?.toUpperCase()] || TRANSLATIONS.welcomeButtons.DE;
  }

  static getExplanationText(language, key) {
    return this.getTranslation('explanation', language, key);
  }

  static getExperiencesText(language, key) {
    return this.getTranslation('experiences', language, key);
  }

  static getEventReviewsText(language, key) {
    return this.getTranslation('eventReviews', language, key);
  }

  static getEventTickerText(language, key) {
    return this.getTranslation('eventTicker', language, key);
  }

  static getFooterText(language, key) {
    return this.getTranslation('footer', language, key);
  }

  static getCommonText(language, key) {
    return this.getTranslation('common', language, key);
  }

  static getSupportedLanguages() {
    return LANGUAGES;
  }
}

export default TranslationService;