import React, { useState, useEffect } from 'react'

function LocationPermission({ onLocationDetected }) {
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifică dacă utilizatorul a dat deja permisiunea
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setError('Geolocația nu este suportată de browser-ul tău');
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      
      if (permission.state === 'granted') {
        // Utilizatorul a dat deja permisiunea, detectează locația
        detectLocation();
      } else if (permission.state === 'prompt') {
        // Arată prompt-ul de permisiune
        setShowPermissionPrompt(true);
      } else if (permission.state === 'denied') {
        setError('Permisiunea de locație a fost refuzată. Poți să introduci manual orașul.');
      }
    } catch (err) {
      console.log('Eroare la verificarea permisiunii:', err);
      setShowPermissionPrompt(true);
    }
  };

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Folosește API-ul de reverse geocoding pentru a obține orașul
      const city = await getCityFromCoords(latitude, longitude);
      
      if (city) {
        onLocationDetected(city);
        setShowPermissionPrompt(false);
      } else {
        setError('Nu s-a putut detecta orașul. Te rugăm să introduci manual.');
      }
    } catch (err) {
      console.log('Eroare la detectarea locației:', err);
      if (err.code === 1) {
        setError('Permisiunea de locație a fost refuzată.');
      } else if (err.code === 2) {
        setError('Locația nu a putut fi determinată.');
      } else if (err.code === 3) {
        setError('Timeout la detectarea locației.');
      } else {
        setError('Eroare la detectarea locației. Te rugăm să introduci manual orașul.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCityFromCoords = async (lat, lon) => {
    try {
      // Folosește OpenStreetMap Nominatim pentru reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=ro`
      );
      const data = await response.json();
      
      if (data.address) {
        // Încearcă să găsească orașul din răspuns
        return data.address.city || 
               data.address.town || 
               data.address.village || 
               data.address.county ||
               data.address.state;
      }
      return null;
    } catch (err) {
      console.log('Eroare la obținerea orașului:', err);
      return null;
    }
  };

  const handleAllowLocation = () => {
    setShowPermissionPrompt(false);
    detectLocation();
  };

  const handleDenyLocation = () => {
    setShowPermissionPrompt(false);
    setError('Poți să introduci manual orașul în bara de căutare.');
  };

  if (!showPermissionPrompt && !error && !isLoading) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
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
      {isLoading && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Se detectează locația...</p>
        </div>
      )}

      {showPermissionPrompt && !isLoading && (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontSize: '1.2rem' }}>📍</span>
            <span style={{ fontWeight: 'bold' }}>Detectare automată locație</span>
          </div>
          
          <p style={{
            margin: '0.5rem 0',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.4'
          }}>
            Permite aplicației să detecteze automat locația ta pentru a afișa vremea locală?
          </p>
          
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <button
              onClick={handleAllowLocation}
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
              Permite
            </button>
            
            <button
              onClick={handleDenyLocation}
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
              Nu acum
            </button>
          </div>
        </>
      )}

      {error && !isLoading && (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <span style={{ fontWeight: 'bold' }}>Eroare locație</span>
          </div>
          
          <p style={{
            margin: '0.5rem 0',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.4'
          }}>
            {error}
          </p>
          
          <button
            onClick={() => setError(null)}
            style={{
              backgroundColor: 'transparent',
              color: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
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
            Închide
          </button>
        </>
      )}
    </div>
  )
}

export default LocationPermission 