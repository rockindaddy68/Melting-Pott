import React from 'react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-ruhrpott-800 to-ruhrpott-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Willkommen im Ruhrgebiet
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Entdecke die Kultur, Geschichte und Zukunft des Ruhrpotts - 
            von industrieller Vergangenheit zu kreativer Gegenwart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-ruhrpott-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Events entdecken
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-ruhrpott-800 transition-colors">
              Galerie ansehen
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-gray-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero
