import React, { useEffect, useState } from 'react'

const Events = ({ selectedLanguage = 'DE' }) => {
  const [currentLang, setCurrentLang] = useState('DE')

  useEffect(() => {
    setCurrentLang(selectedLanguage)
  }, [selectedLanguage])

  const translations = {
    DE: {
      title: "Events in den 12 Ruhrgebietsstädten",
      subtitle: "Entdecke die Vielfalt der Kulturen und Events in den wichtigsten Städten des Ruhrgebiets",
      categories: {
        Kultur: "Kultur",
        Musik: "Musik", 
        Sport: "Sport",
        Familie: "Familie",
        Kunst: "Kunst",
        Bildung: "Bildung",
        Shopping: "Shopping",
        Aussicht: "Aussicht",
        Wissenschaft: "Wissenschaft"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Zeche Zollverein UNESCO-Führung",
          subtitle: "Welterbe Industriekultur erleben"
        },
        "Philharmonie Essen Konzert": {
          title: "Philharmonie Essen Konzert", 
          subtitle: "Ruhr Piano Festival"
        },
        "BVB Stadion-Tour": {
          title: "BVB Stadion-Tour",
          subtitle: "Signal Iduna Park erleben"
        },
        "Phoenix See Herbstfest": {
          title: "Phoenix See Herbstfest",
          subtitle: "Familienfest am künstlichen See"
        },
        "LaPaDu Lichtinstallation": {
          title: "LaPaDu Lichtinstallation", 
          subtitle: "Spektakuläre Lichtshow im Landschaftspark"
        },
        "Hafen Duisburg Tour": {
          title: "Hafen Duisburg Tour",
          subtitle: "Größter Binnenhafen Europas"
        },
        "Deutsches Bergbau-Museum": {
          title: "Deutsches Bergbau-Museum",
          subtitle: "Industriegeschichte hautnah erleben"
        },
        "Starlight Express Musical": {
          title: "Starlight Express Musical",
          subtitle: "Weltberühmtes Rollschuh-Musical"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Erlebniswelt",
          subtitle: "Weltreise an einem Tag"
        },
        "Schalke Arena Tour": {
          title: "Schalke Arena Tour",
          subtitle: "Veltins-Arena entdecken"
        },
        "Gasometer Ausstellung": {
          title: "Gasometer Ausstellung",
          subtitle: "Das zerbrechliche Paradies"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Shopping & Kultur",
          subtitle: "Einkaufen und Entertainment"
        },
        "Tetraeder Aussichtsturm": {
          title: "Tetraeder Aussichtsturm",
          subtitle: "360° Panorama über das Ruhrgebiet"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Filmpark mit Achterbahnen"
        },
        "Halde Hoheward Observatorium": {
          title: "Halde Hoheward Observatorium",
          subtitle: "Horizontalobservatorium und Obelisk"
        },
        "Schloss Herten": {
          title: "Schloss Herten",
          subtitle: "Wasserschloss im Schlosspark"
        },
        "Moers Festival": {
          title: "Moers Festival",
          subtitle: "Internationales Jazz & World Music Festival"
        },
        "Grafschafter Museum": {
          title: "Grafschafter Museum",
          subtitle: "Geschichte der Grafschaft Moers"
        },
        "Camera Obscura": {
          title: "Camera Obscura",
          subtitle: "Weltweit höchste begehbare Kamera"
        },
        "Aquarius Wassermuseum": {
          title: "Aquarius Wassermuseum",
          subtitle: "Industriekultur der Wasserwirtschaft"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "LWL-Industriemuseum Henrichshütte",
          subtitle: "Hochofenanlage und Industriegeschichte"
        },
        "Altstadt Hattingen": {
          title: "Altstadt Hattingen",
          subtitle: "Mittelalterliche Fachwerkarchitektur"
        },
        "Ruhrfestspiele": {
          title: "Ruhrfestspiele",
          subtitle: "Europas größtes Theaterfestival"
        },
        "Ikonen-Museum": {
          title: "Ikonen-Museum",
          subtitle: "Ostkirchliche Kunst"
        }
      }
    },
    EN: {
      title: "Events in the 12 Ruhr Area Cities",
      subtitle: "Discover the diversity of cultures and events in the most important cities of the Ruhr area",
      categories: {
        Kultur: "Culture",
        Musik: "Music",
        Sport: "Sports", 
        Familie: "Family",
        Kunst: "Arts",
        Bildung: "Education",
        Shopping: "Shopping",
        Aussicht: "Viewpoint",
        Wissenschaft: "Science"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Zeche Zollverein UNESCO Tour",
          subtitle: "Experience World Heritage Industrial Culture"
        },
        "Philharmonie Essen Konzert": {
          title: "Essen Philharmonic Concert", 
          subtitle: "Ruhr Piano Festival"
        },
        "BVB Stadion-Tour": {
          title: "BVB Stadium Tour",
          subtitle: "Experience Signal Iduna Park"
        },
        "Phoenix See Herbstfest": {
          title: "Phoenix Lake Autumn Festival",
          subtitle: "Family Festival at the Artificial Lake"
        },
        "LaPaDu Lichtinstallation": {
          title: "LaPaDu Light Installation", 
          subtitle: "Spectacular Light Show in Landscape Park"
        },
        "Hafen Duisburg Tour": {
          title: "Duisburg Harbor Tour",
          subtitle: "Europe's Largest Inland Port"
        },
        "Deutsches Bergbau-Museum": {
          title: "German Mining Museum",
          subtitle: "Experience Industrial History Up Close"
        },
        "Starlight Express Musical": {
          title: "Starlight Express Musical",
          subtitle: "World-Famous Roller Skate Musical"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Experience World",
          subtitle: "World Tour in One Day"
        },
        "Schalke Arena Tour": {
          title: "Schalke Arena Tour",
          subtitle: "Discover Veltins-Arena"
        },
        "Gasometer Ausstellung": {
          title: "Gasometer Exhibition",
          subtitle: "The Fragile Paradise"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Shopping & Culture",
          subtitle: "Shopping and Entertainment"
        },
        "Tetraeder Aussichtsturm": {
          title: "Tetrahedron Observation Tower",
          subtitle: "360° Panorama over the Ruhr Area"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Film Park with Roller Coasters"
        },
        "Halde Hoheward Observatorium": {
          title: "Hoheward Observatory",
          subtitle: "Horizon Observatory and Obelisk"
        },
        "Schloss Herten": {
          title: "Herten Castle",
          subtitle: "Water Castle in Castle Park"
        },
        "Moers Festival": {
          title: "Moers Festival",
          subtitle: "International Jazz & World Music Festival"
        },
        "Grafschafter Museum": {
          title: "Grafschaft Museum",
          subtitle: "History of County Moers"
        },
        "Camera Obscura": {
          title: "Camera Obscura",
          subtitle: "World's Highest Walk-in Camera"
        },
        "Aquarius Wassermuseum": {
          title: "Aquarius Water Museum",
          subtitle: "Industrial Culture of Water Management"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "LWL Industrial Museum Henrichshütte",
          subtitle: "Blast Furnace Plant and Industrial History"
        },
        "Altstadt Hattingen": {
          title: "Hattingen Old Town",
          subtitle: "Medieval Half-Timbered Architecture"
        },
        "Ruhrfestspiele": {
          title: "Ruhr Festival",
          subtitle: "Europe's Largest Theater Festival"
        },
        "Ikonen-Museum": {
          title: "Icon Museum",
          subtitle: "Eastern Church Art"
        }
      }
    },
    TR: {
      title: "12 Ruhr Bölgesi Şehrinde Etkinlikler",
      subtitle: "Ruhr bölgesinin en önemli şehirlerindeki kültür ve etkinlik çeşitliliğini keşfedin",
      categories: {
        Kultur: "Kültür",
        Musik: "Müzik",
        Sport: "Spor",
        Familie: "Aile",
        Kunst: "Sanat",
        Bildung: "Eğitim",
        Shopping: "Alışveriş",
        Aussicht: "Manzara",
        Wissenschaft: "Bilim"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Zeche Zollverein UNESCO Turu",
          subtitle: "Dünya Mirası Endüstri Kültürünü Deneyimleyin"
        },
        "Philharmonie Essen Konzert": {
          title: "Essen Filarmoni Konseri", 
          subtitle: "Ruhr Piyano Festivali"
        },
        "BVB Stadion-Tour": {
          title: "BVB Stadyum Turu",
          subtitle: "Signal Iduna Park'ı Deneyimleyin"
        },
        "Phoenix See Herbstfest": {
          title: "Phoenix Gölü Sonbahar Festivali",
          subtitle: "Yapay Göl'de Aile Festivali"
        },
        "LaPaDu Lichtinstallation": {
          title: "LaPaDu Işık Enstalasyonu", 
          subtitle: "Peyzaj Parkında Muhteşem Işık Gösterisi"
        },
        "Hafen Duisburg Tour": {
          title: "Duisburg Limanı Turu",
          subtitle: "Avrupa'nın En Büyük İç Limanı"
        },
        "Deutsches Bergbau-Museum": {
          title: "Alman Maden Müzesi",
          subtitle: "Endüstri Tarihini Yakından Deneyimleyin"
        },
        "Starlight Express Musical": {
          title: "Starlight Express Müzikali",
          subtitle: "Dünyaca Ünlü Paten Müzikali"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Deneyim Dünyası",
          subtitle: "Bir Günde Dünya Turu"
        },
        "Schalke Arena Tour": {
          title: "Schalke Arena Turu",
          subtitle: "Veltins-Arena'yı Keşfedin"
        },
        "Gasometer Ausstellung": {
          title: "Gasometer Sergisi",
          subtitle: "Kırılgan Cennet"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Alışveriş & Kültür",
          subtitle: "Alışveriş ve Eğlence"
        },
        "Tetraeder Aussichtsturm": {
          title: "Tetraeder Gözlem Kulesi",
          subtitle: "Ruhr Bölgesi üzerinde 360° Panorama"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Hız Trenli Film Parkı"
        },
        "Halde Hoheward Observatorium": {
          title: "Hoheward Gözlemevi",
          subtitle: "Ufuk Gözlemevi ve Obelisk"
        },
        "Schloss Herten": {
          title: "Herten Şatosu",
          subtitle: "Şato Parkında Su Şatosu"
        },
        "Moers Festival": {
          title: "Moers Festivali",
          subtitle: "Uluslararası Caz ve Dünya Müziği Festivali"
        },
        "Grafschafter Museum": {
          title: "Grafschaft Müzesi",
          subtitle: "Moers Kontluğu Tarihi"
        },
        "Camera Obscura": {
          title: "Camera Obscura",
          subtitle: "Dünyanın En Yüksek Yürünebilir Kamerası"
        },
        "Aquarius Wassermuseum": {
          title: "Aquarius Su Müzesi",
          subtitle: "Su Yönetimi Endüstri Kültürü"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "LWL Endüstri Müzesi Henrichshütte",
          subtitle: "Yüksek Fırın Tesisi ve Endüstri Tarihi"
        },
        "Altstadt Hattingen": {
          title: "Hattingen Eski Şehir",
          subtitle: "Ortaçağ Ahşap Çerçeveli Mimarisi"
        },
        "Ruhrfestspiele": {
          title: "Ruhr Festivalleri",
          subtitle: "Avrupa'nın En Büyük Tiyatro Festivali"
        },
        "Ikonen-Museum": {
          title: "İkon Müzesi",
          subtitle: "Doğu Kilisesi Sanatı"
        }
      }
    },
    IT: {
      title: "Eventi nelle 12 Città della Ruhr",
      subtitle: "Scopri la diversità delle culture e degli eventi nelle città più importanti della regione della Ruhr",
      categories: {
        Kultur: "Cultura",
        Musik: "Musica",
        Sport: "Sport",
        Familie: "Famiglia",
        Kunst: "Arte",
        Bildung: "Educazione",
        Shopping: "Shopping",
        Aussicht: "Vista panoramica",
        Wissenschaft: "Scienza"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Tour UNESCO Zeche Zollverein",
          subtitle: "Vivi il patrimonio mondiale della cultura industriale"
        },
        "Philharmonie Essen Konzert": {
          title: "Concerto Filarmonica di Essen", 
          subtitle: "Festival Ruhr Piano"
        },
        "BVB Stadion-Tour": {
          title: "Tour Stadio BVB",
          subtitle: "Vivi il Signal Iduna Park"
        },
        "Phoenix See Herbstfest": {
          title: "Festival Autunnale Lago Phoenix",
          subtitle: "Festival per famiglie al lago artificiale"
        },
        "LaPaDu Lichtinstallation": {
          title: "Installazione Luminosa LaPaDu", 
          subtitle: "Spettacolo di luci spettacolare nel parco paesaggistico"
        },
        "Hafen Duisburg Tour": {
          title: "Tour Porto di Duisburg",
          subtitle: "Il più grande porto interno d'Europa"
        },
        "Deutsches Bergbau-Museum": {
          title: "Museo Tedesco delle Miniere",
          subtitle: "Vivi da vicino la storia industriale"
        },
        "Starlight Express Musical": {
          title: "Musical Starlight Express",
          subtitle: "Famoso musical sui pattini a rotelle"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Mondo delle Esperienze",
          subtitle: "Giro del mondo in un giorno"
        },
        "Schalke Arena Tour": {
          title: "Tour Arena Schalke",
          subtitle: "Scopri la Veltins-Arena"
        },
        "Gasometer Ausstellung": {
          title: "Mostra Gasometro",
          subtitle: "Il paradiso fragile"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Shopping e Cultura",
          subtitle: "Shopping e intrattenimento"
        },
        "Tetraeder Aussichtsturm": {
          title: "Torre Panoramica Tetraedro",
          subtitle: "Panorama a 360° sulla regione della Ruhr"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Parco cinematografico con montagne russe"
        },
        "Halde Hoheward Observatorium": {
          title: "Osservatorio Hoheward",
          subtitle: "Osservatorio dell'orizzonte e obelisco"
        },
        "Schloss Herten": {
          title: "Castello di Herten",
          subtitle: "Castello d'acqua nel parco del castello"
        },
        "Moers Festival": {
          title: "Festival di Moers",
          subtitle: "Festival internazionale di jazz e musica del mondo"
        },
        "Grafschafter Museum": {
          title: "Museo della Contea",
          subtitle: "Storia della contea di Moers"
        },
        "Camera Obscura": {
          title: "Camera Obscura",
          subtitle: "La camera più alta del mondo accessibile a piedi"
        },
        "Aquarius Wassermuseum": {
          title: "Museo dell'Acqua Aquarius",
          subtitle: "Cultura industriale della gestione idrica"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "Museo Industriale LWL Henrichshütte",
          subtitle: "Impianto dell'altoforno e storia industriale"
        },
        "Altstadt Hattingen": {
          title: "Centro Storico di Hattingen",
          subtitle: "Architettura medievale a graticcio"
        },
        "Ruhrfestspiele": {
          title: "Festival della Ruhr",
          subtitle: "Il più grande festival teatrale d'Europa"
        },
        "Ikonen-Museum": {
          title: "Museo delle Icone",
          subtitle: "Arte della Chiesa Orientale"
        }
      }
    },
    FR: {
      title: "Événements dans les 12 Villes de la Ruhr",
      subtitle: "Découvrez la diversité des cultures et des événements dans les villes les plus importantes de la région de la Ruhr",
      categories: {
        Kultur: "Culture",
        Musik: "Musique",
        Sport: "Sport",
        Familie: "Famille",
        Kunst: "Art",
        Bildung: "Éducation",
        Shopping: "Shopping",
        Aussicht: "Point de vue",
        Wissenschaft: "Science"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Visite UNESCO Zeche Zollverein",
          subtitle: "Découvrez le patrimoine mondial de la culture industrielle"
        },
        "Philharmonie Essen Konzert": {
          title: "Concert Philharmonie d'Essen", 
          subtitle: "Festival de Piano de la Ruhr"
        },
        "BVB Stadion-Tour": {
          title: "Visite du Stade BVB",
          subtitle: "Découvrez le Signal Iduna Park"
        },
        "Phoenix See Herbstfest": {
          title: "Festival d'Automne du Lac Phoenix",
          subtitle: "Festival familial au lac artificiel"
        },
        "LaPaDu Lichtinstallation": {
          title: "Installation Lumineuse LaPaDu", 
          subtitle: "Spectacle de lumières spectaculaire dans le parc paysager"
        },
        "Hafen Duisburg Tour": {
          title: "Visite du Port de Duisburg",
          subtitle: "Le plus grand port intérieur d'Europe"
        },
        "Deutsches Bergbau-Museum": {
          title: "Musée Allemand des Mines",
          subtitle: "Vivez l'histoire industrielle de près"
        },
        "Starlight Express Musical": {
          title: "Comédie Musicale Starlight Express",
          subtitle: "Célèbre comédie musicale sur patins à roulettes"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Monde des Expériences",
          subtitle: "Tour du monde en une journée"
        },
        "Schalke Arena Tour": {
          title: "Visite de l'Arena Schalke",
          subtitle: "Découvrez la Veltins-Arena"
        },
        "Gasometer Ausstellung": {
          title: "Exposition Gazomètre",
          subtitle: "Le paradis fragile"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Shopping et Culture",
          subtitle: "Shopping et divertissement"
        },
        "Tetraeder Aussichtsturm": {
          title: "Tour Panoramique Tétraèdre",
          subtitle: "Panorama à 360° sur la région de la Ruhr"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Parc cinématographique avec montagnes russes"
        },
        "Halde Hoheward Observatorium": {
          title: "Observatoire Hoheward",
          subtitle: "Observatoire d'horizon et obélisque"
        },
        "Schloss Herten": {
          title: "Château de Herten",
          subtitle: "Château d'eau dans le parc du château"
        },
        "Moers Festival": {
          title: "Festival de Moers",
          subtitle: "Festival international de jazz et de musique du monde"
        },
        "Grafschafter Museum": {
          title: "Musée du Comté",
          subtitle: "Histoire du comté de Moers"
        },
        "Camera Obscura": {
          title: "Camera Obscura",
          subtitle: "La plus haute caméra accessible au monde"
        },
        "Aquarius Wassermuseum": {
          title: "Musée de l'Eau Aquarius",
          subtitle: "Culture industrielle de la gestion de l'eau"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "Musée Industriel LWL Henrichshütte",
          subtitle: "Installation de haut fourneau et histoire industrielle"
        },
        "Altstadt Hattingen": {
          title: "Vieille Ville de Hattingen",
          subtitle: "Architecture médiévale à colombages"
        },
        "Ruhrfestspiele": {
          title: "Festival de la Ruhr",
          subtitle: "Le plus grand festival théâtral d'Europe"
        },
        "Ikonen-Museum": {
          title: "Musée des Icônes",
          subtitle: "Art de l'Église Orientale"
        }
      }
    },
    ES: {
      title: "Eventos en las 12 Ciudades del Ruhr",
      subtitle: "Descubre la diversidad de culturas y eventos en las ciudades más importantes de la región del Ruhr",
      categories: {
        Kultur: "Cultura",
        Musik: "Música",
        Sport: "Deporte",
        Familie: "Familia",
        Kunst: "Arte",
        Bildung: "Educación",
        Shopping: "Compras",
        Aussicht: "Mirador",
        Wissenschaft: "Ciencia"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Tour UNESCO Zeche Zollverein",
          subtitle: "Vive el patrimonio mundial de la cultura industrial"
        },
        "Philharmonie Essen Konzert": {
          title: "Concierto Filarmónica de Essen", 
          subtitle: "Festival Piano del Ruhr"
        },
        "BVB Stadion-Tour": {
          title: "Tour Estadio BVB",
          subtitle: "Vive el Signal Iduna Park"
        },
        "Phoenix See Herbstfest": {
          title: "Festival de Otoño Lago Phoenix",
          subtitle: "Festival familiar en el lago artificial"
        },
        "LaPaDu Lichtinstallation": {
          title: "Instalación Luminosa LaPaDu", 
          subtitle: "Espectáculo de luces espectacular en el parque paisajístico"
        },
        "Hafen Duisburg Tour": {
          title: "Tour Puerto de Duisburg",
          subtitle: "El puerto interior más grande de Europa"
        },
        "Deutsches Bergbau-Museum": {
          title: "Museo Alemán de Minería",
          subtitle: "Vive la historia industrial de cerca"
        },
        "Starlight Express Musical": {
          title: "Musical Starlight Express",
          subtitle: "Famoso musical sobre patines"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Mundo de Experiencias",
          subtitle: "Vuelta al mundo en un día"
        },
        "Schalke Arena Tour": {
          title: "Tour Arena Schalke",
          subtitle: "Descubre la Veltins-Arena"
        },
        "Gasometer Ausstellung": {
          title: "Exposición Gasómetro",
          subtitle: "El paraíso frágil"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Compras y Cultura",
          subtitle: "Compras y entretenimiento"
        },
        "Tetraeder Aussichtsturm": {
          title: "Torre Panorámica Tetraedro",
          subtitle: "Panorama 360° sobre la región del Ruhr"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Parque cinematográfico con montañas rusas"
        },
        "Halde Hoheward Observatorium": {
          title: "Observatorio Hoheward",
          subtitle: "Observatorio del horizonte y obelisco"
        },
        "Schloss Herten": {
          title: "Castillo de Herten",
          subtitle: "Castillo de agua en el parque del castillo"
        },
        "Moers Festival": {
          title: "Festival de Moers",
          subtitle: "Festival internacional de jazz y música del mundo"
        },
        "Grafschafter Museum": {
          title: "Museo del Condado",
          subtitle: "Historia del condado de Moers"
        },
        "Camera Obscura": {
          title: "Cámara Oscura",
          subtitle: "La cámara transitable más alta del mundo"
        },
        "Aquarius Wassermuseum": {
          title: "Museo del Agua Aquarius",
          subtitle: "Cultura industrial de la gestión del agua"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "Museo Industrial LWL Henrichshütte",
          subtitle: "Instalación de alto horno e historia industrial"
        },
        "Altstadt Hattingen": {
          title: "Casco Antiguo de Hattingen",
          subtitle: "Arquitectura medieval de entramado de madera"
        },
        "Ruhrfestspiele": {
          title: "Festival del Ruhr",
          subtitle: "El festival teatral más grande de Europa"
        },
        "Ikonen-Museum": {
          title: "Museo de Iconos",
          subtitle: "Arte de la Iglesia Oriental"
        }
      }
    },
    PL: {
      title: "Wydarzenia w 12 Miastach Zagłębia Ruhry",
      subtitle: "Odkryj różnorodność kultur i wydarzeń w najważniejszych miastach regionu Ruhry",
      categories: {
        Kultur: "Kultura",
        Musik: "Muzyka",
        Sport: "Sport",
        Familie: "Rodzina",
        Kunst: "Sztuka",
        Bildung: "Edukacja",
        Shopping: "Zakupy",
        Aussicht: "Punkt widokowy",
        Wissenschaft: "Nauka"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Wycieczka UNESCO Zeche Zollverein",
          subtitle: "Doświadcz światowego dziedzictwa kultury przemysłowej"
        },
        "Philharmonie Essen Konzert": {
          title: "Koncert Filharmonii w Essen", 
          subtitle: "Festiwal Fortepianowy Ruhry"
        },
        "BVB Stadion-Tour": {
          title: "Wycieczka po Stadionie BVB",
          subtitle: "Doświadcz Signal Iduna Park"
        },
        "Phoenix See Herbstfest": {
          title: "Jesienny Festiwal nad Jeziorem Phoenix",
          subtitle: "Festiwal rodzinny nad sztucznym jeziorem"
        },
        "LaPaDu Lichtinstallation": {
          title: "Instalacja Świetlna LaPaDu", 
          subtitle: "Spektakularny pokaz świateł w parku krajobrazowym"
        },
        "Hafen Duisburg Tour": {
          title: "Wycieczka po Porcie w Duisburgu",
          subtitle: "Największy port śródlądowy w Europie"
        },
        "Deutsches Bergbau-Museum": {
          title: "Niemieckie Muzeum Górnictwa",
          subtitle: "Doświadcz historii przemysłowej z bliska"
        },
        "Starlight Express Musical": {
          title: "Musical Starlight Express",
          subtitle: "Słynny musical na wrotkach"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Świat Doświadczeń",
          subtitle: "Podróż dookoła świata w jeden dzień"
        },
        "Schalke Arena Tour": {
          title: "Wycieczka po Arenie Schalke",
          subtitle: "Odkryj Veltins-Arena"
        },
        "Gasometer Ausstellung": {
          title: "Wystawa w Gazometrze",
          subtitle: "Kruchy raj"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Zakupy i Kultura",
          subtitle: "Zakupy i rozrywka"
        },
        "Tetraeder Aussichtsturm": {
          title: "Wieża Widokowa Tetraedr",
          subtitle: "Panorama 360° nad regionem Ruhry"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Park filmowy z kolejkami górskimi"
        },
        "Halde Hoheward Observatorium": {
          title: "Obserwatorium Hoheward",
          subtitle: "Obserwatorium horyzontu i obelisk"
        },
        "Schloss Herten": {
          title: "Zamek Herten",
          subtitle: "Zamek wodny w parku zamkowym"
        },
        "Moers Festival": {
          title: "Festiwal w Moers",
          subtitle: "Międzynarodowy festiwal jazzu i muzyki świata"
        },
        "Grafschafter Museum": {
          title: "Muzeum Hrabstwa",
          subtitle: "Historia hrabstwa Moers"
        },
        "Camera Obscura": {
          title: "Camera Obscura",
          subtitle: "Najwyższa dostępna kamera na świecie"
        },
        "Aquarius Wassermuseum": {
          title: "Muzeum Wody Aquarius",
          subtitle: "Kultura przemysłowa gospodarki wodnej"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "Muzeum Przemysłowe LWL Henrichshütte",
          subtitle: "Instalacja wielkiego pieca i historia przemysłowa"
        },
        "Altstadt Hattingen": {
          title: "Stare Miasto Hattingen",
          subtitle: "Średniowieczna architektura szachulcowa"
        },
        "Ruhrfestspiele": {
          title: "Festiwal Ruhry",
          subtitle: "Największy festiwal teatralny w Europie"
        },
        "Ikonen-Museum": {
          title: "Muzeum Ikon",
          subtitle: "Sztuka Kościoła Wschodniego"
        }
      }
    },
    RU: {
      title: "События в 12 Городах Рурской Области",
      subtitle: "Откройте для себя разнообразие культур и событий в самых важных городах Рурской области",
      categories: {
        Kultur: "Культура",
        Musik: "Музыка",
        Sport: "Спорт",
        Familie: "Семья",
        Kunst: "Искусство",
        Bildung: "Образование",
        Shopping: "Покупки",
        Aussicht: "Смотровая площадка",
        Wissenschaft: "Наука"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "Экскурсия ЮНЕСКО по Цехе Цольферайн",
          subtitle: "Познайте всемирное наследие промышленной культуры"
        },
        "Philharmonie Essen Konzert": {
          title: "Концерт Филармонии Эссена", 
          subtitle: "Рурский фортепианный фестиваль"
        },
        "BVB Stadion-Tour": {
          title: "Экскурсия по стадиону БВБ",
          subtitle: "Познайте Сигнал Идуна Парк"
        },
        "Phoenix See Herbstfest": {
          title: "Осенний фестиваль на озере Феникс",
          subtitle: "Семейный фестиваль у искусственного озера"
        },
        "LaPaDu Lichtinstallation": {
          title: "Световая инсталляция ЛаПаДу", 
          subtitle: "Захватывающее световое шоу в ландшафтном парке"
        },
        "Hafen Duisburg Tour": {
          title: "Экскурсия по порту Дуйсбурга",
          subtitle: "Крупнейший внутренний порт Европы"
        },
        "Deutsches Bergbau-Museum": {
          title: "Немецкий музей горного дела",
          subtitle: "Познайте промышленную историю вблизи"
        },
        "Starlight Express Musical": {
          title: "Мюзикл Старлайт Экспресс",
          subtitle: "Знаменитый мюзикл на роликах"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Мир приключений",
          subtitle: "Кругосветное путешествие за один день"
        },
        "Schalke Arena Tour": {
          title: "Экскурсия по арене Шальке",
          subtitle: "Откройте Велтинс-Арену"
        },
        "Gasometer Ausstellung": {
          title: "Выставка в газометре",
          subtitle: "Хрупкий рай"
        },
        "CentrO Shopping & Kultur": {
          title: "ЦентрО Покупки и Культура",
          subtitle: "Покупки и развлечения"
        },
        "Tetraeder Aussichtsturm": {
          title: "Смотровая башня Тетраэдр",
          subtitle: "Панорама 360° над Рурской областью"
        },
        "Movie Park Germany": {
          title: "Мови Парк Германия",
          subtitle: "Киноpark с американскими горками"
        },
        "Halde Hoheward Observatorium": {
          title: "Обсерватория Хохевард",
          subtitle: "Обсерватория горизонта и обелиск"
        },
        "Schloss Herten": {
          title: "Замок Хертен",
          subtitle: "Водный замок в замковом парке"
        },
        "Moers Festival": {
          title: "Фестиваль Мёрс",
          subtitle: "Международный джазовый фестиваль и мировой музыки"
        },
        "Grafschafter Museum": {
          title: "Музей графства",
          subtitle: "История графства Мёрс"
        },
        "Camera Obscura": {
          title: "Камера обскура",
          subtitle: "Самая высокая проходимая камера в мире"
        },
        "Aquarius Wassermuseum": {
          title: "Водный музей Аквариус",
          subtitle: "Промышленная культура водного хозяйства"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "Промышленный музей LWL Хенрихсхютте",
          subtitle: "Доменная установка и промышленная история"
        },
        "Altstadt Hattingen": {
          title: "Старый город Хаттинген",
          subtitle: "Средневековая фахверковая архитектура"
        },
        "Ruhrfestspiele": {
          title: "Рурские фестивали",
          subtitle: "Крупнейший театральный фестиваль Европы"
        },
        "Ikonen-Museum": {
          title: "Музей икон",
          subtitle: "Искусство Восточной церкви"
        }
      }
    },
    AR: {
      title: "الأحداث في 12 مدينة في منطقة الرور",
      subtitle: "اكتشف تنوع الثقافات والأحداث في أهم مدن منطقة الرور",
      categories: {
        Kultur: "ثقافة",
        Musik: "موسيقى",
        Sport: "رياضة",
        Familie: "عائلة",
        Kunst: "فن",
        Bildung: "تعليم",
        Shopping: "تسوق",
        Aussicht: "نقطة مشاهدة",
        Wissenschaft: "علوم"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "جولة اليونسكو في زيخة تسولفيراين",
          subtitle: "اختبر التراث العالمي للثقافة الصناعية"
        },
        "Philharmonie Essen Konzert": {
          title: "حفل أوركسترا إيسن الفيلهارمونية", 
          subtitle: "مهرجان الرور للبيانو"
        },
        "BVB Stadion-Tour": {
          title: "جولة في ملعب بوروسيا دورتموند",
          subtitle: "اختبر سيغنال إيدونا بارك"
        },
        "Phoenix See Herbstfest": {
          title: "مهرجان الخريف في بحيرة فينكس",
          subtitle: "مهرجان عائلي في البحيرة الاصطناعية"
        },
        "LaPaDu Lichtinstallation": {
          title: "تركيب الإضاءة في لاباديو", 
          subtitle: "عرض أضواء مذهل في الحديقة الطبيعية"
        },
        "Hafen Duisburg Tour": {
          title: "جولة في ميناء دويسبورغ",
          subtitle: "أكبر ميناء داخلي في أوروبا"
        },
        "Deutsches Bergbau-Museum": {
          title: "متحف التعدين الألماني",
          subtitle: "اختبر التاريخ الصناعي عن كثب"
        },
        "Starlight Express Musical": {
          title: "مسرحية ستارلايت إكسبريس الموسيقية",
          subtitle: "المسرحية الموسيقية الشهيرة على الزلاجات"
        },
        "ZOOM Erlebniswelt": {
          title: "زوم عالم التجارب",
          subtitle: "رحلة حول العالم في يوم واحد"
        },
        "Schalke Arena Tour": {
          title: "جولة في ملعب شالكه",
          subtitle: "اكتشف فيلتينس أرينا"
        },
        "Gasometer Ausstellung": {
          title: "معرض الغازوميتر",
          subtitle: "الجنة الهشة"
        },
        "CentrO Shopping & Kultur": {
          title: "سنترو للتسوق والثقافة",
          subtitle: "التسوق والترفيه"
        },
        "Tetraeder Aussichtsturm": {
          title: "برج المراقبة الرباعي الوجوه",
          subtitle: "بانوراما 360° على منطقة الرور"
        },
        "Movie Park Germany": {
          title: "مدينة الأفلام ألمانيا",
          subtitle: "مدينة ملاهي سينمائية مع أفعوانية"
        },
        "Halde Hoheward Observatorium": {
          title: "مرصد هوهيفارد",
          subtitle: "مرصد الأفق والمسلة"
        },
        "Schloss Herten": {
          title: "قلعة هيرتن",
          subtitle: "القلعة المائية في حديقة القلعة"
        },
        "Moers Festival": {
          title: "مهرجان مورس",
          subtitle: "مهرجان دولي للجاز وموسيقى العالم"
        },
        "Grafschafter Museum": {
          title: "متحف المقاطعة",
          subtitle: "تاريخ مقاطعة مورس"
        },
        "Camera Obscura": {
          title: "الكاميرا المظلمة",
          subtitle: "أعلى كاميرا قابلة للسير في العالم"
        },
        "Aquarius Wassermuseum": {
          title: "متحف الماء أكواريوس",
          subtitle: "الثقافة الصناعية لإدارة المياه"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "متحف الصناعة LWL هنريشهوته",
          subtitle: "منشأة الفرن العالي والتاريخ الصناعي"
        },
        "Altstadt Hattingen": {
          title: "البلدة القديمة هاتينغن",
          subtitle: "العمارة الخشبية من العصور الوسطى"
        },
        "Ruhrfestspiele": {
          title: "مهرجانات الرور",
          subtitle: "أكبر مهرجان مسرحي في أوروبا"
        },
        "Ikonen-Museum": {
          title: "متحف الأيقونات",
          subtitle: "فن الكنيسة الشرقية"
        }
      }
    },
    NL: {
      title: "Evenementen in de 12 Ruhrgebied Steden",
      subtitle: "Ontdek de diversiteit van culturen en evenementen in de belangrijkste steden van het Ruhrgebied",
      categories: {
        Kultur: "Cultuur",
        Musik: "Muziek",
        Sport: "Sport",
        Familie: "Familie",
        Kunst: "Kunst",
        Bildung: "Onderwijs",
        Shopping: "Winkelen",
        Aussicht: "Uitzichtpunt",
        Wissenschaft: "Wetenschap"
      },
      events: {
        "Zeche Zollverein UNESCO-Führung": {
          title: "UNESCO Rondleiding Zeche Zollverein",
          subtitle: "Beleef het werelderfgoed van industriële cultuur"
        },
        "Philharmonie Essen Konzert": {
          title: "Essen Philharmonie Concert", 
          subtitle: "Ruhr Piano Festival"
        },
        "BVB Stadion-Tour": {
          title: "BVB Stadion Rondleiding",
          subtitle: "Beleef het Signal Iduna Park"
        },
        "Phoenix See Herbstfest": {
          title: "Phoenix Meer Herfstfestival",
          subtitle: "Familiefestival bij het kunstmatige meer"
        },
        "LaPaDu Lichtinstallation": {
          title: "LaPaDu Lichtinstallatie", 
          subtitle: "Spectaculaire lichtshow in het landschapspark"
        },
        "Hafen Duisburg Tour": {
          title: "Duisburg Haven Rondleiding",
          subtitle: "Europa's grootste binnenhaven"
        },
        "Deutsches Bergbau-Museum": {
          title: "Duits Mijnbouwmuseum",
          subtitle: "Beleef industriële geschiedenis van dichtbij"
        },
        "Starlight Express Musical": {
          title: "Starlight Express Musical",
          subtitle: "Wereldberoemde rollerskates musical"
        },
        "ZOOM Erlebniswelt": {
          title: "ZOOM Belevingswereld",
          subtitle: "Wereldreis op één dag"
        },
        "Schalke Arena Tour": {
          title: "Schalke Arena Rondleiding",
          subtitle: "Ontdek de Veltins-Arena"
        },
        "Gasometer Ausstellung": {
          title: "Gasometer Tentoonstelling",
          subtitle: "Het kwetsbare paradijs"
        },
        "CentrO Shopping & Kultur": {
          title: "CentrO Winkelen & Cultuur",
          subtitle: "Winkelen en entertainment"
        },
        "Tetraeder Aussichtsturm": {
          title: "Tetraëder Uitkijktoren",
          subtitle: "360° panorama over het Ruhrgebied"
        },
        "Movie Park Germany": {
          title: "Movie Park Germany",
          subtitle: "Filmpark met achtbanen"
        },
        "Halde Hoheward Observatorium": {
          title: "Hoheward Observatorium",
          subtitle: "Horizon observatorium en obelisk"
        },
        "Schloss Herten": {
          title: "Kasteel Herten",
          subtitle: "Waterkasteel in het kasteelpark"
        },
        "Moers Festival": {
          title: "Moers Festival",
          subtitle: "Internationaal jazz & wereldmuziek festival"
        },
        "Grafschafter Museum": {
          title: "Graafschap Museum",
          subtitle: "Geschiedenis van graafschap Moers"
        },
        "Camera Obscura": {
          title: "Camera Obscura",
          subtitle: "Werelds hoogste beloopbare camera"
        },
        "Aquarius Wassermuseum": {
          title: "Aquarius Watermuseum",
          subtitle: "Industriële cultuur van waterbeheer"
        },
        "LWL-Industriemuseum Henrichshütte": {
          title: "LWL Industriemuseum Henrichshütte",
          subtitle: "Hoogoven installatie en industriële geschiedenis"
        },
        "Altstadt Hattingen": {
          title: "Oude Stad Hattingen",
          subtitle: "Middeleeuwse vakwerk architectuur"
        },
        "Ruhrfestspiele": {
          title: "Ruhr Festival",
          subtitle: "Europa's grootste theaterfestival"
        },
        "Ikonen-Museum": {
          title: "Iconen Museum",
          subtitle: "Oosterse kerkkunst"
        }
      }
    }
  }

  const lang = translations[currentLang] || translations.DE

  const formatGermanDate = (dateStr) => {
    const months = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ]
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day}. ${month} ${year}`
  }

  const cities = [
    {
      id: 1,
      name: "Essen",
      events: [
        {
          title: "Zeche Zollverein UNESCO-Führung",
          subtitle: "Welterbe Industriekultur erleben",
          date: "2025-10-15",
          time: "14:00",
          location: "Zeche Zollverein",
          category: "Kultur",
          price: "12€"
        },
        {
          title: "Philharmonie Essen Konzert",
          subtitle: "Ruhr Piano Festival",
          date: "2025-10-22",
          time: "19:30",
          location: "Philharmonie Essen",
          category: "Musik",
          price: "45€"
        }
      ],
      image: "/src/assets/images/städte/essen/Zollverein bunt.jpg"
    },
    {
      id: 2,
      name: "Dortmund",
      events: [
        {
          title: "BVB Stadion-Tour",
          subtitle: "Signal Iduna Park erleben",
          date: "2025-10-18",
          time: "15:00",
          location: "Signal Iduna Park",
          category: "Sport",
          price: "22€"
        },
        {
          title: "Phoenix See Herbstfest",
          subtitle: "Familienfest am künstlichen See",
          date: "2025-10-25",
          time: "12:00",
          location: "Phoenix See",
          category: "Familie",
          price: "Kostenlos"
        }
      ],
      image: "/src/assets/images/städte/dortmund/DortmunderU.jpg"
    },
    {
      id: 3,
      name: "Duisburg",
      events: [
        {
          title: "LaPaDu Lichtinstallation",
          subtitle: "Spektakuläre Lichtshow im Landschaftspark",
          date: "2025-10-20",
          time: "20:00",
          location: "Landschaftspark Duisburg-Nord",
          category: "Kunst",
          price: "18€"
        },
        {
          title: "Hafen Duisburg Tour",
          subtitle: "Größter Binnenhafen Europas",
          date: "2025-10-28",
          time: "11:00",
          location: "Duisburger Hafen",
          category: "Bildung",
          price: "15€"
        }
      ],
      image: "/src/assets/images/städte/duisburg/LaPaDu.jpg"
    },
    {
      id: 4,
      name: "Bochum",
      events: [
        {
          title: "Deutsches Bergbau-Museum",
          subtitle: "Industriegeschichte hautnah erleben",
          date: "2025-10-17",
          time: "10:00",
          location: "Deutsches Bergbau-Museum",
          category: "Bildung",
          price: "10€"
        },
        {
          title: "Starlight Express Musical",
          subtitle: "Das Rollschuh-Musical",
          date: "2025-10-30",
          time: "19:30",
          location: "Starlight Express Theater",
          category: "Kultur",
          price: "65€"
        }
      ],
      image: "/src/assets/images/städte/bochum/Jahrhunderthalle Bochum.jpg"
    },
    {
      id: 5,
      name: "Gelsenkirchen",
      events: [
        {
          title: "ZOOM Erlebniswelt",
          subtitle: "Weltreise an einem Tag",
          date: "2025-10-19",
          time: "09:00",
          location: "ZOOM Erlebniswelt",
          category: "Familie",
          price: "24€"
        },
        {
          title: "Schalke Arena Tour",
          subtitle: "Veltins-Arena entdecken",
          date: "2025-10-26",
          time: "14:30",
          location: "Veltins-Arena",
          category: "Sport",
          price: "18€"
        }
      ],
      image: "/src/assets/images/städte/gelsenkirchen/NordsternHerkules.jpg"
    },
    {
      id: 6,
      name: "Oberhausen",
      events: [
        {
          title: "Gasometer Ausstellung",
          subtitle: "Das zerbrechliche Paradies",
          date: "2025-10-16",
          time: "10:00",
          location: "Gasometer Oberhausen",
          category: "Kunst",
          price: "15€"
        },
        {
          title: "CentrO Shopping & Kultur",
          subtitle: "Einkaufen und Entertainment",
          date: "2025-10-23",
          time: "12:00",
          location: "CentrO Oberhausen",
          category: "Shopping",
          price: "Kostenlos"
        }
      ],
      image: "/src/assets/images/städte/oberhausen/Gasometer Oberhausen.jpg"
    },
    {
      id: 7,
      name: "Bottrop",
      events: [
        {
          title: "Tetraeder Aussichtsturm",
          subtitle: "360° Panorama über das Ruhrgebiet",
          date: "2025-10-21",
          time: "13:00",
          location: "Halde Beckstraße",
          category: "Aussicht",
          price: "Kostenlos"
        },
        {
          title: "Movie Park Germany",
          subtitle: "Filmpark mit Achterbahnen",
          date: "2025-10-27",
          time: "10:00",
          location: "Movie Park Germany",
          category: "Familie",
          price: "42€"
        }
      ],
      image: "/src/assets/images/städte/bottrop/Halde Tetraeder.jpg"
    },
    {
      id: 8,
      name: "Herten",
      events: [
        {
          title: "Halde Hoheward Observatorium",
          subtitle: "Horizontalobservatorium und Obelisk",
          date: "2025-10-24",
          time: "11:00",
          location: "Halde Hoheward",
          category: "Wissenschaft",
          price: "6€"
        },
        {
          title: "Schloss Herten",
          subtitle: "Wasserschloss im Schlosspark",
          date: "2025-10-29",
          time: "16:00",
          location: "Schloss Herten",
          category: "Kultur",
          price: "5€"
        }
      ],
      image: "/src/assets/images/städte/herne/Halde Hoheward.jpg"
    },
    {
      id: 9,
      name: "Moers",
      events: [
        {
          title: "Moers Festival",
          subtitle: "Internationales Jazz & World Music Festival",
          date: "2025-10-31",
          time: "19:00",
          location: "Freizeitpark Moers",
          category: "Musik",
          price: "35€"
        },
        {
          title: "Grafschafter Museum",
          subtitle: "Geschichte der Grafschaft Moers",
          date: "2025-11-02",
          time: "11:00",
          location: "Grafschafter Museum",
          category: "Bildung",
          price: "8€"
        }
      ],
      image: "/src/assets/images/städte/moers/Geleucht.jpg"
    },
    {
      id: 10,
      name: "Mülheim an der Ruhr",
      events: [
        {
          title: "Camera Obscura",
          subtitle: "Weltweit höchste begehbare Kamera",
          date: "2025-11-05",
          time: "14:00",
          location: "Broicher Siedlung",
          category: "Wissenschaft",
          price: "4€"
        },
        {
          title: "Aquarius Wassermuseum",
          subtitle: "Industriekultur der Wasserwirtschaft",
          date: "2025-11-08",
          time: "10:30",
          location: "Aquarius Wassermuseum",
          category: "Bildung",
          price: "6€"
        }
      ],
      image: "/src/assets/images/städte/mülheim-an-der-ruhr/AquariusMH.jpg"
    },
    {
      id: 11,
      name: "Hattingen",
      events: [
        {
          title: "LWL-Industriemuseum Henrichshütte",
          subtitle: "Hochofenanlage und Industriegeschichte",
          date: "2025-11-10",
          time: "12:00",
          location: "Henrichshütte Hattingen",
          category: "Bildung",
          price: "8€"
        },
        {
          title: "Altstadt Hattingen",
          subtitle: "Mittelalterliche Fachwerkarchitektur",
          date: "2025-11-12",
          time: "15:00",
          location: "Hattinger Altstadt",
          category: "Kultur",
          price: "Kostenlos"
        }
      ],
      image: "/src/assets/images/städte/hattingen/GasseHattingen.jpg"
    },
    {
      id: 12,
      name: "Recklinghausen",
      events: [
        {
          title: "Ruhrfestspiele",
          subtitle: "Europas größtes Theaterfestival",
          date: "2025-11-15",
          time: "19:00",
          location: "Festspielhaus Recklinghausen",
          category: "Theater",
          price: "35€"
        },
        {
          title: "Ikonen-Museum",
          subtitle: "Ostkirchliche Kunst",
          date: "2025-11-18",
          time: "14:00",
          location: "Ikonen-Museum Recklinghausen",
          category: "Kunst",
          price: "6€"
        }
      ],
      image: "/src/assets/images/städte/recklinghausen/RuhrfestspielhausRecklinghausen.jpg"
    }
  ]

  const getCategoryColor = (category) => {
    const colors = {
      'Kunst': 'bg-purple-600',
      'Musik': 'bg-orange-600', 
      'Kultur': 'bg-blue-600',
      'Sport': 'bg-green-600',
      'Familie': 'bg-pink-600',
      'Bildung': 'bg-indigo-600',
      'Shopping': 'bg-yellow-600',
      'Aussicht': 'bg-teal-600',
      'Tradition': 'bg-red-600',
      'Wellness': 'bg-emerald-600',
      'Theater': 'bg-violet-600',
      'Natur': 'bg-lime-600',
      'Wissenschaft': 'bg-cyan-600'
    }
    return colors[category] || 'bg-gray-600'
  }

  return (
    <section id="events" className="pt-48 pb-32 bg-black text-gray-400 relative -mt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-black/20 via-40% via-black/60 via-70% to-black to-100%"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-400">
              {lang.title}
            </h2>
          </div>
          <p className="text-gray-400">
            {lang.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div key={city.id} className="bg-transparent backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-700/60 hover:shadow-2xl hover:shadow-gray-400/50 transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="aspect-w-16 aspect-h-10 relative">
                <img 
                  src={city.image} 
                  alt={city.name}
                  className={`w-full h-72 group-hover:scale-110 transition-transform duration-700 ${
                    city.name === 'Gelsenkirchen' 
                      ? 'object-cover object-top' 
                      : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-orange-900/40 group-hover:via-orange-800/10 transition-all duration-500">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-gray-400 text-2xl font-bold group-hover:text-orange-200 transition-colors duration-300">{city.name}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                      <span className="text-orange-300 text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {city.events.length} Events verfügbar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {city.events.map((event, index) => (
                  <div key={index} className="border-l-4 border-orange-400 hover:border-orange-300 pl-4 py-2 hover:bg-gray-700/50 hover:pl-6 transition-all duration-300 cursor-pointer rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 rounded text-orange-300 text-xs font-medium bg-transparent border border-orange-400/40 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                        {lang.categories[event.category] || event.category}
                      </span>
                      <span className="text-xs text-gray-300 bg-gray-700/50 border border-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 px-3 py-1.5 rounded-full font-medium transition-all duration-300">
                        {event.price}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-orange-400 mb-1 line-clamp-1">
                      {lang.events?.[event.title]?.title || event.title}
                    </h4>
                    
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                      {lang.events?.[event.title]?.subtitle || event.subtitle}
                    </p>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatGermanDate(event.date)} • {event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
