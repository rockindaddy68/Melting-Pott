import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-ruhrpott-800">
              Das Ruhrgebiet
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-ruhrpott-600 hover:text-ruhrpott-800 transition-colors">
              Events
            </a>
            <a href="#gallery" className="text-ruhrpott-600 hover:text-ruhrpott-800 transition-colors">
              Galerie
            </a>
            <a href="#about" className="text-ruhrpott-600 hover:text-ruhrpott-800 transition-colors">
              Über uns
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-ruhrpott-600 hover:text-ruhrpott-800">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
