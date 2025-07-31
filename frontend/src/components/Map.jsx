import React from 'react'

function Map({ weatherData }) {
  if (!weatherData || !weatherData.location) {
    return null;
  }

  const { lat, lon } = weatherData.location;
  const current = weatherData.current;

  return (
    <div className="weather-all">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-color)' }}>
        Harta Meteo
      </h2>
      
      {/* Harta cu overlay meteo */}
      <div style={{ 
        width: '100%', 
        height: '300px', 
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.05},${lat-0.05},${lon+0.05},${lat+0.05}&layer=mapnik&marker=${lat},${lon}`}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          title="Harta Meteo"
        />
        
        {/* Overlay cu datele meteo pe hartă */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '0.9rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {weatherData.location.name}
          </div>
          <div>{current.temp_c}°C</div>
          <div style={{ fontSize: '0.8rem', color: '#ccc' }}>
            {current.condition.text}
          </div>
        </div>
      </div>

             {/* Informații suplimentare sub hartă */}
       <div style={{ 
         marginTop: '1rem',
         display: 'grid',
         gridTemplateColumns: 'repeat(2, 1fr)',
         gap: '0.8rem',
         fontSize: '0.9rem',
         color: 'var(--secondary-text)'
       }}>
         <div style={{ 
           padding: '0.5rem', 
           backgroundColor: 'var(--card-bg)', 
           borderRadius: '8px',
           textAlign: 'center'
         }}>
           <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Temperatura</div>
           <div style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>🌡️ {current.temp_c}°C</div>
         </div>
         
         <div style={{ 
           padding: '0.5rem', 
           backgroundColor: 'var(--card-bg)', 
           borderRadius: '8px',
           textAlign: 'center'
         }}>
           <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Vânt</div>
           <div style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>💨 {current.wind_kph} km/h</div>
         </div>
         
         <div style={{ 
           padding: '0.5rem', 
           backgroundColor: 'var(--card-bg)', 
           borderRadius: '8px',
           textAlign: 'center'
         }}>
           <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Umiditate</div>
           <div style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>💧 {current.humidity}%</div>
         </div>
         
         <div style={{ 
           padding: '0.5rem', 
           backgroundColor: 'var(--card-bg)', 
           borderRadius: '8px',
           textAlign: 'center'
         }}>
           <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Condiția</div>
           <div style={{ fontSize: '1rem', color: 'var(--text-color)' }}>🌤️ {current.condition.text}</div>
         </div>
         
         <div style={{ 
           padding: '0.5rem', 
           backgroundColor: 'var(--card-bg)', 
           borderRadius: '8px',
           textAlign: 'center'
         }}>
           <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Ora locală</div>
           <div style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>🕐 {weatherData.location.localtime.split(' ')[1]}</div>
         </div>
         
         <div style={{ 
           padding: '0.5rem', 
           backgroundColor: 'var(--card-bg)', 
           borderRadius: '8px',
           textAlign: 'center'
         }}>
           <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Regiunea</div>
           <div style={{ fontSize: '1rem', color: 'var(--text-color)' }}>🏛️ {weatherData.location.region || 'N/A'}</div>
         </div>
       </div>
    </div>
  )
}

export default Map