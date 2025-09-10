import React from 'react'

const Events = () => {
  const events = [
    {
      id: 1,
      title: "LaPaDu Lichtinstallation",
      subtitle: "Spektakuläre Lichtshow im Landschaftspark",
      date: "2024-09-15",
      time: "20:00",
      location: "Landschaftspark Duisburg-Nord",
      category: "Kunst",
      price: "18€",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Gasometer Ausstellungen Retrospektive",
      subtitle: "Retrospektive aller bisherigen Gasometer Oberhausen",
      date: "2024-05-16",
      time: "10:00",
      location: "Gasometer Oberhausen",
      category: "Kunst",
      price: "15€",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Philharmonie Essen Konzert",
      subtitle: "Ruhr Piano Festival",
      date: "2024-06-17",
      time: "19:30",
      location: "Philharmonie Essen",
      category: "Musik",
      price: "45€",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Bochum Total Festival",
      subtitle: "Größtes kostenloses Festival in NRW",
      date: "2024-07-18",
      time: "17:00",
      location: "Bermudadreieck Bochum",
      category: "Musik",
      price: "Kostenlos",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Zeche Prosper Beleuchtung",
      subtitle: "Industriekultur bei Nacht erleben",
      date: "2024-08-19",
      time: "21:00",
      location: "Zeche Prosper Haniel",
      category: "Kultur",
      price: "8€",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Klassik auf der Halde Haniel",
      subtitle: "Beethoven auf Haniel",
      date: "2024-06-20",
      time: "19:00",
      location: "Halde Haniel",
      category: "Kultur",
      price: "25€",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Kunst': return 'bg-purple-600'
      case 'Musik': return 'bg-orange-600'
      case 'Kultur': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <section id="events" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Angesagte Events
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-all duration-300 group">
              <div className="aspect-w-16 aspect-h-10 relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 text-right">
                  <div className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                    {event.price}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                  {event.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-1">
                  {event.subtitle}
                </p>
                
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date} • {event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
