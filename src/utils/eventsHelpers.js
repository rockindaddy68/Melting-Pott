// Helper Functions - Utility-Funktionen für die Events-Komponente

// Deutsche Datumsformatierung
export const formatGermanDate = (dateString) => {
  if (!dateString) return 'Datum unbekannt'
  
  const date = new Date(dateString)
  
  // Prüfe ob das Datum gültig ist
  if (isNaN(date.getTime())) {
    console.warn('Ungültiges Datum:', dateString)
    return 'Ungültiges Datum'
  }
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Europe/Berlin'
  }
  return date.toLocaleDateString('de-DE', options)
}

// Kurzes deutsches Datumsformat (DD.MM.YYYY)
export const formatGermanDateShort = (dateString) => {
  if (!dateString) return 'Datum unbekannt'
  
  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    console.warn('Ungültiges Datum:', dateString)
    return 'Ungültiges Datum'
  }
  
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    timeZone: 'Europe/Berlin'
  }
  return date.toLocaleDateString('de-DE', options)
}

// Kategorie-Farben für Events
export const getCategoryColor = (category) => {
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

// Spezielle Bild-Anpassungen für bestimmte Städte
export const getCityImageClass = (cityName) => {
  if (cityName === 'Gelsenkirchen') {
    return 'object-cover object-top'
  }
  return 'object-cover'
}

export default { formatGermanDate, getCategoryColor, getCityImageClass }
