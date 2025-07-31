import React from 'react'

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white'
    }}>
      {/* Animație de loading */}
      <div style={{
        width: '80px',
        height: '80px',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        borderTop: '4px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      
      {/* Text de loading */}
      <div style={{
        fontSize: '1.2rem',
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: '10px'
      }}>
        Se încarcă datele meteo...
      </div>
      
      {/* Subtitle */}
      <div style={{
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center'
      }}>
        Vă rugăm să așteptați
      </div>


    </div>
  )
}

export default LoadingScreen 