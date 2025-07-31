import React, { useState, useEffect } from 'react'

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Ascultă evenimentul beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      // Previne afișarea automată a prompt-ului
      e.preventDefault();
      // Salvează evenimentul pentru a-l folosi mai târziu
      setDeferredPrompt(e);
      // Arată butonul nostru de instalare
      setShowInstallPrompt(true);
    };

    // Ascultă evenimentul appinstalled
    const handleAppInstalled = () => {
      console.log('Aplicația a fost instalată!');
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Afișează prompt-ul de instalare
    deferredPrompt.prompt();

    // Așteaptă răspunsul utilizatorului
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Utilizatorul a acceptat instalarea');
    } else {
      console.log('Utilizatorul a refuzat instalarea');
    }

    // Curăță evenimentul
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
      padding: '1rem',
      color: 'white',
      zIndex: 10000,
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>📱</span>
          <span style={{ fontWeight: 'bold' }}>Instalează aplicația</span>
        </div>
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
        >
          ✕
        </button>
      </div>
      
      <p style={{
        margin: '0.5rem 0',
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: '1.4'
      }}>
        Instalează aplicația meteo pentru acces rapid și funcționare offline!
      </p>
      
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem'
      }}>
        <button
          onClick={handleInstallClick}
          style={{
            backgroundColor: '#8f80f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.7rem 1.5rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1,
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7a6be8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#8f80f3'}
        >
          Instalează
        </button>
        
        <button
          onClick={handleDismiss}
          style={{
            backgroundColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            padding: '0.7rem 1rem',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.backgroundColor = 'transparent';
            e.target.color = 'rgba(255, 255, 255, 0.7)';
          }}
        >
          Mai târziu
        </button>
      </div>
    </div>
  )
}

export default InstallPrompt 