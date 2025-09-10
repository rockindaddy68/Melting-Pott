import React from 'react'

const Events = () => {
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
              Events in den 12 Ruhrgebietsstädten
            </h2>
          </div>
          <p className="text-gray-400">
            Entdecke die Vielfalt der Kulturen und Events in den wichtigsten Städten des Ruhrgebiets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div key={city.id} className="bg-transparent backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-700/60 hover:shadow-2xl hover:shadow-gray-400/50 transition-all duration-500 group hover:-translate-y-3 hover:rotate-1">
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
                        {event.category}
                      </span>
                      <span className="text-xs text-gray-300 bg-gray-700/50 border border-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 px-3 py-1.5 rounded-full font-medium transition-all duration-300">
                        {event.price}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-orange-400 mb-1 line-clamp-1">
                      {event.title}
                    </h4>
                    
                    <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                      {event.subtitle}
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
