import React from 'react'

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Zeche Zollverein Festival",
      date: "15. September 2025",
      location: "Zeche Zollverein, Essen",
      description: "Kulturelles Festival auf dem UNESCO-Welterbe mit Musik, Kunst und regionaler Küche.",
      category: "Kultur"
    },
    {
      id: 2,
      title: "Dortmunder Phoenix See Lauf",
      date: "22. September 2025", 
      location: "Phoenix See, Dortmund",
      description: "Laufveranstaltung rund um den künstlich angelegten See im Herzen Dortmunds.",
      category: "Sport"
    },
    {
      id: 3,
      title: "Bochumer Nacht der Industrie",
      date: "5. Oktober 2025",
      location: "Deutsches Bergbau-Museum, Bochum",
      description: "Einblicke in die industrielle Geschichte und Zukunft des Ruhrgebiets.",
      category: "Bildung"
    },
    {
      id: 4,
      title: "Gelsenkirchen Food Festival",
      date: "12. Oktober 2025",
      location: "Nordsternpark, Gelsenkirchen", 
      description: "Kulinarische Reise durch die Vielfalt des Ruhrgebiets und internationale Küche.",
      category: "Kulinarik"
    }
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Kultur': return 'bg-purple-100 text-purple-800'
      case 'Sport': return 'bg-green-100 text-green-800' 
      case 'Bildung': return 'bg-blue-100 text-blue-800'
      case 'Kulinarik': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section id="events" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ruhrpott-800 mb-4">
            Aktuelle Events
          </h2>
          <p className="text-xl text-ruhrpott-600 max-w-2xl mx-auto">
            Entdecke spannende Veranstaltungen und Events im Ruhrgebiet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
                <span className="text-sm text-ruhrpott-500">{event.date}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-ruhrpott-800 mb-2">
                {event.title}
              </h3>
              
              <p className="text-ruhrpott-600 mb-4">
                {event.description}
              </p>
              
              <div className="flex items-center text-sm text-ruhrpott-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
