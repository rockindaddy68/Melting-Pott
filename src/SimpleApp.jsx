import React from 'react'

function SimpleApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🏭 Melting Pott - Test</h1>
      <p>Wenn Sie das sehen, funktioniert React!</p>
      <div style={{ 
        background: '#f0f0f0', 
        padding: '20px', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h2>✅ System Status</h2>
        <p>• React: Funktioniert</p>
        <p>• Vite: Läuft</p>
        <p>• Zeit: {new Date().toLocaleString()}</p>
      </div>
      <button 
        onClick={() => alert('Hotte sagt Hallo!')}
        style={{
          background: '#ff6600',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🤖 Test Hotte
      </button>
    </div>
  )
}

export default SimpleApp