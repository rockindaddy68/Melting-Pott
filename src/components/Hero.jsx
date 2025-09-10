import React from 'react'

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Industrial Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
        <div 
          className="w-full h-full bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af2e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
              Melting Pott
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 font-light">
              Dein Guide für Events im Ruhrgebiet
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Event oder Location suchen..."
                  className="w-full px-6 py-4 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center gap-2">
                <span>Entdecken</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Zeche Zollverein Image */}
        <div className="flex-1 lg:flex hidden items-center justify-center p-8">
          <div className="relative max-w-lg w-full">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1570495259159-c213ba0e3993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Zeche Zollverein"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
