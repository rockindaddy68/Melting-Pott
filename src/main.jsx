// === MELTING POTT - EINSTIEGSPUNKT DER ANWENDUNG ===
// Diese Datei ist der allererste Code, der ausgeführt wird, wenn die Website geladen wird

// === REACT IMPORTS ===
import { StrictMode } from 'react'      // React's Entwicklungsmodus für bessere Fehlererkennung
import { createRoot } from 'react-dom/client' // Moderne React 18+ Rendering-API

// === STYLING & HAUPTKOMPONENTE ===
import './index.css'    // CSS wieder aktiviert
import App from './App.jsx' // Zurück zur Haupt-App

// === REACT APP IN DEN DOM EINBINDEN ===
// 1. Finde das HTML-Element mit id="root" (siehe index.html)
// 2. Erstelle einen React-Root an dieser Stelle  
// 3. Rendere unsere App-Komponente dort hinein
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* StrictMode aktiviert zusätzliche Entwickler-Warnungen */}
    <App />    {/* Haupt-App */}
  </StrictMode>,
)
