import React from 'react'

const Gallery = () => {
  const images = [
    {
      id: 1,
      title: "Zeche Zollverein",
      category: "Historisch",
      description: "UNESCO-Welterbe und Symbol des Strukturwandels",
      placeholder: "https://via.placeholder.com/400x300/64748b/ffffff?text=Zeche+Zollverein"
    },
    {
      id: 2,
      title: "Phoenix See",
      category: "Modern",
      description: "Künstlich angelegter See auf ehemaligem Industriegelände",
      placeholder: "https://via.placeholder.com/400x300/475569/ffffff?text=Phoenix+See"
    },
    {
      id: 3,
      title: "Gasometer Oberhausen",
      category: "Historisch", 
      description: "Ehemaliger Gasspeicher, heute Ausstellungsraum",
      placeholder: "https://via.placeholder.com/400x300/334155/ffffff?text=Gasometer"
    },
    {
      id: 4,
      title: "Dortmunder U",
      category: "Modern",
      description: "Zentrum für Kunst und Kreativität",
      placeholder: "https://via.placeholder.com/400x300/1e293b/ffffff?text=Dortmunder+U"
    },
    {
      id: 5,
      title: "Landschaftspark Duisburg",
      category: "Historisch",
      description: "Industrienatur im ehemaligen Hüttenwerk",
      placeholder: "https://via.placeholder.com/400x300/0f172a/ffffff?text=Landschaftspark"
    },
    {
      id: 6,
      title: "CentrO Oberhausen",
      category: "Modern",
      description: "Eines der größten Einkaufszentren Europas",
      placeholder: "https://via.placeholder.com/400x300/64748b/ffffff?text=CentrO"
    }
  ]

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ruhrpott-800 mb-4">
            Ruhrpott Galerie
          </h2>
          <p className="text-xl text-ruhrpott-600 max-w-2xl mx-auto">
            Von industrieller Vergangenheit zu moderner Zukunft - das Ruhrgebiet im Wandel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                <img 
                  src={image.placeholder} 
                  alt={image.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-ruhrpott-800">
                    {image.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    image.category === 'Historisch' 
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {image.category}
                  </span>
                </div>
                
                <p className="text-ruhrpott-600 text-sm">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-ruhrpott-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-ruhrpott-700 transition-colors">
            Weitere Bilder laden
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
